/**
 * RANI'S 3D BIRTHDAY GIFT - MAIN SCRIPT
 * For Swayam & Ranu • Crafted with Three.js, GSAP & Love ❤️
 */

(function () {
  'use strict';

  /* ==========================================================================
     GLOBAL STATE & VARIABLES
     ========================================================================== */
  const state = {
    musicPlaying: false,
    audioInitialized: false,
    currentPhotoIndex: 0,
    totalPhotos: 10,
    candlesBlown: false,
    micListening: false,
    audioContext: null,
    synthInterval: null,
    isMobile: window.innerWidth < 768
  };

  // DOM Elements
  const openingScreen = document.getElementById('openingScreen');
  const giftBoxWrap = document.getElementById('giftBoxWrap');
  const openGiftBtn = document.getElementById('openGiftBtn');
  const giftLid = document.getElementById('giftLid');
  const boxInteriorGlow = document.getElementById('boxInteriorGlow');
  const mainContent = document.getElementById('mainContent');
  const progressBar = document.getElementById('progressBar');

  // Music Elements
  const bgMusic = document.getElementById('bgMusic');
  const musicPill = document.getElementById('musicPill');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const iconPause = document.getElementById('iconPause');
  const iconPlay = document.getElementById('iconPlay');

  // Gallery Elements
  const carouselTrack = document.getElementById('carouselTrack');
  const photoCards = Array.from(document.querySelectorAll('.photo-card'));
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselDots = document.getElementById('carouselDots');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const loveReactionBtn = document.getElementById('loveReactionBtn');
  const reactionCount = document.getElementById('reactionCount');

  // Love Letter Elements
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  const letterCard = document.getElementById('letterCard');
  let letterOpened = false;

  // Cake Elements
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const candles = document.querySelectorAll('.candle');
  const flames = document.querySelectorAll('.flame');
  const smokes = document.querySelectorAll('.smoke');
  const wishRevealBanner = document.getElementById('wishRevealBanner');
  const micToggleBtn = document.getElementById('micToggleBtn');
  const micStatus = document.getElementById('micStatus');

  // Final Surprise Elements
  const replayBtn = document.getElementById('replayBtn');
  const scrollIndicator = document.getElementById('scrollIndicator');


  /* ==========================================================================
     1. AUDIO SYSTEM & SYNTHESIZER FALLBACK
     ========================================================================== */
  // Create a gentle Web Audio API synthesizer for romantic piano-box chords
  // if song.mp3 is missing or fails to play initially.
  function playSynthMelodyFallback() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!state.audioContext) {
        state.audioContext = new AudioContext();
      }
      if (state.audioContext.state === 'suspended') {
        state.audioContext.resume();
      }

      // Romantic Ishq Wala Love chord progression (D, F#m, G, A)
      const chordFrequencies = [
        [293.66, 369.99, 440.00], // D Major
        [293.66, 369.99, 440.00, 587.33],
        [369.99, 440.00, 554.37], // F#m
        [392.00, 493.88, 587.33], // G Major
        [440.00, 554.37, 659.25]  // A Major
      ];

      let noteIdx = 0;
      function playTone(freq, duration, delay) {
        setTimeout(() => {
          if (!state.musicPlaying) return;
          const osc = state.audioContext.createOscillator();
          const gain = state.audioContext.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, state.audioContext.currentTime);

          gain.gain.setValueAtTime(0.001, state.audioContext.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.12, state.audioContext.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, state.audioContext.currentTime + duration);

          osc.connect(gain);
          gain.connect(state.audioContext.destination);

          osc.start();
          osc.stop(state.audioContext.currentTime + duration);
        }, delay);
      }

      state.synthInterval = setInterval(() => {
        if (!state.musicPlaying) return;
        const chord = chordFrequencies[noteIdx % chordFrequencies.length];
        chord.forEach((f, i) => {
          playTone(f, 1.8, i * 220);
        });
        noteIdx++;
      }, 1600);
    } catch (e) {
      console.warn('Web Audio Fallback not available', e);
    }
  }

  function startMusic() {
    state.musicPlaying = true;
    musicPill.classList.add('playing');
    iconPause.style.display = 'block';
    iconPlay.style.display = 'none';

    // Set initial volume low and fade in smoothly
    bgMusic.volume = 0;
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Fade volume up to 0.7 over 2.5s
          let vol = 0;
          const fadeInterval = setInterval(() => {
            if (vol < 0.7 && state.musicPlaying) {
              vol = Math.min(0.7, vol + 0.05);
              bgMusic.volume = vol;
            } else {
              clearInterval(fadeInterval);
            }
          }, 150);
        })
        .catch(err => {
          console.log('Audio file play prevented or song.mp3 not found, using ambient synth melody fallback.', err);
          playSynthMelodyFallback();
        });
    }
  }

  function pauseMusic() {
    state.musicPlaying = false;
    musicPill.classList.remove('playing');
    iconPause.style.display = 'none';
    iconPlay.style.display = 'block';
    bgMusic.pause();
    if (state.synthInterval) {
      clearInterval(state.synthInterval);
    }
  }

  function toggleMusic() {
    if (state.musicPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }

  musicPill.addEventListener('click', toggleMusic);


  /* ==========================================================================
     2. OPENING SCREEN & GIFT BOX UNBOXING
     ========================================================================== */
  function openGiftBox() {
    if (state.audioInitialized) return;
    state.audioInitialized = true;

    // Trigger romantic confetti celebration immediately on tap
    confettiCelebration();

    // Start background music
    startMusic();

    // GSAP 3D Gift Box Opening Animation
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();

      // Lid pops up and rotates away in 3D
      tl.to(giftLid, {
        y: -140,
        rotateX: -45,
        rotateZ: 25,
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      })
      // Interior golden glow beams out
      .to(boxInteriorGlow, {
        opacity: 1,
        scale: 1.5,
        duration: 0.6
      }, '-=0.8')
      // Fade out opening overlay
      .to(openingScreen, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          openingScreen.classList.add('hidden');
          mainContent.classList.add('revealed');
          musicPill.classList.add('visible');

          // Trigger Hero section entrance animations
          initHeroEntranceAnimations();
        }
      }, '+=0.2');
    } else {
      // Fallback if GSAP is blocked or delayed
      openingScreen.classList.add('hidden');
      mainContent.classList.add('revealed');
      musicPill.classList.add('visible');
    }
  }

  giftBoxWrap.addEventListener('click', openGiftBox);
  openGiftBtn.addEventListener('click', openGiftBox);


  /* ==========================================================================
     3. HERO SECTION ENTRANCE ANIMATIONS
     ========================================================================== */
  function initHeroEntranceAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.from('#heroTitle', {
      scale: 0.8,
      y: 40,
      opacity: 0,
      duration: 1.4,
      ease: 'back.out(1.5)'
    });

    gsap.from('#heroSubtitle', {
      y: 30,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: 'power2.out'
    });

    gsap.from('.stat-card', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.7,
      ease: 'power2.out'
    });
  }

  // Smooth scroll down when clicking scroll indicator
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const gallerySection = document.getElementById('gallerySection');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  /* ==========================================================================
     4. PERSISTENT THREE.JS AMBIENT 3D BACKGROUND
     (Falling Rose Petals, Floating 3D Hearts, and Golden Stardust)
     ========================================================================== */
  function initThreeJSBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient and Point Lights (Soft romantic lighting, no harsh glare)
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 0.9, 80);
    pointLight.position.set(0, 30, 0);
    scene.add(pointLight);

    // --- 1. Floating Rose Petals (3D Geometry - Kept safely in the background) ---
    const petalCount = state.isMobile ? 20 : 40;
    const petals = [];

    // Parametric curved petal geometry
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.6, 0.8, 1.2, 1.8, 0, 3.0);
    petalShape.bezierCurveTo(-1.2, 1.8, -0.6, 0.8, 0, 0);

    const petalGeom = new THREE.ShapeGeometry(petalShape);
    const petalMat = new THREE.MeshPhongMaterial({
      color: 0xc2185b,
      emissive: 0x3d071a,
      specular: 0x551122,
      side: THREE.DoubleSide,
      shininess: 15,
      transparent: true,
      opacity: 0.65
    });

    for (let i = 0; i < petalCount; i++) {
      const petal = new THREE.Mesh(petalGeom, petalMat);
      // Keep Z strictly behind the text plane (z < -10)
      petal.position.set(
        (Math.random() - 0.5) * 85,
        Math.random() * 80 - 40,
        -10 - Math.random() * 25
      );
      petal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.3 + Math.random() * 0.35;
      petal.scale.set(scale, scale, scale);

      petal.userData = {
        speedY: 0.04 + Math.random() * 0.06,
        speedX: (Math.random() - 0.5) * 0.02,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        swayAngle: Math.random() * Math.PI * 2
      };
      scene.add(petal);
      petals.push(petal);
    }

    // --- 2. Floating 3D Hearts (Delicate, Soft Pink/Ruby, Stays Behind Text) ---
    const heartCount = state.isMobile ? 14 : 24;
    const hearts = [];

    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const heartGeom = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeom.center();

    // Soft romantic rose-gold translucent material with zero harsh white glare
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xe07a98,
      roughness: 0.95,
      metalness: 0.05,
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < heartCount; i++) {
      const heart = new THREE.Mesh(heartGeom, heartMat);
      // Spawn far to the sides and deep in the background (z < -30)
      const sideX = (Math.random() > 0.5 ? 1 : -1) * (24 + Math.random() * 30);
      heart.position.set(
        sideX,
        (Math.random() - 0.5) * 60,
        -30 - Math.random() * 25
      );
      heart.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );
      // Delicate floating size
      const scale = 0.14 + Math.random() * 0.12;
      heart.scale.set(scale, scale, scale);

      heart.userData = {
        speedY: 0.03 + Math.random() * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        rotSpeedX: (Math.random() - 0.5) * 0.008
      };
      scene.add(heart);
      hearts.push(heart);
    }

    // --- 3. Golden Stardust Particles ---
    const starCount = state.isMobile ? 200 : 450;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 100;
      starPositions[i + 1] = (Math.random() - 0.5) * 100;
      starPositions[i + 2] = (Math.random() - 0.5) * 60;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.35,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    // Parallax Interaction Variables
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.015;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    });

    // Mobile Gyroscope / Tilt support
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          mouseX = (e.gamma / 45) * 4;
          mouseY = ((e.beta - 45) / 45) * 4;
        }
      });
    }

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      // Animate petals (tumbling down)
      petals.forEach(p => {
        p.position.y -= p.userData.speedY;
        p.position.x += Math.sin(clock.elapsedTime + p.userData.swayAngle) * p.userData.speedX;
        p.rotation.x += p.userData.rotSpeedX;
        p.rotation.y += p.userData.rotSpeedY;
        p.rotation.z += p.userData.rotSpeedZ;

        // Reset to top when out of bounds
        if (p.position.y < -38) {
          p.position.y = 38;
          p.position.x = (Math.random() - 0.5) * 85;
          p.position.z = -10 - Math.random() * 25;
        }
      });

      // Animate hearts (floating gently up in background, sides only)
      hearts.forEach(h => {
        h.position.y += h.userData.speedY;
        h.rotation.y += h.userData.rotSpeedY;
        h.rotation.x += h.userData.rotSpeedX;

        // Reset to bottom when floating too high (stay deep behind text and on sides)
        if (h.position.y > 38) {
          h.position.y = -38;
          h.position.x = (Math.random() > 0.5 ? 1 : -1) * (24 + Math.random() * 30);
          h.position.z = -30 - Math.random() * 25;
        }
      });

      // Slowly rotate starfield
      starField.rotation.y += 0.0006;

      renderer.render(scene, camera);
    }
    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  /* ==========================================================================
     5. 3D PHOTO GALLERY (CAROUSEL & SWIPE GESTURES)
     ========================================================================== */
  function initGalleryCarousel() {
    // Generate Pagination Dots
    carouselDots.innerHTML = '';
    photoCards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => updateCarousel(idx));
      carouselDots.appendChild(dot);
    });

    // Update 3D Positions of all cards
    function updateCarousel(newIndex) {
      state.currentPhotoIndex = (newIndex + state.totalPhotos) % state.totalPhotos;
      const isMobile = window.innerWidth < 768;

      photoCards.forEach((card, idx) => {
        // True circular offset in range [-total/2, total/2]
        let offset = idx - state.currentPhotoIndex;
        while (offset > state.totalPhotos / 2) offset -= state.totalPhotos;
        while (offset < -state.totalPhotos / 2) offset += state.totalPhotos;

        card.classList.remove('active');

        if (offset === 0) {
          // Dead Center Active Card
          card.classList.add('active');
          card.style.transform = 'translateX(0px) translateZ(60px) rotateY(0deg) scale(1.05)';
          card.style.opacity = '1';
          card.style.zIndex = '20';
          card.style.filter = 'brightness(1)';
          card.style.pointerEvents = 'auto';
        } else if (Math.abs(offset) === 1) {
          // Immediately adjacent card (left / right)
          const direction = offset > 0 ? 1 : -1;
          const tx = direction * (isMobile ? 115 : 210);
          const tz = isMobile ? -50 : -60;
          const rotY = -direction * (isMobile ? 22 : 28);
          const sc = isMobile ? 0.88 : 0.92;

          card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${sc})`;
          card.style.opacity = isMobile ? '0.7' : '0.82';
          card.style.zIndex = '12';
          card.style.filter = 'brightness(0.72)';
          card.style.pointerEvents = 'auto';
        } else if (Math.abs(offset) === 2) {
          // Second adjacent card
          const direction = offset > 0 ? 1 : -1;
          const tx = direction * (isMobile ? 190 : 380);
          const tz = isMobile ? -100 : -120;
          const rotY = -direction * (isMobile ? 32 : 38);
          const sc = isMobile ? 0.75 : 0.82;

          card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${sc})`;
          card.style.opacity = isMobile ? '0.28' : '0.45';
          card.style.zIndex = '6';
          card.style.filter = 'brightness(0.5)';
          card.style.pointerEvents = 'auto';
        } else {
          // Other cards hidden cleanly in depth
          card.style.transform = 'translateX(0px) translateZ(-250px) scale(0.6)';
          card.style.opacity = '0';
          card.style.zIndex = '1';
          card.style.pointerEvents = 'none';
        }
      });

      // Update Dots
      const dots = Array.from(carouselDots.children);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === state.currentPhotoIndex);
      });
    }

    // Nav Button Clicks
    if (carouselPrev) {
      carouselPrev.addEventListener('click', () => updateCarousel(state.currentPhotoIndex - 1));
    }
    if (carouselNext) {
      carouselNext.addEventListener('click', () => updateCarousel(state.currentPhotoIndex + 1));
    }

    // Touch & Swipe Event Handlers (Mobile-First)
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    // Desktop Mouse Drag Support
    carouselTrack.addEventListener('mousedown', (e) => {
      isDragging = true;
      touchStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      touchEndX = e.clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          updateCarousel(state.currentPhotoIndex + 1); // Swipe Left -> Next
        } else {
          updateCarousel(state.currentPhotoIndex - 1); // Swipe Right -> Prev
        }
      }
    }

    // Click on Card -> If active open Lightbox, if neighbor bring to center
    photoCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (state.currentPhotoIndex === idx) {
          openLightbox(card);
        } else {
          updateCarousel(idx);
        }
      });
    });

    // Initial render
    updateCarousel(0);
    window.addEventListener('resize', () => updateCarousel(state.currentPhotoIndex));
  }


  /* ==========================================================================
     6. LIGHTBOX MODAL (TAP TO ZOOM & REACTION)
     ========================================================================== */
  function openLightbox(card) {
    const img = card.querySelector('img');
    const title = card.getAttribute('data-title');
    const caption = card.getAttribute('data-caption');

    lightboxImg.src = img.src;
    lightboxTitle.textContent = title || 'Our Precious Moment';
    lightboxCaption.textContent = caption || 'Every moment with you is etched forever in my heart.';

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  // Love Reaction Floating Hearts Button
  let reactionLikes = 1;
  if (loveReactionBtn) {
    loveReactionBtn.addEventListener('click', (e) => {
      reactionLikes++;
      reactionCount.textContent = reactionLikes;

      // Burst miniature floating hearts
      for (let i = 0; i < 6; i++) {
        createFloatingHeart(e.clientX, e.clientY);
      }
    });
  }

  function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${x || window.innerWidth / 2}px`;
    heart.style.top = `${y || window.innerHeight / 2}px`;
    heart.style.fontSize = `${18 + Math.random() * 16}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '3500';
    heart.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translate(${(Math.random() - 0.5) * 120}px, -${80 + Math.random() * 80}px) scale(1.4)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1000);
  }


  /* ==========================================================================
     NEW SECTION 1: 10 REASONS WHY YOU ARE SPECIAL ❤️
     ========================================================================== */
  function initReasonsSection() {
    const reasonCards = document.querySelectorAll('.reason-card');
    const reasonsOpenedCountEl = document.getElementById('reasonsOpenedCount');
    const allReasonsModal = document.getElementById('allReasonsModal');
    const closeReasonsModalBtn = document.getElementById('closeReasonsModalBtn');
    const openedReasons = new Set();
    const totalReasons = reasonCards.length || 10;

    reasonCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const reasonId = card.getAttribute('data-reason');
        card.classList.toggle('flipped');

        if (card.classList.contains('flipped')) {
          openedReasons.add(reasonId);
          createFloatingHeart(e.clientX, e.clientY);
        }

        if (reasonsOpenedCountEl) {
          reasonsOpenedCountEl.textContent = openedReasons.size;
        }

        // If all 10 cards are unlocked -> Trigger grand celebration!
        if (openedReasons.size === totalReasons) {
          setTimeout(() => {
            confettiCelebration();
            launchFireworksShow();
            if (allReasonsModal) {
              allReasonsModal.classList.add('active');
            }
          }, 600);
        }
      });
    });

    if (closeReasonsModalBtn && allReasonsModal) {
      closeReasonsModalBtn.addEventListener('click', () => {
        allReasonsModal.classList.remove('active');
      });
      allReasonsModal.addEventListener('click', (e) => {
        if (e.target === allReasonsModal) {
          allReasonsModal.classList.remove('active');
        }
      });
    }
  }


  /* ==========================================================================
     NEW SECTION 2: EDITABLE TIMELINE DATA (OUR BEAUTIFUL JOURNEY TOGETHER 🫶)
     (Swayam: You can easily edit all dates, titles, descriptions & images here!)
     ========================================================================== */
  const timelineData = [
    {
      id: 1,
      title: "The Day We Met",
      date: "The Beginning ✨",
      image: "images/photo1.jpg",
      badge: "Destiny ❤️",
      desc: "The moment destiny smiled and our paths crossed. A simple hello that sparked a connection unlike anything I had ever felt before.",
      footer: "💖 The day my forever started",
      icon: "✨"
    },
    {
      id: 2,
      title: "Our First Conversation",
      date: "The Endless Talks 🌙",
      image: "images/photo9.jpg",
      badge: "First Talks 🌙",
      desc: "From shy hellos to talking for hours without looking at the clock. Late night conversations where I realized your soul matched mine completely.",
      footer: "🌙 When hours felt like seconds",
      icon: "☕"
    },
    {
      id: 3,
      title: "Our First Special Moment",
      date: "The Spark ✨",
      image: "images/photo3.jpg",
      badge: "Magic ✨",
      desc: "That unforgettable moment when our eyes locked, the world vanished, and I knew deep down in my heart that you were the one.",
      footer: "✨ Pure magic in your eyes",
      icon: "💍"
    },
    {
      id: 4,
      title: "Our Favourite Memories",
      date: "Precious Moments 🌸",
      image: "images/photo7.jpg",
      badge: "Together 💖",
      desc: "Dressing up together in matching colors, teasing each other, sharing inside jokes, and laughing until our stomachs hurt. Every memory with you is golden.",
      footer: "🌸 The sweetest chapters of our story",
      icon: "🌸"
    },
    {
      id: 5,
      title: "The Moments That Made Us Smile",
      date: "Warm Embraces 🤍",
      image: "images/photo8.jpg",
      badge: "Pure Peace 🤍",
      desc: "Those quiet, sweet hugs where no words were needed. Just holding you close and realizing that home is not a place—it is wherever you are, Ranu.",
      footer: "🤍 You are my peace and my home",
      icon: "🏡"
    },
    {
      id: 6,
      title: "Today – Ranu's Special Birthday",
      date: "Today • 26 NOV 👑",
      image: "images/photo2.jpg",
      badge: "Queen's Day 👑",
      desc: "Today is entirely about you, my love. Celebrating the most radiant, wonderful person in my world. May every dream in your eyes come true!",
      footer: "💕 Happy Birthday, Meri Jaan Ranu!",
      icon: "🎂",
      isHighlight: true
    }
  ];

  function initTimelineSection() {
    const wrapper = document.getElementById('timelineItemsWrapper');
    if (!wrapper) return;

    // Render timeline items dynamically from timelineData
    wrapper.innerHTML = timelineData.map(item => `
      <div class="timeline-item" data-milestone="${item.id}">
        <div class="timeline-node"><span class="node-icon">${item.icon}</span></div>
        <div class="timeline-card ${item.isHighlight ? 'highlight-card' : ''}">
          <div class="timeline-img-holder">
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='images/photo1.jpg';">
            <span class="timeline-img-badge ${item.isHighlight ? 'gold' : ''}">${item.badge}</span>
          </div>
          <span class="milestone-badge ${item.isHighlight ? 'gold' : ''}">${item.date}</span>
          <h3 class="milestone-title">${item.title}</h3>
          <p class="milestone-desc">${item.desc}</p>
          <div class="milestone-footer">
            <span>${item.footer}</span>
          </div>
        </div>
      </div>
    `).join('');

    // GSAP ScrollTrigger Animation
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      const items = wrapper.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: (index % 2) * 0.1
        });
      });
    }
  }


  /* ==========================================================================
     NEW SECTION 3: MYSTERY GIFT SURPRISE 🎁
     ========================================================================== */
  function initMysteryGiftSection() {
    const mysteryBox = document.getElementById('mysteryBox');
    const mysteryUnlockBtn = document.getElementById('mysteryUnlockBtn');
    const mysteryBoxContainer = document.getElementById('mysteryBoxContainer');
    const mysteryLid = document.getElementById('mysteryLid');
    const mysteryInnerLight = document.getElementById('mysteryInnerLight');
    const mysteryRevealContent = document.getElementById('mysteryRevealContent');
    const oneMoreSurpriseBtn = document.getElementById('oneMoreSurpriseBtn');
    const hiddenSecretLetter = document.getElementById('hiddenSecretLetter');

    let mysteryUnlocked = false;

    function unlockMystery() {
      if (mysteryUnlocked) return;
      mysteryUnlocked = true;

      confettiCelebration();

      if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        tl.to(mysteryLid, {
          y: -130,
          rotateX: -45,
          rotateZ: 25,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out'
        })
        .to(mysteryInnerLight, {
          opacity: 1,
          scale: 1.4,
          duration: 0.6
        }, '-=0.7')
        .to(mysteryBoxContainer, {
          opacity: 0,
          y: -20,
          duration: 0.7,
          ease: 'power2.in',
          onComplete: () => {
            mysteryBoxContainer.style.display = 'none';
            mysteryRevealContent.style.display = 'block';
            gsap.from(mysteryRevealContent, {
              opacity: 0,
              y: 40,
              scale: 0.95,
              duration: 1,
              ease: 'back.out(1.4)'
            });
          }
        });
      } else {
        mysteryBoxContainer.style.display = 'none';
        mysteryRevealContent.style.display = 'block';
      }
    }

    if (mysteryUnlockBtn) mysteryUnlockBtn.addEventListener('click', unlockMystery);
    if (mysteryBox) mysteryBox.addEventListener('click', unlockMystery);

    if (oneMoreSurpriseBtn) {
      oneMoreSurpriseBtn.addEventListener('click', () => {
        if (!hiddenSecretLetter) return;
        confettiCelebration();
        oneMoreSurpriseBtn.style.display = 'none';
        hiddenSecretLetter.style.display = 'block';
        if (typeof gsap !== 'undefined') {
          gsap.from(hiddenSecretLetter, {
            scale: 0.9,
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'back.out(1.3)'
          });
        }
      });
    }
  }


  /* ==========================================================================
     8. LOVE LETTER ENVELOPE INTERACTION
     ========================================================================== */
  function toggleLoveLetter() {
    letterOpened = !letterOpened;

    if (letterOpened) {
      envelope.classList.add('opened');
      if (typeof gsap !== 'undefined') {
        gsap.to('#envelopeTop', {
          rotateX: 180,
          transformOrigin: 'top center',
          duration: 0.6,
          ease: 'power2.inOut'
        });
        gsap.to(letterCard, {
          y: -120,
          scale: 1.02,
          duration: 0.9,
          delay: 0.3,
          ease: 'back.out(1.2)'
        });
      }
      createFloatingHeart(window.innerWidth / 2, window.innerHeight / 2);
    } else {
      envelope.classList.remove('opened');
      if (typeof gsap !== 'undefined') {
        gsap.to(letterCard, {
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.inOut'
        });
        gsap.to('#envelopeTop', {
          rotateX: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.inOut'
        });
      }
    }
  }

  if (waxSeal) waxSeal.addEventListener('click', toggleLoveLetter);
  if (letterCard) letterCard.addEventListener('click', toggleLoveLetter);


  /* ==========================================================================
     9. BIRTHDAY CAKE MOMENT & CANDLE BLOWOUT
     ========================================================================== */
  function blowOutCandles() {
    if (state.candlesBlown) return;
    state.candlesBlown = true;

    // Extinguish Flames
    flames.forEach(flame => flame.classList.add('extinguished'));

    // Trigger Smoke Wisps
    smokes.forEach(smoke => smoke.classList.add('active'));

    // Massive Birthday Confetti & Fireworks
    confettiCelebration();
    launchFireworksShow();

    // Reveal Wish Banner
    setTimeout(() => {
      wishRevealBanner.style.display = 'block';
      if (typeof gsap !== 'undefined') {
        gsap.from(wishRevealBanner, {
          scale: 0.85,
          opacity: 0,
          duration: 1,
          ease: 'back.out(1.5)'
        });
      }
    }, 800);

    // Stop mic if active
    stopMicListening();
  }

  if (blowCandlesBtn) blowCandlesBtn.addEventListener('click', blowOutCandles);
  candles.forEach(candle => candle.addEventListener('click', blowOutCandles));

  // Microphone Audio Blow Detection (Hands-Free Option)
  function initMicDetection() {
    if (state.micListening) {
      stopMicListening();
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        state.micListening = true;
        micStatus.textContent = 'Listening for your blow... Blow softly into mic!';
        micToggleBtn.style.color = '#dfb15b';

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const microphone = audioCtx.createMediaStreamSource(stream);
        analyser.fftSize = 256;
        microphone.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkBlow() {
          if (!state.micListening || state.candlesBlown) {
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          analyser.getByteFrequencyData(dataArray);

          // Calculate average sound volume
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;

          // Threshold for blowing air into phone microphone
          if (average > 55) {
            blowOutCandles();
            stream.getTracks().forEach(track => track.stop());
            state.micListening = false;
            micStatus.textContent = 'Candles blown! ✨';
            return;
          }

          requestAnimationFrame(checkBlow);
        }
        checkBlow();
      })
      .catch(err => {
        console.warn('Microphone permission not granted or not available', err);
        micStatus.textContent = 'Mic unavailable. Tap the button to blow!';
      });
  }

  function stopMicListening() {
    state.micListening = false;
    micStatus.textContent = '';
  }

  if (micToggleBtn) micToggleBtn.addEventListener('click', initMicDetection);


  /* ==========================================================================
     10. CONFETTI & FIREWORKS ENGINE (canvas-confetti)
     ========================================================================== */
  function confettiCelebration() {
    if (typeof confetti === 'undefined') return;

    // Dual cannons blast from bottom corners
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#ffd700', '#dfb15b', '#e07a98', '#b76e79', '#ffffff']
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  function launchFireworksShow() {
    if (typeof confetti === 'undefined') return;

    const duration = 4.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd700', '#ff69b4', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#dfb15b', '#e07a98', '#ff758c']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }


  /* ==========================================================================
     11. FINAL SURPRISE: INTERACTIVE 3D PARTICLE HEART (Three.js)
     ========================================================================== */
  function init3DParticleHeart() {
    const canvas = document.getElementById('heartCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const stage = document.getElementById('heart3dStage');
    const width = stage.clientWidth || 360;
    const height = stage.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Parametric 3D Heart Particle Cloud
    const particleCount = state.isMobile ? 1800 : 3200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xff4081); // Bright Pink
    const color2 = new THREE.Color(0xffd700); // Gold
    const color3 = new THREE.Color(0xd81b60); // Deep Rose

    for (let i = 0; i < particleCount; i++) {
      // True 3D Mathematical Heart Parametric Curve
      // x = 16 * sin^3(t)
      // y = 13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t)
      const t = Math.PI * 2 * Math.random();
      const u = (Math.random() - 0.5) * 2;
      const spread = 0.85 + Math.random() * 0.3;

      let hx = 16 * Math.pow(Math.sin(t), 3);
      let hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      let hz = u * (1 - Math.abs(t - Math.PI) / Math.PI) * 12;

      // Scale down to stage view
      const scale = 0.8 * spread;
      positions[i * 3] = hx * scale * 0.8;
      positions[i * 3 + 1] = hy * scale * 0.8;
      positions[i * 3 + 2] = hz * scale * 0.8;

      // Color gradient blend
      const mixedColor = Math.random() > 0.4 ? color1.clone().lerp(color3, Math.random()) : color2.clone();
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const heartPoints = new THREE.Points(geometry, material);
    scene.add(heartPoints);

    // Interactive Drag / Touch to Rotate
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;
    let rotSpeedX = 0, rotSpeedY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rotSpeedY += deltaX * 0.005;
      rotSpeedX += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    // Touch support for 3D Heart
    canvas.addEventListener('touchstart', (e) => {
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      rotSpeedY += deltaX * 0.006;
      rotSpeedX += deltaY * 0.006;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    // Render & Heartbeat Animation Loop
    let clock = new THREE.Clock();
    function animateHeart() {
      requestAnimationFrame(animateHeart);
      const time = clock.getElapsedTime();

      // Realistic Double-Beat Heartbeat Pulse (Lub-Dub)
      const beat = (Math.sin(time * 3.5) + Math.sin(time * 7.0)) * 0.05 + 1;
      heartPoints.scale.set(beat, beat, beat);

      // Apply drag rotation with smooth damping
      heartPoints.rotation.y += rotSpeedY + 0.006; // Slow default spin
      heartPoints.rotation.x += rotSpeedX;
      rotSpeedX *= 0.92;
      rotSpeedY *= 0.92;

      renderer.render(scene, camera);
    }
    animateHeart();

    // Stage resize handler
    window.addEventListener('resize', () => {
      const newW = stage.clientWidth;
      const newH = stage.clientHeight;
      if (newW && newH) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
  }


  /* ==========================================================================
     12. SCROLL PROGRESS TRACKER & REPLAY BUTTON
     ========================================================================= */
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      confettiCelebration();
    });
  }


    /* ==========================================================================
     13. FEATURE 5: LIVE BIRTHDAY COUNTDOWN 🎂
     ========================================================================== */
  function initCountdown() {
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');
    const countdownStatus = document.getElementById('countdownStatus');
    if (!cdDays || !cdHours || !cdMinutes || !cdSeconds) return;

    function update() {
      const now = new Date();
      let currentYear = now.getFullYear();
      // 26 November: month index 10
      let target = new Date(currentYear, 10, 26, 0, 0, 0);

      // If more than 24 hours past 26 Nov of this year, count to next year
      if (now - target > 24 * 60 * 60 * 1000) {
        target = new Date(currentYear + 1, 10, 26, 0, 0, 0);
      }

      const diff = target - now;

      if (diff <= 0 && Math.abs(diff) <= 24 * 60 * 60 * 1000) {
        cdDays.textContent = '00';
        cdHours.textContent = '00';
        cdMinutes.textContent = '00';
        cdSeconds.textContent = '00';
        if (countdownStatus) {
          countdownStatus.innerHTML = '🎉 IT\'S TODAY! HAPPY BIRTHDAY RANU! 🎂❤️';
          countdownStatus.style.color = '#ffd700';
        }
        return;
      }

      const d = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const h = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const m = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      const s = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

      cdDays.textContent = String(d).padStart(2, '0');
      cdHours.textContent = String(h).padStart(2, '0');
      cdMinutes.textContent = String(m).padStart(2, '0');
      cdSeconds.textContent = String(s).padStart(2, '0');

      if (countdownStatus) {
        if (d === 0) {
          countdownStatus.textContent = 'Only a few hours left until your magical day! 💖';
        } else {
          countdownStatus.textContent = `Counting down every heartbeat until 26 November ✨`;
        }
      }
    }

    update();
    setInterval(update, 1000);
  }


  /* ==========================================================================
     14. FEATURE 1: MY VOICE, MY WISHES 🎧
     ========================================================================== */
  function initVoicePlayer() {
    const voiceAudio = document.getElementById('voiceAudio');
    const voicePlayBtn = document.getElementById('voicePlayBtn');
    const vPlayIcon = document.getElementById('vPlayIcon');
    const vPauseIcon = document.getElementById('vPauseIcon');
    const voiceBtnText = document.getElementById('voiceBtnText');
    const voiceCurrentTime = document.getElementById('voiceCurrentTime');
    const voiceDuration = document.getElementById('voiceDuration');
    const voiceSeekBar = document.getElementById('voiceSeekBar');
    const voiceSeekFill = document.getElementById('voiceSeekFill');
    const waveformContainer = document.getElementById('waveformContainer');
    const voiceHeartPulse = document.getElementById('voiceHeartPulse');

    if (!voiceAudio || !voicePlayBtn) return;

    // Generate dynamic waveform bars if container is present
    if (waveformContainer && waveformContainer.children.length === 0) {
      for (let i = 0; i < 36; i++) {
        const bar = document.createElement('div');
        bar.className = 'waveform-bar';
        const h = Math.floor(Math.random() * 65) + 20;
        bar.style.height = `${h}%`;
        bar.style.animationDelay = `${(i * 0.05).toFixed(2)}s`;
        waveformContainer.appendChild(bar);
      }
    }

    function formatTime(sec) {
      if (isNaN(sec) || !isFinite(sec)) return '0:00';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    voiceAudio.addEventListener('loadedmetadata', () => {
      if (voiceDuration) voiceDuration.textContent = formatTime(voiceAudio.duration);
    });

    let pausedBgForVoice = false;

    function playVoice() {
      if (state.musicPlaying && bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        pausedBgForVoice = true;
      }
      voiceAudio.play().then(() => {
        if (vPlayIcon) vPlayIcon.style.display = 'none';
        if (vPauseIcon) vPauseIcon.style.display = 'inline-block';
        if (voiceBtnText) voiceBtnText.textContent = 'Pause Message';
        if (waveformContainer) waveformContainer.classList.add('playing');
        if (voiceHeartPulse) voiceHeartPulse.classList.add('active');
      }).catch(err => {
        console.log('Voice audio playback prevented:', err);
      });
    }

    function pauseVoice() {
      voiceAudio.pause();
      if (vPlayIcon) vPlayIcon.style.display = 'inline-block';
      if (vPauseIcon) vPauseIcon.style.display = 'none';
      if (voiceBtnText) voiceBtnText.textContent = 'Listen to My Voice';
      if (waveformContainer) waveformContainer.classList.remove('playing');
      if (voiceHeartPulse) voiceHeartPulse.classList.remove('active');

      if (pausedBgForVoice && bgMusic) {
        bgMusic.play().catch(() => {});
        pausedBgForVoice = false;
      }
    }

    voicePlayBtn.addEventListener('click', () => {
      if (voiceAudio.paused) {
        playVoice();
      } else {
        pauseVoice();
      }
    });

    voiceAudio.addEventListener('timeupdate', () => {
      if (voiceCurrentTime) voiceCurrentTime.textContent = formatTime(voiceAudio.currentTime);
      if (voiceAudio.duration) {
        const pct = (voiceAudio.currentTime / voiceAudio.duration) * 100;
        if (voiceSeekFill) voiceSeekFill.style.width = `${pct}%`;
      }
    });

    voiceAudio.addEventListener('ended', () => {
      pauseVoice();
      if (voiceAudio.duration) {
        voiceAudio.currentTime = 0;
        if (voiceSeekFill) voiceSeekFill.style.width = '0%';
        if (voiceCurrentTime) voiceCurrentTime.textContent = '0:00';
      }
    });

    if (voiceSeekBar) {
      const handleSeek = (e) => {
        const rect = voiceSeekBar.getBoundingClientRect();
        const clickX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const fraction = Math.max(0, Math.min(1, clickX / rect.width));
        if (voiceAudio.duration) {
          voiceAudio.currentTime = fraction * voiceAudio.duration;
        }
      };
      voiceSeekBar.addEventListener('click', handleSeek);
    }
  }


  /* ==========================================================================
     15. FEATURE 2: DISTANCE DOESN'T MATTER 🌍
     ========================================================================== */
  function initDistanceSection() {
    const locationPins = document.querySelectorAll('.location-point');
    const distanceCard = document.querySelector('.distance-card');
    if (!distanceCard) return;

    const messages = [
      "Swayam • Pune (Thinking of Ranu every second) ❤️",
      "Ranu • The Queen of My Heart 👑💖",
      "700+ km apart, but beating as one! Distance means so little when you mean so much ✨"
    ];

    locationPins.forEach((pin, i) => {
      pin.style.cursor = 'pointer';
      pin.addEventListener('click', () => {
        createFloatingHeart(window.innerWidth / 2, window.innerHeight / 2);
        const existing = distanceCard.querySelector('.distance-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'distance-toast';
        toast.innerHTML = `<span>✨ ${messages[i % messages.length]} ✨</span>`;
        distanceCard.appendChild(toast);
        setTimeout(() => {
          if (toast.parentElement) toast.remove();
        }, 2800);
      });
    });
  }


  /* ==========================================================================
     16. FEATURE 4: OUR UNIVERSE 🌌
     ========================================================================== */
  function initUniverseStars() {
    const starPoints = document.querySelectorAll('.star-point');
    const starMemoryModal = document.getElementById('starMemoryModal');
    const starCloseBtn = document.getElementById('starCloseBtn');
    const starMemIcon = document.getElementById('starMemIcon');
    const starMemTitle = document.getElementById('starMemTitle');
    const starMemImg = document.getElementById('starMemImg');
    const starMemText = document.getElementById('starMemText');
    const starMemDate = document.getElementById('starMemDate');

    if (!starMemoryModal) return;

    const starMemories = [
      {
        icon: "🌟",
        title: "The First Spark",
        img: "images/photo1.jpg",
        date: "August • When It All Began",
        text: "The day you stepped into my thoughts, everything shifted into warm, vibrant color. You became the brightest constellation in my universe."
      },
      {
        icon: "✨",
        title: "Endless Late Night Whispers",
        img: "images/photo2.jpg",
        date: "September • Midnight Memories",
        text: "Hours slipped by like seconds. Listening to your sweet giggles through the phone while looking up at the night sky made me realize: you are my home."
      },
      {
        icon: "💫",
        title: "Traditional Elegance",
        img: "images/photo3.jpg",
        date: "October • Pure Magic",
        text: "Seeing you dressed in traditional beauty took my breath away completely. No star in the Milky Way could ever compete with your radiance."
      },
      {
        icon: "💖",
        title: "The Cute Little Moments",
        img: "images/photo4.jpg",
        date: "Every Single Day",
        text: "Your cute little habits, the way you tease me, and that precious laugh. These small everyday stars form the galaxy of my happiness."
      },
      {
        icon: "👑",
        title: "My Queen, My Sanctuary",
        img: "images/photo5.jpg",
        date: "November • Pure Grace",
        text: "Whenever the world feels chaotic, just thinking of your gentle smile restores all the calm in my heart. You are my greatest blessing."
      },
      {
        icon: "❤️",
        title: "Soul to Soul Connection",
        img: "images/photo7.jpg",
        date: "26 November • Your Day",
        text: "In my universe, you aren't just a star; you are the gravity holding my entire world together. Happy Birthday, Ranu!"
      }
    ];

    starPoints.forEach((point, index) => {
      point.style.cursor = 'pointer';
      point.addEventListener('click', () => {
        const starIndex = parseInt(point.getAttribute('data-star') || (index + 1), 10) - 1;
        const mem = starMemories[starIndex % starMemories.length];

        if (starMemIcon) starMemIcon.textContent = mem.icon;
        if (starMemTitle) starMemTitle.textContent = mem.title;
        if (starMemImg) starMemImg.src = mem.img;
        if (starMemText) starMemText.textContent = mem.text;
        if (starMemDate) starMemDate.textContent = mem.date;

        starMemoryModal.classList.add('active');
        starMemoryModal.style.display = 'flex';
        confettiCelebration();
      });
    });

    function closeStarModal() {
      starMemoryModal.classList.remove('active');
      setTimeout(() => {
        starMemoryModal.style.display = 'none';
      }, 250);
    }

    if (starCloseBtn) starCloseBtn.addEventListener('click', closeStarModal);
    starMemoryModal.addEventListener('click', (e) => {
      if (e.target === starMemoryModal) closeStarModal();
    });
  }


  /* ==========================================================================
     17. FEATURE 3: OPEN WHEN LETTERS 💌
     ========================================================================== */
  function initOpenWhenLetters() {
    const openWhenCards = document.querySelectorAll('.open-when-card');
    const openWhenModal = document.getElementById('openWhenModal');
    const openWhenBackdrop = document.getElementById('openWhenBackdrop');
    const openWhenClose = document.getElementById('openWhenClose');
    const parchmentTitle = document.getElementById('parchmentTitle');
    const parchmentBody = document.getElementById('parchmentBody');

    if (!openWhenModal) return;

    const openWhenLetters = [
      {
        title: "Open When You Miss Me 💌",
        body: `Meri pyaari Ranu,\n\nWhenever you miss me, close your eyes, take a deep breath, and place your hand over your heart. Feel that rhythmic beat? That's me, whispering across the miles that I love you more with every single tick of the clock.\n\nDistance is only physical, meri jaan. You live rent-free in my thoughts from the moment I wake up till I drift off to sleep. Whenever you feel alone, send me a single text saying 'I miss you' — no matter what I'm doing, you will always be my number one priority.\n\nSoon, very soon, we won't have to miss each other through phone screens. Until then, remember that my heart beats only for you.\n\nAlways right here beside you,\nSwayam ❤️`
      },
      {
        title: "Open When You Feel Sad 🫂",
        body: `My precious girl,\n\nI wish I could be there in person right now to wrap my arms around you, pull you close to my chest, and let you rest your head while all your worries melt away.\n\nIt's okay to feel overwhelmed sometimes, and it's okay to let a tear fall. But please don't forget how incredibly strong, beautiful, and resilient you are. Whatever bad day or circumstance you are facing right now, it is only a passing cloud in our bright sky.\n\nSmile for me, Ranu? Your smile has the magical power to turn any ordinary day into pure gold. I am always in your corner, loving you unconditionally through every storm.\n\nWith infinite warm hugs,\nSwayam 💕`
      },
      {
        title: "Open When You Are Happy ✨",
        body: `Yaaay, my sunshine girl! 🌟\n\nNothing in this entire world makes me happier than knowing that bright, beautiful smile of yours is lighting up your face right now!\n\nYour joy is pure magic, Ranu. When you're excited, your eyes sparkle in a way that makes my heart flutter all over again. Hold onto this golden feeling, celebrate it, dance around, and know that you deserve every single ounce of joy and celebration in this universe.\n\nThank you for bringing so much color, warmth, and laughter into my life. Keep glowing, meri jaan!\n\nCelebrating you always,\nSwayam 🥳❤️`
      },
      {
        title: "Open When You Need Motivation 💪",
        body: `Hey my queen,\n\nTake a look in the mirror right now. Do you see the woman standing there? She is ambitious, capable, deeply compassionate, and capable of achieving anything she sets her heart upon.\n\nNever let a moment of self-doubt hold you back. Every obstacle is just a stepping stone proving how extraordinary you are. I have total, unwavering faith in you.\n\nGo out there, hold your head high, and show the world what you're made of. I'll always be standing behind you as your biggest cheerleader and proudest partner.\n\nYou've got this, my love!\nSwayam 🦁✨`
      },
      {
        title: "Open When You Want to Smile 😊",
        body: `Knock knock! Who's there? The luckiest boy on Earth!\n\nDid you know that every time you laugh, my whole universe becomes ten times brighter? Remember the silly moments, the cute little arguments we laugh off, and how you scrunch your nose when you're playfully mad?\n\nYou are adorably funny, effortlessly cute, and entirely irreplaceable. If I could give you one gift in life, it would be the ability to see yourself through my eyes — then you'd realize just how deeply, crazily, and unconditionally you are adored.\n\nI love you so much, my cute little drama queen! 🙈❤️\n\nForever yours,\nSwayam 🌹`
      }
    ];

    openWhenCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const letterIndex = parseInt(card.getAttribute('data-letter') || (index + 1), 10) - 1;
        const letter = openWhenLetters[letterIndex % openWhenLetters.length];

        if (parchmentTitle) parchmentTitle.textContent = letter.title;
        if (parchmentBody) {
          parchmentBody.innerHTML = letter.body.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
        }

        openWhenModal.classList.add('active');
        openWhenModal.style.display = 'flex';
        confettiCelebration();
      });
    });

    function closeOpenWhen() {
      openWhenModal.classList.remove('active');
      setTimeout(() => {
        openWhenModal.style.display = 'none';
      }, 250);
    }

    if (openWhenClose) openWhenClose.addEventListener('click', closeOpenWhen);
    if (openWhenBackdrop) openWhenBackdrop.addEventListener('click', closeOpenWhen);
    openWhenModal.addEventListener('click', (e) => {
      if (e.target === openWhenModal) closeOpenWhen();
    });
  }


  /* ==========================================================================
     18. FEATURE 6: A MOVIE ABOUT RANU 🎬
     ========================================================================== */
  function initMovieSlideshow() {
    const startMovieBtn = document.getElementById('startMovieBtn');
    const movieIntroSlide = document.getElementById('movieIntroSlide');
    const moviePhotoSlide = document.getElementById('moviePhotoSlide');
    const movieOutroSlide = document.getElementById('movieOutroSlide');
    const movieImg = document.getElementById('movieImg');
    const movieChapterTag = document.getElementById('movieChapterTag');
    const movieSceneTitle = document.getElementById('movieSceneTitle');
    const movieSceneDesc = document.getElementById('movieSceneDesc');
    const moviePlayPauseBtn = document.getElementById('moviePlayPauseBtn');
    const movieProgressFill = document.getElementById('movieProgressFill');
    const movieCounter = document.getElementById('movieCounter');
    const movieFullscreenBtn = document.getElementById('movieFullscreenBtn');
    const movieTheater = document.getElementById('movieTheater');
    const replayMovieBtn = document.getElementById('replayMovieBtn');

    if (!movieTheater) return;

    const movieScenes = [
      { img: 'images/photo1.jpg', tag: 'SCENE 01 • PROLOGUE', title: 'The First Spark', desc: 'Where two wandering souls found their home in each other\'s eyes.' },
      { img: 'images/photo2.jpg', tag: 'SCENE 02 • THE SMILE', title: 'A Smile That Stole My Heart', desc: 'Every time you smile like this, time stands still for a moment.' },
      { img: 'images/photo3.jpg', tag: 'SCENE 03 • ELEGANCE', title: 'Grace Personified', desc: 'Looking at you in traditional beauty, I know I\'m the luckiest man alive.' },
      { img: 'images/photo4.jpg', tag: 'SCENE 04 • CUTE MOMENTS', title: 'Pure Innocence & Charm', desc: 'Your playful attitude and adorable quirks that never fail to melt me.' },
      { img: 'images/photo5.jpg', tag: 'SCENE 05 • RADIANCE', title: 'Unmatched Warmth', desc: 'Under all the festive lights, but you were the one shining brightest.' },
      { img: 'images/photo6.jpg', tag: 'SCENE 06 • TOGETHERNESS', title: 'Side By Side', desc: 'Every memory we create is a love poem written across the stars.' },
      { img: 'images/photo7.jpg', tag: 'SCENE 07 • THAT WARM EMBRACE', title: 'Safe In Your Hug', desc: 'In your embrace, all the noise of the world fades into peaceful silence.' },
      { img: 'images/photo8.jpg', tag: 'SCENE 08 • CLOSENESS', title: 'Soul to Soul', desc: 'The distance between our cities vanishes when our hearts beat as one.' },
      { img: 'images/photo9.jpg', tag: 'SCENE 09 • CELEBRATION', title: 'Cherishing Every Second', desc: 'Every single day with you is a festival I never want to end.' },
      { img: 'images/photo10.jpg', tag: 'SCENE 10 • FOREVER & ALWAYS', title: 'To Infinity & Beyond', desc: 'And this is just the beginning of our forever fairytale...' }
    ];

    let currentSceneIndex = 0;
    let movieInterval = null;
    let isPlaying = false;

    function showScene(idx) {
      if (idx >= movieScenes.length) {
        endMovie();
        return;
      }
      currentSceneIndex = idx;
      const scene = movieScenes[idx];

      if (movieIntroSlide) movieIntroSlide.style.display = 'none';
      if (movieOutroSlide) movieOutroSlide.style.display = 'none';
      if (moviePhotoSlide) {
        moviePhotoSlide.style.display = 'flex';
        moviePhotoSlide.classList.remove('fade-in');
        void moviePhotoSlide.offsetWidth;
        moviePhotoSlide.classList.add('fade-in');
      }

      if (movieImg) {
        movieImg.src = scene.img;
        movieImg.classList.remove('kenburns');
        void movieImg.offsetWidth;
        movieImg.classList.add('kenburns');
      }

      if (movieChapterTag) movieChapterTag.textContent = scene.tag;
      if (movieSceneTitle) movieSceneTitle.textContent = scene.title;
      if (movieSceneDesc) movieSceneDesc.textContent = scene.desc;

      if (movieCounter) movieCounter.textContent = `${idx + 1} / ${movieScenes.length}`;
      if (movieProgressFill) {
        const pct = ((idx + 1) / movieScenes.length) * 100;
        movieProgressFill.style.width = `${pct}%`;
      }
    }

    function startMovie() {
      isPlaying = true;
      showScene(0);
      clearInterval(movieInterval);
      movieInterval = setInterval(() => {
        showScene(currentSceneIndex + 1);
      }, 4500);

      if (moviePlayPauseBtn) {
        moviePlayPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
      }

      if (!state.musicPlaying && bgMusic) {
        toggleMusic();
      }
    }

    function pauseMovie() {
      isPlaying = false;
      clearInterval(movieInterval);
      if (moviePlayPauseBtn) {
        moviePlayPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
      }
    }

    function resumeMovie() {
      isPlaying = true;
      clearInterval(movieInterval);
      movieInterval = setInterval(() => {
        showScene(currentSceneIndex + 1);
      }, 4500);
      if (moviePlayPauseBtn) {
        moviePlayPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
      }
    }

    function endMovie() {
      isPlaying = false;
      clearInterval(movieInterval);
      if (moviePhotoSlide) moviePhotoSlide.style.display = 'none';
      if (movieOutroSlide) {
        movieOutroSlide.style.display = 'flex';
        movieOutroSlide.classList.add('fade-in');
      }
      if (movieProgressFill) movieProgressFill.style.width = '100%';
      confettiCelebration();
    }

    if (startMovieBtn) startMovieBtn.addEventListener('click', startMovie);
    if (replayMovieBtn) replayMovieBtn.addEventListener('click', startMovie);

    if (moviePlayPauseBtn) {
      moviePlayPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
          pauseMovie();
        } else {
          if (currentSceneIndex >= movieScenes.length) {
            startMovie();
          } else {
            resumeMovie();
          }
        }
      });
    }

    if (movieFullscreenBtn && movieTheater) {
      movieFullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          if (movieTheater.requestFullscreen) {
            movieTheater.requestFullscreen();
          } else if (movieTheater.webkitRequestFullscreen) {
            movieTheater.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }
  }


  /* ==========================================================================
     19. FEATURE 7: HOW WELL DO YOU KNOW ME? COUPLE QUIZ 🧩
     ========================================================================== */
  function initQuiz() {
    const quizQIndicator = document.getElementById('quizQIndicator');
    const quizCurrentScore = document.getElementById('quizCurrentScore');
    const quizProgressBar = document.getElementById('quizProgressBar');
    const quizQuestionText = document.getElementById('quizQuestionText');
    const quizOptionsGrid = document.getElementById('quizOptionsGrid');
    const quizFeedbackBox = document.getElementById('quizFeedbackBox');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackText = document.getElementById('feedbackText');
    const quizNextBtn = document.getElementById('quizNextBtn');
    const quizCompletedView = document.getElementById('quizCompletedView');
    const finalScoreText = document.getElementById('finalScoreText');
    const quizReactionText = document.getElementById('quizReactionText');
    const quizRetryBtn = document.getElementById('quizRetryBtn');
    const quizBody = document.getElementById('quizBody');

    if (!quizQuestionText || !quizOptionsGrid) return;

    const quizQuestions = [
      {
        q: "What is Swayam's absolute favorite thing about Ranu?",
        options: ["Her innocent smile 😊", "Her caring nature ❤️", "The way she blushes 🙈", "All of the above! 💖"],
        correct: 3,
        comment: "Awww yes! Every single detail about you is my favorite, meri jaan! 🥰"
      },
      {
        q: "What makes Swayam happiest during our phone calls?",
        options: ["Hearing your cute laugh ✨", "Talking for hours without pause 📞", "Hearing you say 'I miss you' 🥺", "All of these! ❤️"],
        correct: 3,
        comment: "Bingo! Your voice is literally my favorite sound in the world! 💕"
      },
      {
        q: "Who is the cute little drama queen in our relationship? 😉",
        options: ["Definitely Swayam", "Obviously Ranu! 👑", "Both of us equally", "Neither of us"],
        correct: 1,
        comment: "Haha yes! But you're my favorite drama queen in the entire universe! 👸💖"
      },
      {
        q: "How long has our love journey been so far?",
        options: ["1 month", "2 months", "3 magical months 💫", "6 months"],
        correct: 2,
        comment: "3 months that felt like the sweetest, most romantic dream! 🌟"
      },
      {
        q: "What is Swayam's favorite nickname for you?",
        options: ["Meri Jaan ❤️", "Ranu", "Sweetheart", "Babu"],
        correct: 0,
        comment: "You are truly meri jaan, today, tomorrow, and always! ✨"
      },
      {
        q: "When distance gets tough, what keeps our hearts connected?",
        options: ["Our endless video calls 📱", "Unbreakable trust 🤝", "Our hearts beating as one 💓", "All of the above! 🌍"],
        correct: 3,
        comment: "Exactly! Distance has nothing on what we share! 🫶"
      },
      {
        q: "What is the theme love song playing on this website?",
        options: ["Ranu's Special Birthday Song 🎵", "Tum Se Hi", "Kesariya", "Raataan Lambiyan"],
        correct: 0,
        comment: "Yes! 'Ranu tula aaj manaapasun Happy Birthday saajra... Majhya laadkya baykola vadhadivsachya shubhechha!' 🎶❤️"
      },
      {
        q: "What is the most special date of November?",
        options: ["1st Nov", "14th Nov", "26th Nov (Ranu's Birthday!) 🎂", "30th Nov"],
        correct: 2,
        comment: "The day the prettiest angel arrived on Earth! Happy Birthday! 🥳🎉"
      },
      {
        q: "What is Swayam's biggest wish for your birthday?",
        options: ["All the happiness in the world ✨", "To be right by your side 🫂", "That your sweetest dreams come true 🌈", "All of these and more! 💖"],
        correct: 3,
        comment: "You deserve every single blessing in this universe and more! 🌟"
      },
      {
        q: "How much does Swayam love you?",
        options: ["To the moon and back 🌙", "More than words can say 💌", "To infinity and beyond 🚀", "Infinite times infinite! ❤️♾️"],
        correct: 3,
        comment: "Forever and always, my love! You scored 10/10 in my heart! 💕"
      }
    ];

    let currentQ = 0;
    let score = 0;
    let answered = false;

    function loadQuestion(index) {
      answered = false;
      const q = quizQuestions[index];

      if (quizQIndicator) quizQIndicator.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
      if (quizCurrentScore) quizCurrentScore.textContent = score;
      if (quizProgressBar) {
        quizProgressBar.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;
      }

      if (quizQuestionText) quizQuestionText.textContent = q.q;
      if (quizFeedbackBox) quizFeedbackBox.style.display = 'none';
      if (quizNextBtn) quizNextBtn.style.display = 'none';

      if (quizOptionsGrid) {
        quizOptionsGrid.innerHTML = '';
        q.options.forEach((optText, optIdx) => {
          const btn = document.createElement('button');
          btn.className = 'quiz-opt-btn';
          btn.textContent = optText;
          btn.addEventListener('click', () => handleOptionClick(optIdx, btn));
          quizOptionsGrid.appendChild(btn);
        });
      }
    }

    function handleOptionClick(selectedIdx, clickedBtn) {
      if (answered) return;
      answered = true;

      const q = quizQuestions[currentQ];
      const allBtns = quizOptionsGrid.querySelectorAll('.quiz-opt-btn');

      if (selectedIdx === q.correct) {
        score++;
        clickedBtn.classList.add('correct');
        if (quizCurrentScore) quizCurrentScore.textContent = score;
        if (feedbackIcon) feedbackIcon.textContent = '🎉';
        if (feedbackText) feedbackText.textContent = q.comment;
        if (quizFeedbackBox) {
          quizFeedbackBox.className = 'quiz-feedback-box correct';
          quizFeedbackBox.style.display = 'flex';
        }
        createFloatingHeart(window.innerWidth / 2, window.innerHeight / 2);
      } else {
        clickedBtn.classList.add('wrong');
        allBtns[q.correct].classList.add('correct');
        if (feedbackIcon) feedbackIcon.textContent = '🥺';
        if (feedbackText) feedbackText.textContent = `Aww, almost! Correct answer: "${q.options[q.correct]}". Swayam loves you anyway! ❤️`;
        if (quizFeedbackBox) {
          quizFeedbackBox.className = 'quiz-feedback-box wrong';
          quizFeedbackBox.style.display = 'flex';
        }
      }

      allBtns.forEach(b => b.disabled = true);
      if (quizNextBtn) {
        quizNextBtn.style.display = 'inline-flex';
        quizNextBtn.textContent = currentQ === quizQuestions.length - 1 ? 'View Final Results 🏆' : 'Next Question ➡️';
      }
    }

    if (quizNextBtn) {
      quizNextBtn.addEventListener('click', () => {
        if (currentQ < quizQuestions.length - 1) {
          currentQ++;
          loadQuestion(currentQ);
        } else {
          showResults();
        }
      });
    }

    function showResults() {
      if (quizBody) quizBody.style.display = 'none';
      if (quizCompletedView) {
        quizCompletedView.style.display = 'block';
        quizCompletedView.classList.add('fade-in');
      }
      if (finalScoreText) finalScoreText.textContent = `${score} / ${quizQuestions.length}`;

      let reaction = '';
      if (score >= 9) {
        reaction = "🏆 PERFECT 10/10! You know Swayam's heart completely, Ranu! You are my soulmate and the best girlfriend in the entire galaxy! 💖✨";
      } else if (score >= 7) {
        reaction = "🌟 AMAZING SCORE! You know me so well, meri jaan! Every day with you is pure happiness! ❤️";
      } else {
        reaction = "🥰 SWEET EFFORT! No matter the score, you have scored 100/100 in my heart forever and ever! 💕";
      }

      if (quizReactionText) quizReactionText.textContent = reaction;
      confettiCelebration();
    }

    if (quizRetryBtn) {
      quizRetryBtn.addEventListener('click', () => {
        currentQ = 0;
        score = 0;
        if (quizCompletedView) quizCompletedView.style.display = 'none';
        if (quizBody) quizBody.style.display = 'block';
        loadQuestion(0);
      });
    }

    loadQuestion(0);
  }


  /* ==========================================================================
     20. FEATURE 8: VIRTUAL FLOWER GARDEN 🌹
     ========================================================================== */
  function initFlowerGarden() {
    const flowerItems = document.querySelectorAll('.flower-item');
    const flowerMessagePill = document.getElementById('flowerMessagePill');
    const flowerIconPop = document.getElementById('flowerIconPop');
    const flowerMessageText = document.getElementById('flowerMessageText');
    const bouquetBtn = document.getElementById('bouquetBtn');
    const bouquetCard = document.getElementById('bouquetCard');

    if (!flowerItems.length) return;

    const flowerNotes = [
      { icon: "🌹", name: "Red Rose", msg: "A deep red rose for the love that blooms stronger and brighter in my heart every second." },
      { icon: "🪻", name: "Lavender", msg: "A soothing lavender for the peace, comfort, and sweet calm you bring into my chaotic life." },
      { icon: "🌻", name: "Sunflower", msg: "A bright sunflower because your smile lights up even my cloudiest, darkest days." },
      { icon: "🌷", name: "Tulip", msg: "A delicate tulip for your graceful charm, elegance, and pure heart." },
      { icon: "🌸", name: "Cherry Blossom", msg: "Cherry blossom for the innocence and fresh sweetness you bring to every conversation." },
      { icon: "🌺", name: "Hibiscus", msg: "Hibiscus for the passion, warmth, and lifelong loyalty I have sworn to you, Ranu." }
    ];

    flowerItems.forEach((item, idx) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        const flowerIdx = parseInt(item.getAttribute('data-flower') || (idx + 1), 10) - 1;
        const note = flowerNotes[flowerIdx % flowerNotes.length];

        item.classList.add('bloomed');
        const stateSpan = item.querySelector('.flower-bloom-state');
        if (stateSpan) stateSpan.textContent = 'In Full Bloom ✨';

        if (flowerIconPop) flowerIconPop.textContent = note.icon;
        if (flowerMessageText) flowerMessageText.textContent = note.msg;
        if (flowerMessagePill) {
          flowerMessagePill.style.display = 'flex';
          flowerMessagePill.classList.remove('pop-in');
          void flowerMessagePill.offsetWidth;
          flowerMessagePill.classList.add('pop-in');
        }

        createFloatingHeart(window.innerWidth / 2, window.innerHeight / 2);
      });
    });

    if (bouquetBtn && bouquetCard) {
      bouquetBtn.addEventListener('click', () => {
        bouquetCard.style.display = 'block';
        bouquetCard.classList.add('fade-in');
        bouquetBtn.style.display = 'none';
        confettiCelebration();
      });
    }
  }


  /* ==========================================================================
     21. FEATURE 9: SECRET LOVE VAULT 🔐
     ========================================================================== */
  function initSecretVault() {
    const vaultForm = document.getElementById('vaultForm');
    const vaultPassInput = document.getElementById('vaultPassInput');
    const vaultUnlockBtn = document.getElementById('vaultUnlockBtn');
    const vaultDial = document.getElementById('vaultDial');
    const vaultErrorMsg = document.getElementById('vaultErrorMsg');
    const vaultLockedState = document.getElementById('vaultLockedState');
    const vaultUnlockedState = document.getElementById('vaultUnlockedState');
    const vaultLockAgainBtn = document.getElementById('vaultLockAgainBtn');

    if (!vaultPassInput || !vaultUnlockBtn) return;

    const validPasswords = ['ranu', '2611', 'love', 'swayam', 'ishq', '26 nov', 'rani'];

    function checkPassword() {
      const entered = (vaultPassInput.value || '').trim().toLowerCase();

      if (vaultDial) {
        vaultDial.classList.add('spinning');
        setTimeout(() => vaultDial.classList.remove('spinning'), 700);
      }

      if (validPasswords.includes(entered)) {
        if (vaultErrorMsg) vaultErrorMsg.style.display = 'none';
        if (vaultLockedState) vaultLockedState.style.display = 'none';
        if (vaultUnlockedState) {
          vaultUnlockedState.style.display = 'block';
          vaultUnlockedState.classList.add('fade-in');
        }
        confettiCelebration();
      } else {
        if (vaultErrorMsg) {
          vaultErrorMsg.style.display = 'block';
          vaultErrorMsg.textContent = 'Oops! Galat password meri jaan 🙈 (Hint: Apka pyaara naam "ranu" ya birthday "2611")';
        }
        vaultPassInput.classList.add('shake');
        setTimeout(() => vaultPassInput.classList.remove('shake'), 600);
      }
    }

    vaultUnlockBtn.addEventListener('click', checkPassword);
    if (vaultForm) {
      vaultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkPassword();
      });
    }

    if (vaultLockAgainBtn) {
      vaultLockAgainBtn.addEventListener('click', () => {
        if (vaultUnlockedState) vaultUnlockedState.style.display = 'none';
        if (vaultLockedState) vaultLockedState.style.display = 'block';
        if (vaultPassInput) vaultPassInput.value = '';
        if (vaultErrorMsg) vaultErrorMsg.style.display = 'none';
      });
    }
  }


  /* ==========================================================================
     22. FEATURE 10: FINAL BIRTHDAY FIREWORKS 🎇
     ========================================================================== */
  function initFinalFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const launchBtn = document.getElementById('launchFireworksBtn');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth || 360;
    let height = canvas.height = canvas.parentElement.clientHeight || 500;

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth || 360;
        height = canvas.height = canvas.parentElement.clientHeight || 500;
      }
    });

    const particles = [];
    const rockets = [];

    class Rocket {
      constructor(startX, startY, targetX, targetY, color) {
        this.x = startX;
        this.y = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        this.speed = 3.5 + Math.random() * 2;
        const angle = Math.atan2(targetY - startY, targetX - startX);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.trail = [];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) this.trail.shift();
        this.x += this.vx;
        this.y += this.vy;
        const dist = Math.hypot(this.targetX - this.x, this.targetY - this.y);
        return dist < 8 || this.vy >= 0;
      }

      draw() {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        if (this.trail.length) {
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let pt of this.trail) ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    class Spark {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.05;
        this.friction = 0.96;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        return this.alpha <= 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function launchRocket(tx, ty) {
      const colors = ['#ff4081', '#ffd700', '#dfb15b', '#e07a98', '#9c27b0', '#00e5ff', '#ffffff'];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      const startX = width * 0.2 + Math.random() * width * 0.6;
      const startY = height;
      const targetX = tx !== undefined ? tx : width * 0.15 + Math.random() * width * 0.7;
      const targetY = ty !== undefined ? ty : height * 0.15 + Math.random() * height * 0.45;
      rockets.push(new Rocket(startX, startY, targetX, targetY, chosenColor));
    }

    function explode(x, y, color) {
      const count = state.isMobile ? 35 : 60;
      for (let i = 0; i < count; i++) {
        particles.push(new Spark(x, y, color));
      }
    }

    function renderLoop() {
      requestAnimationFrame(renderLoop);
      ctx.fillStyle = 'rgba(15, 6, 23, 0.25)';
      ctx.fillRect(0, 0, width, height);

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.draw();
        if (r.update()) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.draw();
        if (p.update()) {
          particles.splice(i, 1);
        }
      }
    }
    renderLoop();

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      launchRocket(x, y);
    });

    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        launchFireworksShow();
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            launchRocket();
          }, i * 280);
        }
      });
    }

    setInterval(() => {
      if (document.visibilityState === 'visible' && rockets.length < 3) {
        launchRocket();
      }
    }, 3200);
  }


/* ==========================================================================
     INITIALIZATION ON DOM CONTENT LOADED
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize persistent 3D background
    initThreeJSBackground();

    // 2. Initialize 3D Photo Carousel
    initGalleryCarousel();

    // 3. Initialize Section 1: 10 Reasons Why You Are Special
    initReasonsSection();

    // 4. Initialize Section 2: Our Beautiful Journey Together Timeline
    initTimelineSection();

    // 5. Initialize Section 3: Mystery Gift Surprise
    initMysteryGiftSection();

    // 6. Initialize 3D Interactive Particle Heart
    init3DParticleHeart();

    // 7. 10 NEW INTERACTIVE CELEBRATION FEATURES
    initCountdown();
    initVoicePlayer();
    initDistanceSection();
    initUniverseStars();
    initOpenWhenLetters();
    initMovieSlideshow();
    initQuiz();
    initFlowerGarden();
    initSecretVault();
    initFinalFireworks();
  });

})();
