# DevShop

**DevShop** est une application e-commerce dynamique de type **Single Page Application (SPA)**. Elle récupère des produits depuis une API publique, les affiche dynamiquement et permet de les rechercher, filtrer et ajouter à un panier.

## Fonctionnalités

### Niveau 1 — Fondamentaux
- Récupération des produits avec `fetch()` et `async/await`.
- Affichage dynamique des produits.
- Gestion des états de chargement et d'erreur.
- Interface responsive avec **CSS Grid** et **Flexbox**.

### Niveau 2 — Interactivité
- Filtrage des produits par catégorie avec `Array.filter()`.
- Recherche des produits en temps réel avec l'événement `input` et `String.includes()`.
- Ajout des produits au panier.
- Mise à jour du compteur du panier.

### Niveau 3 — Bonus
- Panier sous forme de tiroir **off-canvas**.
- Modification des quantités.
- Suppression des produits du panier.
- Persistance du panier avec `localStorage`.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Fetch API
- FakeStore API
- LocalStorage

## API

Le projet utilise **FakeStore API** pour récupérer les produits :

```text
https://fakestoreapi.com/products
```

Aucune clé d'authentification n'est nécessaire.

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/aleck2209/dev_shop-s10.git
```

Puis ouvrir le fichier `index.html` dans un navigateur.

## Objectif

Ce projet permet de mettre en pratique la manipulation du DOM, les appels API, les méthodes de tableau JavaScript, les événements et la gestion d'un panier côté client.

