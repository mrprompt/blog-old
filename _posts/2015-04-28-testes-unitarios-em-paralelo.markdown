---
layout: post
author: Thiago Paes
comments: true
date: 2015-04-28 18:16:45+00:00
slug: rodando-testes-unitarios-em-paralelo
title: Rodando testes unitários em paralelo
visible: true
---

Comecei a utilizar o plugin *paratest* em meus testes unitários para rodar testes em paralelo utilizando vários processos.
Isso agiliza em muito o processo de testes - isso se você tiver uma máquina multi-core claro.

```
composer.phar require "brianium/paratest" "dev-master"
```

Somente isso já basta para rodar seus testes. Voce pode simplesmente rodar:
```
./vendor/bin/paratest
```

O paratest utiliza o mesmo arquivo de configuração do PHPUnit (phpunit.xml) para efetuar o bootstrap então, tecnicamente,
você não verá muitas mudanças. Mas é possível obter algumas novas opções mais úteis ao dia-a-dia, e pra mim, a mais importante:

- --processes (-p): o número de processos que vocÊ deseja rodar paralelamente, o padrão é 5.

Em resumo, o Paratest é um ótimo utilitário para agilizar seus testes, e os únicos problemas que tive alguns testes
foram com o plugin [Clever and Smart](https://github.com/lstrojny/phpunit-clever-and-smart) (esse é papo para outro post) por
conta do SQLite.