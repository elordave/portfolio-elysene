# Configuration des Grilles et Z-Index

## 🎨 Couleurs des Grilles

Toutes les grilles du projet utilisent **une seule couleur uniforme** :

### Définition Globale (globals.css)
```css
:root {
  --border-color: #1f1f1f;  /* Couleur unique pour toutes les grilles */
}

@theme inline {
  --color-border-grid: var(--border-color);
}
```

### Utilisation dans le Projet

1. **Grille de fond globale** (`page.tsx`)
   - Utilise `--border-color` directement dans `globals.css`
   - Classes Tailwind : `border-border-grid`

2. **Grille Hero Section** (`Hero.tsx`)
   - Classes Tailwind : `border-border-grid`

3. **Grille Tools Section** (`Tools.tsx`)
   - Classes Tailwind : `bg-border-grid` et `border-border-grid`
   - Les lignes de grille sont créées avec des divs absolus utilisant `bg-border-grid`

**Résultat** : Toutes les grilles ont la même couleur `#1f1f1f` ✅

---

## 📊 Hiérarchie des Z-Index

### Structure en Couches

```
z-1   → Grille de fond globale (.layout-grid-bg)
        └─ Définie dans globals.css
        └─ Appliquée dans page.tsx

z-10  → Contenu principal (sections)
        └─ Navbar
        └─ Hero (texte et contenu)
        └─ Tools (grilles de la section)
        └─ Expertise, Contact, Footer

z-20  → Objet 3D (Spline)
        └─ Au-dessus de TOUTES les grilles
        └─ Au-dessus de toutes les sections
```

### Fichiers Concernés

#### `app/globals.css` (ligne 53)
```css
.layout-grid-bg {
  z-index: 1;  /* Grille de fond */
}
```

#### `app/page.tsx` (ligne 20)
```tsx
<div className="w-full relative z-10">
  {/* Toutes les sections */}
</div>
```

#### `components/Tools.tsx` (ligne 5)
```tsx
<section className="... relative z-10 ...">
  {/* Section Tools avec ses grilles */}
</section>
```

#### `components/Hero.tsx` (ligne 126)
```tsx
<div className="... z-20 ...">
  {/* Conteneur de l'objet 3D Spline */}
</div>
```

---

## 🔧 Modifications Apportées

### ✅ Correction du Z-Index de l'Objet 3D

**Problème** : L'objet 3D (`z-10`) était au même niveau que la section Tools (`z-10`), donc les lignes de grille de Tools apparaissaient par-dessus l'objet.

**Solution** : Augmentation du z-index de l'objet 3D à `z-20`.

```tsx
// AVANT
<div className="... z-10 ...">  /* Objet 3D */

// APRÈS
<div className="... z-20 ...">  /* Objet 3D AU-DESSUS de tout */
```

### ✅ Vérification des Couleurs

Confirmation que toutes les grilles utilisent la même couleur `#1f1f1f` via la variable CSS `--border-color`.

---

## 📝 Comment Modifier

### Changer la Couleur des Grilles

**Fichier** : `app/globals.css` (ligne 7)

```css
:root {
  --border-color: #1f1f1f;  /* Modifiez cette valeur */
}
```

**Impact** : Change TOUTES les grilles du site automatiquement.

### Ajuster le Z-Index de l'Objet 3D

**Fichier** : `components/Hero.tsx` (ligne 126)

```tsx
<div className="... z-20 ...">  /* Augmentez si nécessaire (z-30, z-40, etc.) */
```

---

## 🎯 Résultat Final

✅ **Objet 3D toujours visible** par-dessus toutes les grilles  
✅ **Couleur uniforme** pour toutes les grilles du site (`#1f1f1f`)  
✅ **Hiérarchie claire** : Grille fond (z-1) < Sections (z-10) < Objet 3D (z-20)

