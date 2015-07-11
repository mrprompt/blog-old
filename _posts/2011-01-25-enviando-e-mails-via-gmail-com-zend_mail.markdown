---
layout: post
author: Thiago Paes
comments: true
date: 2011-01-25 22:58:00+00:00
slug: enviando-e-mails-via-gmail-com-zend_mail
title: Enviando e-mails via Gmail com Zend_Mail
---

Configurar um servidor SMTP é trabalhoso, principalmente pela briga de gato e rato que é não cair nas listas negras e ser tratado como SPAM, confesso que não tenho muita paciência pra isso, apesar de já ter de faze-lo algumas vezes, mas se puder correr dessa alternativa, melhor ainda.

As vezes, tudo que precisamos é criar um formulário de contato simples para um pequeno site de cliente, ou mesmo apenas para nos enviar alguns avisos da aplicação. 




Classes para envio de e-mails existem aos montes, uma que gosto muito e recomendo é a [PHPMailer](http://phpmailer.worxware.com/), que já usei por algum tempo e nunca me deu trabalho. Mas como a algum tempo venho utilizando a [Zend Framework](http://framework.zend.com/) em meus projetos, nada melhor do que utilizar o módulo já incluso na mesma para esta tarefa não é mesmo? Seguindo o passo a passo descrito abaixo, fica simples enviar e-mails. Vamos lá.




Primeiro, criamos um um arquivo chamado '_smtp.ini_' em _application/configs_ com o seguinte conteúdo:

; -------------------------------------------------
; | SMTP Host configuration
; -------------------------------------------------


[smtp]
smtp.titulo  = Título padrão para o e-mail
smtp.usuario = contato@gmail.com
smtp.senha   = senha
smtp.host    = smtp.gmail.com
smtp.porta   = 465
smtp.seguranca = ssl
smtp.auth    = login


Agora, na action que vamos enviar o nosso e-mail, basta colocar o seguinte código



// busco as configurações no ini
$objCfg = new Zend_Config_Ini(APPLICATION_PATH . '/configs/smtp.ini', 'smtp');
$arrCfg = $objCfg->toArray();

// configuro o cliente SMTP
$config = array('auth'     => $arrCfg['smtp']['auth'],
                'username' => $arrCfg['smtp']['usuario'],
                'password' => $arrCfg['smtp']['senha'],
                'smtp'     => $arrCfg['smtp']['host'],
                'ssl'      => $arrCfg['smtp']['seguranca'],
                'port'     => $arrCfg['smtp']['porta']);

// instancio o cliente SMTP
$smtp = new Zend_Mail_Transport_Smtp($config['smtp'], $config);

// instancio o cliente de e-mail e tento enviar a mensagem
$mail = new Zend_Mail();
$mail->setFrom($params['email'], $params['nome'])
     ->setReplyTo($params['email'], $params['nome'])
     ->addTo('fulano@email.com')
     ->setBodyHtml('Teste de e-mail')
     ->setSubject($arrCfg['smtp']['titulo'])
     ->send($smtp);

// desconecto do host smtp
$smtp->getConnection()->disconnect();




Pronto, e-mail enviado!!! Agora é só fazer os tratamentos de campos, excessões e etc, conforme a necessidade da sua aplicação. ;)
