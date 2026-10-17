---
title: Word Search
summary: "A hexagon word-hunt battle. Swipe across connected letters to find hidden words before time runs out."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Turn-based 1v1, AI bot opponent]
logo: ../../assets/projects/word-search/logo.webp
cover: ../../assets/projects/word-search/poster.webp
video: /projects/word-search/reel.mp4
previewClip: /projects/word-search/reel.mp4
gallery:
  - ../../assets/projects/word-search/screenshot-1.webp
  - ../../assets/projects/word-search/screenshot-2.webp
  - ../../assets/projects/word-search/screenshot-3.webp
  - ../../assets/projects/word-search/screenshot-4.webp
galleryAlt:
  - "The word BALL found, with fireworks and a time bonus"
  - "The board with 5 words found"
  - "The opponent's turn (yellow board)"
  - "The player tracing PARK"
---
## Tech highlights

The server builds the board each turn: it hides 6 words of different lengths along random paths of neighbouring tiles and fills the rest with random letters. The word list is sent to both players over the network.

## Gameplay

Swipe across neighbouring hexagon tiles to spell words. Swiping back over a tile undoes it, and arrows show your path.

## How to win

Each word scores its length. Players take turns of 10 seconds, with +2 seconds for every word found. The match lasts 2 minutes.

## Opponent & AI

Turn-based. The bot picks one of the hidden words, finds a path to it with a depth-first search, and swipes it tile by tile.
