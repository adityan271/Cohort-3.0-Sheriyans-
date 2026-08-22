// Mobile nav toggle
const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav__links--open");
});

// Smooth scroll for nav links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 72; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            navLinks.classList.remove("nav__links--open");
        }
    });
});

// Scroll reveal using IntersectionObserver
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal--visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2
    }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Animate skill bars when visible
document.querySelectorAll(".bar__fill").forEach(bar => {
    const updateWidth = () => {
        const parent = bar.closest(".reveal");
        if (!parent || parent.classList.contains("reveal--visible")) {
            const width = bar.getAttribute("data-width") || 0;
            bar.style.width = width + "%";
        }
    };
    updateWidth();
});

// Dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Simple starfield canvas background
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = [];
    const count = Math.floor((w * h) / 8000);
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            z: Math.random() * 0.7 + 0.3,
            r: Math.random() * 1.2 + 0.3
        });
    }
}

window.addEventListener("resize", resize);
resize();

function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
        const alpha = s.z;
        ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();

        s.y += 0.15 * s.z;
        if (s.y > h) {
            s.y = -5;
            s.x = Math.random() * w;
        }
    }
    requestAnimationFrame(draw);
}
draw();
