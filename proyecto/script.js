const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const endpoint = req.url;

  const routeMapping = {
    "/": "index.html",
    "/about": "about.html",
    "/contact": "contact.html",
    "/location": "location.html",
    "/mission": "mission.html",
    "/css/global.css": "css/global.css",
    "/css/reset.css": "css/reset.css",
  };

  const code = routeMapping[endpoint] ? 200 : 404;
  const file = "./site/" + (routeMapping[endpoint] || "404.html");
  let mimetype = "text/" + (file.includes(".css") ? "css" : "html");

  fs.readFile(file, (err, body) => {
    res.statusCode = code;
    res.setHeader("Content-Type", mimetype);

    res.end(body);
  });
});

server.listen(4001, () => console.log("Server on..."));
