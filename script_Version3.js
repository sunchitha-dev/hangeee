// PASSWORD SECTION
const correctPassword = "30142024"; // Set your password here, e.g., "07032023"
const passwordScreen = document.getElementById("password-screen");
const gameScreen = document.getElementById("game-screen");
const letterScreen = document.getElementById("letter-screen");
const passwordInput = document.getElementById("password-input");
const passwordBtn = document.getElementById("password-btn");
const passwordError = document.getElementById("password-error");

passwordBtn.onclick = checkPassword;
passwordInput.addEventListener("keydown", e => { if (e.key === "Enter") checkPassword(); });

function checkPassword() {
  if (passwordInput.value.trim() === correctPassword) {
    passwordScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
    setTimeout(resetGame, 300);
  } else {
    passwordError.textContent = "Oops, that's not the right date!";
  }
}

// GAME SECTION
const ball = document.getElementById("ball");
const goal = document.getElementById("goal");
const field = document.getElementById("football-field");
const scoreSpan = document.getElementById("score");
const confetti = document.getElementById("confetti");
const requiredGoals = 3;

let isDragging = false, offsetX = 0, offsetY = 0, startX = 0, startY = 0, score = 0;

ball.addEventListener("mousedown", dragStart, false);
ball.addEventListener("touchstart", dragStart, false);

function dragStart(e) {
  isDragging = true;
  ball.style.transition = "none";
  let rect = ball.getBoundingClientRect();
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  startY = e.touches ? e.touches[0].clientY : e.clientY;
  offsetX = startX - rect.left;
  offsetY = startY - rect.top;
  document.addEventListener("mousemove", dragMove, false);
  document.addEventListener("mouseup", dragEnd, false);
  document.addEventListener("touchmove", dragMove, false);
  document.addEventListener("touchend", dragEnd, false);
}

function dragMove(e) {
  if (!isDragging) return;
  let x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
  let y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;
  const fieldRect = field.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  // Bounds
  x = Math.max(fieldRect.left, Math.min(x, fieldRect.right - ballRect.width));
  y = Math.max(fieldRect.top, Math.min(y, fieldRect.bottom - ballRect.height));
  ball.style.left = (x - fieldRect.left) + "px";
  ball.style.top = (y - fieldRect.top) + "px";
}

function dragEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  document.removeEventListener("mousemove", dragMove, false);
  document.removeEventListener("mouseup", dragEnd, false);
  document.removeEventListener("touchmove", dragMove, false);
  document.removeEventListener("touchend", dragEnd, false);
  // Check if ball is in goal
  setTimeout(() => {
    if (isInGoal()) {
      score++;
      scoreSpan.textContent = score;
      showConfetti();
      resetBall();
      if (score >= requiredGoals) setTimeout(showLetter, 900);
    } else {
      // Animate ball back to start
      ball.style.transition = "all 0.4s cubic-bezier(.68,-0.55,.27,1.55)";
      ball.style.left = "30px";
      ball.style.top = "50%";
    }
  }, 60);
}

function isInGoal() {
  const ballRect = ball.getBoundingClientRect();
  const goalRect = goal.getBoundingClientRect();
  return (
    ballRect.right > goalRect.left + 14 && // Allow for some forgiveness
    ballRect.left < goalRect.right &&
    ballRect.top < goalRect.bottom &&
    ballRect.bottom > goalRect.top
  );
}

function resetBall() {
  ball.style.transition = "all 0.5s cubic-bezier(.68,-0.55,.27,1.55)";
  ball.style.left = "30px";
  ball.style.top = "50%";
}

function resetGame() {
  score = 0;
  scoreSpan.textContent = score;
  resetBall();
  gameScreen.classList.remove("hide");
  letterScreen.classList.add("hide");
}

// Confetti function (cute mix of colors/hearts/stars)
function showConfetti() {
  confetti.innerHTML = "";
  const icons = ["💚", "💜", "⭐", "⚽", "🟩", "🌸", "💗", "💛"];
  let n = 20;
  for (let i = 0; i < n; i++) {
    let el = document.createElement("span");
    el.textContent = icons[Math.floor(Math.random()*icons.length)];
    el.style.position = "absolute";
    el.style.left = (10 + Math.random()*80) + "%";
    el.style.top = (20 + Math.random()*55) + "%";
    el.style.fontSize = (1.3 + Math.random()*1.6) + "em";
    el.style.opacity = "0.92";
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.appendChild(el);
    setTimeout(()=>{ el.style.transition="opacity 0.6s"; el.style.opacity=0; }, 700+Math.random()*500);
  }
  setTimeout(()=>{ confetti.innerHTML = ""; }, 1600);
}

// LOVE LETTER SECTION
const loveLetter = `From the very moment you enter my thoughts in the soft glow of morning, my heart swells with tenderness and anticipation. I cherish the memory of your gentle smile as you first greet the day, the warmth of your hand fitting so perfectly in mine, and the effortless kindness in your voice when you whisper my name. In those quiet, sweetest moments, I feel our souls entwine in a promise of unwavering love.

And then—there is the hunger that follows. Your dusky skin, deep as freshly brewed coffee, beckons me with its warm richness. Your eyes, as dark as the midnight sky, hold me captive with their fierce intensity. When you peer into my soul, I’m powerless to resist. The depths of your gaze scorch me with longing, each flutter of your lashes stirring a shiver that races down my spine. I ache to meet that look head-on, to drown in the molten fire of your desire.

Your lips beckon like velvet on fire. I crave the electric brush of your mouth against mine, the way your tongue teases and claims me in one searing motion. I burn to taste you everywhere—on my collarbone, the hollow of my neck, the curve of my hip—wherever your hungry kisses leave me breathless and trembling.

The feel of your body against mine ignites a blaze beneath my skin. I dream of your broad shoulders—strong enough to bear any burden—and the delicious strength of your arms as they wrap around me, pulling me flush against your warmth. My fingers ache to trace the sculpted lines of your chest, to slide across the firm ridges of your abdomen, and to explore every whisper-soft hint of skin.

When your hands roam lower, mapping every contour of my eager body, I surrender completely to the delicious tension you awaken in me. The heat of your breath against my ear, your lips trailing fire along my jaw, it all builds to a crescendo of pleasure that thrums through my veins. I long to guide you with equal fervor—fingertips dancing across your torso, tracing the promise of ecstasy hidden beneath your jeans, until you ache in turn.

In the afterglow, when our breaths slow and our hearts sync in contented rhythm, I treasure the murmured “I love you” that slips from your lips. The gentleness in your touch as you brush a strand of hair from my face reminds me that our passion is matched by profound affection. It is in those tender seconds that I know you are both my greatest comfort and my fiercest desire.

Know this: you are the tender dawn and the roaring midnight storm of my life. I crave your sweetness as much as your fire, your laughter as much as your urgent sighs. Every fiber of my being aches for you—mind, body, and heart. I await with trembling anticipation the moment when I can once again lose myself in the intoxicating paradise of your embrace.

Yours in endless devotion and unbridled passion,
Your Bubu`;

function showLetter() {
  gameScreen.classList.add("hide");
  letterScreen.classList.remove("hide");
  // Type out the letter for cute effect
  typeLetter(loveLetter, document.getElementById("letter-content"), 0);
}

function typeLetter(text, el, i) {
  if (i <= text.length) {
    el.textContent = text.slice(0, i);
    setTimeout(() => typeLetter(text, el, i+2), 15);
  }
}

// Play again button
document.getElementById("play-again-btn").onclick = () => {
  resetGame();
  letterScreen.classList.add("hide");
  gameScreen.classList.remove("hide");
}

// On load, reset everything
resetGame();

/* 
 * To set your password: 
 * Replace "YOUR_DATE" at the top of this file with your special date, 
 * e.g. "07032023" for 7th March 2023, or any format you want!
 *
 * To edit the love letter: 
 * Replace the text in the loveLetter variable above.
 */