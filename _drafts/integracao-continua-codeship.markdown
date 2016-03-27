---
layout: post
author: mrprompt
comments: true
date: 2016-03-27 00:00:01+00:00
slug: integracao-continua-codeship
title: Integração Contínua com CodeShip
---

<img src="{{ site.baseurl }}/upload/ci/codeship/codeship.png" class="img img-responsive pull-right" alt="Codeship Logo" title="Codeship" width="250">
Continuando a [série sobre Integração Contínua]({% post_url 2016-03-25-falando-sobre-integracao-continua-e-qualidade-de-desenvolvimento %}), partimos agora para o [CodeShip](http://www.codeship.com), que assim como o
[Travis-CI]({% post_url 2016-03-26-integracao-continua-travis-ci %}), também é uma ótima ferramenta online para implantar
Integração Contínua em seus projetos.

Mas ao contrário do [Travis-CI](https://www.travis-ci.org), o **CodeShip** nos permite adicionar repositórios privados sem
custo algum - mas o limite é de 5 repositórios - assim como ilimitados repositórios de projetos de código fonte aberto.

Assim como no último post, vamos dividir este também em algumas partes, para facilitar a leitura e o entendimento da ferramenta.

- [Apresentação](#apresentacao)
- [Cadastro](#cadastro)
- [Configurando](#configurando)
    - [PHP](#configurando-php)
    - [Nodejs](#configurando-nodejs)
    - [Angularjs](#configurando-angularjs)
    - [Ruby](#configurando-ruby)
    - [Java](#configurando-java)
- [Prós & Contras](#pros-e-contras)
- [Conclusão](#concusao)
- [Mais Informações](#mais-informacoes)

### <a name="apresentacao"></a> Apresentação

Conheço a relativamente pouco tempo o **CodeShip**, mas sua facilidade de uso e simplicidade me convenceram logo de cara a
utilizá-lo no projeto de um cliente, e logo tomei-o também para alguns [projetos pessoais](https://github.com/mrprompt), como
alternativa ao **Travis-CI**.

Claro que a primeira coisa que me chamou a atenção, foi a possibilidade de utilizá-lo gratuitamente para projetos privados,
mesmo com um número limitado de builds mensais para estes - no momento em que escrevo este artigo, o limite é de 100 builds.

Uma funcionalidade muito interessante é a possibilidade de rodar testes em paralelo, para agilizar o processo de build, porém, esta
somente está disponível para contas pagas - mas você pode testar por duas semanas sem compromisso.

<img src="{{ site.baseurl }}/upload/ci/codeship/codeship-parallelci.png" class="img img-responsive" alt="Codeship - Paralell Build" title="Codeship - Parallel">

### <a name="cadastro"></a> Cadastro

O cadastro é simples, com poucos campos - bastando você informar seu nome, email, senha e pronto - ou conectar-se diretamente
com sua conta do [Bitbucket](https://www.Bitbucket.com) ou [GitHub](https://www.github.com). No caso dos dois sites, você
também pode conectá-los depois do cadastro, facilmente.

Eu preferi conectar diretamente com minha conta do **Bitbucket** e fiz a integração com o **GitHub** posteriormente, sem problema
algum.

Após efetuar o cadastro, você cai direto na DashBoard, onde ficam listados os últimos builds - claro que no caso de novos cadastros,
somente é apresentada uma tela de boas vindas e adição de projeto.

Na imagem abaixo, mostro a tela inicial, com builds com sucesso e outros com falhas para você ver:
<img src="{{ site.baseurl }}/upload/ci/codeship/shot-codeship-dashboard.png" class="img img-responsive" alt="Codeship - DashBoard" title="Codeship - DashBoard">
<small>Nenhum projeto foi sacrificado ou sofreu crueldades para produzir esta imagem.</small>

O **CodeShip** também possui a possibilidade assinar mensalmente, para obter alguns recursos a mais, como o processamento em paralelo,
um número maior de builds e etc. E você pode ir trocando o plano conforme a necessidade, além de ser relativamente mais barato que
outros serviços de <abbr title="Continous Integration">CI</abbr>.

### <a name="configurando"></a> Configurando