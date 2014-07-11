---
layout: post
author: mrprompt
comments: true
date: 2011-01-21 12:48:00+00:00
layout: post
slug: trabalhando-com-imagens-utilizando-a-biblioteca-imagick
title: Trabalhando com imagens utilizando a biblioteca Imagick
wordpress_id: 19
categories:
- fotos
- gd
- imagem
- imagens
- imagick
- php
- thumb
---

Qual programador nunca teve sua função 'criaThumb', 'thumb' ou parecida, utilizando aqueles terríveis - e chatos - cálculos e 'ifs' com GD não é mesmo? Pessoalmente, nunca gostei, utilizada por não conhecer outra alternativa, mas agora com a biblioteca Imagick isso ficou até massa de fazer.

Com ela, você pode não apenas criar miniaturas de imagens, mas também recuperar várias informações, recortar, redimensionar, inserir uma marca d'água, mesclar imagens, enfim, o limite é a sua imaginação.

A instalação é simples, no Ubuntu, basta dar um: 'sudo apt-get install php5-imagick' e pronto, o módulo esta lá, disponível pra uso. E você pode fazer horrores com esta biblioteca, abaixo vou citar um pequeno exemplo de uso:
```
<?php
// instancio a biblioteca informando a imagem como fonte
$objImagem = new Imagick('/tmp/minhafotogigante.jpg');

// seto a compressão como jpeg
$objImagem->setImageCompression(Imagick::COMPRESSION_JPEG);

// defino o nível de qualidade de compressão
$objImagem->setCompressionQuality(100);

// faço o thumbnail normal
$objImagem->thumbnailImage(120, 80);

// ou faço um thumbnail recortando
$objImagem->cropThumbnailImage(120, 90);

// ou recorto um pedaço da imagem
$objImagem->cropImage(120, 90, 0, 0);

// salvo a imagem em disco
$objImagem->writeImage('/tmp/minhafotopequena.jpg');

// recupero o mime-type (tipo) da imagem
$strImagemFormato = $objImagem->getImageFormat();

// seto corretamente o content-type no header
header("Content-Type: image/{$strImagemFormato}");

// imprimo na tela a imagem
echo $strImagem;
```

Viu, simples não? No manual existem várias outras opções de uso, e com certeza irão atender plenamente suas necessidades.
