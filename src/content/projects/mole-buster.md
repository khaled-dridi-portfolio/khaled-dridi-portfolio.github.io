---
title: Mole Buster
summary: "Competitive whack-a-mole. Tap the moles before your opponent does, and keep up as they get faster."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/mole-buster/logo.webp
cover: ../../assets/projects/mole-buster/poster.webp
video: /projects/mole-buster/reel.mp4
previewClip: /projects/mole-buster/reel.mp4
gallery:
  - ../../assets/projects/mole-buster/screenshot-1.webp
  - ../../assets/projects/mole-buster/screenshot-2.webp
  - ../../assets/projects/mole-buster/screenshot-3.webp
  - ../../assets/projects/mole-buster/screenshot-4.webp
galleryAlt:
  - "A hit on a crowned mole, showing +1"
  - "Two moles at once, a crown flying off"
  - "A hit during the busy final stretch"
  - "Final moments, with a star burst"
---
## Tech highlights

Moles are networked objects spawned by the server, which also tracks which holes are free. Difficulty goes up in stages (moles appear more often and hide sooner). Moles come in random looks.

## Gameplay

Moles pop up from 11 holes. Tap them to hit them.

## How to win

Each hit is +1, and only the first player to hit a mole scores it. The first to 51 wins.

## Opponent & AI

Both players play at the same time on one shared board. The bot rushes to the nearest mole that hasn't been hit.
