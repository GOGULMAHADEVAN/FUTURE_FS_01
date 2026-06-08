// ===== TYPING EFFECT =====
const words = [
  "Full Stack Developer",
  "CSE Student",
  "Future Interns Intern",
  "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingEl = document.getElementById("typing");

function typeEffect() {
  if (!typingEl) return;

  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(function(el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

// ===== NAVBAR SCROLL =====
function handleNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// ===== HAMBURGER MENU =====
function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
      navLinks.classList.remove("open");
    });
  });
}

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  var msg = document.getElementById("form-msg");
  if (msg) {
    msg.textContent = "✅ Message sent! I'll get back to you soon.";
  }
  e.target.reset();
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function() {
  typeEffect();
  revealOnScroll();
  setupHamburger();
});

window.addEventListener("scroll", function() {
  handleNavbar();
  revealOnScroll();
});
