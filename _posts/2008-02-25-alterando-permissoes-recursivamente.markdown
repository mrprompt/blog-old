---
layout: blog
author: mrprompt
comments: true
date: 2008-02-25 04:23:00+00:00
layout: blog
slug: alterando-permissoes-recursivamente
title: Alterando permissões recursivamente
wordpress_id: 28
categories:
- chmod
- find
- linux
- permissões
- recursividade
---

Dia de folga é sempre muito legal, e nerd que é nerd, pega o dia de folga: PARA ORGANIZAR O HD!!! hahahahah

Tá, teve roda de capoeira e um puta cochilo durante a tarde, mas tá valendo, deu pra descansar a cabeça um pouco.

Então, como tava dizendo, organizando o hd, resolvi setar as permissões de arquivos direitinho aqui, então, não satisfeito com os resultados do "chmod -R", saí procurando no Oráculo e me deparei com o seguinte:

`[thiago@selassie:~]$ find . -type d -exec chmod 775 {} \;`

Isso daí, vai setar os com permissão de escrita, leitura e execução para o dono e grupo de todos os diretórios abaixo do diretório atual, se você quiser setar permissões somente dos arquivos, troca o "d" do "-type" por "f", de file - ooooooooh!!

Dica supimpa!
