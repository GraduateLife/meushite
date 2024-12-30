---
slug: nextjs-plus-eslint
title: A Record Of Adding Eslint To My Nextjs Website
timestamp: '2024-12-28T15:52:58.114Z'
top: false
description: >-
  adding eslint support to nextjs is definitely not as easy as the official
  claims!

  what happened?

  nextjs has supported eslint by default, then I thought "maybe a
keywords:
  - eslint
  - nextjs
  - prettier
author: Eddie Zhang
---

adding eslint support to nextjs is definitely not as easy as the official claims!

## what happened?

nextjs has supported eslint **by default**, then I thought "maybe a just need a .eslintrc file, how hard can it be?", then one afternoon of my life is ruined.
I copied my .eslintrc file from my old project, and I **promised** I exactly followed nextjs [migrate instruction](https://nextjs.org/docs/app/api-reference/config/eslint)

> tldr, nextjs prompts you to extend "next" in your own .eslintrc.json

then _nothing happened_ when I run "pnpm run lint", nextjs has no idea about my .eslintrc.json file.

```bash
# this popped up
 ⚠ The Next.js plugin was not detected in your ESLint configuration. See https://nextjs.org/docs/basic-features/eslint#migrating-existing-config
```

After ~~copying~~ referring to many stackoverflow/github issues, I decided to screw that [bullcrap](https://www.askdifference.com/bullcrap-vs-bullshit/) next lint, I do it my self!

these are necessary dependencies, notice they are all **devDependencies**

```json
"@typescript-eslint/eslint-plugin": "^8.18.2",
"@typescript-eslint/parser": "^8.18.2",// to let eslint understand typescript
"eslint": "^9.17.0",
"eslint-config-next": "^15.1.3",// to avoid conflict with nextjs eslint config
"eslint-config-prettier": "^9.1.0", //to avoid conflict with prettier config
"prettier": "^3.4.2",
```

then we will be okay...?

after eslint 9, .eslintrc files (js or json or whatever) are not supported, which means I have to make a eslint.config.mjs instead to let eslint cli know my config file

> is breaking changes ths mainstream in javascript? am I right, Nextjs official?

Good news is, eslint official tells me how to migrate to the new version:

```bash
pnpx @eslint/migrate-config .eslintrc.json

# these msgs will pop up
Migrating .eslintrc.json

Wrote new config to ./eslint.config.mjs

You will need to install the following packages to use the new config:
- globals
- @eslint/js
- @eslint/eslintrc

You can install them using the following command:

npm install globals @eslint/js @eslint/eslintrc -D

```

download...

actually we good,

```bash
pnpx @eslint/migrate-config .eslintrc.json && eslint --no-cache
```

eslint shouts, in the end.

## setup prettier

eslint shouts when our rules are broken, but prettier fix our code (kind of)

to introduce some plugins I am using:

```json
    "prettier-plugin-organize-imports": "^4.1.0",// this will conflict with eslint-import-sort, I recommend to use prettier
    "prettier-plugin-tailwindcss": "^0.6.9",// format tw classnames
```

go to your .prettierrc,

```json
  "plugins": [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-imports"
  ],
```

run `prettier write .` to format all the files in your project

> why this command can run globally?

modify my commends

```json
    "lint": "pnpx @eslint/migrate-config .eslintrc.json && eslint --no-cache",
    "format": "pnpm run lint && prettier --write .",
```

> I am not getting used to the latest eslint config syntax, you can make your own's

don't forget to go to next.config.ts

```ts
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  //...
};
```

since we run `format` every time before `build` so we don't need it anymore

currently I am making it into a git hook, I will write a new blog after I made it
