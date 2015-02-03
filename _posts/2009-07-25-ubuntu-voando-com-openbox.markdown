---
layout: blog
author: mrprompt
comments: true
date: 2009-07-25 03:31:00+00:00
layout: blog
slug: ubuntu-voando-com-openbox
title: Ubuntu voando com Openbox
wordpress_id: 21
categories:
- openbox
- software livre
- ubuntu
---

[![](http://3.bp.blogspot.com/_nhKbx850xAI/TO84VoF7M0I/AAAAAAAAOR8/qq_JGTcDv2c/s320/openbox_conky.jpg)](http://3.bp.blogspot.com/_nhKbx850xAI/TO84VoF7M0I/AAAAAAAAOR8/qq_JGTcDv2c/s1600/openbox_conky.jpg)
Instalando Vamos começar, instalando alguns pacotes básicos para um funcionamento redondo no nosso desktop.

# apt-get install openbox openbox-themes openbox-xdgmenu lxpanel rotate-wallpaper feh conky xcompmgr
Pronto, com isso, já temos nosso desktop instalado, falta agora configurar.

Iniciando tudo junto Depois de tudo instaldo, rode o openbox selecionando ele no menu sessões do GDM ou do seu gerenciador de login. É simples, é básico, bem secão.. mas vamos incrementar isso.

Vai existir - senão crie - no seu home, o diretório .config/openbox/, vamos criar o nosso arquivo de inicialização automática para alguns aplicativos e serviços importantes.

$ gedit ~/.config/openbox/autostart.sh
Cole o seguinte texto dentro do arquivo:

#!/bin/bash

## Serviços essenciais
xcompmgr &
#gnome-volume-manager &
gnome-settings-daemon &
update-notifier &
xdg-user-dirs-gtk-update &
gnome-at-visual -s &
#gnome-power-manager &
nm-applet --sm-disable &
bluetooth-applet &

# Papel de parede randômico a cada login - lembre-se de alterar o caminho
rotate-wallpaper --path $HOME/Wallpapers/

# Painel
(sleep 2 && lxpanel) &

# Conky
(sleep 3 && conky) &
Também precisamos dar permissão de execução para ele

$ chmod +x ~/.config/openbox/autostart.sh
Configurando o monitor do sistema Vamos criar agora o arquivo de configuração do Conky, nosso monitor do sistema, que vai rodar como um widget na sua área de trabalho, com bastante informação.

$ gedit ~/.conkyrc
E jogamos o conteúdo abaixo:

# UBUNTU-CONKY
# A comprehensive conky script, configured for use on
# Ubuntu / Debian Gnome, without the need for any external scripts.
#

background yes
cpu_avg_samples 2
net_avg_samples 2
out_to_console no
stippled_borders 0

# Create own window instead of using desktop (required in nautilus)
own_window yes
own_window_type normal # override # normal
own_window_transparent yes
own_window_hints undecorated,below,sticky,skip_taskbar,skip_pager
own_window_class Conky
own_window_colour brown

# Use double buffering (reduces flicker, may not work for everyone)
double_buffer yes

# fiddle with window
use_spacer yes

# Update interval in seconds
update_interval 1.0

# Minimum size of text area
minimum_size 250 5

# Draw shades?
draw_shades no
draw_borders no
draw_graph_borders yes
draw_outline no

use_xft yes
xftfont monospace:pixelsize=12

override_utf8_locale yes

uppercase no

border_margin 9
border_width 10

default_color black

# Text alignment, other possible values are commented
#alignment top_left
alignment top_right
#alignment bottom_left
#alignment bottom_right

# Gap between borders of screen and text
gap_x 10
gap_y 5

# stuff after 'TEXT' will be formatted on screen

TEXT
${color orange}SYSTEM $nodename ${hr 2}${color white}
$sysname $kernel $machine $alignr Up: ${uptime_short}${color}
${color orange}Processes:${color lightgrey} $processes ${color orange}Run:${color lightgrey} $running_processes ${color orange}CPU Temp:${color lightgrey} ${acpitemp}

${color orange}CPU ${hr 2}${color white}
$cpubar
${color orange}Usage (Avg):${color white} ${freq_dyn_g}Ghz ${color lightgrey}${cpu cpu0}% ${alignr}${cpubar cpu0 5,80}
${color orange}Usage (Core 1):${color white} ${freq_dyn_g cpu1}Ghz ${color lightgrey}${cpu cpu1}% ${alignr}${cpubar cpu1 5,80}
${color orange}Usage (Core 2):${color white} ${freq_dyn_g cpu2}Ghz ${color lightgrey}${cpu cpu2}% ${alignr}${cpubar cpu2 5,80}

${color orange}Average ${loadavg} / ${freq}MHz ${hr 2} ${color white}
${cpugraph cpu0 42AE4A eeeeee}
${color orange}Core 1 $alignr Core 2${color white}
${cpugraph cpu1 25,120 42AE4A eeeeee} $alignr ${cpugraph cpu2 25,120 42AE4A eeeeee}

${color yellow}NAME             PID       CPU%      MEM%
${color lightyellow}${top name 1} ${top pid 1}   ${top cpu 1}    ${top mem 1}${color white}
${top name 2} ${top pid 2}   ${top cpu 2}    ${top mem 2}
${top name 3} ${top pid 3}   ${top cpu 3}    ${top mem 3}
${top name 4} ${top pid 4}   ${top cpu 4}    ${top mem 4}
${top name 5} ${top pid 5}   ${top cpu 5}    ${top mem 5}
${top name 6} ${top pid 6}   ${top cpu 6}    ${top mem 6}
${top name 7} ${top pid 7}   ${top cpu 7}    ${top mem 7}
${top name 8} ${top pid 8}   ${top cpu 8}    ${top mem 8}
${top name 9} ${top pid 9}   ${top cpu 9}    ${top mem 9}

${color orange}MEMORY ${hr 2}${color white}
RAM:   $memperc%   ${color grey}${membar 6}${color white}
Swap:  $swapperc%   ${color grey}${swapbar 6}${color white}

${color orange}DISK ${hr 2}${color white}
Root:  ${fs_free_perc /}%   ${alignr}${color 891B0B}${fs_bar 6,208 /}${color white}
Home:  ${fs_free_perc /home}%   ${alignr}${color 1B890B}${fs_bar 6,208 /home}${color white}
Disk I/O: ${diskio} ${color white}${alignr}HD Temp: ${hddtemp /dev/sda}
${diskiograph 990000 DDFFAA}${color white}

${color orange}NETWORK (${addr ppp0}) ${hr 2}${color white}
Down: ${color white}${downspeed ppp0} k/s ${alignr}Up: ${upspeed ppp0} k/s
${downspeedgraph ppp0 25,140 00ff00 ff0000} ${alignr}${upspeedgraph ppp0
25,140 0000ff 00ff00}${color white}
Total: ${totaldown ppp0} ${alignr}Total: ${totalup ppp0}
Inbound: ${tcp_portmon 1 32767 count} Outbound: ${tcp_portmon 32768
61000 count}${alignr}Total: ${tcp_portmon 1 65535 count}
Pronto agora é só relogar e ver um desktop redondinho usando o mínimo de memória.

O lxpanel é muito simples de ser configurado, é só clicar com o direito encima e pronto, ir adicionando e customizando conforme o seu gosto, e os serviços principais - ao menos pra mim - do Gnome, como o Network Manager rodam tranquilamente.

Ainda é possível customizar ainda mais o gerenciador, rodando por exemplo, algum aplicativo para disponibilizar ícones no desktop, como o rox.
