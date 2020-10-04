# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [25.64.0](https://github.com/SocialGouv/emjpm/compare/v25.63.0...v25.64.0) (2020-10-04)


### Bug Fixes

* **api:** add missing ressources array ([66aadf8](https://github.com/SocialGouv/emjpm/commit/66aadf8d277e1850749b5cea773b494699beee4d))


### Features

* **export-mesure:** implement export excel ([#2235](https://github.com/SocialGouv/emjpm/issues/2235)) ([c27bc13](https://github.com/SocialGouv/emjpm/commit/c27bc1398be9449c228891ec117997647b616bec))





# [25.63.0](https://github.com/SocialGouv/emjpm/compare/v25.62.0...v25.63.0) (2020-09-29)

**Note:** Version bump only for package @emjpm/api





# [25.62.0](https://github.com/SocialGouv/emjpm/compare/v25.61.3...v25.62.0) (2020-09-27)

**Note:** Version bump only for package @emjpm/api





## [25.61.3](https://github.com/SocialGouv/emjpm/compare/v25.61.2...v25.61.3) (2020-09-23)

**Note:** Version bump only for package @emjpm/api





## [25.61.2](https://github.com/SocialGouv/emjpm/compare/v25.61.1...v25.61.2) (2020-09-23)

**Note:** Version bump only for package @emjpm/api





## [25.61.1](https://github.com/SocialGouv/emjpm/compare/v25.61.0...v25.61.1) (2020-09-23)

**Note:** Version bump only for package @emjpm/api





# [25.61.0](https://github.com/SocialGouv/emjpm/compare/v25.60.0...v25.61.0) (2020-09-23)


### Bug Fixes

* **api:** delete some properties to the created mesure ([#2133](https://github.com/SocialGouv/emjpm/issues/2133)) ([a6b1bdc](https://github.com/SocialGouv/emjpm/commit/a6b1bdc857335d49ab5d453ba2428818383976e3)), closes [#2131](https://github.com/SocialGouv/emjpm/issues/2131) [#2129](https://github.com/SocialGouv/emjpm/issues/2129)
* **api:** type_etablissement ([#2144](https://github.com/SocialGouv/emjpm/issues/2144)) ([33fb084](https://github.com/SocialGouv/emjpm/commit/33fb084ff26d7f5a75cf535e9af0793e061f6992))
* **api:** update date_nomination test ([9af9e94](https://github.com/SocialGouv/emjpm/commit/9af9e94d34bbd118e2c3ea8a5b8202a2381f57cf))
* **api-editor:** refactor create and update endpoints ([#2191](https://github.com/SocialGouv/emjpm/issues/2191)) ([879cb31](https://github.com/SocialGouv/emjpm/commit/879cb3169656b36b737a75d40f21a0639541a83b))
* **ci:** use cluster 2 ([#2178](https://github.com/SocialGouv/emjpm/issues/2178)) ([307dfc3](https://github.com/SocialGouv/emjpm/commit/307dfc3193b60acff2435bfa6937bf3164380d71))
* **direction:** enquete pagination ([#2207](https://github.com/SocialGouv/emjpm/issues/2207)) ([c977f92](https://github.com/SocialGouv/emjpm/commit/c977f925e748fce369ce8ed7f191e1c680843810))
* **liste-blanche:** preposes ([#2167](https://github.com/SocialGouv/emjpm/issues/2167)) ([9335506](https://github.com/SocialGouv/emjpm/commit/933550635f25c7c49af15fbe65004102216a93b9))
* **mesure-etat:** rename champ_protection to champ_mesure ([#2190](https://github.com/SocialGouv/emjpm/issues/2190)) ([11a8c59](https://github.com/SocialGouv/emjpm/commit/11a8c59058f9919a1274b32777c6a34070381dd3))


### Features

* **api:** add checks for mesure creation ([#2136](https://github.com/SocialGouv/emjpm/issues/2136)) ([fabc6e6](https://github.com/SocialGouv/emjpm/commit/fabc6e61634496e53ba4ad30c6f1ea739f6bc56a))
* **api:** apply type_etablissement modifications ([#2184](https://github.com/SocialGouv/emjpm/issues/2184)) ([ef1a3cf](https://github.com/SocialGouv/emjpm/commit/ef1a3cf503796a0691e2b1093cf7447b7ead2b6c))
* **api:** create editor api to get service antennes - it closes [#2123](https://github.com/SocialGouv/emjpm/issues/2123) ([#2137](https://github.com/SocialGouv/emjpm/issues/2137)) ([9b7fdae](https://github.com/SocialGouv/emjpm/commit/9b7fdaeaf687bccb1e7420d188bdb011b2679068))
* **api:** mesure dates ([#2179](https://github.com/SocialGouv/emjpm/issues/2179)) ([6d688d9](https://github.com/SocialGouv/emjpm/commit/6d688d983d2d94521460e2eec146fb8f3317d08d))
* **api:** revoke tokens & add unit tests ([#2168](https://github.com/SocialGouv/emjpm/issues/2168)) ([efcfb9b](https://github.com/SocialGouv/emjpm/commit/efcfb9be6e8dfba9a46cad9c5d9d86a115586578))
* **api:** sanitize mesure properties ([91f2bcc](https://github.com/SocialGouv/emjpm/commit/91f2bcc8851cbf511d6b8c7157060bf018b38108))
* **api:** use rate limiter for /editors ([#2169](https://github.com/SocialGouv/emjpm/issues/2169)) ([6cc9efb](https://github.com/SocialGouv/emjpm/commit/6cc9efbe8ff41a408dc142000fb9e2a98346ef37))
* **import-finess:** add finess database import ([#2189](https://github.com/SocialGouv/emjpm/issues/2189)) ([c951faa](https://github.com/SocialGouv/emjpm/commit/c951faa8e3a9661c04af43bdded6f35a7519c876))
* **liste-blanche:** gestion des établissements pour les préposés - it closes [#2126](https://github.com/SocialGouv/emjpm/issues/2126) ([#2141](https://github.com/SocialGouv/emjpm/issues/2141)) ([ca89fb0](https://github.com/SocialGouv/emjpm/commit/ca89fb0038d8a01435f01b52b1b145455c69a16e))
* **politique-confidentialite:** disable matomo tracking - it closes [#2106](https://github.com/SocialGouv/emjpm/issues/2106) ([#2143](https://github.com/SocialGouv/emjpm/issues/2143)) ([9bf5581](https://github.com/SocialGouv/emjpm/commit/9bf558138a3c28af1a6650e41ad0ecda890dcfe3))
* **service:** liste blanche for services - it closes [#2124](https://github.com/SocialGouv/emjpm/issues/2124) ([#2142](https://github.com/SocialGouv/emjpm/issues/2142)) ([3a096b5](https://github.com/SocialGouv/emjpm/commit/3a096b5163234699e6bbc9a9789cbf0b684ce5c6))





# [25.60.0](https://github.com/SocialGouv/emjpm/compare/v25.59.1...v25.60.0) (2020-08-03)


### Features

* **bdd:** delete old tables ([#2102](https://github.com/SocialGouv/emjpm/issues/2102)) ([16dc540](https://github.com/SocialGouv/emjpm/commit/16dc540a0f19c32aafd557a0364306c81a2f9b7b))





## [25.59.1](https://github.com/SocialGouv/emjpm/compare/v25.59.0...v25.59.1) (2020-07-29)


### Bug Fixes

* **mesure-api:** use date type ([22c139a](https://github.com/SocialGouv/emjpm/commit/22c139a7f827d2e4299b5b9255d764549aa665f3))
* **mesure-model:** use date type ([b3744b0](https://github.com/SocialGouv/emjpm/commit/b3744b03fcacf0a9d159758b6103f7f26764c650))





# [25.59.0](https://github.com/SocialGouv/emjpm/compare/v25.58.0...v25.59.0) (2020-07-28)


### Bug Fixes

* **api:** add departement condition ([#2098](https://github.com/SocialGouv/emjpm/issues/2098)) ([60ac51d](https://github.com/SocialGouv/emjpm/commit/60ac51d9056f736279b83fd21622014533fe8222))





# [25.58.0](https://github.com/SocialGouv/emjpm/compare/v25.57.1...v25.58.0) (2020-07-28)


### Features

* **enquete:** enhance departement management ([#2090](https://github.com/SocialGouv/emjpm/issues/2090)) ([ea99718](https://github.com/SocialGouv/emjpm/commit/ea99718e2add0d49ff66306e78939d96b68a0fbe))





## [25.57.1](https://github.com/SocialGouv/emjpm/compare/v25.57.0...v25.57.1) (2020-07-23)


### Bug Fixes

* **signup:** use correct user roles ([5774800](https://github.com/SocialGouv/emjpm/commit/57748001c4c4e5271158f5f10e3958ccfccad782))





# [25.57.0](https://github.com/SocialGouv/emjpm/compare/v25.56.0...v25.57.0) (2020-07-22)


### Features

* **api:** mesures for editors ([#2074](https://github.com/SocialGouv/emjpm/issues/2074)) ([3c27e4d](https://github.com/SocialGouv/emjpm/commit/3c27e4d42be96783927a1e73ad57517a8f2e851b))





# [25.56.0](https://github.com/SocialGouv/emjpm/compare/v25.55.0...v25.56.0) (2020-07-22)

**Note:** Version bump only for package @emjpm/api





# [25.55.0](https://github.com/SocialGouv/emjpm/compare/v25.54.0...v25.55.0) (2020-07-21)

**Note:** Version bump only for package @emjpm/api





# [25.54.0](https://github.com/SocialGouv/emjpm/compare/v25.53.0...v25.54.0) (2020-07-20)


### Features

* **schema-pjm:** rename champ_protection to champ_mesure ([#2077](https://github.com/SocialGouv/emjpm/issues/2077)) ([9af782f](https://github.com/SocialGouv/emjpm/commit/9af782f2dbeddda334a01699dcda8ad4a1c58c58))





# [25.53.0](https://github.com/SocialGouv/emjpm/compare/v25.52.1...v25.53.0) (2020-07-20)


### Bug Fixes

* **schema-pjm:** mesures.status ([#2075](https://github.com/SocialGouv/emjpm/issues/2075)) ([525ffdf](https://github.com/SocialGouv/emjpm/commit/525ffdfb35ad27f136055bf464d91bf3fa4ebf65))


### Features

* **liste-blanche:** [#2050](https://github.com/SocialGouv/emjpm/issues/2050) ([#2060](https://github.com/SocialGouv/emjpm/issues/2060)) ([a83d326](https://github.com/SocialGouv/emjpm/commit/a83d3267e5698a2f85a2bda03e9be020fc043d86))
* **schema-pjm:** mesures.civilite ([#2065](https://github.com/SocialGouv/emjpm/issues/2065)) ([c4b635e](https://github.com/SocialGouv/emjpm/commit/c4b635e487ee5d79328a4e07220c2ea8daa84529))
* **schema-pjm:** mesures.date_nomination ([#2063](https://github.com/SocialGouv/emjpm/issues/2063)) ([1e28ac7](https://github.com/SocialGouv/emjpm/commit/1e28ac7641d2c6e688549336a91eba29f9d56b93))
* **schema-pjm:** mesures.lieu_vie ([#2057](https://github.com/SocialGouv/emjpm/issues/2057)) ([2f1aab8](https://github.com/SocialGouv/emjpm/commit/2f1aab8df9694000b4a087a17470443ca2bbc0bb))
* **schema-pjm:** mesures.nature ([#2067](https://github.com/SocialGouv/emjpm/issues/2067)) ([ad444d1](https://github.com/SocialGouv/emjpm/commit/ad444d1b36aaba8e94e8ae95fa2e25bb16398a40))
* **schema-pjm:** rename annee to annee_naissance ([#2062](https://github.com/SocialGouv/emjpm/issues/2062)) ([de85701](https://github.com/SocialGouv/emjpm/commit/de85701a9401491b9c5894a7b25717e340de5b7b))





## [25.52.1](https://github.com/SocialGouv/emjpm/compare/v25.52.0...v25.52.1) (2020-07-06)

**Note:** Version bump only for package @emjpm/api





# [25.52.0](https://github.com/SocialGouv/emjpm/compare/v25.51.1...v25.52.0) (2020-07-04)


### Bug Fixes

* **enquete:** personnel formation validation ([#2049](https://github.com/SocialGouv/emjpm/issues/2049)) ([0a7ac87](https://github.com/SocialGouv/emjpm/commit/0a7ac87ea2e5add9743d7ae59c440931d5527289))





## [25.51.1](https://github.com/SocialGouv/emjpm/compare/v25.51.0...v25.51.1) (2020-07-02)


### Bug Fixes

* **enquete:** status ([#2047](https://github.com/SocialGouv/emjpm/issues/2047)) ([640daa1](https://github.com/SocialGouv/emjpm/commit/640daa1b50d185e1c883fa51d534560872977881))
* **enquete:** update excel file ([#2048](https://github.com/SocialGouv/emjpm/issues/2048)) ([f70bd29](https://github.com/SocialGouv/emjpm/commit/f70bd293d7b0d5312a4efbc4b878da2bcb3b8a6c))





# [25.51.0](https://github.com/SocialGouv/emjpm/compare/v25.50.0...v25.51.0) (2020-07-01)

**Note:** Version bump only for package @emjpm/api





# [25.50.0](https://github.com/SocialGouv/emjpm/compare/v25.49.0...v25.50.0) (2020-07-01)


### Features

* **enquete:** dashboard direction [#1998](https://github.com/SocialGouv/emjpm/issues/1998) - preview responses ([#2016](https://github.com/SocialGouv/emjpm/issues/2016)) ([c064478](https://github.com/SocialGouv/emjpm/commit/c0644787ab93e23bed627ce0d4ed9457ce6aa889))
* **enquete:** service ([#2008](https://github.com/SocialGouv/emjpm/issues/2008)) ([9075aae](https://github.com/SocialGouv/emjpm/commit/9075aae58bf43f47629dc8239f39cb99e874d445))
* **enquete:** service ([#2017](https://github.com/SocialGouv/emjpm/issues/2017)) ([75fc441](https://github.com/SocialGouv/emjpm/commit/75fc4416a375bf5975759390845cb714e02ac660))
* **enquete:** service ([#2020](https://github.com/SocialGouv/emjpm/issues/2020)) ([2e986e6](https://github.com/SocialGouv/emjpm/commit/2e986e6d0a113f90f91ad9830b7c897ddf63c1d6))
* **enquete:** service ([#2022](https://github.com/SocialGouv/emjpm/issues/2022)) ([745e3ac](https://github.com/SocialGouv/emjpm/commit/745e3aca71e8c83559880137f476ab47ee49cc66))
* **enquete:** service ([#2026](https://github.com/SocialGouv/emjpm/issues/2026)) ([6c387d6](https://github.com/SocialGouv/emjpm/commit/6c387d68cadf4292555d1a8265ba2a6b55826a37))





# [25.49.0](https://github.com/SocialGouv/emjpm/compare/v25.48.0...v25.49.0) (2020-06-25)


### Bug Fixes

* **enquete:** it fixes [#2009](https://github.com/SocialGouv/emjpm/issues/2009) ([#2012](https://github.com/SocialGouv/emjpm/issues/2012)) ([a58e289](https://github.com/SocialGouv/emjpm/commit/a58e289b7b560ed682212a5f028b6c90cbe38c73))
* **enquete:** it fixes [#2010](https://github.com/SocialGouv/emjpm/issues/2010) ([#2011](https://github.com/SocialGouv/emjpm/issues/2011)) ([a7be5e8](https://github.com/SocialGouv/emjpm/commit/a7be5e86a39c6692cb0dc73cb86d9916ceec266e))


### Features

* **enquete:** dashboard direction [#1998](https://github.com/SocialGouv/emjpm/issues/1998) - refactor enquetes forms ([#2007](https://github.com/SocialGouv/emjpm/issues/2007)) ([e1d6387](https://github.com/SocialGouv/emjpm/commit/e1d6387a503713da4eca88202e49ca3c75f96f69))





# [25.48.0](https://github.com/SocialGouv/emjpm/compare/v25.47.0...v25.48.0) (2020-06-24)


### Features

* **enquete:** service ([#2006](https://github.com/SocialGouv/emjpm/issues/2006)) ([4fc1a1b](https://github.com/SocialGouv/emjpm/commit/4fc1a1bc1fb3fba66ae901dc22fa0ee5d0c20285))





# [25.47.0](https://github.com/SocialGouv/emjpm/compare/v25.46.0...v25.47.0) (2020-06-24)


### Bug Fixes

* **enquete:** initial values for prepose - it closes [#1997](https://github.com/SocialGouv/emjpm/issues/1997) ([#2002](https://github.com/SocialGouv/emjpm/issues/2002)) ([91d6353](https://github.com/SocialGouv/emjpm/commit/91d63530c5af20f8427cd296df4452bb1539017d))
* **enquete:** it fixes [#2000](https://github.com/SocialGouv/emjpm/issues/2000) ([#2004](https://github.com/SocialGouv/emjpm/issues/2004)) ([8a3140e](https://github.com/SocialGouv/emjpm/commit/8a3140edefbd258fffd3cdef9630875b53bfdc6a))





# [25.46.0](https://github.com/SocialGouv/emjpm/compare/v25.45.0...v25.46.0) (2020-06-23)


### Bug Fixes

* **enquete:** import issues ([#1988](https://github.com/SocialGouv/emjpm/issues/1988)) ([64dae1a](https://github.com/SocialGouv/emjpm/commit/64dae1a60a8f1f7ea72fcb4bb9682e471cda3b77)), closes [#1985](https://github.com/SocialGouv/emjpm/issues/1985) [#1984](https://github.com/SocialGouv/emjpm/issues/1984) [#1986](https://github.com/SocialGouv/emjpm/issues/1986)
* **enquete:** mandataire modalites exercice [#1989](https://github.com/SocialGouv/emjpm/issues/1989) ([#1992](https://github.com/SocialGouv/emjpm/issues/1992)) ([745f0cb](https://github.com/SocialGouv/emjpm/commit/745f0cba7986cb8fbfd84c62a3a172653b54af9b))
* **enquete:** prepose [#1994](https://github.com/SocialGouv/emjpm/issues/1994) ([#1996](https://github.com/SocialGouv/emjpm/issues/1996)) ([e9068da](https://github.com/SocialGouv/emjpm/commit/e9068daaea682f45d658a7518cad0318afd98e57))
* **enquete-prepose:** rename embauches_cnc to non_formation_non_cnc ([#1993](https://github.com/SocialGouv/emjpm/issues/1993)) ([b91ddcd](https://github.com/SocialGouv/emjpm/commit/b91ddcd0c8a547f74ede7bc1b64291ceb045d2fc))
* **import:** import 0 value ([#1990](https://github.com/SocialGouv/emjpm/issues/1990)) ([1a60fae](https://github.com/SocialGouv/emjpm/commit/1a60faef0854d3bcb4531338822db96a9dd741ef))





# [25.45.0](https://github.com/SocialGouv/emjpm/compare/v25.44.0...v25.45.0) (2020-06-23)


### Bug Fixes

* **enquete:** [#1913](https://github.com/SocialGouv/emjpm/issues/1913) afficher liste des sections vides ([#1978](https://github.com/SocialGouv/emjpm/issues/1978)) ([e390ef7](https://github.com/SocialGouv/emjpm/commit/e390ef7915190d1d814ae0665b6ec2651a6ee464))
* **enquete:** activite champs facultatifs ([#1977](https://github.com/SocialGouv/emjpm/issues/1977)) ([b51e789](https://github.com/SocialGouv/emjpm/commit/b51e789047681148c6a4b6c929b8f41381c060a2))
* **enquete:** fix bug init mandataire ([#1983](https://github.com/SocialGouv/emjpm/issues/1983)) ([2b8ef76](https://github.com/SocialGouv/emjpm/commit/2b8ef76db265f78c36405f6703d3a1fc903fee57))
* **enquete:** fix form bugs ([#1981](https://github.com/SocialGouv/emjpm/issues/1981)) ([21bc793](https://github.com/SocialGouv/emjpm/commit/21bc79338b5ae056789bd9a6c203fce62c63ed9b))
* **enquete:** trim map values ([#1982](https://github.com/SocialGouv/emjpm/issues/1982)) ([37eb361](https://github.com/SocialGouv/emjpm/commit/37eb36159af1988046861ba455db3eedd590c604))





# [25.44.0](https://github.com/SocialGouv/emjpm/compare/v25.43.0...v25.44.0) (2020-06-22)


### Bug Fixes

* **enquete:** enquete for mandataires individuels - it closes [#1970](https://github.com/SocialGouv/emjpm/issues/1970) ([#1975](https://github.com/SocialGouv/emjpm/issues/1975)) ([09d7881](https://github.com/SocialGouv/emjpm/commit/09d788101510db08f1a08ad36eda4986ec7f6412))
* **enquete:** fix form validation behavior ([#1963](https://github.com/SocialGouv/emjpm/issues/1963)) ([808ae01](https://github.com/SocialGouv/emjpm/commit/808ae01ec8eaa6629293ca264ff5c07afbf808dd))
* **enquete:** formation individuel [#1969](https://github.com/SocialGouv/emjpm/issues/1969) ([#1972](https://github.com/SocialGouv/emjpm/issues/1972)) ([8544395](https://github.com/SocialGouv/emjpm/commit/8544395a54f9285cb45f059fdce0ba4640a385ac))
* **enquete:** prepose [#1973](https://github.com/SocialGouv/emjpm/issues/1973) ([#1976](https://github.com/SocialGouv/emjpm/issues/1976)) ([37a288e](https://github.com/SocialGouv/emjpm/commit/37a288e5ef7bd5eb3344ef1d0895ef67867a6d9b))
* **enquete:** show error if a tab is skipped # ([#1967](https://github.com/SocialGouv/emjpm/issues/1967)) ([8c991c5](https://github.com/SocialGouv/emjpm/commit/8c991c59db4c888a64f463e9e6b06304f5b024c9))


### Features

* **enquete:** population enquete individuel with default values" ([#1971](https://github.com/SocialGouv/emjpm/issues/1971)) ([9b8471d](https://github.com/SocialGouv/emjpm/commit/9b8471d1ce885e0a4ea0d064d1484c3ffc910749))
* **knex:** create uploaded_on column ([#1965](https://github.com/SocialGouv/emjpm/issues/1965)) ([c418164](https://github.com/SocialGouv/emjpm/commit/c41816488d5614ef58df9c71b859a89244199fc3))





# [25.43.0](https://github.com/SocialGouv/emjpm/compare/v25.42.1...v25.43.0) (2020-06-22)

**Note:** Version bump only for package @emjpm/api





## [25.42.1](https://github.com/SocialGouv/emjpm/compare/v25.42.0...v25.42.1) (2020-06-22)


### Bug Fixes

* **enquete:** render loop [#1955](https://github.com/SocialGouv/emjpm/issues/1955) ([#1957](https://github.com/SocialGouv/emjpm/issues/1957)) ([b45eac5](https://github.com/SocialGouv/emjpm/commit/b45eac5a6dfe809b2cce1f73c88ae11478da7d0f))
* **enquete-prepose:** add test to avoid undefined exception ([#1952](https://github.com/SocialGouv/emjpm/issues/1952)) ([1c2cff0](https://github.com/SocialGouv/emjpm/commit/1c2cff0ec39a5abb9dcd03f38d5a274c3e10b4b3))





# [25.42.0](https://github.com/SocialGouv/emjpm/compare/v25.41.0...v25.42.0) (2020-06-18)


### Features

* **enquete:** initialize service enquete ([#1941](https://github.com/SocialGouv/emjpm/issues/1941)) ([ac65931](https://github.com/SocialGouv/emjpm/commit/ac659310aac1ba9cef88d0074869174aee737c4e))





# [25.41.0](https://github.com/SocialGouv/emjpm/compare/v25.40.0...v25.41.0) (2020-06-17)


### Bug Fixes

* **enquete:** individuel issues ([#1924](https://github.com/SocialGouv/emjpm/issues/1924)) ([9e9a01b](https://github.com/SocialGouv/emjpm/commit/9e9a01b6cfb050ab7873b4c10fec875dc4105f6c))
* **enquete:** modalite exercice validation ([#1936](https://github.com/SocialGouv/emjpm/issues/1936)) ([9ef87c0](https://github.com/SocialGouv/emjpm/commit/9ef87c05ea24ef2e9adb3dbca79b1b68f198c86d))
* **enquete:** prepose issues ([#1929](https://github.com/SocialGouv/emjpm/issues/1929)) ([1441037](https://github.com/SocialGouv/emjpm/commit/1441037c33a5014c62a3ee4e464fa96b59f5a208))


### Features

* **enquete:** fix top level global status ([#1923](https://github.com/SocialGouv/emjpm/issues/1923)) ([86d0a54](https://github.com/SocialGouv/emjpm/commit/86d0a54a3de6a397fb6d5acdfeebb52b09ae199b))
* **enquete:** prepose personel et formation ([#1915](https://github.com/SocialGouv/emjpm/issues/1915)) ([79b92e0](https://github.com/SocialGouv/emjpm/commit/79b92e0e5f5a9574435d52083b5aebc806e2e536))
* **enquete:** prepose personel et formation autres ([#1919](https://github.com/SocialGouv/emjpm/issues/1919)) ([ace638c](https://github.com/SocialGouv/emjpm/commit/ace638c8e25d0edd1db31c415e6363a81915b610))
* **enquete:** prestations sociales for prepose ([#1922](https://github.com/SocialGouv/emjpm/issues/1922)) ([6fcf7c9](https://github.com/SocialGouv/emjpm/commit/6fcf7c9255f714b2f508385a6234e5036e14f12e))
* **enquete:** prestations sociales for prepose ([#1926](https://github.com/SocialGouv/emjpm/issues/1926)) ([56299ce](https://github.com/SocialGouv/emjpm/commit/56299ce1159812dd848624f88e95dab9959b9a6a))
* **enquete:** submit precedent [#1912](https://github.com/SocialGouv/emjpm/issues/1912) ([#1920](https://github.com/SocialGouv/emjpm/issues/1920)) ([854c61e](https://github.com/SocialGouv/emjpm/commit/854c61e734ed8c0760d97700137a8d5f9abdb515))





# [25.40.0](https://github.com/SocialGouv/emjpm/compare/v25.39.0...v25.40.0) (2020-06-09)


### Features

* **enquete:** modalite exercice for prepose ([#1892](https://github.com/SocialGouv/emjpm/issues/1892)) ([69250d7](https://github.com/SocialGouv/emjpm/commit/69250d796014e3797c87e37fe241e43dd0943f8a)), closes [#1901](https://github.com/SocialGouv/emjpm/issues/1901)
* **enquete:** modalite exercice for prepose ([#1910](https://github.com/SocialGouv/emjpm/issues/1910)) ([b20b400](https://github.com/SocialGouv/emjpm/commit/b20b400c782f79ab89fce207345f9a8478765cb3))
* **enquete:** mut. mandataire individuel prepose ([#1905](https://github.com/SocialGouv/emjpm/issues/1905)) ([b818ca8](https://github.com/SocialGouv/emjpm/commit/b818ca85179be0c4ecbdb6c15e4a5ef605c02fcd))
* **enquete:** validation fix + log validation errors on server side ([#1904](https://github.com/SocialGouv/emjpm/issues/1904)) ([8f40172](https://github.com/SocialGouv/emjpm/commit/8f40172c89e833f8ee5e115031d5702922e53403))
* **enquete:** validation mandataire populations ([#1906](https://github.com/SocialGouv/emjpm/issues/1906)) ([a103e3c](https://github.com/SocialGouv/emjpm/commit/a103e3c57e78c29d3b0abd3b75be6f611bbb894e))





# [25.39.0](https://github.com/SocialGouv/emjpm/compare/v25.38.0...v25.39.0) (2020-06-08)


### Bug Fixes

* **enquete:** import file for individuel ([#1893](https://github.com/SocialGouv/emjpm/issues/1893)) ([b2552ce](https://github.com/SocialGouv/emjpm/commit/b2552cef342e2c90093a583343cf4e8bb5dbb5cc))


### Features

* **enquete:** activite for prepose ([#1896](https://github.com/SocialGouv/emjpm/issues/1896)) ([9aa5402](https://github.com/SocialGouv/emjpm/commit/9aa540263ec8990669a6dcb1a8120bf14f95d76d))
* **enquete:** financement for prepose ([#1895](https://github.com/SocialGouv/emjpm/issues/1895)) ([1281a9d](https://github.com/SocialGouv/emjpm/commit/1281a9d79e2160721db4098d13f708b3134854bd))
* **enquete:** fix mandataire infos generales + formation ([#1901](https://github.com/SocialGouv/emjpm/issues/1901)) ([c15916f](https://github.com/SocialGouv/emjpm/commit/c15916f2cb962224e10b6b5eb653d0bfc5d0ad6c))
* **enquete:** validation fix + log validation errors on server side ([#1902](https://github.com/SocialGouv/emjpm/issues/1902)) ([60663cc](https://github.com/SocialGouv/emjpm/commit/60663ccf091ca36ade345d2322883a0eb9b2a3d7))





# [25.38.0](https://github.com/SocialGouv/emjpm/compare/v25.37.0...v25.38.0) (2020-06-04)


### Bug Fixes

* **mesures-import:** update sheet range ([#1891](https://github.com/SocialGouv/emjpm/issues/1891)) ([f5019fb](https://github.com/SocialGouv/emjpm/commit/f5019fb86909331140188bb1d1649e06cc6a2043))


### Features

* **enquete:** refactor enquete validation ([#1886](https://github.com/SocialGouv/emjpm/issues/1886)) ([2abcb9a](https://github.com/SocialGouv/emjpm/commit/2abcb9a7a85e3989a8b6112d54930034727416a6))





# [25.37.0](https://github.com/SocialGouv/emjpm/compare/v25.36.0...v25.37.0) (2020-06-03)


### Features

* **enquete:** modalite exercice form for prepose ([#1869](https://github.com/SocialGouv/emjpm/issues/1869)) ([086cbc6](https://github.com/SocialGouv/emjpm/commit/086cbc66307e878857c501e93d5dc02dfe8670da))





# [25.36.0](https://github.com/SocialGouv/emjpm/compare/v25.35.1...v25.36.0) (2020-06-02)


### Features

* **enquete:** import individuel activite [#1801](https://github.com/SocialGouv/emjpm/issues/1801) ([#1875](https://github.com/SocialGouv/emjpm/issues/1875)) ([9dc6703](https://github.com/SocialGouv/emjpm/commit/9dc67036fa8f1c9a6cefc1e842f4237c16c7356e))
* **enquete:** import individuel activite refactor nvx champs [#1801](https://github.com/SocialGouv/emjpm/issues/1801) ([#1877](https://github.com/SocialGouv/emjpm/issues/1877)) ([a1df5bc](https://github.com/SocialGouv/emjpm/commit/a1df5bcf460b33f86a4de2682a42693b4c4a7deb))
* **enquete:** import individuel formation [#1801](https://github.com/SocialGouv/emjpm/issues/1801) ([#1867](https://github.com/SocialGouv/emjpm/issues/1867)) ([442cb13](https://github.com/SocialGouv/emjpm/commit/442cb13cb0f6fccc9894644527e4350fc7e091c7))
* **enquete:** initialize prepose form ([#1880](https://github.com/SocialGouv/emjpm/issues/1880)) ([2beb779](https://github.com/SocialGouv/emjpm/commit/2beb7791c02aef59003e4b058284c29421d47c74))
* **enquete:** submit enquete form for mandataire individuel ([#1858](https://github.com/SocialGouv/emjpm/issues/1858)) ([b3f87cd](https://github.com/SocialGouv/emjpm/commit/b3f87cdcf0d96036477439abb058ad3dc06636fe))





## [25.35.1](https://github.com/SocialGouv/emjpm/compare/v25.35.0...v25.35.1) (2020-05-29)


### Bug Fixes

* **auth-hasura-webhook-strat:** look up session-variables ([#1857](https://github.com/SocialGouv/emjpm/issues/1857)) ([b054f37](https://github.com/SocialGouv/emjpm/commit/b054f37aec538ed6e66e3ddd826bbe3f688bd195))





# [25.35.0](https://github.com/SocialGouv/emjpm/compare/v25.34.0...v25.35.0) (2020-05-28)


### Features

* **enquete:** import individuel tab agrements formations [#1801](https://github.com/SocialGouv/emjpm/issues/1801) ([#1846](https://github.com/SocialGouv/emjpm/issues/1846)) ([ca4dc5e](https://github.com/SocialGouv/emjpm/commit/ca4dc5e10067e212f90d6426ed77a0536f26126c))
* **enquete:** import individuel tab infos generales [#1801](https://github.com/SocialGouv/emjpm/issues/1801) ([#1844](https://github.com/SocialGouv/emjpm/issues/1844)) ([0974c83](https://github.com/SocialGouv/emjpm/commit/0974c83f7b3b85cf2f04053b0123aca106816396))
* **enquete:** populations form ([#1842](https://github.com/SocialGouv/emjpm/issues/1842)) ([1323b38](https://github.com/SocialGouv/emjpm/commit/1323b389c26d64c8683be5d13198f2550efc55b5))
* **enquete:** prestations sociales import ([#1854](https://github.com/SocialGouv/emjpm/issues/1854)) ([a562e31](https://github.com/SocialGouv/emjpm/commit/a562e31baae1de19cd2a2c3a85542b78d84d879f))





# [25.34.0](https://github.com/SocialGouv/emjpm/compare/v25.33.0...v25.34.0) (2020-05-26)


### Bug Fixes

* **k8s:** set HASURA_WEB_HOOK_SECRET ([#1814](https://github.com/SocialGouv/emjpm/issues/1814)) ([a88bdf2](https://github.com/SocialGouv/emjpm/commit/a88bdf2525547b605bd4ca0610ac9e597403e16a))
* **k8s:** use HASURA_GRAPHQL_URI ([#1815](https://github.com/SocialGouv/emjpm/issues/1815)) ([787d5c8](https://github.com/SocialGouv/emjpm/commit/787d5c8fdc0da86af252eb07b3adaf5328a80d77))
* **upload:** replace binary upload and encoding method ([#1822](https://github.com/SocialGouv/emjpm/issues/1822)) ([7d1c389](https://github.com/SocialGouv/emjpm/commit/7d1c3895e1d3c09bbd0d699fdaaef5254ff45c7f))


### Features

* **api:** hasura trigger & actions refactoring ([#1798](https://github.com/SocialGouv/emjpm/issues/1798)) ([83dfcd9](https://github.com/SocialGouv/emjpm/commit/83dfcd9ff3b55b31ea97947b4d83fc0861886913)), closes [#1799](https://github.com/SocialGouv/emjpm/issues/1799)
* **enquete:** backend validators ([#1826](https://github.com/SocialGouv/emjpm/issues/1826)) ([abbaa13](https://github.com/SocialGouv/emjpm/commit/abbaa13b15937de1ec9b2d8357cc7c4139a009b2))
* **enquete:** import individuel excel parsing [#1801](https://github.com/SocialGouv/emjpm/issues/1801) ([#1808](https://github.com/SocialGouv/emjpm/issues/1808)) ([156a198](https://github.com/SocialGouv/emjpm/commit/156a198f2676fa22b0c82d6fcf5972649217cd64)), closes [#1811](https://github.com/SocialGouv/emjpm/issues/1811)
* **enquete:** informations generales validation ([#1830](https://github.com/SocialGouv/emjpm/issues/1830)) ([6fe6fb6](https://github.com/SocialGouv/emjpm/commit/6fe6fb6300bd2e316daebc1f54c2960a1b19a17f))
* **enquete:** link import to form page [#1801](https://github.com/SocialGouv/emjpm/issues/1801) [#1811](https://github.com/SocialGouv/emjpm/issues/1811) ([#1829](https://github.com/SocialGouv/emjpm/issues/1829)) ([92a4bb3](https://github.com/SocialGouv/emjpm/commit/92a4bb3e3c4da14c59044e997b9462246108b318))
* **enquete:** refresh validation after mutation ([#1823](https://github.com/SocialGouv/emjpm/issues/1823)) ([c1702d8](https://github.com/SocialGouv/emjpm/commit/c1702d8dc69cac949e6bcd955c40b6f1674040dd))
* **enquete:** validation indicators ([#1807](https://github.com/SocialGouv/emjpm/issues/1807)) ([fc3df5d](https://github.com/SocialGouv/emjpm/commit/fc3df5d6ba1f0d26d6dc7fbc1f745f0aeb12546c)), closes [#1799](https://github.com/SocialGouv/emjpm/issues/1799) [#1803](https://github.com/SocialGouv/emjpm/issues/1803)
* **import:** refactor excels imports ([#1831](https://github.com/SocialGouv/emjpm/issues/1831)) ([943497e](https://github.com/SocialGouv/emjpm/commit/943497e0a38272faaff8ee7394f25ccb34375752))





# [25.33.0](https://github.com/SocialGouv/emjpm/compare/v25.32.0...v25.33.0) (2020-05-18)


### Bug Fixes

* **ingress-api:** update ingress path ([#1795](https://github.com/SocialGouv/emjpm/issues/1795)) ([ac68e15](https://github.com/SocialGouv/emjpm/commit/ac68e1577cdb1ab99a1d4dfe7484cd234d6c2d4b))





# [25.32.0](https://github.com/SocialGouv/emjpm/compare/v25.31.2...v25.32.0) (2020-05-15)


### Bug Fixes

* **excel-parser:** read csv as text ([#1790](https://github.com/SocialGouv/emjpm/issues/1790)) ([d5fb313](https://github.com/SocialGouv/emjpm/commit/d5fb313432e3393d61bc04ec01bdc35d1677e0f8))


### Features

* **mesure:** use lowercase for type and residence ([#1791](https://github.com/SocialGouv/emjpm/issues/1791)) ([9105b23](https://github.com/SocialGouv/emjpm/commit/9105b234b3a5e4ac07924aef46a42589f515b477))
* **mesures:** refactoring import mesures fix [#1695](https://github.com/SocialGouv/emjpm/issues/1695) [#1664](https://github.com/SocialGouv/emjpm/issues/1664) ([#1734](https://github.com/SocialGouv/emjpm/issues/1734)) ([9c24e13](https://github.com/SocialGouv/emjpm/commit/9c24e13d3f2737ca72ee0fe3ebca4f0a63b408e0)), closes [#1748](https://github.com/SocialGouv/emjpm/issues/1748) [#1748](https://github.com/SocialGouv/emjpm/issues/1748)





## [25.31.2](https://github.com/SocialGouv/emjpm/compare/v25.31.1...v25.31.2) (2020-05-10)

**Note:** Version bump only for package @emjpm/api





## [25.31.1](https://github.com/SocialGouv/emjpm/compare/v25.31.0...v25.31.1) (2020-05-09)

**Note:** Version bump only for package @emjpm/api





# [25.31.0](https://github.com/SocialGouv/emjpm/compare/v25.30.0...v25.31.0) (2020-05-09)

**Note:** Version bump only for package @emjpm/api





# [25.30.0](https://github.com/SocialGouv/emjpm/compare/v25.29.0...v25.30.0) (2020-05-06)

**Note:** Version bump only for package @emjpm/api





# [25.29.0](https://github.com/SocialGouv/emjpm/compare/v25.28.1...v25.29.0) (2020-05-04)

**Note:** Version bump only for package @emjpm/api





## [25.28.1](https://github.com/SocialGouv/emjpm/compare/v25.28.0...v25.28.1) (2020-04-28)

**Note:** Version bump only for package @emjpm/api





# [25.28.0](https://github.com/SocialGouv/emjpm/compare/v25.27.2...v25.28.0) (2020-04-24)

**Note:** Version bump only for package @emjpm/api





## [25.27.2](https://github.com/SocialGouv/emjpm/compare/v25.27.1...v25.27.2) (2020-04-21)

**Note:** Version bump only for package @emjpm/api





## [25.27.1](https://github.com/SocialGouv/emjpm/compare/v25.27.0...v25.27.1) (2020-04-20)

**Note:** Version bump only for package @emjpm/api





# [25.27.0](https://github.com/SocialGouv/emjpm/compare/v25.26.0...v25.27.0) (2020-04-20)

**Note:** Version bump only for package @emjpm/api





# [25.26.0](https://github.com/SocialGouv/emjpm/compare/v25.25.0...v25.26.0) (2020-04-09)


### Bug Fixes

* **test:** move express server in its own file ([#1633](https://github.com/SocialGouv/emjpm/issues/1633)) ([fc0f9d0](https://github.com/SocialGouv/emjpm/commit/fc0f9d039a4550491c9658d92dd8cf822bf3bf3d))


### Features

* **enquete:** add individual information forms ([#1622](https://github.com/SocialGouv/emjpm/issues/1622)) ([fa8cd07](https://github.com/SocialGouv/emjpm/commit/fa8cd07a595ff363053bd78144390f76b8eb217b))





# [25.25.0](https://github.com/SocialGouv/emjpm/compare/v25.24.3...v25.25.0) (2020-03-22)


### Bug Fixes

* **import:** try finding mesure with mandataire or service id ([#1615](https://github.com/SocialGouv/emjpm/issues/1615)) ([2c578fd](https://github.com/SocialGouv/emjpm/commit/2c578fd113f3b2148547c513cf79f0659b2cb844))
* **mesure import:** get ti etablissement and geocode ([#1616](https://github.com/SocialGouv/emjpm/issues/1616)) ([1eaff6d](https://github.com/SocialGouv/emjpm/commit/1eaff6dc1c35b144fff8fa5605c3b30d39105bd1))


### Features

* **import:** handle INSEE_API_TRIBUNAL ([#1625](https://github.com/SocialGouv/emjpm/issues/1625)) ([0ab2520](https://github.com/SocialGouv/emjpm/commit/0ab252071ea5d6ad82d4ee7b826e723ca0edd0cc))
* **siret-api:** use insee siret api ([#1606](https://github.com/SocialGouv/emjpm/issues/1606)) ([73fc317](https://github.com/SocialGouv/emjpm/commit/73fc317c49b14cfce8a322242b91c6b164e06a6c))





## [25.24.3](https://github.com/SocialGouv/emjpm/compare/v25.24.2...v25.24.3) (2020-03-19)


### Bug Fixes

* **import:** handle pays ([851feb1](https://github.com/SocialGouv/emjpm/commit/851feb19e8f90f9bcf630f4bbec0ff1352cfee69))





## [25.24.2](https://github.com/SocialGouv/emjpm/compare/v25.24.1...v25.24.2) (2020-03-18)


### Bug Fixes

* **import:** update headers and import async ([#1603](https://github.com/SocialGouv/emjpm/issues/1603)) ([101b44d](https://github.com/SocialGouv/emjpm/commit/101b44ddc8f3d27bb0662b1a23c3d733725c47b4))





## [25.24.1](https://github.com/SocialGouv/emjpm/compare/v25.24.0...v25.24.1) (2020-03-17)

**Note:** Version bump only for package @emjpm/api





# [25.24.0](https://github.com/SocialGouv/emjpm/compare/v25.23.0...v25.24.0) (2020-03-17)


### Bug Fixes

* **forgot-password:** handle forgot password user notfound and add tests ([#1528](https://github.com/SocialGouv/emjpm/issues/1528)) ([1097e48](https://github.com/SocialGouv/emjpm/commit/1097e48a6f5f9201adfa8caeb949b5cb25046d83))
* **import:** test if ville is defined ([#1539](https://github.com/SocialGouv/emjpm/issues/1539)) ([9a93f38](https://github.com/SocialGouv/emjpm/commit/9a93f388c737d2f5318813e617ef0d3cec35984c))


### Features

* **mesure-import-antenne:** add service mesure import antenne ([#1591](https://github.com/SocialGouv/emjpm/issues/1591)) ([515ffaf](https://github.com/SocialGouv/emjpm/commit/515ffaff59daae42f28988dda0fcb700bde90e14))
* **token-request-mail:** add editor and admin email send ([#1542](https://github.com/SocialGouv/emjpm/issues/1542)) ([1bd7ebb](https://github.com/SocialGouv/emjpm/commit/1bd7ebb7262e72a4b27f98cf067235b046d6722d))
* **tribunal:** create relation between "tribunal" and "departement" ([#1557](https://github.com/SocialGouv/emjpm/issues/1557)) ([82db06e](https://github.com/SocialGouv/emjpm/commit/82db06ebc9d02f50edcfd38afab04b806aec2421))





# [25.23.0](https://github.com/SocialGouv/emjpm/compare/v25.22.3...v25.23.0) (2020-02-28)

**Note:** Version bump only for package @emjpm/api





## [25.22.3](https://github.com/SocialGouv/emjpm/compare/v25.22.2...v25.22.3) (2020-02-28)


### Bug Fixes

* **webhook:** set mesure reservation email default ti value ([#1520](https://github.com/SocialGouv/emjpm/issues/1520)) ([ec05723](https://github.com/SocialGouv/emjpm/commit/ec0572333030e9fc7cd162b3a10395c1e55ff28c))





## [25.22.2](https://github.com/SocialGouv/emjpm/compare/v25.22.1...v25.22.2) (2020-02-27)

**Note:** Version bump only for package @emjpm/api





## [25.22.1](https://github.com/SocialGouv/emjpm/compare/v25.22.0...v25.22.1) (2020-02-27)

**Note:** Version bump only for package @emjpm/api





# [25.22.0](https://github.com/SocialGouv/emjpm/compare/v25.21.0...v25.22.0) (2020-02-27)


### Bug Fixes

* **service-members:** fix service members ([#1486](https://github.com/SocialGouv/emjpm/issues/1486)) ([af55855](https://github.com/SocialGouv/emjpm/commit/af5585573c30c228d91e9576be3b7c039f6c1b32))


### Features

* **api:** add api logs ([#1450](https://github.com/SocialGouv/emjpm/issues/1450)) ([86a5da1](https://github.com/SocialGouv/emjpm/commit/86a5da10c5eb281cb7a8344277020b917fdf5e72))
* **indicators:** add indicators migration and component ([#1506](https://github.com/SocialGouv/emjpm/issues/1506)) ([6692625](https://github.com/SocialGouv/emjpm/commit/66926251cf237d1ef4272c602424392a039d7f51))
* **managed-db:** use managed database ([#1460](https://github.com/SocialGouv/emjpm/issues/1460)) ([aa46f48](https://github.com/SocialGouv/emjpm/commit/aa46f48c2d59c90a0f84d617834347979a23b9eb))
* **service-members:** add service member invitation and admin permissions ([#1471](https://github.com/SocialGouv/emjpm/issues/1471)) ([6bb6990](https://github.com/SocialGouv/emjpm/commit/6bb69901fdc6a444bd8e55c90eb5c93db3741585))





# [25.21.0](https://github.com/SocialGouv/emjpm/compare/v25.20.0...v25.21.0) (2020-02-12)


### Features

* **admin-token:** handle user token in admin ([#1473](https://github.com/SocialGouv/emjpm/issues/1473)) ([e18537b](https://github.com/SocialGouv/emjpm/commit/e18537b27de49413e4b9ce1a5c26b66511803ccc))
* **api-editor-route:** add route and protection with jwt ([#1466](https://github.com/SocialGouv/emjpm/issues/1466)) ([71c321d](https://github.com/SocialGouv/emjpm/commit/71c321d872563830b652d617e5ae900c6a3fac0e))
* **editor-mesures-api:** add filterable api for mesures ([#1474](https://github.com/SocialGouv/emjpm/issues/1474)) ([d97e881](https://github.com/SocialGouv/emjpm/commit/d97e881b5f8ab3dd418fd267966403cde29baefb))
* **oauth2:** add working authorization page and api ([#1463](https://github.com/SocialGouv/emjpm/issues/1463)) ([661d84f](https://github.com/SocialGouv/emjpm/commit/661d84fb24ac746738a387388284ee8897aaa523))
* **token-authorization:** add base query ([#1470](https://github.com/SocialGouv/emjpm/issues/1470)) ([0ced02c](https://github.com/SocialGouv/emjpm/commit/0ced02c786984ad59c36d46344e461dcd55bd6de))





# [25.20.0](https://github.com/SocialGouv/emjpm/compare/v25.19.2...v25.20.0) (2020-01-30)


### Bug Fixes

* **sentry-ff:** fix magistrat issues in ff36/38 ([#1456](https://github.com/SocialGouv/emjpm/issues/1456)) ([cb02401](https://github.com/SocialGouv/emjpm/commit/cb024019132362b9bb95bc23c1afc0b67103b662))





## [25.19.2](https://github.com/SocialGouv/emjpm/compare/v25.19.1...v25.19.2) (2020-01-28)

**Note:** Version bump only for package @emjpm/api





## [25.19.1](https://github.com/SocialGouv/emjpm/compare/v25.19.0...v25.19.1) (2020-01-28)

**Note:** Version bump only for package @emjpm/api





# [25.19.0](https://github.com/SocialGouv/emjpm/compare/v25.18.0...v25.19.0) (2020-01-28)

**Note:** Version bump only for package @emjpm/api





# [25.18.0](https://github.com/SocialGouv/emjpm/compare/v25.17.10...v25.18.0) (2020-01-26)

**Note:** Version bump only for package @emjpm/api





## [25.17.10](https://github.com/SocialGouv/emjpm/compare/v25.17.9...v25.17.10) (2020-01-22)

**Note:** Version bump only for package @emjpm/api





## [25.17.9](https://github.com/SocialGouv/emjpm/compare/v25.17.8...v25.17.9) (2020-01-21)

**Note:** Version bump only for package @emjpm/api





## [25.17.8](https://github.com/SocialGouv/emjpm/compare/v25.17.4...v25.17.8) (2020-01-21)


### Bug Fixes

* **mesure-cancel:** fix cancel reservation email date format ([#1431](https://github.com/SocialGouv/emjpm/issues/1431)) ([b91a042](https://github.com/SocialGouv/emjpm/commit/b91a0424b0113ca3553665b73e81c6edf9782d28))





## [25.17.7](https://github.com/SocialGouv/emjpm/compare/v25.17.6...v25.17.7) (2020-01-16)

**Note:** Version bump only for package @emjpm/api





## [25.17.6](https://github.com/SocialGouv/emjpm/compare/v25.17.5...v25.17.6) (2020-01-16)

**Note:** Version bump only for package @emjpm/api





## [25.17.5](https://github.com/SocialGouv/emjpm/compare/v25.17.3...v25.17.5) (2020-01-16)

**Note:** Version bump only for package @emjpm/api





## [25.17.4](https://github.com/SocialGouv/emjpm/compare/v25.17.3...v25.17.4) (2020-01-16)

**Note:** Version bump only for package @emjpm/api





## [25.17.3](https://github.com/SocialGouv/emjpm/compare/v25.17.2...v25.17.3) (2020-01-15)

**Note:** Version bump only for package @emjpm/api





## [25.17.2](https://github.com/SocialGouv/emjpm/compare/v25.17.1...v25.17.2) (2020-01-14)

**Note:** Version bump only for package @emjpm/api





## [25.17.1](https://github.com/SocialGouv/emjpm/compare/v25.17.0...v25.17.1) (2020-01-13)

**Note:** Version bump only for package @emjpm/api





# [25.17.0](https://github.com/SocialGouv/emjpm/compare/v25.16.2...v25.17.0) (2020-01-13)


### Features

* **magistrat:** add information form and in profile page ([#1379](https://github.com/SocialGouv/emjpm/issues/1379)) ([c4c9de8](https://github.com/SocialGouv/emjpm/commit/c4c9de86592bcdfa7add065d53c2e3a01910588b))





## [25.16.2](https://github.com/SocialGouv/emjpm/compare/v25.16.1...v25.16.2) (2020-01-08)

**Note:** Version bump only for package @emjpm/api





## [25.16.1](https://github.com/SocialGouv/emjpm/compare/v25.16.0...v25.16.1) (2020-01-07)

**Note:** Version bump only for package @emjpm/api





# [25.16.0](https://github.com/SocialGouv/emjpm/compare/v25.15.0...v25.16.0) (2020-01-06)

**Note:** Version bump only for package @emjpm/api





# [25.15.0](https://github.com/SocialGouv/emjpm/compare/v25.14.0...v25.15.0) (2020-01-06)

**Note:** Version bump only for package @emjpm/api





# [25.14.0](https://github.com/SocialGouv/emjpm/compare/v25.13.0...v25.14.0) (2019-12-27)

**Note:** Version bump only for package @emjpm/api





# [25.13.0](https://github.com/SocialGouv/emjpm/compare/v25.12.1...v25.13.0) (2019-12-19)


### Bug Fixes

* **deps:** update dependency objection-db-errors to ^1.1.2 ([#1231](https://github.com/SocialGouv/emjpm/issues/1231)) ([d556eb3](https://github.com/SocialGouv/emjpm/commit/d556eb3f14b474d6a8da2aa686a69974b61caff1))
* **deps:** update dependency passport to ^0.4.1 ([#1232](https://github.com/SocialGouv/emjpm/issues/1232)) ([6cfef32](https://github.com/SocialGouv/emjpm/commit/6cfef32367caa4a8eb93ef3f22d2417f8ac7b16e))





## [25.12.1](https://github.com/SocialGouv/emjpm/compare/v25.12.0...v25.12.1) (2019-12-19)

**Note:** Version bump only for package @emjpm/api





# [25.12.0](https://github.com/SocialGouv/emjpm/compare/v25.11.5...v25.12.0) (2019-12-19)


### Bug Fixes

* **admin-import:** handle import for service ([#1119](https://github.com/SocialGouv/emjpm/issues/1119)) ([524bbc2](https://github.com/SocialGouv/emjpm/commit/524bbc21395174351f16e91025bac6b20baf5f35))
* **api:** add date-fns dependency ([#1092](https://github.com/SocialGouv/emjpm/issues/1092)) ([3a6c3a4](https://github.com/SocialGouv/emjpm/commit/3a6c3a45b38d61912b3044261b776c7c479c995e))
* **cancel-resevation:** test if sesssion vars is definedd ([#1114](https://github.com/SocialGouv/emjpm/issues/1114)) ([808dc91](https://github.com/SocialGouv/emjpm/commit/808dc91139a93d41f872933481b1bc6540f7cb8e))
* **deps:** update dependency @sentry/node to v5.10.2 ([#1210](https://github.com/SocialGouv/emjpm/issues/1210)) ([397291a](https://github.com/SocialGouv/emjpm/commit/397291affd4699a0fe697954a1b56478898946f2))
* **deps:** update dependency dotenv to ^8.2.0 ([#1216](https://github.com/SocialGouv/emjpm/issues/1216)) ([eefa21b](https://github.com/SocialGouv/emjpm/commit/eefa21b568c5297e58ec2c59cf48cd02ecd922da))
* **deps:** update dependency express-validator to ^6.3.0 ([#1217](https://github.com/SocialGouv/emjpm/issues/1217)) ([fcf3525](https://github.com/SocialGouv/emjpm/commit/fcf3525a4033a592831ed3e91a8214b7d3384b27))
* **deps:** update dependency knex to ^0.20.4 ([#1103](https://github.com/SocialGouv/emjpm/issues/1103)) ([267a0f9](https://github.com/SocialGouv/emjpm/commit/267a0f91c88d995867c7da08fa9e6069aba2ab0f))
* **lint:** fix lint erros ([#1100](https://github.com/SocialGouv/emjpm/issues/1100)) ([a1ff20f](https://github.com/SocialGouv/emjpm/commit/a1ff20f7e07c0543e756bf919883b4db297637d8))


### Features

* **geocode-mandataire:** handle geocode for mandataire signup ([#1160](https://github.com/SocialGouv/emjpm/issues/1160)) ([b1ae80e](https://github.com/SocialGouv/emjpm/commit/b1ae80ee85346502d2073555735d7d866e81ca35))
* **map:** add maps ([#894](https://github.com/SocialGouv/emjpm/issues/894)) ([cb142e0](https://github.com/SocialGouv/emjpm/commit/cb142e0db1756be7e611be359e68b53f4ba53d76)), closes [#1110](https://github.com/SocialGouv/emjpm/issues/1110) [#1109](https://github.com/SocialGouv/emjpm/issues/1109)
* **mesure-import:** handle longitude/latitude ([#1120](https://github.com/SocialGouv/emjpm/issues/1120)) ([097645f](https://github.com/SocialGouv/emjpm/commit/097645f4d8830ce584dff9ff5aba0e584b3a461d))





## [25.11.5](https://github.com/SocialGouv/emjpm/compare/v25.11.4...v25.11.5) (2019-12-09)

**Note:** Version bump only for package @emjpm/api





## [25.11.4](https://github.com/SocialGouv/emjpm/compare/v25.11.3...v25.11.4) (2019-12-09)

**Note:** Version bump only for package @emjpm/api





## [25.11.3](https://github.com/SocialGouv/emjpm/compare/v25.11.2...v25.11.3) (2019-12-08)

**Note:** Version bump only for package @emjpm/api





## [25.11.2](https://github.com/SocialGouv/emjpm/compare/v25.11.1...v25.11.2) (2019-12-08)

**Note:** Version bump only for package @emjpm/api





## [25.11.1](https://github.com/SocialGouv/emjpm/compare/v25.11.0...v25.11.1) (2019-12-07)

**Note:** Version bump only for package @emjpm/api





# [25.11.0](https://github.com/SocialGouv/emjpm/compare/v25.10.1...v25.11.0) (2019-12-06)


### Bug Fixes

* **auth:** fix auth disconnect and direction base url ([#1071](https://github.com/SocialGouv/emjpm/issues/1071)) ([fc2de32](https://github.com/SocialGouv/emjpm/commit/fc2de32))





## [25.10.1](https://github.com/SocialGouv/emjpm/compare/v25.10.0...v25.10.1) (2019-12-04)

**Note:** Version bump only for package @emjpm/api





# [25.10.0](https://github.com/SocialGouv/emjpm/compare/v25.9.2...v25.10.0) (2019-12-04)

**Note:** Version bump only for package @emjpm/api





## [25.9.2](https://github.com/SocialGouv/emjpm/compare/v25.9.1...v25.9.2) (2019-12-04)

**Note:** Version bump only for package @emjpm/api





## [25.9.1](https://github.com/SocialGouv/emjpm/compare/v25.9.0...v25.9.1) (2019-12-04)

**Note:** Version bump only for package @emjpm/api





# [25.9.0](https://github.com/SocialGouv/emjpm/compare/v25.8.1...v25.9.0) (2019-12-03)


### Bug Fixes

* **login-api:** remove length verification ([#1031](https://github.com/SocialGouv/emjpm/issues/1031)) ([22b1c9d](https://github.com/SocialGouv/emjpm/commit/22b1c9d))
* **reset-password-email:** add email when reset password in account ([#1029](https://github.com/SocialGouv/emjpm/issues/1029)) ([874f402](https://github.com/SocialGouv/emjpm/commit/874f402))


### Features

* **change-password:** deep refactoring of change password ([#1014](https://github.com/SocialGouv/emjpm/issues/1014)) ([621d87d](https://github.com/SocialGouv/emjpm/commit/621d87d))
* **forgot-password:** add forgot password and new login components and api ([#1019](https://github.com/SocialGouv/emjpm/issues/1019)) ([9b9fb7d](https://github.com/SocialGouv/emjpm/commit/9b9fb7d))
* **import:** handle excel ([#1020](https://github.com/SocialGouv/emjpm/issues/1020)) ([d01691c](https://github.com/SocialGouv/emjpm/commit/d01691c))
* **mandataire-import:** handle code postal if undefined ([#1013](https://github.com/SocialGouv/emjpm/issues/1013)) ([156231d](https://github.com/SocialGouv/emjpm/commit/156231d))





## [25.8.1](https://github.com/SocialGouv/emjpm/compare/v25.8.0...v25.8.1) (2019-11-26)

**Note:** Version bump only for package @emjpm/api





# [25.8.0](https://github.com/SocialGouv/emjpm/compare/v25.7.2...v25.8.0) (2019-11-26)


### Bug Fixes

* **test:** update snapshot / fix rollback script ([31322b7](https://github.com/SocialGouv/emjpm/commit/31322b7))


### Features

* **cancel-reservation-email:** send canel reservation email ([#1002](https://github.com/SocialGouv/emjpm/issues/1002)) ([d3e674c](https://github.com/SocialGouv/emjpm/commit/d3e674c))
* **mesure-service:** handle service_id in mesures ([#999](https://github.com/SocialGouv/emjpm/issues/999)) ([b7651a6](https://github.com/SocialGouv/emjpm/commit/b7651a6)), closes [#1000](https://github.com/SocialGouv/emjpm/issues/1000)
* **reservation-magistrat:** add magistrat new input for urgent ([#1007](https://github.com/SocialGouv/emjpm/issues/1007)) ([c4764a2](https://github.com/SocialGouv/emjpm/commit/c4764a2))





## [25.7.2](https://github.com/SocialGouv/emjpm/compare/v25.7.1...v25.7.2) (2019-11-20)

**Note:** Version bump only for package @emjpm/api





## [25.7.1](https://github.com/SocialGouv/emjpm/compare/v25.7.0...v25.7.1) (2019-11-20)

**Note:** Version bump only for package @emjpm/api





# [25.7.0](https://github.com/SocialGouv/emjpm/compare/v25.6.0...v25.7.0) (2019-11-19)


### Bug Fixes

* **login:** fix redirections ([#984](https://github.com/SocialGouv/emjpm/issues/984)) ([4caa3a4](https://github.com/SocialGouv/emjpm/commit/4caa3a4))


### Features

* **auth-redirect:** redirect when on login signup with token ([#969](https://github.com/SocialGouv/emjpm/issues/969)) ([b174de4](https://github.com/SocialGouv/emjpm/commit/b174de4))
* **impersonate:** allow starting impersonate ([#926](https://github.com/SocialGouv/emjpm/issues/926)) ([2855ffa](https://github.com/SocialGouv/emjpm/commit/2855ffa))
* **mesures-import:** use numero rg + ti_id as key ([#982](https://github.com/SocialGouv/emjpm/issues/982)) ([c73149a](https://github.com/SocialGouv/emjpm/commit/c73149a))





# [25.6.0](https://github.com/SocialGouv/emjpm/compare/v25.5.2...v25.6.0) (2019-11-12)


### Bug Fixes

* **reservation-email:** use cabinet from mesures ([#945](https://github.com/SocialGouv/emjpm/issues/945)) ([18fe904](https://github.com/SocialGouv/emjpm/commit/18fe904))





## [25.5.2](https://github.com/SocialGouv/emjpm/compare/v25.5.1...v25.5.2) (2019-11-07)

**Note:** Version bump only for package @emjpm/api





## [25.5.1](https://github.com/SocialGouv/emjpm/compare/v25.5.0...v25.5.1) (2019-11-06)


### Bug Fixes

* **prepose:** use slug in api path ([#928](https://github.com/SocialGouv/emjpm/issues/928)) ([9494dec](https://github.com/SocialGouv/emjpm/commit/9494dec))





# [25.5.0](https://github.com/SocialGouv/emjpm/compare/v25.4.3...v25.5.0) (2019-11-04)


### Bug Fixes

* **validation-email:** use WH to send acccount validation email ([#924](https://github.com/SocialGouv/emjpm/issues/924)) ([57fa2a6](https://github.com/SocialGouv/emjpm/commit/57fa2a6))


### Features

* **mandataire-siret:** add siret in mandataire signup ([#922](https://github.com/SocialGouv/emjpm/issues/922)) ([dd18948](https://github.com/SocialGouv/emjpm/commit/dd18948))





## [25.4.3](https://github.com/SocialGouv/emjpm/compare/v25.4.2...v25.4.3) (2019-10-30)


### Bug Fixes

* **import:** update mesure states of the right mandataire ([#919](https://github.com/SocialGouv/emjpm/issues/919)) ([240317b](https://github.com/SocialGouv/emjpm/commit/240317b))





## [25.4.2](https://github.com/SocialGouv/emjpm/compare/v25.4.1...v25.4.2) (2019-10-29)


### Bug Fixes

* **choose-mandataire:** decremeent mesure states ([#917](https://github.com/SocialGouv/emjpm/issues/917)) ([c44b8c4](https://github.com/SocialGouv/emjpm/commit/c44b8c4))
* **email-reservation:** send email to all user belonging to antenne ([#918](https://github.com/SocialGouv/emjpm/issues/918)) ([1f16354](https://github.com/SocialGouv/emjpm/commit/1f16354))





## [25.4.1](https://github.com/SocialGouv/emjpm/compare/v25.4.0...v25.4.1) (2019-10-29)

**Note:** Version bump only for package @emjpm/api





# [25.4.0](https://github.com/SocialGouv/emjpm/compare/v25.3.3...v25.4.0) (2019-10-29)


### Bug Fixes

* **webhook:** fix wrong variable order ([#902](https://github.com/SocialGouv/emjpm/issues/902)) ([1f9840d](https://github.com/SocialGouv/emjpm/commit/1f9840d))


### Features

* **import:** add possibility to import mesures as mandataire ([#911](https://github.com/SocialGouv/emjpm/issues/911)) ([7878fc9](https://github.com/SocialGouv/emjpm/commit/7878fc9)), closes [#760](https://github.com/SocialGouv/emjpm/issues/760)
* **import:** handle ti in mesures import ([#916](https://github.com/SocialGouv/emjpm/issues/916)) ([b8397b0](https://github.com/SocialGouv/emjpm/commit/b8397b0))
* **signup:** refactor signup and allow service selection ([#893](https://github.com/SocialGouv/emjpm/issues/893)) ([88f640b](https://github.com/SocialGouv/emjpm/commit/88f640b))





## [25.3.3](https://github.com/SocialGouv/emjpm/compare/v25.3.2...v25.3.3) (2019-10-21)

**Note:** Version bump only for package @emjpm/api





## [25.3.2](https://github.com/SocialGouv/emjpm/compare/v25.3.1...v25.3.2) (2019-10-14)


### Bug Fixes

* **email:** fix email missing addresses ([#892](https://github.com/SocialGouv/emjpm/issues/892)) ([076c843](https://github.com/SocialGouv/emjpm/commit/076c843))





## [25.3.1](https://github.com/SocialGouv/emjpm/compare/v25.3.0...v25.3.1) (2019-10-10)


### Bug Fixes

* **email-send:** fix when no ti don't send email ([#890](https://github.com/SocialGouv/emjpm/issues/890)) ([d055025](https://github.com/SocialGouv/emjpm/commit/d055025))





# [25.3.0](https://github.com/SocialGouv/emjpm/compare/v25.2.2...v25.3.0) (2019-10-09)


### Bug Fixes

* **signup:** use correct user type in switch case ([#889](https://github.com/SocialGouv/emjpm/issues/889)) ([73f8e2a](https://github.com/SocialGouv/emjpm/commit/73f8e2a))


### Features

* **login:** trim and use lower case ([#888](https://github.com/SocialGouv/emjpm/issues/888)) ([8ddaf76](https://github.com/SocialGouv/emjpm/commit/8ddaf76))
* **send-email:** add send email event webhook ([#886](https://github.com/SocialGouv/emjpm/issues/886)) ([6abc0dd](https://github.com/SocialGouv/emjpm/commit/6abc0dd))





## [25.2.2](https://github.com/SocialGouv/emjpm/compare/v25.2.1...v25.2.2) (2019-10-09)

**Note:** Version bump only for package @emjpm/api





## [25.2.1](https://github.com/SocialGouv/emjpm/compare/v25.2.0...v25.2.1) (2019-10-08)

**Note:** Version bump only for package @emjpm/api





# [25.2.0](https://github.com/SocialGouv/emjpm/compare/v25.1.6...v25.2.0) (2019-10-08)


### Features

* **service:** mesure creation ([#866](https://github.com/SocialGouv/emjpm/issues/866)) ([3a2881e](https://github.com/SocialGouv/emjpm/commit/3a2881e))





## [25.1.6](https://github.com/SocialGouv/emjpm/compare/v25.1.5...v25.1.6) (2019-09-27)

**Note:** Version bump only for package @emjpm/api





## [25.1.5](https://github.com/SocialGouv/emjpm/compare/v25.1.4...v25.1.5) (2019-09-27)

**Note:** Version bump only for package @emjpm/api





## [25.1.4](https://github.com/SocialGouv/emjpm/compare/v25.1.3...v25.1.4) (2019-09-27)

**Note:** Version bump only for package @emjpm/api





## [25.1.3](https://github.com/SocialGouv/emjpm/compare/v25.1.2...v25.1.3) (2019-09-27)


### Bug Fixes

* **email:** use support.emjpm@fabrique.social.gouv.fr ([#862](https://github.com/SocialGouv/emjpm/issues/862)) ([d9284d1](https://github.com/SocialGouv/emjpm/commit/d9284d1))





## [25.1.2](https://github.com/SocialGouv/emjpm/compare/v25.1.1...v25.1.2) (2019-09-27)


### Bug Fixes

* **deps:** use same dotenv dep ([#861](https://github.com/SocialGouv/emjpm/issues/861)) ([23af4ba](https://github.com/SocialGouv/emjpm/commit/23af4ba))





## [25.1.1](https://github.com/SocialGouv/emjpm/compare/v25.1.0...v25.1.1) (2019-09-26)

**Note:** Version bump only for package @emjpm/api





# [25.1.0](https://github.com/SocialGouv/emjpm/compare/v25.0.1...v25.1.0) (2019-09-26)


### Features

* **api:** introduce env configuration ([#854](https://github.com/SocialGouv/emjpm/issues/854)) ([1fba29c](https://github.com/SocialGouv/emjpm/commit/1fba29c))





## [25.0.1](https://github.com/SocialGouv/emjpm/compare/v25.0.0...v25.0.1) (2019-09-26)


### Bug Fixes

* **reset-password:** fix pasword reset and add non blocking mail ([#853](https://github.com/SocialGouv/emjpm/issues/853)) ([9118a64](https://github.com/SocialGouv/emjpm/commit/9118a64))





# [25.0.0](https://github.com/SocialGouv/emjpm/compare/v24.5.0...v25.0.0) (2019-09-25)


### Code Refactoring

* **app:** use next server instead of export ([#839](https://github.com/SocialGouv/emjpm/issues/839)) ([3439ec7](https://github.com/SocialGouv/emjpm/commit/3439ec7))


### BREAKING CHANGES

* **app:** refactor(app): use next server instead of export 
  - The frontend is now served by a node.js/next server instead of nginx





# [24.5.0](https://github.com/SocialGouv/emjpm/compare/v24.4.3...v24.5.0) (2019-09-24)


### Bug Fixes

* **passwor-verification:** update authorized special char ([#827](https://github.com/SocialGouv/emjpm/issues/827)) ([235c7cf](https://github.com/SocialGouv/emjpm/commit/235c7cf))
* **service:** create correct graph objects in signup ([#825](https://github.com/SocialGouv/emjpm/issues/825)) ([22d9363](https://github.com/SocialGouv/emjpm/commit/22d9363))
* **signup-mail:** remove useless await ([#826](https://github.com/SocialGouv/emjpm/issues/826)) ([f3aeba3](https://github.com/SocialGouv/emjpm/commit/f3aeba3))





## [24.4.3](https://github.com/SocialGouv/emjpm/compare/v24.4.2...v24.4.3) (2019-09-23)

**Note:** Version bump only for package @emjpm/api





## [24.4.2](https://github.com/SocialGouv/emjpm/compare/v24.4.1...v24.4.2) (2019-09-23)

**Note:** Version bump only for package @emjpm/api





## [24.4.1](https://github.com/SocialGouv/emjpm/compare/v24.4.0...v24.4.1) (2019-09-23)

**Note:** Version bump only for package @emjpm/api





# [24.4.0](https://github.com/SocialGouv/emjpm/compare/v24.3.4...v24.4.0) (2019-09-23)

**Note:** Version bump only for package @emjpm/api





## [24.3.4](https://github.com/SocialGouv/emjpm/compare/v24.3.3...v24.3.4) (2019-09-22)

**Note:** Version bump only for package @emjpm/api





## [24.3.3](https://github.com/SocialGouv/emjpm/compare/v24.3.2...v24.3.3) (2019-09-22)

**Note:** Version bump only for package @emjpm/api





## [24.3.2](https://github.com/SocialGouv/emjpm/compare/v24.3.1...v24.3.2) (2019-09-22)

**Note:** Version bump only for package @emjpm/api





## [24.3.1](https://github.com/SocialGouv/emjpm/compare/v24.3.0...v24.3.1) (2019-09-20)

**Note:** Version bump only for package @emjpm/api





# [24.3.0](https://github.com/SocialGouv/emjpm/compare/v24.2.3...v24.3.0) (2019-09-20)


### Features

* **admin:** display direction user ([#800](https://github.com/SocialGouv/emjpm/issues/800)) ([1022567](https://github.com/SocialGouv/emjpm/commit/1022567))





## [24.2.3](https://github.com/SocialGouv/emjpm/compare/v24.2.2...v24.2.3) (2019-09-19)

**Note:** Version bump only for package @emjpm/api





## [24.2.2](https://github.com/SocialGouv/emjpm/compare/v24.2.1...v24.2.2) (2019-09-18)

**Note:** Version bump only for package @emjpm/api





## [24.2.1](https://github.com/SocialGouv/emjpm/compare/v24.2.0...v24.2.1) (2019-09-18)

**Note:** Version bump only for package @emjpm/api





# [24.2.0](https://github.com/SocialGouv/emjpm/compare/v24.1.0...v24.2.0) (2019-09-18)

**Note:** Version bump only for package @emjpm/api





# [24.1.0](https://github.com/SocialGouv/emjpm/compare/v24.0.2...v24.1.0) (2019-09-16)


### Features

* **magistrat:** magistrat interface with mesures / mandataires  ([#733](https://github.com/SocialGouv/emjpm/issues/733)) ([abee816](https://github.com/SocialGouv/emjpm/commit/abee816))





## [24.0.2](https://github.com/SocialGouv/emjpm/compare/v24.0.1...v24.0.2) (2019-09-13)

**Note:** Version bump only for package @emjpm/api





## [24.0.1](https://github.com/SocialGouv/emjpm/compare/v24.0.0...v24.0.1) (2019-09-13)

**Note:** Version bump only for package @emjpm/api





# [24.0.0](https://github.com/SocialGouv/emjpm/compare/v23.5.0...v24.0.0) (2019-09-13)


### Features

* **service-admin:** populate table service_admin ([#719](https://github.com/SocialGouv/emjpm/issues/719)) ([7a882d7](https://github.com/SocialGouv/emjpm/commit/7a882d7))





# [23.5.0](https://github.com/SocialGouv/emjpm/compare/v23.4.5...v23.5.0) (2019-09-09)


### Bug Fixes

* **api-signup:** add validation and update tests ([#620](https://github.com/SocialGouv/emjpm/issues/620)) ([e8ac0dc](https://github.com/SocialGouv/emjpm/commit/e8ac0dc))
* **deps:** update dependencies ([#489](https://github.com/SocialGouv/emjpm/issues/489)) ([8ca4a42](https://github.com/SocialGouv/emjpm/commit/8ca4a42))
* **deps:** update dependency es6-promise to ^4.2.8 ([#467](https://github.com/SocialGouv/emjpm/issues/467)) ([bfcb45c](https://github.com/SocialGouv/emjpm/commit/bfcb45c))
* **deps:** update dependency nodemailer to ^6.3.0 ([#534](https://github.com/SocialGouv/emjpm/issues/534)) ([6278273](https://github.com/SocialGouv/emjpm/commit/6278273))
* **deps:** update dependency pg to ^4.5.7 ([#477](https://github.com/SocialGouv/emjpm/issues/477)) ([550af56](https://github.com/SocialGouv/emjpm/commit/550af56))
* **deps:** update dependency swagger-ui-dist to ^3.23.1 ([#533](https://github.com/SocialGouv/emjpm/issues/533)) ([36a9ddf](https://github.com/SocialGouv/emjpm/commit/36a9ddf))
* **mandataires:** prepose can see their etablissement ([#441](https://github.com/SocialGouv/emjpm/issues/441)) ([76f4eb5](https://github.com/SocialGouv/emjpm/commit/76f4eb5))
* **sentry:** initialise sentry if necessary ([#626](https://github.com/SocialGouv/emjpm/issues/626)) ([a6457cb](https://github.com/SocialGouv/emjpm/commit/a6457cb))


### Features

* **api:** add postal-code and city synchronisation ([#424](https://github.com/SocialGouv/emjpm/issues/424)) ([3a31901](https://github.com/SocialGouv/emjpm/commit/3a31901))
* **apollo-client:** introduce apollo client ([#625](https://github.com/SocialGouv/emjpm/issues/625)) ([1de496c](https://github.com/SocialGouv/emjpm/commit/1de496c))
* **app:** update to next 9 and styled-components 4 ([#583](https://github.com/SocialGouv/emjpm/issues/583)) ([b29bd0c](https://github.com/SocialGouv/emjpm/commit/b29bd0c)), closes [#83](https://github.com/SocialGouv/emjpm/issues/83)
* **department-id:** add column in mandataires and services ([#707](https://github.com/SocialGouv/emjpm/issues/707)) ([a379b95](https://github.com/SocialGouv/emjpm/commit/a379b95))
* **direction:** reorder files and code splitting ([#647](https://github.com/SocialGouv/emjpm/issues/647)) ([4d168d6](https://github.com/SocialGouv/emjpm/commit/4d168d6))
* **hasura:** introduce hasura, change auth ([#504](https://github.com/SocialGouv/emjpm/issues/504)) ([83a0fe9](https://github.com/SocialGouv/emjpm/commit/83a0fe9))
* **inscription:** fix service creation with new database organization ([#672](https://github.com/SocialGouv/emjpm/issues/672)) ([f25c2a0](https://github.com/SocialGouv/emjpm/commit/f25c2a0))
* **inscription:** inscription for dr and dd ([#518](https://github.com/SocialGouv/emjpm/issues/518)) ([8ab7c93](https://github.com/SocialGouv/emjpm/commit/8ab7c93))
* **mesures:** add departement_id for mesures ([#571](https://github.com/SocialGouv/emjpm/issues/571)) ([12d46a7](https://github.com/SocialGouv/emjpm/commit/12d46a7))
* **service-antenne:** introduce service antenne without changing UI ([#584](https://github.com/SocialGouv/emjpm/issues/584)) ([0f855c5](https://github.com/SocialGouv/emjpm/commit/0f855c5))
* **signup:** allow DRDD to sign up ([#580](https://github.com/SocialGouv/emjpm/issues/580)) ([96aab34](https://github.com/SocialGouv/emjpm/commit/96aab34))





## [23.4.5](https://github.com/SocialGouv/emjpm/compare/v23.4.4...v23.4.5) (2019-07-05)

**Note:** Version bump only for package @emjpm/api





## [23.4.4](https://github.com/SocialGouv/emjpm/compare/v23.4.3...v23.4.4) (2019-07-05)

**Note:** Version bump only for package @emjpm/api





## [23.4.3](https://github.com/SocialGouv/emjpm/compare/v23.4.2...v23.4.3) (2019-07-05)

**Note:** Version bump only for package @emjpm/api





## [23.4.2](https://github.com/SocialGouv/emjpm/compare/v23.4.1...v23.4.2) (2019-07-05)

**Note:** Version bump only for package @emjpm/api





## [23.4.1](https://github.com/SocialGouv/emjpm/compare/v23.4.0...v23.4.1) (2019-07-04)

**Note:** Version bump only for package @emjpm/api





# [23.4.0](https://github.com/SocialGouv/emjpm/compare/v23.3.333...v23.4.0) (2019-07-04)


### Bug Fixes

* **admin:** only mandataire can be view in admin mandataire ([#270](https://github.com/SocialGouv/emjpm/issues/270)) ([b4676e1](https://github.com/SocialGouv/emjpm/commit/b4676e1))


### Features

* **magistrats:** ETQ magistrat je souhaite pouvoir annuler une mesure. ([#236](https://github.com/SocialGouv/emjpm/issues/236)) ([934b498](https://github.com/SocialGouv/emjpm/commit/934b498))





## [23.3.333](https://github.com/SocialGouv/emjpm/compare/v1.2.0...v23.3.333) (2019-06-13)

**Note:** Version bump only for package @emjpm/api





# [1.2.0](https://github.com/SocialGouv/emjpm/compare/v1.1.0...v1.2.0) (2019-06-04)


### Features

* change mandataire services naming and implementation ([c59e43b](https://github.com/SocialGouv/emjpm/commit/c59e43b))
* change mandataire services naming and implementation ([#245](https://github.com/SocialGouv/emjpm/issues/245)) ([6347d22](https://github.com/SocialGouv/emjpm/commit/6347d22))
* **magistrats:** add numero RG to reservation mesure ([#248](https://github.com/SocialGouv/emjpm/issues/248)) ([964ae0c](https://github.com/SocialGouv/emjpm/commit/964ae0c))
* **services:** add services antennes and inscription for mandataires ([#216](https://github.com/SocialGouv/emjpm/issues/216)) ([2d0157b](https://github.com/SocialGouv/emjpm/commit/2d0157b))





# [1.1.0](https://github.com/SocialGouv/emjpm/compare/v0.0.2...v1.1.0) (2019-05-21)


### Bug Fixes

* **api:** async/await try/catch GET /inscription/tis ([#72](https://github.com/SocialGouv/emjpm/issues/72)) ([a5f4ff9](https://github.com/SocialGouv/emjpm/commit/a5f4ff9))
* **api:** explicite mandataires data order on getMandataires fct ([#70](https://github.com/SocialGouv/emjpm/issues/70)) ([883874a](https://github.com/SocialGouv/emjpm/commit/883874a))
* **api:** POST /inscription/mandataires must return a promise ([#45](https://github.com/SocialGouv/emjpm/issues/45)) ([cdd0d50](https://github.com/SocialGouv/emjpm/commit/cdd0d50))
* **api:** try/catch GET /admin/mandataires ([#71](https://github.com/SocialGouv/emjpm/issues/71)) ([6a5d3f8](https://github.com/SocialGouv/emjpm/commit/6a5d3f8))
* **deps:** update dependency jsonwebtoken to ^8.5.1 ([#116](https://github.com/SocialGouv/emjpm/issues/116)) ([50df6f6](https://github.com/SocialGouv/emjpm/commit/50df6f6))
* Update mandataire profile ([00d81b8](https://github.com/SocialGouv/emjpm/commit/00d81b8))
* **db:** users.reset_password_expires as timestamp migration ([1a8a1d5](https://github.com/SocialGouv/emjpm/commit/1a8a1d5))
* **deps:** update dependency body-parser to ^1.19.0 ([#163](https://github.com/SocialGouv/emjpm/issues/163)) ([72cbcc5](https://github.com/SocialGouv/emjpm/commit/72cbcc5))
* **deps:** update dependency cookie-parser to ~1.4.4 ([#108](https://github.com/SocialGouv/emjpm/issues/108)) ([6ad7540](https://github.com/SocialGouv/emjpm/commit/6ad7540))
* **deps:** update dependency cors to ^2.8.5 ([#109](https://github.com/SocialGouv/emjpm/issues/109)) ([f1175b8](https://github.com/SocialGouv/emjpm/commit/f1175b8))
* **deps:** update dependency csvjson to ^5.1.0 ([#110](https://github.com/SocialGouv/emjpm/issues/110)) ([5b44dce](https://github.com/SocialGouv/emjpm/commit/5b44dce))
* **deps:** update dependency date-fns to ^1.30.1 ([#111](https://github.com/SocialGouv/emjpm/issues/111)) ([a97153a](https://github.com/SocialGouv/emjpm/commit/a97153a))
* **deps:** update dependency debug to v4 ([#147](https://github.com/SocialGouv/emjpm/issues/147)) ([59b2491](https://github.com/SocialGouv/emjpm/commit/59b2491))
* **deps:** update dependency es6-promise to ^4.2.6 ([#112](https://github.com/SocialGouv/emjpm/issues/112)) ([a60ddd6](https://github.com/SocialGouv/emjpm/commit/a60ddd6))
* **deps:** update dependency express-session to ^1.16.1 ([#113](https://github.com/SocialGouv/emjpm/issues/113)) ([0bdecbb](https://github.com/SocialGouv/emjpm/commit/0bdecbb))
* **deps:** update dependency http-errors to ^1.7.2 ([#115](https://github.com/SocialGouv/emjpm/issues/115)) ([8b27913](https://github.com/SocialGouv/emjpm/commit/8b27913))
* **deps:** update dependency knex to ^0.16.5 ([#117](https://github.com/SocialGouv/emjpm/issues/117)) ([caba268](https://github.com/SocialGouv/emjpm/commit/caba268))
* **deps:** update dependency morgan to ^1.9.1 ([#119](https://github.com/SocialGouv/emjpm/issues/119)) ([e2727a2](https://github.com/SocialGouv/emjpm/commit/e2727a2))
* **deps:** update dependency nodemailer to v6 ([#151](https://github.com/SocialGouv/emjpm/issues/151)) ([20ee339](https://github.com/SocialGouv/emjpm/commit/20ee339))
* **deps:** update dependency query-string to ^6.4.2 ([#123](https://github.com/SocialGouv/emjpm/issues/123)) ([6366615](https://github.com/SocialGouv/emjpm/commit/6366615))
* **deps:** update dependency query-string to ^6.5.0 ([#168](https://github.com/SocialGouv/emjpm/issues/168)) ([5aca44f](https://github.com/SocialGouv/emjpm/commit/5aca44f))
* **deps:** update dependency swagger-jsdoc to ^3.2.9 ([#131](https://github.com/SocialGouv/emjpm/issues/131)) ([99c48a4](https://github.com/SocialGouv/emjpm/commit/99c48a4))
* **deps:** update dependency swagger-ui-dist to ^3.22.1 ([#132](https://github.com/SocialGouv/emjpm/issues/132)) ([28d3f21](https://github.com/SocialGouv/emjpm/commit/28d3f21))
* **docker:** api: dont use alpine because of node-gyp ([d480e8f](https://github.com/SocialGouv/emjpm/commit/d480e8f))
* **docker:** api: rm tz stuff ([15ec258](https://github.com/SocialGouv/emjpm/commit/15ec258))
* **email-reservation:** amelioration textes ([35e7525](https://github.com/SocialGouv/emjpm/commit/35e7525))
* **mesures:** force fix ordering ([01048a2](https://github.com/SocialGouv/emjpm/commit/01048a2))
* **review:** add some try/catch ([810013f](https://github.com/SocialGouv/emjpm/commit/810013f))
* **tests:** add GET_commentaires ([7cc5751](https://github.com/SocialGouv/emjpm/commit/7cc5751))
* **tests:** add some [@doug](https://github.com/doug) code ([07ae0d5](https://github.com/SocialGouv/emjpm/commit/07ae0d5))
* **tests:** cleanup + add routes.test.js ([d783483](https://github.com/SocialGouv/emjpm/commit/d783483))
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
* **tests:** refacto with createError ([9ab02c4](https://github.com/SocialGouv/emjpm/commit/9ab02c4))
* **tests:** update db snapshots with latest migrations ([ea6fc1f](https://github.com/SocialGouv/emjpm/commit/ea6fc1f))
* 404 error: show method too ([bce79fe](https://github.com/SocialGouv/emjpm/commit/bce79fe))
* allow to set sentry env segments ([fec3508](https://github.com/SocialGouv/emjpm/commit/fec3508))
* fix service auths ([3337bc4](https://github.com/SocialGouv/emjpm/commit/3337bc4))
* increase JSON POST limit ([9c2f1e7](https://github.com/SocialGouv/emjpm/commit/9c2f1e7))
* rm console ([1f25561](https://github.com/SocialGouv/emjpm/commit/1f25561))
* travis TZ fix ([#21](https://github.com/SocialGouv/emjpm/issues/21)) ([b9d0255](https://github.com/SocialGouv/emjpm/commit/b9d0255))


### Features

* add jwt limitation and ti profile ([75fecbc](https://github.com/SocialGouv/emjpm/commit/75fecbc))
* add nom and prenom to e2e inscription ([6f5848f](https://github.com/SocialGouv/emjpm/commit/6f5848f))
* add professionel name to mesure reservé for TI ([d3647e3](https://github.com/SocialGouv/emjpm/commit/d3647e3))
* add services ([3d405df](https://github.com/SocialGouv/emjpm/commit/3d405df))
* **api:** add GET /mandataires/postcode/:postcode route ([#47](https://github.com/SocialGouv/emjpm/issues/47)) ([ab63f66](https://github.com/SocialGouv/emjpm/commit/ab63f66))
* **jest-environment-knex:** make it a standalone package ([#173](https://github.com/SocialGouv/emjpm/issues/173)) ([d178651](https://github.com/SocialGouv/emjpm/commit/d178651))
* **tests:** add utils.shouldBeProtected ([0cbe795](https://github.com/SocialGouv/emjpm/commit/0cbe795))
* **tests:** import [@douglasduteil](https://github.com/douglasduteil) work ([e248198](https://github.com/SocialGouv/emjpm/commit/e248198))


### Performance Improvements

* **api:** allow parallel e2e testing :dash: ([#74](https://github.com/SocialGouv/emjpm/issues/74)) ([79bc9b6](https://github.com/SocialGouv/emjpm/commit/79bc9b6))


### BREAKING CHANGES

* **api:** remove POST /mandataires/PosteCode route
    It feel more natural to get the postcodes from a `GET` method.





## [0.0.2](https://github.com/SocialGouv/emjpm/compare/v0.0.1...v0.0.2) (2019-02-15)


### Bug Fixes

* **ci:** force release update ([27b584f](https://github.com/SocialGouv/emjpm/commit/27b584f))
