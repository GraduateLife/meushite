---
slug: xcode-pitfalls
title: Xcode Pitfalls
timestamp: '2024-12-28T15:44:51.166Z'
top: false
description: >-
  sudo xcode-select -s /Applications/Xcode.app

  go to https://developer.apple.com/download/all/?q=Xcode to download ios
  runtime manually

  xcodebuild -runFirstLaunch
keywords: []
author: Eddie Zhang
---

sudo xcode-select -s /Applications/Xcode.app

go to https://developer.apple.com/download/all/?q=Xcode to download ios runtime manually

xcodebuild -runFirstLaunch

xcrun simctl runtime add "~/Downloads/<the dmg file name>"

Accessing '/Users/<Username>/Downloads/<somewhat.dmg>' requires Security & Privacy approval.

go to your mac, Security & Privacy > Full disk access > Give **terminal** full permission

⬇️ means ok
D: 134B74D0-63F2-43ED-9E2B-21B5739CA8A5 iOS (18.2 - 22C150) (Ready)
