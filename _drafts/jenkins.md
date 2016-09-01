---
layout: post
author: mrprompt
comments: true
date: 2016-07-21 00:0:00+00:00
slug: integracao-continua-jenkins
title: Integração Contínua com Jenkins
---
Voltando a nossa série sobre série sobre [Integração Contínua]({% post_url 2016-03-25-falando-sobre-integracao-continua-e-qualidade-de-desenvolvimento %}), 
vou apresentar agora a você o Jenkins. 

Acho que simplesmente, o mais famoso e utilizado de todos - e também, o mais complicado de se manter.

<img src="{{ site.baseurl }}/upload/ci/jenkins/logo.png" 
    class="img img-responsive pull-right" 
    alt="Jenkins Logo" title="Jenkins" width="185" height="256">

Pra não quebrar o padrão<sup>vulgo TOC</sup>, vou dividir o post em algumas partes:

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

Eu sempre digo que o Jenkins é o xodó da comunidade, porque 9 entre cada 10 projetos que eu tenho contato, que utilizam - ou tentam - 
utilizar Integração Contínua, utilizam ele em sua stack.  

### <a name="instalacao"></a> Instalação

O Jenkins pode ser instalado de várias formas, o jeito mais simples, é utilizando o nosso tão conhecido apt-get ou yum, mas também 
pode ser instalado via homebrew para os usuários de Mac, ou simplesmente rodando o jar baixado no site. Eu prefiro sempre a 
primeira opção, buscando um repositório constantemente atualizado e etc. 

Para este artigo, preferi utilizar a versão da [Openshift](https://openshift.com), pela simplicidade de instalação e um pouco de 
preguiça, admito.

<img src="{{ site.baseurl }}/upload/ci/jenkins/login.png" 
    class="img img-responsive pull-left" 
    alt="Login" title="Jenkins Login">

<img src="{{ site.baseurl }}/upload/ci/jenkins/dashboard-vazia.png" 
    class="img img-responsive pull-right" 
    alt="Dashboard" title="Jenkins Dashboard">

### <a name="configurando"></a> Configurando


#### Bônus Track - Exemplos de Configuração

#### <a name="configurando-php"></a> PHP

#### <a name="configurando-nodejs"></a> Nodejs

#### <a name="configurando-angularjs"></a> Angularjs

#### <a name="configurando-ruby"></a> Ruby

#### <a name="configurando-java"></a> Java

### <a name="pros-e-contras"></a> Prós & Contras

### <a name="conclusao"></a> Conclusão

### <a name="mais-informacoes"></a> Mais Informações