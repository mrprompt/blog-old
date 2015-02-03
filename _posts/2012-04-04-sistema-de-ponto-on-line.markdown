---
layout: blog
author: mrprompt
comments: true
date: 2012-04-04 03:00:00+00:00
layout: blog
slug: sistema-de-ponto-on-line
title: Sistema de Ponto On Line
wordpress_id: 14
categories:
- html5
- javascript
- jquery
- jquery-ui
- ponto
- software livre
- sqlite
---

A tempos venho escrevendo software pra todo mundo, vários freelas e empresas que já passei, e raramente, tenho a oportunidade/idéia de escrever um software um pouco mais robusto por necessidade própria. Geralmente, escrevo pequenos scripts em PHP-Cli ou Bash mesmo, para automatizar pequenas tarefas, como armazenamento de senhas pessoais, todo list, ponto e etc.

Mas dessa vez foi diferente, como dito a pouco, eu tinha um pequeno script em php-cli, onde registrava meus horários de entrada e saída na empresa que trabalho atualmente. Algo despretensioso, apenas registrava a entrada, saída e me dizia um total de horas, coisa bem simples e totalmente mono usuário. Sempre usei por vontade própria, e para atender somente a minha necessidade de saber se estou cumprindo corretamente meus horários e etc.

Sempre quis fazer uma versão web do script, para poder utilizar nas empresas que passei - acredite, ainda existem empresas que usam o velho cartão ponto, escrito a caneta e fazendo a pobre da secretária executar mil cálculos no final de todo mês - mas nunca me davam a oportunidade de alocar algumas horas para fazê-lo - as empresas sempre cortam nosso barato quando queremos nos divertir.

Então, em uma madrugada, trabalhando encima do projeto de um cliente, me veio um estalo: "- ei, a tempos quero fazer uma interface totalmente em Javascript, mas não posso fazer isso para um cliente, seria muito trabalhoso e não compensaria o esforço."

Dessa necessidade, nasce o [Ponto](http://mrprompt.hdfree.com.br/), um pequeno sistema de **Ponto Eletrônico**, dessa vez, multi-usuário e muito prático de se utilizar, atendendo perfeitamente a necessidade de pequenas empresas.

A idéia principal - além de atender a minha própria necessidade -, como disse, era poder brincar a vontade com Javascript, mais especificamente, a dupla [jQuery](http://jquery.com/) +[ jQuery UI](http://jqueryui.com/) e HTML 5 pra ver no que daria.

Meu foco era o seguinte:
- escrever o mínimo possível de código HTML, apenas o necessário para carregar o projeto, o resto deveria ser gerado dinamicamente pela aplicação.
- escrever o mínimo possível de CSS, deixando ao máximo a questão de interface a cargo do [jQuery UI](http://jqueryui.com/).
- utilizar alguns recursos do HTML 5, como Session Storage.
- brincar bastante com Javascript :)
- brincar bastante com [SQLite](http://sqlite.org/) \o/
- brincar com as "[Google Chart Tools](http://code.google.com/intl/pt-BR/apis/chart/)"

A aplicação é simples e contém os seguintes recursos:
- cadastro simples
- cadastro de sub-usuários
- relatório mensal
- gráficos de média de assiduidade, cumprimento de  horas diárias e mensal, cumprimento da meta de horas mensais.
- configuração dos dias da semana em que são trabalhados
- utilização da sessão do sub-usuário - acho que só quem gosta disso são os chefes.

A base de dados fica armazenada na máquina em que foi aberto o projeto (tanto faz se você jogou em um servidor web ou abriu o arquivo html), e isso quem trata é o próprio navegador. Então, se for utilizar em uma empresa, aconselho a todos os usuários baterem ponto na mesma máquina ;)
E por falar em navegador, por enquanto, é **compatível apenas com o Google Chrome**, pois foi o único que implementou até agora a base de dados interna utilizando SQLite.

Gostou? O código fonte você pode baixar direto da [minha página no GitHub](https://github.com/mrprompt/PontoEletronico) ou utilizar a [versão de demonstração direto daqui](http://mrprompt.hdfree.com.br/).

Em tempo ainda, se você quiser dar uma conferida no banco que foi criado, basta ter o executável do SQLite3, o banco está num dos caminhos abaixo, dependendo do seu SO:
**Windows Vista or 7**: \Users\_username_\AppData\Local\Google\Chrome\User Data\Default\databases
**Windows XP**: \Documents and Settings\_username_\Local Settings\Application Data\Google\Chrome\User Data\Default\databases
**Mac OS X**: ~/Library/Application Support/Google/Chrome/Default/databases
**Linux**: ~/.config/google-chrome/Default/databases






Espero que seja útil pra você, quanto é pra mim :)
