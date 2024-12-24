---
slug: dotnet-cli-cheatsheet
title: Dotnet Cli Cheatsheet
timestamp: '2024-12-20T04:16:33.699Z'
top: false
keywords:
  - snippets
  - dotnet
author: Eddie Zhang
description: |-
  I don't like to click, I like to type (your fault, vscode)
  General workflow like this
  list all templates provided by microsoft
  dotnet new list <by template name
---

I don't like to click, I like to type (your fault, vscode)

## General workflow like this

```bash
# list all templates provided by microsoft
dotnet new list <by template name> --tag=<tag>
# template name has space, use double quotes (guess I don't need to tell you this)
```

```bash
# or find a template on nuget
dotnet new search <by template name> --tag=<tag>
```

```bash
# Create a new application, use short name instead of full name
dotnet new <template short name>
```

> note: unlike other cli tools, dotnet cli directly create the files and folders in your current directory, so please mkdir before you run this command

```bash
# run application, don't have to attach path name, you go to the folder
dotnet run
```

```bash
# build application
dotnet build
```

## Dotnet sdk commands

```bash
# list all sdk versions in your machine
dotnet --list-sdks
# don't know why it in not like 'dotnet list sdks'
```

```bash
# check current sdk version
dotnet --version
```

> have to download sdk on [this page](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
>
> or use dotnet sdk extension in vscode like I did![dotnet-install-tool](./dotnet-install-tool.png)

Sdks are installed globally, and cli automatically switch to the latest version

## So how to switch sdk versions?

```bash
# go to your project root
dotnet new globaljson
```

> this command works both for new projects and for existing projects
