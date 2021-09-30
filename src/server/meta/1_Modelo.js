exports.seed = function (knex) {
  return knex("")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("").insert([{}]);
    });
};
