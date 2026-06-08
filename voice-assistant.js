

  (function () {

    const FULL_TEXT =
      "Hello everyone! 👋 Myself Gogul Mahadevan, and I am currently pursuing " +
      "Computer Science Engineering at Madras Institute of Technology. " +
      "At present, I have a strong interest in full-stack development and enjoy " +
      "learning new technologies, building projects, and improving my problem-solving skills. " +
      "My ambition is to grow as a software professional and become a successful " +
      "Full Stack Developer in the future. " +
      "Thank you for taking the time to learn about me. " +
      "I look forward to connecting, learning, and growing throughout my professional journey! 🚀";

    const AUDIO_SRC = "voice1.mp3";

    /* ══ CSS ══ */
    const style = document.createElement("style");
    style.textContent = `
    #va-root {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
    }
 
    /* ── tap hint badge ── */
    #va-hint {
      background: #00e5ff;
      color: #030a12;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 0 0 14px #00e5ffaa;
      animation: va-bounce 1.4s ease-in-out infinite;
      white-space: nowrap;
      user-select: none;
    }
    @keyframes va-bounce {
      0%,100% { transform: translateY(0);   }
      50%      { transform: translateY(-5px); }
    }
 
    /* ── speech bubble ── */
    #va-bubble {
      max-width: 300px;
      background: rgba(8, 16, 28, 0.95);
      border: 1.5px solid #00e5ff66;
      border-radius: 16px 16px 4px 16px;
      padding: 13px 16px 11px;
      font-size: 13.5px;
      line-height: 1.65;
      color: #d8f5ff;
      box-shadow: 0 0 30px #00e5ff2a, 0 8px 32px rgba(0,0,0,0.7);
      backdrop-filter: blur(16px);
      display: none;
      position: relative;
    }
    #va-bubble.show { display: block; }
 
    #va-close {
      position: absolute;
      top: 6px; right: 9px;
      background: none; border: none;
      color: #00e5ff99; font-size: 15px;
      cursor: pointer; line-height: 1;
    }
    #va-close:hover { color: #ff4466; }
 
    #va-text { min-height: 18px; padding-right: 14px; }
 
    .va-cursor {
      display: inline-block;
      width: 2px; height: 13px;
      background: #00e5ff;
      margin-left: 2px;
      vertical-align: middle;
      animation: blink .7s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
 
    #va-replay {
      display: none;
      margin-top: 9px;
      background: none;
      border: 1px solid #00e5ff44;
      color: #00e5ff;
      border-radius: 8px;
      padding: 4px 12px;
      font-size: 12px;
      cursor: pointer;
      transition: background .2s;
    }
    #va-replay:hover { background: #00e5ff1a; }
 
    /* ── wave ── */
    #va-wave {
      display: flex; align-items: flex-end;
      justify-content: center; gap: 3px;
      height: 16px; opacity: 0;
      transition: opacity .3s;
    }
    #va-wave.on { opacity: 1; }
    #va-wave span {
      display: block; width: 3px;
      border-radius: 2px; background: #00e5ff;
      animation: bar .75s ease-in-out infinite alternate;
    }
    #va-wave span:nth-child(1){height:4px;  animation-delay:.00s;}
    #va-wave span:nth-child(2){height:11px; animation-delay:.10s;}
    #va-wave span:nth-child(3){height:16px; animation-delay:.20s;}
    #va-wave span:nth-child(4){height:8px;  animation-delay:.30s;}
    #va-wave span:nth-child(5){height:13px; animation-delay:.15s;}
    #va-wave span:nth-child(6){height:5px;  animation-delay:.25s;}
    @keyframes bar {
      from { transform:scaleY(.35); opacity:.5; }
      to   { transform:scaleY(1);   opacity:1;  }
    }
 
    /* ── avatar ── */
    #va-avatar {
      width: 70px; height: 70px;
      border-radius: 50%; overflow: hidden;
      border: 3px solid #00e5ff;
      cursor: pointer;
      background: #060e1a;
      transition: transform .2s;
      flex-shrink: 0;
    }
    #va-avatar:hover { transform: scale(1.09); }
    #va-avatar img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
    #va-avatar.pulse { animation: pulse .9s ease-in-out infinite; }
    @keyframes pulse {
      0%  { box-shadow:0 0 0 0    #00e5ffaa; }
      50% { box-shadow:0 0 0 13px #00e5ff22; }
      100%{ box-shadow:0 0 0 0    #00e5ff00; }
    }
 
    #va-lbl {
      font-size: 11px; color: #00e5ffaa;
      text-align: center; letter-spacing:.4px;
    }
 
    @media(max-width:480px){
      #va-root { bottom:12px; right:10px; }
      #va-bubble{ max-width:210px; font-size:12.5px; }
      #va-avatar{ width:56px; height:56px; }
    }
  `;
    document.head.appendChild(style);

    /* ══ DOM ══ */
    const root = document.createElement("div");
    root.id = "va-root";
    root.innerHTML = `
    <div id="va-hint">🎤 Tap to hear me!</div>
    <div id="va-bubble">
      <button id="va-close">✕</button>
      <div id="va-text"></div>
      <button id="va-replay">🔁 Replay</button>
    </div>
    <div id="va-wave"><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:3px">
      <div id="va-avatar">
        <img src="profile.jpeg" alt="Gogul"
          onerror="this.style.display='none';this.parentElement.style.display='flex';this.parentElement.style.alignItems='center';this.parentElement.style.justifyContent='center';this.parentElement.innerHTML='<span style=font-size:30px>👤</span>'">
      </div>
      <div id="va-lbl">Gogul · Tap to play 🎤</div>
    </div>
  `;
    document.body.appendChild(root);

    /* ══ Refs ══ */
    const hint = document.getElementById("va-hint");
    const bubble = document.getElementById("va-bubble");
    const textEl = document.getElementById("va-text");
    const avatar = document.getElementById("va-avatar");
    const wave = document.getElementById("va-wave");
    const close = document.getElementById("va-close");
    const replay = document.getElementById("va-replay");
    const lbl = document.getElementById("va-lbl");

    /* ══ Audio ══ */
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "auto";

    let typeTimer = null;

    /* ══ Typing sync ══ */
    function typeText(text) {
      clearTimeout(typeTimer);
      textEl.innerHTML = "";
      const cursor = document.createElement("span");
      cursor.className = "va-cursor";
      textEl.appendChild(cursor);

      const dur = (isFinite(audio.duration) && audio.duration > 0)
        ? audio.duration
        : 20;
      const delay = Math.min(Math.max((dur * 1000) / text.length, 16), 65);

      let i = 0;
      function tick() {
        if (i < text.length) {
          cursor.insertAdjacentText("beforebegin", text[i++]);
          typeTimer = setTimeout(tick, delay);
        } else {
          cursor.remove();
        }
      }
      tick();
    }

    /* ══ Wave on/off ══ */
    function setWave(on) {
      wave.classList.toggle("on", on);
      avatar.classList.toggle("pulse", on);
      lbl.textContent = on ? "Gogul · Speaking…" : "Gogul · Tap to replay 🔁";
    }

    /* ══ Play ══ */
    function play() {
      hint.style.display = "none";
      replay.style.display = "none";
      bubble.classList.add("show");
      audio.pause();
      audio.currentTime = 0;
      clearTimeout(typeTimer);

      const promise = audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          setWave(true);
          typeText(FULL_TEXT);
        }).catch(err => {
          console.warn("Audio play blocked:", err);
          lbl.textContent = "Tap the photo to play 🎤";
          hint.style.display = "block";
        });
      } else {
        setWave(true);
        typeText(FULL_TEXT);
      }
    }

    /* ══ Events ══ */
    audio.addEventListener("ended", () => {
      setWave(false);
      clearTimeout(typeTimer);
      textEl.innerHTML = FULL_TEXT;
      replay.style.display = "inline-block";
    });

    audio.addEventListener("error", (e) => {
      console.error("Audio error — check voice1.mp3 path:", e);
      lbl.textContent = "⚠️ voice1.mp3 not found";
      setWave(false);
    });

    close.addEventListener("click", () => {
      audio.pause(); audio.currentTime = 0;
      clearTimeout(typeTimer);
      setWave(false);
      bubble.classList.remove("show");
      hint.style.display = "block";
      lbl.textContent = "Gogul · Tap to play 🎤";
      replay.style.display = "none";
    });

    hint.addEventListener("click", play);
    avatar.addEventListener("click", play);
    replay.addEventListener("click", play);

  })();

