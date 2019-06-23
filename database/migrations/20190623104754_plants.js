exports.up = function(knex) {
  
    return knex.schema.createTable('plants', plants => {
      plants.increments();
  
      plants
        .string('plantname', 128)
        .notNullable()
        .unique();

      plants.string('plantdesc', 255).notNullable();

      plants
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants');
  };
  