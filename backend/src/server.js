import express from 'express'
import path from 'path';
import { ENV } from "./lib/env.js";

const app=express();

app.use(express.json());

const __dirname = path.resolve();


app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});



// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
  });
} 

// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

app.listen(ENV.PORT,()=>{
    console.log("Server is running on port:",ENV.PORT)
})



