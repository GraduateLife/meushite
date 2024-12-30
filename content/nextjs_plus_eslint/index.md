---
slug: nextjs_plus_eslint
title: Nextjs_plus_eslint
timestamp: '2024-12-28T15:52:58.114Z'
top: false
description: |-
  "@typescript-eslint/eslint-plugin": "^8.18.2",
  "@typescript-eslint/parser": "^8.18.2",
  "eslint": "^9.17.0",
  "eslint-config-next": "^15.1.3",
  "eslint-config-pret
keywords: []
author: Eddie Zhang
---

"@typescript-eslint/eslint-plugin": "^8.18.2",
"@typescript-eslint/parser": "^8.18.2",
"eslint": "^9.17.0",
"eslint-config-next": "^15.1.3",
"eslint-config-prettier": "^9.1.0",
"eslint-define-config": "^2.1.0",
"prettier": "^3.4.2",
"prettier-plugin-tailwindcss": "^0.6.9",

create a .prettierrc file

{
"plugins": ["prettier-plugin-tailwindcss"],
...any other rules you like
}

and a eslintrc.js file, in my file I especially add following stuffs

```js
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'prettier',
  ],
  ignorePatterns: ['components/ui/**/*'],// shadcn components folder
```

hence, when you run "lint", eslint shouts,

what if I want to fix my documents? this is the thing goes tricky.

you may thought just like eslint conmands "next lint --fix ."? no!

use "prettier --write ." to fix your document

then, what if I
