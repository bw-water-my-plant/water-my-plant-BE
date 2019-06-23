
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('enter-table-to-truncate').truncate()
    .then(function () {
      // No seed entries, just clean it out
      return ;
    });
};
