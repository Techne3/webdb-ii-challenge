
exports.up = function(knex) {
    return knex.schema.table('cars', function(table) {
        // adds a primary kye, called 'id' as an auto increment integer
        table.increments();
  
        table.string('VIN',128).unique().notNullable();
        table.string('make',64).notNullable();
        table.string('model',128).notNullable();
        table.float('mileage',64).notNullable();
        table.string('transmission_type',64)
        table.string('title_status')
        
  
      table.timestamps(true, true);
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
