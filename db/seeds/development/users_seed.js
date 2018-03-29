exports.seed = function(knex, Promise) {
    return knex('users').del() // Deletes ALL existing entries
        .then(function() { // Inserts seed entries one by one in series
            return knex('users').insert({
                username: 'ad@ad.com',
                password: 'aaaaaa',
                admin: false,
                mandataire: true
            });
        });
};