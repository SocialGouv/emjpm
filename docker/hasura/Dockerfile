FROM alpine:latest as papa

RUN apk --no-cache --update add curl
RUN curl -L https://github.com/hasura/graphql-engine/raw/master/cli/get.sh | sh

#

FROM hasura/graphql-engine:v1.0.0-beta.2

COPY --from=papa /usr/local/bin/hasura /bin/hasura
