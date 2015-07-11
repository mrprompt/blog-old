---
layout: blog
author: mrprompt
comments: true
date: 2011-02-27 20:52:00+00:00
slug: php-5-trabalhando-com-arquivos-e-diretorios-com-classe
title: PHP 5: Trabalhando com Arquivos e Diretórios com classe
---

Uma das features mais legais do PHP 5 são os chamados Iterators, tem pra tudo, array, diretórios, XM ... dando uma olhada na página do manual, você pode ter uma listagem completa, inclusive com exemplos de uso. Futuramente, pretendo falar sobre todos, mas a bola da vez é o [DirectoryInterator](http://docs.php.net/directoryiterator).

O [DirectoryIterator](http://docs.php.net/directoryiterator), é obviamente, para trabalhar com diretórios e arquivos. Com ele, você pode facilmente - e obviamente, orientado a objetos - trabalhar com o conteúdo de um diretório.

Um exemplo de uso:
<?php
// diretório atual do script
$strDiretorio = __DIR__;

// instancio a classe informando o diretório
$objDiretorio = new DirectoryIterator($strDiretorio);

// percorro o conteúdo do diretório
foreach($objDiretorio as $objDiretorioConteudo) {
    echo $objDiretorioConteudo->getPathname() . PHP_EOL;
}
?>

Abaixo, listo alguns métodos que você pode usar no $objDiretorioConteudo do exemplo acima:

Pegar a data de modificação: [getMTime()](http://docs.php.net/manual/en/directoryiterator.getmtime.php)
Pegar a data de criação: [getCTime()](http://docs.php.net/manual/en/directoryiterator.getctime.php)
Verficiar se é um diretório: [isDir()](http://docs.php.net/manual/en/directoryiterator.isdir.php)
Verificar se é um arquivo: [isFile()](http://docs.php.net/manual/en/directoryiterator.isfile.php)
Verificar se é um arquivo oculto (começa com ponto, no Linux): [isDot()](http://docs.php.net/manual/en/directoryiterator.isdot.php)
Verificar se é um link: [isLink()](http://docs.php.net/manual/en/directoryiterator.islink.php)
Verificar as permissões: [getPerms()](http://docs.php.net/manual/en/directoryiterator.getperms.php)
Recuperar o tamanho do arquivo: [getSize()](http://docs.php.net/manual/en/directoryiterator.getsize.php)
Verificar se é um executável: [isExecutable()](http://docs.php.net/manual/en/directoryiterator.isexecutable.php)
Verificar se existe a permissão de leitura: [isReadable()](http://docs.php.net/manual/en/directoryiterator.isreadable.php)
Verificar se existe a permissão de gravação: [isWritable()](http://docs.php.net/manual/en/directoryiterator.iswritable.php)

Na página do manual, você pode obter uma listagem completa dos métodos, dá uma passada lá.
