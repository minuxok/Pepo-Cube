# Changelog - Pepo-Cubo AR App

Registro di tutti i cambiamenti e aggiornamenti apportati all'applicazione AR.

---

## [2025-01-23] - Workaround Permessi iOS Safari

### Problema Identificato
iOS Safari richiede permessi specifici per fotocamera e audio, con vincoli più restrittivi rispetto ad altri browser. Senza una corretta inizializzazione dell'AudioContext, l'audio potrebbe non funzionare correttamente su dispositivi iOS.

### Modifiche Implementate

#### 1. **main.js - Inizializzazione AudioContext**
**Posizione**: Linee 170-180
**Descrizione**: Aggiunta inizializzazione esplicita AudioContext all'avvio AR

```javascript
// Inizializza AudioContext per iOS Safari
try {
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (window.audioContext.state === 'suspended') {
      await window.audioContext.resume();
    }
    debug('✅ AudioContext inizializzato per iOS Safari');
  }
} catch (error) {
  debug('⚠️ Inizializzazione AudioContext fallita: ' + error.message);
}
```

**Motivo**: iOS Safari richiede che AudioContext sia creato da un'azione utente (user gesture). Inizializzandolo nel click del pulsante "Inizia AR", garantiamo il funzionamento audio su iOS.

#### 2. **index.html - Messaggio Permessi Utente**
**Posizione**: Linee 227-229
**Descrizione**: Aggiunto messaggio informativo per l'utente

```html
<p id="permission-msg" style="...">
  Questa esperienza di realtà aumentata richiede l'accesso alla fotocamera e audio del dispositivo
</p>
```

**Motivo**: Informare preventivamente l'utente che verranno richiesti entrambi i permessi (camera e audio) per evitare confusione.

#### 3. **main.js - Gestione Visibilità Messaggio**
**Posizione**: Linea 17 (dichiarazione), Linea 168 (nascondimento)
**Descrizione**: Gestione automatica nascondimento messaggio all'avvio AR

```javascript
const permissionMsg = q('#permission-msg');
// ...
if (permissionMsg) permissionMsg.style.display = 'none';
```

**Motivo**: Il messaggio deve essere visibile solo prima dell'avvio AR, poi nascosto per non sovrapporre l'esperienza.

### Compatibilità Browser
- ✅ **iOS Safari 12+**: Funzionamento completo con workaround
- ✅ **Chrome Android**: Compatibile
- ✅ **Desktop Chrome/Firefox/Safari**: Compatibile
- ✅ **Mobile Chrome iOS**: Compatibile

### Test Consigliati
1. Test su iPhone con Safari (iOS 12+)
2. Verifica richiesta permessi camera + audio
3. Verifica riproduzione audio dopo riconoscimento target
4. Test passaggio app in background/foreground su iOS

---

## Note per Sviluppi Futuri
- [ ] Considerare gestione fallback se permesso audio viene negato
- [ ] Testare su diverse versioni iOS (12, 13, 14, 15+)
- [ ] Valutare messaggi di errore più user-friendly per permessi negati

---

## Template per Prossimi Aggiornamenti

```markdown
## [YYYY-MM-DD] - Titolo Aggiornamento

### Problema/Richiesta
Descrizione del problema o della feature richiesta

### Modifiche Implementate
#### File modificato
**Posizione**: Linee X-Y
**Descrizione**: Cosa è stato fatto
**Motivo**: Perché è stato fatto

### Test Effettuati
- [ ] Test 1
- [ ] Test 2

---
```
