FROM node:18

RUN npm install -g http-server
  
# Expose ports
EXPOSE 1337

# Set the default command to execute
# when creating a new container
CMD http-server /movie-app -p 1337
