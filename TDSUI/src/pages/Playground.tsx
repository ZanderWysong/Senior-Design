import { useState } from "react";
import ReactFlow, {Background, BackgroundVariant} from "reactflow";
import {
  Box,
  Card,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Send,
  Plus,
  Trash2,
  Save,
  Copy,
  PlayCircle,
  FileJson,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import 'reactflow/dist/style.css'
interface RequestHeader {
  key: string;
  value: string;
}

interface RequestParam {
  key: string;
  value: string;
  type: "query" | "path";
}

interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: RequestHeader[];
  params: RequestParam[];
  body: string;
}

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Http-Request" } },
  { id: "2", position: { x: 100, y: 100 }, data: { label: "output" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Playground = () => {
  // Request state
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<RequestHeader[]>([
    { key: "", value: "" },
  ]);
  const [params, setParams] = useState<RequestParam[]>([
    { key: "", value: "", type: "query" },
  ]);
  const [requestBody, setRequestBody] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [response, setResponse] = useState<{
    status?: number;
    statusText?: string;
    body?: any;
    headers?: any;
    time?: number;
  } | null>(null);

  // Save/Load state
  const [savedRequests, setSavedRequests] = useState<SavedRequest[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [requestName, setRequestName] = useState("");

  // Handlers for headers
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  // Handlers for params
  const addParam = () => {
    setParams([...params, { key: "", value: "", type: "query" }]);
  };

  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const updateParam = (
    index: number,
    field: keyof RequestParam,
    value: string
  ) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value } as RequestParam;
    setParams(newParams);
  };

  // Save request
  const handleSaveRequest = () => {
    const newRequest: SavedRequest = {
      id: Date.now().toString(),
      name: requestName,
      method,
      url,
      headers,
      params,
      body: requestBody,
    };
    setSavedRequests([...savedRequests, newRequest]);
    setSaveDialogOpen(false);
    setRequestName("");
  };

  // Load request
  const loadRequest = (request: SavedRequest) => {
    setMethod(request.method);
    setUrl(request.url);
    setHeaders(request.headers);
    setParams(request.params);
    setRequestBody(request.body);
  };

  // Send request
  const handleSendRequest = async () => {
    try {
      const startTime = performance.now();

      // Build URL with query parameters
      const queryParams = params
        .filter((p) => p.type === "query" && p.key)
        .map(
          (p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`
        )
        .join("&");

      const finalUrl = `${url}${queryParams ? `?${queryParams}` : ""}`;

      // Build headers
      const headerObj = headers.reduce((acc, h) => {
        if (h.key) acc[h.key] = h.value;
        return acc;
      }, {} as Record<string, string>);

      const response = await fetch(finalUrl, {
        method,
        headers: headerObj,
        body: ["POST", "PUT", "PATCH"].includes(method)
          ? requestBody
          : undefined,
      });

      const responseData = await response.json();
      const endTime = performance.now();

      setResponse({
        status: response.status,
        statusText: response.statusText,
        body: responseData,
        headers: Object.fromEntries(response.headers.entries()),
        time: Math.round(endTime - startTime),
      });
    } catch (error) {
      setResponse({
        status: 0,
        statusText: "Error",
        body: error instanceof Error ? error.message : "An error occurred",
        time: 0,
      });
    }
  };

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          API Playground
        </Typography>

        <Grid container spacing={3}>
          {/* Request Panel */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
                <FormControl size="small" sx={{ width: 120 }}>
                  <InputLabel>Method</InputLabel>
                  <Select
                    value={method}
                    label="Method"
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    {HTTP_METHODS.map((m) => (
                      <MenuItem key={m} value={m}>
                        {m}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  label="URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                  variant="contained"
                  startIcon={<Send size={18} />}
                  onClick={handleSendRequest}
                >
                  Send
                </Button>
              </Box>

              <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                sx={{ mb: 2 }}
              >
                <Tab label="Headers" />
                <Tab label="Parameters" />
                <Tab label="Body" />
                <Tab label="Saved" />
              </Tabs>

              {/* Headers Tab */}
              {activeTab === 0 && (
                <Box>
                  {headers.map((header, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <TextField
                        size="small"
                        label="Header"
                        value={header.key}
                        onChange={(e) =>
                          updateHeader(index, "key", e.target.value)
                        }
                      />
                      <TextField
                        size="small"
                        label="Value"
                        value={header.value}
                        onChange={(e) =>
                          updateHeader(index, "value", e.target.value)
                        }
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeHeader(index)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<Plus size={18} />}
                    onClick={addHeader}
                    sx={{ mt: 1 }}
                  >
                    Add Header
                  </Button>
                </Box>
              )}

              {/* Parameters Tab */}
              {activeTab === 1 && (
                <Box>
                  {params.map((param, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <TextField
                        size="small"
                        label="Parameter"
                        value={param.key}
                        onChange={(e) =>
                          updateParam(index, "key", e.target.value)
                        }
                      />
                      <TextField
                        size="small"
                        label="Value"
                        value={param.value}
                        onChange={(e) =>
                          updateParam(index, "value", e.target.value)
                        }
                      />
                      <FormControl size="small" sx={{ width: 120 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={param.type}
                          label="Type"
                          onChange={(e) =>
                            updateParam(index, "type", e.target.value)
                          }
                        >
                          <MenuItem value="query">Query</MenuItem>
                          <MenuItem value="path">Path</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeParam(index)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<Plus size={18} />}
                    onClick={addParam}
                    sx={{ mt: 1 }}
                  >
                    Add Parameter
                  </Button>
                </Box>
              )}

              {/* Body Tab */}
              {activeTab === 2 && (
                <Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    placeholder="Enter request body (JSON)"
                  />
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      startIcon={<Save size={18} />}
                      onClick={() => setSaveDialogOpen(true)}
                    >
                      Save Request
                    </Button>
                    <Button
                      startIcon={<FileJson size={18} />}
                      onClick={() => {
                        try {
                          setRequestBody(
                            JSON.stringify(JSON.parse(requestBody), null, 2)
                          );
                        } catch (e) {
                          // Handle invalid JSON
                        }
                      }}
                    >
                      Format JSON
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Saved Requests Tab */}
              {activeTab === 3 && (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {savedRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.name}</TableCell>
                          <TableCell>
                            <Chip
                              label={request.method}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{request.url}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={() => loadRequest(request)}
                            >
                              <PlayCircle size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => {
                                const newRequest = {
                                  ...request,
                                  id: Date.now().toString(),
                                };
                                setSavedRequests([
                                  ...savedRequests,
                                  newRequest,
                                ]);
                              }}
                            >
                              <Copy size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                setSavedRequests(
                                  savedRequests.filter(
                                    (r) => r.id !== request.id
                                  )
                                );
                              }}
                            >
                              <Trash2 size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>
          </Grid>

          {/* Response Panel */}
          {/* <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Response
                {response && (
                  <Chip
                    label={`${response.status} ${response.statusText}`}
                    color={
                      response?.status
                        ? response.status >= 200 && response.status < 300
                          ? "success"
                          : "error"
                        : "error"
                    }
                    size="small"
                    sx={{ ml: 2 }}
                  />
                )}
              </Typography>

              {response ? (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Time: {response.time}ms
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Response Headers
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
                      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                        {JSON.stringify(response.headers, null, 2)}
                      </pre>
                    </Paper>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Response Body
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
                      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                        {JSON.stringify(response.body, null, 2)}
                      </pre>
                    </Paper>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    height: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 2,
                    color: "text.secondary",
                  }}
                >
                  <AlertCircle size={48} />
                  <Typography>
                    Send a request to see the response here
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid> */}
          <Box sx={{ width: "90vw", height: "70vh", border: "1px solid black", borderRadius: 2 }}>
            <ReactFlow nodes={initialNodes} edges={initialEdges}>
              <Background color="#ccc" variant={BackgroundVariant.Dots} />
            </ReactFlow>
          </Box>
        </Grid>
      </Box>

      {/* Save Request Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Request Name"
            fullWidth
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveRequest} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Playground;
