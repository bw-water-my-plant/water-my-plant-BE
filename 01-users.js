
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
         username: 'Tracy', 
         password: '1234',
         phone: '313-123-4567'
        },
        {
         username: 'Steve', 
         password: '1234',
         phone: '313-123-4568'
        },
        {
         username: 'Sammy', 
         password: '1234',
         phone: '313-123-4568'
        },
        {
          username: 'Timmy', 
          password: '1234',
          phone: '313-123-4568'
         }
      ]);
    });
};
