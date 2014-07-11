---
layout: post
author: mrprompt
comments: true
date: 2013-09-04 02:49:00+00:00
layout: post
slug: resolvendo-o-problema-com-upload-de-arquivos-grandes-com-php-fpm-nginx
title: Resolvendo o problema com upload de arquivos grandes com PHP-FPM + Nginx
wordpress_id: 5
categories:
- nginx
- php
- php-fpm
---

Me deparei essa semana com um problema com um cliente que estava tentando
enviar um arquivo grande para o servidor, pelo formulário de upload da
aplicação. Nos logs, eu vi o seguinte aviso:
`[error] 25556#0: *52 client intended to send too large body`:



    Bom, achei um tanto estranho, nunca tinha visto esse erro nos logs. Editei o php.ini e aumentei as definições de post e upload, como abaixo, e mesmo assim não surtiu efeito.
upload_max_filesize = 100M post_max_size = 100M

   Fuçando um pouco, achei a diretiva :
{% highlight nginx %}
http {
    ...
    client_max_body_size 100m;
    ...
}
{% endhighlight %}

E voilá, tudo certo!!!!
