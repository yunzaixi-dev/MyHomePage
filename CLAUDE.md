# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (zaixi.dev) built with React, TypeScript, Vite, and Tailwind CSS. It displays GitHub profile information, projects, tech stack, and contact details with a dark/light theme toggle and an animated Three.js background.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Entry Point & Context
- [src/main.tsx](src/main.tsx) - Application entry, wraps App with ThemeProvider
- [src/App.tsx](src/App.tsx) - Root component, renders AnimatedBackground and MainPage

### Core Page
- [src/pages/main-page.tsx](src/pages/main-page.tsx) - Main page component that orchestrates all sections:
  - Fetches GitHub profile data on mount using GitHubService
  - Updates favicon from GitHub avatar
  - Manages responsive design and window width state
  - Handles slide-out contact menu and theme toggle
  - Renders all major sections: ProfileHeader, AboutMe, TechStack, ProjectCard grid, SocialLinks

### State Management
- [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx) - Theme context provider
  - Manages 'light' | 'dark' theme state
  - Persists theme in localStorage
  - Respects system preference on first load
  - Updates document.documentElement classes for global theme access

### Services
- [src/services/github.ts](src/services/github.ts) - GitHub API integration
  - GitHubService class fetches user profile and repositories
  - Uses axios with optional VITE_GITHUB_TOKEN for authentication
  - Fetches top 10 repos sorted by updated date
  - Filters out template repositories in UI

### Configuration
- [src/config/constants.ts](src/config/constants.ts) - Centralized constants
  - GITHUB_USERNAME: 'yunzaixi-dev'
  - Update this to change which GitHub profile is displayed

### Components
Components are in [src/components/](src/components/) and are presentational:
- [AnimatedBackground.tsx](src/components/AnimatedBackground.tsx) - Three.js particle background with mouse tracking
- [ProfileHeader.tsx](src/components/ProfileHeader.tsx) - GitHub avatar and name display
- [AboutMe.tsx](src/components/AboutMe.tsx) - Bio section from GitHub profile
- [TechStack.tsx](src/components/TechStack.tsx) - Technology icons grid
- [ProjectCard.tsx](src/components/ProjectCard.tsx) - Individual repository card
- [SocialLinks.tsx](src/components/SocialLinks.tsx) - Social media links section
- [ThemeToggle.tsx](src/components/ThemeToggle.tsx) / [ThemeButton.tsx](src/components/ThemeButton.tsx) - Theme switching UI

### Utilities
- [src/utils/favicon.ts](src/utils/favicon.ts) - Dynamic favicon update from GitHub avatar

### Styling
- Tailwind CSS for all styling
- Responsive breakpoints: sm (640px), lg (1024px)
- Theme-aware classes using `theme === 'dark' ? ... : ...` pattern
- Global styles in [src/index.css](src/index.css)

## Key Technical Details

### GitHub API Integration
- API calls happen in [src/services/github.ts](src/services/github.ts)
- Optional authentication via `VITE_GITHUB_TOKEN` environment variable
- Falls back to unauthenticated requests if token not provided
- Fetches user data and repositories in parallel using Promise.all

### Theme System
- Theme state lives in ThemeContext
- Access via `useTheme()` hook
- localStorage key: 'theme'
- CSS classes applied to document.documentElement

### Three.js Background
- 5000 particles rendered with THREE.Points
- Camera moves smoothly following mouse position
- Continuous rotation animation
- Properly cleaned up on unmount

### Environment Variables
Create `.env` file with:
```
VITE_GITHUB_TOKEN=your_github_token_here  # Optional, for higher API rate limits
```

## Making Changes

### To change the GitHub user displayed:
Edit [src/config/constants.ts](src/config/constants.ts) and update GITHUB_USERNAME

### To modify tech stack:
Edit the `techStack` array in [src/pages/main-page.tsx](src/pages/main-page.tsx)

### To change social links:
Edit the `socialLinks` array in [src/pages/main-page.tsx](src/pages/main-page.tsx)

### To adjust API calls:
Modify [src/services/github.ts](src/services/github.ts) - note the per_page and sort parameters in the repos endpoint
