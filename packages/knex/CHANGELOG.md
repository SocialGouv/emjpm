# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [23.6.0](https://github.com/SocialGouv/emjpm/compare/v23.5.0...v23.6.0) (2019-09-11)


### Features

* **mandataire-list:** add real data fetch and paginate ([#708](https://github.com/SocialGouv/emjpm/issues/708)) ([4e54e6f](https://github.com/SocialGouv/emjpm/commit/4e54e6f))





# [23.5.0](https://github.com/SocialGouv/emjpm/compare/v23.4.5...v23.5.0) (2019-09-09)


### Bug Fixes

* **deps:** update dependency pg to ^7.11.0 ([#496](https://github.com/SocialGouv/emjpm/issues/496)) ([c16a5eb](https://github.com/SocialGouv/emjpm/commit/c16a5eb))
* **direction:** initialize indicator data ([#698](https://github.com/SocialGouv/emjpm/issues/698)) ([982e0ef](https://github.com/SocialGouv/emjpm/commit/982e0ef))
* **migration:** fix antenne migration ([#614](https://github.com/SocialGouv/emjpm/issues/614)) ([f3a5032](https://github.com/SocialGouv/emjpm/commit/f3a5032))
* **seed:** fix tis imports ([#574](https://github.com/SocialGouv/emjpm/issues/574)) ([2125448](https://github.com/SocialGouv/emjpm/commit/2125448))
* **seed:** remove first cvs column while importing zip code ([#445](https://github.com/SocialGouv/emjpm/issues/445)) ([761fa97](https://github.com/SocialGouv/emjpm/commit/761fa97))


### Features

* **api:** add postal-code and city synchronisation ([#424](https://github.com/SocialGouv/emjpm/issues/424)) ([3a31901](https://github.com/SocialGouv/emjpm/commit/3a31901))
* **db:** initialise departement for mesures and add FKwq ([#615](https://github.com/SocialGouv/emjpm/issues/615)) ([035de95](https://github.com/SocialGouv/emjpm/commit/035de95))
* **department-id:** add column in mandataires and services ([#707](https://github.com/SocialGouv/emjpm/issues/707)) ([a379b95](https://github.com/SocialGouv/emjpm/commit/a379b95))
* **direction:** connect mandataire components to data ([#696](https://github.com/SocialGouv/emjpm/issues/696)) ([c7daab5](https://github.com/SocialGouv/emjpm/commit/c7daab5))
* **direction:** relies statistic on service ([#697](https://github.com/SocialGouv/emjpm/issues/697)) ([c05e70c](https://github.com/SocialGouv/emjpm/commit/c05e70c))
* **direction-seed:** add user direction seed ([#654](https://github.com/SocialGouv/emjpm/issues/654)) ([6632e34](https://github.com/SocialGouv/emjpm/commit/6632e34))
* **hasura:** introduce hasura, change auth ([#504](https://github.com/SocialGouv/emjpm/issues/504)) ([83a0fe9](https://github.com/SocialGouv/emjpm/commit/83a0fe9))
* **inscription:** fix service creation with new database organization ([#672](https://github.com/SocialGouv/emjpm/issues/672)) ([f25c2a0](https://github.com/SocialGouv/emjpm/commit/f25c2a0))
* **inscription:** inscription for dr and dd ([#518](https://github.com/SocialGouv/emjpm/issues/518)) ([8ab7c93](https://github.com/SocialGouv/emjpm/commit/8ab7c93))
* **mesure-stat:** implement department availability stat ([#631](https://github.com/SocialGouv/emjpm/issues/631)) ([7bf24e1](https://github.com/SocialGouv/emjpm/commit/7bf24e1))
* **mesures:** add departement_id for mesures ([#571](https://github.com/SocialGouv/emjpm/issues/571)) ([12d46a7](https://github.com/SocialGouv/emjpm/commit/12d46a7))
* **service-antenne:** introduce service antenne without changing UI ([#584](https://github.com/SocialGouv/emjpm/issues/584)) ([0f855c5](https://github.com/SocialGouv/emjpm/commit/0f855c5))
* **tis:** remove columns from tis table ([#551](https://github.com/SocialGouv/emjpm/issues/551)) ([a5be04a](https://github.com/SocialGouv/emjpm/commit/a5be04a))





## [23.4.5](https://github.com/SocialGouv/emjpm/compare/v23.4.4...v23.4.5) (2019-07-05)

**Note:** Version bump only for package @emjpm/knex





## [23.4.4](https://github.com/SocialGouv/emjpm/compare/v23.4.3...v23.4.4) (2019-07-05)

**Note:** Version bump only for package @emjpm/knex





## [23.4.3](https://github.com/SocialGouv/emjpm/compare/v23.4.2...v23.4.3) (2019-07-05)

**Note:** Version bump only for package @emjpm/knex





## [23.4.2](https://github.com/SocialGouv/emjpm/compare/v23.4.1...v23.4.2) (2019-07-05)

**Note:** Version bump only for package @emjpm/knex





## [23.4.1](https://github.com/SocialGouv/emjpm/compare/v23.4.0...v23.4.1) (2019-07-04)

**Note:** Version bump only for package @emjpm/knex





# [23.4.0](https://github.com/SocialGouv/emjpm/compare/v23.3.333...v23.4.0) (2019-07-04)

**Note:** Version bump only for package @emjpm/knex





## [23.3.333](https://github.com/SocialGouv/emjpm/compare/v1.2.0...v23.3.333) (2019-06-13)


### Bug Fixes

* **knex:** remove dependence on api files ([#262](https://github.com/SocialGouv/emjpm/issues/262)) ([70fff92](https://github.com/SocialGouv/emjpm/commit/70fff92))





# [1.2.0](https://github.com/SocialGouv/emjpm/compare/v1.1.0...v1.2.0) (2019-06-04)


### Features

* **magistrats:** add numero RG to reservation mesure ([#248](https://github.com/SocialGouv/emjpm/issues/248)) ([964ae0c](https://github.com/SocialGouv/emjpm/commit/964ae0c))
* **services:** add services antennes and inscription for mandataires ([#216](https://github.com/SocialGouv/emjpm/issues/216)) ([2d0157b](https://github.com/SocialGouv/emjpm/commit/2d0157b))
* **services:** Migration files for updating services ([#244](https://github.com/SocialGouv/emjpm/issues/244)) ([8c975b7](https://github.com/SocialGouv/emjpm/commit/8c975b7))





# [1.1.0](https://github.com/SocialGouv/emjpm/compare/v0.0.2...v1.1.0) (2019-05-21)


### Bug Fixes

* **deps:** update dependency knex to ^0.16.5 ([#117](https://github.com/SocialGouv/emjpm/issues/117)) ([caba268](https://github.com/SocialGouv/emjpm/commit/caba268))


### Features

* **jest-environment-knex:** make it a standalone package ([#173](https://github.com/SocialGouv/emjpm/issues/173)) ([d178651](https://github.com/SocialGouv/emjpm/commit/d178651))
