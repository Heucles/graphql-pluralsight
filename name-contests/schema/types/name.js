const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  Gra
   } = require('graphql');

//const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
  name: 'Name',

  fields: () => {
    const UserType = require('./user');
    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      createdBy: {
        type: new GraphQLNonNull(UserType),
        resolve: (obj, args, { loaders }) => {
          return loaders.usersByIds.load(obj.createdBy);
          //return pgdb(pgPool).getUserById(obj.createdBy)
        }
      }
    }
  }
});

    // id
    // label
    // description
    // createdAt
    // createdBy