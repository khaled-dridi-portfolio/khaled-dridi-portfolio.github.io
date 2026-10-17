---
title: Ninja Runner
summary: "A gravity-flipping endless runner. Tap to switch between floor and ceiling, grab coins, and dodge spikes."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/ninja-runner/logo.webp
cover: ../../assets/projects/ninja-runner/poster.webp
video: /projects/ninja-runner/reel.mp4
previewClip: /projects/ninja-runner/reel.mp4
gallery:
  - ../../assets/projects/ninja-runner/screenshot-1.webp
  - ../../assets/projects/ninja-runner/screenshot-2.webp
  - ../../assets/projects/ninja-runner/screenshot-3.webp
  - ../../assets/projects/ninja-runner/screenshot-4.webp
  - ../../assets/projects/ninja-runner/screenshot-5.webp
  - ../../assets/projects/ninja-runner/screenshot-6.webp
  - ../../assets/projects/ninja-runner/screenshot-7.webp
galleryAlt:
  - "Race start, both ninjas jumping"
  - "A close score, both ninjas airborne"
  - "A gravity flip between floor and ceiling"
  - "Late game, running past coins"
  - "Trailer: Collect Coins — the ninja leaps over a torii gate"
  - "Trailer: Dodge the thorn — a spike on the track beside a coin"
  - "Trailer: One Slip. Game Over. — the ninja hits a spike"
---
## Tech highlights

Split-screen with two cameras. Both players' obstacles are spawned at the same place but kept apart with physics layers and camera culling masks, so each runner only ever touches and sees its own course. Obstacle patterns are chosen by the server and sent to both players with RPCs.

## Gameplay

Obstacles scroll toward your ninja. Tap to flip between the floor and the ceiling.

## How to win

Coins score +1 and spikes −1. The highest score after 3 minutes wins.

## Opponent & AI

Both players play at the same time, split-screen, on identical courses. The bot detects spikes ahead and flips to avoid them 90% of the time.
