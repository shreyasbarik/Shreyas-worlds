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

    function loadFirebaseSDK() {
        return new Promise((resolve, reject) => {
            if (typeof firebase !== 'undefined') {
                console.log('✅ Firebase already loaded');
                resolve();
                return;
            }

            const scripts = [
                'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js',
                'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js'
            ];

            let loadedCount = 0;

            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                script.onload = () => {
                    loadedCount++;
                    if (loadedCount === scripts.length) {
                        resolve();
                    }
                };
                script.onerror = () => reject(new Error(`Failed to load ${src}`));
                document.head.appendChild(script);
            });
        });
    }

    function initializeFirebase() {
        try {
            if (!firebase.apps || firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
            }

            window.auth = firebase.auth();
            window.db = firebase.firestore();
            window.googleProvider = new firebase.auth.GoogleAuthProvider();
            window.googleProvider.setCustomParameters({ prompt: 'select_account' });

            console.log('✅ Firebase initialized successfully');
            window.dispatchEvent(new CustomEvent('firebaseReady'));
        } catch (error) {
            console.error('❌ Firebase initialization error:', error);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadFirebaseSDK().then(initializeFirebase).catch(console.error);
        });
    } else {
        loadFirebaseSDK().then(initializeFirebase).catch(console.error);
    }

    window.firebaseConfig = firebaseConfig;
})();