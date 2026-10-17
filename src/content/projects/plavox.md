---
title: Plavox
summary: A collection of 1v1 mini-games built in Unity 6 with Photon Fusion — play online against another player or against a built-in AI bot.
role: Multiplayer Unity Developer
type: client
client: Renske
startDate: 2024-09-01
category: game
tags: [Unity 6, Photon Fusion, Photon Voice, Unity Addressables, Android, iOS]
features: [1v1 online multiplayer, AI opponent in every game, In-game voice chat, Games downloaded on demand]
logo: ../../assets/projects/plavox/logo.webp
logoBackground: "#ffffff"
cover: ../../assets/projects/plavox/poster.webp
video: /projects/plavox/promo.mp4
previewClip: /projects/plavox/promo.mp4
gallery:
  - ../../assets/projects/plavox/screenshot-1.webp
  - ../../assets/projects/plavox/screenshot-2.webp
  - ../../assets/projects/plavox/screenshot-3.webp
  - ../../assets/projects/plavox/screenshot-4.webp
galleryAlt:
  - "Promo title card: #1 India's first real time gaming platform"
  - "Promo title card: 100+ titles, over a wall of Plavox games"
  - "Promo title card: gaming universe, with the Plavox logo"
  - "The Plavox logo on a stage under purple spotlights"
---
Plavox is a collection of 1v1 mini-games (real-time and turn-based) built in **Unity 6** with **Photon Fusion** for online multiplayer. Every game can be played against another player online or against a built-in AI bot. All games run inside one shared platform layer that handles matchmaking, game start, scoring, voice chat and reporting the result back to a host mobile app.

## Platform highlights

- **One entry point for every game.** A host mobile app sends match parameters as JSON (game ID, player IDs, match ID). The right game scene is then loaded, either from the build or downloaded on demand with **Unity Addressables**.
- **Photon Fusion networking.** Two-player sessions with one host who holds authority, created automatically per match. The fastest region is chosen by ping, and the client reconnects if the connection drops in the lobby.
- **Shared "ready" system.** Every system in a scene (boards, score managers, spawners) registers what it needs to set up. The match only starts when both players have finished setting up.
- **Shared, server-authoritative scoring and turn systems**, written once as generic base classes and reused by every game.
- **Built-in AI opponents** for every game, so a match can be played instantly without waiting for a second player.
- **In-game voice chat** with **Photon Voice**: mic and speaker toggles, mute status shared with the opponent, and handling of Android/iOS microphone permission.
- **Result reporting.** At the end of a match a JSON event (win, draw or abort, with scores) is sent to the host app on Android or iOS.
