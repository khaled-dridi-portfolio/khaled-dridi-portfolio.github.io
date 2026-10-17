---
title: Evil Bats
summary: "A slingshot shooter. Pull back, aim, and knock down the bats before your opponent does."
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
parent: plavox
tags: [Unity 6, Photon Fusion]
features: [Real-time 1v1, AI bot opponent]
logo: ../../assets/projects/evil-bats/logo.webp
cover: ../../assets/projects/evil-bats/poster.webp
video: /projects/evil-bats/reel.mp4
previewClip: /projects/evil-bats/reel.mp4
gallery:
  - ../../assets/projects/evil-bats/screenshot-1.webp
  - ../../assets/projects/evil-bats/screenshot-2.webp
  - ../../assets/projects/evil-bats/screenshot-3.webp
  - ../../assets/projects/evil-bats/screenshot-4.webp
galleryAlt:
  - "Slingshot pulled back at a bat swarm"
  - "Aiming at a 3×3 grid of bats"
  - "A level with moving walls"
  - "Final wave with spiked mines and walls"
---
## Tech highlights

Projectiles are networked objects spawned by the server. The slingshot pull is synced live while aiming. The rubber band is drawn with a LineRenderer.

## Gameplay

Drag back on the slingshot and release to fire. Shots bounce off logs and are destroyed by spikes, and some bat formations rotate.

## How to win

Each bat hit is +1 to whoever hits it first. You have 3 shots per round across 7 bat formations. The first to 60 wins, otherwise the highest total wins.

## Opponent & AI

Both players shoot at the same time at the same bats. The bot aims at the nearest bat and is accurate 60% of the time; otherwise its aim is a little off.
