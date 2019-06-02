FROM node:8-alpine AS build

# Set up working directory
ENV APP_HOME=/trello
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME

# Install node module packages
RUN yarn install
RUN yarn build
