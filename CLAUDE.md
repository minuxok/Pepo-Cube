# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Augmented Reality (AR) application built with **MindAR** and **Three.js** for image tracking. The app recognizes 5 different fish image targets and plays corresponding audio files. It's designed as a mobile-first web application that runs in the browser.

## Architecture

### Core Components

- **main.js**: Primary application logic containing:
  - `AudioManager` class: Handles audio playback with pause/resume functionality for app backgrounding
  - AR initialization and target setup using MindAR-Three
  - Event handlers for target found/lost states
  - Mobile device optimization and responsive handling

- **index.html**: Complete standalone HTML file with:
  - ES6 module imports for Three.js and MindAR
  - Responsive CSS with custom AR scanning UI
  - Mobile-optimized viewport and controls

### Key Features

- **Image Target Recognition**: Uses MindAR to detect 5 fish images (Barbo, Pepo, Trota, Tinca, Arborella)
- **Positional Audio**: Each target plays a specific audio file using Three.js PositionalAudio
- **App State Management**: Automatically pauses/resumes audio when app goes to background/foreground
- **Mobile Responsive**: Handles orientation changes and touch interactions
- **Custom Scanning UI**: Animated scanning interface with colored corners and moving scanline

### File Structure

```
/assets/
  /audio/          - Audio files (audio_0.mp3 to audio_4.mp3, plus guida.mp3)
  /targets/        - MindAR target files (targets-pepo.mind)
/libs/             - Three.js library files (local fallback)
index.html         - Main HTML file with embedded styles
main.js            - Core AR application logic
```

## Development

### Running the Application

This is a client-side web application that requires:

1. **Local Server**: Must be served over HTTP/HTTPS (not file://) for camera access
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

2. **HTTPS for Mobile**: Mobile devices require HTTPS for camera access in production

### Dependencies

External dependencies loaded via CDN:
- **Three.js v0.147.0** - 3D rendering engine
- **MindAR v1.2.5** - AR image tracking library
- **ES Module Shims** - Module loading support for older browsers

### Configuration Constants

Located in main.js:
- `NUM_TARGETS = 5` - Number of image targets
- `AUDIO_PATH = './assets/audio/'` - Audio files directory
- `MIND_PATH = './assets/targets/targets-pepo.mind'` - MindAR target file

### Audio Management

The `AudioManager` class handles:
- Automatic pause/resume when app goes to background/foreground
- Prevention of multiple audio playback
- Mobile-specific audio context management
- User interaction requirements for audio unlock

### Target Configuration

Image targets are mapped as follows:
- Target 0: Barbo → audio_0.mp3
- Target 1: Pepo → audio_1.mp3  
- Target 2: Trota → audio_2.mp3
- Target 3: Tinca → audio_3.mp3
- Target 4: Arborella → audio_4.mp3

## Mobile Considerations

- Uses responsive viewport meta tag
- Handles orientation changes automatically  
- Implements touch-friendly UI controls
- Manages audio context for mobile browsers
- Custom CSS animations for scanning feedback

## Debugging

Enable debug output by checking browser console. The app logs:
- AR initialization steps
- Audio loading progress
- Target detection events
- App pause/resume states
- Error conditions

## Browser Compatibility

- Modern browsers with WebRTC support
- Mobile: iOS Safari 12+, Chrome for Android
- Desktop: Chrome 80+, Firefox 75+, Safari 13+
- Requires camera permissions