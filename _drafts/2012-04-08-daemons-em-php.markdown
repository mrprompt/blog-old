---
layout: post
author: mrprompt
comments: true
date: 2012-04-08 08:58:00+00:00
layout: post
slug: daemons-em-php
title: Daemons em PHP
wordpress_id: 12
categories:
- cli
- daemon
- php
- php-cli
- script
- zend
- zf
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

IMPORTANTE: em meus testes, tive que editar a classe System/Daemon.php, no método
'isInBackground()' e removi o 'self::$_processIsChild &&' do return, deixando
somente o 'self::isRunning()', ficando assim o método:

{% highlight php %}
static public function isInBackground()
{
    // self::$_processIsChild &&
    return self::isRunning();
}...
?>
{% endhighlight %}

Agora vamos ao exemplo de código para rodarmos o daemon. No exemplo abaixo, colo
uma estrutura básica de script, que utilizo em meus projetos com Zend, que é meu
framework padrão.

{% highlight php %}
    defined('APPLICATION_PATH')
        || define('APPLICATION_PATH', __DIR__  . '/../application');

    defined('APPLICATION_ENV')
        || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));<

        set_include_path(<br></br>    implode(<br></br>        PATH_SEPARATOR,<br></br>        array(<br></br>            realpath(APPLICATION_PATH . '/../library'),<br></br>            realpath(APPLICATION_PATH . '/modules'),<br></br>            get_include_path(),<br></br>        )<br></br>    )<br></br>);<br></br><br></br>/** Zend_Application */<br></br>require_once 'Zend/Application.php';<br></br>require_once 'system_daemon/System/Daemon.php';<br></br><br></br>// Create application, bootstrap, and run<br></br>$application = new Zend_Application(<br></br>    APPLICATION_ENV,<br></br>    APPLICATION_PATH . '/configs/application.ini'<br></br>);<br></br>$application->bootstrap();<br></br><br></br>// Configuro o daemon<br></br>System_Daemon::setOption('usePEAR', false);<br></br>System_Daemon::setOption("appName", "uploaddaemon");<br></br>System_Daemon::setOption("appDescription", "Trata os uploads do site.");<br></br>System_Daemon::setOption("appDir", dirname(__FILE__));<br></br>System_Daemon::setOption("appExecutable", basename(__FILE__));<br></br>#System_Daemon::setOption("appPidLocation", '/var/run/uploaddaemon.pid');<br></br>System_Daemon::setOption("logVerbosity", '7');<br></br>System_Daemon::setOption("logLocation", '/var/log/uploaddaemon.log');<br></br>System_Daemon::setOption("authorName", "Thiago Paes");<br></br>System_Daemon::setOption("authorEmail", "mrprompt@gmail.com");<br></br><br></br>/**<br></br> * Setup the CLI Commands<br></br> * <br></br> * upload.php --help<br></br> * upload.php --start<br></br> * upload.php --stop<br></br> */<br></br>try {<br></br>    $opts = new \Zend_Console_Getopt(<br></br>        array(<br></br>            'help'  => 'Exibe esta ajuda.',<br></br>            'start' => 'Inicia o Daemon.',<br></br>            'stop'  => 'Encerra o Daemon',<br></br>        )<br></br>    );<br></br><br></br>    $opts->parse();<br></br>} catch (\Zend_Console_Getopt_Exception $e) {<br></br>    exit($e->getMessage() ."\n\n". $e->getUsageMessage());<br></br>}<br></br><br></br>if(isset($opts->help)) {<br></br>    echo $opts->getUsageMessage();<br></br>    exit;<br></br>}<br></br><br></br>/**<br></br> * Action : start<br></br> */<br></br>if(isset($opts->start)) {<br></br>    try {<br></br>        System_Daemon::start();<br></br><br></br>        while (true) {<br></br>            System_Daemon::log(System_Daemon::LOG_INFO, "rodando...");<br></br><br></br>            // aguardo um minuto antes de executar novamente a ação<br></br>            sleep(60);<br></br>        }<br></br>    } catch (System_Daemon_Exception $e) {<br></br>        System_Daemon::log(System_Daemon::LOG_ERR, $e->getMessage());<br></br>    }<br></br>}<br></br><br></br>/**<br></br> * Action : stop<br></br> */<br></br>if(isset($opts->stop)) {<br></br>    System_Daemon::stop();<br></br>}<br></br>?><br></br>
{% endhighlight %}


Pronto, com isso, já temos um exemplo de daemon rodando. Se você viu o post falando sobre
[PHP na linha de comando com Zend Framework](http://mrprompt.blogspot.com.br/2012/04/utilizando-php-na-linha-de-comando-com.html)  vai entender facilmente o código ;)

E é isso, divirta-se agora criando seus daemons para melhorar ainda mais suas aplicações e o ambiente delas.
