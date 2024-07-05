import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
const PORT = process.env.PORT;

// get current path, pois com E6 aqueles nativos de "_filename" não se aplicam mais
const __filename = url.fileURLToPath(import.meta.url) // este da o file URL to whatever this file is in, com o filename included 
const __dirname = path.dirname(__filename) // este da o directory de onde esta o file 
console.log(__filename, __dirname);
const server = http.createServer(async (req, res) => {
  try {
    //check if GET req 
    if(req.method === "GET"){
      let filePath;
      if (req.url === "/") {
        //esse join vai fazer carregar o index.html na pagina
        filePath = path.join(__dirname, "public","index.html")
      } else if (req.url === "/about") {
        //esse join vai fazer carregar o about.html na pagina
        filePath = path.join(__dirname, "public","about.html")
      } else {
        throw new Error("no page there!")
      }   
    const data = await fs.readFile(filePath);
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
    }else {
      throw new Error("no page there!")
    }  
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    console.log(req.url);
    console.log(req.method);
  res.end(`Server error! ${PORT}`);
  }
});
server.listen(PORT, () => {
  console.log(`Server started! ${PORT}`);
});
