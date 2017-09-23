---
layout: post
author: Thiago Paes
comments: true
date: 2015-02-02 16:40:00+00:00
slug: utilizando-o-chromebook-para-desenvolvimento
title: Utilizando o ChromeBook para desenvolvimento
visible: true
---

Utilizar um ChromeBook e depender integralmente da internet para trabalhar é
uma mudança bem radical para muitos. Eu não consigo trabalhar muito bem quando
estou sem internet.

A necessidade do ChromeBook de estar sempre conectado a internet é a mesma que
a minha - ao menos para trabalhar - então, não consegui ver isso como um
problema na proposta da máquina.

No meu dia a dia, utilizo basicamente a dupla [Sublime Text](http://www.sublimetext.com/) 
e [Zend Studio](http://www.zend.com/en/products/studio), o primeiro utilizo para projetos 
em *Javascript* e o segundo claro, para os escritos em *PHP* - que somente virou uma opção 
porque que ganhei a licença de desenvolvedor quando me certifiquei no ano passado.

- - -

## Ambientes de Desenvolvimento
Para me acostumar com o a proposta do ChromeBook, passei a utilizar no meu
dia-a-dia - inclusive no desktop - alguns ambientes na web

- [Cloud9](https://ide.c9.io)
- [Koding](koding.com)
- [Codenvy](https://codenvy.com)
- [Nitrous](https://www.nitrous.io)
- [Runnable](http://runnable.com)
- [Chrome Dev Editor](http://goo.gl/SA0Mc6)

- - -

### Cloud9
O [Cloud9](https://ide.c9.io) foi a IDE que mais me surpreendeu e logo se tornou 
meu ambiente de trabalho padrão.

O serviço oferece mais que um simples editor, junto te dá uma VM com Ubuntu
para que você possa instalar os pacotes adicionais necessários e um endereço
público (que você pode deixar como privado) para que você possa testar.

Achei interessante também - apesar de não ter testado - a possibilidade de
compartilhar o ambiente de desenvolvimento com outras pessoas, com permissão de 
escrita ou apenas leitura.

A área de trabalho permite a integração com o [Bitbucket](http://bitbucket.com) 
e [Github](http://github.com), e todos os projetos são listados em uma barra 
lateral, permitindo a clonagem e a criação do ambiente de desenvolvimento  com
poucos cliques.

### Koding
O [Koding](koding.com) é uma IDE que promete, andou por algumas mudanças nos últimos
tempos, mas nada que comprometa a qualidade.

Uma coisa que me desagradou logo de início foi a impossibilidade de minimizar ou mesmo 
fechar barra lateral, que exibe alguns canais por tags, o módulo de mensagens e a lista 
de VMs. Acompanhada por uma segunda barra com a estrutura de pastas, ocupando um 
espaço considerável da tela do ChromeBook.

Ele também tem um comportamento chato de sempre exibir a janela de texto/console
e etc abaixo da tela de editor, dividindo ainda mais o pouco espaço disponível
para trabalhar. É simples de mesclar tudo e deixar "normal", mas fazer isso
sempre que iniciar o ambiente é um tanto quanto chato.

Assim como o [Cloud9](https://ide.c9.io), o Koding também nos dá uma VM para que 
possamos configurar o ambiente do projeto e acessá-lo de fora através de um 
endereço público.

Ele tenta ser uma espécie de rede social, com alguns canais de discussão e a 
[Koding University](http://learn.koding.com/), um canal com um ótimo conteúdo na área
de desenvolvimento.

### Codenvy
O [Codenvy](https://codenvy.com) eu não consegui testar muito bem pela dificuldade
inicial com a interface e no boot da VM logo após o cadastro.

A IDE é simples e sem muitos recursos, assim como a possibilidade de configurações 
individuais para cada projeto, incluindo a instalação de novos pacotes na VM.

### Nitrous.io
[Nitrous](https://www.nitrous.io) foi mais uma alternativa que não consegui testar muito
bem. As boxes que tentei utilizar, nunca mais startaram depois que desligadas -
o que acontece muito se vocÊ ficar por um tempo sem utilizar.

Eles também oferecem uma versão para ser instalada no Desktop e integrada ao ambiente 
Cloud.

Uma coisa bacana que utilizei, foi o gerenciador de pacotes direto na IDE, já que o 
acesso ao terminal é limitado ao seu usuário, sem sudo ou acesso root como nas anteriores.

Na lateral também vem com um chat, para conversas entre todos que forem convidados a participar
do projeto, achei isso algo bem bacana.

### Runnable
[Runnable](http://runnable.com) é bem simples e quebra um galho para pequenos experimentos.

Ele não chega a ser uma IDE, é apenas um editor de textos mas que também te dá um acesso ao 
terminal - logado direto como root - para que você instale os pacotes que achar necessário 
para configurar o ambiente da sua aplicação.

Também é possível acessar sua aplicação por um endereço público para que você possa testar.

### Chrome Dev Editor
[Chrome Dev Editor](http://goo.gl/SA0Mc6)
é a opção do Google para quem deseja desenvolver aplicações ou extensões para (é claro) o Chrome.

Não utilizei muito porque minha idéia era de utilizar uma plataforma totalmente baseada na nuvem, mas 
também achei legal a opção de ter um editor local instalado no ChromeBook.

## SSH
[Secure Shell](http://goo.gl/Y8KTB),
esse foi o único que testei, até por ser uma recomendação do próprio Google, e me atendeu muito bem.
Inclusive com a possibilidade de importar minhas chaves.

O ChromeBook também possui um terminal (bem limitado diga-se de passagem) com um cliente SSH, mas não consegui 
testar.

- - -

## Conclusões
O ChromeBook é uma máquina legal? É. Principalmente para quem desejar utilizar no dia-a-dia 
para o básico (e-mail, redes sociais, streaming e etc) ou levar para apresentações, ocupando pouco 
espaço na mochila e peso imperceptível. 

Mas dependendo das ferramentas que você necessita para desenvolver um bom trabalho, talvez não seja 
uma máquina ideal pra você. 

Serve como máquina principal para desenvolvimento? Minha conslusão é: talvez.

Se você tiver uma equipe e quiser manter um ambiente único de desenvolvimento, fugindo de VMs locais, 
scripts de configuração e etc. Acho uma alternativa bem viável. 

Até mesmo para quem trabalha sozinho, a possibilidade de ter um ambiente de desenvolvimento, configurado 
por você e acessível de qualquer local é realmente legal. E pra mim, ficar sincronizando ambientes (desktop 
e notebook) é realmente um saco, assim como ficar subindo VM localmente.

Achei pouco pra falar de mal do ChromeBook, é uma máquina bem bacana e cumpre o seu papel. Em casa, utilizo 
um MacMini para trabalhar, e durante a semana que utilizei para testar o ChromeBook, utilizei em ambos as 
mesmas ferramentas para fazer meu trabalho e medir a produtividade, que foi bem positiva. 

Mas ainda sim, encontrei dois pequenos problemas em todas as IDEs testadas:

- Debugar ainda é uma tarefa um tanto quanto complicada. A grande maioria dos debugadores são para Javascript.
- Os auto-completes são muito limitados e não fazem uma varredura completa do código para ajudar, como nas IDEs 
locais.

Em pouco mais de uma semana após a aquisição, utilizei praticamente todos os dias o ChromeBook para trabalhar, 
mesmo em casa, e fiquei bastante animado. Como ele possui uma saída HDMI, fica fácil plugar um monitor externo 
e extender a área de trabalho.

Para quem já tem tudo "na nuvem", porque não seu ambiente de desenvolvimento também? Fica aí a dica ;)
