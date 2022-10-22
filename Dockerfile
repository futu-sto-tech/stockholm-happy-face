FROM node:16.14.2-slim AS base
ENV WORKDIR=/app
ENV NODE_OPTIONS=${NODE_OPTIONS}

FROM base AS deps
WORKDIR $WORKDIR
COPY package*.json ./
RUN npm ci

FROM base AS dev
WORKDIR $WORKDIR
COPY --from=deps $WORKDIR/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD [ "/app/node_modules/.bin/next" ]
