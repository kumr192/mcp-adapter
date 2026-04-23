const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const N8N_URL = "https://shiv192kumar.app.n8n.cloud/webhook/mcp";

// MCP: list tools
app.get("/tools/list", (req, res) => {
res.json({
tools: [
{
name: "tell_joke",
description: "Returns a random joke",
input_schema: { type: "object", properties: {} }
},
{
name: "genz_word",
description: "Returns a Gen Z word",
input_schema: { type: "object", properties: {} }
}
]
});
});

// MCP: call tool
app.post("/tools/call", async (req, res) => {
const { name, arguments: args } = req.body;

try {
const response = await axios.post(N8N_URL, {
tool: name,
...args
});

```
res.json({
  result: response.data
});
```

} catch (err) {
res.status(500).json({ error: err.message });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log("MCP adapter running on port 3000");
});
