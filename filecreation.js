const express=require("express");
const app=express();

const fs = require("fs");
const path = require("path");

const folderPath = "./files"; //Folder where our files will get saved

if (!fs.existsSync(folderPath)) {
  // Create the folder if it doesnt exist
  fs.mkdirSync(folderPath, { recursive: true });
}

app.get("/create",respondCreatefiles);
app.get("/list",respondList);
app.get("/notfound",respondNotfound);

function respondCreatefiles(req,res){

   
    // Create a file with current timestamp
    const now = new Date();
    const fileName = `${now.toISOString().replace(/:/g, "-")}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, now.toString(), (err) => {
      if (err) {
        res.setHeader(500);
        res.end("Server error!");
        return;
      }
      res.setHeader(  "Content-Type", "text/plain" );
      res.end(`File created: ${fileName}`);
    });
  }
  
  
  
  function respondList(req,res){
    //List all the text files in the folder
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        res.setHeader(500);
        res.end("Server error!");
        return;
      }
      const txtFiles = files.filter((file) => path.extname(file) === ".txt");
      res.setHeader(  "Content-Type", "application/json" );
      res.end(JSON.stringify(txtFiles));
    });
  }
  
  function respondNotfound(req,res) {
    res.setHeader(400);
    res.end("Not found!");
  }


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
