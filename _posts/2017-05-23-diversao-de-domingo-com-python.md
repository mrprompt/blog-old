---
layout: post
author: mrprompt
comments: true
date: 2017-05-23 00:00:01+00:00
slug: diversao-de-doming-com-python
title: Diversão de Domingo com Python
---
Utilizo muito os serviços do [DeployBot](https://www.deploybot.com) para CD, junto
ao meu fluxo de CI. Mas nem como em alguns momentos deploy é apenas uma questão
de estratégia, é chato ficar ter que abrindo o navegador para acessar o painel
do DeployBot a todo momento para acionar um build.

Então, juntando a minha vontade de estudar mais Python e minha mania incansável de
ficar criando ferramentas sempre que descubro que algo que uso possui uma API,
nasceu o [deploybot-cli](https://github.com/mrprompt/deploybot-cli), uma pequena
ferramenta de linha de comando, para interagir com a API do DeployBot.

Você pode baixar o pacote - ou o fonte diretamente do [Github](https://github.com),
ou mesmo instalar via Pip:

```
pip install deploybot-cli
```

No momento que escrevo este post, a última versão estável é a 0.2.3, mas tão logo
os estudos forem avançando, vou melhorando, fique de olho.

Claro, fique a vontade para utilizar somente as classes e integrar da forma que
achar melhor com sua aplicação ou ambiente.

O projeto é pequeno e para mim, é apenas uma forma de estudar mais uma linguagem
e também de agilizar meu trabalho.

Fique a vontade para mandar um PR com melhorias (principalmente no cli.py) ou
dicas de como melhorar a ferramenta. A API é bem limitada e possui poucos
end-points, mas para mim, é extremamente útil.

Um grande abraço!
