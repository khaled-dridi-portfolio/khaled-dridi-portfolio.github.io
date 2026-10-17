---
title: Object Finder
summary: "A visual search race. Spot the target picture among the scattered objects faster than your opponent."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/object-finder/logo.webp
cover: ../../assets/projects/object-finder/poster.webp
video: /projects/object-finder/reel.mp4
previewClip: /projects/object-finder/reel.mp4
gallery:
  - ../../assets/projects/object-finder/screenshot-1.webp
  - ../../assets/projects/object-finder/screenshot-2.webp
  - ../../assets/projects/object-finder/screenshot-3.webp
  - ../../assets/projects/object-finder/screenshot-4.webp
galleryAlt:
  - "Cannon explosion on the red ship, starfish target"
  - "Hit flash, beach-ball target"
  - "Explosion, watermelon target"
  - "Big hit flash on the blue ship, crab target"
---
## Tech highlights

Pictures are placed without overlapping using random placement with retries. A wave shader animates the background.

## Gameplay

A target picture is shown and 9 pictures are scattered on the board. Tap the one that matches. The board reshuffles after every tap.

## How to win

Correct taps score +1 and wrong taps −1. The first to 15 wins, otherwise the highest score after 60 seconds wins.

## Opponent & AI

Both players race at the same time. The bot finds each target in 2 seconds, so you have to be quicker.
