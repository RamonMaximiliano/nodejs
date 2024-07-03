import http from "http";
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    console.log(req.url);
    console.log(req.method);
    res.end(`Hello there! ${PORT}`);
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    console.log(req.url);
    console.log(req.method);
  res.end(`about there! ${PORT}`);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    console.log(req.url);
    console.log(req.method);
  res.end(`no page there! ${PORT}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server started! ${PORT}`);
});
