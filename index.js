const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })

});

//60c0fe5cff301b09f37b52f6
//https://cloud.mongodb.com/v2/60c0fe5cff301b09f37b52f6#clusters/connect?clusterId=socialmediaapp

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
      return  server.listen({ port: 5000 })
})
.then((res) => {
        console.log(`Server running at ${res.url}`);
    });

