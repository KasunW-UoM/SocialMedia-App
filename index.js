const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');

const typeDefs = gql`
type Post{
    id:ID!
    body:String!
    createat:String!
    username:String!
}
  type Query {
    getPosts:[Post]
  }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
       }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,

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

