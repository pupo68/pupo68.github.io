import { DigitalRain } from './matrix-effect.js';

document.addEventListener('DOMContentLoaded', () => {
    // Efeito interativo com mouse ativado (unificando experiência)
    const matrix = new DigitalRain('matrixCanvas', {
        color: '#00FF41',
        fontSize: 16,
        interactive: true
    });
    matrix.start();
});
