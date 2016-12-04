---
layout: post
author: mrprompt
comments: true
date: 2016-12-04 00:00:00+00:00
slug: integracao-continua-pipelines
title: Integração Contínua com Bitbucket Pipelines
---
Finalmente, mais um post para a série: [Integração Contínua]({% post_url 2016-03-25-falando-sobre-integracao-continua-e-qualidade-de-desenvolvimento %}).
A correria anda tornando cada vez mais impossível estudar a quantidade de ferramentas que temos por aí, mas aos poucos vou caminhando.

No último post, sobre [Jenkins]({% post_url 2016-09-09-integracao-continua-jenkins %}), prometi que o artigo a seguir seria sobre [PHPCI](https://www.phptesting.org/), mas o Bitbucket liberou para todos os Pipelines, e foi a ferramenta de CI escolhida para a equipe do qual faço parte na [BêeCambio](https://www.beecambio.com.br), resolvi falar sobre ela antes.

<img src="{{ site.baseurl }}/upload/ci/pipelines/pipelines.png" class="img img-responsive img-thumbnail pull-right" alt="Bitbucket Pipelines Logo" title="Pipelines" width="400" height="335">

Parando de enrolação, vamos ao que interessa, [Pipelines](https://confluence.atlassian.com/bitbucket/bitbucket-pipelines-792496469.html)!

- [Apresentação](#apresentacao)
- [Instalação](#instalacao)
- [Configurando](#configurando)
    - [PHP](#configurando-php)
    - [Nodejs](#configurando-nodejs)
    - [Angularjs](#configurando-angularjs)
    - [Ruby](#configurando-ruby)
    - [Java](#configurando-java)
- [Prós & Contras](#pros-e-contras)
- [Conclusão](#conclusao)
- [Mais Informações](#mais-informacoes)

### <a name="apresentacao"></a> Apresentação

O [Pipelines](https://confluence.atlassian.com/bitbucket/bitbucket-pipelines-792496469.html) era sem dúvida a ferramenta que faltava ao [Bitbucket](https://www.bitbucket.org). Simples de configurar, utiliza [Docker](https://www.docker.io) e é totalmente grátis, inclusive para repositórios privados.

### <a name="instalacao"></a> Instalação

A instalação do Pipelines não poderia ser mais simples, bastando que você habilite no menu lateral e siga os passos na tela.

<img src="{{ site.baseurl }}/upload/ci/pipelines/00-menu-lateral.png" class="img img-responsive img-thumbnail text-center" alt="" title="" width="" height="">

#### Passo 1
Clicando no menu lateral, tem um pequeno slideshow apresentando o Pipelines e solicitando que você concorde com a instalação, já que ele vai criar um novo arquivo no seu projeto - não se preocupe com isso agora.

<img src="{{ site.baseurl }}/upload/ci/pipelines/01-instalacao-passo-1.png" class="img img-responsive img-thumbnail" alt="" title="" width="" height="">

#### Passo 2
O segundo passo da instalação, é selecionar o ambiente que você pretende configurar, existem várias opções, cada uma irá apresentar um esqueleto bem simples de configuração para cada tipo de projeto, não se preocupe com o que aparecer na tela, futuramente você poderá editar este arquivo.

<img src="{{ site.baseurl }}/upload/ci/pipelines/02-instalacao-passo-2.1.png" class="img img-responsive img-thumbnail" alt="" title="" width="560" height="">
<img src="{{ site.baseurl }}/upload/ci/pipelines/03-instalacao-passo-2.2.png" class="img img-responsive img-thumbnail pull-right" alt="" title="" width="560" height="">

### <a name="configurando"></a> Configurando

Finalizando os passos, será criado no projeto o arquivo **bitbucket-pipelines.yml**, contendo a configuração do ambiente e dos passos necessários para alcançar o sucesso do nosso build.

Aqui vem a parte chata da configuração, toda modificação que você fizer neste arquivo, é um commit + push que você precisa mandar pro projeto - você também pode rodar os builds localmente, mas [dá trabalho](https://confluence.atlassian.com/bitbucket/debug-your-pipelines-locally-with-docker-838273569.html).  Pessoalmente, acho um pouco chato isso e suja o projeto, mas vamos lá.

O ambiente de integração, utiliza containers do Docker para rodar, então, o nosso primeiro passo na configuração do projeto, e informar a imagem que precisamos utilizar para nosso build. Esta imagem pode ser tanto um container disponível no [Docker Hub](hub.docker.com) quanto um container próprio.

Caso você não especifique uma imagem, será utilizada uma [imagem padrão](https://hub.docker.com/r/atlassian/default-image/), baseada no [Ubuntu 14.04](http://releases.ubuntu.com/14.04/), disponibilizada pelo time da [Atlassian](https://br.atlassian.com/), que contém algumas ferramentas por padrão:

- wget
- xvfb
- curl
- git: 1.9.1
- java: 1.8u66
- maven: 3.0.5
- node: 4.2.1
- npm: 2.14.7
- nvm: 0.29.0
- python: 2.7.6
- gcc: 4.8.4

A configuração do Pipelines é baseado em blocos de passos, chamado no arquivo de configuração de **step**.

Cada **step** possui um **script**, que são os comandos rodados para a conclusão do build. Cada linha, do script, é um comando rodado após o término do anterior.

O bloco **default** irá rodar os passos configurados nele para todos os branchs que receberem uma atualização, como um push ou um merge.

Você também pode criar blocos de configurações para determinados branchs ou tags, e rodar os passos achar necessário. Eu gosto muito desse tipo de configuração, para disparar o evento de deploy, que sempre deixo a cargo de outra ferramenta.

Um exemplo do arquivo de configuração é esse:

```
# This is a sample build configuration for PHP.
# Check our guides at https://confluence.atlassian.com/x/VYk8Lw for more examples.
# Only use spaces to indent your .yml configuration.
# -----
# You can specify a custom docker image from Docker Hub as your build environment.
image: phpunit/phpunit:5.0.3

pipelines:
  default:
    - step:
        script: # Modify the commands below to build your repository.
          - composer install
```

Você pode ter uma referência completa do arquivo de configurações [aqui](https://confluence.atlassian.com/bitbucket/configure-bitbucket-pipelines-yml-792298910.html).

#### Bônus Track - Exemplos de Configuração

Como sempre, vou mostra abaixo algumas configurações utilizadas nos projetos que tenho no Pipelines, e também algumas disponíveis no próprio [guia](https://confluence.atlassian.com/bitbucket/language-guides-for-bitbucket-pipelines-856821477.html) do Pipelines.

#### <a name="configurando-php"></a> PHP

```
image: phpunit/phpunit:5.0.3

pipelines:
  default:
    - step:
        script:
          - composer --version
          - phpunit --version
          - composer install
          - phpunit --configuration tests/phpunit.xml
```

#### <a name="configurando-nodejs"></a> Nodejs

```
image: node:6.0.0

pipelines:
  default:
    - step:
        script:
          - npm install --silent --progress=false
          - npm test
```
Meu bloco **scripts** do package.json:

```
...
"scripts": {
  "start": "node app.js",
  "test": "mocha test/**/*Test.js",
  "coverage": "istanbul cover _mocha -- -R spec"
},
...
```

#### <a name="configurando-angularjs"></a> Angularjs

```
image: node:6.0.0

pipelines:
  default:
    - step:
        script:
          - npm install --silent --progress=false
          - npm run bower
          - npm run build
          - nohup bash -c "npm run webdriver-start 2>&1 &" && sleep 9
          - npm run start 2>&1  &
          - npm test
```

Meu bloco **scripts** do package.json:

```
...
"scripts": {
  "bower": "bower install",
  "build": "gulp build",
  "start": "gulp serve",
  "webdriver-start": "webdriver-manager update && webdriver-manager start",
  "test": "protractor protractor.conf.js"
},
...
```
#### <a name="configurando-ruby"></a> Ruby

```
image: ruby:2.3.0

pipelines:
  default:
    - step:
        script:  # Modify the commands below to build and test your repository.
          - ruby --version
          - bundler --version
          - bundle install
```

#### <a name="configurando-java"></a> Java

```
# You can use any Docker image from Docker Hub or your own container registry
image: maven:3.3.3

pipelines:
  default:
    - step:
        script:  # Modify the commands below to build and test your repository.
          - mvn --version
          - mvn clean install
```

### <a name="pros-e-contras"></a> Prós & Contras

A favor do Pipelines, tem muita coisa, apesar de ser uma ferramenta nova e ainda em sua versão beta, ela cumpre o que promete e reconhece [suas limitações](https://confluence.atlassian.com/bitbucket/limitations-of-bitbucket-pipelines-827106051.html), porém, roda muito rápido e faz parte do Bitbucket, não uma ferramenta a parte.

Como não podia faltar em nenhuma ferramenta de CI, existem [várias integrações](https://confluence.atlassian.com/bitbucket/bitbucket-pipelines-integrations-826868162.html) prontas para utilizar, como Deploy para S3, Heroku, Azure e etc.

Contra, por enquanto, é que somente roda em projetos em projetos do Bitbucket, e ainda é um pouco problemático com o arquivo de configuração - talvez isso seja problema do próprio yaml, mas as vezes incomoda.


### <a name="conclusao"></a> Conclusão

Para quem utiliza exclusivamente o Bitbucket como controle de versão e possui projetos privados, mas não quer gastar uma quantia considerável para rodar utilizar uma ferramenta de CI, o Pipelines cai como uma luva.

Com uma configuração bem simplificada, sem a necessidade de instalar dezenas de ferramentas anteriormente e etc, é a ferramentas ideal para equipes e projetos de qualquer tamanho, possibilitando um fluxo de entrega muito mais ágil e de configuração visível para todos os membros da equipe. Possibilitando inclusive simulações locais do ambiente de build.

Rodando sobre Docker, é possível manter ainda mais controle sobre o ambiente necessário para o ideal funcionamento do projeto, dando ainda mais transparência sobre o processo.

### <a name="mais-informacoes"></a> Mais Informações

- [Bitbucket Pipelines](https://confluence.atlassian.com/bitbucket/bitbucket-pipelines-792496469.html)
- [Get started with Bitbucket Pipelines](https://confluence.atlassian.com/bitbucket/get-started-with-bitbucket-pipelines-792298921.html)
- [Language guides](https://confluence.atlassian.com/bitbucket/language-guides-for-bitbucket-pipelines-856821477.html)
- [BITBUCKET-PIPELINES.YML REFERENCE](https://confluence.atlassian.com/bitbucket/configure-bitbucket-pipelines-yml-792298910.html)
- [Language guides for Bitbucket Pipelines](https://confluence.atlassian.com/bitbucket/language-guides-for-bitbucket-pipelines-856821477.html)
