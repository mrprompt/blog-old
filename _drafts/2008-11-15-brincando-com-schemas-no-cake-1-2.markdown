---
layout: post
author: mrprompt
comments: true
date: 2008-11-15 04:24:00+00:00
layout: post
slug: brincando-com-schemas-no-cake-1-2
title: Brincando com schemas no Cake 1.2
wordpress_id: 23
categories:
- banco de dados
- cake
- cakephp
- db
- php
- schema
- sql
---

Introdução Eu pessoalmente, gosto de brincar em meus projetos com dois bancos, o MySQL e o SQLite, esse segundo, eu gosto muito pela leveza e praticidade, já que fica em um arquivo só, além de ser extremamente rápido.

O SQLite, admito que uso pouco, apenas para sites pequenos, mas durante o desenvolvimento, vou usando o MySQL, já que também gosto muito do PHPMyAdmin para administrar e gerar as tabelas, ainda não achei um a altura para o SQLite, mas acho que é apenas questão de tempo.

Gerando um schema Para exportar a estrutura atual do banco:

$ cake schema generate
Utilizando um Schema Para criar a nova estrutura do banco:

$ cake schema -conection default run create
Notas Ainda em tempo, se você se interessou em utilizar o SQLite em algum projeto, dois softwares legais são o phpSQLiteAdmin, bem ao estilo de adivinha quem? Outro é o SQLite Manager, uma extensão para o Firefox, quebra um galho...
