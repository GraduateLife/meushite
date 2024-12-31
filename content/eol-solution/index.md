---
slug: eol-solution
title: Solve Your End-of-line (eol) Problem For Good
timestamp: '2024-12-30T14:06:42.053Z'
top: false
description: |-
  I don't want to explain it too much, I understand why you come to this blog
  setup for your editor
keywords:
  - eol
author: Eddie Zhang
---

I don't want to explain it too much, I understand why you come to this blog

## setup for your editor

if you use vscode, create a `.vscode/settings.json`

```json
{
  "files.eol": "\n"
}
```

or a much general solution, create a `.editorconfig` file

```editorconfig
[*]
end_of_line = lf
```

in this way, even if an editor haven't set eol sequence to LF, this will do it for you

## for frontend developers

in your `.prettierrc` file

```json
{
  "endOfLine": "lf"
}
```

you know what to do next

## but it still happens

well, even though you set up these stuffs during developing, eol issue still happens when you clone a repository from a windows user. After your `git commit`, git saves your code in CRLF on windows, while LF on linux/macos.

to handle this, create a `.gitattributes` file

```text
* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

this config tells git to use LF on saving any file, except .cmd or .bat

## not done yet

run following commands to reset eol. Before it, you should make sure your local repository is clean (commit/stash)

```bash
git ls-files --eol # inspect if there are files use crlf
git rm --cached -r . # clear git index
git reset --hard
```

after these, eol in current files will be set to LF
