/**
 * OUR MEMORY MUSEUM - 3D INTERACTIVE WALKTHROUGH
 * For Swayam & Ranu • Powered by Three.js
 */

(function () {
  'use strict';

  // Memories Database (Organized by 5 Rooms + Final Celebration)
  const museumMemories = [
    // Room 1: Our Beginning
    {
      id: 1,
      room: "Room 1 • Our Beginning",
      roomName: "Our Beginning",
      title: "The First Step Together",
      date: "August 2026",
      desc: "The day we took our first long walk together. Looking at you, the whole world became quiet, gentle, and infinitely beautiful.",
      img: "images/museum/mphoto1.jpg",
      position: { x: -6.85, y: 3.5, z: 8 },
      rotation: { y: Math.PI / 2 }
    },
    {
      id: 2,
      room: "Room 1 • Our Beginning",
      roomName: "Our Beginning",
      title: "Close to My Heart",
      date: "August 2026",
      desc: "That sweet, shy smile when I first wrapped my arm around you. In that very second, my heart whispered that I had found my forever.",
      img: "images/museum/mphoto2.jpg",
      position: { x: 6.85, y: 3.5, z: 12 },
      rotation: { y: -Math.PI / 2 }
    },
    {
      id: 3,
      room: "Room 1 • Our Beginning",
      roomName: "Our Beginning",
      title: "A Day Full of Sunshine",
      date: "September 2026",
      desc: "No matter how hot the sun was or how far we walked, standing next to you felt like the sweetest, coolest blessing.",
      img: "images/museum/mphoto4.jpg",
      position: { x: -6.85, y: 3.5, z: 18 },
      rotation: { y: Math.PI / 2 }
    },

    // Room 2: Beautiful Memories
    {
      id: 4,
      room: "Room 2 • Beautiful Memories",
      roomName: "Beautiful Memories",
      title: "Mehendi, Bracelet & Forever Bonds",
      date: "September 2026",
      desc: "Seeing your beautiful mehendi hand showing off our matching bracelet. Every intricate curve felt like a sacred promise etched in time.",
      img: "images/museum/mphoto3.jpg",
      position: { x: -6.85, y: 3.5, z: 32 },
      rotation: { y: Math.PI / 2 }
    },
    {
      id: 5,
      room: "Room 2 • Beautiful Memories",
      roomName: "Beautiful Memories",
      title: "Side by Side in Every Season",
      date: "October 2026",
      desc: "Shoulder to shoulder, smiling through life together. With you by my side, every ordinary day transforms into poetry.",
      img: "images/museum/mphoto5.jpg",
      position: { x: 6.85, y: 3.5, z: 36 },
      rotation: { y: -Math.PI / 2 }
    },
    {
      id: 6,
      room: "Room 2 • Beautiful Memories",
      roomName: "Beautiful Memories",
      title: "My Warmest Sanctuary",
      date: "October 2026",
      desc: "Wrapping my arms around you from behind, feeling your gentle heartbeat. In your embrace, all the noise of the world melts away.",
      img: "images/museum/mphoto10.jpg",
      position: { x: -6.85, y: 3.5, z: 42 },
      rotation: { y: Math.PI / 2 }
    },

    // Room 3: Funny Moments
    {
      id: 7,
      room: "Room 3 • Funny Moments",
      roomName: "Funny Moments",
      title: "Victory Sign & Sweetest Giggles",
      date: "September 2026",
      desc: "You flashing that cute victory sign while I tried to keep the camera straight! Your natural, unbothered innocence melts me completely.",
      img: "images/museum/mphoto6.jpg",
      position: { x: 6.85, y: 3.5, z: 54 },
      rotation: { y: -Math.PI / 2 }
    },
    {
      id: 8,
      room: "Room 3 • Funny Moments",
      roomName: "Funny Moments",
      title: "Caught by Surprise",
      date: "October 2026",
      desc: "When I put my hands on your shoulders and you made that adorable surprised gasp! These unscripted moments are my richest treasures.",
      img: "images/museum/mphoto9.jpg",
      position: { x: -6.85, y: 3.5, z: 58 },
      rotation: { y: Math.PI / 2 }
    },
    {
      id: 9,
      room: "Room 3 • Funny Moments",
      roomName: "Funny Moments",
      title: "Cheeky Drama Queen",
      date: "November 2026",
      desc: "Full drama-queen expression on display! Teasing me with your cute face. I wouldn't trade your playful attitude for the entire world.",
      img: "images/museum/mphoto11.jpg",
      position: { x: 6.85, y: 3.5, z: 66 },
      rotation: { y: -Math.PI / 2 }
    },

    // Room 4: My Favourite Pictures of You
    {
      id: 10,
      room: "Room 4 • My Favourite Pictures of You",
      roomName: "My Favourite Pictures",
      title: "Radiance & Swag",
      date: "October 2026",
      desc: "Holding sunglasses with that radiant, confident smile! You bring so much vibrant energy and class wherever you go.",
      img: "images/museum/mphoto7.jpg",
      position: { x: -6.85, y: 3.5, z: 78 },
      rotation: { y: Math.PI / 2 }
    },
    {
      id: 11,
      room: "Room 4 • My Favourite Pictures of You",
      roomName: "My Favourite Pictures",
      title: "Serene & Angelic",
      date: "October 2026",
      desc: "Looking directly at me with those pure, loving eyes. Every time I see this picture, my heart beats a little faster.",
      img: "images/museum/mphoto8.jpg",
      position: { x: 6.85, y: 3.5, z: 82 },
      rotation: { y: -Math.PI / 2 }
    },
    {
      id: 12,
      room: "Room 4 • My Favourite Pictures of You",
      roomName: "My Favourite Pictures",
      title: "Our Late Night Video Calls",
      date: "November 2026",
      desc: "Miles between our cities, but zero distance between our souls. Staring at your tired, sweet smile on my laptop until we fall asleep.",
      img: "images/museum/mphoto14.jpg",
      position: { x: -6.85, y: 3.5, z: 88 },
      rotation: { y: Math.PI / 2 }
    },
    {
      id: 13,
      room: "Room 4 • My Favourite Pictures of You",
      roomName: "My Favourite Pictures",
      title: "Grace in Pink",
      date: "November 2026",
      desc: "Dressed in soft traditional pink, posing with such poise and dignity. You are my queen in every sense of the word.",
      img: "images/museum/mphoto15.jpg",
      position: { x: 6.85, y: 3.5, z: 92 },
      rotation: { y: -Math.PI / 2 }
    },

    // Room 5: Forever Us
    {
      id: 14,
      room: "Room 5 • Forever Us",
      roomName: "Forever Us",
      title: "My Royal Queen",
      date: "Festival Night 2026",
      desc: "Under the night lights in your royal embroidered gown. You shone so brightly that everything else simply faded into the dark.",
      img: "images/museum/mphoto12.jpg",
      position: { x: -6.85, y: 3.7, z: 104 },
      rotation: { y: Math.PI / 2 }
    },
    {
      id: 15,
      room: "Room 5 • Forever Us",
      roomName: "Forever Us",
      title: "Under the Grand Chandelier",
      date: "November 2026",
      desc: "Standing gracefully beneath the shimmering chandelier. Looking at this photograph, I know I'm looking at the rest of my life.",
      img: "images/museum/mphoto13.jpg",
      position: { x: 6.85, y: 3.7, z: 110 },
      rotation: { y: -Math.PI / 2 }
    }
  ];

  // Room Boundaries and Titles
  const roomZones = [
    { startZ: -2, endZ: 24, name: "Room 1: Our Beginning" },
    { startZ: 24, endZ: 48, name: "Room 2: Beautiful Memories" },
    { startZ: 48, endZ: 72, name: "Room 3: Funny Moments" },
    { startZ: 72, endZ: 96, name: "Room 4: My Favourite Pictures" },
    { startZ: 96, endZ: 120, name: "Room 5: Forever Us" },
    { startZ: 120, endZ: 160, name: "Birthday Sanctuary 🎂✨" }
  ];

  // System State
  let scene, camera, renderer, animationFrameId;
  let isMuseumActive = false;
  let swayamMesh, ranuMesh;
  let cameraTheta = Math.PI; // Orbit angle
  let cameraPhi = 0.42;      // Pitch angle
  let cameraDistance = 6.2;
  let isPointerLocked = false;
  let isDraggingMouse = false;
  let prevMouseX = 0, prevMouseY = 0;

  // Sound Engine
  let audioCtx = null;
  let isMuted = false;
  let stepTimer = 0;

  // Movement State
  const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false };
  const joystick = { active: false, x: 0, y: 0 };
  let swayamWalkTimer = 0;
  let ranuWalkTimer = 0;
  let nearbyMemory = null;
  let nearbySurprise = false;
  let isModalOpen = false;

  // Three.js Objects Storage
  const frameMeshes = [];
  const heartParticles = [];
  const candles = [];
  const balloons = [];
  let cakePedestalMesh;

  /* ==========================================================================
     1. INITIALIZATION & DOM BINDINGS
     ========================================================================== */
  function initMuseum() {
    const openBtn = document.getElementById('openMuseumBtn');
    const heroOpenBtn = document.getElementById('heroOpenMuseumBtn');
    const closeBtn = document.getElementById('closeMuseumBtn');
    const overlay = document.getElementById('museumOverlay');

    if (openBtn) openBtn.addEventListener('click', enterMuseum);
    if (heroOpenBtn) heroOpenBtn.addEventListener('click', enterMuseum);
    if (closeBtn) closeBtn.addEventListener('click', exitMuseum);

    // Modal close buttons
    const photoCloseBtn = document.getElementById('museumModalCloseBtn');
    const photoBackdrop = document.getElementById('museumModalBackdrop');
    if (photoCloseBtn) photoCloseBtn.addEventListener('click', closePhotoModal);
    if (photoBackdrop) photoBackdrop.addEventListener('click', closePhotoModal);

    const surpriseCloseBtn = document.getElementById('museumSurpriseCloseBtn');
    const surpriseBackdrop = document.getElementById('museumSurpriseBackdrop');
    if (surpriseCloseBtn) surpriseCloseBtn.addEventListener('click', closeSurpriseModal);
    if (surpriseBackdrop) surpriseBackdrop.addEventListener('click', closeSurpriseModal);

    // Audio & Fullscreen buttons
    const musicBtn = document.getElementById('museumMusicBtn');
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        const icon = document.getElementById('museumMusicIcon');
        if (icon) icon.textContent = isMuted ? '🔇' : '🎵';
      });
    }

    const fullscreenBtn = document.getElementById('museumFullscreenBtn');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          overlay.requestFullscreen ? overlay.requestFullscreen() : overlay.webkitRequestFullscreen?.();
        } else {
          document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen?.();
        }
      });
    }

    // Keyboard & Mobile Listeners
    setupInputListeners();
  }

  function enterMuseum() {
    const overlay = document.getElementById('museumOverlay');
    if (!overlay) return;

    overlay.style.display = 'block';
    overlay.classList.add('active');
    isMuseumActive = true;

    // Pause main page audio if playing
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
    }

    // Initialize WebGL Scene on first open
    if (!scene) {
      initThreeMuseum();
    } else {
      onWindowResize();
    }

    // Reset Swayam & Ranu position to entrance
    if (swayamMesh) swayamMesh.position.set(0, 0, 9);
    if (ranuMesh) ranuMesh.position.set(1.4, 0, 7.4);

    cameraTheta = Math.PI;
    cameraPhi = 0.38;
    cameraDistance = 5.6;

    // Show desktop controls toast for 6s
    const toast = document.getElementById('museumControlsToast');
    if (toast) {
      toast.style.display = 'flex';
      setTimeout(() => { if (toast) toast.style.display = 'none'; }, 6000);
    }

    startRenderLoop();
  }

  function exitMuseum() {
    const overlay = document.getElementById('museumOverlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 400);

    isMuseumActive = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    closePhotoModal();
    closeSurpriseModal();

    // Resume main page background audio if user had it playing
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
      bgMusic.play().catch(() => {});
    }
  }


  /* ==========================================================================
     2. PROCEDURAL SOUND SYNTHESIZER
     ========================================================================== */
  function playInteractionChime() {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.35); // C6

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.75);
    } catch (e) {}
  }

  function playFootstepSound() {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }


  /* ==========================================================================
     3. THREE.JS SCENE, ARCHITECTURE & LIGHTING
     ========================================================================== */
  function initThreeMuseum() {
    const canvas = document.getElementById('museumCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0209);
    scene.fog = new THREE.FogExp2(0x14030d, 0.016);

    camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 300);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Lighting ---
    // Warm romantic ambient light
    const ambientLight = new THREE.AmbientLight(0xffe8dc, 0.95);
    scene.add(ambientLight);

    // Warm Directional Sunlight for soft shadows
    const dirLight = new THREE.DirectionalLight(0xffd700, 0.6);
    dirLight.position.set(10, 25, 20);
    scene.add(dirLight);

    // --- Architecture: Parquet Floor ---
    const floorTexture = createProceduralWoodFloor();
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(6, 40);

    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.35,
      metalness: 0.12
    });

    const floorGeom = new THREE.PlaneGeometry(16, 170);
    const floorMesh = new THREE.Mesh(floorGeom, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, 0, 80);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Expanded Floor for Final Birthday Chamber (Z: 120 - 165)
    const bdayFloorGeom = new THREE.PlaneGeometry(26, 45);
    const bdayFloorMesh = new THREE.Mesh(bdayFloorGeom, floorMat);
    bdayFloorMesh.rotation.x = -Math.PI / 2;
    bdayFloorMesh.position.set(0, 0.01, 142.5);
    bdayFloorMesh.receiveShadow = true;
    scene.add(bdayFloorMesh);

    // Luxurious Red Carpet Runner along center corridor
    const carpetMat = new THREE.MeshStandardMaterial({
      color: 0x6e0d25,
      roughness: 0.85,
      metalness: 0.05
    });
    const carpetGeom = new THREE.PlaneGeometry(3.6, 170);
    const carpetMesh = new THREE.Mesh(carpetGeom, carpetMat);
    carpetMesh.rotation.x = -Math.PI / 2;
    carpetMesh.position.set(0, 0.02, 80);
    scene.add(carpetMesh);

    // Gold Trim Lines for Carpet
    const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xdfb15b, metalness: 0.8, roughness: 0.3 });
    const trimL = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 170), goldTrimMat);
    trimL.rotation.x = -Math.PI / 2;
    trimL.position.set(-1.8, 0.03, 80);
    scene.add(trimL);
    const trimR = trimL.clone();
    trimR.position.x = 1.8;
    scene.add(trimR);

    // --- Ceiling ---
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x1f0614, roughness: 0.9 });
    const ceilingGeom = new THREE.PlaneGeometry(16, 170);
    const ceilingMesh = new THREE.Mesh(ceilingGeom, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(0, 7.6, 80);
    scene.add(ceilingMesh);

    // --- Walls ---
    buildMuseumWalls();

    // --- Chandeliers & Spotlights ---
    buildChandeliers();

    // --- Floating Magical Sparkles ---
    buildFloatingStardust();

    // --- Museum Framed Paintings ---
    buildPictureFrames();

    // --- Final Room Birthday Celebration (Cake, Balloons, Candles, Centerpiece) ---
    buildBirthdayCelebrationRoom();

    // --- 3D Avatars: Swayam & Ranu ---
    swayamMesh = createSwayamAvatar();
    swayamMesh.position.set(0, 0, 9);
    scene.add(swayamMesh);

    ranuMesh = createRanuAvatar();
    ranuMesh.position.set(1.4, 0, 7.4);
    scene.add(ranuMesh);

    window.addEventListener('resize', onWindowResize);
  }

  // Procedural Canvas Wood Floor Texture
  function createProceduralWoodFloor() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2d0f1a';
    ctx.fillRect(0, 0, 512, 512);

    // Wood planks horizontal
    const plankH = 64;
    for (let y = 0; y < 512; y += plankH) {
      ctx.fillStyle = (y / plankH) % 2 === 0 ? '#381321' : '#280c16';
      ctx.fillRect(0, y, 512, plankH - 2);

      // Wood grain streaks
      ctx.fillStyle = 'rgba(215, 140, 160, 0.06)';
      for (let i = 0; i < 6; i++) {
        const py = y + Math.random() * (plankH - 4);
        ctx.fillRect(0, py, 512, 1.5);
      }

      // Plank seams
      ctx.fillStyle = 'rgba(10, 2, 6, 0.7)';
      ctx.fillRect(0, y + plankH - 2, 512, 2);
    }

    return new THREE.CanvasTexture(canvas);
  }

  // Walls & Architectural Arches
  function buildMuseumWalls() {
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x240615,
      roughness: 0.85,
      metalness: 0.05
    });

    const goldMoldingMat = new THREE.MeshStandardMaterial({
      color: 0xdfb15b,
      metalness: 0.8,
      roughness: 0.3
    });

    // Left Corridor Wall
    const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7.6, 120), wallMat);
    wallL.position.set(-7, 3.8, 60);
    scene.add(wallL);

    // Right Corridor Wall
    const wallR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7.6, 120), wallMat);
    wallR.position.set(7, 3.8, 60);
    scene.add(wallR);

    // Gold Wall Baseboard & Dado Moldings
    const dadoL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 120), goldMoldingMat);
    dadoL.position.set(-6.95, 1.2, 60);
    scene.add(dadoL);
    const dadoR = dadoL.clone();
    dadoR.position.x = 6.95;
    scene.add(dadoR);

    // Back Entrance Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 7.6, 0.4), wallMat);
    backWall.position.set(0, 3.8, -0.2);
    scene.add(backWall);

    // Grand Entrance Double Doors (Decorative 3D)
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x3d0b20, roughness: 0.5 });
    const doorL = new THREE.Mesh(new THREE.BoxGeometry(2.4, 5.2, 0.1), doorMat);
    doorL.position.set(-1.25, 2.6, 0.1);
    scene.add(doorL);
    const doorR = doorL.clone();
    doorR.position.x = 1.25;
    scene.add(doorR);

    // Archways separating the 5 rooms (At Z: 24, 48, 72, 96, 120)
    const archPositions = [24, 48, 72, 96, 120];
    archPositions.forEach((zPos, idx) => {
      buildArchway(zPos, idx === 4);
    });

    // Final Birthday Hall Walls (Z: 120 to 165, Width: 22)
    const bdayWallL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8.4, 45), wallMat);
    bdayWallL.position.set(-11, 4.2, 142.5);
    scene.add(bdayWallL);

    const bdayWallR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8.4, 45), wallMat);
    bdayWallR.position.set(11, 4.2, 142.5);
    scene.add(bdayWallR);

    const bdayFarWall = new THREE.Mesh(new THREE.BoxGeometry(22, 8.4, 0.4), wallMat);
    bdayFarWall.position.set(0, 4.2, 165);
    scene.add(bdayFarWall);
  }

  function buildArchway(zPos, isGrand) {
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x33091e,
      roughness: 0.4,
      metalness: 0.2
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.85,
      roughness: 0.25
    });

    // Left Column
    const colL = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 7.6, 16), archMat);
    colL.position.set(-4.2, 3.8, zPos);
    scene.add(colL);

    // Right Column
    const colR = colL.clone();
    colR.position.x = 4.2;
    scene.add(colR);

    // Arch Header Beam
    const header = new THREE.Mesh(new THREE.BoxGeometry(9.4, 1.2, 0.8), archMat);
    header.position.set(0, 7.0, zPos);
    scene.add(header);

    // Gold Medallion on Arch
    const medallion = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.15, 24), goldMat);
    medallion.rotation.x = Math.PI / 2;
    medallion.position.set(0, 7.0, isGrand ? zPos - 0.45 : zPos + 0.45);
    scene.add(medallion);
  }

  // Crystal Chandeliers with Warm Glow
  function buildChandeliers() {
    const chPositions = [12, 36, 60, 84, 108, 140];
    chPositions.forEach((zPos, idx) => {
      const isFinal = idx === chPositions.length - 1;
      const chGroup = new THREE.Group();
      chGroup.position.set(0, isFinal ? 6.2 : 6.0, zPos);

      // Golden Rod
      const rodMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.2 });
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6), rodMat);
      chGroup.add(rod);

      // Chandelier Tier Rings
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xdfb15b, metalness: 0.85, roughness: 0.2 });
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(isFinal ? 1.2 : 0.85, 0.06, 8, 24), ringMat);
      ring1.rotation.x = Math.PI / 2;
      ring1.position.y = -0.7;
      chGroup.add(ring1);

      // Crystals
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.7,
        transparent: true,
        opacity: 0.85
      });

      const crystalCount = isFinal ? 16 : 10;
      for (let c = 0; c < crystalCount; c++) {
        const ang = (c / crystalCount) * Math.PI * 2;
        const radius = isFinal ? 1.2 : 0.85;
        const crystal = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.35, 5), crystalMat);
        crystal.rotation.x = Math.PI;
        crystal.position.set(Math.cos(ang) * radius, -0.9, Math.sin(ang) * radius);
        chGroup.add(crystal);
      }

      // Warm Golden Point Light
      const chLight = new THREE.PointLight(0xffdf99, isFinal ? 1.4 : 1.1, isFinal ? 28 : 22, 1.2);
      chLight.position.set(0, -0.8, 0);
      chGroup.add(chLight);

      scene.add(chGroup);
    });
  }

  // Floating Atmosphere Particles
  function buildFloatingStardust() {
    const count = 350;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 6.5 + 0.5;
      positions[i * 3 + 2] = Math.random() * 160;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.16,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const pSystem = new THREE.Points(geom, mat);
    scene.add(pSystem);
  }

  // 3D Picture Frames on Walls
  function buildPictureFrames() {
    const textureLoader = new THREE.TextureLoader();

    const goldFrameMat = new THREE.MeshStandardMaterial({
      color: 0xdfb15b,
      metalness: 0.85,
      roughness: 0.28
    });

    museumMemories.forEach(mem => {
      const frameGroup = new THREE.Group();
      frameGroup.position.set(mem.position.x, mem.position.y, mem.position.z);
      frameGroup.rotation.y = mem.rotation.y;

      // Outer Gold Frame (Width: 3.4, Height: 4.2, Depth: 0.12)
      const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.0, 0.12), goldFrameMat);
      frameGroup.add(frameMesh);

      // Inner Photo Canvas
      const photoTex = textureLoader.load(mem.img);
      if (THREE.SRGBColorSpace) photoTex.colorSpace = THREE.SRGBColorSpace;
      else if (THREE.sRGBEncoding) photoTex.encoding = THREE.sRGBEncoding;

      const photoMat = new THREE.MeshBasicMaterial({ map: photoTex });
      const photoCanvas = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.6), photoMat);
      photoCanvas.position.z = 0.07;
      frameGroup.add(photoCanvas);

      // Brass Plaque below frame
      const plaqueMat = new THREE.MeshStandardMaterial({ color: 0xcc9933, metalness: 0.9, roughness: 0.2 });
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.28, 0.05), plaqueMat);
      plaque.position.set(0, -2.25, 0.06);
      frameGroup.add(plaque);

      // Dedicated Gallery Spotlight
      const spot = new THREE.SpotLight(0xfff2d6, 1.2, 8, 0.55, 0.7);
      spot.position.set(mem.position.x > 0 ? mem.position.x - 2.5 : mem.position.x + 2.5, 6.8, mem.position.z);
      const spotTarget = new THREE.Object3D();
      spotTarget.position.set(mem.position.x, mem.position.y, mem.position.z);
      scene.add(spotTarget);
      spot.target = spotTarget;
      scene.add(spot);

      // Hovering Floating Indicator Heart (lights up on proximity)
      const heartGeom = createMiniHeartGeom();
      const heartIndMat = new THREE.MeshBasicMaterial({ color: 0xff4081, transparent: true, opacity: 0.9 });
      const indHeart = new THREE.Mesh(heartGeom, heartIndMat);
      indHeart.position.set(0, 2.45, 0.2);
      indHeart.scale.set(0.12, 0.12, 0.12);
      frameGroup.add(indHeart);

      frameGroup.userData = { mem, indHeart };
      frameMeshes.push(frameGroup);
      scene.add(frameGroup);
    });
  }

  function createMiniHeartGeom() {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y, x, y);
    shape.bezierCurveTo(x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5);
    shape.bezierCurveTo(x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 10.0);
    shape.bezierCurveTo(x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5);
    shape.bezierCurveTo(x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const geom = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: true, bevelSize: 0.4, bevelThickness: 0.4, steps: 1 });
    geom.center();
    return geom;
  }


  /* ==========================================================================
     4. FINAL BIRTHDAY SURPRISE ROOM (Cake, Candles, Balloons, Ranu Portrait)
     ========================================================================== */
  function buildBirthdayCelebrationRoom() {
    const textureLoader = new THREE.TextureLoader();

    // 1. Centerpiece Massive Portrait of Ranu on Far Wall (Z: 164.5)
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.25 });
    const portraitGroup = new THREE.Group();
    portraitGroup.position.set(0, 4.6, 164.6);

    const queenFrame = new THREE.Mesh(new THREE.BoxGeometry(6.4, 7.8, 0.15), goldMat);
    portraitGroup.add(queenFrame);

    const ranuLargeTex = textureLoader.load('images/museum/mphoto13.jpg');
    if (THREE.SRGBColorSpace) ranuLargeTex.colorSpace = THREE.SRGBColorSpace;
    else if (THREE.sRGBEncoding) ranuLargeTex.encoding = THREE.sRGBEncoding;
    const ranuLargeMat = new THREE.MeshBasicMaterial({ map: ranuLargeTex });
    const ranuLargeCanvas = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 7.2), ranuLargeMat);
    ranuLargeCanvas.position.z = 0.09;
    portraitGroup.add(ranuLargeCanvas);

    scene.add(portraitGroup);

    // 2. Birthday Pedestal & Animated Birthday Cake at (0, 0, 142)
    const pedestalMat = new THREE.MeshStandardMaterial({ color: 0x3d0a22, roughness: 0.3, metalness: 0.2 });
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.7, 1.2, 32), pedestalMat);
    pedestal.position.set(0, 0.6, 142);
    scene.add(pedestal);
    cakePedestalMesh = pedestal;

    // Multi-tier Cake
    const cakeTierMat1 = new THREE.MeshStandardMaterial({ color: 0xfce4ec, roughness: 0.5 }); // Soft Pink frosting
    const cakeTierMat2 = new THREE.MeshStandardMaterial({ color: 0xdfb15b, roughness: 0.3, metalness: 0.6 }); // Gold border
    const cakeTierMat3 = new THREE.MeshStandardMaterial({ color: 0x880e4f, roughness: 0.6 }); // Wine cream

    const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.65, 32), cakeTierMat3);
    tier1.position.set(0, 1.55, 142);
    scene.add(tier1);

    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.6, 32), cakeTierMat1);
    tier2.position.set(0, 2.15, 142);
    scene.add(tier2);

    const tier3 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.55, 32), cakeTierMat2);
    tier3.position.set(0, 2.7, 142);
    scene.add(tier3);

    // Candles on Top Tier
    const candlePositions = [
      { x: -0.28, z: 141.8 },
      { x: 0.28, z: 141.8 },
      { x: 0, z: 142.3 }
    ];

    candlePositions.forEach((pos, i) => {
      const cMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      cMesh.position.set(pos.x, 3.15, pos.z);
      scene.add(cMesh);

      // Flickering Candle Flame
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 8), flameMat);
      flame.position.set(pos.x, 3.42, pos.z);
      scene.add(flame);
      candles.push(flame);
    });

    // 3. Floating Celebration Balloons
    const balloonColors = [0xe07a98, 0xffd700, 0xc2185b, 0xdfb15b, 0xff69b4, 0x88c0d0];
    for (let b = 0; b < 14; b++) {
      const bColor = balloonColors[b % balloonColors.length];
      const bMat = new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.35, metalness: 0.15 });
      const balloon = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), bMat);
      const bx = (b % 2 === 0 ? -1 : 1) * (5.5 + Math.random() * 4.5);
      const bz = 130 + Math.random() * 30;
      const by = 2.5 + Math.random() * 3.5;
      balloon.position.set(bx, by, bz);
      balloon.userData = { initialY: by, speed: 0.8 + Math.random() * 0.8, offset: Math.random() * Math.PI };
      balloons.push(balloon);
      scene.add(balloon);
    }

    // 4. Glowing 3D Golden Mystery Gift Box for Final Surprise (Z: 142, X: 3.8)
    const giftGroup = new THREE.Group();
    giftGroup.position.set(3.8, 1.2, 142);

    const giftBoxMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.2), goldMat);
    giftGroup.add(giftBoxMesh);

    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xe07a98, roughness: 0.3 });
    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.2, 1.24), ribbonMat);
    giftGroup.add(ribbonH);

    const giftHeart = new THREE.Mesh(createMiniHeartGeom(), new THREE.MeshBasicMaterial({ color: 0xff1744 }));
    giftHeart.position.set(0, 0.9, 0);
    giftHeart.scale.set(0.12, 0.12, 0.12);
    giftGroup.add(giftHeart);

    scene.add(giftGroup);
    giftGroup.userData = { isSurpriseBox: true, giftHeart };
  }


  /* ==========================================================================
     5. 3D AVATAR CREATION: SWAYAM & RANU (Procedural Low-Poly Couple)
     ========================================================================== */
  function createSwayamAvatar() {
    const coupleGroup = new THREE.Group();

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5c396, roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1a120b, roughness: 0.8 });
    const glassesMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.2 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0x1c2d42, roughness: 0.6 }); // Navy blue buttoned shirt
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0xd9cca3, roughness: 0.7 }); // Beige chinos
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x3d2010, roughness: 0.5 });

    // Torso / Shirt
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.82, 1.05, 0.45), shirtMat);
    torso.position.y = 1.65;
    coupleGroup.add(torso);

    // Collar
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.47), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    collar.position.set(0, 2.18, 0.02);
    coupleGroup.add(collar);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.45, 0);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.55, 0.48), skinMat);
    headGroup.add(head);

    // Hair
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.28, 0.52), hairMat);
    hair.position.set(0, 0.22, -0.02);
    headGroup.add(hair);

    // Cute Black Spectacles (Swayam's signature glasses)
    const glassL = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 6, 12), glassesMat);
    glassL.position.set(-0.13, 0.04, 0.25);
    headGroup.add(glassL);

    const glassR = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 6, 12), glassesMat);
    glassR.position.set(0.13, 0.04, 0.25);
    headGroup.add(glassR);

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.02), glassesMat);
    bridge.position.set(0, 0.04, 0.25);
    headGroup.add(bridge);

    coupleGroup.add(headGroup);

    // Left & Right Arms (Hierarchical)
    const armL = new THREE.Group();
    armL.position.set(-0.52, 2.05, 0);
    const armLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.85, 0.24), shirtMat);
    armLMesh.position.y = -0.42;
    armL.add(armLMesh);
    coupleGroup.add(armL);

    const armR = new THREE.Group();
    armR.position.set(0.52, 2.05, 0);
    const armRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.85, 0.24), shirtMat);
    armRMesh.position.y = -0.42;
    armR.add(armRMesh);
    coupleGroup.add(armR);

    // Left & Right Legs
    const legL = new THREE.Group();
    legL.position.set(-0.24, 1.15, 0);
    const legLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.05, 0.28), pantsMat);
    legLMesh.position.y = -0.52;
    legL.add(legLMesh);
    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.16, 0.44), shoeMat);
    shoeL.position.set(0, -1.05, 0.08);
    legL.add(shoeL);
    coupleGroup.add(legL);

    const legR = new THREE.Group();
    legR.position.set(0.24, 1.15, 0);
    const legRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.05, 0.28), pantsMat);
    legRMesh.position.y = -0.52;
    legR.add(legRMesh);
    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.16, 0.44), shoeMat);
    shoeR.position.set(0, -1.05, 0.08);
    legR.add(shoeR);
    coupleGroup.add(legR);

    coupleGroup.userData = { armL, armR, legL, legR, torso, headGroup };
    return coupleGroup;
  }

  function createRanuAvatar() {
    const coupleGroup = new THREE.Group();

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5c79e, roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x140d07, roughness: 0.85 });
    const dressMat = new THREE.MeshStandardMaterial({ color: 0x7bb5d6, roughness: 0.5 }); // Blue floral dress
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x8a2be2, roughness: 0.5 });

    // Torso / Dress
    const dressTop = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.85, 0.38), dressMat);
    dressTop.position.y = 1.55;
    dressTop.userData = { baseY: 1.55 };
    coupleGroup.add(dressTop);

    // Dress Skirt Flare (Cone/Cylinder)
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.65, 0.85, 16), dressMat);
    skirt.position.y = 0.95;
    coupleGroup.add(skirt);

    // White Lace Trim
    const lace = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.035, 8, 20), trimMat);
    lace.rotation.x = Math.PI / 2;
    lace.position.y = 0.52;
    coupleGroup.add(lace);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.22, 0);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.48, 0.42), skinMat);
    headGroup.add(head);

    // Cute Red Bindi
    const bindi = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), new THREE.MeshBasicMaterial({ color: 0xd81b60 }));
    bindi.position.set(0, 0.08, 0.22);
    headGroup.add(bindi);

    // Long Flowing Hair (Front & Back)
    const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.22, 0.46), hairMat);
    hairTop.position.set(0, 0.20, -0.02);
    headGroup.add(hairTop);

    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.95, 0.20), hairMat);
    hairBack.position.set(0, -0.25, -0.22);
    headGroup.add(hairBack);

    // Cute Flower Accessory in Hair
    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff4081 }));
    flower.position.set(0.24, 0.16, 0.10);
    headGroup.add(flower);

    coupleGroup.add(headGroup);

    // Arms
    const armL = new THREE.Group();
    armL.position.set(-0.42, 1.85, 0);
    const armLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.75, 0.20), skinMat);
    armLMesh.position.y = -0.38;
    armL.add(armLMesh);
    coupleGroup.add(armL);

    const armR = new THREE.Group();
    armR.position.set(0.42, 1.85, 0);
    const armRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.75, 0.20), skinMat);
    armRMesh.position.y = -0.38;
    armR.add(armRMesh);
    coupleGroup.add(armR);

    // Legs
    const legL = new THREE.Group();
    legL.position.set(-0.20, 0.65, 0);
    const legLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), skinMat);
    legLMesh.position.y = -0.35;
    legL.add(legLMesh);
    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.38), shoeMat);
    shoeL.position.set(0, -0.72, 0.06);
    legL.add(shoeL);
    coupleGroup.add(legL);

    const legR = new THREE.Group();
    legR.position.set(0.20, 0.65, 0);
    const legRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), skinMat);
    legRMesh.position.y = -0.35;
    legR.add(legRMesh);
    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.38), shoeMat);
    shoeR.position.set(0, -0.72, 0.06);
    legR.add(shoeR);
    coupleGroup.add(legR);

    coupleGroup.userData = { armL, armR, legL, legR, torso: dressTop, dressTop, headGroup };
    return coupleGroup;
  }


  /* ==========================================================================
     6. INPUT SYSTEM (Desktop WASD/Mouse & Mobile Touch Joystick)
     ========================================================================== */
  function setupInputListeners() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      if (!isMuseumActive || isModalOpen) return;

      if (e.key in keys) keys[e.key] = true;
      if (e.key === 'w' || e.key === 'W') keys.w = true;
      if (e.key === 'a' || e.key === 'A') keys.a = true;
      if (e.key === 's' || e.key === 'S') keys.s = true;
      if (e.key === 'd' || e.key === 'D') keys.d = true;

      // 'E' Key to interact
      if (e.key === 'e' || e.key === 'E') {
        handleInteraction();
      }

      // ESC to close modal
      if (e.key === 'Escape') {
        if (isModalOpen) {
          closePhotoModal();
          closeSurpriseModal();
        } else {
          exitMuseum();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key in keys) keys[e.key] = false;
      if (e.key === 'w' || e.key === 'W') keys.w = false;
      if (e.key === 'a' || e.key === 'A') keys.a = false;
      if (e.key === 's' || e.key === 'S') keys.s = false;
      if (e.key === 'd' || e.key === 'D') keys.d = false;
    });

    // Mouse Drag on Canvas to Rotate Camera
    const canvas = document.getElementById('museumCanvas');
    if (canvas) {
      canvas.addEventListener('mousedown', (e) => {
        isDraggingMouse = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      });

      window.addEventListener('mouseup', () => { isDraggingMouse = false; });

      window.addEventListener('mousemove', (e) => {
        if (!isMuseumActive || !isDraggingMouse || isModalOpen) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        cameraTheta -= deltaX * 0.005;
        cameraPhi = Math.max(0.12, Math.min(1.15, cameraPhi - deltaY * 0.005));
      });
    }

    // Mobile Virtual Touch Joystick
    setupMobileControls();
  }

  function setupMobileControls() {
    const joyZone = document.getElementById('mobileJoystickZone');
    const joyBase = document.getElementById('joystickBase');
    const joyThumb = document.getElementById('joystickThumb');
    const camZone = document.getElementById('mobileCameraZone');
    const actionBtn = document.getElementById('mobileActionBtn');

    if (!joyZone || !joyBase || !joyThumb) return;

    let touchId = null;
    let baseCenter = { x: 0, y: 0 };
    const maxRadius = 42;

    joyZone.addEventListener('touchstart', (e) => {
      if (isModalOpen) return;
      const touch = e.changedTouches[0];
      touchId = touch.identifier;

      const rect = joyBase.getBoundingClientRect();
      baseCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

      joystick.active = true;
      updateJoystick(touch.clientX, touch.clientY);
    }, { passive: false });

    joyZone.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!joystick.active) return;
      for (let t of e.changedTouches) {
        if (t.identifier === touchId) {
          updateJoystick(t.clientX, t.clientY);
          break;
        }
      }
    }, { passive: false });

    const endJoy = (e) => {
      for (let t of e.changedTouches) {
        if (t.identifier === touchId) {
          joystick.active = false;
          joystick.x = 0;
          joystick.y = 0;
          joyThumb.style.transform = 'translate(-50%, -50%)';
          touchId = null;
          break;
        }
      }
    };
    joyZone.addEventListener('touchend', endJoy);
    joyZone.addEventListener('touchcancel', endJoy);

    function updateJoystick(clientX, clientY) {
      const dx = clientX - baseCenter.x;
      const dy = clientY - baseCenter.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      const clampedDist = Math.min(dist, maxRadius);
      const knobX = Math.cos(angle) * clampedDist;
      const knobY = Math.sin(angle) * clampedDist;

      joyThumb.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;

      // Normalize [-1, 1]
      joystick.x = knobX / maxRadius;
      joystick.y = knobY / maxRadius;
    }

    // Mobile Camera Swipe Zone (Right half of screen)
    if (camZone) {
      let camTouchId = null;
      let prevCamX = 0, prevCamY = 0;

      camZone.addEventListener('touchstart', (e) => {
        if (isModalOpen) return;
        const touch = e.changedTouches[0];
        camTouchId = touch.identifier;
        prevCamX = touch.clientX;
        prevCamY = touch.clientY;
      }, { passive: true });

      camZone.addEventListener('touchmove', (e) => {
        if (isModalOpen) return;
        for (let t of e.changedTouches) {
          if (t.identifier === camTouchId) {
            const dx = t.clientX - prevCamX;
            const dy = t.clientY - prevCamY;
            prevCamX = t.clientX;
            prevCamY = t.clientY;

            cameraTheta -= dx * 0.007;
            cameraPhi = Math.max(0.12, Math.min(1.15, cameraPhi - dy * 0.007));
            break;
          }
        }
      }, { passive: true });
    }

    // Mobile Action Button Tap
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        handleInteraction();
      });
    }
  }


  /* ==========================================================================
     7. INTERACTION CONTROLLER (Photos & Birthday Surprise)
     ========================================================================== */
  function handleInteraction() {
    if (nearbyMemory) {
      openPhotoModal(nearbyMemory);
      return;
    }

    if (nearbySurprise) {
      openSurpriseModal();
      return;
    }
  }

  function openPhotoModal(mem) {
    const modal = document.getElementById('museumPhotoModal');
    if (!modal) return;

    isModalOpen = true;
    document.getElementById('modalRoomTag').textContent = mem.room;
    document.getElementById('modalPhotoImg').src = mem.img;
    document.getElementById('modalPhotoTitle').textContent = mem.title;
    document.getElementById('modalPhotoDate').textContent = mem.date;
    document.getElementById('modalPhotoDesc').textContent = mem.desc;

    modal.style.display = 'flex';
    modal.classList.add('active');
    playInteractionChime();
  }

  function closePhotoModal() {
    const modal = document.getElementById('museumPhotoModal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 250);
    }
    isModalOpen = false;
  }

  function openSurpriseModal() {
    const modal = document.getElementById('museumSurpriseModal');
    const body = document.getElementById('surpriseLetterBody');
    if (!modal || !body) return;

    isModalOpen = true;
    body.innerHTML = `
      <p>Meri pyaari Ranu,</p>
      <p>Watching you walk through each room of our memories today reminded me why you are my greatest blessing in this entire universe.</p>
      <p>From our very first shy smile to our late night calls, from our goofy inside jokes to our unspoken promises — every step with you has turned my life into a celebration.</p>
      <p>Today is your special day, but I am the one who received the greatest gift of all: <strong>You.</strong></p>
      <p>Happy Birthday, meri jaan! I promise to hold your hand through every gallery of our future, forever and always. 🎂❤️</p>
    `;

    modal.style.display = 'flex';
    modal.classList.add('active');
    playInteractionChime();

    // Trigger celebratory confetti if available
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }
  }

  function closeSurpriseModal() {
    const modal = document.getElementById('museumSurpriseModal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 250);
    }
    isModalOpen = false;
  }


  /* ==========================================================================
     8. MAIN ANIMATION & GAME LOOP
     ========================================================================== */
  const clock = new THREE.Clock();

  function startRenderLoop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    function animate() {
      if (!isMuseumActive) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      try { updateCoupleMovement(delta); } catch(err) { console.error('Walk movement error:', err); }
      try { updateThirdPersonCamera(); } catch(err) { console.error('Camera error:', err); }
      try { updateAtmosphere(delta); } catch(err) { console.error('Atmosphere error:', err); }
      try { checkProximity(); } catch(err) { console.error('Proximity error:', err); }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }
    animate();
  }

  function updateCoupleMovement(delta) {
    if (!swayamMesh || isModalOpen) return;

    // Movement Vector from WASD or Mobile Joystick
    let moveX = 0;
    let moveZ = 0;

    if (keys.w || keys.ArrowUp) moveZ -= 1;
    if (keys.s || keys.ArrowDown) moveZ += 1;
    if (keys.a || keys.ArrowLeft) moveX -= 1;
    if (keys.d || keys.ArrowRight) moveX += 1;

    if (joystick.active) {
      moveX = joystick.x;
      moveZ = joystick.y;
    }

    const inputMag = Math.hypot(moveX, moveZ);
    const isMoving = inputMag > 0.08;

    if (isMoving) {
      // Calculate movement relative to camera look orientation
      const camForwardAngle = cameraTheta + Math.PI;
      const angle = Math.atan2(moveX, moveZ) + camForwardAngle;

      const speed = 4.8 * Math.min(inputMag, 1.0);
      const vx = Math.sin(angle) * speed * delta;
      const vz = Math.cos(angle) * speed * delta;

      swayamMesh.position.x += vx;
      swayamMesh.position.z += vz;

      // Rotate Swayam to face walking direction smoothly
      const targetRotation = angle;
      let rotDiff = targetRotation - swayamMesh.rotation.y;
      while (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
      while (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
      swayamMesh.rotation.y += rotDiff * 0.15;

      // Boundary Collisions (Keep within corridor & birthday chamber)
      const inBdayChamber = swayamMesh.position.z > 120;
      const maxX = inBdayChamber ? 9.8 : 5.8;
      swayamMesh.position.x = Math.max(-maxX, Math.min(maxX, swayamMesh.position.x));
      swayamMesh.position.z = Math.max(1.5, Math.min(160, swayamMesh.position.z));

      // Swayam Walk Cycle Animation
      swayamWalkTimer += delta * 12;
      animateWalkCycle(swayamMesh, swayamWalkTimer, true);

      // Play soft footsteps sound periodically
      stepTimer += delta;
      if (stepTimer > 0.38) {
        stepTimer = 0;
        playFootstepSound();
      }
    } else {
      // Idle Pose damping
      animateWalkCycle(swayamMesh, swayamWalkTimer, false);
    }

    // --- Ranu Follower AI (Follows Swayam naturally) ---
    if (ranuMesh) {
      // Target position: slightly behind Swayam's right shoulder
      const followOffsetDist = 1.8;
      const followAngle = swayamMesh.rotation.y + 2.5; // diagonally behind
      const targetRanuX = swayamMesh.position.x + Math.sin(followAngle) * followOffsetDist;
      const targetRanuZ = swayamMesh.position.z + Math.cos(followAngle) * followOffsetDist;

      const rdx = targetRanuX - ranuMesh.position.x;
      const rdz = targetRanuZ - ranuMesh.position.z;
      const rDist = Math.hypot(rdx, rdz);

      if (rDist > 0.3) {
        const ranuSpeed = Math.min(rDist * 4.2, 5.2) * delta;
        const rAngle = Math.atan2(rdx, rdz);
        ranuMesh.position.x += Math.sin(rAngle) * ranuSpeed;
        ranuMesh.position.z += Math.cos(rAngle) * ranuSpeed;

        // Turn Ranu smoothly towards her movement
        let rRotDiff = rAngle - ranuMesh.rotation.y;
        while (rRotDiff > Math.PI) rRotDiff -= Math.PI * 2;
        while (rRotDiff < -Math.PI) rRotDiff += Math.PI * 2;
        ranuMesh.rotation.y += rRotDiff * 0.14;

        ranuWalkTimer += delta * 11;
        animateWalkCycle(ranuMesh, ranuWalkTimer, true);
      } else {
        // When stopped near Swayam, face him affectionately!
        const faceSwayamAngle = Math.atan2(swayamMesh.position.x - ranuMesh.position.x, swayamMesh.position.z - ranuMesh.position.z);
        let fDiff = faceSwayamAngle - ranuMesh.rotation.y;
        while (fDiff > Math.PI) fDiff -= Math.PI * 2;
        while (fDiff < -Math.PI) fDiff += Math.PI * 2;
        ranuMesh.rotation.y += fDiff * 0.05;

        animateWalkCycle(ranuMesh, ranuWalkTimer, false);
      }
    }
  }

  function animateWalkCycle(character, timer, isWalking) {
    if (!character || !character.userData) return;
    const { armL, armR, legL, legR, torso } = character.userData;

    if (isWalking) {
      const swing = Math.sin(timer);
      if (legL) legL.rotation.x = swing * 0.52;
      if (legR) legR.rotation.x = -swing * 0.52;
      if (armL) armL.rotation.x = -swing * 0.38;
      if (armR) armR.rotation.x = swing * 0.38;
      if (torso) {
        const baseY = torso.userData?.baseY || 1.6;
        torso.position.y = baseY + Math.abs(Math.sin(timer * 2)) * 0.05;
      }
    } else {
      // Smooth return to idle upright stance
      if (legL) legL.rotation.x *= 0.85;
      if (legR) legR.rotation.x *= 0.85;
      if (armL) armL.rotation.x *= 0.85;
      if (armR) armR.rotation.x *= 0.85;
      if (torso) {
        const baseY = torso.userData?.baseY || 1.6;
        torso.position.y = THREE.MathUtils.lerp(torso.position.y, baseY, 0.1);
      }
    }
  }

  function updateThirdPersonCamera() {
    if (!swayamMesh) return;

    // Spherical Camera Positioning around Swayam
    const targetX = swayamMesh.position.x;
    const targetY = swayamMesh.position.y + 1.8;
    const targetZ = swayamMesh.position.z;

    const cx = targetX + Math.sin(cameraTheta) * Math.cos(cameraPhi) * cameraDistance;
    const cy = targetY + Math.sin(cameraPhi) * cameraDistance;
    const cz = targetZ + Math.cos(cameraTheta) * Math.cos(cameraPhi) * cameraDistance;

    // Smooth camera damping
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cx, 0.12);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.max(1.2, cy), 0.12);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cz, 0.12);

    camera.lookAt(targetX, targetY + 0.3, targetZ);
  }

  function updateAtmosphere(delta) {
    const time = clock.getElapsedTime();

    // Flickering candle flames
    candles.forEach((flame, i) => {
      const flicker = 0.85 + Math.sin(time * 12 + i * 2) * 0.15;
      flame.scale.set(flicker, flicker * (0.9 + Math.random() * 0.2), flicker);
    });

    // Bobbing celebration balloons
    balloons.forEach(b => {
      const { initialY, speed, offset } = b.userData;
      b.position.y = initialY + Math.sin(time * speed + offset) * 0.35;
      b.rotation.y += 0.005;
    });

    // Pulsing and spinning indicators on frames
    frameMeshes.forEach(fg => {
      const { indHeart } = fg.userData;
      if (indHeart) {
        indHeart.rotation.y += 0.03;
        const p = (Math.sin(time * 3.5) + 1) * 0.03 + 0.11;
        indHeart.scale.set(p, p, p);
      }
    });

    // Update Room Name on HUD based on Swayam's Z position
    if (swayamMesh) {
      const currentZ = swayamMesh.position.z;
      const zone = roomZones.find(z => currentZ >= z.startZ && currentZ <= z.endZ) || roomZones[0];
      const roomHud = document.getElementById('museumCurrentRoom');
      if (roomHud && roomHud.textContent !== zone.name) {
        roomHud.textContent = zone.name;
      }
    }
  }

  function checkProximity() {
    if (!swayamMesh || isModalOpen) return;

    const pos = swayamMesh.position;
    const prompt = document.getElementById('museumInteractPrompt');
    const actionBtn = document.getElementById('mobileActionBtn');

    // 1. Check proximity to framed paintings (< 3.8 units)
    let closestMem = null;
    let minDist = 4.2;

    frameMeshes.forEach(fg => {
      const dist = Math.hypot(fg.position.x - pos.x, fg.position.z - pos.z);
      if (dist < minDist) {
        minDist = dist;
        closestMem = fg.userData.mem;
      }
    });

    nearbyMemory = closestMem;

    // 2. Check proximity to Final Surprise Gift Box (Z: 142, X: 3.8)
    const surpriseDist = Math.hypot(3.8 - pos.x, 142 - pos.z);
    nearbySurprise = surpriseDist < 4.0;

    // Show / Hide Prompts
    if (nearbyMemory || nearbySurprise) {
      if (prompt) {
        prompt.style.display = 'block';
        const txt = nearbySurprise ? 'Press <strong>E</strong> or Tap to Open Birthday Surprise 🎁' : 'Press <strong>E</strong> or Tap to View Memory ❤️';
        const pTxt = prompt.querySelector('.prompt-text');
        if (pTxt) pTxt.innerHTML = txt;
      }
      if (actionBtn) {
        actionBtn.style.display = 'inline-flex';
        const aTxt = actionBtn.querySelector('.act-text');
        if (aTxt) aTxt.textContent = nearbySurprise ? 'Open Surprise 🎁' : 'View Memory ❤️';
      }
    } else {
      if (prompt) prompt.style.display = 'none';
      if (actionBtn) actionBtn.style.display = 'none';
    }
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  // Self Initialization on DOM Load or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMuseum);
  } else {
    initMuseum();
  }

  // Expose methods & 3D objects for inspection
  window.enterMuseum = enterMuseum;
  window.exitMuseum = exitMuseum;
  window.initMuseum = initMuseum;
  window.getMuseumScene = () => ({ scene, camera, renderer, swayamMesh, ranuMesh });

})();
