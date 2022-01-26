import { parseQuery, parseResults } from "./parser.js";

//MongoDB
import mpkg from "mongodb";
const { MongoClient } = mpkg;
const uri =
  "mongodb+srv://masonqpb:sprojdraftpassword@sandbox.tra3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Fetches data from MongoDB Database
async function mongoCollectData(db, collection, query, mongoClient) {
  var data_return = [db, collection, JSON.stringify(query)];
  try {
    const collection = mongoClient
      .db(data_return[0])
      .collection(data_return[1]);

    //Extract mongodb data to be usable
    const data_test = await collection.aggregate(query);
    const temp_data = await data_test.toArray();

    //Push final data onto array
    data_return.push(temp_data);

    //Parse the query with helper function
    let parsedQuery = parseQuery(query);
    //Add local collection to parsed query object
    parsedQuery.local = data_return[1];

    //Add the document count attribute
    let finalDocs = temp_data.length;
    parsedQuery.finalDocs = finalDocs;

    //Push the parsed query and parsed data to the final data object
    data_return.push(parsedQuery);
    data_return.push(parseResults(data_return[3]));
  } catch (e) {
    console.log(e);
  }

  return data_return;
}

export { mongoCollectData };
