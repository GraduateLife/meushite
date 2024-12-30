---
slug: client-components
title: What Exactly Is "use client" In Nextjs?
timestamp: '2024-12-26T13:03:46.107Z'
top: false
description: >-
  the 'use client' directive is a confusing content in Nextjs, because it
  actually differs from the conventional acknowledgement to client side
  rendering.
keywords:
  - Nextjs
  - use client
author: Eddie Zhang
---

the 'use client' directive is a confusing content in Nextjs, because it actually differs from the conventional acknowledgement to client side rendering

## How?

let's make an example, you will get what I mean.

```typescript
export const LOG = () => {
  if (typeof window !== undefined) {
    console.log('I am on client side');
  }
  if (process.env.NODE_ENV) {
    console.log('I am on server side');
  }
};
```

let's use it to page component

```ts
import { LOG } from '@/lib/LOG';

const Page = () => {
  LOG();
};

export default Page;
```

the function logs **both** in my terminal and in my browser, it is quite reasonable because nextjs uses SSR

let' add 'use client' notation to the page

```ts
'use client';

import { LOG } from '@/lib/LOG';

const Page = () => {
  LOG();
};

export default Page;
```

the function still logs in both of my terminal and my browser, but it logs twice in the browser (due to react strict mode)

See? 'use client' still uses SSR, hence actually the full name of 'use client' is actually 'use client feature', not 'use client rendering', that's a huge difference.

## So why nextjs invent it?

See the [doc](https://nextjs.org/docs/app/building-your-application/rendering/client-components).
nextjs has two separate strategies to make it happen:

1. **Full page load**:

   nextjs renders a **full page of static HTML** on server side, then use js script to append browser features on client side.

2. **Subsequent navigation**:

   First, what is "subsequent navigation"? I believe nextjs document didn't explain it well. But it sounds like "client navigation" to me, probably it means the Link component in next/link. Anyway, in this case, nextjs directly sends js bundle to browser, this is the real "client side rendering".

by marking 'use client' at the top of the tsx file, obviously nextjs uses the first strategy, because these components still use SSR, just like the example above.

Then, it makes great sense to explains why nextjs mentions the [unsupported pattern in using client components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#unsupported-pattern-importing-server-components-into-client-components)

because initially all the components are rendered on server side, when hydration happens on client side, it means the render is done, then nextjs cannot go back to server side to handle server features. have to use the 'use server' directive to handle server features.

## Key points

1. client components are more than the components use 'use client'
2. the components use 'use client' are hydrated on client side
3. the components use 'use client' are rendered on server side (at first stage)
4. 'use server' can only be used in the components use 'use client'

## Extra

somebody thinks maybe it causes hydration error because of the "use client" directive, but actually it is not.

```ts
const Page = () => {
  return (
    <p>
      <h3>This is index</h3>
    </p>
  );
};
```

This code causes hydration error, because the this is invalid html structure (p tags can only contain inline elements, h3 is block element)
