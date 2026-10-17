---
title: Battle Tanks
summary: "A 2D artillery duel with destructible terrain. Charge your shot, aim your arc, and be the first to destroy the enemy tank."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/battle-tanks/logo.webp
cover: ../../assets/projects/battle-tanks/poster.webp
video: /projects/battle-tanks/reel.mp4
previewClip: /projects/battle-tanks/reel.mp4
gallery:
  - ../../assets/projects/battle-tanks/screenshot-1.webp
  - ../../assets/projects/battle-tanks/screenshot-2.webp
  - ../../assets/projects/battle-tanks/screenshot-3.webp
  - ../../assets/projects/battle-tanks/screenshot-4.webp
galleryAlt:
  - "A shell hits the ground, punching a crater in the terrain"
  - "A big explosion just above the blue tank"
  - "A direct hit on the red tank"
  - "A mid-air explosion over cratered terrain"
---
## Tech highlights

Destructible terrain that erases pixels from the ground texture at runtime and rebuilds the 2D collider. Shots are synced over the network with RPCs. Birds are spawned by the server and can be shot down. An off-screen arrow follows rockets that leave the top of the screen.

## Gameplay

Your barrel swings back and forth on its own. Hold to charge the power bar, then release to fire a rocket on a physics-driven arc. Shots blow holes in the ground.

## How to win

Each tank has 5 HP and each hit removes 1. The first tank to reach 0 loses.

## Opponent & AI

Both players fire at the same time (not turn-based). The bot calculates a ballistic arc to your tank every 3 seconds and adds deliberate random error, so it feels human.
