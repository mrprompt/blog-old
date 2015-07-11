---
layout: post
author: Thiago Paes
comments: true
date: 2011-01-22 15:59:00+00:00
slug: utilizando-rotas-com-zend-framework
title: Utilizando Rotas com Zend Framework
---

As vezes, é importante definir algumas urls mais amistosas para sua aplicação, ao invés de deixar o padrão _"controller/action/nomeparametro/valorparametro"_, isso as vezes pode confundir, além de ficar feio para um site por exemplo.

Para contornar isso, temos o [Zend_Controller_Router_Route](http://framework.zend.com/manual/en/zend.controller.router.html), que nos facilita o trabalho de criarmos as tais rotas, que é nome mas apropriado para este tipo de redirecionamento.

O uso é simples, vamos criar no diretório 'application/configs' um arquivo chamado 'routes.ini', e colocamos nele o seguinte conteúdo:
```
[routes]
routes.artigos.route = "artigos/:sessao"
routes.artigos.defaults.controller = artigos
routes.artigos.defaults.action = index

```

Entendeu? Não? Eu explico então cada linha. Onde está escrito '**artigos**', é o nome da rota que estamos definindo. Um identificador único para a mesma. Logo em seguida, nos valores, definimos o caminho da rota, ou seja, nossa url, que seria '/artigos' e seu parâmetro, que podem ser vários, bastando começar com ':' (dois pontos). As outras linhas são auto explicativas.

Dentro do action que você apontou a rota, para receber o valor do parâmetro '**:sessao**' por exemplo, basta utilizar um _$this->_getParam('sessao')_.

Em nosso Bootstrap, adicionamos um método para buscar automaticamente nossas rotas
```
protected function _initRouter()
{
    $this->bootstrap('frontController');

    $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/routes.ini', 'routes');

    $router = $this->getResource('frontController')
                   ->getRouter()
                   ->addConfig($config, 'routes');

    return $router;
}
```
Pronto, com isso, basta apontar sua url para '/artigos/nomedeumasessao', e está definida sua rota personalizada. Você pode ir adicionando quantas rotas quiser em seu routes.ini.



Divirta-se ;)
