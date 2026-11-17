// OpenAPI document for the Dhanz Time API (served at /api/openapi).
module.exports = (req, res) => {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const origin = proto + "://" + req.headers.host;
  res.status(200).json({
    openapi: "3.0.3",
    info: {
      title: "Dhanz Time API",
      version: "1.0.0",
      description: "A tiny x402-paid utility API: current UTC time with unix timestamp and Asia/Jakarta time. Listed on vAPI Call.",
    },
    servers: [{ url: origin }],
    paths: {
      "/api/time": {
        get: {
          summary: "Current time",
          description: "Returns the current UTC time (ISO 8601), unix timestamp and Asia/Jakarta time. Paid endpoint: HTTP 402 with x402 requirements when called without a payment header. Price 0.001 USDC on Base.",
          responses: {
            "200": { description: "Current time" },
            "402": { description: "Payment required (x402)" },
          },
        },
      },
    },
  });
};
