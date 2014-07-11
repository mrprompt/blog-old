---
layout: post
author: mrprompt
comments: true
date: 2012-04-08 08:35:00+00:00
layout: post
slug: utilizando-php-na-linha-de-comando-com-zend-framework
title: Utilizando PHP na linha de comando com Zend Framework
wordpress_id: 13
---

Quem me conhece sabe que sempre gostei muito de brincar com o Terminal/Prompt, então, tenho costume de criar e utilizar vários scripts para automatizar algumas tarefas repetitivas, nos meus projetos, tenho costume de criar uma pasta 'bin', onde coloco os scripts que deverão rodar via [Cron](http://en.wikipedia.org/wiki/Crontab) ou como um [Daemon](http://mrprompt.blogspot.com/2012/04/daemons-em-php.html).

Mas assim como já utilizamos nosso framework favorito para fazermos nossos sites e/ou aplicações, porque não utilizarmos também para fazer nossos scripts?
Meu framework favorito atualmente, é o Zend, principalmente por ser modular - mas isso já é assunto para outro post ou conversa de bar -, então, vou apresentar abaixo, a estrutura básica de um script cli, utilizando o Zend.



    <?php<br></br>/**<br></br> * Script PHP-CLI exemplo<br></br> */<br></br>defined('APPLICATION_PATH')<br></br>    || define('APPLICATION_PATH', __DIR__  . '/../application');<br></br><br></br>defined('APPLICATION_ENV')<br></br>    || define(<br></br>        'APPLICATION_ENV', (<br></br>            getenv('APPLICATION_ENV') ?<br></br>            getenv('APPLICATION_ENV') :<br></br>            'production'<br></br>        )<br></br>    );<br></br><br></br>set_include_path(<br></br>    implode(<br></br>        PATH_SEPARATOR,<br></br>        array(<br></br>            realpath(APPLICATION_PATH . '/../library'),<br></br>            get_include_path(),<br></br>        )<br></br>    )<br></br>);<br></br><br></br>// Zend_Application<br></br>require_once 'Zend/Application.php';<br></br><br></br>// E vamos lá, rodando a aplicação com suas configurações<br></br>$application = new Zend_Application(<br></br>    APPLICATION_ENV,<br></br>    APPLICATION_PATH . '/configs/application.ini'<br></br>);<br></br>$application->bootstrap();<br></br><br></br>/**<br></br> * Aqui, configuro os parâmetros de entrada válidos<br></br> * <br></br> * teste.php --help<br></br> * teste.php --start<br></br> * tsete.php --stop<br></br> */<br></br>try {<br></br>    $opts = new \Zend_Console_Getopt(<br></br>        array(<br></br>            'help'  => 'Exibe esta ajuda.',<br></br>            'start' => 'Inicia.',<br></br>            'stop'  => 'Encerra.',<br></br>        )<br></br>    );<br></br><br></br>    $opts->parse();<br></br>} catch (\Zend_Console_Getopt_Exception $e) {<br></br>    exit($e->getMessage() ."\n\n". $e->getUsageMessage());<br></br>}<br></br><br></br>if(isset($opts->help)) {<br></br>    echo $opts->getUsageMessage();<br></br>    exit;<br></br>}<br></br><br></br>/**<br></br> * Action : start<br></br> */<br></br>if(isset($opts->start)) {<br></br>    // nosso código<br></br>}<br></br><br></br>/**<br></br> * Action : stop<br></br> */<br></br>if(isset($opts->stop)) {<br></br>    // nosso código<br></br>}<br></br>?>


Bom, o código está bem simples de entender e auto explicativo. Basicamente, instanciamos o Zend_Application, normalmente, como fazemos em nosso index.php, para instanciarmos a app e tudo que for necessário para rodar.
Em seguida, com o Zend_Console_Getopt, definimos os parâmetros válidos, a partir daí, é só criar as funções de chamadas para as respectivas ações.

Pronto, agora é só dar asas a imaginação e se divertir um bocado com Zend e PHP-Cli.
