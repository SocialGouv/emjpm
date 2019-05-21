# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.0](https://github.com/SocialGouv/emjpm/compare/v0.0.2...v1.1.0) (2019-05-21)


### Bug Fixes

* **api:** async/await try/catch GET /inscription/tis ([#72](https://github.com/SocialGouv/emjpm/issues/72)) ([a5f4ff9](https://github.com/SocialGouv/emjpm/commit/a5f4ff9))
* **api:** explicite mandataires data order on getMandataires fct ([#70](https://github.com/SocialGouv/emjpm/issues/70)) ([883874a](https://github.com/SocialGouv/emjpm/commit/883874a))
* **api:** try/catch GET /admin/mandataires ([#71](https://github.com/SocialGouv/emjpm/issues/71)) ([6a5d3f8](https://github.com/SocialGouv/emjpm/commit/6a5d3f8))
* **app:** handle phone and postcode validation without alerts ([#52](https://github.com/SocialGouv/emjpm/issues/52)) ([93248aa](https://github.com/SocialGouv/emjpm/commit/93248aa))
* **app:** revert to innerRef on search by code postal ([#159](https://github.com/SocialGouv/emjpm/issues/159)) ([d01b816](https://github.com/SocialGouv/emjpm/commit/d01b816))
* **deps:** update dependency @wessberg/color to v1 ([#146](https://github.com/SocialGouv/emjpm/issues/146)) ([2b9c2f4](https://github.com/SocialGouv/emjpm/commit/2b9c2f4))
* **deps:** update dependency body-parser to ^1.19.0 ([#163](https://github.com/SocialGouv/emjpm/issues/163)) ([72cbcc5](https://github.com/SocialGouv/emjpm/commit/72cbcc5))
* **deps:** update dependency bootstrap to ^4.3.1 ([#107](https://github.com/SocialGouv/emjpm/issues/107)) ([272ca54](https://github.com/SocialGouv/emjpm/commit/272ca54))
* **deps:** update dependency cookie-parser to ~1.4.4 ([#108](https://github.com/SocialGouv/emjpm/issues/108)) ([6ad7540](https://github.com/SocialGouv/emjpm/commit/6ad7540))
* **deps:** update dependency cors to ^2.8.5 ([#109](https://github.com/SocialGouv/emjpm/issues/109)) ([f1175b8](https://github.com/SocialGouv/emjpm/commit/f1175b8))
* **deps:** update dependency csvjson to ^5.1.0 ([#110](https://github.com/SocialGouv/emjpm/issues/110)) ([5b44dce](https://github.com/SocialGouv/emjpm/commit/5b44dce))
* **deps:** update dependency date-fns to ^1.30.1 ([#111](https://github.com/SocialGouv/emjpm/issues/111)) ([a97153a](https://github.com/SocialGouv/emjpm/commit/a97153a))
* **deps:** update dependency debug to v4 ([#147](https://github.com/SocialGouv/emjpm/issues/147)) ([59b2491](https://github.com/SocialGouv/emjpm/commit/59b2491))
* **deps:** update dependency detect-browser to v4 ([#148](https://github.com/SocialGouv/emjpm/issues/148)) ([1c5b15d](https://github.com/SocialGouv/emjpm/commit/1c5b15d))
* **deps:** update dependency es6-promise to ^4.2.6 ([#112](https://github.com/SocialGouv/emjpm/issues/112)) ([a60ddd6](https://github.com/SocialGouv/emjpm/commit/a60ddd6))
* **deps:** update dependency express-session to ^1.16.1 ([#113](https://github.com/SocialGouv/emjpm/issues/113)) ([0bdecbb](https://github.com/SocialGouv/emjpm/commit/0bdecbb))
* **deps:** update dependency fuse.js to ^3.4.4 ([#114](https://github.com/SocialGouv/emjpm/issues/114)) ([adc2b5a](https://github.com/SocialGouv/emjpm/commit/adc2b5a))
* **deps:** update dependency http-errors to ^1.7.2 ([#115](https://github.com/SocialGouv/emjpm/issues/115)) ([8b27913](https://github.com/SocialGouv/emjpm/commit/8b27913))
* **deps:** update dependency jsonwebtoken to ^8.5.1 ([#116](https://github.com/SocialGouv/emjpm/issues/116)) ([50df6f6](https://github.com/SocialGouv/emjpm/commit/50df6f6))
* **deps:** update dependency knex to ^0.16.5 ([#117](https://github.com/SocialGouv/emjpm/issues/117)) ([caba268](https://github.com/SocialGouv/emjpm/commit/caba268))
* **deps:** update dependency leaflet to ^1.4.0 ([#118](https://github.com/SocialGouv/emjpm/issues/118)) ([70b543d](https://github.com/SocialGouv/emjpm/commit/70b543d))
* **deps:** update dependency morgan to ^1.9.1 ([#119](https://github.com/SocialGouv/emjpm/issues/119)) ([e2727a2](https://github.com/SocialGouv/emjpm/commit/e2727a2))
* **deps:** update dependency next-images to ^1.1.1 ([#120](https://github.com/SocialGouv/emjpm/issues/120)) ([1cbb4e3](https://github.com/SocialGouv/emjpm/commit/1cbb4e3))
* **deps:** update dependency next-plugin-transpile-modules to v2 ([#150](https://github.com/SocialGouv/emjpm/issues/150)) ([efa9848](https://github.com/SocialGouv/emjpm/commit/efa9848))
* **deps:** update dependency nodemailer to v6 ([#151](https://github.com/SocialGouv/emjpm/issues/151)) ([20ee339](https://github.com/SocialGouv/emjpm/commit/20ee339))
* **deps:** update dependency prop-types to ^15.7.2 ([#122](https://github.com/SocialGouv/emjpm/issues/122)) ([73af2f9](https://github.com/SocialGouv/emjpm/commit/73af2f9))
* **deps:** update dependency query-string to ^6.4.2 ([#123](https://github.com/SocialGouv/emjpm/issues/123)) ([6366615](https://github.com/SocialGouv/emjpm/commit/6366615))
* **deps:** update dependency query-string to ^6.5.0 ([#168](https://github.com/SocialGouv/emjpm/issues/168)) ([5aca44f](https://github.com/SocialGouv/emjpm/commit/5aca44f))
* **deps:** update dependency react-cookie to v3 ([#152](https://github.com/SocialGouv/emjpm/issues/152)) ([e62a6fd](https://github.com/SocialGouv/emjpm/commit/e62a6fd))
* **deps:** update dependency react-feather to ^1.1.6 ([#124](https://github.com/SocialGouv/emjpm/issues/124)) ([86a1cf1](https://github.com/SocialGouv/emjpm/commit/86a1cf1))
* **deps:** update dependency react-icons to v3 ([#153](https://github.com/SocialGouv/emjpm/issues/153)) ([e74ce05](https://github.com/SocialGouv/emjpm/commit/e74ce05))
* **deps:** update dependency react-jsonschema-form to ^1.5.0 ([#126](https://github.com/SocialGouv/emjpm/issues/126)) ([b0d4896](https://github.com/SocialGouv/emjpm/commit/b0d4896))
* **deps:** update dependency react-leaflet to v2 ([#154](https://github.com/SocialGouv/emjpm/issues/154)) ([34a53ce](https://github.com/SocialGouv/emjpm/commit/34a53ce))
* **deps:** update dependency react-modal to ^3.8.1 ([#127](https://github.com/SocialGouv/emjpm/issues/127)) ([26f9fd6](https://github.com/SocialGouv/emjpm/commit/26f9fd6))
* **deps:** update dependency react-piwik to ^1.6.0 ([#128](https://github.com/SocialGouv/emjpm/issues/128)) ([92ff697](https://github.com/SocialGouv/emjpm/commit/92ff697))
* **deps:** update dependency react-redux to v7 ([#155](https://github.com/SocialGouv/emjpm/issues/155)) ([b86771e](https://github.com/SocialGouv/emjpm/commit/b86771e))
* **deps:** update dependency react-table to ^6.10.0 ([#129](https://github.com/SocialGouv/emjpm/issues/129)) ([e77899a](https://github.com/SocialGouv/emjpm/commit/e77899a))
* **deps:** update dependency react-tabs to v3 ([#156](https://github.com/SocialGouv/emjpm/issues/156)) ([e2c1b2d](https://github.com/SocialGouv/emjpm/commit/e2c1b2d))
* **deps:** update dependency redux to ^4.0.1 ([#130](https://github.com/SocialGouv/emjpm/issues/130)) ([cff885c](https://github.com/SocialGouv/emjpm/commit/cff885c))
* **deps:** update dependency redux-modal to v3 ([#157](https://github.com/SocialGouv/emjpm/issues/157)) ([1c9dd11](https://github.com/SocialGouv/emjpm/commit/1c9dd11))
* **deps:** update dependency styled-jsx to v3 ([#164](https://github.com/SocialGouv/emjpm/issues/164)) ([2161d4e](https://github.com/SocialGouv/emjpm/commit/2161d4e))
* **deps:** update dependency swagger-jsdoc to ^3.2.9 ([#131](https://github.com/SocialGouv/emjpm/issues/131)) ([99c48a4](https://github.com/SocialGouv/emjpm/commit/99c48a4))
* **deps:** update dependency swagger-ui-dist to ^3.22.1 ([#132](https://github.com/SocialGouv/emjpm/issues/132)) ([28d3f21](https://github.com/SocialGouv/emjpm/commit/28d3f21))
* **deps:** update dependency xlsx to ^0.14.2 ([#133](https://github.com/SocialGouv/emjpm/issues/133)) ([8c71ad4](https://github.com/SocialGouv/emjpm/commit/8c71ad4))
* **deps:** update dependency xlsx to ^0.14.3 ([#174](https://github.com/SocialGouv/emjpm/issues/174)) ([8416967](https://github.com/SocialGouv/emjpm/commit/8416967))
* **deps:** update react monorepo to ^16.8.6 ([#134](https://github.com/SocialGouv/emjpm/issues/134)) ([593faf8](https://github.com/SocialGouv/emjpm/commit/593faf8))
* **import:** add missing IE11 polyfill ([#80](https://github.com/SocialGouv/emjpm/issues/80)) ([ec2f131](https://github.com/SocialGouv/emjpm/commit/ec2f131))


### Features

* **api:** add GET /mandataires/postcode/:postcode route ([#47](https://github.com/SocialGouv/emjpm/issues/47)) ([ab63f66](https://github.com/SocialGouv/emjpm/commit/ab63f66))
* **app:** actually remove cypress in favour of the optional e2e pkg ([#165](https://github.com/SocialGouv/emjpm/issues/165)) ([3e83a94](https://github.com/SocialGouv/emjpm/commit/3e83a94))
* **app:** remember username on login ([#81](https://github.com/SocialGouv/emjpm/issues/81)) ([fcacb89](https://github.com/SocialGouv/emjpm/commit/fcacb89))
* **docker:** use postgres 11 :tada: ([#69](https://github.com/SocialGouv/emjpm/issues/69)) ([7a15750](https://github.com/SocialGouv/emjpm/commit/7a15750))
* **jest-environment-knex:** make it a standalone package ([#173](https://github.com/SocialGouv/emjpm/issues/173)) ([d178651](https://github.com/SocialGouv/emjpm/commit/d178651))


### Performance Improvements

* **api:** allow parallel e2e testing :dash: ([#74](https://github.com/SocialGouv/emjpm/issues/74)) ([79bc9b6](https://github.com/SocialGouv/emjpm/commit/79bc9b6))


### BREAKING CHANGES

* **api:** remove POST /mandataires/PosteCode route
    It feel more natural to get the postcodes from a `GET` method.



## 0.1.1 (2019-04-08)


### Bug Fixes

* **api:** POST /inscription/mandataires must return a promise ([#45](https://github.com/SocialGouv/emjpm/issues/45)) ([cdd0d50](https://github.com/SocialGouv/emjpm/commit/cdd0d50))
* **db:** users.reset_password_expires as timestamp migration ([1a8a1d5](https://github.com/SocialGouv/emjpm/commit/1a8a1d5))
* **docker:** api: dont use alpine because of node-gyp ([d480e8f](https://github.com/SocialGouv/emjpm/commit/d480e8f))
* **docker:** api: rm tz stuff ([15ec258](https://github.com/SocialGouv/emjpm/commit/15ec258))
* **docker:** use a static container_name ([#57](https://github.com/SocialGouv/emjpm/issues/57)) ([562a633](https://github.com/SocialGouv/emjpm/commit/562a633))
* **email-reservation:** amelioration textes ([35e7525](https://github.com/SocialGouv/emjpm/commit/35e7525))
* **import:** empty ddns ([#59](https://github.com/SocialGouv/emjpm/issues/59)) ([8b501cb](https://github.com/SocialGouv/emjpm/commit/8b501cb))
* **import:** reject when no columns ([#62](https://github.com/SocialGouv/emjpm/issues/62)) ([881e957](https://github.com/SocialGouv/emjpm/commit/881e957))
* **mesures:** force fix ordering ([01048a2](https://github.com/SocialGouv/emjpm/commit/01048a2))
* **review:** add some try/catch ([810013f](https://github.com/SocialGouv/emjpm/commit/810013f))
* **tests:** add GET_commentaires ([7cc5751](https://github.com/SocialGouv/emjpm/commit/7cc5751))
* **tests:** add some [@doug](https://github.com/doug) code ([07ae0d5](https://github.com/SocialGouv/emjpm/commit/07ae0d5))
* **tests:** cleanup + add routes.test.js ([d783483](https://github.com/SocialGouv/emjpm/commit/d783483))
* prevent some exceptions witj JWT decoding ([3881e41](https://github.com/SocialGouv/emjpm/commit/3881e41))
* **tests:** dont migrate db ([2792233](https://github.com/SocialGouv/emjpm/commit/2792233))
* **tests:** fix commentaires 401 ([dd0d92d](https://github.com/SocialGouv/emjpm/commit/dd0d92d))
* **tests:** fix POST_forgot_password.test.js ([acc5b47](https://github.com/SocialGouv/emjpm/commit/acc5b47))
* **tests:** force reset db ([bfbedf5](https://github.com/SocialGouv/emjpm/commit/bfbedf5))
* **tests:** inscription ([c263f8e](https://github.com/SocialGouv/emjpm/commit/c263f8e))
* **tests:** login: also check redirection ([6823904](https://github.com/SocialGouv/emjpm/commit/6823904))
* **tests:** mandataires tests ([0fd4c54](https://github.com/SocialGouv/emjpm/commit/0fd4c54))
* **tests:** more commentaires tests ([1c76be6](https://github.com/SocialGouv/emjpm/commit/1c76be6))
* **tests:** pass reset: add a test to ensure token+expiration reset ([c9613b0](https://github.com/SocialGouv/emjpm/commit/c9613b0))
* **tests:** POST_import ([658f06e](https://github.com/SocialGouv/emjpm/commit/658f06e))
* change email type ([0517fd2](https://github.com/SocialGouv/emjpm/commit/0517fd2))
* **tests:** refacto with createError ([9ab02c4](https://github.com/SocialGouv/emjpm/commit/9ab02c4))
* **tests:** update db snapshots with latest migrations ([ea6fc1f](https://github.com/SocialGouv/emjpm/commit/ea6fc1f))
* 404 error: show method too ([bce79fe](https://github.com/SocialGouv/emjpm/commit/bce79fe))
* allow to set sentry env segments ([fec3508](https://github.com/SocialGouv/emjpm/commit/fec3508))
* fix service auths ([3337bc4](https://github.com/SocialGouv/emjpm/commit/3337bc4))
* increase JSON POST limit ([9c2f1e7](https://github.com/SocialGouv/emjpm/commit/9c2f1e7))
* rm console ([1f25561](https://github.com/SocialGouv/emjpm/commit/1f25561))
* travis TZ fix ([#21](https://github.com/SocialGouv/emjpm/issues/21)) ([b9d0255](https://github.com/SocialGouv/emjpm/commit/b9d0255))
* Update mandataire profile ([00d81b8](https://github.com/SocialGouv/emjpm/commit/00d81b8))


### Features

* add colors to dispo ([1208c69](https://github.com/SocialGouv/emjpm/commit/1208c69))
* add En établissement avec conservation du domicile ([d9042f7](https://github.com/SocialGouv/emjpm/commit/d9042f7))
* add jwt limitation and ti profile ([75fecbc](https://github.com/SocialGouv/emjpm/commit/75fecbc))
* add nom and prenom to e2e inscription ([6f5848f](https://github.com/SocialGouv/emjpm/commit/6f5848f))
* add professionel name to mesure reservé for TI ([d3647e3](https://github.com/SocialGouv/emjpm/commit/d3647e3))
* add services ([3d405df](https://github.com/SocialGouv/emjpm/commit/3d405df))
* change Annee for importation ([c969e82](https://github.com/SocialGouv/emjpm/commit/c969e82))
* **excel:** more importable formats ([#54](https://github.com/SocialGouv/emjpm/issues/54)) ([1dd4c56](https://github.com/SocialGouv/emjpm/commit/1dd4c56))
* **tests:** add utils.shouldBeProtected ([0cbe795](https://github.com/SocialGouv/emjpm/commit/0cbe795))
* **tests:** import [@douglasduteil](https://github.com/douglasduteil) work ([e248198](https://github.com/SocialGouv/emjpm/commit/e248198))





## [0.0.2](https://github.com/SocialGouv/emjpm/compare/v0.0.1...v0.0.2) (2019-02-15)


### Bug Fixes

* **ci:** force release update ([27b584f](https://github.com/SocialGouv/emjpm/commit/27b584f))
