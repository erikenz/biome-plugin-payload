# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-08-11

### Added

- `no-find-without-select` — flags `payload.find`, `payload.findByID`, `payload.findGlobal`, `payload.findVersions`, and `payload.findVersionByID` calls that omit a `select` object
- `no-find-without-depth` — flags the same read operations when `depth` is not set explicitly (omitting it uses the application default of 1, silently populating relationships)
- `no-missing-override-access` — flags any Local API call that does not declare `overrideAccess` explicitly; covers `find`, `findByID`, `findVersions`, `findVersionByID`, `create`, `update`, `updateByID`, `delete`, `deleteByID`, `count`, `findDistinct`, `findGlobal`, `updateGlobal`, `login`, and `unlock`
- `prefer-explicit-populate` — flags read operations with a positive numeric `depth` literal that omit `populate`, so populated relationship fields return an unintentional full field set
- `require-user-with-override-false` — flags any Local API call that sets `overrideAccess: false` without also passing `user` or `req`; without either, access control functions receive `undefined` and behave unpredictably
