exports.up = function (knex) {
  return knex.schema.createTable("views", function (table) {
    table.increments("view_id").primary();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("views");
};
