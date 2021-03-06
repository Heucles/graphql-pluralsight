const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} = require('graphql');

const pgdb = require('../../database/pgdb');

const ContestStatusType = require('./contest-status');

module.exports = new GraphQLObjectType({
  name: 'ContestType',

  fields: () => {
    const NameType = require('./name');
    return {
      id: { type: GraphQLID },
      code: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      status: { type: new GraphQLNonNull(ContestStatusType) },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      names:
      {
        type: new GraphQLList(NameType),
        resolve(obj, args, { pgPool }) {
          return pgdb(pgPool).getNames(obj);
        }
      }
    }
  }
});
