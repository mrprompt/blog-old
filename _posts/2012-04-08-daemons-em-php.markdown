---
layout: blog
author: mrprompt
comments: true
date: 2012-04-08 08:58:00+00:00
slug: daemons-em-php
title: Daemons em PHP
---

Quem nunca precisou criar um script que tivesse que rodar de tempos em tempos
para efetuar alguma tarefa não é mesmo? Geralmente usamos a Cron para rodarmos
os scripts, mas e quando o script já não roda mais no mesmo tempo esperado,
e quando olhamos, temos várias instancias do mesmo script rodando no servidor,
bem chato isso.

Eu sei que você vai falar: 'sim, mas podemos tratar isso via não sei que',
sim eu sei., mas porque não, deixarmos um script rodando "eternamente" e
executando a tarefa exatamente no momento exato em que um upload for finalizado
por exemplo?, processando tudo em paralelo, de forma transparente ao usuário? 
Ou mesmo um script para checar a cada N segundos, se determinada aplicação ainda
está viva.

É para isso que servem os daemons, ou serviços.
Daemons são escritos geralmente em C, Python e outras linguagens, mas porque
não utilizamos nosso já conhecido PHP?
A principal vantagem disso, é que aproveitamos para criar um ambiente único
para a aplicação. Onde todas as peças, rodam sob uma mesma linguagem,
facilitando assim a manutenção e aproveitando os profissionais já existentes na
equipe, sem contar a reutilização de código ;)

Então, vamos montar um daemon exemplo, utilizando a classe System_Daemon,
existente tanto no PEAR quanto no GitHub.

Primeiro, temos que clonar o projeto [System_Daemon](https://github.com/kvz/system_daemon),
de autoria do Kevin van Zonneveld (kvz) no [GitHub](http://github.com/).

**
IMPORTANTE: em meus testes, tive que editar a classe System/Daemon.php, no método
'isInBackground()' e removi o 'self::$_processIsChild &&' do return, deixando
somente o 'self::isRunning()'.
**

Agora vamos ao exemplo de código para rodarmos o daemon. No exemplo abaixo, colo
uma estrutura básica de script, que utilizo em meus projetos com Zend, que é meu
framework padrão.

{% highlight php linenos %}
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', __DIR__  . '/../application');

defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));<

set_include_path(
    implode(
        PATH_SEPARATOR,
        array(
            realpath(APPLICATION_PATH . '/../library'),
            realpath(APPLICATION_PATH . '/modules'),
            get_include_path(),
        )
    )
);

/** Zend_Application */
require_once 'Zend/Application.php';

require_once 'system_daemon/System/Daemon.php';

// Create application, bootstrap, and run
$application = new Zend_Application(APPLICATION_ENV, APPLICATION_PATH . '/configs/application.ini');
$application->bootstrap();

// Configuro o daemon
System_Daemon::setOption('usePEAR', false);
System_Daemon::setOption("appName", "uploaddaemon");
System_Daemon::setOption("appDescription", "Trata os uploads do site.");
System_Daemon::setOption("appDir", dirname(__FILE__));
System_Daemon::setOption("appExecutable", basename(__FILE__));
#System_Daemon::setOption("appPidLocation", '/var/run/uploaddaemon.pid');
System_Daemon::setOption("logVerbosity", '7');
System_Daemon::setOption("logLocation", '/var/log/uploaddaemon.log');
System_Daemon::setOption("authorName", "Thiago Paes");
System_Daemon::setOption("authorEmail", "mrprompt@gmail.com");

/**
 * Setup the CLI Commands
 * 
 * upload.php --help
 * upload.php --start
 * upload.php --stop
 */
try {
    $opts = new \Zend_Console_Getopt(
        array(
            'help'  => 'Exibe esta ajuda.',
            'start' => 'Inicia o Daemon.',
            'stop'  => 'Encerra o Daemon',
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
    try {
        System_Daemon::start();

        while (true) {
            System_Daemon::log(System_Daemon::LOG_INFO, "rodando...");

            // aguardo um minuto antes de executar novamente a ação
            sleep(60);
        }
    } catch (System_Daemon_Exception $e) {
        System_Daemon::log(System_Daemon::LOG_ERR, $e->getMessage());
    }
}

/**
 * Action : stop
 */
if(isset($opts->stop)) {
    System_Daemon::stop();
}
{% endhighlight %}

Pronto, com isso, já temos um exemplo de daemon rodando.

E é isso, divirta-se agora criando seus daemons para melhorar ainda mais suas aplicações e o ambiente delas.
