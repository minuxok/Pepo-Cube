// main.js - Enhanced WebAR Experience con Best Practices
import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

// ═══════════════════════════════════════════════════════════════
// 🔧 CONFIGURAZIONE
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  NUM_TARGETS: 5,
  AUDIO_PATH: './assets/audio/',
  MIND_PATH: './assets/targets/targets-pepo.mind',
  
  // Ottimizzazioni Mobile (WebAR Best Practices)
  MOBILE_OPTIMIZATION: {
    pixelRatio: 1,              // Invece di devicePixelRatio per performance
    maxTrack: 1,                 // Traccia un solo target alla volta
    filterMinCF: 0.0005,
    filterBeta: 0.005,
    warmupTolerance: 5,
    missTolerance: 5
  },
  
  // Parametri Audio
  AUDIO: {
    refDistance: 1,
    rolloffFactor: 0,
    volume: 1.0
  },
  
  // Debug Mode (attiva con ?debug=1 nell'URL)
  DEBUG: new URLSearchParams(window.location.search).has('debug')
};

// ═══════════════════════════════════════════════════════════════
// 🛠️ UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

const $ = (sel) => document.querySelector(sel);

const UI = {
  startBtn: $('#start-btn'),
  stopBtn: $('#stop-btn'),
  msgBox: $('#msg'),
  permissionMsg: $('#permission-msg'),
  loadingOverlay: $('#loading-overlay'),
  loadingText: $('#loading-text'),
  loadingProgress: $('#loading-progress'),
  compatibilityWarning: $('#compatibility-warning'),
  instructions: $('#instructions'),
  debugPanel: $('#debug-panel')
};

let hideMsgTimeout = null;

function showMsg(text, duration = null) {
  UI.msgBox.textContent = text;
  UI.msgBox.style.display = 'block';
  clearTimeout(hideMsgTimeout);
  
  if (duration !== null) {
    hideMsgTimeout = setTimeout(() => {
      UI.msgBox.style.display = 'none';
    }, duration);
  }
}

function hideMsg() {
  UI.msgBox.style.display = 'none';
  clearTimeout(hideMsgTimeout);
}

function updateLoadingText(text, progress = null) {
  UI.loadingText.textContent = text;
  if (progress !== null) {
    UI.loadingProgress.textContent = progress;
  }
}

function hideLoading() {
  UI.loadingOverlay.classList.add('hidden');
  setTimeout(() => {
    UI.loadingOverlay.style.display = 'none';
  }, 500);
}

function log(...args) {
  if (CONFIG.DEBUG) {
    console.log('[AR]', ...args);
  }
}

function logError(...args) {
  console.error('[AR ERROR]', ...args);
}

// ═══════════════════════════════════════════════════════════════
// 🔍 BROWSER COMPATIBILITY CHECK
// ═══════════════════════════════════════════════════════════════

class CompatibilityChecker {
  static check() {
    const results = {
      webgl: this.checkWebGL(),
      camera: this.checkCamera(),
      webAudio: this.checkWebAudio(),
      https: this.checkHTTPS()
    };

    const isCompatible = Object.values(results).every(r => r);
    
    log('Compatibility Check:', results);
    
    return {
      compatible: isCompatible,
      results: results
    };
  }

  static checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  static checkCamera() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  static checkWebAudio() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }

  static checkHTTPS() {
    return location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  }

  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    return {
      browser: browser,
      mobile: this.isMobile(),
      platform: navigator.platform
    };
  }
}

// ═══════════════════════════════════════════════════════════════
// 🔊 AUDIO MANAGER CON PAUSE/RESUME
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
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handleAppPause();
      } else {
        this.handleAppResume();
      }
    });

    window.addEventListener('blur', () => this.handleAppPause());
    window.addEventListener('focus', () => this.handleAppResume());
    window.addEventListener('pagehide', () => this.handleAppPause());
    window.addEventListener('pageshow', () => this.handleAppResume());
  }

  handleAppPause() {
    if (this.isAppPaused) return;
    
    log('🔇 App paused - stopping audio');
    this.isAppPaused = true;
    
    if (this.currentAudio && this.currentAudio.isPlaying) {
      this.wasPlayingBeforePause = true;
      this.currentAudio.pause();
      showMsg('⏸️ Audio in pausa', null);
      UI.stopBtn.style.display = 'none';
    } else {
      this.wasPlayingBeforePause = false;
    }

    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  handleAppResume() {
    if (!this.isAppPaused) return;
    
    log('▶️ App resumed');
    this.isAppPaused = false;
    
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    if (this.wasPlayingBeforePause && this.currentAudio) {
      showMsg('🔄 Tocca per riprendere l\'audio', null);
      
      const resumeHandler = () => {
        if (this.currentAudio && this.wasPlayingBeforePause) {
          this.currentAudio.play();
          showMsg('▶️ Audio ripreso', 3000);
          UI.stopBtn.style.display = 'block';
        }
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
    UI.stopBtn.style.display = 'none';
  }

  isPlaying() {
    return this.currentAudio && this.currentAudio.isPlaying;
  }
}

// ═══════════════════════════════════════════════════════════════
// 📊 DEBUG MONITOR (opzionale)
// ═══════════════════════════════════════════════════════════════

class DebugMonitor {
  constructor() {
    this.enabled = CONFIG.DEBUG;
    if (this.enabled) {
      UI.debugPanel.classList.add('visible');
      this.startMonitoring();
    }
  }

  startMonitoring() {
    let lastTime = performance.now();
    let frames = 0;
    
    const update = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        this.updateFPS(frames);
        frames = 0;
        lastTime = currentTime;
      }
      
      if (this.enabled) {
        requestAnimationFrame(update);
      }
    };
    
    requestAnimationFrame(update);
  }

  updateFPS(fps) {
    const fpsEl = $('#debug-fps');
    if (fpsEl) {
      fpsEl.textContent = `FPS: ${fps}`;
      fpsEl.style.color = fps >= 30 ? '#0f0' : fps >= 20 ? '#ff0' : '#f00';
    }
  }

  updateVideo(info) {
    const videoEl = $('#debug-video');
    if (videoEl) {
      videoEl.textContent = `Video: ${info}`;
    }
  }

  updateTracking(info) {
    const trackingEl = $('#debug-tracking');
    if (trackingEl) {
      trackingEl.textContent = `Tracking: ${info}`;
    }
  }

  updateAudio(info) {
    const audioEl = $('#debug-audio');
    if (audioEl) {
      audioEl.textContent = `Audio: ${info}`;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 🎯 MAIN AR APPLICATION
// ═══════════════════════════════════════════════════════════════

class ARApplication {
  constructor() {
    this.mindarThree = null;
    this.audioManager = new AudioManager();
    this.debugMonitor = new DebugMonitor();
    this.isInitialized = false;
  }

  async start() {
    try {
      log('=== Starting AR Application ===');
      
      // Hide start button and permission message
      UI.startBtn.style.display = 'none';
      if (UI.permissionMsg) UI.permissionMsg.style.display = 'none';

      // Show loading
      UI.loadingOverlay.style.display = 'flex';
      UI.loadingOverlay.classList.remove('hidden');

      // Step 1: Initialize AudioContext (iOS requirement)
      updateLoadingText('Inizializzazione audio...', '1/4');
      await this.initAudioContext();

      // Step 2: Initialize MindAR
      updateLoadingText('Caricamento tracking engine...', '2/4');
      await this.initMindAR();

      // Step 3: Setup scene
      updateLoadingText('Preparazione scena 3D...', '3/4');
      await this.setupScene();

      // Step 4: Load audio assets
      updateLoadingText('Caricamento audio assets...', '4/4');
      await this.loadAudioAssets();

      // Setup event handlers
      this.setupEventHandlers();

      // Start MindAR
      await this.mindarThree.start();
      log('✅ MindAR started successfully');

      // Hide loading, show instructions
      hideLoading();
      UI.instructions.classList.add('visible');
      
      setTimeout(() => {
        UI.instructions.classList.remove('visible');
      }, 5000);

      // Play initial voice guide
      this.playVoiceGuide();

      // Start render loop
      this.startRenderLoop();

      // Show success message
      showMsg('✅ AR avviato! Inquadra un target', 4000);

      this.isInitialized = true;

      // Debug info
      if (CONFIG.DEBUG) {
        setTimeout(() => this.logDebugInfo(), 2000);
      }

    } catch (error) {
      logError('Failed to start AR:', error);
      this.handleError(error);
    }
  }

  async initAudioContext() {
    try {
      if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (window.audioContext.state === 'suspended') {
          await window.audioContext.resume();
        }
        log('✅ AudioContext initialized');
      }
    } catch (error) {
      logError('AudioContext initialization failed:', error);
      // Non blocca l'applicazione, continua senza audio
    }
  }

  async initMindAR() {
    const isMobile = CompatibilityChecker.isMobile();
    
    this.mindarThree = new MindARThree({
      container: $("#container"),
      imageTargetSrc: CONFIG.MIND_PATH,
      uiScanning: "#scanning",
      uiLoading: "no",
      filterMinCF: CONFIG.MOBILE_OPTIMIZATION.filterMinCF,
      filterBeta: CONFIG.MOBILE_OPTIMIZATION.filterBeta,
      warmupTolerance: CONFIG.MOBILE_OPTIMIZATION.warmupTolerance,
      missTolerance: CONFIG.MOBILE_OPTIMIZATION.missTolerance,
      maxTrack: isMobile ? CONFIG.MOBILE_OPTIMIZATION.maxTrack : CONFIG.NUM_TARGETS,
      rendererSettings: {
        alpha: true,
        antialias: !isMobile, // Disabilita antialiasing su mobile per performance
        powerPreference: "high-performance"
      }
    });

    log('✅ MindAR initialized');
  }

  async setupScene() {
    const { scene, camera, renderer } = this.mindarThree;
    const container = $("#container");

    // Setup audio listener
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);

    // Setup lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Renderer optimization
    const isMobile = CompatibilityChecker.isMobile();
    renderer.setPixelRatio(isMobile ? CONFIG.MOBILE_OPTIMIZATION.pixelRatio : window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Disable shadows on mobile for performance
    if (isMobile) {
      renderer.shadowMap.enabled = false;
    }

    log('✅ Scene setup complete');
  }

  async loadAudioAssets() {
    const loader = new THREE.AudioLoader();
    this.audios = [];
    const audioPromises = [];

    for (let i = 0; i < CONFIG.NUM_TARGETS; i++) {
      const anchor = this.mindarThree.addAnchor(i);
      const sound = new THREE.PositionalAudio(this.listener);

      const audioPromise = new Promise((resolve, reject) => {
        loader.load(
          `${CONFIG.AUDIO_PATH}audio_${i}.mp3`,
          (buffer) => {
            log(`Audio ${i} loaded: ${buffer.duration.toFixed(2)}s`);
            sound.setBuffer(buffer);
            sound.setRefDistance(CONFIG.AUDIO.refDistance);
            sound.setRolloffFactor(CONFIG.AUDIO.rolloffFactor);
            sound.setVolume(CONFIG.AUDIO.volume);
            resolve(sound);
            
            updateLoadingProgress(`Audio ${i + 1}/${CONFIG.NUM_TARGETS} caricato`);
          },
          (progress) => {
            if (progress.total > 0) {
              const percent = (progress.loaded / progress.total * 100).toFixed(0);
              log(`Audio ${i} loading: ${percent}%`);
            }
          },
          (error) => {
            logError(`Audio ${i} load error:`, error);
            reject(error);
          }
        );
      });

      audioPromises.push(audioPromise);
      this.audios[i] = sound;
      anchor.group.add(sound);

      // Setup anchor events
      this.setupAnchorEvents(anchor, sound, i);
    }

    await Promise.allSettled(audioPromises);
    log('✅ All audio assets processed');
  }

  setupAnchorEvents(anchor, sound, index) {
    const scanningElement = $("#scanning");
    let lostTimer = null;

    anchor.onTargetFound = () => {
      log(`🎯 Target ${index} found!`);
      clearTimeout(lostTimer);

      if (this.debugMonitor.enabled) {
        this.debugMonitor.updateTracking(`Target ${index} active`);
      }

      // Stop previous audio
      if (this.audioManager.isPlaying()) {
        this.audioManager.stopCurrentAudio();
        showMsg('🔄 Cambio audio...', 2000);
      }

      // Check audio context state
      if (this.listener.context.state !== 'running') {
        showMsg('⚠️ Tocca per sbloccare audio');
        return;
      }

      // Play audio
      if (sound.buffer) {
        log(`▶️ Playing audio ${index}`);
        sound.play();
        this.audioManager.setCurrentAudio(sound, this.listener.context);
        UI.stopBtn.style.display = 'block';
        showMsg(`🎵 Audio ${index + 1} in riproduzione`);

        if (this.debugMonitor.enabled) {
          this.debugMonitor.updateAudio(`Playing ${index}`);
        }

        // Handle audio end
        if (sound.source) {
          sound.source.onended = () => {
            if (this.audioManager.currentAudio === sound) {
              this.audioManager.stopCurrentAudio();
              showMsg('✅ Audio terminato', 4000);
              if (this.debugMonitor.enabled) {
                this.debugMonitor.updateAudio('Stopped');
              }
            }
          };
        }
      } else {
        showMsg(`⚠️ Audio ${index + 1} non disponibile`);
      }

      // Hide scanning UI
      setTimeout(() => {
        if (scanningElement) {
          scanningElement.classList.add('hidden');
          scanningElement.style.display = 'none';
        }
      }, 50);
    };

    anchor.onTargetLost = () => {
      log(`🎯 Target ${index} lost... waiting confirmation`);
      
      clearTimeout(lostTimer);
      lostTimer = setTimeout(() => {
        log('Target loss confirmed');
        
        if (scanningElement) {
          scanningElement.classList.remove('hidden');
          scanningElement.style.display = 'flex';
        }

        if (this.debugMonitor.enabled) {
          this.debugMonitor.updateTracking('No target');
        }
      }, 300);
    };
  }

  setupEventHandlers() {
    // Stop button
    UI.stopBtn.addEventListener('click', () => {
      log('🔇 Stop button pressed');
      this.audioManager.stopCurrentAudio();
      showMsg('🔇 Audio fermato', 3000);
    });

    // Resize handler
    window.addEventListener('resize', () => {
      if (this.mindarThree) {
        const container = $("#container");
        const { renderer } = this.mindarThree;
        renderer.setSize(container.clientWidth, container.clientHeight);
        log(`🔄 Resized: ${container.clientWidth}x${container.clientHeight}`);
      }
    });

    // Orientation change (mobile)
    if (CompatibilityChecker.isMobile()) {
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          if (this.mindarThree) {
            const container = $("#container");
            const { renderer } = this.mindarThree;
            renderer.setSize(container.clientWidth, container.clientHeight);
            log('📱 Orientation changed');
          }
        }, 100);
      });
    }
  }

  playVoiceGuide() {
    try {
      const guida = new Audio('./assets/audio/guida.mp3');
      guida.play().then(() => {
        log('▶️ Voice guide played');
      }).catch((e) => {
        log('⚠️ Voice guide error:', e);
      });
    } catch (error) {
      log('⚠️ Voice guide failed:', error);
    }
  }

  startRenderLoop() {
    const { renderer, scene, camera } = this.mindarThree;
    
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  logDebugInfo() {
    const video = this.mindarThree.video;
    if (video) {
      const videoInfo = `${video.videoWidth}x${video.videoHeight}`;
      log(`📹 Video: ${videoInfo}, playing: ${!video.paused}`);
      this.debugMonitor.updateVideo(videoInfo);
    }
    
    const { scene } = this.mindarThree;
    log(`📱 Scene children: ${scene.children.length}`);
  }

  handleError(error) {
    hideLoading();
    
    let errorMessage = '❌ Errore sconosciuto';
    
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      errorMessage = '❌ Permessi camera negati. Abilita l\'accesso alla camera nelle impostazioni.';
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      errorMessage = '❌ Nessuna camera trovata sul dispositivo.';
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      errorMessage = '❌ Camera già in uso da un\'altra applicazione.';
    } else if (error.message) {
      errorMessage = `❌ Errore: ${error.message}`;
    }
    
    showMsg(errorMessage, 8000);
    UI.startBtn.style.display = 'block';
    UI.startBtn.textContent = '🔄 Riprova';
  }
}

// ═══════════════════════════════════════════════════════════════
// 🚀 APPLICATION INITIALIZATION
// ═══════════════════════════════════════════════════════════════

let arApp = null;

async function initializeApp() {
  log('📱 Application initializing...');
  
  // Check browser compatibility
  const compatibility = CompatibilityChecker.check();
  const browserInfo = CompatibilityChecker.getBrowserInfo();
  
  log('Browser:', browserInfo);
  log('Compatibility:', compatibility);
  
  if (!compatibility.compatible) {
    logError('Browser not compatible:', compatibility.results);
    UI.compatibilityWarning.style.display = 'block';
    hideLoading();
    return;
  }
  
  // Create AR application instance
  arApp = new ARApplication();
  
  // Setup start button
  UI.startBtn.addEventListener('click', async () => {
    try {
      await arApp.start();
    } catch (error) {
      logError('Start failed:', error);
    }
  });
  
  hideLoading();
  log('✅ Application ready');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// ═══════════════════════════════════════════════════════════════
// 📤 EXPORT (per eventuali estensioni future)
// ═══════════════════════════════════════════════════════════════

export { ARApplication, AudioManager, CompatibilityChecker, DebugMonitor };
