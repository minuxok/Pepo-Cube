// main.js completo e corretto con audio per 5 image target e gestione pausa/resume
import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

// ═══════════════════════════════════════════════════════════════
// 🔧 CONFIGURAZIONE
// ═══════════════════════════════════════════════════════════════

const NUM_TARGETS = 5;
const AUDIO_PATH = './assets/audio/';
const MIND_PATH = './assets/targets/targets-pepo.mind';

const q = (sel) => document.querySelector(sel);
const startBtn = q('#start-btn');
const stopBtn = q('#stop-btn');
const msgBox = q('#msg');
const permissionMsg = q('#permission-msg');

let hideMsgId = null;
let mindarThree = null;

// ═══════════════════════════════════════════════════════════════
// 🔊 GESTORE AUDIO CON PAUSA/RESUME
// ═══════════════════════════════════════════════════════════════

class AudioManager {
  constructor() {
    this.currentAudio = null;
    this.wasPlayingBeforePause = false;
    this.audioContext = null;
    this.isAppPaused = false;
    this.setupVisibilityHandlers();
  }

  setupVisibilityHandlers() {
    // Rileva quando l'app va in background/foreground
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handleAppPause();
      } else {
        this.handleAppResume();
      }
    });

    // Rileva quando la finestra perde/guadagna focus
    window.addEventListener('blur', () => this.handleAppPause());
    window.addEventListener('focus', () => this.handleAppResume());

    // Per dispositivi mobili: rileva quando lo schermo si spegne
    window.addEventListener('pagehide', () => this.handleAppPause());
    window.addEventListener('pageshow', () => this.handleAppResume());
  }

  handleAppPause() {
    if (this.isAppPaused) return; // Evita chiamate multiple
    
    console.log('🔇 App in pausa - fermo audio');
    this.isAppPaused = true;
    
    if (this.currentAudio && this.currentAudio.isPlaying) {
      this.wasPlayingBeforePause = true;
      this.currentAudio.pause();
      
      showMsg('⏸️ Audio in pausa', null); // Messaggio persistente
      stopBtn.style.display = 'none';
      
    } else {
      this.wasPlayingBeforePause = false;
    }

    // Sospendi audio context per risparmiare batteria
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  handleAppResume() {
    if (!this.isAppPaused) return; // Evita chiamate multiple
    
    console.log('▶️ App ripresa');
    this.isAppPaused = false;
    
    // Riattiva audio context
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    if (this.wasPlayingBeforePause && this.currentAudio) {
      // Chiedi all'utente se vuole riprendere
      showMsg('🔄 Tocca per riprendere l\'audio', null);
      
      // Aggiungi listener temporaneo per riprendere
      const resumeHandler = () => {
        if (this.currentAudio && this.wasPlayingBeforePause) {
          this.currentAudio.play();
          showMsg('▶️ Audio ripreso', 3000);
          stopBtn.style.display = 'block';
        }
        
        // Rimuovi listener dopo l'uso
        document.removeEventListener('click', resumeHandler);
        document.removeEventListener('touchstart', resumeHandler);
      };
      
      document.addEventListener('click', resumeHandler, { once: true });
      document.addEventListener('touchstart', resumeHandler, { once: true });
      
    } else {
      showMsg('✅ AR attivo - inquadra un target', 4000);
    }
    
    this.wasPlayingBeforePause = false;
  }

  setCurrentAudio(audio, audioContext) {
    this.currentAudio = audio;
    this.audioContext = audioContext;
  }

  stopCurrentAudio() {
    if (this.currentAudio && this.currentAudio.isPlaying) {
      this.currentAudio.stop();
    }
    this.currentAudio = null;
    this.wasPlayingBeforePause = false;
    stopBtn.style.display = 'none';
  }

  isPlaying() {
    return this.currentAudio && this.currentAudio.isPlaying;
  }
}

// ═══════════════════════════════════════════════════════════════
// 🛠️ UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function showMsg(text, timeout = null) {
  msgBox.textContent = text;
  msgBox.style.display = 'block';
  clearTimeout(hideMsgId);
  if (timeout !== null) {
    hideMsgId = setTimeout(() => {
      msgBox.style.display = 'none';
    }, timeout);
  }
}

function debug(message) {
  console.log('[DEBUG]', message);
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ═══════════════════════════════════════════════════════════════
// 🎯 FUNZIONE PRINCIPALE AR
// ═══════════════════════════════════════════════════════════════

// Inizializza il gestore audio globale
const audioManager = new AudioManager();

async function startAR() {
  try {
    debug('=== INIZIO startAR() ===');
    startBtn.style.display = 'none';
    if (permissionMsg) permissionMsg.style.display = 'none';

    // Inizializza AudioContext per iOS Safari
    try {
      // Crea AudioContext e riprendi se sospeso
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

    // Inizializza MindAR con configurazione ottimizzata
    mindarThree = new MindARThree({
      container: q("#container"),
      imageTargetSrc: MIND_PATH,
      uiScanning: "#scanning",
      uiLoading: "no",
      filterMinCF: 0.0005,
      filterBeta: 0.005,
      rendererSettings: {
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      },
      maxTrack: NUM_TARGETS,
      warmupTolerance: 5,
      missTolerance: 5
    });

    const { renderer, scene, camera } = mindarThree;
    const container = q("#container");
    const scanningElement = q("#scanning");

    // Setup audio
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const loader = new THREE.AudioLoader();
    const audios = [];
    const audioPromises = [];

    // Luci per la scena
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    debug('Creazione target e caricamento audio...');

    // Setup per ogni target
    for (let i = 0; i < NUM_TARGETS; i++) {
      const anchor = mindarThree.addAnchor(i);
      const sound = new THREE.PositionalAudio(listener);
     

      // Promessa per il caricamento audio
      const audioPromise = new Promise((resolve, reject) => {
        loader.load(
          `${AUDIO_PATH}audio_${i}.mp3`,
          (buffer) => {
            debug(`Audio ${i} caricato: ${buffer.duration.toFixed(2)}s`);
            sound.setBuffer(buffer);
             sound.setRefDistance(1);           // ↙ distanza base piccola
            sound.setRolloffFactor(0);         // ↙ disattiva attenuazione
            // sound.panner.distanceModel = 'linear'; // opzionale
            sound.setVolume(1.0);
            resolve(sound);
          },
          (progress) => {
            if (progress.total > 0) {
              const percent = (progress.loaded / progress.total * 100).toFixed(0);
              debug(`Audio ${i} caricamento: ${percent}%`);
            }
          },
          (error) => {
            console.error(`Errore audio ${i}:`, error);
            reject(error);
          }
        );
      });

      audioPromises.push(audioPromise);
      audios[i] = sound;
      anchor.group.add(sound);

      // Mesh di debug
      // const debugMesh = new THREE.Mesh(
      //   new THREE.PlaneGeometry(1, 1),
      //   new THREE.MeshBasicMaterial({
      //     color: 0x00ff00,
      //     transparent: true,
      //     opacity: 0.2,
      //     side: THREE.DoubleSide
      //   })
      // );
      // anchor.group.add(debugMesh);

      // Timer per gestione perdita target
      let lostTimer = null;

      // Event handlers
      anchor.onTargetFound = () => {
        debug(`🎯 TARGET ${i} TROVATO!`);
        clearTimeout(lostTimer);

        // Ferma audio precedente se presente
        if (audioManager.isPlaying()) {
          audioManager.stopCurrentAudio();
          showMsg('🔄 Cambio audio...', 2000);
        }

        // Verifica che l'audio context sia attivo
        if (listener.context.state !== 'running') {
          showMsg('⚠️ Tocca "Inizia AR" per sbloccare audio');
          return;
        }

        if (sound.buffer) {
          debug(`▶️ Riproduzione audio ${i}`);
          sound.play();
          audioManager.setCurrentAudio(sound, listener.context);
          stopBtn.style.display = 'block';
          showMsg(`🎵 Audio ${i + 1} in riproduzione`);

          // Gestione fine audio
          if (sound.source) {
            sound.source.onended = () => {
              if (audioManager.currentAudio === sound) {
                audioManager.stopCurrentAudio();
                showMsg('✅ Audio terminato', 4000);
              }
            };
          }
        } else {
          showMsg(`⚠️ Audio ${i + 1} non ancora caricato`);
        }

        // Nascondi UI di scanning
        setTimeout(() => {
          if (scanningElement) {
            scanningElement.classList.add('hidden');
            scanningElement.style.display = 'none';
          }
        }, 50);
      };

      anchor.onTargetLost = () => {
        debug(`🎯 Target ${i} perso... attendo conferma`);
        
        clearTimeout(lostTimer);
        lostTimer = setTimeout(() => {
          debug('Perdita confermata, mostro UI');
          
          // Mostra UI di scanning
          if (scanningElement) {
            scanningElement.classList.remove('hidden');
            scanningElement.style.display = 'flex';
          }
          
          // L'audio continua a suonare anche se il target è perso
          // (come da tua richiesta)
        }, 300); // debounce: 300 ms
      };
    }

    // Attendiamo che tutti gli audio siano caricati
    await Promise.allSettled(audioPromises);
    debug('✅ Tutti gli audio processati');

    // Setup stop button
    stopBtn.addEventListener('click', () => {
      debug('🔇 STOP premuto');
      audioManager.stopCurrentAudio();
      showMsg('🔇 Audio fermato', 3000);
    });

    // Avvio MindAR
    await mindarThree.start();
    debug('✅ MindAR avviato');

    // Resume audio context se necessario
    if (listener.context.state === 'suspended') {
      await listener.context.resume();
    }

    // Riproduci guida iniziale
    const guida = new Audio('./assets/audio/guida.mp3');
    guida.play().then(() => {
      debug('▶️ Voce guida iniziale riprodotta');
    }).catch((e) => {
      debug('⚠️ Errore audio guida:', e);
    });

    // Setup renderer
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Avvia render loop
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    showMsg('✅ AR avviato! Inquadra un target', 4000);

    // Debug finale
    setTimeout(() => {
      const video = mindarThree.video;
      if (video) {
        debug(`📹 Video: ${video.videoWidth}x${video.videoHeight}, playing: ${!video.paused}`);
      }
      debug(`📱 Scene children: ${scene.children.length}`);
    }, 2000);

  } catch (error) {
    console.error('💥 ERRORE startAR:', error);
    showMsg(`❌ Errore: ${error.message}`, 6000);
    startBtn.style.display = 'block';
  }
}

// ═══════════════════════════════════════════════════════════════
// 🚀 INIZIALIZZAZIONE
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  debug('📱 main.js caricato');
  
  startBtn.addEventListener('click', startAR);

  // Gestione orientamento per mobile
  if (isMobileDevice()) {
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (mindarThree) {
          const container = q("#container");
          const { renderer } = mindarThree;
          renderer.setSize(container.clientWidth, container.clientHeight);
          debug('📱 Orientamento cambiato, renderer riaggiustato');
        }
      }, 100);
    });
  }

  // Gestione resize
  window.addEventListener('resize', () => {
    if (mindarThree) {
      const container = q("#container");
      const { renderer } = mindarThree;
      renderer.setSize(container.clientWidth, container.clientHeight);
      debug(`🔄 Resize: ${container.clientWidth}x${container.clientHeight}`);
    }
  });
});