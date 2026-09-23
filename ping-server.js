#!/usr/bin/env node

/**
 * Render Free-Tier Keep-Alive Ping Script
 *
 * Keeps your Render service awake by pinging it every 9-10 minutes.
 * (Render free instances sleep after 15 minutes of inactivity).
 *
 * Usage:
 *   node ping-server.js <URL>
 * Example:
 *   node ping-server.js https://your-backend.onrender.com
 *
 * Or set SERVER_URL or RENDER_URL in backend/.env:
 *   node ping-server.js
 */

import https from "node:https";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables if available
function loadEnv() {
  const envPaths = [
    path.join(__dirname, ".env"),
    path.join(__dirname, "backend", ".env"),
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  }
}

loadEnv();

const rawUrl =
  process.argv[2] ||
  process.env.RENDER_URL ||
  process.env.SERVER_URL ||
  process.env.RENDER_EXTERNAL_URL;

if (!rawUrl || rawUrl === "--help" || rawUrl === "-h") {
  console.log("================================================================");
  console.log("🚀 Render Keep-Alive Script");
  console.log("================================================================");
  console.log("Please provide your Render service URL:");
  console.log("  node ping-server.js https://your-backend.onrender.com\n");
  console.log("Options / Env Variables:");
  console.log("  SERVER_URL or RENDER_URL : target URL in backend/.env");
  console.log("  PING_INTERVAL_MINUTES    : interval in minutes (default: 10)");
  console.log("================================================================");
  process.exit(rawUrl ? 0 : 1);
}

// Normalize URL: ensure scheme and ping path
let normalizedUrl = rawUrl.trim().replace(/\/$/, "");
if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
  normalizedUrl = "https://" + normalizedUrl;
}
if (!normalizedUrl.endsWith("/ping") && !normalizedUrl.includes("/api/")) {
  normalizedUrl += "/ping";
}

// Ping interval: 10 minutes (600,000 ms)
const intervalMinutes =
  parseInt(process.env.PING_INTERVAL_MINUTES, 10) || 10;
const intervalMs = intervalMinutes * 60 * 1000;

let pingCount = 0;

console.log("================================================================");
console.log("🚀 Render Keep-Alive Script Active");
console.log(`🎯 Target URL    : ${normalizedUrl}`);
console.log(`⏱️  Ping Interval : Every ${intervalMinutes} minutes (Render sleeps after 15m)`);
console.log(`⚡ Started at     : ${new Date().toLocaleString()}`);
console.log("================================================================");
console.log("Leave this process running. Press Ctrl+C to terminate.\n");

function sendPing() {
  pingCount++;
  const client = normalizedUrl.startsWith("https") ? https : http;
  const startTime = Date.now();
  const timestamp = new Date().toLocaleTimeString();

  console.log(`[${timestamp}] 📡 (#${pingCount}) Pinging ${normalizedUrl}...`);

  const req = client.get(normalizedUrl, (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      const duration = Date.now() - startTime;
      if (res.statusCode >= 200 && res.statusCode < 400) {
        console.log(`[${new Date().toLocaleTimeString()}] ✅ (#${pingCount}) Pong! Status: ${res.statusCode} | Latency: ${duration}ms`);
      } else {
        console.warn(`[${new Date().toLocaleTimeString()}] ⚠️ (#${pingCount}) Server responded with HTTP ${res.statusCode} (${duration}ms)`);
      }
      console.log(`[Info] Next ping scheduled in ${intervalMinutes} minutes.\n`);
    });
  });

  req.on("error", (err) => {
    console.error(`[${new Date().toLocaleTimeString()}] ❌ (#${pingCount}) Ping failed: ${err.message}`);
    console.log(`[Info] Next ping scheduled in ${intervalMinutes} minutes.\n`);
  });

  // Timeout handling for cold starts (render cold start can take 30-50s)
  req.setTimeout(60000, () => {
    req.destroy();
    console.error(`[${new Date().toLocaleTimeString()}] ⚠️ (#${pingCount}) Ping timed out after 60s (server may be waking up).`);
    console.log(`[Info] Next ping scheduled in ${intervalMinutes} minutes.\n`);
  });
}

// First ping immediately
sendPing();

// Subsequent pings every intervalMinutes
setInterval(sendPing, intervalMs);
