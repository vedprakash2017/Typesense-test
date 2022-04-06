// import  TypesenseClient  from "typesense";
import typesense from "typesense";

let client = new typesense.Client({
  nodes: [
    {
      host: "127.0.0.1",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 2,
});

export default client;
