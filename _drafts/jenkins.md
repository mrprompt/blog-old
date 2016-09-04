---
layout: post
author: mrprompt
comments: true
date: 2016-07-21 00:0:00+00:00
slug: integracao-continua-jenkins
title: Integração Contínua com Jenkins
---
Voltando a nossa série sobre série sobre [Integração Contínua]({% post_url 2016-03-25-falando-sobre-integracao-continua-e-qualidade-de-desenvolvimento %}), 
vou apresentar agora a você o Jenkins. 

Acho que simplesmente, o mais famoso e utilizado de todos - e também, o mais complicado de se manter.

<img src="{{ site.baseurl }}/upload/ci/jenkins/logo.png" 
    class="img img-responsive pull-right" alt="Jenkins Logo" title="Jenkins" width="185" height="256">

Pra não quebrar o padrão<sup>vulgo TOC</sup>, vou dividir o post em algumas partes:

- [Apresentação](#apresentacao)
- [Instalação](#instalacao)
- [Configurando](#configurando)
    - [PHP](#configurando-php)
    - [Nodejs](#configurando-nodejs)
    - [Angularjs](#configurando-angularjs)
    - [Ruby](#configurando-ruby)
    - [Java](#configurando-java)
- [Prós & Contras](#pros-e-contras)
- [Conclusão](#conclusao)
- [Mais Informações](#mais-informacoes)

### <a name="apresentacao"></a> Apresentação

Eu sempre digo que o Jenkins é o xodó da comunidade, porque 9 entre cada 10 projetos que eu tenho contato, que utilizam - ou tentam - 
utilizar Integração Contínua, utilizam ele em sua stack.  

### <a name="instalacao"></a> Instalação

O Jenkins pode ser instalado de várias formas, o jeito mais simples, é utilizando o nosso tão conhecido apt-get ou yum, mas também 
pode ser instalado via homebrew para os usuários de Mac, ou simplesmente rodando o jar baixado no site. Eu prefiro sempre a 
primeira opção, buscando um repositório constantemente atualizado e etc. 

Para este artigo, preferi utilizar a versão da [Openshift](https://openshift.com), pela simplicidade de instalação e um pouco de 
preguiça, admito.

Logo após instalado, a primeira tela que vemos no Jenkins é a de login:

<img src="{{ site.baseurl }}/upload/ci/jenkins/login.png" 
    class="img img-responsive pull-left" alt="Login" title="Jenkins Login">

Fazendo o login - em alguns casos, caímos direto na dashboard, para depois podermos criar usuários de acesso:

<img src="{{ site.baseurl }}/upload/ci/jenkins/dashboard-vazia.png" 
    class="img img-responsive pull-right" alt="Dashboard" title="Jenkins Dashboard">

### <a name="configurando"></a> Configurando

O Jenkins requer - claro - que as ferramentas que você necessita para rodar o seui build estejam configuradas e funcionais na 
máquina hospedeira, então, fique sempre atento a isso.

No caso da VM disponibilizada pela Openshift, eu possuo o seguinte ambiente configurado por padrão:

- PHP 5.3.3
- Java 1.7.0_111 
- Nodejs 0.6.20
- Ruby 1.8.7

Nosso primeiro passo é ao clicar em "Novo job", selecionar o tipo de projeto que vamos configurar, para um primeiro passo,
prefiro utilizar o "free-style", que é uma configuração limpa e podemos ir configurando os passos conforme a necessidade de 
nosso projeto.
<img src="{{ site.baseurl }}/upload/ci/jenkins/selecionando-um-tipo.png" 
    class="img img-responsive" alt="Tipos" title="Jenkins - Tipos de projetos">

Selecionando um tipo de projeto, podemos ver uma configuração geral do mesmo, onde vamos configurar desde o repositório, até os 
passos para que nosso build possa ser considerado entregável.
<img src="{{ site.baseurl }}/upload/ci/jenkins/iniciando-projeto.png" 
    class="img img-responsive" alt="Detalhes" title="Jenkins - Detalhes do projeto">

Eu procuro não manter um número muito grande de builds armazenados, já que os mesmos rodam a cada push - e vai por mim, você 
também não vai querer que seu disco encha rapidamente - então, seleciono a opção "descartar builds antigos" e defino um número 
máximo de builds a se manter - geralmente 10.

<img src="{{ site.baseurl }}/upload/ci/jenkins/definindo-historico.png" 
    class="img img-responsive" alt="Histórico" title="Jenkins - Número de builds a se manter">

Em seguida, selecionando o nosso controle de versão definimos o endereço do nosso repositório, outro caso que é importante se 
atentar, é a permissão do jenkins no seu repositório, eu recomendo sempre o uso de SSH, criando uma chave para o servidor que 
está rodando o Jenkins e dando permissão a ele no repositório via chave pública.  

<img src="{{ site.baseurl }}/upload/ci/jenkins/git.png" 
    class="img img-responsive" alt="Git" title="Jenkins - Git">

Você também pode especificar o branch a ser observado, o master é imprescindível, mas você também pode optar por rodar os builds
em todos os branches, acho que isso vai de cada equipe. Eu recomendo sempre rodar, independente do branch que esteja trabalhando.

Clicando no botão com o ícone da chave e "add" podemos configurar nossa permissão a ser utilizada no repositório:

Caso você prefira utilizar usuário e senha, e seu repositório utilize https, você pode definir as credenciais necessárias:
<img src="{{ site.baseurl }}/upload/ci/jenkins/credenciais-senha.png" 
    class="img img-responsive" alt="Credenciais" title="Jenkins - Credenciais - Senha">

Se você optar por utilizar chaves ssh - o ideal na minha opinião - basta cadastrar uma chave, que pode ser única para cada 
servidor com o Jenkins, ou uma única compartilhada, fica a seu critério:
<img src="{{ site.baseurl }}/upload/ci/jenkins/credenciais-ssh.png" 
    class="img img-responsive" alt="Credenciais" title="Jenkins - Credenciais - SSH"> 


<img src="{{ site.baseurl }}/upload/ci/jenkins/periodicidade.png" 
    class="img img-responsive pull-right" alt="Periodicidade" title="Jenkins - Checagem do repositório">

Após configuramos as chaves e permissões para o repositório, vamos configurar quando queremos que o Jenkins analise nosso 
repositório em busca de mudanças, claro, que se você quiser, também pode pular este passo e deixar todo o processo de build 
do jenkins manual - mas que graça tem, não é mesmo?

A checagem usa o mesmo padrão da cron, então, é possível também utilizar valores como @hourly, @daily e etc, dependendo do 
tamanho do seu projeto e de quanto tempo leve o build, seja uma boa idéia chegar num valor que não atrapalhe a equipe aqui, 
criando filas de builds desnecessários.

Agora é que o bicho pega, a hora que começamos a configurar os passos do nosso build.

É importante lembrar, que para um build ser dado como bem sucedido, é necessário que todos os passos sejam executados com sucesso.

Os passos de build vai de cada aplicação, mas não foge muito do processo: 

```
clonar -> instalar dependências -> subir ambiente de testes -> rodar testes -> deploy
```

Claro, que nem todos os projetos podem seguir esse caminho lindo e maravilhoso, porém, o jenkins não serve apenas para fazer 
testes unitários e etc, serve também para automatizar seu processo de build por exemplo. Vamos seguir configurando um processo 
básico, com poucos passos, apenas para fins de aprendizado e conhecimento da ferramenta.


#### Bônus Track - Exemplos de Configuração

#### <a name="configurando-php"></a> PHP

#### <a name="configurando-nodejs"></a> Nodejs

#### <a name="configurando-angularjs"></a> Angularjs

#### <a name="configurando-ruby"></a> Ruby

#### <a name="configurando-java"></a> Java

### <a name="pros-e-contras"></a> Prós & Contras

### <a name="conclusao"></a> Conclusão

### <a name="mais-informacoes"></a> Mais Informações