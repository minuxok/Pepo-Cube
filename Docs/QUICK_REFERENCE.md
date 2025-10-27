# 🚀 Quick Reference Guide - WebAR Development

## ⚡ Comandi Rapidi

### Avvio Server Locale
```bash
# Python
python -m http.server 8080

# Node.js
npx serve -p 8080

# PHP
php -S localhost:8080
```

### Debug Mode
```
URL + ?debug=1
Esempio: http://localhost:8080/?debug=1
```

### Compilazione Target
1. https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Upload immagini
3. Download `.mind` file
4. Sostituisci in `assets/targets/`

---

## 📋 Checklist Pre-Deploy

- [ ] Test su iPhone (Safari)
- [ ] Test su Android (Chrome)
- [ ] Test orientamento portrait/landscape
- [ ] Verifica HTTPS attivo
- [ ] Comprimi asset audio/video
- [ ] Test con diverse illuminazioni
- [ ] Verifica compatibilità browser
- [ ] Test performance (FPS ≥30)
- [ ] Disabilita debug mode
- [ ] Aggiorna README con info deploy

---

## 🎯 Parametri Principali

### CONFIG Object
```javascript
const CONFIG = {
  NUM_TARGETS: 5,              // Numero target da tracciare
  AUDIO_PATH: './assets/audio/',
  MIND_PATH: './assets/targets/targets-pepo.mind',
  
  MOBILE_OPTIMIZATION: {
    pixelRatio: 1,             // Performance vs qualità
    maxTrack: 1,               // 1 = un target alla volta
    filterMinCF: 0.0005,       // Stabilità tracking (più basso = più stabile)
    filterBeta: 0.005,         // Smooth tracking
    warmupTolerance: 5,        // Frame prima di confermare target
    missTolerance: 5           // Frame prima di perdere target
  },
  
  AUDIO: {
    refDistance: 1,            // Distanza audio base
    rolloffFactor: 0,          // 0 = no attenuazione, 1 = attenuazione lineare
    volume: 1.0                // 0.0 - 1.0
  }
};
```

### MindAR Options
```javascript
new MindARThree({
  container: $("#container"),
  imageTargetSrc: './targets.mind',
  maxTrack: 1,                           // Mobile: 1, Desktop: multi
  filterMinCF: 0.0005,                   // Più basso = più stabile
  filterBeta: 0.005,                     // Smooth factor
  warmupTolerance: 5,                    // Conferma rilevamento
  missTolerance: 5,                      // Tolleranza perdita
  uiScanning: "#scanning",               // Selector UI scanning
  uiLoading: "no",                       // "no" per custom loading
  rendererSettings: {
    alpha: true,
    antialias: !mobile,                  // false su mobile
    powerPreference: "high-performance"
  }
});
```

---

## 🎨 CSS Customization Quick

### Colori Scanning Frame
```css
/* Rosa */
#scanning .corner.top-left {
  border-color: #de6fbe transparent transparent #de6fbe;
}

/* Grigio */
#scanning .corner.top-right {
  border-color: #a1a5a6 #a1a5a6 transparent transparent;
}

/* Verde */
#scanning .corner.bottom-left {
  border-color: transparent transparent #7f8877 #7f8877;
}

/* Viola */
#scanning .corner.bottom-right {
  border-color: transparent #85306a #85306a transparent;
}
```

### Button Styles
```css
#start-btn { 
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
}

#stop-btn { 
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
}
```

---

## 🔊 Audio Setup

### Formati Supportati
- ✅ MP3 (consigliato, compatibilità universale)
- ✅ WAV (qualità massima, file grandi)
- ✅ OGG (buona compressione)
- ❌ FLAC (non supportato universalmente)

### Compressione Audio
```bash
# Bitrate 128kbps (bilanciato)
ffmpeg -i input.mp3 -b:a 128k output.mp3

# Bitrate 96kbps (più compresso)
ffmpeg -i input.mp3 -b:a 96k output.mp3

# Bitrate 192kbps (alta qualità)
ffmpeg -i input.mp3 -b:a 192k output.mp3
```

### Audio Posizionale Setup
```javascript
const sound = new THREE.PositionalAudio(listener);
sound.setRefDistance(1);        // Distanza base (meters)
sound.setRolloffFactor(0);      // 0-1, 0 = no fade
sound.setVolume(1.0);           // 0.0-1.0
sound.setDirectionalCone(180, 230, 0.1);  // Optional: directional
```

---

## 🎯 Target Image Best Practices

### ✅ Caratteristiche Ideali
- Alto contrasto (bianco/nero, colori vivaci)
- Dettagli distintivi (pattern, texture)
- Bordi netti e definiti
- Dimensione: 480-1024px
- Formato: JPG o PNG
- Evita: sfocature, riflessi, trasparenze

### ❌ Da Evitare
- Immagini uniformi (cieli, muri lisci)
- Testo piccolo o sottile
- Colori troppo simili
- Pattern ripetitivi semplici
- Immagini troppo scure/chiare

### 📐 Dimensioni Ottimali
```
Piccole (flyer):     480x480px   - Tracking a breve distanza
Medie (poster):      720x720px   - Uso standard
Grandi (banner):     1024x1024px - Alta precisione
```

---

## 🐛 Debug Commands

### Console Logging
```javascript
// Attiva logging
CONFIG.DEBUG = true;

// Log manuale
log('Il tuo messaggio');          // Solo se DEBUG attivo
logError('Errore critico');       // Sempre loggato
```

### Debug Panel Info
```javascript
debugMonitor.updateFPS(60);
debugMonitor.updateVideo('1280x720');
debugMonitor.updateTracking('Target 0 active');
debugMonitor.updateAudio('Playing 0');
```

### Browser Console Checks
```javascript
// Verifica WebGL
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');
console.log('WebGL2:', !!gl);

// Verifica Camera
console.log('Camera API:', !!navigator.mediaDevices?.getUserMedia);

// Verifica Audio Context
console.log('Audio Context:', !!(window.AudioContext || window.webkitAudioContext));

// Verifica HTTPS
console.log('HTTPS:', location.protocol === 'https:');
```

---

## 🎬 Event Handlers Quick

### Target Events
```javascript
anchor.onTargetFound = () => {
  console.log('Target trovato!');
  // Il tuo codice qui
};

anchor.onTargetLost = () => {
  console.log('Target perso!');
  // Il tuo codice qui
};
```

### Audio Events
```javascript
sound.source.onended = () => {
  console.log('Audio finito');
  // Il tuo codice qui
};
```

### App Lifecycle
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('App in background');
    // Pausa operazioni
  } else {
    console.log('App in foreground');
    // Riprendi operazioni
  }
});
```

---

## 📊 Performance Monitoring

### FPS Check
```javascript
let lastTime = performance.now();
let frames = 0;

function checkFPS() {
  frames++;
  const currentTime = performance.now();
  
  if (currentTime >= lastTime + 1000) {
    console.log('FPS:', frames);
    
    if (frames < 30) {
      console.warn('⚠️ Performance basse!');
    }
    
    frames = 0;
    lastTime = currentTime;
  }
  
  requestAnimationFrame(checkFPS);
}

checkFPS();
```

### Memory Check
```javascript
if (performance.memory) {
  const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
  const usage = (usedJSHeapSize / jsHeapSizeLimit * 100).toFixed(1);
  console.log(`Memoria: ${usage}%`);
}
```

---

## 🔧 Common Fixes

### Fix: Camera Bloccata
```javascript
// Stop MindAR
await mindarThree.stop();

// Release camera
const stream = mindarThree.video.srcObject;
stream.getTracks().forEach(track => track.stop());

// Restart
await mindarThree.start();
```

### Fix: Audio Context Suspended (iOS)
```javascript
// Resume audio context su click
document.addEventListener('click', async () => {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
    console.log('Audio context resumed');
  }
}, { once: true });
```

### Fix: Performance Mobile
```javascript
// Riduci pixel ratio
renderer.setPixelRatio(0.75);  // Invece di 1

// Riduci resolution video
navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 640 },
    height: { ideal: 480 }
  }
});
```

---

## 📱 Device Testing Matrix

| Device | Browser | Min Version | Notes |
|--------|---------|-------------|-------|
| iOS | Safari | 14.5+ | Richiede user interaction per audio |
| iOS | Chrome | 89+ | Usa WebKit engine |
| Android | Chrome | 89+ | Performance migliori |
| Android | Firefox | 88+ | Buon supporto |
| Desktop | Chrome | 89+ | Full support |
| Desktop | Firefox | 88+ | Full support |
| Desktop | Safari | 14+ | macOS only |
| Desktop | Edge | 89+ | Chromium-based |

---

## 🚨 Error Codes Quick Reference

| Error Code | Significato | Soluzione |
|------------|-------------|-----------|
| `NotAllowedError` | Permessi negati | Abilita camera in settings |
| `NotFoundError` | Camera non trovata | Verifica device camera |
| `NotReadableError` | Camera in uso | Chiudi altre app |
| `OverconstrainedError` | Vincoli non supportati | Riduci resolution request |
| `TypeError` | Codice errato | Check console log |
| `NetworkError` | Asset non caricato | Verifica path files |

---

## 📦 Asset Optimization

### Image Target
```bash
# Ottimizza PNG
pngquant input.png --output output.png

# Ottimizza JPG
jpegoptim --max=85 input.jpg
```

### Audio
```bash
# MP3 ottimizzato
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k -ar 44100 output.mp3

# Normalizza volume
ffmpeg -i input.mp3 -af "volume=1.5" output.mp3
```

### Batch Processing
```bash
# Converti tutti i WAV in MP3
for file in *.wav; do
  ffmpeg -i "$file" -b:a 128k "${file%.wav}.mp3"
done
```

---

## 🌐 Deployment Quick

### Netlify
```bash
netlify deploy --prod --dir=.
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
git push origin main
# Poi: Settings → Pages → Deploy from main
```

### Test HTTPS Locale
```bash
# Con certificato self-signed
npx serve -p 8080 --ssl
```

---

## 💡 Pro Tips

1. **Test Target in Real Conditions**
   - Stampa su carta
   - Test con illuminazione naturale
   - Prova diverse distanze

2. **Audio Files Naming**
   - Usa nomi consistenti: `audio_0.mp3`, `audio_1.mp3`
   - Non usare spazi nei nomi file
   - Lowercase preferibile

3. **Performance Monitoring**
   - Attiva debug mode in development
   - Target FPS ≥30 su mobile
   - Monitora memoria con devtools

4. **User Feedback**
   - Mostra sempre loading states
   - Conferma azioni con messaggi
   - Errori chiari e actionable

5. **Cross-Browser Testing**
   - Test su iOS Safari (diverso da Chrome mobile)
   - Verifica orientamento device
   - Test connessione lenta

---

**Ultima modifica:** 2025-01-25  
**Versione:** 1.0
