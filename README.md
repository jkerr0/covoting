# System wspomagający głosowania w ciałach kolegialnych "co-voting"

## Zaimplementowane elementy
- ekran logowania
- panel do zarządzania posiedzeniami (bez możliwości dodawania głosowań)

## Uruchomienie aplikacji
Aplikację można uruchomić przy pomocy aplikacji docker i docker-compose wywołując polecenia (obrazy budowane lokalnie):
``` shell
$ docker-compose build
$ docker-compose up -d
```
Alternatywnie można wykorzystać zbudowane wcześniej obrazy umieszczone na hub.docker.com:
``` shell
$ docker-compose pull
$ docker-compose up -d
```
Aby wyłączyć aplikację można wywołać polecenie:
``` shell
$ docker-compose stop
```
Aby wyłączyć aplikację i usunąć kontenery należy wywołać polecenie:
``` shell
$ docker-compose down
```



