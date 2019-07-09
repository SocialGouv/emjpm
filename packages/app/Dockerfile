ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM nginx:1.17-alpine

COPY --from=emjpm-base-image /app/packages/app/out /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./scripts /

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
