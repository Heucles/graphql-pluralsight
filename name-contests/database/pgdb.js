const humps = require('humps');
const _ = require('lodash');

module.exports = (pgPool) => {

  const orderedFor = (rows, collection, field, singleObject) => {
    const data = humps.camelizeKeys(rows);

    const inGroupsOfField = _.groupBy(data, field);
    return collection.map((el) => {
      const elementArray = inGroupsOfField[el];
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray;
      }
      return singleObject ? {} : [];
    });
  };

  return {
    // OLD
    // getUserById(id) {
    //   return pgPool.query(`select * from users where id = $1`, [id])
    //     .then((res) => {
    //       return humps.camelizeKeys(res.rows[0]);
    //     });
    // },

    getUsersByApiKeys(apiKeys) {
       
      return pgPool.query(`select * from users where api_key = ANY($1)`, [apiKeys])
        .then((res) => {          
          return orderedFor(res.rows, apiKeys, 'apiKey', true);
        });
    },

    getUsersByIds(userIds) {
      return pgPool.query(`select * from users where id = ANY($1)`, [userIds])
        .then((res) => {
          return orderedFor(res.rows, userIds, 'id', true);
        });
    },


    getContestsForUserIds(userIds) {
      return pgPool.query(`
      select * from contests where created_by = ANY($1)`, [userIds])
        .then((res) => {
          return orderedFor(res.rows, userIds, 'createdBy', false);
        });
    },

    getNamesForContestIds(contestIds) {
      return pgPool.query(`
      select * from names where contest_id = ANY($1)`, [contestIds])
        .then((res) => {
          return orderedFor(res.rows, contestIds, 'contestId', false);
        });
    }
  };
};