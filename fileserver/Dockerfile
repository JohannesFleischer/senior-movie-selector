FROM nginx:alpine

WORKDIR /movie-app
COPY src/nginx.cfg /etc/nginx/nginx.conf
COPY src ./src
COPY fonts ./fonts
COPY main.html ./main.html
