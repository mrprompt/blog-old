---
layout: blog
author: mrprompt
comments: true
date: 2015-09-03 13:00:00+00:00
slug: formulario-de-contato-com-simpeform
title: Formulário de Contato com SimpleForm
---
Com a onda de sites estáticos, uma das coisas mais chatas, é ver aquele famoso "formmail.php" no meio do projeto, ou mesmo, aqueles devs 
que gostam de fazer um código macarrônico, apenas para usar a função *mail* do PHP ou algo similar.

Também não sou o maior fã do mundo, de usar um (micro) framework apenas porque o site precisará ter um formulário de contato. Ajax? .. bom, 
vamos deixar pra lá e ir direto ao assunto...

Gosto de integrar serviços, e isso nós temos muitos na internet, inclusive, para tratar nosso famoso formulário de e-mail, a bola da vez é o 
[SimpleForm](https://getsimpleform.com/). Que nos permite apenas criar nosso formulário, e apenas apontar o *action* para o a url com o token
fornecido pelo site.

O conteúdo do e-mail pode ser totalmente personalizado no site, com um editor bem simples. 

O bacana do serviço, é que é facilmente integrado ao [Akismet](http://www.akismet.com) para prevenir que seus e-mails sejam tratados como SPAM.

Agora ficou fácil criar o formulário de e-mail do seu site não é mesmo? Pode apagar o formmail.??? que você tem aí ;)