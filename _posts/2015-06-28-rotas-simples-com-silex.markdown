---
layout: blog
author: mrprompt
comments: true
date: 2015-06-28 15:05:00+00:00
slug: rotas-simples-com-silex
title: Rotas simples com Silex
---
O barato do Silex é que ele é realmente muito simples de se iniciar uma aplicação. Mas conforme a mesma vai crescendo,
e consecutivamente, o número de páginas e rotas vai aumentando, fica realmente um saco toda hora ter que alterar o
código para adicionar ou remover rotas.

Como o Silex é baseado em componentes do Symfony, nada mais prático que utilizar o componente de rotas dele para
facilitar nossa vida, não é mesmo?

Então, vamos direto ao ponto.

Começamos instalando as bibliotecas necessárias, adicionando as linhas no composer.json do projeto:

```
    "symfony/yaml": "~2.6",
    "symfony/config": "~2.6"
```

Pronto, isso é tudo que precisamos para trabalhar com as rotas.
Agora, vamos fazer a leitura dos arquivos com as nossas rotas definidas:

```
<?php
...
use Symfony\Component\Routing\Loader\YamlFileLoader as RoutingFileLoader;
use Symfony\Component\Routing\RouteCollection;
...

$routesPath    = __DIR__ . DIRECTORY_SEPARATOR . 'routes';

$app['routes'] = $app->extend(
    'routes',
    function (RouteCollection $routes) use ($routesPath) {
        $loader     = new RoutingFileLoader(new FileLocator($routesPath));
        $collection = $loader->load('routes.yml');

        $routes->addCollection($collection);

        return $routes;
    }
);

...
```

O arquivo de rotas (routes/routes.yml)

```
# album route
album:
    prefix: /album
    resource: routes.album.yml
...
```

E um exemplo de rotas (routes/album.yml):

```
# album route
album.home:
    path: /
    defaults: { _controller: 'Application\Controller\Album::get' }
    methods: [GET]

album.view:
    path: /{id}
    defaults: { _controller: 'Application\Controller\Album::view' }
    methods: [GET]
    requirements:
      id: \d+

album.create:
    path: /
    defaults: { _controller: 'Application\Controller\Album::post' }
    methods: [POST]

album.update:
    path: /{id}
    defaults: { _controller: 'Application\Controller\Album::put' }
    methods: [PUT]
    requirements:
      id: \d+

album.delete:
    path: /{id}
    defaults: { _controller: 'Application\Controller\Album::delete' }
    methods: [DELETE]
    requirements:
      id: \d+
```

E está feito, agora é só ir criando duas rotas direto no YAML respectivo. ;)