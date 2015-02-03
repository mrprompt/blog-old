---
layout: blog
author: mrprompt
comments: true
date: 2009-09-26 03:30:00+00:00
slug: requisicoes-sincronas-no-nodejs
title: Requisições Síncronas no NodeJS
---

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