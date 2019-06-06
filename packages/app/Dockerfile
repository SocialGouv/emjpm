ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM nginx:1.16-alpine

COPY --from=emjpm-base-image /app/packages/app/out /www

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./scripts /

EXPOSE 80

RUN ["chmod", "+x", "/entrypoint.sh"]+

ENTRYPOINT ["/entrypoint.sh"]
