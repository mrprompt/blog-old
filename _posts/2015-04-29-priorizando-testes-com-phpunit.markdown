---
layout: blog
author: mrprompt
comments: true
date: 2015-04-29 12:52:45+00:00
slug: priorizando-testes-com-phpunit
title: Priorizando testes com PHPUnit
---

Conforme nossa suíte de testes vai crescendo, obviamente, nossos testes vão
demorando cada vez mais a finalizar e gerar nossas métricas. E o maior problema
para muitos, é quando os testes que falham, estão "no final" da suíte.

Mas, seguindo a risca o TDD, não podemos definir a ordem dos testes, correto? Mas
e se pudéssemos fazer os testes que falharam, rodassem primeiro? E é isso que o
plugin [Clever and Smart](https://github.com/lstrojny/phpunit-clever-and-smart)
faz para nós.

A instação, vamos utilizar o *Composer*, nosso velho conhecido:

```
composer require "lstrojny/phpunit-clever-and-smart" "0.*"
```

A configuração é simples, ele depende basicamente da extensão SQLite3 instalada
e habilitada - não, eu não vou te ensinar a fazer isso aqui nesse texto.
Bastando apenas adicionar o nó abaixo em seu *phpunit.xml*:

```
<listeners>
        <listener class="PHPUnit\Runner\CleverAndSmart\TestListener">
            <arguments>
                <object class="PHPUnit\Runner\CleverAndSmart\Storage\Sqlite3Storage">
                    <arguments>
                        <string>./data/phpunit-cas.db</string>
                    </arguments>
                </object>
            </arguments>
        </listener>
    </listeners>
</listener>
```

Você só precisa alterar o caminho do banco SQlite que será criado para registrar
os testes. Experimente fazer um teste falhar ao rodar a suíte e depois tente rodar
novamente, você verá que os testes que falharam, rodarão primeiro ;)

Para mim, esse plugin agilizou e muito o processo de teste das aplicações que
mantenho, espero que seja útil pra você também.
