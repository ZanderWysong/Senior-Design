using System;
using System.Linq;

namespace ZitaDataSystem.Services
{
    public class EndpointsService
    {
        // Returns the expected XML structure as a string for a given endpoint.
        public string GetHeader(string endpoint)
        {
            // For example, for a "test" endpoint we expect two parameters.
            if (endpoint.Equals("test", StringComparison.OrdinalIgnoreCase))
            {
                return "<root><rows><row><param1></param1><param2></param2></row></rows></root>";
            }
            return null;
        }

        public string GetGet(string endpoint, string apiKey)
        {
            if (endpoint.Equals("test", StringComparison.OrdinalIgnoreCase) && apiKey == "12345")
                return "SELECT * FROM test WHERE text = $param1$";
            return null;
        }

        public string GetPost(string endpoint, string apiKey)
        {
            Console.WriteLine($"Received API Key: {apiKey}");

            if (endpoint.Equals("test", StringComparison.OrdinalIgnoreCase) && apiKey == "12345")
                return "validKey";
            return null;
        }

        public string GetPut(string endpoint, string apiKey)
        {
            if (endpoint.Equals("test", StringComparison.OrdinalIgnoreCase) && apiKey == "12345")
                return "UPDATE test SET text = $param1$ WHERE text = $param2$";
            return null;
        }

        public string GetInsert(string endpoint, string apiKey)
        {
            if (endpoint.Equals("test", StringComparison.OrdinalIgnoreCase) && apiKey == "12345")
                return "INSERT INTO test (text) VALUES ($param1$)";
            return null;
        }

        public string GetDelete(string endpoint, string apiKey)
        {
            if (endpoint.Equals("test", StringComparison.OrdinalIgnoreCase) && apiKey == "12345")
                return "DELETE FROM test WHERE text = $param1$";
            return null;
        }
    }
}
