---
slug: dotnet-cli-cheatsheet
title: Dotnet CLI Cheatsheet
timestamp: '2024-12-20T04:16:33.699Z'
top: false
keywords:
  - snippets
  - dotnet
author: Eddie Zhang
description: >-
  A comprehensive cheatsheet for the .NET CLI, focusing on common commands and
  workflows.

  Includes template management, SDK commands, and version control tips for .NET
  developers.
---

I prefer typing commands over clicking (blame VSCode for that).

## General Workflow

```bash
# List all templates provided by Microsoft
dotnet new list <template name> --tag=<tag>
# For template names with spaces, please use double quotes
```

```bash
# Or search for a template on NuGet
dotnet new search <template name> --tag=<tag>
```

```bash
# Create a new application using the template's short name
dotnet new <template short name>
```

> Unlike other CLI tools, the dotnet CLI creates files and folders directly in your current directory, so make sure to create a directory first before running this command.

```bash
# Run the application (navigate to the project folder first)
dotnet run
```

```bash
# Build the application
dotnet build
```

## .NET SDK Commands

```bash
# List all SDK versions installed on your machine, The command structure differs from the usual pattern
dotnet --list-sdks

```

```bash
# Check current SDK version
dotnet --version
```

> You can download SDKs from [the official .NET download page](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
>
> Alternatively, use the .NET SDK extension in VSCode as shown below:
> ![dotnet-install-tool](./dotnet-install-tool.png)

SDKs are installed globally, and the CLI automatically uses the latest version.

## How to Switch SDK Versions

```bash
# Navigate to your project root and run:
dotnet new globaljson
```

> This command works for both new and existing projects
