# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [23.6.0](https://github.com/SocialGouv/emjpm/compare/v23.5.0...v23.6.0) (2019-09-11)


### Features

* **direction:** apply filters in mandataires export ([#710](https://github.com/SocialGouv/emjpm/issues/710)) ([fa219d9](https://github.com/SocialGouv/emjpm/commit/fa219d9))
* **mandataire-list:** add real data fetch and paginate ([#708](https://github.com/SocialGouv/emjpm/issues/708)) ([4e54e6f](https://github.com/SocialGouv/emjpm/commit/4e54e6f))





# [23.5.0](https://github.com/SocialGouv/emjpm/compare/v23.4.5...v23.5.0) (2019-09-09)


### Bug Fixes

* **alert:** remove alert in favor of react modal ref [#582](https://github.com/SocialGouv/emjpm/issues/582) ([#585](https://github.com/SocialGouv/emjpm/issues/585)) ([cef5214](https://github.com/SocialGouv/emjpm/commit/cef5214))
* **api-signup:** add validation and update tests ([#620](https://github.com/SocialGouv/emjpm/issues/620)) ([e8ac0dc](https://github.com/SocialGouv/emjpm/commit/e8ac0dc))
* **apollo-state:** fix only browser apollo cache state ([#685](https://github.com/SocialGouv/emjpm/issues/685)) ([1dcce41](https://github.com/SocialGouv/emjpm/commit/1dcce41))
* **apollo-token:** fix token decode ([#689](https://github.com/SocialGouv/emjpm/issues/689)) ([8686079](https://github.com/SocialGouv/emjpm/commit/8686079))
* **current-id:** add missing currentUser verification ([#693](https://github.com/SocialGouv/emjpm/issues/693)) ([656533e](https://github.com/SocialGouv/emjpm/commit/656533e))
* **current-user:** add id instead of plain object ([#691](https://github.com/SocialGouv/emjpm/issues/691)) ([d8d953d](https://github.com/SocialGouv/emjpm/commit/d8d953d))
* **deps:** update dependencies ([#489](https://github.com/SocialGouv/emjpm/issues/489)) ([8ca4a42](https://github.com/SocialGouv/emjpm/commit/8ca4a42))
* **deps:** update dependency apollo-server-koa to ^2.6.9 ([#516](https://github.com/SocialGouv/emjpm/issues/516)) ([5e67123](https://github.com/SocialGouv/emjpm/commit/5e67123))
* **deps:** update dependency cypress to ^3.3.2 ([#464](https://github.com/SocialGouv/emjpm/issues/464)) ([f1056c1](https://github.com/SocialGouv/emjpm/commit/f1056c1))
* **deps:** update dependency detect-browser to ^4.6.0 ([#466](https://github.com/SocialGouv/emjpm/issues/466)) ([ed8cd19](https://github.com/SocialGouv/emjpm/commit/ed8cd19))
* **deps:** update dependency es6-promise to ^4.2.8 ([#467](https://github.com/SocialGouv/emjpm/issues/467)) ([bfcb45c](https://github.com/SocialGouv/emjpm/commit/bfcb45c))
* **deps:** update dependency nodemailer to ^6.3.0 ([#534](https://github.com/SocialGouv/emjpm/issues/534)) ([6278273](https://github.com/SocialGouv/emjpm/commit/6278273))
* **deps:** update dependency pg to ^4.5.7 ([#477](https://github.com/SocialGouv/emjpm/issues/477)) ([550af56](https://github.com/SocialGouv/emjpm/commit/550af56))
* **deps:** update dependency pg to ^7.11.0 ([#496](https://github.com/SocialGouv/emjpm/issues/496)) ([c16a5eb](https://github.com/SocialGouv/emjpm/commit/c16a5eb))
* **deps:** update dependency react-feather to v2 ([#494](https://github.com/SocialGouv/emjpm/issues/494)) ([1d5c930](https://github.com/SocialGouv/emjpm/commit/1d5c930))
* **deps:** update dependency react-modal to ^3.9.1 ([#537](https://github.com/SocialGouv/emjpm/issues/537)) ([baa1b6a](https://github.com/SocialGouv/emjpm/commit/baa1b6a))
* **deps:** update dependency redux to ^4.0.4 ([#497](https://github.com/SocialGouv/emjpm/issues/497)) ([046a28e](https://github.com/SocialGouv/emjpm/commit/046a28e))
* **deps:** update dependency swagger-ui-dist to ^3.23.1 ([#533](https://github.com/SocialGouv/emjpm/issues/533)) ([36a9ddf](https://github.com/SocialGouv/emjpm/commit/36a9ddf))
* **direction:** add tooltip title ([#705](https://github.com/SocialGouv/emjpm/issues/705)) ([4083467](https://github.com/SocialGouv/emjpm/commit/4083467))
* **direction:** initialize indicator data ([#698](https://github.com/SocialGouv/emjpm/issues/698)) ([982e0ef](https://github.com/SocialGouv/emjpm/commit/982e0ef))
* **disponibility-chart:** fix chart style ([#682](https://github.com/SocialGouv/emjpm/issues/682)) ([a231420](https://github.com/SocialGouv/emjpm/commit/a231420))
* **frontend:** remove apollo calls during SSR ([#664](https://github.com/SocialGouv/emjpm/issues/664)) ([714d2f7](https://github.com/SocialGouv/emjpm/commit/714d2f7))
* **get-user-id:** add fix for user id ([#695](https://github.com/SocialGouv/emjpm/issues/695)) ([09a5ec2](https://github.com/SocialGouv/emjpm/commit/09a5ec2))
* **hasrura:** remove table from metadata.json ([#638](https://github.com/SocialGouv/emjpm/issues/638)) ([7f57d60](https://github.com/SocialGouv/emjpm/commit/7f57d60))
* **hasura:** update HASURA_GRAPHQL_JWT_SECRET ([#627](https://github.com/SocialGouv/emjpm/issues/627)) ([20609a1](https://github.com/SocialGouv/emjpm/commit/20609a1))
* **hasura-remote-url:** fix url add env ([#653](https://github.com/SocialGouv/emjpm/issues/653)) ([6abdef2](https://github.com/SocialGouv/emjpm/commit/6abdef2))
* **layout:** remove test ([#665](https://github.com/SocialGouv/emjpm/issues/665)) ([aead2c7](https://github.com/SocialGouv/emjpm/commit/aead2c7))
* **mandataire:** edit mesure modal ([#694](https://github.com/SocialGouv/emjpm/issues/694)) ([36891c8](https://github.com/SocialGouv/emjpm/commit/36891c8))
* **mandataires:** prepose can see their etablissement ([#441](https://github.com/SocialGouv/emjpm/issues/441)) ([76f4eb5](https://github.com/SocialGouv/emjpm/commit/76f4eb5))
* **mandataires-style:** fix mandataires responsive style ([#701](https://github.com/SocialGouv/emjpm/issues/701)) ([7752f15](https://github.com/SocialGouv/emjpm/commit/7752f15))
* add persistent volume for cvs upload ([#426](https://github.com/SocialGouv/emjpm/issues/426)) ([480770d](https://github.com/SocialGouv/emjpm/commit/480770d))
* **map-panel:** fix panel remove deprecated components ([#681](https://github.com/SocialGouv/emjpm/issues/681)) ([d369fed](https://github.com/SocialGouv/emjpm/commit/d369fed))
* **mesure-evolution:** code splitting ([#648](https://github.com/SocialGouv/emjpm/issues/648)) ([face726](https://github.com/SocialGouv/emjpm/commit/face726))
* **migration:** fix antenne migration ([#614](https://github.com/SocialGouv/emjpm/issues/614)) ([f3a5032](https://github.com/SocialGouv/emjpm/commit/f3a5032))
* **seed:** fix tis imports ([#574](https://github.com/SocialGouv/emjpm/issues/574)) ([2125448](https://github.com/SocialGouv/emjpm/commit/2125448))
* **seed:** remove first cvs column while importing zip code ([#445](https://github.com/SocialGouv/emjpm/issues/445)) ([761fa97](https://github.com/SocialGouv/emjpm/commit/761fa97))
* **select-options:** change key args ([#639](https://github.com/SocialGouv/emjpm/issues/639)) ([f94eef1](https://github.com/SocialGouv/emjpm/commit/f94eef1))
* **sentry:** initialise sentry if necessary ([#626](https://github.com/SocialGouv/emjpm/issues/626)) ([a6457cb](https://github.com/SocialGouv/emjpm/commit/a6457cb))


### Features

* **api:** add postal-code and city synchronisation ([#424](https://github.com/SocialGouv/emjpm/issues/424)) ([3a31901](https://github.com/SocialGouv/emjpm/commit/3a31901))
* **apollo-client:** introduce apollo client ([#625](https://github.com/SocialGouv/emjpm/issues/625)) ([1de496c](https://github.com/SocialGouv/emjpm/commit/1de496c))
* **app:** update to next 9 and styled-components 4 ([#583](https://github.com/SocialGouv/emjpm/issues/583)) ([b29bd0c](https://github.com/SocialGouv/emjpm/commit/b29bd0c)), closes [#83](https://github.com/SocialGouv/emjpm/issues/83)
* **app:** use exportTrailingSlash next option ([#659](https://github.com/SocialGouv/emjpm/issues/659)) ([e1ca3aa](https://github.com/SocialGouv/emjpm/commit/e1ca3aa))
* **auth:** add current user id to apollo cache ffs ([#683](https://github.com/SocialGouv/emjpm/issues/683)) ([fb067c0](https://github.com/SocialGouv/emjpm/commit/fb067c0))
* **components-package:** add new component package ([#656](https://github.com/SocialGouv/emjpm/issues/656)) ([732e6a2](https://github.com/SocialGouv/emjpm/commit/732e6a2))
* **db:** initialise departement for mesures and add FKwq ([#615](https://github.com/SocialGouv/emjpm/issues/615)) ([035de95](https://github.com/SocialGouv/emjpm/commit/035de95))
* **demographic-datas:** add base ([#649](https://github.com/SocialGouv/emjpm/issues/649)) ([e6d3ffb](https://github.com/SocialGouv/emjpm/commit/e6d3ffb))
* **department-id:** add column in mandataires and services ([#707](https://github.com/SocialGouv/emjpm/issues/707)) ([a379b95](https://github.com/SocialGouv/emjpm/commit/a379b95))
* **direction:** add available mesure indicator ([#646](https://github.com/SocialGouv/emjpm/issues/646)) ([dcb6839](https://github.com/SocialGouv/emjpm/commit/dcb6839))
* **direction:** add open mesure indicator ([#645](https://github.com/SocialGouv/emjpm/issues/645)) ([ee66722](https://github.com/SocialGouv/emjpm/commit/ee66722))
* **direction:** allow filtering mesures by region ([#680](https://github.com/SocialGouv/emjpm/issues/680)) ([ffeca94](https://github.com/SocialGouv/emjpm/commit/ffeca94))
* **direction:** connect mandataire components to data ([#696](https://github.com/SocialGouv/emjpm/issues/696)) ([c7daab5](https://github.com/SocialGouv/emjpm/commit/c7daab5))
* **direction:** connect mandataire disponibility chart to data ([#704](https://github.com/SocialGouv/emjpm/issues/704)) ([4399eb5](https://github.com/SocialGouv/emjpm/commit/4399eb5))
* **direction:** implement indicators ([#640](https://github.com/SocialGouv/emjpm/issues/640)) ([c34ee9f](https://github.com/SocialGouv/emjpm/commit/c34ee9f))
* **direction:** implement mandataire export ([#703](https://github.com/SocialGouv/emjpm/issues/703)) ([0581d96](https://github.com/SocialGouv/emjpm/commit/0581d96))
* **direction:** introduce context to handle filters value ([#636](https://github.com/SocialGouv/emjpm/issues/636)) ([1d1bb5a](https://github.com/SocialGouv/emjpm/commit/1d1bb5a))
* **direction:** relies statistic on service ([#697](https://github.com/SocialGouv/emjpm/issues/697)) ([c05e70c](https://github.com/SocialGouv/emjpm/commit/c05e70c))
* **direction:** reorder files and code splitting ([#647](https://github.com/SocialGouv/emjpm/issues/647)) ([4d168d6](https://github.com/SocialGouv/emjpm/commit/4d168d6))
* **direction-map:** add map component with query ref [#544](https://github.com/SocialGouv/emjpm/issues/544) ([#641](https://github.com/SocialGouv/emjpm/issues/641)) ([523346e](https://github.com/SocialGouv/emjpm/commit/523346e))
* **direction-seed:** add user direction seed ([#654](https://github.com/SocialGouv/emjpm/issues/654)) ([6632e34](https://github.com/SocialGouv/emjpm/commit/6632e34))
* **gql:** use apollo-link-rest and pass auth token ([#634](https://github.com/SocialGouv/emjpm/issues/634)) ([389ddeb](https://github.com/SocialGouv/emjpm/commit/389ddeb))
* **graphql:** update models ([#579](https://github.com/SocialGouv/emjpm/issues/579)) ([6ba5d4b](https://github.com/SocialGouv/emjpm/commit/6ba5d4b))
* **graphql-example:** add test with type resolver ([#522](https://github.com/SocialGouv/emjpm/issues/522)) ([8974356](https://github.com/SocialGouv/emjpm/commit/8974356))
* **graphql-server:** implement graphql mesure stats resolver ([#562](https://github.com/SocialGouv/emjpm/issues/562)) ([0707ba3](https://github.com/SocialGouv/emjpm/commit/0707ba3))
* **hasura:** introduce hasura, change auth ([#504](https://github.com/SocialGouv/emjpm/issues/504)) ([83a0fe9](https://github.com/SocialGouv/emjpm/commit/83a0fe9))
* **hasura:** use custom image that auto apply metadata ([#633](https://github.com/SocialGouv/emjpm/issues/633)) ([90640d2](https://github.com/SocialGouv/emjpm/commit/90640d2))
* **inscription:** fix service creation with new database organization ([#672](https://github.com/SocialGouv/emjpm/issues/672)) ([f25c2a0](https://github.com/SocialGouv/emjpm/commit/f25c2a0))
* **inscription:** inscription for dr and dd ([#518](https://github.com/SocialGouv/emjpm/issues/518)) ([8ab7c93](https://github.com/SocialGouv/emjpm/commit/8ab7c93))
* **layout:** refactor layout and box code ([#651](https://github.com/SocialGouv/emjpm/issues/651)) ([190ad69](https://github.com/SocialGouv/emjpm/commit/190ad69))
* **logger:** graphql-server - add pino logger ([#550](https://github.com/SocialGouv/emjpm/issues/550)) ([4fd4f65](https://github.com/SocialGouv/emjpm/commit/4fd4f65))
* **logout:** add new logout function with protected routes hoc ([#671](https://github.com/SocialGouv/emjpm/issues/671)) ([16aed9e](https://github.com/SocialGouv/emjpm/commit/16aed9e))
* **mandataire-activity:** add activity chart ([#676](https://github.com/SocialGouv/emjpm/issues/676)) ([8fb975f](https://github.com/SocialGouv/emjpm/commit/8fb975f))
* **mandataire-capacity:** add mandataires page base components ([#684](https://github.com/SocialGouv/emjpm/issues/684)) ([df8cd9d](https://github.com/SocialGouv/emjpm/commit/df8cd9d))
* **mandataires:** change message to see measure number ([#422](https://github.com/SocialGouv/emjpm/issues/422)) ([6794c4d](https://github.com/SocialGouv/emjpm/commit/6794c4d))
* **mandataires-list:** add mandataires list components ([#702](https://github.com/SocialGouv/emjpm/issues/702)) ([a7b4618](https://github.com/SocialGouv/emjpm/commit/a7b4618))
* **mesure-allocation:** add mesure alloication components ref [#545](https://github.com/SocialGouv/emjpm/issues/545) ([#642](https://github.com/SocialGouv/emjpm/issues/642)) ([a6d2aa8](https://github.com/SocialGouv/emjpm/commit/a6d2aa8))
* **mesure-evolution:** add mesure evolution components ([#643](https://github.com/SocialGouv/emjpm/issues/643)) ([dd6c924](https://github.com/SocialGouv/emjpm/commit/dd6c924))
* **mesure-stat:** implement department availability stat ([#631](https://github.com/SocialGouv/emjpm/issues/631)) ([7bf24e1](https://github.com/SocialGouv/emjpm/commit/7bf24e1))
* **mesures:** add departement_id for mesures ([#571](https://github.com/SocialGouv/emjpm/issues/571)) ([12d46a7](https://github.com/SocialGouv/emjpm/commit/12d46a7))
* **service-antenne:** introduce service antenne without changing UI ([#584](https://github.com/SocialGouv/emjpm/issues/584)) ([0f855c5](https://github.com/SocialGouv/emjpm/commit/0f855c5))
* **services:** add informations components and query ([#670](https://github.com/SocialGouv/emjpm/issues/670)) ([3f0dc3a](https://github.com/SocialGouv/emjpm/commit/3f0dc3a))
* **services-pages:** add services basic pages and layout ([#667](https://github.com/SocialGouv/emjpm/issues/667)) ([b0ff9b3](https://github.com/SocialGouv/emjpm/commit/b0ff9b3))
* **signup:** allow DRDD to sign up ([#580](https://github.com/SocialGouv/emjpm/issues/580)) ([96aab34](https://github.com/SocialGouv/emjpm/commit/96aab34))
* **tis:** remove columns from tis table ([#551](https://github.com/SocialGouv/emjpm/issues/551)) ([a5be04a](https://github.com/SocialGouv/emjpm/commit/a5be04a))
* **ts-model:** add ts model ([#563](https://github.com/SocialGouv/emjpm/issues/563)) ([e0cd5c3](https://github.com/SocialGouv/emjpm/commit/e0cd5c3))





## [23.4.5](https://github.com/SocialGouv/emjpm/compare/v23.4.4...v23.4.5) (2019-07-05)

**Note:** Version bump only for package emjpm





## [23.4.4](https://github.com/SocialGouv/emjpm/compare/v23.4.3...v23.4.4) (2019-07-05)

**Note:** Version bump only for package emjpm





## [23.4.3](https://github.com/SocialGouv/emjpm/compare/v23.4.2...v23.4.3) (2019-07-05)

**Note:** Version bump only for package emjpm





## [23.4.2](https://github.com/SocialGouv/emjpm/compare/v23.4.1...v23.4.2) (2019-07-05)

**Note:** Version bump only for package emjpm





## [23.4.1](https://github.com/SocialGouv/emjpm/compare/v23.4.0...v23.4.1) (2019-07-04)

**Note:** Version bump only for package emjpm





# [23.4.0](https://github.com/SocialGouv/emjpm/compare/v23.3.333...v23.4.0) (2019-07-04)


### Bug Fixes

* **admin:** only mandataire can be view in admin mandataire ([#270](https://github.com/SocialGouv/emjpm/issues/270)) ([b4676e1](https://github.com/SocialGouv/emjpm/commit/b4676e1))
* **app:** add missing returns ([#407](https://github.com/SocialGouv/emjpm/issues/407)) ([7d63be2](https://github.com/SocialGouv/emjpm/commit/7d63be2))
* **debs:** fix lint ([#416](https://github.com/SocialGouv/emjpm/issues/416)) ([f43827a](https://github.com/SocialGouv/emjpm/commit/f43827a))
* **e2e-test:** fix admin e2e ([#398](https://github.com/SocialGouv/emjpm/issues/398)) ([bf72391](https://github.com/SocialGouv/emjpm/commit/bf72391))
* **magistrats:** change null to quote  ([#396](https://github.com/SocialGouv/emjpm/issues/396)) ([42f4e2a](https://github.com/SocialGouv/emjpm/commit/42f4e2a))


### Features

* **debs:** Change font of file ([#405](https://github.com/SocialGouv/emjpm/issues/405)) ([21737b0](https://github.com/SocialGouv/emjpm/commit/21737b0))
* **import:** add type of mesure for importation ([#421](https://github.com/SocialGouv/emjpm/issues/421)) ([7ff0bb7](https://github.com/SocialGouv/emjpm/commit/7ff0bb7))
* **inscription:** add 1C to cabinet in inscription ([#419](https://github.com/SocialGouv/emjpm/issues/419)) ([79f0a7a](https://github.com/SocialGouv/emjpm/commit/79f0a7a))
* **magistrats:** add Femme and Homme to mandataire display on magistrat side ([#296](https://github.com/SocialGouv/emjpm/issues/296)) ([f99c920](https://github.com/SocialGouv/emjpm/commit/f99c920))
* **magistrats:** ETQ magistrat je souhaite pouvoir annuler une mesure. ([#236](https://github.com/SocialGouv/emjpm/issues/236)) ([934b498](https://github.com/SocialGouv/emjpm/commit/934b498))
* **magistrats:** remove référence de la mesure for magistrats ([#414](https://github.com/SocialGouv/emjpm/issues/414)) ([a12f82c](https://github.com/SocialGouv/emjpm/commit/a12f82c))
* **magistrats, mandataires:** add change of RG  number to mandataire and tis ([#255](https://github.com/SocialGouv/emjpm/issues/255)) ([bf6b47d](https://github.com/SocialGouv/emjpm/commit/bf6b47d))
* **mandataire:** can add more type of mesure ([#411](https://github.com/SocialGouv/emjpm/issues/411)) ([e7abd16](https://github.com/SocialGouv/emjpm/commit/e7abd16))
* **mandataires:** add name when not defined ([#420](https://github.com/SocialGouv/emjpm/issues/420)) ([36d5927](https://github.com/SocialGouv/emjpm/commit/36d5927))
* **mention:** add font and style to mention legale ([#284](https://github.com/SocialGouv/emjpm/issues/284)) ([0f6048a](https://github.com/SocialGouv/emjpm/commit/0f6048a))





## [23.3.333](https://github.com/SocialGouv/emjpm/compare/v1.2.0...v23.3.333) (2019-06-13)


### Bug Fixes

* **app:** prevent '_leaflet_pos' of undefined error ([#285](https://github.com/SocialGouv/emjpm/issues/285)) ([21fae07](https://github.com/SocialGouv/emjpm/commit/21fae07))
* **app:** revert to TableTi lint to minimum changes ([b5183fd](https://github.com/SocialGouv/emjpm/commit/b5183fd))
* **app:** wrong piwik import ([0d5caa7](https://github.com/SocialGouv/emjpm/commit/0d5caa7))
* **deps:** update dependency cypress to ^3.3.1 ([#209](https://github.com/SocialGouv/emjpm/issues/209)) ([922c9d8](https://github.com/SocialGouv/emjpm/commit/922c9d8))
* **deps:** update dependency lerna to ^3.15.0 ([#207](https://github.com/SocialGouv/emjpm/issues/207)) ([93ee291](https://github.com/SocialGouv/emjpm/commit/93ee291))
* **docker:** use a fixed container name for DB ([#256](https://github.com/SocialGouv/emjpm/issues/256)) ([6b7f735](https://github.com/SocialGouv/emjpm/commit/6b7f735))
* **knex:** remove dependence on api files ([#262](https://github.com/SocialGouv/emjpm/issues/262)) ([70fff92](https://github.com/SocialGouv/emjpm/commit/70fff92))
* **mandataires:** handle singular in nb mesures ([#268](https://github.com/SocialGouv/emjpm/issues/268)) ([b183d99](https://github.com/SocialGouv/emjpm/commit/b183d99))


### Reverts

* **gitlab:** back to 274aae7 service config ([#263](https://github.com/SocialGouv/emjpm/issues/263)) ([6b6bf6c](https://github.com/SocialGouv/emjpm/commit/6b6bf6c))





# [1.2.0](https://github.com/SocialGouv/emjpm/compare/v1.1.0...v1.2.0) (2019-06-04)


### Bug Fixes

* add a docker-compose host alias to match k8s ([#237](https://github.com/SocialGouv/emjpm/issues/237)) ([0ca4058](https://github.com/SocialGouv/emjpm/commit/0ca4058))
* **docker:** make BASE_IMAGE configurable ([#247](https://github.com/SocialGouv/emjpm/issues/247)) ([274aae7](https://github.com/SocialGouv/emjpm/commit/274aae7))
* **jest-environment-knex:** add private to package configuration ([#222](https://github.com/SocialGouv/emjpm/issues/222)) ([af6585b](https://github.com/SocialGouv/emjpm/commit/af6585b))
* **postgres:** rollback in flavor of version 10 ([#224](https://github.com/SocialGouv/emjpm/issues/224)) ([a5f44d5](https://github.com/SocialGouv/emjpm/commit/a5f44d5))


### Features

* change mandataire services naming and implementation ([c59e43b](https://github.com/SocialGouv/emjpm/commit/c59e43b))
* change mandataire services naming and implementation ([#245](https://github.com/SocialGouv/emjpm/issues/245)) ([6347d22](https://github.com/SocialGouv/emjpm/commit/6347d22))
* **magistrats:** add numero RG to reservation mesure ([#248](https://github.com/SocialGouv/emjpm/issues/248)) ([964ae0c](https://github.com/SocialGouv/emjpm/commit/964ae0c))
* **services:** add services antennes and inscription for mandataires ([#216](https://github.com/SocialGouv/emjpm/issues/216)) ([2d0157b](https://github.com/SocialGouv/emjpm/commit/2d0157b))
* **services:** Migration files for updating services ([#244](https://github.com/SocialGouv/emjpm/issues/244)) ([8c975b7](https://github.com/SocialGouv/emjpm/commit/8c975b7))





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
