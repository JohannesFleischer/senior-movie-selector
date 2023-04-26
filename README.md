# Senior Movie Selector

> **Note:** Chrome support is currently wip. It runs best on Firefox.

## Start

`docker compose up -d`

## Services

### for users

- [db_client](http://localhost:8000) on localhost:8000 to insert or edit Movies in the DB
- [client](http://localhost:3001) on localhost:3001 to select and watch movies

### for nerds

- [db_server](http://localhost:3000) on localhost:3000 with the db-api
- [videoplayer](http://localhost:1337/main.html) on localhost:1337 that hosts the videoplayer and serves as a poster-fileserver for the client.
> kinda looks broken without proper file input (?film=\<filename\>)
- dockerized mongodb

## Setup

1. copy movie files in `videoplayer/films` and the film-posters in `videoplayer/poster`

2. create db entries for all films with the db_client

> Do not enter the whole path for the files. The filename is all you need.

3. profit

## Usage

Short usage description

### Client

The main application is the `client`.
The Client selects `movie_count` files that are displayed on the Screen.
Supported actions are:

- `Hover` over a movie -> shows description
- `Click` on a movie -> starts the videoplayer with the filename from the db
- `Escape`/`Backspace`/ `ArrowUp` -> reload
- `ArrowRight`/ `ArrowLeft` -> select movies
- `Enter` -> start selected movie

> **Note:** If a poster is not available the `noimage.png` is shown

### Videoplayer

The second user application is the `videoplayer`.
In general this address has not to be opened manually. If you want to do so see [Services](#services).
The Videoplayer tries to open the videofile with the name from the db.
If the file is not found it redirects to the `client`.
If the Videofile is found the videoplayer tries to start it automatically in \"fullscreen\" (technically just laaarge)
> **Note:** to start the video automatically in Firefox this has to be allowed manually

Supported files are [depending on your browser](https://videojs.com/guides/faqs/#q-what-media-formats-does-videojs-support). Mp4 should work on all common browsers.

Supported actions are:

- `Click`/`Enter` -> start/stop
- `Backspace` -> return to `client`
- `ArrowRight`/`ArrowLeft` -> +/-15 seconds (can be hold for longer periods)

## Dependencies

see [here](DEPENDENCIES.md)
