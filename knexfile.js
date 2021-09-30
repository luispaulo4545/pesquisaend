module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://cwsaqdub:MCtfEpfzMfkdQD54NViiFf0pNgQs754y@tuffi.db.elephantsql.com:5432/cwsaqdub",
    migrations: {
      directory: "./src/server/generators",
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./src/server/meta",
    },
  },
};
