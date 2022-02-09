# Kafka Connect

Serviço que connecta-se ao Twitter para obter os dados sobre o BBB e salvá-los no kafka e depois adicioná-los no banco usando o sink do MongoDB

## Conectores

1. TwitterSourceConnector
2. MongoSinkConnector

## Executando o projeto

1. Executar o comando abaixo para copiar as crendencias do twitter para o arquivo de configuração

```sh
sh connector-twitter-config.sh
```

2. Em seguida execute o comando

```sh
docker-compose up
```

3. Acessar o Controll Centerl

```txt
http://localhost:9021
```

4. Configurar Twitter

Clique em _Connect clusters_ --> _Connect_ --> _connect_default_ --> _Add Connector_ --> _Upload connector config file_ --> selecione o arquivo __connector-twitter-config.properties__ --> __Continue__ --> __Launch__

6. Configurar Sink MongoDB

Clique em _Connect clusters_ --> _Connect_ --> _connect_default_ --> _Add Connector_ --> _Upload connector config file_ --> selecione o arquivo _connector-twitter-config.properties_ --> _Continue_ --> _Launch_

6. Acessar o banco de dados

```txt
http://localhost:8085
```

### Observação

[__Atualmente só funciona dessa forma__]

Para executar o projeto sem estar integrado com o projeto do nest é necessário descomentar o banco de dados do arquivo docker-compose.yaml