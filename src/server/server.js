const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { Interface } = require("readline");

const dev = process.env.NODE_ENV != "production";
const port = process.env.PORT || 4000;
const app = next({ dev });
const handle = app.getRequestHandler();

const apiMiddleware = {
  "/api": {
    target: "/",
    pathRewrite: {
      "^/api": "/api",
    },
  },
};

app.prepare().then(() => {
  const server = express();

  server.use(
    "*",
    createProxyMiddleware(apiMiddleware["/api"], {
      changeOrigin: true,
      xfwd: true,
      logLevel: process.env.NODE_ENV === "production" ? undefined : "debug",
    })
  );

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Start listen from: http://localhost:${port}`);
  });
});
