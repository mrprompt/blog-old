---
layout: post
author: Thiago Paes
comments: true
date: 2008-04-22 03:24:00+00:00
slug: backup-incremental-simples-e-indolor
title: Backup incremental simples e indolor
---
Introdução
---

Com a morte do meu hd externo, que era o meu drive de backup por acaso .. fiquei, adivinha: sem backups, claro..

Pesquisei um pouco, e achei o Rsync bem fácil de usar, então, só precisei colocar na cron, para atualizar todos os dias..

Instalando Do lado servidor, apenas instalei o pacote nfs-server, e configurei o meu /etc/exports com as opções: /home/thiago 192.168.1.17(rw,async)

{% highlight console %}
$ sudo apt-get install nfs-server
$ sudo echo "/home/thiago 192.168.1.17(rw,async)" >> /etc/exports
{% endhighlight %}

Pronto, exportei o meu home apenas para o ip do meu note... coisa simples, é uma rede local..

Agora, criei um script simples, só pra automatizar as coisas:

{% highlight console %}
#!/bin/bash
sudo mount 192.168.1.1:/home/thiago /media/bridge1 -o rw
rsync -Cravzp --delete-excluded --force /home/thiago/Photos /media/bridge1/
sudo umount -l /media/bridge1
{% endhighlight %}

E pronto.. as opções, você pode pegar digitando rsync sem parâmetros, mas aquilo tudo ali quer dizer: copia tudo recursivamente (varrendo sub-diretórios), 
me mostrando o tudo (verbose), compacta durante a transferência, mantém as permissões e apaga o que foi excluído do original.. maravilha, tudo que precisava...

Agora, vai da necessidade, tem muito a que melhorar/acrescentar.. mas, ô trocinho bom esse Rsync hein?!?
