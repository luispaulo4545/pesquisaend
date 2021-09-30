const configuration = require("../../../knexfile");
const knex = require("knex");

const getDatabaseConnector = () => {
  if (global.cachedConnection) {
    return global.cachedConnection;
  }
  const config = configuration.development;

  if (!config) {
    throw new Error(`Failed to get knex configuration for env:`);
  }

  const connection = knex(config);
  global.cachedConnection = connection;
  return connection;
};

const conexao = getDatabaseConnector();

module.exports = conexao;
