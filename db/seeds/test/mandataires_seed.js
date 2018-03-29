exports.seed = function(knex, Promise) {
    return knex('mandataires').del() // Deletes ALL existing entries
        .then(function() { // Inserts seed entries one by one in series
            return knex('mandataires').insert({
                ma_etablissement: 'CHRU',
                ma_email: 'cathy.blauwblomme@chru-lille.fr',
                ma_type: 'preposes',
                ma_code_postal: '75000',
                ma_ville: 'LILLE CEDEX',
                ma_telephone: '03 20 44 46 03',
                ma_tribunal_instance: 'Lille',
                ma_latitude: 50.6112,
                ma_longitude: 3.0317,
                ma_adresse: 'Lille',
                ma_capacite: 4,
                ma_curatelle: 0,
                ma_sauvegarde: 0,
                ma_curatelle_renforce: 0,
                ma_referent: 'cathy.blauwblomme@chru-lille.fr',
                ma_commentaire: 'RAS',
                ma_specilite: 'none',
            });
        });
};