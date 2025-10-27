# 💬 Prompt Template per Claude Code

## 🎯 Prompt Ottimizzato (Copia-Incolla Pronto)

---

### ⭐ PROMPT COMPLETO (Consigliato)

```
Ciao Claude Code! Devo implementare miglioramenti professionali al mio progetto WebAR basato su MindAR + Three.js.

📦 Ti fornisco questi file:

1. CLAUDE_CODE_INSTRUCTIONS.md - Istruzioni operative complete (LEGGI PER PRIMO)
2. index.html - File HTML migliorato da applicare
3. main.js - File JavaScript migliorato da applicare  
4. VISUAL_COMPARISON.md - Confronto visuale prima/dopo
5. MIGLIORAMENTI.md - Documentazione tecnica dettagliata

🎯 OBIETTIVO:
Trasformare il progetto da demo funzionale a applicazione production-ready applicando best practices WebAR:
- Performance mobile ottimizzate (+50-100% FPS)
- UI/UX professionale con loading states
- Error handling robusto
- Browser compatibility check
- Debug mode per sviluppo
- Accessibilità migliorata

📋 ISTRUZIONI:
1. Leggi CLAUDE_CODE_INSTRUCTIONS.md per primo (contiene tutti gli step)
2. Fai backup dei file originali (index.html e main.js)
3. Sostituisci completamente index.html e main.js con le versioni migliorate
4. Verifica la struttura assets/ sia intatta
5. Testa tutte le funzionalità seguendo la checklist
6. Conferma il successo dell'implementazione

⚙️ CONFIGURAZIONE PROGETTO:
- Numero target: 5
- Path audio: ./assets/audio/
- Path targets: ./assets/targets/targets-pepo.mind
- Framework: MindAR v1.2.5 + Three.js r147

❓ Se hai dubbi o domande durante l'implementazione, chiedi!

Inizia leggendo CLAUDE_CODE_INSTRUCTIONS.md e procedi step-by-step. 🚀

[ALLEGA QUI I 5 FILE]
```

---

### ⚡ PROMPT MINIMALISTA (Veloce)

```
Claude Code, implementa questi miglioramenti WebAR al mio progetto:

📄 File allegati:
- CLAUDE_CODE_INSTRUCTIONS.md (istruzioni complete)
- index.html (nuovo file)
- main.js (nuovo file)

🎯 Task:
1. Leggi le istruzioni
2. Backup files originali  
3. Sostituisci index.html e main.js
4. Verifica funzionalità

Inizia con CLAUDE_CODE_INSTRUCTIONS.md!

[ALLEGA I 3 FILE]
```

---

### 🔧 PROMPT CON CONFIGURAZIONI CUSTOM

```
Claude Code, implementa miglioramenti WebAR con queste configurazioni custom:

📦 File allegati:
1. CLAUDE_CODE_INSTRUCTIONS.md
2. index.html
3. main.js
4. VISUAL_COMPARISON.md
5. MIGLIORAMENTI.md

⚙️ CONFIGURAZIONI SPECIALI DEL MIO PROGETTO:
- Numero target: 3 (invece di 5)
- Path audio: ./sounds/ (invece di ./assets/audio/)
- Nome file targets: targets.mind (invece di targets-pepo.mind)

📝 NOTA IMPORTANTE:
Dopo aver sostituito i file, modifica in main.js:
```javascript
const CONFIG = {
  NUM_TARGETS: 3,                    // ← Cambiato da 5
  AUDIO_PATH: './sounds/',           // ← Cambiato path
  MIND_PATH: './assets/targets/targets.mind'  // ← Nome diverso
};
```

Segui CLAUDE_CODE_INSTRUCTIONS.md per tutto il resto!

[ALLEGA I 5 FILE]
```

---

### 🐛 PROMPT PER DEBUG/PROBLEMI

```
Claude Code, ho implementato i miglioramenti WebAR ma ho questo problema:

[DESCRIVI IL PROBLEMA QUI]

📦 File di riferimento:
- CLAUDE_CODE_INSTRUCTIONS.md (sezione Troubleshooting)
- MIGLIORAMENTI.md (dettagli tecnici)
- QUICK_REFERENCE.md (fix rapidi)

❓ DOMANDE:
1. Cosa potrebbe causare questo problema?
2. Come posso risolverlo seguendo la documentazione?
3. Ci sono verifiche specifiche da fare?

💻 INFO SISTEMA:
- Browser: [Chrome/Safari/Firefox]
- Device: [Desktop/Mobile]
- OS: [Windows/Mac/iOS/Android]
- Console errors: [copia errori se presenti]

[ALLEGA I FILE RILEVANTI]
```

---

### 🎨 PROMPT PER PERSONALIZZAZIONI

```
Claude Code, ho implementato con successo i miglioramenti WebAR. 
Ora voglio personalizzare questi aspetti:

📝 PERSONALIZZAZIONI RICHIESTE:

1. COLORI UI:
   - Angoli scanning frame: da rosa/grigio/verde/viola a [TUO COLORE]
   - Button "Inizia AR": da verde a [TUO COLORE]
   - Button "STOP": da rosso a [TUO COLORE]

2. PARAMETRI AUDIO:
   - Volume: da 1.0 a [VALORE]
   - Rolloff factor: da 0 a [VALORE]

3. MESSAGGI:
   - Cambia "🎷 Inizia AR" in "[TUO TESTO]"
   - Cambia testi istruzioni

📦 File di riferimento:
- QUICK_REFERENCE.md (sezione Personalizzazione)
- index.html (per modifiche CSS)
- main.js (per modifiche parametri)

Usa QUICK_REFERENCE.md come guida per le modifiche!

[ALLEGA QUICK_REFERENCE.md]
```

---

### 🚀 PROMPT POST-IMPLEMENTAZIONE

```
Claude Code, ho implementato i miglioramenti e tutto funziona! 🎉

Ora voglio:

✅ VERIFICA FINALE:
- Esegui checklist completa da CLAUDE_CODE_INSTRUCTIONS.md
- Verifica tutte le metriche siano migliorate
- Controlla che non ci siano warning in console

📦 PREPARAZIONE DEPLOY:
- Comprimi assets audio (bitrate 128kbps)
- Verifica struttura file per deploy
- Suggerisci ottimizzazioni finali

🌐 TARGET DEPLOY:
- Piattaforma: [Netlify/Vercel/GitHub Pages]
- HTTPS: richiesto
- Browser target: Chrome 89+, Safari 14+

Conferma che il progetto è pronto per production deploy!

[ALLEGA DOCUMENTAZIONE SE NECESSARIO]
```

---

## 📋 Template Strutturato per Situazioni Specifiche

### Situazione 1: Prima Implementazione

```markdown
**CONTESTO**: Primo deploy dei miglioramenti
**FILE**: 5 completi (CLAUDE_CODE_INSTRUCTIONS + HTML/JS + docs)
**FOCUS**: Seguire step-by-step senza modifiche custom
**ASPETTATIVA**: Implementazione pulita con test completi
```

**Usa:** PROMPT COMPLETO

---

### Situazione 2: Implementazione Rapida

```markdown
**CONTESTO**: Ho fretta, progetto standard
**FILE**: 3 essenziali (CLAUDE_CODE_INSTRUCTIONS + HTML/JS)
**FOCUS**: Sostituzione veloce e verifica base
**ASPETTATIVA**: Funzionalità core attive rapidamente
```

**Usa:** PROMPT MINIMALISTA

---

### Situazione 3: Progetto Custom

```markdown
**CONTESTO**: Progetto con configurazioni non standard
**FILE**: 5 completi + note su differenze
**FOCUS**: Implementazione + modifiche configurazione
**ASPETTATIVA**: Funziona con le specifiche del progetto
```

**Usa:** PROMPT CON CONFIGURAZIONI CUSTOM

---

### Situazione 4: Troubleshooting

```markdown
**CONTESTO**: Implementato ma ci sono problemi
**FILE**: Docs (MIGLIORAMENTI, QUICK_REFERENCE)
**FOCUS**: Risolvere problema specifico
**ASPETTATIVA**: Soluzione guidata dal troubleshooting
```

**Usa:** PROMPT PER DEBUG

---

### Situazione 5: Personalizzazione

```markdown
**CONTESTO**: Funziona, voglio personalizzare
**FILE**: QUICK_REFERENCE + file da modificare
**FOCUS**: Modifiche estetiche/parametri
**ASPETTATIVA**: Personalizzazioni senza rompere funzionalità
```

**Usa:** PROMPT PER PERSONALIZZAZIONI

---

## 🎯 Checklist Pre-Prompt

Prima di inviare il prompt a Claude Code, verifica:

- [ ] Hai scaricato tutti i file necessari da `/outputs/`
- [ ] Hai identificato il tipo di prompt (completo/minimalista/custom)
- [ ] Hai le informazioni del tuo progetto (num target, path, etc.)
- [ ] Hai preparato i file da allegare
- [ ] Sei in VS Code con Claude Code attivo
- [ ] Hai il progetto WebAR aperto

---

## 💡 Best Practices per la Comunicazione

### ✅ DO - Fai così:

1. **Specifica sempre il contesto:**
   ```
   "Ho un progetto WebAR con MindAR..."
   ```

2. **Elenca i file allegati:**
   ```
   "📦 File allegati:
   1. CLAUDE_CODE_INSTRUCTIONS.md
   2. index.html
   ..."
   ```

3. **Indica le aspettative:**
   ```
   "🎯 Obiettivo: Sostituire i file e testare"
   ```

4. **Segnala configurazioni speciali:**
   ```
   "⚙️ Nota: il progetto usa 3 target invece di 5"
   ```

### ❌ DON'T - Evita:

1. **Prompt vaghi:**
   ```
   ❌ "Migliora il mio progetto AR"
   ```

2. **Senza file allegati:**
   ```
   ❌ Inviare solo testo senza documentazione
   ```

3. **Senza istruzioni operative:**
   ```
   ❌ "Ecco i file, capisci cosa fare"
   ```

4. **Aspettative non chiare:**
   ```
   ❌ "Fai qualcosa di meglio"
   ```

---

## 📊 Risultati Attesi per Prompt Type

### PROMPT COMPLETO
**Tempo:** 10-15 minuti  
**Risultato:** Implementazione completa con test  
**Rischio:** Basso (tutto documentato)

### PROMPT MINIMALISTA
**Tempo:** 5-8 minuti  
**Risultato:** Sostituzione base funzionante  
**Rischio:** Medio (meno contesto)

### PROMPT CUSTOM
**Tempo:** 15-20 minuti  
**Risultato:** Implementazione + personalizzazioni  
**Rischio:** Medio (richiede modifiche)

### PROMPT DEBUG
**Tempo:** Variabile  
**Risultato:** Problema risolto  
**Rischio:** Dipende dal problema

### PROMPT PERSONALIZZAZIONI
**Tempo:** 5-10 minuti  
**Risultato:** Modifiche applicate  
**Rischio:** Basso (progetto già funzionante)

---

## 🎓 Esempio di Conversazione Completa

### Tu → Claude Code

```
Ciao Claude Code! Devo implementare miglioramenti professionali 
al mio progetto WebAR basato su MindAR + Three.js.

📦 Ti fornisco questi file:
1. CLAUDE_CODE_INSTRUCTIONS.md - Istruzioni operative complete
2. index.html - File HTML migliorato
3. main.js - File JavaScript migliorato
4. VISUAL_COMPARISON.md - Confronto prima/dopo
5. MIGLIORAMENTI.md - Docs tecnica

🎯 OBIETTIVO: Production-ready con performance ottimizzate

📋 TASK: Leggi CLAUDE_CODE_INSTRUCTIONS.md e implementa step-by-step

⚙️ CONFIG: 5 target, path standard

[File allegati]
```

### Claude Code → Tu

```
✅ Ho letto CLAUDE_CODE_INSTRUCTIONS.md

📋 Piano d'azione:
1. Backup index.html e main.js
2. Sostituisco con nuove versioni
3. Verifico struttura assets/
4. Test funzionalità base
5. Test debug mode
6. Conferma successo

Procedo con Step 1...
```

### Tu → Claude Code (dopo implementazione)

```
Perfetto! Ora testa con ?debug=1 e verifica FPS
```

### Claude Code → Tu

```
✅ Test completato:
- Debug panel visibile
- FPS: 55-60 (verde)
- Video: 1280x720
- Tracking: funzionante
- Audio: funzionante

🎉 Implementazione SUCCESS!
Progetto pronto per deploy.
```

---

## ✨ Tips Finali

### Per Ottenere i Migliori Risultati:

1. **Usa il PROMPT COMPLETO** per la prima implementazione
2. **Allega SEMPRE CLAUDE_CODE_INSTRUCTIONS.md**
3. **Specifica configurazioni custom** se applicabili
4. **Rispondi alle domande** di Claude Code se ne fa
5. **Verifica ogni step** come da checklist

### Se Claude Code Si Blocca:

1. **Ripeti l'ultima istruzione** con più dettagli
2. **Fornisci errori console** se presenti
3. **Usa PROMPT DEBUG** con info sistema
4. **Richiama sezione specifica** docs (es: "Vedi STEP 7 Troubleshooting")

---

## 🎯 Pronto per Iniziare?

1. Scegli il prompt template appropriato
2. Personalizzalo con i tuoi dettagli
3. Allega i file necessari
4. Invia a Claude Code in VS Code
5. Segui le istruzioni di Claude Code
6. Verifica il risultato finale

---

**Buona implementazione! 🚀**

---

## 📁 Download Files

Tutti i file necessari sono in:
[/mnt/user-data/outputs/](computer:///mnt/user-data/outputs/)

File essenziali per il prompt:
- ⭐ [CLAUDE_CODE_INSTRUCTIONS.md](computer:///mnt/user-data/outputs/CLAUDE_CODE_INSTRUCTIONS.md)
- ⭐ [index.html](computer:///mnt/user-data/outputs/index.html)
- ⭐ [main.js](computer:///mnt/user-data/outputs/main.js)
- 📊 [VISUAL_COMPARISON.md](computer:///mnt/user-data/outputs/VISUAL_COMPARISON.md)
- 🔧 [MIGLIORAMENTI.md](computer:///mnt/user-data/outputs/MIGLIORAMENTI.md)
