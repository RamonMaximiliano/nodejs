import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "Mark" },
  { id: 2, name: "John" },
  { id: 3, name: "Bob" },
];

const server = createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET"){
    //a regex acima esta dizendo que qualquer coisa que tiver /api e depois /users e um numero de 0 a 9
    //a const abaixo esta pegando no terceito / o que vier em seguida
    const id = req.url.split("/")[3];
    const user = users.find((user)=>{return user.id === parseInt(id)})
    if (user) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.write(JSON.stringify(user));
        res.end();
    } else{
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 404;
        res.write(JSON.stringify({message: "User not found"}));
        res.end();
    }
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.write(JSON.stringify({message: "Route not found"}));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server started! ${PORT}`);
});
