import { DigitalRain } from './matrix-effect.js';

// --- INICIALIZAÇÃO DO MATRIX ---
document.addEventListener('DOMContentLoaded', () => {
    // Efeito com interação de mouse ativada e cor padrão
    const matrix = new DigitalRain('matrixCanvas', {
        color: '#0F0',
        interactive: true,
        fontSize: 16
    });
    matrix.start();
});

// --- EFEITO DE DIGITAÇÃO ---
const typingTextElement = document.getElementById('typing-text');
const roles = ["Desenvolvedor de Software", "Analista de Dados"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingTextElement) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    } else {
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
    }
    setTimeout(type, isDeleting ? 100 : 150);
}

// Inicia digitação
type();

// --- ANIMAÇÃO DE SCROLL (Intersection Observer API) ---
// Refatorado para usar API moderna e mais performática que o evento 'scroll'
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('data-scroll', 'in');
            // Opcional: parar de observar após aparecer
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-scroll]').forEach(el => {
    observer.observe(el);
});
