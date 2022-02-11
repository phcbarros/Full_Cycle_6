# Imersão Full Stack & FullCycle 6.0 - Fincycle - Kafka e Kafka Connect

## Descrição

Repositório do Kafka e Kafka Connect

## Rodar a aplicação

### Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):

```
127.0.0.1 host.docker.internal
```

Em todos os sistemas operacionais é necessário abrir o programa para editar o _hosts_ como Administrator da máquina ou root.

Execute o comando:

```
docker-compose up
```

Espere um pouco antes de testar o Control Center no endereço: `http://localhost:9021`.
Configure um client no painel de developers do Twitter: [https://developer.twitter.com/en](https://developer.twitter.com/en), antes de criar um connector do Twitter no painel do Kafka Connect.

Crie o connector do Twitter, depois o do MongoDB (necessário iniciar o serviço do MongoDB do `docker-compose.yaml` do Nest.js).

Verifique se o tópico `tweets` foi criado com os novos tweets capturados (lembre-se de não deixar ativo muito tempo para testar, senão o Twitter pode bloquear).

Toda vez que parar os containers do Kafka, é necessário executar o comando `docker-compose down` antes.

### Para Windows

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart)

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

Clique em _Connect clusters_ --> _Connect_ --> _connect_default_ --> _Add Connector_ --> _Upload connector config file_ --> selecione o arquivo **connector-twitter-config.properties** --> **Continue** --> **Launch**

6. Configurar Sink MongoDB

Clique em _Connect clusters_ --> _Connect_ --> _connect_default_ --> _Add Connector_ --> _Upload connector config file_ --> selecione o arquivo _connector-twitter-config.properties_ --> _Continue_ --> _Launch_

6. Acessar o banco de dados

```txt
http://localhost:8085
```
