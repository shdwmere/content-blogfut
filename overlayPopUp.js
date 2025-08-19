// Pop-up overlay script:
(function() {
    'use strict';
    let overlayTimeout = null;
    
    // Function to create the clickable overlay
    function createClickableOverlay() {
        // Check if overlay already exists
        if (document.getElementById('futplay-overlay')) {
            return;
        }
        
        // Create overlay div
        const overlay = document.createElement('div');
        overlay.id = 'futplay-overlay';
        
        // Apply styles - now clickable
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0); /* Transparent background */
            z-index: 9999;
            cursor: pointer;
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add click event listener
        overlay.addEventListener('click', function() {
            window.open('https://www.profitableratecpm.com/jph05smj?key=41b0b4cb6389065a335fd2d0b4552a1d', '_blank');
            console.log('👆 Overlay clicked - removing and scheduling next');
            removeOverlay();
            scheduleNextOverlay(); // Schedule next overlay in 10 seconds
        });
        
        // Add to body
        document.body.appendChild(overlay);
        
        // Fade in effect
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        console.log('✅ Overlay created and shown at:', new Date().toLocaleTimeString());
        console.log('🔒 Overlay will stay until clicked');
        return overlay;
    }
    
    // Function to remove the overlay
    function removeOverlay() {
        const overlay = document.getElementById('futplay-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
        
        // Clear any existing timeout
        if (overlayTimeout) {
            clearTimeout(overlayTimeout);
            overlayTimeout = null;
        }
    }
    
    // Function to schedule next overlay
    function scheduleNextOverlay() {
        // Clear any existing timeout
        if (overlayTimeout) {
            clearTimeout(overlayTimeout);
        }
        
        // Schedule next overlay in 10 seconds
        overlayTimeout = setTimeout(() => {
            createClickableOverlay();
        }, 10000); // CORRIGIDO: 10000ms = 10 segundos
        
        console.log('Next overlay scheduled in 10 seconds');
    }
    
    // Function to start the overlay system
    function startOverlaySystem() {
        // Show first overlay immediately
        createClickableOverlay();
    }
    
    // Export functions to global scope
    window.FutPlayOverlay = {
        start: startOverlaySystem,
        remove: removeOverlay,
        scheduleNext: scheduleNextOverlay
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('FutPlay Clickable Overlay script loaded');
            startOverlaySystem();
        });
    } else {
        console.log('FutPlay Clickable Overlay script loaded');
        startOverlaySystem();
    }
})();


// <script src='https://cdn.jsdelivr.net/gh/shdwmere/content-blogfut/overlayPopUp.js'/>