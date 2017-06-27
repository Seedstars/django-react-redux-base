#!/bin/bash

set -e

scope_files() {
  for file in "$@"; do
    cat "$file"
    echo "---"
  done
}

scope_files \
  gce/redis/redis-* \
  gce/postgres/postgresql-* \
  > django-react-full.yml

scope_files \
  gce/load-balancer/lego/* \
  gce/load-balancer/nginx/* \
  > django-react-load-balancer-full.yml

scope_files gce/ingress/* \
  > django-react-ingress.yml

scope_files \
  gce/load-balancer/lego/* \
  gce/load-balancer/nginx/* \
  django-react-ns.yml \
  django-react-config.yml \
  gce/storage/storage.yml \
  gce/redis/redis-* \
  gce/postgres/postgresql-* \
  gce/django-react/django-react-* \
  gce/ingress/* \
  > django-react-all.yml


if [[ -z "$DJANGO_REACT_IP" || -z "$DJANGO_REACT_DOMAIN" || -z "$DJANGO_REACT_LEGO_EMAIL" ]]; then
    echo "A needed variable is not exported. Check that DJANGO_REACT_IP, DJANGO_REACT_DOMAIN, and DJANGO_REACT_LEGO_EMAIL environment variables are set. Cannot replace & rename."
    exit 1
fi

dashed_domain="${DJANGO_REACT_DOMAIN//./-}"
echo "Using django-react-${dashed_domain}.yml"
cp django-react-all.yml django-react-${dashed_domain}.yml

sed -i.bak "
    s/@DJANGO_REACT_IP@/${DJANGO_REACT_IP}/g
    s/@DJANGO_REACT_DOMAIN@/${DJANGO_REACT_DOMAIN}/g
    s/@DJANGO_REACT_LEGO_EMAIL@/${DJANGO_REACT_LEGO_EMAIL}/g
" django-react-${dashed_domain}.yml
rm django-react-${dashed_domain}.yml.bak
