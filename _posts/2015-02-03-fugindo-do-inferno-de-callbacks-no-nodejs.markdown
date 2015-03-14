---
layout: blog
author: mrprompt
comments: true
date: 2015-02-02 00:00:00+00:00
slug: fugindo-do-inferno-de-callbacks-no-nodejs
title: Fugindo do inferno de callbacks no Nodejs
---
A pouco tempo atrás, apesar da minha experiência com front (HTML, CSS, Javascript), 
achei interessante dar uma atualizada e resolvi ler sobre MEAN. Admito que fiquei
fascinado com a produtividade que obtive, mas também tive - e ainda tenho - muita 
dificuldade com alguns pontos.

Como não sou expert em Nodejs, tão pouco em javascript, precisei efetuar diversas 
requisições à API que estava escrevendo.
Ainda alheio ao pensamento de "Programação Orientada a Eventos", precisei ir contra as
regras do Nodejs e efetuar requisições síncronas. Eu precisava que a ordem das requisições
fosse respeitada, mas sem cair no inferno de callbacks.

Foi então que em uma - rápida admito - busca no Santo Google, achei a lib *async*.

A lib, te permite diferças maneiras de efetuar suas requisições e também agrupar o resultado
de todas elas.

Um exemplo de código utilizando a biblioteca:

```
'use strict';

var async = require('async');
var conteudo = {};
...

exports.index = function (req, res) {
    async.parallel([
        function (callback) {
            uniforme.find(
                {
                    escola: req.escola._id
                },
                {},
                {
                    limit: 5
                },
                function (err, uniformes) {
                    if (err) {
                        console.log(err);
                    } else {
                        conteudo.uniformes = uniformes;

                        callback(null, uniformes);
                    }
                }
            );
        },
        ...
    ], function (err, results) {
        if (err) {
            console.log(err);

            return res.send(500);
        }

        return res.render('index', conteudo);
    });
};

```

Basicamente, você informa suas funções, uma abaixo da outra, 

Mais informações: (async)[https://www.npmjs.com/package/async]