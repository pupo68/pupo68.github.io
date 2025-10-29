// --- EFEITO MATRIX INTERATIVO ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const rainDrops = [];
const mouse = { x: null, y: null, radius: 100 };

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

const drawMatrix = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;
        
        // Interatividade com o mouse
        let dx = mouse.x - x;
        let dy = mouse.y - y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            ctx.fillStyle = '#ffffff'; // Cor brilhante perto do mouse
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
        } else {
            ctx.fillStyle = '#00FF41'; // Cor padrão verde
            ctx.shadowBlur = 0;
        }
        
        ctx.fillText(text, x, y);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalcula colunas ao redimensionar
    const newColumns = Math.floor(canvas.width / fontSize);
    // Preenche ou remove colunas conforme necessário
    while(rainDrops.length < newColumns) rainDrops.push(1);
    while(rainDrops.length > newColumns) rainDrops.pop();
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
document.addEventListener('DOMContentLoaded', type);

// --- ANIMAÇÃO DE SCROLL ---
const scrollElements = document.querySelectorAll('[data-scroll]');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};
const displayScrollElement = (element) => element.setAttribute('data-scroll', 'in');
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) displayScrollElement(el);
    });
};
window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();