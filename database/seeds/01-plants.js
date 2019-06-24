 
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {
         plantname: 'Cactus', 
         plantdesc: 'Located in front room, needs lots of water',
         user_id: 1
        },
        {
         plantname: 'Boston Fern', 
         plantdesc: 'Big fern, blue pot on back porch',
         user_id: 1
        },
        {
         plantname: 'Aloe Vera', 
         plantdesc: 'Medicinal plant used for burns',
         user_id: 1

        },
        {
          plantname: 'Calla Lilly', 
          plantdesc: 'A gift from my aunt, located in Front room, should be re-potted soon',
          user_id: 1
         }
      ]);
    });
};
