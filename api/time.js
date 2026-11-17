// Dhanz Time API — x402 v2 paid endpoint for the vAPI Call listing (Vercel).
const PAY_TO = "0x26B10f089808954396c9057400dCca73D9FA8A85";
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

function payload(resourceUrl) {
  return {
    x402Version: 2,
    resource: {
      url: resourceUrl,
      description: "Current UTC time: ISO 8601, unix timestamp and Jakarta time.",
      mimeType: "application/json",
    },
    accepts: [{
      scheme: "exact",
      network: "eip155:8453",
      amount: "1000",
      asset: USDC_BASE,
      payTo: PAY_TO,
      maxTimeoutSeconds: 60,
      extra: { name: "USD Coin", version: "2" },
    }],
  };
}

module.exports = (req, res) => {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const origin = proto + "://" + req.headers.host;
  const resourceUrl = origin + "/api/time";

  const paid = req.headers["payment-signature"] || req.headers["x-payment"];
  if (!paid) {
    const body = payload(resourceUrl);
    res.setHeader("payment-required", Buffer.from(JSON.stringify(body)).toString("base64"));
    res.status(402).json(body);
    return;
  }

  const now = new Date();
  res.status(200).json({
    utc: now.toISOString(),
    unix: Math.floor(now.getTime() / 1000),
    jakarta: now.toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }) + " WIB",
    timezone: "UTC",
  });
};
