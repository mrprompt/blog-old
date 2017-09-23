---
layout: post
author: Thiago Paes
comments: true
date: 2007-10-05 03:27:00+00:00
slug: internacionalizando-aplicacoes-baseadas-no-cakephp-1-2
title: Internacionalizando Aplicações baseadas no CakePHP 1.2
---

Em primeiro lugar, este manual é inteiramente baseado "p28n, the top to bottom persistent internationalization tutorial. de Jason Chow, 
então, o que vou citar aqui, são os passos que utilizei para "internacionalizar" uma pequena aplicação que escrevi para um cliente.

Primeiramente, adicionamos a seguinte linha em nosso config/bootstrap.php:

{% highlight php5 linenos %}
define('DEFAULT_LANGUAGE', 'pt-br');
{% endhighlight %}

Com isso, definimos a linguagem padrão, para o português.

Agora, ao contrário do que o artigo indica, eu adicionei somente a linha abaixo no config/routes.php:

{% highlight php5 linenos %}
// rota para troca de idioma
$Route->connect('/lang/*', array('controller' -> 'p28n', 'action' -> 'change'));
{% endhighlight %}

Agora, para podermos trocar de idioma, é criamos um link ou redirecionamento para "/lang/idiomaDesejado", que o controlador p28n irá tratar, mas anes disso, 
vamos criar o componente P28n, e salve no diretório controllers/components da sua aplicação, copie o código abaixo:

{% highlight php5 linenos %}
Session->check('Config.language') ) {
    $this->change(($this->Cookie->ad('lang') ? $this->Cookie->read('lang') : DEFAULT_LANGUAGE));
}

function change($lang = null) {
    if ( !empty($lang) ) {
        $this->Session->write('Config.language', $lang);
        $this->Cookie->write('lang', $lang);
    }
}
{% endhighlight %}

Reparou que eu não botei a tag de fechamento do PHP? Posé, deixa assim mesmo, fechando, o script acusa um erro no envio dos headers e a bagaça não anda mesmo, 
então, pode deixar... Seguindo o mesmo estilo - não fechando a tag do PHP, criamos o controlador que comentamos agora pouco, copie o código abaixo, e salve com 
o nome de p28n_controller.php, no diretório controllers da aplicação.

{% highlight php5 linenos %}
function setLang ($lang)
{
    P28n->change($lang);

    $this->redirect($this->referer(null, true));
}

function shuntRequest()
{
    $this->P28n->change($this->params['lang']);

    $args = func_get_args();
    
    $this->redirect("/" . implode("/", $args));
}
{% endhighlight %}

Agora vamos adicionar a seguinte linha no arquivo "app_controller.php"

{% highlight php5 linenos %}
var $components = array ('P28n');
{% endhighlight %}

Isso fará com que o componente P28n, que você criou anteriormente, seja utilizado por toda a aplicação.

Agora, com tudo instalado e funcionando, vamos testar, pegue algum arquivo da sua aplicação (em views ou mesmo em controllers), qualquer lugar que gere uma 
mensagem de retorno para o usuário, vamos usar como exemplo a linha abaixo:
{% highlight php5 linenos %}
echo  "Bem vindo";
{% endhighlight %}

E trocamos para:
{% highlight php5 linenos %}
echo __("Bem vindo");
{% endhighlight %}

Entendeu? Todas as mensagens você põe agora entre \__(), se você for utilizar a mensagem como retorno (e não diretamente como echo), coloque o parametro "true", ficando assim:

{% highlight php5 linenos %}
$msg = __("Bem vindo", true);
{% endhighlight %}

Feito isso para todas as mensagens da aplicação, vamos gerar o arquivo de tradução, na shell, crie os diretórios das linguagens:

{% highlight console %}
$ cd aplicacao
$ mkdir -p locale/pt_br/LC_MESSAGES
$ mkdir -p locale/eng/LC_MESSAGES
{% endhighlight %}

Diretórios criados, vamos gerar o arquivo com as strings a serem traduzidas:

{% highlight console %}
$ cd aplicacao
$ ../cake/console/cake extract -project aplicacao
{% endhighlight %}

Então, ele irá fazer algumas perguntas, na sequência:
{% highlight console %}
Hello thiago,

Welcome to CakePHP v1.2.0.5427 alpha Console
---------------------------------------------------------------
App : aplicacao
Path: /var/www/apliacao
---------------------------------------------------------------

Extracting...
---------------------------------------------------------------
Path: /var/www/aplicacao
Output Directory: /var/www/aplicacao/locale/
---------------------------------------------------------------
Would you like to merge all translations into one file? (y/n) [y] > y
What should we name this file?  [default] >
Processing /var/www/aplicacao/app_controller.php......
{% endhighlight %}

Pronto, foi criado um arquivo chamado "default.pot", no diretório locale que criamos, copie-o, para os diretório LC_MESSAGES do idioma, trocando a extensão de ".pot" para ".po"
{% highlight console %}
$ cd aplicacao/locale
$ cp default.pot pt_br/LC_MESSAGES/default.po
$ cp default.pot eng/LC_MESSAGES/default.po
{% endhighlight %}

A estrutura do arquivo é bem simples, algo como:

{% highlight console %}
#: /controllers/contato_controller.php:16;55
msgid "Bem vindo"
msgstr ""
{% endhighlight %}

O processo de tradução, é simples, bastando inserir a tradução da mensagem em "msgid" em "msgstr",
{% highlight console %}
#: /controllers/teste_controller.php:16;55 
msgid "Bem vindo" 
msgstr "Welcome"
{% endhighlight %}

Viu? Fácil não? Traduza suas strings, e acesse alterne entre os links "/lang/pt_br" e "/lang/eng" da sua aplicação.

;)
