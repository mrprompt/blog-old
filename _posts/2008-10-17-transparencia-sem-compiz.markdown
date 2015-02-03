---
layout: blog
author: mrprompt
comments: true
date: 2008-10-17 03:31:00+00:00
layout: blog
slug: transparencia-sem-compiz
title: Transparência sem Compiz
wordpress_id: 24
categories:
- compiz
- linux
- ubuntu
- X
---

Tava procurando na net alguma forma de resolver o problema da falta de bordas, quando acionava o Compiz aqui no Debian Lenny, quando me deparei com a seguinte dica no blog do Lorenzo para obter o único efeito que eu uso no Compiz: a transparência real no terminal.

$  gconftool-2 --type bool --set "/apps/metacity/general/compositing_manager" "true"
Facinho, facinho.. e cá estou eu, com o terminal transparente - vai por mim, se tu usa um o dia inteiro, como eu, vai te economizar alguns tantos "ctrl+tab".

Essa foi du carai!
