# 📁 Gestion des Images - Base de Données

Votre site utilise maintenant un **système centralisé de gestion d'images** basé sur un fichier JSON.

## 🗂️ Structure des dossiers

```
c:\clean\
├── data/
│   ├── images.json                  ← Votre base de données d'images
│   └── images-db-help.js            ← Guide d'utilisation
├── images/
│   ├── hero/                        ← Images du héro
│   ├── services/                    ← Images des services
│   ├── before-after/                ← Galerie avant/après
│   ├── testimonials/                ← Photos des clients
│   └── icons/                       ← Icônes
└── js/
    ├── image-manager.js             ← Gestionnaire d'images (JavaScript)
    └── script.js
```

## 📊 Comment ça marche

### 1. **Fichier central : `data/images.json`**

Toutes vos images sont listées ici avec :
- Chemin du fichier
- Texte alternatif (SEO)
- Titre
- Catégorie
- Description

**Exemple :**
```json
{
  "hero": {
    "background": {
      "src": "images/hero/hero-bg.jpg",
      "alt": "Nettoyage professionnel à Strasbourg",
      "title": "Héro background"
    }
  },
  "beforeAfter": [
    {
      "id": "chantier-1",
      "before": { "src": "images/before-after/chantier-before-1.jpg" },
      "after": { "src": "images/before-after/chantier-after-1.jpg" },
      "title": "Fin de chantier"
    }
  ]
}
```

### 2. **Gestionnaire JavaScript : `js/image-manager.js`**

Charge automatiquement les images depuis le JSON et les affiche sur les pages.

**Utilisation simple :**
```javascript
// Obtenir une image
const image = imageManager.getImage('hero.background');
console.log(image.src); // "images/hero/hero-bg.jpg"

// Obtenir les images avant/après d'une catégorie
const beforeAfter = imageManager.getBeforeAfterByCategory('fin-de-chantier');

// Obtenir tous les témoignages
const testimonials = imageManager.getTestimonials();
```

## 📸 Ajouter une nouvelle image

### Étape 1 : Ajouter le fichier image
Placer l'image dans le bon dossier :
- `images/hero/` pour images du héro
- `images/services/` pour services
- `images/before-after/` pour galerie avant/après
- `images/testimonials/` pour photos clients

**Nommer le fichier :** `descriptif-en-minuscules.jpg`

### Étape 2 : Mettre à jour `data/images.json`

Ajouter l'image dans la structure JSON :

```json
{
  "beforeAfter": [
    {
      "id": "nouvelle-image",
      "category": "fin-de-chantier",
      "before": { "src": "images/before-after/nouveau-avant.jpg", "alt": "..." },
      "after": { "src": "images/before-after/nouveau-apres.jpg", "alt": "..." },
      "title": "Nouveau projet",
      "description": "Description"
    }
  ]
}
```

Sauvegarde = Image apparaît automatiquement sur le site ! ✅

## 🎯 Avantages du système

| Avant | Après (avec DB) |
|-------|---|
| ❌ Images hardcodées en HTML | ✅ Centralisées dans JSON |
| ❌ Modifier = changer le HTML | ✅ Modifier = changer JSON |
| ❌ Pas de SEO alt text | ✅ Alt text systématique |
| ❌ Complexe à maintenir | ✅ Simple et scalable |
| ❌ Pas de réutilisation | ✅ Données réutilisables |

## 📋 Checklist pour utiliser

- [ ] Placer les images dans les bons dossiers
- [ ] Ajouter les entrées dans `data/images.json`
- [ ] Vérifier que `image-manager.js` est chargé dans le HTML
- [ ] Tester : les images apparaissent automatiquement
- [ ] Compresser les images avant upload (max 500KB)
- [ ] Utiliser des alt texts descriptifs

## 🔧 Fonctions utiles

```javascript
// Obtenir toutes les images
imageManager.getAllImages();

// Créer un élément img
imageManager.createImgElement('hero.background', 'css-class');

// Obtenir les témoignages d'un service
imageManager.getTestimonialsByService('Nettoyage automobile');

// Obtenir un lien réseau social
imageManager.getSocialLink('facebook');
```

## 💡 Bonnes pratiques

✅ Nommer les fichiers : `chantier-avant-1.jpg` (pas d'accents, minuscules)  
✅ Compresser les images avant upload  
✅ Toujours ajouter un `alt` text descriptif  
✅ Utiliser du JPEG pour photos, PNG pour icônes  
✅ Garder un même style/rapport pour les avant/après  
✅ Mettre à jour `data/images.json` à chaque changement  

## 📞 Support

Des questions ? Consultez `data/images-db-help.js` pour des exemples détaillés.
