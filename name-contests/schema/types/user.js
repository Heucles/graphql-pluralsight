const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql');

//const { fromSnakeCase } = require('../../lib/util');

const ContestType = require('./contest');
const pgdb = require('../../database/pgdb');
const mongoDb = require('../../database/mongoDatabase');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: () => {

    return {
      id: { type: GraphQLID },

      // one way of handling different field names
      //
      // oneWayfirstName: {
      //   type: GraphQLString,
      //   resolve: obj => obj.first_name
      // },
      // another good way of handling different field names    
      //firstName: fromSnakeCase(GraphQLString),

      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      contests: {
        type: new GraphQLList(ContestType),
        resolve: (obj, args, { pgPool }) => {
          return pgdb(pgPool).getContests(obj);
        }
      },

      namesCount: {
        type: GraphQLInt,
        resolve(obj, args, { mongoPool }, { fieldName }) {
          return mongoDb(mongoPool).getCounts(obj, fieldName)
        }
      },

      votesCount: {
        type: GraphQLInt,
        resolve(obj, args, { mongoPool }, { fieldName }) {
          return mongoDb(mongoPool).getCounts(obj, fieldName)
        }
      },

      contestsCount: {
        type: GraphQLInt,
        resolve(obj, args, { mongoPool }, { fieldName }) {
          return mongoDb(mongoPool).getCounts(obj, fieldName)
        }
      },

      email: { type: new GraphQLNonNull(GraphQLString) }
    }
  }
});