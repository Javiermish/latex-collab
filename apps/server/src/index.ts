import { createServer } from "node:http";

const HOST = "127.0.0.1";
const PORT = 3000;

const server = createServer((request, response) => {

  const method = request.method;
  const path = new URL(
    request.url ?? "/",
    "http://localhost"
  ).pathname;

  console.log(`${request.method} ${path}`);

  if (request.method !== "GET") {
    response.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      "Allow": "GET"
    });
    response.end("Metodo no permitido\n");
    return;
  }

  if (path === "/") {
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    response.end("Bienvenido a LaTeX Collab!\n");
    return;
  }

  if (path === "/about") {
    response.writeHead(200, {
       "Content-Type": "text/plain; charset=utf-8"
    });
    response.end("LaTeX Collab es un editor colaborativo de latex\n");
    return;
  }

  if (path === "/health") {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8"
    });

    response.end(JSON.stringify({
      status: "ok",
      service: "latex-collab-server"
    }));
    return;
  }

  response.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8"
  });
  response.end("Ruta no encontrada\n");
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor en http://${HOST}:${PORT}`);
});

