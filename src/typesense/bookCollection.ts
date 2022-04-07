
import client from "./client";
import CollectionCreateSchema from "typesense"
import * as fs from "fs/promises";


const CreateCollection = async()=>{
try{
const data = await client
.collections()
.create({
  name: "books",
  fields: [
    { name: "title", type: "string" },
    { name: "authors", type: "string[]", facet: true },
    { name: "image_url", type: "string" },
    { name: "publication_year", type: "int32", facet: true },
    { name: "ratings_count", type: "int32" },
    { name: "average_rating", type: "float" },
  ],
  default_sorting_field: "ratings_count",
});
  return "created!"
}
catch(err){
  console.log("error in create")
  if (!err.httpStatus) return "error!";
  else return "Collection already added!";
}
}



const Search = async (searchParameters)=>{
  try{
  const data = await client
    .collections("books")
    .documents()
    .search(searchParameters)
    return data;
  }
  catch(e)
  {
    console.log("getting error on search!");

    throw new Error(e);
  }
}
const Write = async()=>{

      const booksInJsonl:any = await fs.readFile(
        "/Users/vedprakash/citymall/typesense-sample/data/write.jsonl"
      );
      if(booksInJsonl)
      try{
      await client.collections("books").documents().import(booksInJsonl , {action:"create"});
      }
      catch{
        console.log("error in call!")
      }
  }

const Read = async()=>{
  
        try{
        const data = await client.collections("books").documents().export();
        await fs.writeFile("/Users/vedprakash/citymall/typesense-sample/data/read.jsonl" , data)
        return data;
        }
        catch(e){

          console.log("error in call!")
          throw new Error(e);
        }
    }

const ReadOne = async ()=>{
    try{
      for(let i =  1 ; i<=1002; i++)
      {
        // dont know why but id 220 and 976 missing from collection data
        if(i!=220 && i!=976){
        let data = await client.collections('books').documents(i.toString()).retrieve();
        await fs.appendFile("/Users/vedprakash/citymall/typesense-sample/data/read.jsonl" , JSON.stringify(data)+'\n')
        }
      }
    }
    catch(e)
    {
        throw new Error(e)
    }
}
export   {CreateCollection , Search ,  Write , Read , ReadOne};