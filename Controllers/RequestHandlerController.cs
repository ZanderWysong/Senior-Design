using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using System.Xml;
using ZitaDataSystem.Models;
using ZitaDataSystem.Services;

namespace ZitaDataSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestHandlerController : ControllerBase
    {
        private readonly EndpointsService _endpointsService;
        private readonly string _connectionString;

        public RequestHandlerController(IConfiguration configuration, EndpointsService endpointsService)
        {
            _endpointsService = endpointsService;
            // Retrieve the SQLite connection string from configuration.
            _connectionString = configuration.GetConnectionString("PrimaryDatabase")
                                ?? throw new InvalidOperationException("PrimaryDatabase connection string is missing.");
        }

        [HttpGet("{endpoint}")]
        public IActionResult Get(string endpoint)
        {
            string apiKey = Request.Headers["x-api-key"].ToString();
            if (string.IsNullOrEmpty(apiKey))
                return BadRequest("Missing API Key");

            string sqlCommand = _endpointsService.GetGet(endpoint, apiKey);
            if (string.IsNullOrEmpty(sqlCommand))
                return BadRequest("Invalid Request");

            var row = new Dictionary<string, string>();
            foreach (var key in Request.Query.Keys)
            {
                row[key] = Request.Query[key];
            }

            var (parsedSql, parameters) = ParseCommand(sqlCommand, row);
            try
            {
                using (var conn = new NpgsqlConnection(_connectionString))
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = parsedSql;
                        for (int i = 0; i < parameters.Count; i++)
                        {
                            cmd.Parameters.AddWithValue($"@p{i}", parameters[i]);
                        }

                        using (var reader = cmd.ExecuteReader())
                        {
                            var results = new List<Dictionary<string, object>>();
                            while (reader.Read())
                            {
                                var dict = new Dictionary<string, object>();
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    dict[reader.GetName(i)] = reader.GetValue(i);
                                }
                                results.Add(dict);
                            }
                            return Ok(results);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("{endpoint}")]
        public IActionResult Post(string endpoint, [FromBody] RequestPayload payload)
        {
            string apiKey = Request.Headers["x-api-key"].ToString();
            if (string.IsNullOrEmpty(apiKey))
                return BadRequest("Missing API Key");

            string sqlCommand = _endpointsService.GetInsert(endpoint, apiKey);
            if (string.IsNullOrEmpty(sqlCommand))
                return BadRequest("Invalid Request");

            if (payload == null || payload.rows == null || !payload.rows.Any())
                return BadRequest("No row data");

            if (!ValidRequest(endpoint, payload))
                return BadRequest("Invalid Request format");

            try
            {
                using (var conn = new NpgsqlConnection(_connectionString))
                {
                    conn.Open();
                    using (var transaction = conn.BeginTransaction())
                    {
                        foreach (var row in payload.rows)
                        {
                            var (parsedSql, parameters) = ParseCommand(sqlCommand, row);
                            using (var cmd = conn.CreateCommand())
                            {
                                cmd.Transaction = transaction;
                                cmd.CommandText = parsedSql;
                                for (int i = 0; i < parameters.Count; i++)
                                {
                                    cmd.Parameters.AddWithValue($"@p{i}", parameters[i]);
                                }
                                cmd.ExecuteNonQuery();
                            }
                        }
                        transaction.Commit();
                    }
                }
                return Ok("Ok");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{endpoint}")]
        public IActionResult Put(string endpoint, [FromBody] RequestPayload payload)
        {
            string apiKey = Request.Headers["x-api-key"].ToString();
            if (string.IsNullOrEmpty(apiKey))
                return BadRequest("Missing API Key");

            string sqlCommand = _endpointsService.GetPut(endpoint, apiKey);
            if (string.IsNullOrEmpty(sqlCommand))
                return BadRequest("Invalid Request");

            if (payload == null || payload.rows == null || !payload.rows.Any())
                return BadRequest("No row data");

            if (!ValidRequest(endpoint, payload))
                return BadRequest("Invalid Request format");

            try
            {
                using (var conn = new NpgsqlConnection(_connectionString))
                {
                    conn.Open();
                    using (var transaction = conn.BeginTransaction())
                    {
                        foreach (var row in payload.rows)
                        {
                            var (parsedSql, parameters) = ParseCommand(sqlCommand, row);
                            using (var cmd = conn.CreateCommand())
                            {
                                cmd.Transaction = transaction;
                                cmd.CommandText = parsedSql;
                                for (int i = 0; i < parameters.Count; i++)
                                {
                                    cmd.Parameters.AddWithValue($"@p{i}", parameters[i]);
                                }
                                cmd.ExecuteNonQuery();
                            }
                        }
                        transaction.Commit();
                    }
                }
                return Ok("Ok");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{endpoint}")]
        public IActionResult Delete(string endpoint, [FromBody] RequestPayload payload)
        {
            string apiKey = Request.Headers["x-api-key"].ToString();
            if (string.IsNullOrEmpty(apiKey))
                return BadRequest("Missing API Key");

            // Use the deletion SQL command.
            string sqlCommand = _endpointsService.GetDelete(endpoint, apiKey);
            if (string.IsNullOrEmpty(sqlCommand))
                return BadRequest("Invalid Request");

            if (payload == null || payload.rows == null || !payload.rows.Any())
                return BadRequest("No row data");

            if (!ValidRequest(endpoint, payload))
                return BadRequest("Invalid Request format");

            try
            {
                using (var conn = new NpgsqlConnection(_connectionString))
                {
                    conn.Open();
                    using (var transaction = conn.BeginTransaction())
                    {
                        foreach (var row in payload.rows)
                        {
                            var (parsedSql, parameters) = ParseCommand(sqlCommand, row);
                            using (var cmd = conn.CreateCommand())
                            {
                                cmd.Transaction = transaction;
                                cmd.CommandText = parsedSql;
                                for (int i = 0; i < parameters.Count; i++)
                                {
                                    cmd.Parameters.AddWithValue($"@p{i}", parameters[i]);
                                }
                                cmd.ExecuteNonQuery();
                            }
                        }
                        transaction.Commit();
                    }
                }
                return Ok("Ok");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        // Helper: Parses a SQL command with placeholders (e.g., $param$) using data from a row dictionary.
        private (string, List<object>) ParseCommand(string command, Dictionary<string, string> row)
        {
            var parameters = new List<object>();
            string pattern = @"\$(.*?)\$";
            var regex = new Regex(pattern);
            string parsedCommand = command;
            foreach (Match match in regex.Matches(command))
            {
                string placeholder = match.Value;
                string paramName = match.Groups[1].Value;
                string value = row.ContainsKey(paramName) ? row[paramName] : "";
                parameters.Add(value);
                int index = parameters.Count - 1;
                parsedCommand = parsedCommand.Replace(placeholder, $"@p{index}");
            }
            return (parsedCommand, parameters);
        }

        // Helper: Validates that the incoming JSON payload has the required keys.
        private bool ValidRequest(string endpoint, RequestPayload payload)
        {
            // Retrieve the expected structure from the endpoints service (still in XML).
            string rawExpected = _endpointsService.GetHeader(endpoint);
            if (string.IsNullOrEmpty(rawExpected))
            {
                Console.WriteLine($"Invalid request: No expected structure found for endpoint '{endpoint}'.");
                return false;
            }
            XElement expected;
            try
            {
                expected = XElement.Parse(rawExpected);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing expected XML for endpoint '{endpoint}': {ex.Message}");
                return false;
            }
            var expectedRow = expected.Element("rows")?.Element("row");
            if (expectedRow == null)
            {
                Console.WriteLine("Invalid XML structure: Missing expected <rows> or <row> elements.");
                return false;
            }
            var expectedNames = expectedRow.Elements().Select(e => e.Name.LocalName.ToLower()).ToList();
            foreach (var row in payload.rows)
            {
                var rowKeys = row.Keys.Select(k => k.ToLower()).ToList();
                if (!expectedNames.All(name => rowKeys.Contains(name)))
                {
                    Console.WriteLine("Request is missing required fields.");
                    return false;
                }
            }
            return true;
        }
    }
}
