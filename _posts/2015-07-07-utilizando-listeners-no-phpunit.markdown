---
layout: blog
author: mrprompt
comments: true
date: 2015-07-07 15:00:00+00:00
slug: utilizando-listeners-no-phpunit
title: Utilizando Listeners no PHPUnit
---
O PHPUnit com seu arquivo de configuração *phpunit.xml* nos permite inserir um
arquivo de bootstrap para ser incluído antes da nossa suíte de testes rodar,
porém, em algumas ocasiões, não necessitamos desse bootstrap ou mesmo queremos
executar um ação adicional apenas para determinada suíte.

Em um projeto que mantenho, eu queria rodar as fixtures apenas para uma suíte em
especial, para as outras, era pura perda de tempo ficar aguardando este processo.

Antes, eu utilizava uma tarefa no [Phing](https://www.phing.info/), que dependia
de sub tarefas e etc, mas era um processo que tomava alguns segundos preciosos, e
para fugir disso, minha alternativa era chamar outra tarefa que era praticamente
uma cópia da primeira, sem as fixtures, sujando o código com duplicidades.

O PHPUnit trabalha com o *Listeners*, com isso, fica fácil escrevermos classes
para atender cada necessidade, e mantemos o código extremamente limpo e organizado.

Então, vamos direto ao que interessa, adicionando nosso Listener no arquivo de
configuração dos testes de nosso projeto *phpunit.xml*, utilizando a tag *listener*
e informando nossa classe, nesse caso, iremos criar o listener **Bootstrap**
no namespace **Application**, que é onde rodam os testes de integração e eu
necessito das fixtures:

```
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://schema.phpunit.de/4.3/phpunit.xsd"
         colors="true"
         backupGlobals="false"
         backupStaticAttributes="false"
         verbose="true">
    <php>
        <const name="APPLICATION_ENV" value="testing"/>
    </php>

    <testsuites>
        <testsuite name="Application">
            <directory>./tests/Application</directory>
        </testsuite>

        <testsuite name="Domain">
            <directory>./tests/Domain</directory>
        </testsuite>
    </testsuites>

    <filter>
        <blacklist>
            <directory suffix=".php">./vendor</directory>
        </blacklist>
    </filter>

    <listeners>
        <listener class="Application\Tests\Bootstrap" file="tests/Application/Tests/Bootstrap.php">
        </listener>
    </listeners>
</phpunit>

```

Depois de informarmos o PHPUnit que temos um novo listener para as suítes, basta escrevermos
o mesmo, informando, a que passo vamos chamar, no meu caso, preferi rodar as fixtures, ao
início da suíte da teste, nesse caso, sobrescrevo o método *startTestSuite*:

Você pode rodar seu listener no momento em que quiser, alguns exemplos de métodos a sobrescrever:

* Antes de cada teste: *startTest*
* Depois de cada teste: *endTest*
* Antes da suíte de testes: *startTestSuite*
* Depois da suíte de testes: *endTestSuite*

```
<?php
namespace Application\Tests;

use PHPUnit_Framework_BaseTestListener;
use PHPUnit_Framework_TestSuite;

class Bootstrap extends PHPUnit_Framework_BaseTestListener
{
    /**
     * @param PHPUnit_Framework_TestSuite $suite
     */
    public function startTestSuite(PHPUnit_Framework_TestSuite $suite)
    {
        if (strpos($suite->getName(), "Application") !== false ) {
            require_once 'phpunit-bootstrap.php';
        }
    }
}
```

É importante utilizarmos o *require_once*, para que nosso bootstrap rode apenas
uma única vez.

Então, o meu script para popular minha base rodando sempre minhas fixtures

```
<?php
use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\DataFixtures\Loader;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Doctrine\ORM\Tools\SchemaTool;

$app        = require __DIR__ . DIRECTORY_SEPARATOR . 'bootstrap.php';

$metadata   = $app['orm.em']->getMetadataFactory()->getAllMetadata();

$tool       = new SchemaTool($app['orm.em']);

fputs(STDOUT, 'Dropping schema....');

$tool->dropSchema($metadata);

fputs(STDOUT, 'OK!' . PHP_EOL);
fputs(STDOUT, 'Creating schema....');

$tool->createSchema($metadata);

fputs(STDOUT, 'OK!' . PHP_EOL);
fputs(STDOUT, 'Loading fixtures...');

$loader   = new Loader();
$loader->loadFromDirectory('tests/Application/Fixtures');

$executor = new ORMExecutor($app['orm.em'], new ORMPurger());
$executor->execute($loader->getFixtures());

fputs(STDOUT, 'OK!' . PHP_EOL);

return $app;

```

Mais informações:

* [Extending PHPUnit](https://phpunit.de/manual/current/en/extending-phpunit.html#extending-phpunit.examples.SimpleTestListener.php)
* [PHPUnit Plugins](https://phpunit.de/plugins.html)
* [Priorizando testes com PHPUnit](http://www.mrprompt.com.br/2015/04/29/priorizando-testes-com-phpunit/)
* [Rodando testes unitários em paralelo](http://www.mrprompt.com.br/2015/04/28/testes-unitarios-em-paralelo/)