---
title: Paraglide Prototype
category: game
summary: A low-poly 3D paragliding game made in Unity. Steer through a course of floating portals and use wind currents to keep your altitude.
type: client
role: Solo Unity Developer
startDate: 2025-08-01
endDate: 2025-08-01
tags: [Unity 6, C#, TextMesh Pro]
features: [Custom flight model, Wind currents, Ordered portal course, Directional audio]
logo: ../../assets/projects/paraglide/logo.webp
cover: ../../assets/projects/paraglide/cover.webp
video: /projects/paraglide/reel.mp4
previewClip: /projects/paraglide/preview.mp4
gallery:
  - ../../assets/projects/paraglide/screenshot-1.webp
  - ../../assets/projects/paraglide/screenshot-2.webp
  - ../../assets/projects/paraglide/screenshot-3.webp
  - ../../assets/projects/paraglide/screenshot-4.webp
galleryAlt:
  - "The paraglider flies through a large green portal over the forest"
  - "Portals and wind streaks along a hillside, with the score and timer at the top"
  - "Wind streaks sweep past the paraglider above the treeline"
  - "Flying toward a portal with wind streaks blowing across the slope"
---
Built solo as a gameplay demo, so a company could get a feel for how the game plays before deciding whether to invest in having the full game made.

You fly a paraglider through a low-poly environment, steering through a course of floating portals and using wind currents to keep your altitude. You are scored on how many portals you pass and timed on how long the course takes.

## Gameplay

- **Fly the course:** there are 7 portals that must be flown through in order. Only the next portal in the sequence counts, so you can't skip ahead.
- **Follow the arrow:** a 3D arrow always points to the next portal. When the last portal is cleared, the arrow disappears.
- **Ride the wind:** the paraglider slowly loses altitude. Wind areas push you along their direction while you are inside them, and the push carries on for a short moment after you leave, so you can use them as updrafts or boosts.
- **Score and timer:** every portal passed adds a point and plays a sound. A timer counts the seconds since the flight started.

## Controls

- **A / D or ← / →:** turn left / right (the glider banks into the turn)
- **W / S or ↑ / ↓:** pitch nose down to dive / nose up to level out
- **R:** restart the flight

## Tech highlights

- **Custom flight model:** gravity is turned off on the Rigidbody, and the script sets the velocity directly every physics step. That velocity combines forward speed, lift, sink rate and any active wind. Pitch and bank are smoothed with interpolation, and the glider returns to level when you let go of the controls.
- **Wind system:** wind areas are trigger volumes whose push follows each volume's own forward direction. There are two modes: **Continuous**, which pushes while you are inside and keeps a short push after you exit, and **Boost**, a one-time push for a set duration.
- **Ordered checkpoints:** a `PortalManager` keeps the portals in a queue and raises a `UnityEvent` when the next one is passed. The score, the arrow and the portal removal all listen to that event, so these systems don't depend on each other directly.
- **Directional audio:** wind sound pans left or right in stereo as you bank, for a sense of direction while you turn.
- **Smooth follow camera:** a third-person camera eases into position behind and above the glider and always looks at it.
- **Singleton managers** (`GameManager`, `PortalManager`, `ScoreManager`, `SceneRefrences`) give each system one central place to access it from.

## Status

This is a prototype. The core flying, wind, checkpoint, scoring and timing loop works. There is no title screen or end-of-course screen yet.

Art: paraglider character (Mixamo rig), portal and arrow models, plus low-poly environment packs from Polytope Studio, Skyden Games, AngeloMaN87, LowPoly Environment Pack and Flat Textures Pack, and particle effects from JMO Cartoon FX Remaster.
