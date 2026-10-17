---
title: Sliding Puzzle
summary: "A head-to-head 15-puzzle race. Slide the tiles to rebuild the picture before your opponent."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/sliding-puzzle/logo.webp
cover: ../../assets/projects/sliding-puzzle/poster.webp
video: /projects/sliding-puzzle/reel.mp4
previewClip: /projects/sliding-puzzle/reel.mp4
gallery:
  - ../../assets/projects/sliding-puzzle/screenshot-1.webp
  - ../../assets/projects/sliding-puzzle/screenshot-2.webp
  - ../../assets/projects/sliding-puzzle/screenshot-3.webp
  - ../../assets/projects/sliding-puzzle/screenshot-4.webp
galleryAlt:
  - "The solved picture at race start"
  - "Both boards scrambled mid-race"
  - "The picture coming together"
  - "Endgame, both boards nearly solved"
---
## Tech highlights

A high-performance solver: board states are packed into 64-bit integers and searched with a binary-heap open list and hash lookups, with the work spread across frames so the game never freezes. Every scramble is checked to be solvable. Board state is synced over the network with RPCs.

## Gameplay

A 4×4 sliding puzzle made from a picture. Tap a tile next to the empty space to slide it. You can watch your opponent's board live.

## How to win

The first to solve their puzzle wins. Otherwise, after 5 minutes, whoever has more tiles in the correct place wins.

## Opponent & AI

Both players solve their own puzzles at the same time. The bot works out a solution with a custom **weighted A\* solver**, then plays one move every 3 seconds.
