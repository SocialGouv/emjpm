# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [23.4.0](https://github.com/SocialGouv/emjpm/compare/v23.3.333...v23.4.0) (2019-07-04)


### Bug Fixes

* **admin:** only mandataire can be view in admin mandataire ([#270](https://github.com/SocialGouv/emjpm/issues/270)) ([b4676e1](https://github.com/SocialGouv/emjpm/commit/b4676e1))
* **app:** add missing returns ([#407](https://github.com/SocialGouv/emjpm/issues/407)) ([7d63be2](https://github.com/SocialGouv/emjpm/commit/7d63be2))
* **debs:** fix lint ([#416](https://github.com/SocialGouv/emjpm/issues/416)) ([f43827a](https://github.com/SocialGouv/emjpm/commit/f43827a))
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
* **mandataires:** handle singular in nb mesures ([#268](https://github.com/SocialGouv/emjpm/issues/268)) ([b183d99](https://github.com/SocialGouv/emjpm/commit/b183d99))


### Reverts

* **gitlab:** back to 274aae7 service config ([#263](https://github.com/SocialGouv/emjpm/issues/263)) ([6b6bf6c](https://github.com/SocialGouv/emjpm/commit/6b6bf6c))





# [1.2.0](https://github.com/SocialGouv/emjpm/compare/v1.1.0...v1.2.0) (2019-06-04)


### Bug Fixes

* add a docker-compose host alias to match k8s ([#237](https://github.com/SocialGouv/emjpm/issues/237)) ([0ca4058](https://github.com/SocialGouv/emjpm/commit/0ca4058))
* **docker:** make BASE_IMAGE configurable ([#247](https://github.com/SocialGouv/emjpm/issues/247)) ([274aae7](https://github.com/SocialGouv/emjpm/commit/274aae7))


### Features

* change mandataire services naming and implementation ([c59e43b](https://github.com/SocialGouv/emjpm/commit/c59e43b))
* change mandataire services naming and implementation ([#245](https://github.com/SocialGouv/emjpm/issues/245)) ([6347d22](https://github.com/SocialGouv/emjpm/commit/6347d22))
* **magistrats:** add numero RG to reservation mesure ([#248](https://github.com/SocialGouv/emjpm/issues/248)) ([964ae0c](https://github.com/SocialGouv/emjpm/commit/964ae0c))
* **services:** add services antennes and inscription for mandataires ([#216](https://github.com/SocialGouv/emjpm/issues/216)) ([2d0157b](https://github.com/SocialGouv/emjpm/commit/2d0157b))





# [1.1.0](https://github.com/SocialGouv/emjpm/compare/v0.0.2...v1.1.0) (2019-05-21)


### Bug Fixes

* **app:** handle phone and postcode validation without alerts ([#52](https://github.com/SocialGouv/emjpm/issues/52)) ([93248aa](https://github.com/SocialGouv/emjpm/commit/93248aa))
* **app:** revert to innerRef on search by code postal ([#159](https://github.com/SocialGouv/emjpm/issues/159)) ([d01b816](https://github.com/SocialGouv/emjpm/commit/d01b816))
* **deps:** update dependency @wessberg/color to v1 ([#146](https://github.com/SocialGouv/emjpm/issues/146)) ([2b9c2f4](https://github.com/SocialGouv/emjpm/commit/2b9c2f4))
* **deps:** update dependency bootstrap to ^4.3.1 ([#107](https://github.com/SocialGouv/emjpm/issues/107)) ([272ca54](https://github.com/SocialGouv/emjpm/commit/272ca54))
* **deps:** update dependency cors to ^2.8.5 ([#109](https://github.com/SocialGouv/emjpm/issues/109)) ([f1175b8](https://github.com/SocialGouv/emjpm/commit/f1175b8))
* **deps:** update dependency date-fns to ^1.30.1 ([#111](https://github.com/SocialGouv/emjpm/issues/111)) ([a97153a](https://github.com/SocialGouv/emjpm/commit/a97153a))
* **deps:** update dependency detect-browser to v4 ([#148](https://github.com/SocialGouv/emjpm/issues/148)) ([1c5b15d](https://github.com/SocialGouv/emjpm/commit/1c5b15d))
* **deps:** update dependency fuse.js to ^3.4.4 ([#114](https://github.com/SocialGouv/emjpm/issues/114)) ([adc2b5a](https://github.com/SocialGouv/emjpm/commit/adc2b5a))
* **deps:** update dependency leaflet to ^1.4.0 ([#118](https://github.com/SocialGouv/emjpm/issues/118)) ([70b543d](https://github.com/SocialGouv/emjpm/commit/70b543d))
* **deps:** update dependency next-images to ^1.1.1 ([#120](https://github.com/SocialGouv/emjpm/issues/120)) ([1cbb4e3](https://github.com/SocialGouv/emjpm/commit/1cbb4e3))
* **deps:** update dependency next-plugin-transpile-modules to v2 ([#150](https://github.com/SocialGouv/emjpm/issues/150)) ([efa9848](https://github.com/SocialGouv/emjpm/commit/efa9848))
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
* **deps:** update dependency xlsx to ^0.14.2 ([#133](https://github.com/SocialGouv/emjpm/issues/133)) ([8c71ad4](https://github.com/SocialGouv/emjpm/commit/8c71ad4))
* **deps:** update dependency xlsx to ^0.14.3 ([#174](https://github.com/SocialGouv/emjpm/issues/174)) ([8416967](https://github.com/SocialGouv/emjpm/commit/8416967))
* **deps:** update react monorepo to ^16.8.6 ([#134](https://github.com/SocialGouv/emjpm/issues/134)) ([593faf8](https://github.com/SocialGouv/emjpm/commit/593faf8))
* **import:** add missing IE11 polyfill ([#80](https://github.com/SocialGouv/emjpm/issues/80)) ([ec2f131](https://github.com/SocialGouv/emjpm/commit/ec2f131))


### Features

* **api:** add GET /mandataires/postcode/:postcode route ([#47](https://github.com/SocialGouv/emjpm/issues/47)) ([ab63f66](https://github.com/SocialGouv/emjpm/commit/ab63f66))
* **app:** actually remove cypress in favour of the optional e2e pkg ([#165](https://github.com/SocialGouv/emjpm/issues/165)) ([3e83a94](https://github.com/SocialGouv/emjpm/commit/3e83a94))
* **app:** remember username on login ([#81](https://github.com/SocialGouv/emjpm/issues/81)) ([fcacb89](https://github.com/SocialGouv/emjpm/commit/fcacb89))


### BREAKING CHANGES

* **api:** remove POST /mandataires/PosteCode route
    It feel more natural to get the postcodes from a `GET` method.



## 0.1.1 (2019-04-08)


### Bug Fixes

* change email type ([0517fd2](https://github.com/SocialGouv/emjpm/commit/0517fd2))
* prevent some exceptions witj JWT decoding ([3881e41](https://github.com/SocialGouv/emjpm/commit/3881e41))
* travis TZ fix ([#21](https://github.com/SocialGouv/emjpm/issues/21)) ([b9d0255](https://github.com/SocialGouv/emjpm/commit/b9d0255))
* **import:** empty ddns ([#59](https://github.com/SocialGouv/emjpm/issues/59)) ([8b501cb](https://github.com/SocialGouv/emjpm/commit/8b501cb))
* **import:** reject when no columns ([#62](https://github.com/SocialGouv/emjpm/issues/62)) ([881e957](https://github.com/SocialGouv/emjpm/commit/881e957))


### Features

* add colors to dispo ([1208c69](https://github.com/SocialGouv/emjpm/commit/1208c69))
* add En établissement avec conservation du domicile ([d9042f7](https://github.com/SocialGouv/emjpm/commit/d9042f7))
* add professionel name to mesure reservé for TI ([d3647e3](https://github.com/SocialGouv/emjpm/commit/d3647e3))
* add services ([3d405df](https://github.com/SocialGouv/emjpm/commit/3d405df))
* change Annee for importation ([c969e82](https://github.com/SocialGouv/emjpm/commit/c969e82))
* **excel:** more importable formats ([#54](https://github.com/SocialGouv/emjpm/issues/54)) ([1dd4c56](https://github.com/SocialGouv/emjpm/commit/1dd4c56))





## [0.0.2](https://github.com/SocialGouv/emjpm/compare/v0.0.1...v0.0.2) (2019-02-15)

**Note:** Version bump only for package @emjpm/app
