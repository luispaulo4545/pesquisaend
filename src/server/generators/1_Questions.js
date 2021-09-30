exports.up = function (knex) {
  return knex.schema.createTable("questions", function (table) {
    table.increments("question_id").primary();
    table.string("question_nome").notNullable();
    table.string("question_email").notNullable();
    table.string("question_telefone");
    table.string("question_nota").notNullable();
    table.string("question_motivo");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("questions");
};
