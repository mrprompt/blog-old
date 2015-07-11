---
layout: post
author: Thiago Paes
comments: true
date: 2012-04-08 09:43:00+00:00
slug: brincando-com-yql-yahoo-query-language
title: Brincando com YQL - Yahoo Query Language
---

A tempos ouvi falar da [YQL](http://developer.yahoo.com/yql/) - ou Yahoo Query Language -, uma linguagem [SQL](http://pt.wikipedia.org/wiki/SQL) criada pelo 
Yahoo, que nos permite consultar, filtrar e juntar dados através de [web services](http://pt.wikipedia.org/wiki/Web_service).

Você pode por exemplo, filtrar dados de uma página html ou de um xml conforme sua necessidade, usando a já conhecida por nós, [SQL](http://pt.wikipedia.org/wiki/SQL), 
e outros recursos, como [XPath](http://en.wikipedia.org/wiki/XPath).

A YQL nos permite também consultar bases de dados públicas, de serviços já conhecidos por todos nós, como o próprio [Yahoo](http://www.yahoo.com.br/), 
[Twitter](http://www.twitter.com/), [Flickr](http://www.flickr.com/), [YouTube](http://www.youtube.com.br/) entre 
[outros](http://developer.yahoo.com/yql/console/?q=show%20tables&env=store://datatables.org/alltableswithkeys).  

Assim, você pode reunir todos os serviços que sua aplicação irá consumir, em um único local, utilizando uma única API.

Eu procurei por aí, e não achei muita coisa interessante sendo desenvolvida, infelizmente. Acredito que por não ser tão conhecida da comunidade, ninguém parou para 
pensar nas inúmeras possibilidades que esse serviço pode oferecer.

Mas, falando tanto assim, vamos a parte prática ;)

SPara mostrar um exemplo rodando, vamos executar [este YQL](http://y.ahoo.it/jydbv), onde listo todos os links da página inicial do Globo.com:

{% highlight sql %}
> select * from html where url="http://www.globo.com" and xpath='//a'
{% endhighlight %}

Agora selecione abaixo da box de edição, o tipo de retorno que deseja e pronto, super maneiro não é?
Tá, mas agora você deve estar se perguntando, como utilizar isso de forma prática, vou colar um exemplo utilizando jQuery:

{% highlight javascript %}
    $.ajax({
    type:'GET',
    url: "http://y.ahoo.it/jydbv",
    dataType: 'jsonp',
    crossDomain: true,
    beforeSend: function(){
        console.log('enviando requisição');
    },
    success:function(feed){
        if (feed.query.count > 0) {
            var results = feed.query.results.a;

            results.each(function(indice, objeto) {
                console.log(objeto);
            });
        } else {
            console.log('sem resultados.);
        }
    }
});
{% endhighlight %}

Explicando: o jQuery nos permite chamar um JSON "paralelo", ou seja, em outro host, e é isso que o retorno do Yahoo nos envia, por isso que definimos ali na 
chamada, o dataType como 'jsonp', isso é muito importante.
Depois disso, é só navegar no retorno, bem simples ;)

Em tempo, a url ali informada, ela pode ser obtida pelo console, no campo ao rodapé, intitulado "The Rest Query", ou o topo, em um link bem discreto situado sobre a 
caixa de edição de Query, intitulado 'permalink', onde você pode recuperar o link inteiro, ou de forma diminuta, como a que eu utilizei. 
Se você colar este link no seu navegador, irá obter o retorno que configurou (XLM/JSON) no console, ou no parâmetro 'format' da URL.

Divirta-se ;)
