// ==========================================
// HERO BACKGROUND FIX
// ==========================================

function updateHeroBackground() {
    console.log('Attempting to update hero background...');
    const heroElement = document.getElementById('hero-image');

    if (!heroElement) {
        console.log('Hero element not found!');
        return;
    }

    if (!matchConfig) {
        console.log('matchConfig not available yet, retrying...');
        setTimeout(updateHeroBackground, 200);
        return;
    }

    if (!matchConfig.heroImage) {
        console.log('No heroImage in matchConfig:', matchConfig);
        return;
    }

    console.log('Setting hero background:', matchConfig.heroImage);
    heroElement.style.backgroundImage = `url('${matchConfig.heroImage}')`;
    heroElement.style.backgroundSize = 'cover';
    heroElement.style.backgroundPosition = 'center';
    heroElement.style.backgroundRepeat = 'no-repeat';
    heroElement.style.minHeight = '400px';
    console.log('Hero background applied successfully');
}

// Múltiplas tentativas para garantir que execute
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(updateHeroBackground, 100);
});

window.addEventListener('load', function () {
    setTimeout(updateHeroBackground, 500);
    setTimeout(updateHeroBackground, 1000);
    setTimeout(updateHeroBackground, 2000);
});