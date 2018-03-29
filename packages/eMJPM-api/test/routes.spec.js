process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback()
            .then(function() {
                knex.migrate.latest()
                    .then(function() {
                        return knex.seed.run()
                            .then(function() {
                                done();
                            });
                    });
            });
    });

    afterEach(function(done) {
        knex.migrate.rollback()
            .then(function() {
                done();
            });
    });

    describe('Get all mandatires', function() {
        it('should get all mandataires', function(done) {
            chai.request(server)
                .get('/api/v1/mandataires')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json; // jshint ignore:line
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('ma_commentaire');
                    res.body[0].ma_commentaire.should.equal('RAS');
                    res.body[0].should.have.property('ma_specilite');
                    res.body[0].ma_specilite.should.equal('none');
                    res.body[0].should.have.property('ma_curatelle');
                    res.body[0].ma_curatelle.should.equal(0);
                    res.body[0].should.have.property('ma_sauvegarde');
                    res.body[0].ma_sauvegarde.should.equal(0);
                    res.body[0].should.have.property('ma_curatelle_renforce');
                    res.body[0].ma_curatelle_renforce.should.equal(0);
                    res.body[0].should.have.property('ma_referent');
                    res.body[0].ma_referent.should.equal('cathy.blauwblomme@chru-lille.fr');
                    res.body[0].should.have.property('ma_latitude');
                    res.body[0].ma_latitude.should.equal(50.6112);
                    res.body[0].should.have.property('ma_longitude');
                    res.body[0].ma_longitude.should.equal(3.0317);
                    res.body[0].should.have.property('ma_adresse');
                    res.body[0].ma_adresse.should.equal('Lille');
                    res.body[0].should.have.property('ma_capacite');
                    res.body[0].ma_capacite.should.equal(4);
                    res.body[0].should.have.property('ma_ville');
                    res.body[0].ma_ville.should.equal('LILLE CEDEX');
                    res.body[0].should.have.property('ma_telephone');
                    res.body[0].ma_telephone.should.equal('03 20 44 46 03');
                    res.body[0].should.have.property('ma_type');
                    res.body[0].ma_type.should.equal('preposes');
                    res.body[0].should.have.property('ma_tribunal_instance');
                    res.body[0].ma_tribunal_instance.should.equal('Lille');
                    res.body[0].should.have.property('ma_etablissement');
                    res.body[0].ma_etablissement.should.equal('CHRU');
                    res.body[0].should.have.property('ma_email');
                    res.body[0].ma_email.should.equal('cathy.blauwblomme@chru-lille.fr');
                    res.body[0].should.have.property('ma_code_postal');
                    res.body[0].ma_code_postal.should.equal('75000');
                    done();
                });
        });
    });

});