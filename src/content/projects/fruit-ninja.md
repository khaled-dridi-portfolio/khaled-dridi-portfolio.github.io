---
title: Fruit Ninja
summary: "A swipe-to-slice arcade battle. Slice flying fruit, avoid the bombs, and outlast your opponent."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/fruit-ninja/logo.webp
cover: ../../assets/projects/fruit-ninja/poster.webp
video: /projects/fruit-ninja/reel.mp4
previewClip: /projects/fruit-ninja/reel.mp4
gallery:
  - ../../assets/projects/fruit-ninja/screenshot-1.webp
  - ../../assets/projects/fruit-ninja/screenshot-2.webp
  - ../../assets/projects/fruit-ninja/screenshot-3.webp
  - ../../assets/projects/fruit-ninja/screenshot-4.webp
galleryAlt:
  - "A watermelon and pear combo slice"
  - "A bomb explosion"
  - "A pineapple and apple slashed with a big splash"
  - "An apple and banana combo; split-screen with one half mirrored for the opponent"
---
## Tech highlights

Slicing logic driven by the angle of the swipe. Waves are spawned by the server with growing difficulty. A combo system. A camera-shake package is used for explosion feedback.

## Gameplay

Swipe across the screen to slice fruit. Each fruit splits into two 3D halves according to the swipe angle, and the halves are pushed apart by physics. Bombs explode with a camera shake.

## How to win

Each fruit is +1. Hitting 3 bombs loses the match.

## Opponent & AI

Both players play at the same time, and each gets an identical, separate wave of fruit. Waves come faster as the match goes on.
