# System wspomagający głosowania w ciałach kolegialnych "co-voting"

## Zaimplementowane elementy
- ekran logowania
- panel planowania posiedzeń
- panel zarządzania posiedzeniem
- panel do głosowania

## Uruchomienie aplikacji
Bazę danych i kolejkę RabbitMQ można uruchomić przy pomocy aplikacji docker i docker-compose wywołując polecenia:
``` shell
$ docker-compose build
$ docker-compose up -d
```
*wymagane jest zainstalowanie aplikacji Docker

Aplikację-serwer można uruchomić poprzez IDE IntelliJ IDEA, klasa `CovotingApplication` jest klasą "wejściową", zawierającą metodę `main`
(JDK 17)

Aplikację-klienta można uruchomić wywołując polecenia:
```shell
$ cd src/main/frontend
$ npm install
$ npm start
```
*wymagane jest zainstalowanie Node.js

Aby wyłączyć serwery bazy danych i kolejki wiadomości można wywołać polecenie:
``` shell
$ docker-compose stop
```
Aby wyłączyć i usunąć kontenery należy wywołać polecenie:
``` shell
$ docker-compose down
```



