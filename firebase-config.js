// firebase-config.js - Universal Mobile & Desktop Compatible Version
// Works on GitHub Pages, all browsers, mobile & desktop

(function() {
    'use strict';

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBYEol3wDIUihPTLaM1EjqVkpvjvJ-1_O4",
        authDomain: "my-website-backend-957db.firebaseapp.com",
        projectId: "my-website-backend-957db",
        storageBucket: "my-website-backend-957db.firebasestorage.app",
        messagingSenderId: "75667291929",
        appId: "1:75667291929:web:10878882c9c30574144f88",
        measurementId: "G-8H93W7QZGT"
    };

    // Load Firebase Compat SDK if not already loaded
    function loadFirebaseSDK() {
        return new Promise((resolve, reject) => {
            if (typeof firebase !== 'undefined') {
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

    // Initialize Firebase
    function initializeFirebase() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        // Create global instances
        window.auth = firebase.auth();
        window.db = firebase.firestore();
        window.googleProvider = new firebase.auth.GoogleAuthProvider();
        window.googleProvider.setCustomParameters({ prompt: 'select_account' });

        // Export Firebase utilities as global functions for compatibility
        window.firebaseUtils = {
            // Auth Methods
            createUserWithEmailAndPassword: (email, password) => 
                window.auth.createUserWithEmailAndPassword(email, password),
            
            signInWithEmailAndPassword: (email, password) => 
                window.auth.signInWithEmailAndPassword(email, password),
            
            signInWithPopup: (provider) => 
                window.auth.signInWithPopup(provider || window.googleProvider),
            
            onAuthStateChanged: (callback) => 
                window.auth.onAuthStateChanged(callback),
            
            signOut: () => 
                window.auth.signOut(),
            
            updateProfile: (user, profile) => 
                user.updateProfile(profile),

            getCurrentUser: () => 
                window.auth.currentUser,

            // Firestore Methods
            collection: (path) => 
                window.db.collection(path),
            
            addDoc: (collectionRef, data) => 
                collectionRef.add(data),
            
            getDocs: (collectionRef) => 
                collectionRef.get(),
            
            getDoc: (docRef) => 
                docRef.get(),
            
            setDoc: (docRef, data, options) => 
                docRef.set(data, options),
            
            updateDoc: (docRef, data) => 
                docRef.update(data),
            
            deleteDoc: (docRef) => 
                docRef.delete(),
            
            doc: (path, id) => 
                window.db.collection(path).doc(id),
            
            onSnapshot: (ref, callback) => 
                ref.onSnapshot(callback),
            
            query: (collectionRef) => 
                collectionRef,
            
            orderBy: (field, direction = 'asc') => 
                ({ type: 'orderBy', field, direction }),
            
            limit: (count) => 
                ({ type: 'limit', count }),
            
            where: (field, operator, value) => 
                ({ type: 'where', field, operator, value }),
            
            serverTimestamp: () => 
                firebase.firestore.FieldValue.serverTimestamp(),
            
            increment: (n) => 
                firebase.firestore.FieldValue.increment(n),
            
            arrayUnion: (...elements) => 
                firebase.firestore.FieldValue.arrayUnion(...elements),
            
            arrayRemove: (...elements) => 
                firebase.firestore.FieldValue.arrayRemove(...elements),
            
            deleteField: () => 
                firebase.firestore.FieldValue.delete()
        };

        // Apply query constraints helper
        window.applyQueryConstraints = (collectionRef, ...constraints) => {
            let query = collectionRef;
            constraints.forEach(constraint => {
                if (constraint.type === 'orderBy') {
                    query = query.orderBy(constraint.field, constraint.direction);
                } else if (constraint.type === 'limit') {
                    query = query.limit(constraint.count);
                } else if (constraint.type === 'where') {
                    query = query.where(constraint.field, constraint.operator, constraint.value);
                }
            });
            return query;
        };

        console.log('✅ Firebase initialized successfully');
        
        // Dispatch custom event when Firebase is ready
        window.dispatchEvent(new CustomEvent('firebaseReady'));
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadFirebaseSDK().then(initializeFirebase).catch(console.error);
        });
    } else {
        loadFirebaseSDK().then(initializeFirebase).catch(console.error);
    }

    // Expose config for manual initialization if needed
    window.firebaseConfig = firebaseConfig;

})();