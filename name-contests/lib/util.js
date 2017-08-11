const humps = require('humps');

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',

  fromSnakeCase(GraphQLType) {
    return {
      type: GraphQLType,
      resolve: (obj, args, ctx, { fieldName }) => {
        console.log(humps.decamelize(fieldName))
        return obj[humps.decamelize(fieldName)]
      }
    }
  }
};