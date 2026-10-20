# Instinct Aventure · maquette « Sable & Lumière »

Maquette statique (HTML, CSS, JavaScript), sans étape de construction, prête pour Vercel.

## Pages
- `index.html` : accueil (intro au ciel réel de Windhoek, piste de la Grande aventure, jeu « Trouve ta piste », qui sommes-nous, Namibie en direct)
- `voyages.html` : catalogue filtrable et triable, comparateur, « Quand partir ? », départs confirmés, services
- `preparer.html` : préparer son voyage (liste à cocher, papiers, santé, route, argent, sources)
- 6 fiches circuits : `ocean-caprivi`, `grande-aventure`, `immersion-sauvage`, `namibie-botswana`, `namibie-authentique`, `namibie-integrale` (bascule autotour / séjour guidé quand le circuit existe dans les deux formules)

## Ce que la v2 ajoute
- Jeu « Trouve ta piste » : 3 questions, la carte trace le voyage le plus proche.
- Liste d’envies (cœurs), jointe à la demande de devis ; carnet de route à tampons par région.
- Comparateur de deux voyages, tri du catalogue, choix du mois de départ.
- Devis enrichi : rappel du voyage, brouillon conservé, option WhatsApp.
- Cartes vivantes : un 4x4 roule sur la trace et soulève la poussière, la faune apparaît aux étapes.
- Namibie en direct : lever et coucher du soleil à Windhoek, intro et cadran à l’heure réelle.
- Safari de nuit dans le pied de page, prix à rouleaux, galerie à faire glisser, transitions natives entre pages.
- Mode allégé automatique sur les appareils lents ; mode calme respecté partout.

## Où modifier
- **Circuits, prix, départs, programme jour par jour** : `assets/js/data.js` (un seul fichier). Les départs confirmés sont triés automatiquement entre « à venir » et « passés ».
- **Styles** : `assets/css/main.css` (couleurs et typographies en tête de fichier).
- **Images** : `assets/img/<nom>-640|1280|1920|2560.webp` (et `.avif`). Les fichiers `g-*.webp` sont des visuels provisoires, à remplacer par les images Grok.
- **Informations pratiques** (`preparer.html`) : vérifiées le 19 octobre 2026 auprès de France Diplomatie, de l’Institut Pasteur, de TourMaG et du Routard ; à revérifier avant chaque saison.

## Bibliothèques hébergées avec le site
GSAP 3.15 (ScrollTrigger, SplitText, Flip, Draggable, InertiaPlugin), Lenis 1.3, OGL 1.0 (sous-ensemble), polices Instrument Serif et Inter Tight (licence OFL). Fonds de carte : Natural Earth (domaine public).

## À compléter avant mise en ligne réelle
- Avis clients réels (emplacement prévu sur l’accueil).
- Section « Qui sommes-nous » : histoire de l’agence, partenaires sur place, portrait.
- Lien vers le formulaire d’information standard des forfaits (arrêté du 1er mars 2018).
- Images Grok définitives.
- Envoi réel du formulaire de devis (actuellement simulé) et délai de réponse.
