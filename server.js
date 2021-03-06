import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";
import cors from "cors";

//Initializing an Express server
const app = express();

//Allowing cross origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
