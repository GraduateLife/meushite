---
slug: quick-notes
title: Quick Notes
timestamp: '2024-12-27T05:04:27.166Z'
top: false
description: >-
  just some quick notes in my coding, if there is enough content, I will create
  a new blog for it.
keywords:
  - quick notes
author: Eddie Zhang
---

just some quick notes in my coding, if there is enough content, I will create a new blog for it.

## fix the eol issue

make a `.gitattributes`

```bash
* text=auto eol=lf # default LF
*.{cmd,[cC][mM][dD]} text eol=crlf # CRLF for cmd
*.{bat,[bB][aA][tT]} text eol=crlf # CRLF for bat
```

```bash
# replace all the files with LF in old files
git rm --cached -r .
git reset --hard
```

## fix the revalidate issue

```ts
[❌] export const revalidate = 15*60; //error
[✅] export const revalidate = 900; //success
```

## set git proxy

```bash
git config --global http.proxy '<http|socks5>://<hostname>:<port>'
# cannot set https proxy because git doesn't have this option

# see the config is set or not
git config --global --get http.proxy
```
