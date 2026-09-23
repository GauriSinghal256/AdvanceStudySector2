const https = require("https");
const http = require("http");

/**
 * Automatically pings the server's public URL at a regular interval
 * to prevent free-tier hosting (like Render) from sleeping due to inactivity.
 */
function startKeepAlive() {
  // Render automatically provides RENDER_EXTERNAL_URL (e.g. https://your-app.onrender.com)
  // or user can specify SERVER_URL / RENDER_URL in their environment variables.
  const rawUrl =
    process.env.RENDER_EXTERNAL_URL ||
    process.env.SERVER_URL ||
    process.env.RENDER_URL;

  if (!rawUrl) {
    console.log(
      "[KeepAlive] Notice: Neither RENDER_EXTERNAL_URL nor SERVER_URL is set in environment variables."
    );
    console.log(
      "[KeepAlive] To enable automatic self-ping, set SERVER_URL=https://your-service.onrender.com in your Render dashboard."
    );
    return;
  }

  // Ensure target URL points to /ping
  let targetUrl = rawUrl.trim().replace(/\/$/, "");
  if (!targetUrl.endsWith("/ping") && !targetUrl.includes("/api/")) {
    targetUrl += "/ping";
  }

  // Ping interval: 10 minutes by default (Render free tier sleeps after 15 minutes)
  const intervalMinutes =
    parseInt(process.env.PING_INTERVAL_MINUTES, 10) || 10;
  const intervalMs = intervalMinutes * 60 * 1000;

  console.log(
    `[KeepAlive] Service scheduled to self-ping ${targetUrl} every ${intervalMinutes} minutes.`
  );

  const ping = () => {
    const startTime = Date.now();
    const client = targetUrl.startsWith("https") ? https : http;

    const req = client.get(targetUrl, (res) => {
      const latency = Date.now() - startTime;
      console.log(
        `[KeepAlive] Ping successful (${res.statusCode}) - ${latency}ms at ${new Date().toLocaleTimeString()}`
      );
    });

    req.on("error", (err) => {
      console.error(`[KeepAlive] Ping error: ${err.message}`);
    });

    req.setTimeout(25000, () => {
      req.destroy();
      console.warn(`[KeepAlive] Ping timed out after 25s.`);
    });
  };

  // Perform an initial ping after 45 seconds to verify connectivity
  setTimeout(ping, 45 * 1000);

  // Periodically ping every 10 minutes
  setInterval(ping, intervalMs);
}

module.exports = startKeepAlive;
