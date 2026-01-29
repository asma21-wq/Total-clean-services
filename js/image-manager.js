/**
 * Image Manager - Gère toutes les images du site
 * Source unique : data/images.json
 */

class ImageManager {
    constructor() {
        this.imagesData = null;
        this.ready = this.init();
    }

    /**
     * Initialiser le gestionnaire d'images
     */
    async init() {
        try {
            const response = await fetch('data/images.json');
            this.imagesData = await response.json();
            console.log('✅ Images chargées depuis data/images.json');
            window.dispatchEvent(new Event('imagesDataLoaded'));
        } catch (error) {
            console.error('❌ Erreur lors du chargement des images:', error);
        }
    }

    /**
     * Obtenir une image spécifique
     * @param {string} path - Chemin dans le JSON (ex: 'hero.background')
     * @returns {object} Objet image {src, alt, title}
     */
    getImage(path) {
        return this.getNestedProperty(this.imagesData, path);
    }

    /**
     * Obtenir une propriété imbriquée
     */
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }

    /**
     * Créer une balise <img>
     */
    createImgElement(path, additionalClasses = '') {
        const image = this.getImage(path);
        if (!image) return null;

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || '';
        img.title = image.title || '';
        if (additionalClasses) img.className = additionalClasses;

        return img;
    }

    /**
     * Obtenir toutes les images avant/après d'une catégorie
     */
    getBeforeAfterByCategory(category) {
        return this.imagesData.beforeAfter.filter(item => item.category === category);
    }

    /**
     * Obtenir tous les témoignages
     */
    getTestimonials() {
        return this.imagesData.testimonials;
    }

    /**
     * Obtenir les témoignages d'un service spécifique
     */
    getTestimonialsByService(service) {
        return this.imagesData.testimonials.filter(t => t.service === service);
    }

    /**
     * Obtenir le lien vers les réseaux sociaux
     */
    getSocialLink(platform) {
        return this.imagesData.social?.[platform] || null;
    }

    /**
     * Obtenir toutes les images de services
     */
    getAllServiceImages() {
        return Object.values(this.imagesData.services);
    }

    /**
     * Obtenir toutes les images
     */
    getAllImages() {
        return this.imagesData;
    }

    /**
     * Ajouter une nouvelle image au JSON (côté client - à sauvegarder manuellement)
     */
    addImage(path, imageData) {
        const keys = path.split('.');
        let current = this.imagesData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = imageData;
        console.log(`✅ Image ajoutée: ${path}`);
    }
}

// Initialiser le gestionnaire au chargement de la page
const imageManager = new ImageManager();

// Rendre disponible globalement
window.imageManager = imageManager;

/**
 * Charger automatiquement les images au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    const runLoaders = () => {
        loadHeroImages();
        loadServiceImages();
        loadBeforeAfterGallery();
        loadTestimonials();
    };

    if (imageManager.imagesData) {
        runLoaders();
    } else {
        window.addEventListener('imagesDataLoaded', runLoaders, { once: true });
    }
});

/**
 * Charger les images du hero
 */
function loadHeroImages() {
    const heroBg = document.querySelector('.hero');
    if (heroBg && imageManager.imagesData) {
        const bgImage = imageManager.getImage('hero.background');
        if (bgImage) {
            heroBg.style.backgroundImage = `url('${bgImage.src}')`;
        }
    }
}

/**
 * Charger les images des services
 */
function loadServiceImages() {
    const serviceCards = document.querySelectorAll('.service-cards .card');
    const services = ['professional', 'automobile', 'trash'];

    serviceCards.forEach((card, index) => {
        if (services[index] && imageManager.imagesData) {
            const serviceImage = imageManager.getImage(`services.${services[index]}`);
            if (serviceImage) {
                const img = document.createElement('img');
                img.src = serviceImage.src;
                img.alt = serviceImage.alt;
                img.style.maxWidth = '100%';
                img.style.marginBottom = '1rem';
                img.style.borderRadius = '8px';
                card.insertBefore(img, card.firstChild);
            }
        }
    });
}

/**
 * Charger la galerie avant/après
 */
function loadBeforeAfterGallery() {
    const beforeAfterSection = document.querySelector('[data-gallery="before-after"]');
    if (!beforeAfterSection || !imageManager.imagesData) return;

    const items = imageManager.imagesData.beforeAfter || [];

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'before-after-item';
        div.innerHTML = `
            <div class="before-after-container">
                <div class="before">
                    <img src="${item.before.src}" alt="${item.before.alt}" />
                    <span class="label">Avant</span>
                </div>
                <div class="after">
                    <img src="${item.after.src}" alt="${item.after.alt}" />
                    <span class="label">Après</span>
                </div>
            </div>
            <p class="before-after-title">${item.title}</p>
            <p class="before-after-desc">${item.description}</p>
        `;
        beforeAfterSection.appendChild(div);
    });
}

/**
 * Charger les témoignages
 */
function loadTestimonials() {
    const testimonialsSection = document.querySelector('[data-gallery="testimonials"]');
    if (!testimonialsSection || !imageManager.imagesData) return;

    const testimonials = imageManager.imagesData.testimonials || [];

    testimonials.forEach(testi => {
        const div = document.createElement('div');
        div.className = 'testimonial-card';
        div.innerHTML = `
            <div class="testimonial-header">
                <img src="${testi.image}" alt="${testi.name}" class="testimonial-avatar" />
                <div class="testimonial-info">
                    <p class="testimonial-name">${testi.name}</p>
                    <p class="testimonial-location">${testi.location}</p>
                    <div class="testimonial-rating">${'⭐'.repeat(testi.rating)}</div>
                </div>
            </div>
            <p class="testimonial-text">"${testi.text}"</p>
            <p class="testimonial-service">${testi.service}</p>
        `;
        testimonialsSection.appendChild(div);
    });
}

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageManager;
}
