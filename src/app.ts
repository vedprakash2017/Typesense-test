

import * as Express from 'express';
import client from "./typesense/client"
import {Write , Read , CreateCollection, Search , ReadOne} from "./typesense/bookCollection";
import * as fs from "fs/promises"

const app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.delete("/delete" , async (req, res) =>{
try{
await client.collections("books").delete();
}
catch(e){
  res.status(400).send(e)
}
})

app.post("/create" , async(req, res)=>{
  try{
    const ans = await CreateCollection();
    res.send(ans)
  }
  catch(e)
  {
    res.send(e)
  }
})

app.get("/write" , async (req, res)=> {
  try{

    const data = await Write();
    res.send("done")
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get("/write/multi" , async (req, res)=> {
  try{

    for(var i  =0 ; i<10; i++ )
    {
    const data = await Write();
    }
    res.send("done")
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get("/read" , async (req, res)=>{
  let { q }  = req.query
  try{
    if(typeof q == "string")
    {
    let data;
    let count  = parseInt(q);
    if(count<0)
      res.status(400).send("put count more then 0")
    for(let i =0 ; i<count;i++)
    {
    data = await Read();
    }
    
    res.send(data)
  }
  else{
    res.status(400).send("Put a valid Count")
  }
  }
  catch(e)
  {
    res.status(400).send(e);

  }
})

app.get("/search", async (req, res) => {
  let { q } = req.query;
  q = q.toString()
  const searchParameters = {
    q: q,
    query_by: "title",
    sort_by: "ratings_count:desc",
  };
try{
  const data = await Search(searchParameters);
  res.send(data)
}
catch(e)
{
  res.send(e)
}
});

app.get('/read/one' , async ( req, res ) =>{
  try{
    await ReadOne();
    res.send("done")
  }
  catch(e)
  {
    res.status(400).send(e)
  }
})