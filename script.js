document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 50,
            behavior: "smooth"
          });
        }
      });
    });
  
    // Active nav highlight
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
  
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-links");
  
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
      });
    }
  
    // Reveal animation
    const revealElements = document.querySelectorAll(".reveal");
  
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          el.classList.add("visible");
        }
      });
    };
  
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  
    // Lightbox
    const projectImages = document.querySelectorAll(".project img");
    projectImages.forEach(img => {
      img.addEventListener("click", () => {
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = `
          <div class='lightbox-content'>
            <img src='${img.src}' alt='${img.alt}' />
            <span class='close'>&times;</span>
          </div>`;
        document.body.appendChild(lightbox);
  
        lightbox.querySelector(".close").addEventListener("click", () => lightbox.remove());
        lightbox.addEventListener("click", e => {
          if (e.target === lightbox) lightbox.remove();
        });
      });
    });
  
    // Contact form validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", e => {
        const name = contactForm.querySelector("input[name='name']").value.trim();
        const email = contactForm.querySelector("input[name='email']").value.trim();
        const message = contactForm.querySelector("textarea[name='message']").value.trim();
  
        if (!name || !email || !message) {
          alert("Please fill in all fields.");
          e.preventDefault();
        } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
          alert("Please enter a valid email address.");
          e.preventDefault();
        }
      });
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".circle");
  
    circles.forEach(circle => {
      const percentage = circle.querySelector(".percentage");
      const progress = circle.querySelector("circle:nth-child(2)");
      const value = parseInt(circle.getAttribute("data-percent"));
  
      let count = 0;
      const interval = setInterval(() => {
        if (count <= value) {
          percentage.textContent = `${count}%`;
          const offset = 314 - (314 * count) / 100;
          progress.style.strokeDashoffset = offset;
          count++;
        } else {
          clearInterval(interval);
        }
      }, 20);
    });
  });

  const typing = document.getElementById("typing");
const roles = ["Graphic Designer", "Visual Designer", "Creative Designer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = roles[index];
  typing.textContent = current.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex === current.length + 1) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

document.addEventListener("DOMContentLoaded", type);