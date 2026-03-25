/**
 * Main application entry point.
 * Manages global components and initializes routing.
 */

import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { router } from './router.js';
import { Navbar } from '../presentation/components/Navbar.js';
import { Footer } from '../presentation/components/Footer.js';
import { Toast } from '../presentation/scripts/Toast.js';

// Global state
window.currentUser = null;

// Initialize components
const initApp = () => {
    const navbarContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    // Render global components
    navbarContainer.innerHTML = Navbar();
    footerContainer.innerHTML = Footer();

    // Listen to auth changes
    onAuthStateChanged(auth, (user) => {
        window.currentUser = user;
        // Re-render navbar on auth change to show appropriate links
        navbarContainer.innerHTML = Navbar(user);
        // Refresh current route to handle access control
        router.resolve();
    });

    // Initialize router
    router.init();
    
    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

document.addEventListener('DOMContentLoaded', initApp);
