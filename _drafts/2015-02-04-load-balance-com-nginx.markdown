---
layout: blog
author: mrprompt
comments: true
date: 2015-02-04 00:00:00+00:00
slug: load-balance-com-nginx
title: Load Balance com Nginx
---

Começando pelo */etc/nginx/nginx.conf*

```
http {
    ...
    server_tokens on;
    server_names_hash_bucket_size 64;
    server_name_in_redirect off;
    ...
}

```

E agora o */etc/nginx/sites-enabled/default* 

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

Agora, basta você ir adicionando suas instâncias mencionadas com sua configuração do Nginx ou outro servidor web
