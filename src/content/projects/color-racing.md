---
title: Color Racing
summary: "A color-reaction race. Tap the matching color as fast as you can to pedal your bike to the finish line."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/color-racing/logo.webp
cover: ../../assets/projects/color-racing/poster.webp
video: /projects/color-racing/reel.mp4
previewClip: /projects/color-racing/reel.mp4
gallery:
  - ../../assets/projects/color-racing/screenshot-1.webp
  - ../../assets/projects/color-racing/screenshot-2.webp
  - ../../assets/projects/color-racing/screenshot-3.webp
  - ../../assets/projects/color-racing/screenshot-4.webp
galleryAlt:
  - "Race start, score 0–0"
  - "Tied 14–14 mid-race"
  - "The player taps a colour button, cyclists side by side"
  - "Both cyclists at the finish flag"
---
## Tech highlights

Picks are checked and scored by the server. The bike progress bars show each player's live score. Clouds scroll using a texture-offset effect.

## Gameplay

A target color appears. Tap the matching button (red, green, blue or yellow) within 1.5 seconds.

## How to win

Correct taps score +1 and wrong taps −1. Your bike moves along a progress track, and the first to 51 wins.

## Opponent & AI

Both players race at the same time. The bot moves forward at a steady pace of one point per second.
