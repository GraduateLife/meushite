---
slug: orbstack-pitfalls
title: Pitfalls On Orbstack Proxy
timestamp: '2024-12-28T15:41:37.436Z'
top: false
description: >-
  how to set proxy to orbstack?

  Well, on my new computer I installed orbstack to ease my work, but when I was
  pulling a mirror, a familiar message shows up:

  Error
keywords:
  - orbstack
  - proxy
author: Eddie Zhang
---

## how to set proxy to orbstack?

Well, on my new computer I installed orbstack to ease my work, but when I was pulling a mirror, a familiar message shows up:

```bash
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

don't need to say more, this is the classic proxy issue, let's add some proxies,

```bash
# it differs from docker/daemon.json, you should go here
vim ~/.orbstack/config/docker.json
# add registries just as the same as docker
{
    "registry-mirrors": [
        "https://<some-proxy>.com"
    ]
}
```

open a new shell and pull nginx

Well,it doesn't help, things go tricky

orbstack documents says we can also set network proxies, let's have it a try

```bash
orb config set network_proxy socks5://127.0.0.1:7890

# this command sets proxy of terminal, I added it just in case
export http_proxy=socks5://127.0.0.1:7890

# see if it is set
orb config show
```

it should work, right? NO!

then the final resort is to add dns ip addresses to your computer

after add a bunch of dns records it works in the end.
