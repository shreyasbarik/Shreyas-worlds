// firebase-config.js - Universal Firebase Configuration
(function() {
    'use strict';

    const firebaseConfig = {
        apiKey: "AIzaSyBYEol3wDIUihPTLaM1EjqVkpvjvJ-1_O4",
        authDomain: "my-website-backend-957db.firebaseapp.com",
        projectId: "my-website-backend-957db",
        storageBucket: "my-website-backend-957db.firebasestorage.app",
        messagingSenderId: "75667291929",
        appId: "1:75667291929:web:10878882c9c30574144f88",
        measurementId: "G-8H93W7QZGT"
    };

    console.log('🔥 Loading Firebase SDK...');

    function loadFirebaseSDK() {
        return new Promise((resolve, reject) => {
            // Check if Firebase is already loaded
            if (typeof firebase !== 'undefined') {
                console.log('✅ Firebase already loaded');
                resolve();
                return;
            }

            // Firebase SDK URLs (using compat version for compatibility)
            const scripts = [
                'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js',
                'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js'
            ];

            let loadedCount = 0;
            const totalScripts = scripts.length;

            scripts.forEach((src, index) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = false; // Load in order
                
                script.onload = () => {
                    loadedCount++;
                    console.log(`✅ Loaded ${index + 1}/${totalScripts}: ${src.split('/').pop()}`);
                    
                    if (loadedCount === totalScripts) {
                        console.log('✅ All Firebase scripts loaded');
                        resolve();
                    }
                };
                
                script.onerror = (error) => {
                    console.error(`❌ Failed to load: ${src}`);
                    reject(new Error(`Failed to load ${src}`));
                };
                
                document.head.appendChild(script);
            });
        });
    }

    function initializeFirebase() {
        try {
            // Initialize Firebase only if not already initialized
            if (!firebase.apps || firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
                console.log('🔥 Firebase app initialized');
            } else {
                console.log('✅ Firebase app already initialized');
            }

            // Create global references
            window.auth = firebase.auth();
            window.db = firebase.firestore();
            
            // Google Provider setup
            window.googleProvider = new firebase.auth.GoogleAuthProvider();
            window.googleProvider.setCustomParameters({
                prompt: 'select_account'
            });

            console.log('✅ Firebase services ready:');
            console.log('   - Authentication');
            console.log('   - Firestore Database');
            console.log('   - Google Sign-In Provider');

            // Dispatch custom event to notify pages Firebase is ready
            window.dispatchEvent(new CustomEvent('firebaseReady'));
            
        } catch (error) {
            console.error('❌ Firebase initialization error:', error);
            throw error;
        }
    }

    // Start loading process
    function init() {
        loadFirebaseSDK()
            .then(() => {
                console.log('🔥 Initializing Firebase...');
                initializeFirebase();
            })
            .catch((error) => {
                console.error('❌ Firebase loading failed:', error);
                // Dispatch error event
                window.dispatchEvent(new CustomEvent('firebaseError', { detail: error }));
            });
    }

    // Execute when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export config for debugging
    window.firebaseConfig = firebaseConfig;

})();