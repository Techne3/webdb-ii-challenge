
exports.seed = function(knex) {
    return knex('cars').truncate()
      .then(function () {
        return knex('cars').insert([
          { VIN:32323,make:'Honda',model:'Civic',mileage:2 },
          { VIN:3232333,make:'Jeep',model:'Cherokee',mileage:20 },
        ]);
      });
  };