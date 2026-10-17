---
title: Partagi
category: app
summary: "A social app for discovering and booking events, with posts, real-time chat and QR-code tickets. Built with Flutter and Django."
type: freelance
role: Co-developer (team of two)
tags: [Flutter, Django, WebSockets, PostgreSQL, Redis]
features: [Event Booking & QR Tickets, Social Feed, Real-time Chat, Live Notifications]
logo: ../../assets/projects/partagi/logo.webp
cover: ../../assets/projects/partagi/cover.webp
video: /projects/partagi/reel.mp4
shareImage: ../../assets/projects/partagi/share.jpg
previewClip: /projects/partagi/reel.mp4
gallery:
  - ../../assets/projects/partagi/screenshot-1.webp
  - ../../assets/projects/partagi/screenshot-2.webp
  - ../../assets/projects/partagi/screenshot-3.webp
  - ../../assets/projects/partagi/screenshot-4.webp
  - ../../assets/projects/partagi/screenshot-5.webp
  - ../../assets/projects/partagi/screenshot-6.webp
  - ../../assets/projects/partagi/screenshot-7.webp
  - ../../assets/projects/partagi/screenshot-8.webp
galleryAlt:
  - "Select Interests: sport and activity tiles such as Padel, Soccer, Tennis and Swimming"
  - "Choose on Map: an OpenStreetMap map of Tunis with a location pin"
  - "Social feed: a post box, Friends Events with a tennis final and a beach volleyball meetup, and people you follow"
  - "Event page: Test Event on Sunday, February 01, 2026 with tags, description, a 25 TND price and a Get a Ticket button"
  - "Booking confirmed: \"You're In!\" with what happens next, View Ticket and Join Chat buttons"
  - "Your Ticket: a QR code with booking reference BK491C2823 to show at the event entrance"
  - "Event group chat: messages from three members"
  - "New Group Chat: group name, private group and allow media switches, and a max members slider"
links:
  live: https://partagi-web.onrender.com
draft: false
---
Partagi is a social event platform that brings people together around activities. Users can find
events by category, location or search, book a spot, add events to their calendar and get automatic
reminders. Around the events there's a full social layer: posts with photos and comments, likes,
saves, mentions, following, live chat (direct messages and group chats with read receipts) and
instant notifications.

The app runs on Android and the web from one Flutter codebase. It's backed by a Django REST API with
real-time WebSockets, and the whole thing is hosted in the cloud.

## Key features

- **Event discovery and booking:** browse by category, use advanced search and map-based location picking, keep a wishlist, book events, get QR-code tickets, write reviews and add events to your calendar
- **Smart reminders:** reminders are scheduled automatically when you book, and run in the background
- **Social feed:** posts with images, comments, likes, saved posts, @mentions, trending posts and post analytics
- **Real-time chat:** direct messages, message requests, group chats with invites, reactions and read receipts, and privacy settings
- **Live notifications:** pushed instantly over WebSockets
- **Two account types:** regular users ("players") and venue owners/organizers, with JWT login and automatic session refresh

## Tech stack

- **Mobile and web app:** Flutter (Dart), Riverpod, OpenStreetMap
- **Backend:** Python, Django, Django REST Framework, Django Channels and Daphne (WebSockets), Celery for background jobs
- **Data and infrastructure:** PostgreSQL (Supabase), Redis, Supabase Storage for media, deployed on Render with a live web app and an Android APK

The live demo is on free hosting, so the first visit may take a moment to wake up.
