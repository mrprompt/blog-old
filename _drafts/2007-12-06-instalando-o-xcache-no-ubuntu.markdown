---
layout: post
author: mrprompt
comments: true
date: 2007-12-06 04:26:00+00:00
layout: post
slug: instalando-o-xcache-no-ubuntu
title: Instalando o XCache no Ubuntu
wordpress_id: 29
categories:
- apache
- cache
- linux
- performance
- php
- software livre
- xcache
---

Introdução Muitas vezes, precisamos gerar um cache a nível de código para nossas aplicações, pra evitar uma carga tão grande em servidores muito acessados. Opções não faltam por aí, e ao meu ver, a mais conhecida no mundo PHP é a eAccelerator, mas vasculhando na net - e nos repositórios do Ubuntu - me deparei com o XCache, que atendeu perfeitamente minhas necessidades, sem contar na simplicidade da instalação.

Instalando A instalação do XCache para o PHPv5 é simples, dando pequenas diferenças entre as versões o Ubuntu Feisty e Gutsy.

Primeiro, vamos instalar o módulo:

$ sudo apt-get install php5-xcache
Feito isso, vamos editar o arquivo /etc/php5/conf.d/xcache.ini para definirmos um usuário e senha para a página de administração, o meu eu deixei da seguinte forma, com a senha "testando" em MD5:

[xcache.admin]
...
xcache.admin.auth = On
xcache.admin.user = "thiago"
xcache.admin.pass = caa9c8f8620cbb30679026bb6427e11f
...
O passo seguinte, é criar um alias no Apache, para o admin, eis aqui a diferença que falei entre o as versões Feisty e o Gusty do Ubuntu, no primeiro, a localização para o admin é /usr/share/doc/php5-xcache/misc/admin e no segundo, em /usr/share/xcache/admin. Outra coisa que notei no Feisty, é que dois arquivos do admin, vieram compactados, então, vá na pasta do admin, e dê um "gunzip" no xcache.php.gz e xcache.tpl.php.gz.

$ sudo gunzip xcache.php.gz
$ sudo gunzip  xcache.tpl.php.gz
O último passo, é criarmos o arquivo de cache utilizado pelo módulo:

$ sudo touch /tmp/xcache
$ sudo chmod a+rwx /tmp/xcache
Pronto, restarte o Apache e tente acessar o seu /xcache-admin/ com o usuário e senha e olhar as páginas cacheadas, limpar o cache, ...
