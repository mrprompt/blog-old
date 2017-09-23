---
layout: post
author: Thiago Paes
comments: true
date: 2013-08-16 05:39:00+00:00
slug: melhorando-a-completacao-de-codigo-auto-complete-do-netbeans
title: Melhorando a completação de código (auto-complete) do NetBeans
visible: true
---

O NetBeans para PHP, nem sempre consegue completar o código, quando uma variável é uma instância de um objeto, que está em outro lugar e etc.
Uma dica bacana, que vai ajudar nisso e ainda vai melhorar muito a legibilidade do seu código é colocar um comentário sobre a variável (ou em algum lugar no mesmo arquivo ou bloco de código), como abaixo:

{% highlight php5 linenos %}
<?php
/* var $teste \ArrayObject */
$teste = new \ArrayObject(array());
{% endhighlight %}

Com isso, ao utilizar a variável, o NetBeans irá conseguir completar seu código.
