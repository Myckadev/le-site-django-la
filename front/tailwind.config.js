module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                'pastel-green': '#A0F7B7',  // Vert pastel doux pour les éléments interactifs
                'soft-blue': '#5C6BC0',     // Bleu doux pour les éléments d'accentuation
                'dark-bg': '#1A1A1A',       // Gris foncé pour l'arrière-plan
                'dark-purple': '#4B3F72',   // Violet sombre pour les accents
                'light-gray': '#D1D1D1',    // Gris clair pour les textes secondaires
            },
            fontFamily: {
                'futuristic': ['Orbitron', 'sans-serif'],  // Police futuriste pour l'ambiance cyberpunk
            },
            boxShadow: {
                'soft-neon': '0 0 12px rgba(160, 247, 183, 0.6)',  // Ombre lumineuse douce pour les éléments
            },
        },
    },
    plugins: [],
};
