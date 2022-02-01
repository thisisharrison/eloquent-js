import { createServer } from "http";
import { parse } from "url";
import { resolve, sep } from "path";
import { createReadStream, createWriteStream } from "fs";
import { stat, readdir, rmdir, unlink } from "fs/promises";
import mime from "mime";
import type { IncomingMessage } from "http";
import type { Stats, WriteStream } from "fs";

const methods = Object.create(null);

const baseDirectory = process.cwd();

function urlPath(url: string) {
    let { pathname } = parse(url);
    // resolve relative paths and check if path is below cwd
    let path = pathname && resolve(decodeURIComponent(pathname).slice(1));
    // sep is '/' or '\' depending on operating system
    if (path !== baseDirectory && !path?.startsWith(baseDirectory + sep)) {
        throw { status: 403, body: "Forbidden" };
    }
    return path;
}

async function notAllowed(request: IncomingMessage) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed`,
    };
}

createServer(async (request, response) => {
    const handler = (request.method && methods[request.method]) || notAllowed;
    try {
        const { body, status = 200, type = "text/plain" } = await handler(request);
        response.writeHead(status, { "Content-Type": type });
        // pipe method that is used to forward all content from a readable stream to a writable stream.
        if (body && body.pipe) {
            body.pipe(response);
        } else {
            response.end(body);
        }
    } catch (e: any) {
        if (e.status !== null) {
            return e;
        }
        return { body: String(e), status: 500 };
    }
}).listen(8000);

// Return a list of files when reading a directory and to return file content when reading a regular file
methods.GET = async function (request: IncomingMessage) {
    let path = urlPath(request.url!);
    let stats: Stats | undefined;
    try {
        // looks up information about file (size, mtime)
        stats = await stat(path);
    } catch (e: any) {
        // Error NO ENTity
        if (e.code !== "ENOENT") {
            throw e;
        } else {
            return { status: 404, body: "File not found" };
        }
    }
    if (stats.isDirectory()) {
        // readdir to read the array of files in a dir and return to client
        return { body: (await readdir(path)).join("\n") };
    } else {
        return { body: createReadStream(path), type: mime.getType(path) };
    }
};

// HTTP standards make requests idempotent: making the same request multiple times produces the same result as making it once
methods.DELETE = async function (request: IncomingMessage) {
    let path = urlPath(request.url!);
    let stats: Stats | undefined;
    try {
        stats = await stat(path);
    } catch (e: any) {
        // Error NO ENTity
        if (e.code !== "ENOENT") {
            throw e;
        } else {
            // nonexistent file returns success as objective of delete is complete since file no exist
            return { status: 204 };
        }
    }
    if (stats.isDirectory()) {
        await rmdir(path);
    } else {
        await unlink(path);
    }
    // either rmdir or unlink, return success
    return { status: 204 };
};

// use pipe to move data from a readable stream to a writable one, from the request to the file.
// pipeStream creates a wrapper promise around the outcome of calling pipe
function pipeStream(from: IncomingMessage, to: WriteStream) {
    return new Promise((resolve, reject) => {
        // handle error in opening file (from)
        from.on("error", reject);
        // handle error when streaming (eg. network goes down)
        to.on("error", reject);
        // close the output stream
        to.on("finish", resolve);
        from.pipe(to);
    });
}

methods.PUT = async function (request: IncomingMessage) {
    let path = urlPath(request.url!);
    await pipeStream(request, createWriteStream(path));
    return { status: 204 };
};
