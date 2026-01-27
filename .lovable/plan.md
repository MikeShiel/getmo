

# 🎮 NeonPlay Gaming Platform - Implementation Plan

## Overview
A premium HTML5 gaming platform with a dark "gamer" aesthetic featuring neon accents and high-end glassmorphism. The platform supports three user tiers: Guests (5 free games), Registered users (browse only), and Premium subscribers (full access).

---

## 🏠 Home Screen

### Hero Section
- Full-width featured game spotlight with dynamic background
- Large "Play Now" CTA with game title and description
- Animated neon glow effects and glassmorphism overlay

### Game Rows
- **"Try 5 Free Games"** - Highlighted section for guest conversion
- **"Trending Now"** - Games sorted by popularity
- **"Most Loved"** - Community favorites with rating indicators
- Horizontal scrollable carousels with hover effects
- Game cards showing thumbnail, title, and "Free" badge where applicable

---

## 🎯 Product Detail Page (PDP)

### Game Player
- Large iframe window for embedded HTML5 games (mock URLs from your JSON)
- Fullscreen toggle and mute controls
- Tier-gated access: Guests see free games, Registered users see subscribe modal, Premium gets full access

### Game Info Panel
- Screenshot gallery carousel
- Publisher, genre, and rating metadata
- Description and gameplay tags

### Sidebar
- "Recommended Games" based on genre
- Quick-play buttons for similar titles

---

## 🚪 Exit-Intent Modal

### Trigger Behavior
- Detects mouse movement toward browser close/back
- "Don't Leave Yet!" modal with neon styling

### Options
- **"Next Game"** - Suggests a random game from library
- **"Keep Playing"** - Dismisses modal and returns to game

---

## 🔐 Authentication System

### Auth Page
- Email & Password registration and login
- Dark themed with neon input styling
- Form validation with friendly error messages
- Auto-redirect to home when authenticated

### Tier Logic
- **Guest**: Can play `is_free: true` games (max 5)
- **Registered**: Browse all, "Subscribe" modal on premium game play
- **Premium**: Full library access

---

## 💳 Subscription Modal (Mock)

### Subscribe Prompt
- Triggered when registered user clicks "Play" on premium game
- "$5/month for unlimited gaming" messaging
- Mock "Subscribe Now" button (UI-ready for future Stripe integration)
- Glassmorphism card design with neon accents

---

## 👤 Profile Tab

### Account Settings
- Gamer Name (editable)
- Email display
- Password change form

### Subscription Info
- Current tier display (Free/Premium)
- Mock billing date and plan details
- "Upgrade/Cancel" buttons (non-functional for now)

### Preferences
- **Language Toggle**: English ↔ Spanish (EN/ES)
- **Theme Toggle**: Dark ↔ Light mode
- Settings persist in local storage

---

## 🧭 Navigation Bar

### Left Section
- Animated logo with neon glow

### Center Section
- **XP Progress Bar** (visual only)
- Level indicator and progress percentage
- Glowing animated fill effect

### Right Section
- **"Install App"** PWA button (enabled after PWA setup)
- User avatar/login button
- Mobile hamburger menu

---

## 📝 Footer

### Links
- **Contact Us** - Leads to contact form page
- **Terms & Conditions** - Static legal page
- **Privacy Policy** - Static legal page

### Contact Form
- Name, Email, Subject, Message fields
- Toast notification on submit (no backend)

---

## 🎨 Design System

### Color Palette
- **Background**: Deep dark (#0a0a0f)
- **Primary Neon**: Electric cyan (#00fff7)
- **Secondary Neon**: Hot pink (#ff00ff) / Purple (#9945ff)
- **Cards**: Semi-transparent glassmorphism with blur effects

### Effects
- Glassmorphism panels with backdrop blur
- Neon glow shadows on interactive elements
- Smooth hover animations and transitions
- Subtle gradient overlays

---

## 📊 Database Schema (Supabase)

### Games Table
- `id`, `title`, `description`, `thumbnail`, `game_url`
- `is_free`, `is_featured`, `genre`, `publisher`
- `screenshots`, `created_at`

### Profiles Table
- `id`, `user_id`, `gamer_name`, `avatar_url`
- `xp_level`, `language`, `theme_preference`
- `is_premium` (mock subscription flag)

---

## 📱 PWA Support
- Service worker registration
- App manifest with icons
- "Install App" button in navigation
- Offline-capable shell

---

## 🚀 Deliverables Summary

1. **5 Main Pages**: Home, Game Detail, Profile, Contact, Auth
2. **3 Static Pages**: Terms, Privacy, 404
3. **Reusable Components**: Game cards, modals, navigation, footer
4. **Responsive Design**: Mobile-first with desktop optimization
5. **Supabase Integration**: Auth + database for games and profiles
6. **Mock Data Ready**: Placeholder JSON structure for your game content

