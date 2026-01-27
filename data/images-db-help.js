/**
 * Configuration de Base de Données pour les images
 * Aide pour ajouter/modifier les images
 */

const imagesDb = {
    // === STRUCTURE ===
    // Tous les chemins d'images sont centralisés dans data/images.json
    // Utilisation: imageManager.getImage('category.subcategory.property')

    // === COMMENT AJOUTER UNE IMAGE ===
    /*
    1. Ajouter le fichier image dans images/[dossier]/
    2. Mettre à jour data/images.json avec le chemin et description
    3. L'image est automatiquement disponible via imageManager

    EXEMPLE:
    {
        "id": "id-unique",
        "src": "images/before-after/nouvelle-image.jpg",
        "alt": "Description pour accessibilité",
        "title": "Titre affiché au survol"
    }
    */

    // === DOSSIERS D'IMAGES ===
    folders: {
        hero: 'images/hero/',
        services: 'images/services/',
        beforeAfter: 'images/before-after/',
        testimonials: 'images/testimonials/',
        icons: 'images/icons/'
    },

    // === CATÉGORIES SUPPORTÉES ===
    categories: {
        finDeChantier: 'fin-de-chantier',
        nettoyageAutomobile: 'nettoyage-automobile',
        nettoyagePoubelles: 'nettoyage-poubelles',
        demenagement: 'demenagement',
        bureaux: 'bureaux'
    },

    // === BONNES PRATIQUES ===
    tips: [
        '✅ Utiliser des noms de fichiers descriptifs (ex: chantier-avant-1.jpg)',
        '✅ Ajouter les images en JPEG pour les photos, PNG pour les icônes',
        '✅ Toujours inclure alt text pour SEO et accessibilité',
        '✅ Compresser les images avant upload (max 500KB)',
        '✅ Utiliser des résolutions adaptées (max 1920px de large)',
        '✅ Nommer les fichiers en minuscules, sans accents',
        '✅ Mettre à jour data/images.json à chaque nouvelle image'
    ],

    // === CONSEILS POUR LES PHOTOS AVANT/APRÈS ===
    beforeAfterTips: [
        '📸 Même angle de vue pour avant et après',
        '📸 Même conditions d\'éclairage si possible',
        '📸 Photos de haute qualité (min 1200px de large)',
        '📸 Format cohérent (même ratio)',
        '📸 Utiliser un contraste visible pour l\'impact'
    ],

    // === EXEMPLE DE STRUCTURE JSON ===
    exampleJsonStructure: {
        "hero": {
            "background": {
                "src": "images/hero/hero-bg.jpg",
                "alt": "Description",
                "title": "Titre"
            }
        },
        "services": {
            "professional": {
                "src": "images/services/nettoyage-pro.jpg",
                "alt": "Description",
                "category": "nettoyage-professionnel"
            }
        },
        "beforeAfter": [
            {
                "id": "unique-id",
                "category": "fin-de-chantier",
                "before": {
                    "src": "images/before-after/avant.jpg",
                    "alt": "Avant"
                },
                "after": {
                    "src": "images/before-after/apres.jpg",
                    "alt": "Après"
                },
                "title": "Titre du projet",
                "description": "Description courte"
            }
        ],
        "testimonials": [
            {
                "id": "testi-1",
                "name": "Nom Client",
                "location": "Ville",
                "image": "images/testimonials/photo.jpg",
                "rating": 5,
                "text": "Avis client",
                "service": "Service utilisé",
                "date": "2025-12-15"
            }
        ]
    },

    // === UTILISATION EN JAVASCRIPT ===
    usageExamples: `
    // Obtenir une image spécifique
    const bgImage = imageManager.getImage('hero.background');
    console.log(bgImage.src); // "images/hero/hero-bg.jpg"

    // Créer un élément img
    const imgElement = imageManager.createImgElement('hero.background', 'hero-image');

    // Obtenir toutes les images avant/après d'une catégorie
    const beforeAfter = imageManager.getBeforeAfterByCategory('fin-de-chantier');

    // Obtenir tous les témoignages
    const testimonials = imageManager.getTestimonials();

    // Obtenir les témoignages d'un service spécifique
    const autoTestis = imageManager.getTestimonialsByService('Nettoyage automobile');
    `
};

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = imagesDb;
}

console.log('📁 Base de données images configurée');
console.log('📖 Voir imagesDb pour les conseils d\'utilisation');
