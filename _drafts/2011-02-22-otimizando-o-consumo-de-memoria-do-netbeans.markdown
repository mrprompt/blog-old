---
layout: post
author: mrprompt
comments: true
date: 2011-02-22 22:59:00+00:00
layout: post
slug: otimizando-o-consumo-de-memoria-do-netbeans
title: Otimizando o consumo de memória do NetBeans
wordpress_id: 16
categories:
- memória
- NetBeans
- performance
---

Outro dia, aborrecido com o alto consumo de memória do NetBeans no meu Netbook, resolvi procurar informações a respeito de otimizações (sim, eu sou um baita fominha quando se trata de espaço em disco e memória, acho que culpa de sempre ter usado máquinas podreiras).
De tanto fuçar, acabei chegando na seguinte configuração para o meu netbeans.conf - no Ubuntu, ele fica em `/usr/local/netbeans-*/etc/`:
```
netbeans_default_options="-J-client -J-Xss2m -J-Xms128m -J-Xmx256m -J-XX:PermSize=128m -J-XX:MaxPermSize=1000m -J-XX:+UseConcMarkSweepGC -J-XX:+CMSClassUnloadingEnabled -J-XX:+CMSPermGenSweepingEnabled -J-Dnetbeans.logger.console=true -J-ea -J-Dapple.laf.useScreenMenuBar=true -J-Dapple.awt.graphics.UseQuartz=true -J-Dsun.java2d.noddraw=true -J-da -J-Djava.net.preferIPv4Stack=true -Dsun.java2d.d3d=false -Dawt.nativeDoubleBuffering=true"
```
Os parâmetros acima são meio que auto-explicativos, mas em resumo, estou dizendo para o NetBeans:
- usar por padrão o IPv4 (caso tenha problemas em fazer atualizações dos plugins, eu tive algumas vezes)
- Esconder a janela irritante de Exceções do Java (comigo aconteceu muito na versão beta 2 do 7)
- Usar o buffer dpulo nativo
- Iniciar com 128Mb de reserva pra cache e etc e no máximo 1Gb para uso.

Bom, o resto você procurar né?

ps: Você também pode acrescentar: "--laf javax.swing.plaf.metal.MetalLookAndFeel" caso não queria usar o padrão GTK que ele põe, existem outros, basta procurar, pq no momento em que escrevo isso não me lembro dos outros :P
