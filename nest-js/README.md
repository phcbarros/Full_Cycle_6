# Aplicação NestJS

## Executando

```sh
docker-compose up
```

### Observação

Caso não aconteça um erro de permissão é necessário executar o comando abaixo:

```sh
chmod x+ .docker/entrypoint.sh
```

## Instalando dependências

```sh
docker-compose exec app sh

npm install ....
```

### Redis

```sh
docker-compose exec redis sh

redis-cli

# listar chaves
keys *

# listar valor da chave

get 'chave'

# apagar todas as chaves
flushall
```
