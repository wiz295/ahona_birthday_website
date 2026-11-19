const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
let musicOn = false;

musicToggle.addEventListener("click", async () => {
  if (!musicOn) {
    try {
      await music.play();
      musicOn = true;
      musicLabel.textContent = "Pause our song";
      musicToggle.classList.add("playing");
    } catch (err) {
      musicLabel.textContent = "Add your song MP3";
      alert("Add your romantic MP3 as assets/our-song.mp3, then try again.");
    }
  } else {
    music.pause();
    musicOn = false;
    musicLabel.textContent = "Play our song";
    musicToggle.classList.remove("playing");
  }
});

// Smoothly reveal sections as they enter the screen.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Hero surprise: scroll to memories and send a few hearts floating up.
document.getElementById("surpriseBtn").addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
  burstHearts(16);
});

// Floating hearts in the background.
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 14500);
}
setInterval(createHeart, 1500);

function burstHearts(count = 12) {
  for (let i = 0; i < count; i++) {
    setTimeout(createHeart, i * 90);
  }
}

// Interactive cake candles.
const candles = [...document.querySelectorAll(".candle")];
const cakeMessage = document.getElementById("cakeMessage");
candles.forEach(candle => {
  candle.addEventListener("click", () => {
    candle.classList.add("out");
    const remaining = candles.filter(c => !c.classList.contains("out")).length;
    cakeMessage.textContent = remaining
      ? `${remaining} little ${remaining === 1 ? "light" : "lights"} left. Keep going! ♡`
      : "Wish made! May all your dreams come true, Ahona. ♡";
    if (remaining === 0) confettiBurst(100);
  });
});
document.getElementById("relightBtn").addEventListener("click", () => {
  candles.forEach(c => c.classList.remove("out"));
  cakeMessage.textContent = "Three little lights, one big wish. ♡";
});

// Secret letter modal.
const letterModal = document.getElementById("letterModal");
const envelope = document.getElementById("openLetter");
function openLetter() {
  envelope.classList.add("open");
  letterModal.classList.add("show");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLetter() {
  letterModal.classList.remove("show");
  letterModal.setAttribute("aria-hidden", "true");
  envelope.classList.remove("open");
  document.body.style.overflow = "";
}
envelope.addEventListener("click", openLetter);
document.getElementById("closeLetter").addEventListener("click", closeLetter);
letterModal.addEventListener("click", e => {
  if (e.target === letterModal) closeLetter();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLetter();
});

// Celebration confetti.
function confettiBurst(amount = 90) {
  const symbols = ["✦", "♥", "●", "✿"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.color = ["#e88eae", "#f3c86a", "#b88bc8", "#f2a5b9"][Math.floor(Math.random() * 4)];
    piece.style.fontSize = `${8 + Math.random() * 13}px`;
    piece.style.animationDuration = `${2.5 + Math.random() * 3}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
}
document.getElementById("celebrateBtn").addEventListener("click", () => {
  confettiBurst(150);
  burstHearts(20);
});
