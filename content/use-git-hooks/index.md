---
slug: use-git-hooks
title: Use Git Hooks
timestamp: '2024-12-31T10:45:30.057Z'
top: false
description: >-
  in the last blog, I mentioned to use git hooks to format my code before
  commit.

  surprisingly, it's not hard to do it.
keywords:
  - git
  - husky
  - git hooks
author: Eddie Zhang
---

in [the last blog](/content/nextjs-plus-eslint/index.md), I mentioned to use git hooks to format my code before commit.

surprisingly, it's not hard to do it.

the native way to use git hooks is to edit the `.git/hooks` directory, but it's not recommended since .git folder is ignored by git, it will cause troubles when other guys commit.

so i use [husky](https://typicode.github.io/husky/#/), this is a git hook tool specially for js users.

After [getting started](https://typicode.github.io/husky/get-started.html), you can see the husky is working.

## by the way

husky doc mentions there is another useful tool called [lint-staged](https://typicode.github.io/lint-staged/#/), it will run the lint command for different file formats _concurrently_, but for my current project, i don't need it since I got over 99% code in typescript.

## Extra

Q: I run my lint command as a part of build command, so why I need to use git hooks?

A: because if eslint yells at build stage in your remote server, things become worse, am I right?
