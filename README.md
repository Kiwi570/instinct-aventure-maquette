# Instinct Aventure · maquette « Sable & Lumière »

Maquette statique (HTML, CSS, JavaScript), sans étape de construction, prête pour Vercel.

## Pages
- `index.html` : accueil
- `voyages.html` : catalogue filtrable, départs confirmés, services
- `ocean-caprivi.html` : fiche circuit type, avec bascule autotour / séjour guidé

## Où modifier
- **Circuits, prix, départs, programme jour par jour** : `assets/js/data.js` (un seul fichier). Les départs confirmés sont triés automatiquement entre « à venir » et « passés ».
- **Styles** : `assets/css/main.css` (couleurs et typographies en tête de fichier).
- **Images** : `assets/img/<nom>-640|1280|1920|2560.webp`. Les fichiers `g-*.webp` sont des visuels provisoires, à remplacer par les images Grok.

## Bibliothèques hébergées avec le site
GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3, OGL 1.0 (sous-ensemble), polices Instrument Serif et Inter Tight (licence OFL). Fonds de carte : Natural Earth (domaine public).

## À compléter avant mise en ligne réelle
- Avis clients réels (emplacement prévu sur l’accueil).
- Lien vers le formulaire d’information standard des forfaits (arrêté du 1er mars 2018).
- Images Grok définitives.
- Envoi réel du formulaire de devis (actuellement simulé).
