# mongo-db

[![CircleCI](https://circleci.com/gh/bebusinessfocus/mongo-db.svg?style=svg)](https://app.circleci.com/pipelines/github/bebusinessfocus/mongo-db)

### Test

Run a Local mongo database, for instance with Docker

```
$ docker run --rm -ti -d --name mongo -p 27017:27017 -v `pwd`/data/db/:/data/db mongo:4.4
```

Run test with

```
$ npm test
```

### License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.
