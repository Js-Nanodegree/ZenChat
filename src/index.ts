import  express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { resolvers } from './resolver'
import {initializeApp} from "firebase/app";

const app = express();

initializeApp({
  apiKey: 'AIzaSyBAnJSjK8SAP267JQHKy5xHWiBl2lb_KN8',
  authDomain: 'zencar-client.firebaseapp.com',
  projectId: 'zencar-client',
  storageBucket: 'zencar-client.appspot.com',
  messagingSenderId: '1004420877530',
  appId: '1:1004420877530:web:b055b5653b8e1a3627a9e3',
  measurementId: 'G-C7RVKHYXBM',
  databaseURL: 'https://zencar-client.firebaseio.com/',
});


let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.get("/rest", function (req, res) {
  res.json({ data: "api working" });
});

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});