---
layout: blog
author: mrprompt
comments: true
date: 2015-03-14 00:00:00+00:00
slug: load-balance-com-nginx
title: Load Balance com Nginx
---
Para fazer um simples load balance com Nginx é simples.

Primeiro, vamos definir a máquina que ficará na frente e receberá todas 
as requisições e encaminhará para nosso parque de máquinas.

Começando pelo */etc/nginx/nginx.conf* para habilitar algumas coisas, como  
os tokens. Assim, cada máquina terá uma "identidade única" para a requisição
que receber.

```
http {
    ...
    server_tokens on;
    server_names_hash_bucket_size 64;
    server_name_in_redirect off;
    ...
}

```

Com isso, vamos pegar nosso arquivo de host virtual e inserir as máquinas que 
fazem parte do nosso parque e poderão receber os clientes. Abaixo, mostro o 
conteúdo de exemplo do arquivo */etc/nginx/sites-enabled/default*:

```
upstream nodes {
    ip_hash;

    server *IP_SLAVE_1*:*PORT_SLAVE_1* max_fails=3 fail_timeout=30s;
    server *IP_SLAVE_2*:*PORT_SLAVE_2* max_fails=3 fail_timeout=30s;
    server *IP_SLAVE_3*:*PORT_SLAVE_3* max_fails=3 fail_timeout=30s;
    ...
}

server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    location / {
        # Sending to other servers
        proxy_pass http://nodes;
        proxy_pass_request_headers on;
        proxy_set_header Host $http_host;
    }
    ...
}
```

Na sessão *upstream_nodes* é onde inserimos nossa máquina. 
Você pode simplesmente colocar os IPs das máquinas que compõem o parque, com algumas opções
para que o Nginx não espere eternamente uma conexão de uma máquina que possa estar fora.

A opção *ip_hash* é onde cria o identificador da máquina, algo como o que falei acima sobre 
os tokens.

Pronto, agora basta restartar o Nginx e começar a configurar suas máquinas que receberão as
requisições normalmente com o ambiente e servidor web que for de sua escolha.