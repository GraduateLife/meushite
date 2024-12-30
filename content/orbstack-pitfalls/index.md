---
slug: orbstack-pitfalls
title: Orbstack Pitfalls
timestamp: '2024-12-28T15:41:37.436Z'
top: false
description: |-
  how to set proxy to orbstack?
  vim ~/.orbstack/config/docker.json
  orb config set network_proxy socks5://127.0.0.1:7890
  add dns ip addresses to your mac
keywords: []
author: Eddie Zhang
---

## how to set proxy to orbstack?

vim ~/.orbstack/config/docker.json

orb config set network_proxy socks5://127.0.0.1:7890

add dns ip addresses to your mac

do not try to edit /etc/resolv.conf file! this is mac, not linux!
