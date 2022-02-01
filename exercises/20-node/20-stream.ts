import { createServer, request } from "http";

createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    // Chunk is a binary buffer. Convert to string by decoding it as UTF-8 with toString
    // Readable streams have data (fired every time data comes in) and end (whenever steam is at its end) events.
    // Model is suitable for streaming data when whole document isn't available yet
    request.on("data", (chunk) => response.write(chunk.toString().toUpperCase()));
    request.on("end", () => response.end());
}).listen(8000);

// Activate upper-casing server
request(
    {
        hostname: "localhost",
        port: 8000,
        method: "POST",
    },
    (response) => {
        response.on("data", (chunk) => process.stdout.write(chunk.toString()));
    }
).end("Hello Server");
