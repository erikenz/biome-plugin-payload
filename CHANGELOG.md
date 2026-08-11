# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3](https://github.com/erikenz/biome-plugin-payload/compare/v0.1.2...v0.1.3) (2026-08-11)


### Bug Fixes

* **docs:** update documentation link in rule comments ([8e12ef9](https://github.com/erikenz/biome-plugin-payload/commit/8e12ef9c29fc4a631af03bb76120acf5e2040b6b))

## [0.1.2](https://github.com/erikenz/biome-plugin-payload/compare/v0.1.1...v0.1.2) (2026-08-11)


### Bug Fixes

* normalize repository url in package.json & add workflow_dispatch ([a070e23](https://github.com/erikenz/biome-plugin-payload/commit/a070e23ddc27019400f03f92368f8d5d802cb532))

## [0.1.1](https://github.com/erikenz/biome-plugin-payload/compare/v0.1.0...v0.1.1) (2026-08-11)


### Bug Fixes

* **require-user-with-override-false:** accept req as equivalent to user ([92a421f](https://github.com/erikenz/biome-plugin-payload/commit/92a421f8a542f97594f636ce796b7dde2c80fa62))

## [0.1.0] — 2026-08-11

### Added

- `no-find-without-select` — flags `payload.find`, `payload.findByID`, `payload.findGlobal`, `payload.findVersions`, and `payload.findVersionByID` calls that omit a `select` object
- `no-find-without-depth` — flags the same read operations when `depth` is not set explicitly (omitting it uses the application default of 1, silently populating relationships)
- `no-missing-override-access` — flags any Local API call that does not declare `overrideAccess` explicitly; covers `find`, `findByID`, `findVersions`, `findVersionByID`, `create`, `update`, `updateByID`, `delete`, `deleteByID`, `count`, `findDistinct`, `findGlobal`, `updateGlobal`, `login`, and `unlock`
- `prefer-explicit-populate` — flags read operations with a positive numeric `depth` literal that omit `populate`, so populated relationship fields return an unintentional full field set
- `require-user-with-override-false` — flags any Local API call that sets `overrideAccess: false` without also passing `user`; without a user, access control functions receive `undefined` and behave unpredictably
