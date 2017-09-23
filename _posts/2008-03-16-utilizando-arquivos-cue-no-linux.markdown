---
layout: post
author: Thiago Paes
comments: true
date: 2008-03-16 03:32:00+00:00
slug: utilizando-arquivos-cue-no-linux
title: Utilizando arquivos .CUE no Linux
visible: true
---

Dica rápida que acabei de achar no Oráculo, e pra não anotar em algum canto e esquecer, melhor ficar por aqui. Baixei na última madruga, um torrent, cujo conteúdo, eram alguns arquivos .cue e .bin, certo que era uma imagem de cd, saí procurando no google uma forma de converter ou abrir os mesmos.

O método é simples, primeiro, vamos utilizar um aplicativo chamado "chunk", que é quem vai converter os arquivos para um ISO, que será possível montar como uma mídia normal.

sudo apt-get install bchunk
bchunk -v cd-rom.bin cd-rom.cue cdrom
mount -o loop,ro -t iso9660 cdrom.iso /media/cdrom
Falei que era fácil...
