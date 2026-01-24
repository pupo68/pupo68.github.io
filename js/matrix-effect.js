export class DigitalRain {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.fontSize = options.fontSize || 16;
        this.color = options.color || '#0F0';
        this.interactive = options.interactive || false;
        
        // Caracteres padrão (Katakana + Latin + Nums)
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        this.alphabet = options.chars || katakana + latin + nums;
        
        this.drops = [];
        this.mouse = { x: null, y: null, radius: 100 };
        this.animationId = null;

        this.init();
        this.setupEvents();
    }

    init() {
        this.resize();
        // Inicializa as gotas
        const columns = this.canvas.width / this.fontSize;
        this.drops = [];
        for (let x = 0; x < columns; x++) {
            this.drops[x] = 1;
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init(); // Reinicia colunas
        });

        if (this.interactive) {
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
        }
    }

    draw() {
        // Efeito de rastro (fade out)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Lógica de interação com Mouse (se ativado)
            if (this.interactive && this.mouse.x !== null) {
                const dx = this.mouse.x - x;
                const dy = this.mouse.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = '#ffffff';
                } else {
                    this.ctx.fillStyle = this.color;
                    this.ctx.shadowBlur = 0;
                }
            } else {
                this.ctx.fillStyle = this.color;
            }

            this.ctx.fillText(text, x, y);

            // Reseta a gota randomicamente após sair da tela
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        this.animationId = requestAnimationFrame(() => this.draw());
    }

    start() {
        if (!this.animationId) {
            this.draw();
        }
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}
