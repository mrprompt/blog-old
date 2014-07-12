---
layout: blog
author: mrprompt
comments: true
date: 2012-04-08 08:35:00+00:00
slug: utilizando-php-na-linha-de-comando-com-zend-framework
title: Utilizando PHP na linha de comando com Zend Framework
---

Quem me conhece sabe que sempre gostei muito de brincar com o Terminal/Prompt, então, tenho costume de criar e utilizar vários 
scripts para automatizar algumas tarefas repetitivas, nos meus projetos, tenho costume de criar uma pasta 'bin', onde coloco os 
scripts que deverão rodar via [Cron](http://en.wikipedia.org/wiki/Crontab) ou como um [Daemon](/2012/04/08/daemons-em-php/).

Mas assim como já utilizamos nosso framework favorito para fazermos nossos sites e/ou aplicações, porque não utilizarmos também 
para fazer nossos scripts?

Meu framework favorito atualmente, é o Zend, principalmente por ser modular - mas isso já é assunto para outro post ou conversa de bar -, 
então, vou apresentar abaixo, a estrutura básica de um script cli, utilizando o Zend.

{% highlight php5 linenos %}
    <?php
/**
 * Script PHP-CLI exemplo
 */
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', __DIR__  . '/../application');

defined('APPLICATION_ENV')
    || define(
        'APPLICATION_ENV', (
            getenv('APPLICATION_ENV') ?
            getenv('APPLICATION_ENV') :
            'production'
        )
    );

set_include_path(
    implode(
        PATH_SEPARATOR,
        array(
            realpath(APPLICATION_PATH . '/../library'),
            get_include_path(),
        )
    )
);

// Zend_Application
require_once 'Zend/Application.php';

// E vamos lá, rodando a aplicação com suas configurações
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);
$application->bootstrap();

/**
 * Aqui, configuro os parâmetros de entrada válidos
 * 
 * teste.php --help
 * teste.php --start
 * tsete.php --stop
 */
try {
    $opts = new \Zend_Console_Getopt(
        array(
            'help'  => 'Exibe esta ajuda.',
            'start' => 'Inicia.',
            'stop'  => 'Encerra.',
        )
    );

    $opts->parse();
} catch (\Zend_Console_Getopt_Exception $e) {
    exit($e->getMessage() ."\n\n". $e->getUsageMessage());
}

if(isset($opts->help)) {
    echo $opts->getUsageMessage();
    exit;
}

/**
 * Action : start
 */
if(isset($opts->start)) {
    // nosso código
}

/**
 * Action : stop
 */
if(isset($opts->stop)) {
    // nosso código
}
{% endhighlight %}

Bom, o código está bem simples de entender e auto explicativo. Basicamente, instanciamos o Zend_Application, normalmente, como fazemos 
em nosso index.php, para instanciarmos a app e tudo que for necessário para rodar.
Em seguida, com o Zend_Console_Getopt, definimos os parâmetros válidos, a partir daí, é só criar as funções de chamadas para as respectivas 
ações.

Pronto, agora é só dar asas a imaginação e se divertir um bocado com Zend e PHP-CLI.
