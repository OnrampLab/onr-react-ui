# Capistrano

## Requiremnet

* docker
* docker-compose
* ssh key form your virtual machine

update the `.env` file to change server urls, ssh file path, etc.

## Deployment

For example, if you want to deploy to the staging server, you can run:

```sh
docker-compose run cap staging deploy
```
