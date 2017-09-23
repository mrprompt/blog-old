---
layout: post
author: Thiago Paes
comments: true
date: 2009-06-13 03:32:00+00:00
slug: streaming-e-conversao-de-videos-com-software-livre
title: Streaming e conversão de vídeos com Software Livre
visible: true
---

Iniciando Para instalar o ffmpeg no Ubuntu, temos duas maneiras, a primeira, é compilando o mesmo, assim você dar uma refinada nos formatos que deseja dar suporte e ganha um software mais personalizado, ganhando assim em desempenho.

A segunda forma, é baixar do repositório Medibuntu, uma versão pré-compilada, com suporte a mp3 (iremos precisar para converter para FLV), já que na versão padrão do repositório do Ubuntu, não tem esse suporte, e é esta opção que vamos seguir abaixo, por ser a mais simples e fácil.

Instalando via Repositório

$ sudo -s
# wget http://www.medibuntu.org/sources.list.d/jaunty.list -O /etc/apt/sources.list.d/medibuntu.list
# wget -q http://packages.medibuntu.org/medibuntu-key.gpg -O- | apt-key add - && apt-get update
# apt-get install ffmpeg lame mencoder libavcodec-unstripped-52
Testando a conversão

$ ffmpeg -i teste_in.wmv -b 1200 -deinterlace -ar 22050 -ab 64 -f flv -s 480x360 -aspect 4:3 -y -acodec libmp3lame -ac 1 teste_out.flv
Pronto, temos o ffmpeg pronto para uso.
