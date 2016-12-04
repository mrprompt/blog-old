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

Parando de enrolação, vamos ao que interessa, Pipelines!

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

O Pipelines era sem dúvida a ferramenta que faltava ao Bitbucket. Simples de configurar, utiliza [Docker](https://www.docker.io) - se você ainda não leu a respeito e começou a usar, pare agora e comece - e é totalmente grátis, inclusive para repositórios privados e projetos de times.

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

Aqui vem a parte chata da configuração, toda modificação que você fizer neste arquivo, é um commit + push que você precisa mandar pro projeto, eu acho um pouco chato isso e suja o projeto desnecessariamente, mas vamos lá.

O ambiente de integração, utiliza containers do Docker para rodar, então, o nosso primeiro passo na configuração do projeto, e informar a imagem que precisamos utilizar para nosso build. Esta imagem pode ser tanto um container disponível no Docker Hub quanto um container próprio.

A configuração do Pipelines é baseado em blocos de passos, chamado no arquivo de configuração de **step**. Cada **step** possui um **script**, que são os comandos rodados para a conclusão do build. Cada linha, do script, é um comando rodado após o término do anterior.

O bloco **default** irá rodar os passos configurados nele para todos os branchs que receberem uma atualização, como um push ou um merge.

Você também pode criar um bloco com o nome de um branch específico, para rodar quais passos achar necessário

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


#### Bônus Track - Exemplos de Configuração

#### <a name="configurando-php"></a> PHP

#### <a name="configurando-nodejs"></a> Nodejs

#### <a name="configurando-angularjs"></a> Angularjs

#### <a name="configurando-ruby"></a> Ruby

#### <a name="configurando-java"></a> Java

### <a name="pros-e-contras"></a> Prós & Contras

### <a name="conclusao"></a> Conclusão

### <a name="mais-informacoes"></a> Mais Informações
