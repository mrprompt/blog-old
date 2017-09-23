---
layout: post
author: mrprompt
comments: true
date: 2017-05-14 00:00:01+00:00
slug: vamos-falar-de-refatoracao
title: Vamos falar de refatoração
visible: true
---
### Ou porquê você deveria fazer seu trabalho direito

Tem muito tempo que o que mais ouço são "programadores" reclamando que tal
biblioteca não faz, tal componente é bugado demais, framework x é mal feito
por causa disso e daquilo... sempre que me pego no meio de um papo desses,
lanço duas frases:

- Muito mimimi e pouco pull request.
- Porque você não arruma o código que te incomoda?

Porque programadores habilidosos, simplesmente não se mexem e arrumam o
que está com problema ao invés de apenas reclamar ou citar mais problemas?

A resposta básica é de que o código legado não tem testes, não foi projetado
pensando nisso e não tem como colocar. Pra mim isso é balela, sempre tem!

Muitos times também largam que "nós vamos rescrever a aplicação, na próxima
versão vamos fazer direitinho seguindo as melhores práticas", admita, isso
nunca vai acontecer. Simplesmente porque você sempre vai pegar o máximo de
tempo disponível simplesmente para arrumar os bugs da versão atual ou adicionar
novas funcionalidades - sem testes, copiando e colando as mesmas gambiarras que
"já funcionam" em outras partes da aplicação.
Pode ser que isso até aconteça, então, o time se divide em dois grupos: o que vai
manter a versão nova e o que irá prestar manutenção na antiga até que a nova
seja lançada.
O resultado disso é: a versão antiga, começa a ficar cada vez maior,
consequentemente, com mais problemas, e o time que a está mantendo, cada vez
mais desanimado e extressado, seja pelo excesso de problemas que acontecem ao
mexer em determinadas partes do software, cujos efeitos colaterais são
totalmente inesperados, quanto pela vontade de estar participando na nova
versão do projeto, que parece ser "bem mais legal e menos extressante".
Neste tumulto, rolam muitas trocas de membros entre os times, para resolver
inúmeras urgências e acabamos com dois projetos atrasados e um time
completamente desmotivado.

Existe também um outro cenário, o da refatoração de código, seja ela para seguir
num novo padrão ultra bacana que o time viu na internet e que funciona com
empresa tal. Mas lembre-se: Refatoração sem teste é apenas manutenção - de
risco - de código legado.

Então, antes de tudo, tente ao máximo fugir desses dois cenários apresentados,
sua aplicação - e sua sanidade - agradecem.

Muitos pensam que adicionar testes em uma aplicação, é do dia para a noite, criar
testes de integração, unitários, comportamentais, etc e logo terá 100% de
cobertura do código; mas vamos com calma pequeno gafanhoto...

Começar a cobrir uma aplicação com testes deve ser feito com calma, paciência e
principalmente, por partes. Por exemplo: vai refatorar um componente ou uma
tela? Porque você não apenas escreve um teste de comportamento para aquela tela?
Vamos imaginar que esta tela seja um formulário, com dois campos: nome e email,
e dois botões, um de submit, e outro de reset. Nosso cenário de teste é simples:

- acessar a rota do formulário e verificar se o mesmo existe
- preencher os campos com dados inválidos e verificar se ao clicar em submit,
o mesmo terá sua validação recusada
- preencher os campos novamente, desta vez, com dados válidos, clicar em submit
e verificar se a mensagem de sucesso é exibida
- preencher o formulário, clicar em reset e verificar se os campos foram limpos.

Simples não? Em poucos minutos, você escreveria este cenário
(protractor, selenium, webtest,cucumber, tanto faz) e garantirá que a tela está
funcionando. Testes unitários, mocks, stubs? Esqueça isso, em outro momento,
quando você for mexer em algum componente, que isso possa ser encaixado, você
o faz. Sobrou tempo? Porque não escrever um teste unitário para este controlador
então? E assim vamos, a cada interação um teste.

Vamos imaginar outro cenário, uma aplicação simples, MVC, onde você descobriu um
bug que precisa ser corrigido urgentemente, após uma sessão de debug, você
descobriu que o problema está em um dos models utilizados. Agora temos o
ambiente perfeito para nosso teste unitário. Porque não, ao corrigir o bug,
você não escreve um teste para este model e cobre o bug que foi corrigido?
Aplicando um cenário de aceitação e outro de erro, para garantir o comportamento
do mesmo.

Como podemos ver, iniciar testes em uma aplicação existente não é impossível e
nem um bicho de sete cabeças, requer apenas paciência e uma dose de bom senso
sobre o que testar em cada momento, você vai ver que com o passar do tempo, sua
aplicação terá cada vez mais cenários e uma cobertura de testes crescente, onde
a equipe se tornará cada vez mais confiante em manter aquele "código legado"
onde todos antes tinham medo de pôr as mãos.

Para finalizar, deixo minhas dicas sobre como começar a cobrir sua aplicação com
testes e a implementar um bom fluxo de trabalho:

- comece com cenários simples, como apenas a verificação de determinado elemento
na tela ao acessar uma rota, isso já garantirá que a tela está sendo corretamente
(ou o mais próximo disso) renderizada
- não tente efetuar todos os tipos de testes de uma vez, vá com calma, não tente
abraçar o mundo
- refatoração sem teste não existe
- desde o primeiro momento, configure algum serviço de Integração Contínua, mesmo
que seja apenas para rodar testes de cada commit
- quando o CI estiver com um fluxo legal, configure também uma Entrega Contínua

Caso você se interesse em implementar um sistema de integração contínua, no
blog existem alguns textos que podem te ajudar no processo, ou fale diretamente
comigo que terei prazer em ajudar.

Até a próxima ;)
