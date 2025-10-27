# 🎷 AR Experience - MindAR Project

Esperienza di realtà aumentata basata su **MindAR** con tracciamento di immagini multiple e audio posizionale 3D.

## 🌟 Caratteristiche

- ✅ **Image Tracking:** Rileva fino a 5 target image contemporaneamente
- ✅ **Audio Posizionale 3D:** Ogni target ha il suo audio spazializzato
- ✅ **Gestione Pausa/Resume:** L'audio si mette in pausa quando l'app va in background
- ✅ **UI/UX Professionale:** Loading states, istruzioni, feedback costante
- ✅ **Performance Ottimizzate:** Specifiche per dispositivi mobile
- ✅ **Error Handling Robusto:** Gestione errori camera, permessi, compatibilità
- ✅ **Debug Mode:** Panel di debug per sviluppatori
- ✅ **Browser Compatibility Check:** Verifica automatica compatibilità browser
- ✅ **Accessibilità:** ARIA labels, focus management, reduced motion support

## 🚀 Quick Start

### 1. Prerequisiti

- Browser moderno (Chrome 89+, Safari 14+, Firefox 88+, Edge 89+)
- HTTPS o localhost (richiesto per accesso camera)
- Immagini target compilate (file `.mind`)

### 2. Installazione

```bash
# Clona o scarica il progetto
git clone <repository-url>
cd ar-experience

# Nessuna installazione npm richiesta!
# Tutte le dipendenze sono caricate via CDN
```

### 3. Struttura File

Assicurati di avere questa struttura:

```
project/
├── index.html              # File HTML principale
├── main.js                 # Logica applicazione
├── assets/
│   ├── audio/
│   │   ├── guida.mp3      # Audio guida iniziale
│   │   ├── audio_0.mp3    # Audio per target 0
│   │   ├── audio_1.mp3    # Audio per target 1
│   │   ├── audio_2.mp3    # Audio per target 2
│   │   ├── audio_3.mp3    # Audio per target 3
│   │   └── audio_4.mp3    # Audio per target 4
│   └── targets/
│       └── targets-pepo.mind  # Target compilati
└── README.md
```

### 4. Esecuzione Locale

**Opzione 1 - Python (semplice):**
```bash
# Python 3
python -m http.server 8080

# Apri http://localhost:8080
```

**Opzione 2 - Node.js serve:**
```bash
npx serve -p 8080
# Apri http://localhost:8080
```

**Opzione 3 - VSCode Live Server:**
- Installa estensione "Live Server"
- Click destro su `index.html` → "Open with Live Server"

## 📱 Come Usare

1. **Avvia l'esperienza:**
   - Apri l'applicazione nel browser
   - Click su "🎷 Inizia AR"
   - Concedi permessi camera e audio

2. **Inquadra un target:**
   - Punta la camera verso uno dei target image
   - L'audio associato partirà automaticamente
   - L'UI di scanning scomparirà

3. **Cambia target:**
   - Inquadra un altro target
   - L'audio precedente si fermerà
   - Partirà il nuovo audio

4. **Ferma audio:**
   - Click su "🔇 STOP Audio" in basso
   - L'audio si fermerà immediatamente

5. **App in background:**
   - L'audio si mette in pausa automaticamente
   - Al ritorno, tocca lo schermo per riprendere

## 🛠️ Preparazione Target Image

### 1. Scegli le Immagini

Caratteristiche ideali:
- ✅ Alto contrasto
- ✅ Dettagli ricchi e distintivi
- ✅ Bordi ben definiti
- ✅ Risoluzione: 480-1024px per lato
- ❌ Evita: immagini uniformi, testo piccolo, colori simili

### 2. Compila i Target

Usa il compiler online di MindAR:

1. Vai a: https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Carica le tue immagini (max 5)
3. Click "Compile"
4. Scarica il file `.mind` generato
5. Sostituisci `assets/targets/targets-pepo.mind` con il tuo file

### 3. Configura il Numero di Target

Se usi meno/più di 5 target:

```javascript
// In main.js
const CONFIG = {
  NUM_TARGETS: 3,  // Cambia qui con il numero di target
  // ...
};
```

## 🎨 Personalizzazione

### Cambiare Audio

Sostituisci i file in `assets/audio/`:
- `audio_0.mp3` → Audio per target 0
- `audio_1.mp3` → Audio per target 1
- etc.

Formati supportati: MP3, WAV, OGG

### Modificare Colori UI

In `index.html`, cerca questi selettori CSS:

```css
/* Angolo rosa */
#scanning .corner.top-left {
  border-color: #de6fbe transparent transparent #de6fbe;
}

/* Angolo grigio */
#scanning .corner.top-right {
  border-color: #a1a5a6 #a1a5a6 transparent transparent;
}

/* etc... */
```

### Cambiare Parametri Audio

In `main.js`:

```javascript
const CONFIG = {
  AUDIO: {
    refDistance: 1,      // Distanza base
    rolloffFactor: 0,    // Attenuazione (0 = nessuna)
    volume: 1.0          // Volume (0.0 - 1.0)
  }
};
```

## 🐛 Debug Mode

Attiva la modalità debug aggiungendo `?debug=1` all'URL:

```
http://localhost:8080/?debug=1
```

**Panel di debug mostra:**
- FPS in tempo reale
- Risoluzione video camera
- Target attualmente tracciato
- Stato audio

**Console logging:**
- Eventi di tracking
- Caricamento assets
- Errori dettagliati

## 🌐 Deployment

### Opzioni Gratuite con HTTPS

**1. Netlify (raccomandato):**
```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**2. Vercel:**
```bash
# Installa Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**3. GitHub Pages:**
```bash
# Push su repository GitHub
git push origin main

# Abilita GitHub Pages in Settings → Pages
```

**4. Firebase Hosting:**
```bash
# Installa Firebase CLI
npm install -g firebase-tools

# Inizializza
firebase init hosting

# Deploy
firebase deploy
```

### Verifica HTTPS

⚠️ **IMPORTANTE:** WebAR richiede HTTPS per accesso camera!

Verifica con:
```javascript
location.protocol === 'https:'  // Deve essere true
```

Eccezioni (permesse senza HTTPS):
- `localhost`
- `127.0.0.1`
- `[::1]`

## 📊 Performance Tips

### Mobile Optimization (già implementato)

- ✅ Pixel ratio ridotto a 1 su mobile
- ✅ MaxTrack impostato a 1 target su mobile
- ✅ Antialiasing disabilitato su mobile
- ✅ Shadow mapping disabilitato su mobile

### Se Performance Scarse

1. **Riduci numero target:**
   ```javascript
   NUM_TARGETS: 3  // invece di 5
   ```

2. **Comprimi audio:**
   ```bash
   ffmpeg -i input.mp3 -b:a 96k output.mp3
   ```

3. **Semplifica target image:**
   - Usa immagini più semplici
   - Riduci risoluzione a 480px

4. **Disabilita debug mode:**
   - Rimuovi `?debug=1` dall'URL

## 🔧 Troubleshooting

### Camera non funziona

**Possibili cause:**
1. Non stai usando HTTPS o localhost
2. Permessi negati nel browser
3. Camera in uso da altra app
4. Browser non supportato

**Soluzioni:**
1. Verifica URL: `https://` o `localhost`
2. Settings browser → Permessi → Camera → Consenti
3. Chiudi altre app che usano la camera
4. Usa Chrome 89+ o Safari 14+

### Target non rilevato

**Possibili cause:**
1. Immagine target di bassa qualità
2. Scarsa illuminazione
3. Target troppo vicino/lontano
4. File `.mind` non aggiornato

**Soluzioni:**
1. Usa immagini ad alto contrasto
2. Migliora illuminazione ambiente
3. Distanza ottimale: 30-80 cm
4. Ricompila target con nuove immagini

### Audio non parte

**Possibili cause:**
1. File audio non trovato
2. iOS richiede interazione utente
3. Audio context non inizializzato
4. Volume device a zero

**Soluzioni:**
1. Verifica percorso file in `assets/audio/`
2. Su iOS: click su "Inizia AR" prima
3. Attiva debug mode per verificare stato
4. Alza volume del dispositivo

### Performance scarse

**Soluzioni:**
1. Attiva debug mode (`?debug=1`)
2. Controlla FPS nel panel (target: ≥30)
3. Riduci numero target
4. Comprimi assets
5. Usa device più potente per test

## 📚 Tecnologie Utilizzate

- **MindAR** v1.2.5 - Image tracking
- **Three.js** r147 - Rendering 3D
- **Web Audio API** - Audio posizionale

## 🔗 Link Utili

- [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [Target Compiler Tool](https://hiukim.github.io/mind-ar-js-doc/tools/compile)
- [Three.js Documentation](https://threejs.org/docs/)
- [WebAR Best Practices](./MIGLIORAMENTI.md)

## 📄 Licenza

[Specifica la tua licenza]

## 👨‍💻 Autore

[Il tuo nome/contatto]

## 🙏 Credits

- MindAR by hiukim
- Three.js by mrdoob and contributors
- Skill WebAR per best practices

---

## 📝 Changelog

### v2.0 (2025-01-25)
- ✅ Ottimizzazioni performance mobile
- ✅ UI/UX professionale
- ✅ Error handling robusto
- ✅ Browser compatibility check
- ✅ Debug mode
- ✅ Accessibilità migliorata
- ✅ Loading states
- ✅ Documentazione completa

### v1.0 (precedente)
- ✅ Tracking immagini base
- ✅ Audio posizionale
- ✅ Gestione pausa/resume

---

**Note:** Per dettagli tecnici sui miglioramenti, leggi [MIGLIORAMENTI.md](./MIGLIORAMENTI.md)
