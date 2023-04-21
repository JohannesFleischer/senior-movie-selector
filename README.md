# Senior Movie Selector

## Start

`docker compose up -d`

## Services

### for users

- [db_client](http://localhost:8000) on localhost:8000 to insert or edit Movies in the DB
- [client](http://localhost:3001) on localhost:3001 to select and watch movies

### for nerds

- [db_server](http://localhost:3000) on localhost:3000 with the db-api
- [videoplayer](http://localhost:1337/main.html) on localhost:1337 that hosts the videoplayer and serves as a poster-fileserver for the client.
> kinda looks broken without proper file input
- dockerized mongodb

## Usage

1. copy movie files in `videoplayer/films` and the film-posters in `videoplayer/poster`

2. create db entries for all films with the db_client

> Do not enter the whole path for the files. The filename is all you need.

3. profit


## Dependencies
see [here](DEPENDENCIES.md)
