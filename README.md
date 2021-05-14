<h1>Staffy</h1>

A web app for writing sheet music online.

## Requirements

You must have Docker installed on your machine.

## Getting started

Install the dependencies

```
npm install
```

## Develop

Staffy uses [Laravel Sail](https://laravel.com/docs/8.x/sail) which is a light-weight command-line interface for
interacting with Laravel's Docker development environment.

### Executing Commands

When using Laravel Sail, the application is executing within a Docker container and is isolated from your local
computer. Sail provides a convenient way to run various commands against your application such as arbitrary PHP
commands, Artisan commands, Composer commands, and Node / NPM commands.

### Installation

```
cp .env.dist .env

sail composer install

sail npm install
```

### Starting & Stopping Sail

You may wish to configure a Bash alias that allows you to execute Sail's commands more easily:

```sh
alias sail="bash vendor/bin/sail"
```

To start all the Docker containers in the background, you may start Sail in "detached" mode:

```
sail up -d
```

To stop all the containers, you may simply press Control + C to stop the container's execution. Or, if the containers
are running in the background, you may use the down command:

```
sail down
```

### Migrating database

```
sail artisan migrate
```
