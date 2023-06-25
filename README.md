# Senior Movie Selector

## Start

The [Production](#production) and [Development](#development) sections include informations to manually install the project. If you want to use a raspberry pi to host the project there is also a [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) role in this repository that you can use to install the project and setup a auto start. You can fin more information [here](#information-about-hosting-on-a-pi)

### Production

To run the latest official release download the `docker-compose.yml` and create a `films`, `mongo/db` and `poster` folder (or symlink for your media) in the same directory. So it should look kinda like this:

```txt
senior-movie-selector/
├─ films/
│  ├─ film-1.mp4
│  ├─ film-2.mp4
│  ├─ ...
├─ mongo/db/
├─ poster/
│  ├─ poster-1.png
│  ├─ poster-2.png
│  ├─ ...
├─ docker-compose.yml
```

After that you can use the following command to pull and start the containers:

```sh
docker compose up -d
```

---

If you don't want to use the official images or if your platform ist not supported (yet) you can also download the whole project and then build and start the containers yourself with the following command:

```sh
docker compose -f docker-compose-prod.yml up -d
```
---

> **Important:**
>
> - if you want to use the application after reboots you should restart it with `docker compose restart`
> - If you want to run it on a raspi you can find more information [here](#information-about-hosting-on-a-pi)

### Development

To run the development version you can use the following command:

```sh
docker compose -f docker-compose-dev.yml up -d
```

> **Note:** if you want to edit a react service i recommend to start this service first (e.g. with `nodemon`) and then launch the other services with `docker compose` so you don't have to rebuild all services every time

## Services

### for users

- [db-client](http://localhost:8000) to insert or edit Movies in the DB
- [client](http://localhost) to select and watch movies

### for nerds

- [db-server](http://localhost:3000) with the db-api for the actual `mongo-db`
- [fileserver](http://localhost:1337) that serves as a file server for the other services and hosts the videoplayer.
- [mongo](http://localhost:27017) actual db that stores the data in the `mongo` folder

## Setup

1. copy movie files in `videoplayer/films` and the film-posters in `videoplayer/poster` or replace the folders with symlinks and then restart with `docker compose restart`.
2. create db entries for all films with the `db-client`
3. profit

## Usage

### Client

The main application is the `client`.
The Client selects `movie_count` files that are displayed on the Screen.
Supported actions are:

- `Hover` over a movie -> shows description
- `Click` on a movie -> starts the videoplayer with the filename from the db
- `Escape`/`Backspace`/ `ArrowUp` -> reload
- `ArrowRight`/ `ArrowLeft` -> select movies
- `Enter` -> start selected movie

### Fileserver

The second user application is the `fileserver`.
In general this address has not to be opened manually. If you want to do so see [Services](#services).
The file server hosts all film and poster files but also fonts and the static videoplayer file:

#### Videoplayer

The videoplayer (main.html) takes an filename as a url parameter and tries to open that file.
When clicking on a film in the `client` you get redirected to the videoplayer. The player then tries to open the videofile with the name from the db.
If the file is not found or if an error occurs you get redirected back to the `client`.
If the videofile is found the videoplayer tries to start it automatically in \"fullscreen\" (technically just laaarge)

> **Notes:**
>
> - to start the video automatically in Firefox this has to be allowed manually at least once
> - Supported filetypes are [depending on your browser](https://videojs.com/guides/faqs/#q-what-media-formats-does-videojs-support). Mp4 should work on all common browsers.

Supported actions are:

- `Click`/`Enter` -> start/stop
- `Backspace` -> return to `client`
- `ArrowRight`/`ArrowLeft` -> ±15 seconds (can be hold for longer periods)

## Dependencies

see [here](DEPENDENCIES.md)

## Additional

### Information about hosting on a pi

To run on a raspberry pi use the [64-bit version](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-64-bit) on `raspi 3` or higher

For the installation and the setup of the autostart you can use Ansible role in `./ansible/`

> **IMPORTANT:** Ansible run on your pc, <u>not on your pi</u> and executes commands via a ssh connection. To use the role a [passwordless ssh connection](https://www.ssh.com/academy/ssh/copy-id) to the pi is necessary.

Once that is ensured, you can follow the steps below for installation and setup.

1. [Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) on your pc
2. Download the repository on your pc
3. Navigate to the `ansible` folder of the repository
4. Install the requirements with:

```sh
ansible-galaxy install -r requirements.yml
```

5. Customize the variables in the `vars/vars.yml` file to your liking
6. Start the role with:

```sh
ansible-playbook install.yml
```

### Information about remote easyfications

 Through the supported key-events a remote like [this one](https://www.amazon.de/Andoer%C2%AE-Magische-Drahtlose-Fernbedienung-PC-Projektor-Type-1/dp/B015SO37SY) can be used.
To make it even easier to use you can [disable](https://superuser.com/questions/775785/how-to-disable-a-keyboard-key-in-linux-ubuntu) all Buttons you don't need. **But beware: this settings are system-wide**

### Information about updating the database externally

The project itself runs completely locally, but if the target computer is connected to the internet, it is also possible to update the database from another computer using ssh port forwarding. This can be done on Linux for example with this command `ssh -L 3000:127.0.0.1:3000 <user>@<ip-of-your-pi>` or alternatively with this entry in your `~/.ssh/config`

```sh
Host pi-db-fwd
	HostName <ip-of-your-pi>
	User <user>
	LocalForward 3000 127.0.0.1:3000
```

and the corresponding command `ssh pi-db-fwd`.
After that the `db-client` can be started with `docker compose -f docker-compose-dev.yml up db-client -d` on your computer and it will automatically access the database of your pi.
The whole thing also works over a VPN connection.
