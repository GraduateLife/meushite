---
slug: xcode-pitfalls
title: the correct way to download ios runtime
timestamp: '2024-12-28T15:44:51.166Z'
top: false
description: >-
  the general workflow is to download ios runtime in xcode, but xcode shouted
  download is failed

  > this is not only for me, lots of developers reported this issue
keywords:
  - xcode
  - ios runtime
author: Eddie Zhang
---

the general workflow is to download ios runtime in xcode, but xcode shouted download is failed

> this is not only for me, lots of developers reported this issue, I think it's Apple's fault.

then we have to download it manually.

go to <https://developer.apple.com/download/all/?q=Xcode> to download ios runtime you like.

> tips for Chinese developers, you need a 🪜 for normal access

After your dmg file is downloaded, then go to your shell,

```bash
# tell which xcode to load you ios, mine is at default path
sudo xcode-select -s /Applications/Xcode.app
xcodebuild -runFirstLaunch
xcrun simctl runtime add "~/Downloads/<somewhat.dmg>"
```

the forgoing is what Apple doc told you, but what it hasn't told you is:

```bash
Accessing '/Users/<Username>/Downloads/<somewhat.dmg>' requires Security & Privacy approval.
```

since terminal cannot add files to disk by default,

you should go to your mac settings, Security & Privacy > Full disk access > Give **terminal** full permission

run those bash commands again,

```bash
D: 134B74D0-63F2-43ED-9E2B-21B5739CA8A5 iOS (18.2 - 22C150) (Ready)
# if this pops up means you are okay
```

Then you can play iphone 16 in your mac!
