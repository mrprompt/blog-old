---
layout: blog
author: mrprompt
comments: true
date: 2013-04-18 19:33:00+00:00
slug: alterando-a-pasta-padrao-de-projetos-do-netbeans
title: Alterando a pasta padrão de projetos do NetBeans
---

Eu pessoalmente, não gosto do padrão NetBeansProjects, gosto de deixar meus projetos organizados de outra forma, só que o que me irrita, 
é toda hora o NetBeans criar esta pasta no meu diretório home, então, se você também se irrita, fica a dica para evitar isso:

Adicione a variável _projectsFolder_ ao arquivo _projectui.properties_ informando o diretorio que você deseja ser padrão dos seus projetos, ficando assim:
projectsFolder=/Users/mrprompt/Sites

A localização do arquivo pode variar para cada SO:
**Mac**: \_~/Library/Application\ Support/NetBeans/7.3/config/Preferences/org/netbeans/modules/_
**Windows**: \_c:\Users\user\AppData\Roaming\NetBeans\7.3\config\Preferences\org\netbeans\modules\_
**Linux**: \_$HOME/.netbeans/$VERSION/config/Preferences/org/netbeans/modules_
_
_Dica rápida, só pq achei sem querer na net ;)
