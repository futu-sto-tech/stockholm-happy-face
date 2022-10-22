#!/bin/bash

# This script starts next and applies Hasura migrations and metadata.
#
# The migrations and metadata updates require that the Smileys app is running
# since the running Hasura instance will call to the migration and configuration
# endpoints of the Smileys app.

set -eo pipefail

export PATH="./node_modules/.bin:${PATH}"
# https://github.com/hasura/graphql-engine/issues/4496#issuecomment-626832351
export HASURA_GRAPHQL_CLI_ENVIRONMENT="server-on-docker"
export HASURA_GRAPHQL_SHOW_UPDATE_NOTIFICATION="false"

initialize_hasura () {
    HASURA="http://${HASURA_GRAPHQL_ENDPOINT%%/*}"

    sleep 10 # wait for Next to start

    hasura --skip-update-check migrate apply \
           --endpoint "$HASURA"
    hasura --skip-update-check metadata apply \
           --endpoint "$HASURA" \
           --from-file ./migrations/metadata.yaml
}

initialize_hasura &

next
