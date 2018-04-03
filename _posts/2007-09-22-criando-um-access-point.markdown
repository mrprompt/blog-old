---
layout: post
author: Thiago Paes
comments: true
date: 2007-09-22 03:25:00+00:00
slug: criando-um-access-point
title: Criando um Access Point
---

Introdução
----------

Adquiri recentemente, uma placa Wireless 108G PCI Adapter - DWL-G520 da Dlink,
pra por no micro que já faz o roteamento da rede cabeada aqui de casa e poder
utilizar o wireless do meu notebook. Imaginei que fosse uma tarefa simples,
afinal, "é só mais uma placa de rede".

Eu penei pra conseguir configurar, foram dois dias fuçando manuais e buscas no
Google, para enfim, chegar a essa receita de bolo.

A DWL-G520 vem com chipset Atheros, que é suportado nativamente pelo Linux com
o madwifi, não necessitando então do ndiswrapper, que é uma espécia de Wine
para drivers wireless se entendi bem.

A intenção é mesclar as redes ethernet e wireless, atribuindo IP aos clientes
via dhcp, autenticando os usuários da rede wi-fi com a chave WEP.

Com as três placas de rede fisicamente instaladas na máquina que irá fazer o
roteamento, aqui um K6-2 366MHz com 386Mb de RAM e Debian 4.0.

Dando um "lspci" obtenho a seguinte saída:

```
# lspci
00:09.0 Ethernet controller: Atheros Communications, Inc. AR5212 802.11abg NIC (rev 01)
00:0a.0 Ethernet controller: VIA Technologies, Inc. VT6105 Rhine-III rev 8b
00:0b.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL-8139/8139C/8139C+ (rev 10)
```


Instalando
----------

Vamos então a instalação dos pacotes via apt-get:

```
# apt-get install bridge-utils dhcp3-client dhcp3-common dhcp3-server wireless-tools
# apt-get install ifupdown iptables madwifi-tools madwifi-source module-assistant
```

Com a placa de rede reconhecida, e os drivers instalados, agora vamos configurar
as placas de rede, no Debian, as configurações ficam no diretório "/etc/network/interfaces".

```
# /etc/network/interfaces
# Interface de Local/Loopback
auto lo
iface lo inet loopback```

# Primeira placa de rede, ligada ao switch
auto eth0
allow-hotplug eth0
iface eth0 inet static
address 192.168.1.1
netmask 255.255.255.0

# Segunda placa de rede, ligada ao modem
auto eth1
allow-hotplug eth1
iface eth1 inet dhcp

# Terceira placa de rede, wireless, habilitada via wlanconfig para trabalhar como Access Point (AP)
auto ath0
iface ath0 inet static
address 192.168.1.2
netmask 255.255.255.0
pre-up wlanconfig ath0 destroy
pre-up wlanconfig ath0 create wlandev wifi0 wlanmode ap
pre-up iwconfig ath0 essid "Casa" rate auto
pre-up iwconfig ath0 txpower auto
pre-up iwconfig ath0 channel 5
pre-up iwconfig ath0 key restricted xxxxxxxxxxxxxxxxxxxxxxxxxxxx
wireless-mode master
```

Para a chave WEP, você deve utilizar uma sequencia em hexadecimal de 26 caracteres.
Reinicie o micro, ou levante as placas de rede manualmente:

```
# ifconfig eth0 up
# ifconfig eth1 up
# ifconfig ath0 up
```

Agora, todas as placas de rede possuem um IP interno e já se comunicam, se em
algum outro micro - no meu caso, a partir do notebook - eu rodar o iwlist, já
será possível encontrar a rede wireless.

```
# iwlist scan
lo        Interface doesn't support scanning.```
eth0      Interface doesn't support scanning.
eth1      Scan completed :
Cell 01 - Address: 00:19:5B:3C:CF:29
ESSID:"BobMarley"
Protocol:IEEE 802.11bg
Mode:Master
Channel:5
Frequency:2.432 GHz (Channel 5)
Encryption key:on
Bit Rates:1 Mb/s; 2 Mb/s; 5.5 Mb/s; 11 Mb/s; 6 Mb/s
9 Mb/s; 12 Mb/s; 18 Mb/s; 24 Mb/s; 36 Mb/s
48 Mb/s; 54 Mb/s
Quality=99/100  Signal level=-23 dBm  Noise level=-23 dBm
Extra: Last beacon: 92ms ago
```

Agora vamos habilitar o DHCP para a rede.
Edite o /etc/default/dhcp3-server para podermos informar ao servidor daemon do
DHCP, quais interfaces ele irá ouvir.

```
# /etc/default/dhcp3-server
INTERFACES="eth0 ath0"
```

Configuramos agora, o daemon propriamente dito, uma configuração básica é
sugerida abaixo, e deve ser salva no arquivo /etc/dhcp3/dhcpd.conf.

```
# /etc/dhcp3/dhcpd.conf
ddns-update-style none;
default-lease-time 600;
max-lease-time 7200;
authoritative;
log-facility local7;```
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.3 192.168.1.30;
    option domain-name-servers 192.168.1.1,200.247.141.11,200.247.141.12;
    option domain-name "fln.virtua.com.br";
    option routers 192.168.1.1;
    default-lease-time 600;
    max-lease-time 7200;
}
```

Reinicie o servidor DHCP e pronto

```
# /etc/init.d/dhcp3-server restart
```

Pronto, com isso, os micros conectados ao switch/hub já recebem um IP
automaticamente, para os clientes da rede Wireless também receberem um IP e
conseguir navegar, precisamos criar uma ponte, entre a placa de rede interna (eth0)
e a placa wireless (ath0):

```
# ifconfig eth0 0.0.0.0 up
# ifconfig ath0 0.0.0.0 up
# brctl addbr br0
# brctl setfd br0 0
# brctl addif br0 eth0
# brctl addif br0 ath0
# ifconfig br0 192.168.1.1
```

A rede agora está quase pronta, faltando apenas habilitar o NAT no servidor,
para que todos os micros possam utilizar a internet, para isso, vamos utilizar
o iptables.

Primeiro carregamos o módulo iptable_nat

```
# modprobe iptable_nat
```

Limpamos quaisquer regras que existam na tabela do iptables

```
# iptables -F
# iptables -t nat -F
# iptables -t mangle -F
# iptables -X
```

Ativamos o ip forward

```
# echo 1 > /proc/sys/net/ipv4/ip_forward
```

Habilitando o NAT, lembrando que a eth1 é a placa de rede que está ligada ao modem

```
# iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE
```

Você também pode pegar os comandos que criam a interface de ponte (bridge) e
do iptables, e inserir no seu rc.local, no diretório etc, para poder rodar
sempre que o micro for iniciado.

How-To corrido, escrito em menos de 20min, mas ao menos tá documentado pra
galera não ficar dois dias quebrando cabeça como eu ;)
