/* Données de la maquette : toutes reprises du site actuel instinct-aventure.fr (octobre 2026).
   Un seul fichier à tenir à jour pour les circuits, les prix et les départs confirmés.
   Coordonnées des étapes : positions approximatives, pour la carte illustrative. */
window.IA_DATA = {
  contact: {
    tel: '+33 7 43 78 21 91',
    whatsapp: 'https://wa.me/33743782191',
    email: 'contact@instinct-aventure.com',
    instagram: 'https://www.instagram.com/instinct.aventure'
  },

  places: {
    windhoek: { n: 'Windhoek', lon: 17.08, lat: -22.57, cap: true },
    okahandja: { n: 'Okahandja', lon: 16.91, lat: -21.98 },
    rehoboth: { n: 'Rehoboth', lon: 17.08, lat: -23.32 },
    swakopmund: { n: 'Swakopmund', lon: 14.53, lat: -22.68 },
    walvisbay: { n: 'Walvis Bay', lon: 14.51, lat: -22.96 },
    uis: { n: 'Uis', lon: 14.87, lat: -21.22 },
    brandberg: { n: 'Brandberg', lon: 14.6, lat: -21.1 },
    spitzkoppe: { n: 'Spitzkoppe', lon: 15.19, lat: -21.83 },
    palmwag: { n: 'Palmwag', lon: 13.94, lat: -19.88 },
    twyfelfontein: { n: 'Twyfelfontein', lon: 14.37, lat: -20.59 },
    okatare: { n: 'Ferme Okatare', lon: 15.1, lat: -20.3 },
    vingerklip: { n: 'Fingerklip', lon: 15.43, lat: -20.39 },
    okaukuejo: { n: 'Okaukuejo', lon: 15.91, lat: -19.18 },
    halali: { n: 'Halali', lon: 16.47, lat: -19.03 },
    namutoni: { n: 'Namutoni', lon: 16.94, lat: -18.81 },
    onguma: { n: 'Onguma', lon: 17.05, lat: -18.73 },
    grootfontein: { n: 'Grootfontein', lon: 18.12, lat: -19.57 },
    roys: { n: 'Roy’s Camp', lon: 18.47, lat: -19.26 },
    rundu: { n: 'Rundu', lon: 19.77, lat: -17.92 },
    divundu: { n: 'Divundu', lon: 21.53, lat: -18.1 },
    mahango: { n: 'Mahango', lon: 21.72, lat: -18.25 },
    guma: { n: 'Guma Lagoon', lon: 22.37, lat: -18.96, bw: true },
    dkar: { n: 'Dekar', lon: 21.93, lat: -21.53, bw: true },
    gobabis: { n: 'Gobabis', lon: 18.97, lat: -22.45 },
    otjiwarongo: { n: 'Otjiwarongo', lon: 16.65, lat: -20.46 },
    ccf: { n: 'Cheetah Conservation Fund', lon: 17.0, lat: -20.48 },
    waterberg: { n: 'Waterberg', lon: 17.24, lat: -20.52 },
    sesriem: { n: 'Sesriem', lon: 15.8, lat: -24.49 },
    sossusvlei: { n: 'Sossusvlei', lon: 15.29, lat: -24.73 },
    solitaire: { n: 'Solitaire', lon: 16.0, lat: -23.89 },
    kalahari: { n: 'Kalahari', lon: 18.1, lat: -24.05 }
  },

  regions: {
    namib: 'Désert du Namib',
    cote: 'Côte atlantique',
    damaraland: 'Damaraland',
    etosha: 'Etosha',
    okavango: 'Okavango & Caprivi',
    waterberg: 'Waterberg',
    kalahari: 'Kalahari',
    botswana: 'Botswana'
  },

  circuits: [
    {
      id: 'ocean-caprivi', name: 'De l’océan au Caprivi', sub: 'Côte, Etosha & Caprivi',
      formule: 'autotour', jours: 14, nuits: 13, nuitsLabel: '14 jours / 13 nuits',
      prix: 1690, base: 4, statut: 'libre', periode: 'D’avril à fin octobre 2027, dates libres',
      img: 'caprivi-panorama', page: 'ocean-caprivi.html',
      regions: ['cote', 'damaraland', 'etosha', 'okavango', 'waterberg'],
      route: ['windhoek', 'okahandja', 'swakopmund', 'walvisbay', 'uis', 'brandberg', 'okaukuejo', 'namutoni', 'grootfontein', 'rundu', 'divundu', 'mahango', 'roys', 'otjiwarongo', 'waterberg', 'windhoek']
    },
    {
      id: 'ocean-caprivi-guide', name: 'De l’océan au Caprivi guidé', sub: 'Côte, Etosha & Caprivi',
      formule: 'guide', jours: 14, nuits: 13, nuitsLabel: '14 jours / 13 nuits',
      prix: 3690, base: 4, statut: 'libre', periode: 'De mars à novembre, dates libres',
      img: 'hippopotames-okavango-2', page: 'ocean-caprivi.html#guide',
      regions: ['cote', 'damaraland', 'etosha', 'okavango', 'waterberg'],
      route: ['windhoek', 'okahandja', 'swakopmund', 'walvisbay', 'uis', 'brandberg', 'okaukuejo', 'namutoni', 'grootfontein', 'rundu', 'divundu', 'mahango', 'roys', 'otjiwarongo', 'waterberg', 'windhoek']
    },
    {
      id: 'grande-aventure', name: 'Grande aventure', sub: 'Etosha, Okavango & Namib',
      formule: 'autotour', jours: 21, nuits: 20, nuitsLabel: '21 jours / 20 nuits',
      prix: 2840, base: 4, statut: 'libre', periode: null,
      img: 'elephants-panorama', page: 'grande-aventure.html',
      regions: ['etosha', 'okavango', 'waterberg', 'damaraland', 'cote', 'namib'],
      route: ['windhoek', 'okahandja', 'okaukuejo', 'halali', 'namutoni', 'rundu', 'divundu', 'mahango', 'roys', 'waterberg', 'spitzkoppe', 'brandberg', 'swakopmund', 'walvisbay', 'swakopmund', 'sesriem', 'sossusvlei', 'solitaire', 'windhoek']
    },
    {
      id: 'grande-aventure-guide', name: 'Grande aventure guidée', sub: 'Etosha, Okavango & Namib',
      formule: 'guide', jours: 21, nuits: 20, nuitsLabel: '21 jours / 20 nuits',
      prix: 4215, base: 4, statut: 'libre', periode: null,
      img: 'elephants-buffalo', page: 'grande-aventure.html#guide',
      regions: ['etosha', 'okavango', 'waterberg', 'damaraland', 'cote', 'namib'],
      route: ['windhoek', 'okahandja', 'okaukuejo', 'halali', 'namutoni', 'rundu', 'divundu', 'mahango', 'roys', 'waterberg', 'spitzkoppe', 'brandberg', 'swakopmund', 'walvisbay', 'swakopmund', 'sesriem', 'sossusvlei', 'solitaire', 'windhoek']
    },
    {
      id: 'immersion-sauvage', name: 'Immersion Sauvage', sub: 'Damaraland, Etosha & Swakopmund',
      formule: 'guide', jours: 10, nuits: 9, nuitsLabel: '10 jours / 9 nuits',
      prix: 2840, base: 4, statut: 'libre', periode: 'Juin à fin septembre 2027',
      img: 'immersion-panorama', page: 'immersion-sauvage.html',
      note: 'Véhicule et chauffeur dédiés, séjour sur une ferme privée de 11 000 ha.',
      regions: ['cote', 'damaraland', 'etosha'],
      route: ['windhoek', 'swakopmund', 'uis', 'okatare', 'twyfelfontein', 'okatare', 'halali', 'okaukuejo', 'okatare', 'vingerklip', 'okatare', 'windhoek']
    },
    {
      id: 'namibie-botswana', name: 'Namibie & Botswana, grande traversée en 4x4', short: 'Grande traversée en 4x4', sub: 'Namib, Damaraland & Caprivi',
      formule: 'confirme', jours: 21, nuits: 20, nuitsLabel: '21 jours / 20 nuits',
      prix: 4250, base: 4, statut: 'complet', depart: '2027-04-13', departLabel: '13 avril 2027',
      img: 'passereaux', page: 'namibie-botswana.html',
      note: 'Accompagnateur francophone du début à la fin.',
      regions: ['namib', 'cote', 'damaraland', 'etosha', 'okavango', 'botswana'],
      route: ['windhoek', 'rehoboth', 'sesriem', 'sossusvlei', 'solitaire', 'swakopmund', 'walvisbay', 'swakopmund', 'spitzkoppe', 'brandberg', 'palmwag', 'okatare', 'okaukuejo', 'namutoni', 'rundu', 'mahango', 'divundu', 'guma', 'dkar', 'gobabis', 'windhoek']
    },
    {
      id: 'namibie-authentique', name: 'Namibie authentique', short: 'Namibie authentique', sub: 'Kalahari, Namib & Etosha',
      formule: 'confirme', jours: 14, nuits: 12, nuitsLabel: '14 jours / 12 nuits sur place',
      prix: 3925, base: 2, statut: 'complet', depart: '2027-02-25', departLabel: '25 février 2027',
      img: 'kalahari', page: 'namibie-authentique.html',
      note: 'Accompagnateur francophone du début à la fin.',
      regions: ['kalahari', 'namib', 'cote', 'damaraland', 'etosha', 'waterberg'],
      route: ['windhoek', 'kalahari', 'sesriem', 'sossusvlei', 'sesriem', 'swakopmund', 'walvisbay', 'swakopmund', 'spitzkoppe', 'brandberg', 'okatare', 'okaukuejo', 'onguma', 'ccf', 'waterberg', 'windhoek']
    },
    {
      id: 'namibie-integrale', name: 'Namibie intégrale', short: 'Namibie intégrale', sub: 'Namib, Etosha & Waterberg',
      formule: 'confirme', jours: 17, nuits: 16, nuitsLabel: '17 jours / 16 nuits',
      prix: 3600, base: 3, statut: 'complet', depart: '2027-05', departLabel: 'Mai 2027 (dates à définir)',
      img: 'zebre-etosha', page: 'namibie-integrale.html',
      note: 'Accompagnateur francophone du début à la fin.',
      regions: ['namib', 'cote', 'damaraland', 'etosha', 'okavango', 'waterberg'],
      route: ['windhoek', 'sesriem', 'sossusvlei', 'swakopmund', 'walvisbay', 'swakopmund', 'spitzkoppe', 'brandberg', 'okatare', 'okaukuejo', 'onguma', 'rundu', 'mahango', 'rundu', 'grootfontein', 'ccf', 'otjiwarongo', 'waterberg', 'okahandja', 'windhoek']
    }
  ]
};

/* Fiches circuits : une entrée par page. Tout le contenu provient du site actuel.
   modes : formules disponibles sur la page (autotour, guide, confirme).
   days : j (et j2 pour les étapes de deux jours), stop, via, after (retours), t, nuit, km, img,
   a = texte par défaut, g = texte du séjour guidé s'il diffère. */
window.IA_DATA.fiches = {
  'ocean-caprivi': {
    modes: { autotour: 'ocean-caprivi', guide: 'ocean-caprivi-guide' },
    h1: ['De l’océan', 'au Caprivi'],
    hero: { img: 'caprivi-panorama', alt: 'Coucher de soleil sur le fleuve dans le Caprivi, des antilopes au bord de l’eau', pos: '0.5 0.5' },
    eyebrow: 'Côte, Etosha & Caprivi · 14 jours / 13 nuits',
    overview: {
      title: ['Découverte faune', 'et paysages'],
      text: {
        autotour: ['Un séjour de 14 jours en autotour : vous conduisez, nous organisons tout. De la côte atlantique au fleuve Okavango, en passant par le Damaraland et le parc d’Etosha, le parcours est pensé pour la nature et l’observation des animaux.'],
        guide: ['Un séjour de 14 jours guidé de bout en bout : un chauffeur-guide conduit et vous accompagne tout au long du voyage. De la côte atlantique au fleuve Okavango, en passant par le Damaraland et le parc d’Etosha, le parcours est pensé pour la nature et l’observation des animaux.']
      },
      imgs: [['buffles-okavango', 'Buffles au bord de l’Okavango'], ['guepier-carmin', 'Guêpiers carmin sur une branche']]
    },
    stats: { kind: 'nuits', items: [['Nuits en camping', 8], ['Nuits en lodges et logements privatifs', 5]] },
    season: { autotour: [3, 4, 5, 6, 7, 8, 9], guide: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
    driver: { autotour: 'Vous conduisez un Toyota Hilux 4x4 équipé', guide: 'Votre chauffeur-guide conduit le Toyota Hilux 4x4' },
    days: [
      { j: 1, stop: 'okahandja', t: 'Arrivée à Windhoek', nuit: 'Nuit en dur', img: 'g-route-acacias-aube-16x9',
        a: 'Prise en charge du 4x4 équipé à l’aéroport international. Première nuit en dur à Okahandja, à une heure de Windhoek.',
        g: 'Accueil par votre chauffeur-guide dès l’aéroport international, à bord du 4x4 équipé. Première nuit en dur à Okahandja, à une heure de Windhoek.' },
      { j: 2, stop: 'swakopmund', t: 'Vers Swakopmund', nuit: 'Appartement', img: 'g-cote-brume-dunes-4x5',
        a: 'Route goudronnée à travers le désert du Namib (4 h). Installation dans un appartement tout équipé près de l’océan et du centre-ville. Courses, balade sur la côte, restaurants et food trucks.' },
      { j: 3, stop: 'walvisbay', after: ['swakopmund'], t: 'Sortie en mer à Walvis Bay', nuit: 'Appartement', img: 'otaries-fourrure',
        a: 'Minibus jusqu’à Walvis Bay et sortie en bateau à la rencontre des otaries à fourrure, dauphins et pélicans, avec repas léger à bord. Après-midi libre : dunes ou ville. Nuit à l’appartement.' },
      { j: 4, stop: 'brandberg', via: 'uis', t: 'Le Brandberg', nuit: 'Camping', img: 'rocher-damaraland',
        a: 'Départ matinal vers le Damaraland via Uis, jusqu’au pied du Brandberg, point culminant de la Namibie. Paysages et faune locale, dont les éléphants du désert. Nuit en camping équipé avec restaurant et bar.' },
      { j: 5, stop: 'okaukuejo', t: 'Entrée dans Etosha', nuit: 'Camping', img: 'girafe-etosha',
        a: 'Route vers le parc d’Etosha, arrivée à Okaukuejo avant la nuit. Observation de la faune au point d’eau, un incontournable en saison sèche. Nuit en camping dans le parc.' },
      { j: 6, stop: 'namutoni', t: 'Traversée d’Etosha', nuit: 'Camping', img: 'guepard-etosha',
        a: 'D’Okaukuejo à Namutoni par les pistes : félins, éléphants, zèbres, gnous, springboks, oryx, impalas, koudous, girafes… Nuit en camping à Namutoni.',
        g: 'D’Okaukuejo à Namutoni par les pistes, accompagné par votre chauffeur-guide : félins, éléphants, zèbres, gnous, springboks, oryx, impalas, koudous, girafes… Nuit en camping à Namutoni.' },
      { j: 7, stop: 'rundu', via: 'grootfontein', t: 'Rundu et l’Okavango', nuit: 'Lodge', img: 'hippopotames-okavango-2',
        a: 'Route vers Rundu via Grootfontein. Nuit en lodge sur les rives du fleuve.' },
      { j: 8, stop: 'divundu', t: 'Divundu, porte du Caprivi', nuit: 'Camping au lodge', img: 'buffles-okavango',
        a: 'Visite possible de la réserve de Mahango en route : début du delta, faune exceptionnelle, loin de la foule d’Etosha. Nuit en camping dans un lodge au bord du fleuve (bungalow en option), avec activités sur place : bateau, pêche.' },
      { j: 9, stop: 'mahango', t: 'Bwabwata et Mahango', nuit: 'Camping au lodge', img: 'elephants-buffalo',
        a: 'Matin dans la Buffalo Core Area du parc national de Bwabwata, soir dans la réserve de Mahango jusqu’à la frontière du Botswana. Partez tôt et rentrez tard pour les fauves, buffles et éléphants. Nuit au lodge (bungalow en option).',
        g: 'Matin dans la Buffalo Core Area du parc national de Bwabwata, soir dans la réserve de Mahango jusqu’à la frontière du Botswana. Départ tôt et retour tard pour observer fauves, buffles et éléphants. Nuit au lodge (bungalow en option).' },
      { j: 10, stop: 'roys', t: 'Roy’s Camp', nuit: 'Camping', img: 'g-bivouac-crepuscule-4x5',
        a: 'Début du retour vers le sud par les rives du fleuve, départ au plus tard à midi. Nuit à Roy’s Camp, camping avec bar et restaurant.',
        g: 'Début du retour vers le sud par les rives du fleuve. Nuit à Roy’s Camp, camping avec bar et restaurant.' },
      { j: 11, stop: 'otjiwarongo', t: 'Otjiwarongo', nuit: 'Hôtel', img: 'g-piscine-savane-4x5',
        a: 'Balade à pied à Roy’s Camp ou repos jusqu’à midi, puis route vers Otjiwarongo. Nuit en dur à l’hôtel, avec piscine.' },
      { j: 12, stop: 'waterberg', t: 'Le Waterberg', nuit: 'Camping', img: 'g-plateau-waterberg-4x5',
        a: 'Départ à la mi-journée pour le parc du Waterberg. Nuit en camping (bungalow en option).' },
      { j: 13, stop: 'waterberg', t: 'Le plateau du Waterberg', nuit: 'Camping',
        a: 'Randonnée matinale jusqu’au plateau ou repos à la piscine. L’après-midi, visite du parc avec les rangers (en option) ou détente au camp Bernabé de la Bat.' },
      { j: 14, stop: 'windhoek', t: 'Retour à Windhoek', nuit: 'Vol retour', img: 'g-route-acacias-aube-16x9',
        a: 'Route vers la capitale, restitution du véhicule vers 15 h au plus tard et transfert à l’aéroport pour votre vol du soir.',
        g: 'Route vers la capitale avec votre chauffeur-guide, puis transfert à l’aéroport pour votre vol du soir.' }
    ],
    incl: {
      autotour: ['L’organisation du séjour', 'La location du 4x4 équipé et son assurance', 'La prise en charge à l’aéroport', 'Le road book détaillé', 'Les réservations des hébergements et campings', 'La sortie en bateau à Walvis Bay', 'L’assistance téléphonique via WhatsApp', 'Nos conseils sur place'],
      guide: ['L’organisation du séjour', 'Le véhicule équipé et son assurance', 'Le chauffeur-guide du premier au dernier jour', 'La prise en charge à l’aéroport', 'Les réservations des hébergements et campings', 'La sortie en bateau à Walvis Bay', 'L’assistance disponible tout au long du voyage', 'Nos conseils sur place']
    },
    nonIncl: ['Les vols Europe – Windhoek', 'Le visa touristique', 'La nourriture', 'Le carburant', 'Les entrées des parcs', 'Les options'],
    nonInclNote: 'Les options peuvent être ajoutées à la demande et figurent alors dans votre devis. Nous pouvons vous aider à estimer votre budget sur place.',
    guideNote: true,
    focus: {
      eyebrow: 'Le véhicule', title: ['Toyota Hilux,', 'tout équipé'], img: 'installation-camp', imgAlt: 'Voyageurs installant la tente de toit de leur 4x4 au camping',
      img2: 'bivouac-4x4-nuit', img2Alt: 'Bivouac de nuit autour du feu',
      kits: ['Tentes de toit pour 4', '5 places', 'Frigo', 'Camping et cuisine'],
      text: {
        autotour: 'Vous récupérez à l’aéroport de Windhoek un Toyota Hilux 4x4 diesel entièrement équipé : tentes de toit pour 4 personnes (5 places), frigo, matériel de camping et de cuisine.',
        guide: 'Vous êtes accueillis à l’aéroport de Windhoek par votre chauffeur-guide, au volant d’un Toyota Hilux 4x4 diesel entièrement équipé : tentes de toit pour 4 personnes (5 places), frigo, matériel de camping et de cuisine.'
      }
    },
    gallery: [['guepard-etosha', 'Guépard, Etosha'], ['hippopotame-okavango', 'Hippopotame, Okavango'], ['guepier-carmin', 'Guêpiers carmin'], ['otaries-fourrure', 'Otaries à fourrure'], ['buffles-okavango', 'Buffles, Okavango'], ['flamants', 'Flamants'], ['hippopotames-okavango-2', 'Hippopotame, Okavango']],
    regionsTitle: ['Cinq Namibie', 'en un voyage'],
    regions: [
      ['Côte atlantique', 'Swakopmund et Walvis Bay, entre océan et dunes du Namib.', '22°41′S 14°32′E', 'otaries-cape-cross'],
      ['Damaraland', 'Le massif du Brandberg et ses éléphants du désert.', '21°08′S 14°35′E', 'rocher-damaraland'],
      ['Parc d’Etosha', 'D’Okaukuejo à Namutoni, la plus grande concentration de faune du pays.', '19°11′S 15°55′E', 'girafe-etosha'],
      ['Okavango et Caprivi', 'Bwabwata et Mahango : fleuve, delta et faune très diversifiée.', '18°06′S 21°32′E', 'elephants-buffalo'],
      ['Waterberg', 'Plateau, randonnée et fin de séjour au calme.', '20°31′S 17°14′E', 'g-plateau-waterberg-4x5']
    ],
    assist: {
      img: 'koudou-coucher-soleil', imgAlt: 'Silhouette d’un koudou au coucher du soleil',
      text: {
        autotour: 'Un numéro dédié joignable sur WhatsApp : en cas de panne, de retard ou de question sur la route, une personne de notre équipe vous répond en français, et vous aide à ajuster l’itinéraire si besoin.',
        guide: 'Votre chauffeur-guide est à vos côtés, et notre équipe reste joignable tout au long du voyage pour ajuster l’itinéraire si besoin.'
      }
    },
    related: ['grande-aventure', 'immersion-sauvage']
  },

  'grande-aventure': {
    modes: { autotour: 'grande-aventure', guide: 'grande-aventure-guide' },
    h1: ['Grande', 'aventure'],
    hero: { img: 'elephants-panorama', alt: 'Troupeau d’éléphants marchant dans la poussière dorée', pos: '0.5 0.55' },
    eyebrow: 'Etosha, Okavango & Namib · 21 jours / 20 nuits',
    overview: {
      title: ['Toute la Namibie,', 'en 21 jours'],
      text: {
        autotour: ['Un autotour « self-drive » de 21 jours et 20 nuits pour parcourir la Namibie dans son intégralité, au volant d’un 4x4 Toyota Hilux tout équipé (tentes de toit, frigo, matériel de camping), pris en charge dès l’aéroport de Windhoek. Assurance du véhicule incluse et kilométrage illimité.',
          'L’itinéraire alterne 12 nuits en camping et 8 nuits en lodge, bungalow ou gîte tout équipé, à travers Etosha, l’Okavango, le Waterberg, le Spitzkoppe, le Brandberg, Swakopmund et le désert du Namib jusqu’à Sossusvlei.'],
        guide: ['Un séjour guidé de 21 jours et 20 nuits pour parcourir la Namibie dans son intégralité, accompagné d’un chauffeur-guide au volant d’un 4x4 Toyota Hilux tout équipé (tentes de toit, frigo, matériel de camping), dès votre arrivée à l’aéroport de Windhoek.',
          'L’itinéraire alterne 12 nuits en camping et 8 nuits en lodge, bungalow ou gîte tout équipé, à travers Etosha, l’Okavango, le Waterberg, le Spitzkoppe, le Brandberg, Swakopmund et le désert du Namib jusqu’à Sossusvlei.']
      },
      imgs: [['lions-famille', 'Lionnes et lionceau, Etosha'], ['cameleon', 'Caméléon dans le sable']]
    },
    stats: { kind: 'nuits', items: [['Nuits en camping', 12], ['Nuits en lodge, bungalow ou gîte', 8]] },
    season: null,
    driver: { autotour: 'Vous conduisez un Toyota Hilux 4x4 tout équipé', guide: 'Votre chauffeur-guide conduit le Toyota Hilux 4x4' },
    days: [
      { j: 1, stop: 'okahandja', t: 'Windhoek – Okahandja', nuit: 'Lodge', img: 'g-route-acacias-aube-16x9',
        a: 'Arrivée à l’aéroport de Windhoek, prise en charge du véhicule tout équipé (4x4 Toyota Hilux, tentes de toit, frigo et matériel de camping), assurance incluse et kilométrage illimité. Puis départ pour la première nuit en lodge à Okahandja.',
        g: 'Accueil par votre chauffeur-guide dès l’aéroport, à bord du 4x4 tout équipé (tentes de toit, frigo et matériel de camping). Puis départ pour la première nuit en lodge à Okahandja.' },
      { j: 2, stop: 'okaukuejo', t: 'Route vers Etosha', nuit: 'Camping', img: 'zebres-point-eau', a: 'Destination le parc d’Etosha. Nuit en camping au camp d’Okaukuejo. Observation au point d’eau.' },
      { j: 3, stop: 'halali', t: 'Etosha, d’Okaukuejo à Halali', nuit: 'Camping', img: 'lions-famille', a: 'Visite du parc national, d’Okaukuejo à Halali. Nuit en camping.' },
      { j: 4, stop: 'namutoni', t: 'Etosha, d’Halali à Namutoni', nuit: 'Camping', img: 'girafe-etosha', a: 'Visite du parc d’Etosha, d’Halali à Namutoni. Nuit en camping.' },
      { j: 5, stop: 'rundu', t: 'Etosha – Rundu', nuit: 'Lodge', img: 'mokoro-okavango', a: 'Destination l’Okavango, d’Etosha à Rundu. Nuit en lodge.' },
      { j: 6, stop: 'divundu', t: 'Rives de l’Okavango', nuit: 'Camping au lodge', img: 'hippopotames-okavango-2', a: 'De Rundu à Divundu. Nuit en camping avec les infrastructures d’un lodge sur les rives du fleuve.' },
      { j: 7, stop: 'mahango', t: 'Parcs Mahangu et Buffalo', nuit: 'Camping au lodge', img: 'elephants-buffalo', a: 'Les parcs qui bordent le fleuve, jusqu’à la frontière du Botswana (Mahangu et Buffalo). Nuit en camping avec les infrastructures d’un lodge sur les rives du fleuve.' },
      { j: 8, stop: 'divundu', t: 'Journée détente à l’Okavango', nuit: 'Camping au lodge', img: 'buffles-okavango', a: 'Les parcs de l’Okavango et repos. Nuit en camping avec les infrastructures d’un lodge sur les rives du fleuve.' },
      { j: 9, stop: 'roys', t: 'Divundu – Roy’s Camp', nuit: 'Camping', img: 'g-bivouac-crepuscule-4x5', a: 'De Divundu à Roy’s Camp. Nuit à Roy’s Camp en camping, avec bar et restaurant à proximité.' },
      { j: 10, stop: 'waterberg', t: 'Roy’s Camp – Waterberg', nuit: 'Bungalow', img: 'g-plateau-waterberg-4x5', a: 'De Roy’s Camp au parc du Waterberg. Nuit en bungalow.' },
      { j: 11, stop: 'waterberg', t: 'Parc du Waterberg', nuit: 'Bungalow', a: 'Visite du parc du Waterberg. Nuit en bungalow.' },
      { j: 12, stop: 'spitzkoppe', t: 'Waterberg – Spitzkoppe', nuit: 'Camping', img: 'spitzkoppe', a: 'Du Waterberg au Spitzkoppe. Nuit en camping.' },
      { j: 13, stop: 'spitzkoppe', t: 'Le Spitzkoppe', nuit: 'Camping', a: 'Visite du Spitzkoppe. Nuit en camping.' },
      { j: 14, stop: 'brandberg', t: 'Spitzkoppe – Brandberg', nuit: 'Camping', img: 'rocher-damaraland', a: 'Du Spitzkoppe au Brandberg. Nuit en camping.' },
      { j: 15, stop: 'swakopmund', t: 'Brandberg – Swakopmund', nuit: 'Gîte', img: 'g-cote-brume-dunes-4x5', a: 'Du Brandberg à Swakopmund. Nuit en gîte tout équipé.' },
      { j: 16, stop: 'walvisbay', after: ['swakopmund'], t: 'Swakopmund & Walvis Bay', nuit: 'Gîte', img: 'otaries-fourrure', a: 'Swakopmund et Walvis Bay, avec sortie en bateau. Nuit en gîte tout équipé.' },
      { j: 17, stop: 'sesriem', t: 'Swakopmund – Sesriem', nuit: 'Camping', img: 'dunes-namib', a: 'De Swakopmund à Sesriem. Nuit en camping.' },
      { j: 18, stop: 'sossusvlei', after: ['sesriem'], t: 'Sesriem – Sossusvlei', nuit: 'Camping', img: 'sossusvlei', a: 'Sesriem – Sossusvlei. Nuit en camping.' },
      { j: 19, stop: 'solitaire', t: 'Sesriem – Solitaire', nuit: 'Lodge', img: 'oryx-desert', a: 'Sesriem – Solitaire. Nuit en lodge.' },
      { j: 20, stop: 'windhoek', t: 'Solitaire – Windhoek', nuit: 'Hôtel', a: 'De Solitaire à Windhoek. Nuit à l’hôtel.' },
      { j: 21, stop: 'windhoek', t: 'Windhoek, retour', nuit: 'Vol retour', a: 'Visite de Windhoek et retour à l’aéroport.', g: 'Visite de Windhoek et retour à l’aéroport, avec votre chauffeur-guide.' }
    ],
    incl: {
      autotour: ['Le 4x4 Toyota Hilux tout équipé, pris en charge à l’aéroport', 'L’assurance du véhicule et le kilométrage illimité', 'Les 20 nuits réservées : 12 en camping, 8 en lodge, bungalow ou gîte', 'La sortie en bateau à Walvis Bay', 'L’assistance par WhatsApp tout au long du voyage'],
      guide: ['Le chauffeur-guide dès votre arrivée à Windhoek', 'Le 4x4 Toyota Hilux tout équipé', 'Les 20 nuits réservées : 12 en camping, 8 en lodge, bungalow ou gîte', 'La sortie en bateau à Walvis Bay', 'L’assistance par WhatsApp tout au long du voyage']
    },
    nonIncl: ['Les vols entre l’Europe et Windhoek', 'La nourriture', 'Le carburant', 'Les entrées dans les parcs nationaux'],
    guideNote: true,
    focus: {
      eyebrow: 'Le véhicule', title: ['Toyota Hilux,', 'tout équipé'], img: 'vehicule-piste', imgAlt: '4x4 sur une piste de brousse, des éléphants traversent au loin',
      img2: 'installation-camp', img2Alt: 'Installation de la tente de toit au camping',
      kits: ['Tentes de toit', 'Frigo', 'Matériel de camping', 'Kilométrage illimité'],
      text: {
        autotour: 'Un 4x4 Toyota Hilux tout équipé, pris en charge dès l’aéroport de Windhoek : tentes de toit, frigo et matériel de camping. Assurance du véhicule incluse et kilométrage illimité.',
        guide: 'Votre chauffeur-guide vous accueille à l’aéroport de Windhoek au volant d’un 4x4 Toyota Hilux tout équipé : tentes de toit, frigo et matériel de camping.'
      }
    },
    gallery: [['lions-famille', 'Lionnes et lionceau, Etosha'], ['rocher-damaraland', 'Rocher du Damaraland'], ['cameleon', 'Caméléon'], ['girafe-etosha', 'Girafe, Etosha'], ['paysage-damaraland', 'Paysage du Damaraland'], ['elephants-buffalo', 'Éléphants, Buffalo'], ['sossusvlei', 'Sossusvlei']],
    regionsTitle: ['Cinq régions,', 'une seule piste'],
    regions: [
      ['Etosha', 'Parc national emblématique, réputé pour l’observation de la faune aux points d’eau.', '19°11′S 15°55′E', 'zebres-point-eau'],
      ['Okavango', 'Les rives du fleuve, à la frontière du Botswana, entre les parcs de Mahangu et Buffalo.', '18°06′S 21°32′E', 'hippopotames-okavango-2'],
      ['Waterberg & Spitzkoppe', 'Le plateau du Waterberg puis les formations rocheuses du Spitzkoppe et du Brandberg.', '21°50′S 15°11′E', 'spitzkoppe'],
      ['Côte atlantique', 'Swakopmund et Walvis Bay, avec une sortie en bateau sur l’océan.', '22°41′S 14°32′E', 'otaries-cape-cross'],
      ['Désert du Namib', 'Sesriem, Sossusvlei et Solitaire, au cœur des dunes.', '24°44′S 15°17′E', 'dunes-namib']
    ],
    assist: {
      img: 'koudou-coucher-soleil', imgAlt: 'Silhouette d’un koudou au coucher du soleil',
      text: {
        autotour: 'Une assistance disponible par WhatsApp tout au long du voyage : en cas de panne, de retard ou de question sur la route, une personne de notre équipe vous répond en français.',
        guide: 'Votre chauffeur-guide est à vos côtés du premier au dernier jour, et notre équipe reste joignable par WhatsApp tout au long du voyage.'
      }
    },
    related: ['ocean-caprivi', 'namibie-integrale']
  },

  'immersion-sauvage': {
    modes: { guide: 'immersion-sauvage' },
    h1: ['Immersion', 'Sauvage'],
    hero: { img: 'immersion-panorama', alt: 'Vue panoramique sur le Damaraland depuis un rocher', pos: '0.5 0.5' },
    eyebrow: 'Damaraland, Etosha & Swakopmund · 10 jours / 9 nuits',
    periodeNote: 'À confirmer : le site indique aussi « de mars à novembre »',
    overview: {
      title: ['Une Namibie', 'sauvage et authentique'],
      text: ['De l’océan Atlantique aux grands espaces du Damaraland, vivez une Namibie sauvage et authentique, entre observation de la faune, paysages grandioses et séjour privilégié au cœur d’un territoire privé de 11 000 ha.',
        'Un séjour clé en main de 9 nuits et 10 jours, en base de 4 personnes, avec un véhicule et un chauffeur dédiés pendant l’intégralité du séjour. Le programme ci-dessous est une formule type, que nous adaptons selon vos goûts et vos envies.'],
      imgs: [['koudou-coucher-soleil', 'Femelle koudou au coucher du soleil'], ['oryx-combat', 'Deux oryx qui s’affrontent']]
    },
    stats: { kind: 'chiffres', items: [['hectares de ferme privée', '11 000'], ['espèces d’antilopes', '10+'], ['espèces d’oiseaux', '250+']] },
    season: { guide: [5, 6, 7, 8] },
    driver: { guide: 'Véhicule et chauffeur dédiés pendant tout le séjour' },
    days: [
      { j: 1, stop: 'swakopmund', t: 'Arrivée à Windhoek et départ pour Swakopmund', nuit: 'Gîte', img: 'g-cote-brume-dunes-4x5',
        a: 'Votre séjour débute à l’aéroport international de Windhoek : notre chauffeur vous attend à la sortie, après les bagages et la douane, puis prend la route de Swakopmund. Première nuit dans un gîte privatif à proximité immédiate de l’océan.' },
      { j: 2, stop: 'swakopmund', t: 'Découverte de Swakopmund', nuit: 'Gîte', img: 'otaries-cape-cross',
        a: 'Petit-déjeuner inclus, puis découverte de la ville balnéaire et historique. En option, une activité : sortie en bateau, kayak, quad, tour de Sandwich Harbour… (budget indicatif : 120 € par personne pour une journée d’activité). Repas à votre charge : nombreux restaurants et food trucks en ville.' },
      { j: 3, stop: 'okatare', via: 'uis', t: 'Traversée du Namib, arrivée à Okatare', nuit: 'Lodge', img: 'ferme-okatare',
        a: 'Petit-déjeuner inclus, puis départ pour la ferme Okatare à travers le désert du Namib et le Damaraland, via Uis. Repas et nuit sur place.' },
      { j: 4, stop: 'okatare', t: 'Découverte de la ferme Okatare', nuit: 'Lodge', img: 'koudou-coucher-soleil',
        a: 'Découverte du territoire de la ferme en 4x4 avec chauffeur ou à pied : plus de 10 espèces d’antilopes, plus de 250 espèces d’oiseaux et une grande diversité de flore et de paysages. Guidage, repas et hébergement haut de gamme inclus.' },
      { j: 5, stop: 'twyfelfontein', after: ['okatare'], t: 'Excursion dans le Damaraland', nuit: 'Lodge', img: 'paysage-damaraland',
        a: 'Petit-déjeuner à la ferme, puis excursion d’une journée dans le Damaraland jusqu’à Twyfelfontein. Découverte du site et balade sur place avec votre chauffeur en 4x4. Retour, repas et nuit à Okatare.' },
      { j: 6, stop: 'halali', t: 'Parc national d’Etosha', nuit: 'Bungalow', img: 'zebre-etosha',
        a: 'Petit-déjeuner à la ferme, puis départ pour deux jours et deux nuits dans le parc national d’Etosha. Première nuit en bungalow au camp de Halali, petit-déjeuner inclus.' },
      { j: 7, stop: 'okaukuejo', t: 'Parc national d’Etosha', nuit: 'Bungalow', img: 'oryx-combat',
        a: 'Poursuite de la visite du parc. Nuit en bungalow au camp d’Okaukuejo, petit-déjeuner inclus.' },
      { j: 8, stop: 'okatare', t: 'Retour à la ferme Okatare', nuit: 'Lodge',
        a: 'Après le petit-déjeuner, retour vers la ferme en traversant le parc national. Balade possible à pied ou en 4x4 sur la ferme. Repas et nuit sur place.' },
      { j: 9, stop: 'vingerklip', after: ['okatare'], t: 'Excursion au Fingerklip', nuit: 'Lodge',
        a: 'Petit-déjeuner, puis excursion jusqu’au Fingerklip, dans le Damaraland : un site géologique particulier aux magnifiques paysages. Retour à la ferme, repas et nuit sur place.' },
      { j: 10, stop: 'windhoek', t: 'Retour à Windhoek', nuit: 'Vol retour',
        a: 'Petit-déjeuner, puis retour à Windhoek avec votre véhicule et votre chauffeur, et dépose à l’aéroport international pour votre vol retour.' }
    ],
    incl: ['L’intégralité du séjour depuis l’aéroport international de Windhoek', 'Un véhicule dédié avec chauffeur', 'L’hébergement selon le programme', 'Les repas à la ferme Okatare', 'Tous les petits-déjeuners prévus au programme'],
    nonIncl: ['Les vols entre l’Europe et Windhoek', 'Les entrées dans les parcs nationaux (environ 60 € à titre indicatif)', 'Les repas pris en dehors de la ferme', 'Les activités optionnelles à Swakopmund (environ 120 € par personne)', 'Les pourboires', 'Les boissons alcoolisées'],
    guideNote: true,
    focus: {
      eyebrow: 'La ferme Okatare', title: ['11 000 hectares', 'rien que pour vous'], img: 'ferme-okatare', imgAlt: 'Piscine et bungalows de la ferme Okatare',
      img2: 'koudou-coucher-soleil', img2Alt: 'Koudou au coucher du soleil',
      kits: ['Lodge privatif', 'Repas inclus', '10+ antilopes', '250+ oiseaux'],
      text: 'Un lodge privatif sur une ferme historique de 11 000 ha près de Khorixas, riche en faune, avec plus de 10 espèces d’antilopes et plus de 250 espèces d’oiseaux. Séjour tout compris, guidage en 4x4 ou à pied.'
    },
    gallery: [['oryx-combat', 'Deux oryx'], ['koudou-coucher-soleil', 'Koudou au coucher du soleil'], ['otaries-cape-cross', 'Otaries, Cape Cross'], ['ferme-okatare', 'Ferme Okatare']],
    regionsTitle: ['Quatre étapes,', 'un seul rythme'],
    regions: [
      ['Swakopmund', 'Ville balnéaire et historique sur la côte atlantique namibienne.', '22°41′S 14°32′E', 'otaries-cape-cross'],
      ['Damaraland', 'Paysages arides et sites géologiques : Twyfelfontein, Fingerklip.', '20°36′S 14°22′E', 'paysage-damaraland'],
      ['Ferme Okatare', 'Lodge privatif sur une ferme historique de 11 000 ha près de Khorixas, séjour tout compris.', 'Près de Khorixas', 'ferme-okatare'],
      ['Etosha', 'Parc national, deux nuits en bungalow : Halali puis Okaukuejo.', '19°11′S 15°55′E', 'zebre-etosha']
    ],
    assist: {
      img: 'koudou-coucher-soleil', imgAlt: 'Silhouette d’un koudou au coucher du soleil',
      text: 'Votre chauffeur vous accompagne du premier au dernier jour, et notre équipe reste disponible pour adapter le programme à vos envies.'
    },
    related: ['grande-aventure', 'ocean-caprivi']
  },

  'namibie-botswana': {
    modes: { confirme: 'namibie-botswana' },
    h1: ['Namibie & Botswana,', 'grande traversée'],
    hero: { img: 'passereaux', alt: 'Cordons-bleus et passereaux au bord d’un point d’eau', pos: '0.5 0.5' },
    eyebrow: 'Namib, Damaraland & Caprivi · 21 jours / 20 nuits',
    overview: {
      title: ['Deux pays,', 'une traversée en 4x4'],
      text: ['Un grand tour de 21 jours et 20 nuits à travers la Namibie et le nord du Botswana, en véhicule 4x4 équipé, avec un accompagnateur francophone du début à la fin du séjour.',
        'L’itinéraire relie le désert du Namib et ses dunes emblématiques à la côte atlantique, puis remonte vers le Damaraland (Spitzkoppe, Brandberg, rencontre avec le peuple Himba), le parc national d’Etosha, la bande de Caprivi et ses parcs, jusqu’au delta de l’Okavango, avec un passage au Botswana.'],
      imgs: [['oryx-desert', 'Oryx dans le désert'], ['charrette-anes', 'Charrette tirée par des ânes']]
    },
    stats: { kind: 'chiffres', items: [['kilomètres annoncés au programme', '≈ 3 600'], ['pays traversés', '2'], ['accompagnateur francophone', '1']] },
    season: null,
    driver: { confirme: 'Avec un accompagnateur francophone du début à la fin' },
    days: [
      { j: 1, stop: 'rehoboth', t: 'Arrivée à Windhoek, départ pour Rehoboth', nuit: 'Lodge', km: 100, img: 'g-route-acacias-aube-16x9',
        a: 'Arrivée à Windhoek, prise en charge par l’accompagnateur, achat de cartes SIM et change à l’aéroport. Route vers Rehoboth (~100 km), installation et dîner inclus, nuit en lodge.' },
      { j: 2, j2: 3, stop: 'sesriem', via: 'solitaire', t: 'Sesriem et le Namib-Naukluft', nuit: 'Camping', km: 250, img: 'dunes-namib',
        a: 'Départ vers Sesriem (~250 km) pour découvrir les paysages emblématiques du sud namibien, avec arrêt à Solitaire, dernière station-essence avant le désert. Deux jours de visite du parc de Sesriem. Nuits en camping, tentes de toit sur le 4x4.' },
      { j: 4, stop: 'swakopmund', t: 'Route vers Swakopmund', nuit: 'Guesthouse', km: 350, img: 'g-cote-brume-dunes-4x5',
        a: 'Départ pour la station balnéaire de Swakopmund en traversant le Naukluft (~350 km). Installation et visite de la ville. Nuit en guesthouse.' },
      { j: 5, stop: 'walvisbay', after: ['swakopmund'], t: 'Excursion à Walvis Bay', nuit: 'Guesthouse', km: 35, img: 'otaries-fourrure',
        a: 'Excursion au choix à Walvis Bay (~35 km) : observation des otaries en kayak, visite de Sandwich Harbour en 4x4, ou pêche en bateau. Nuit à Swakopmund.' },
      { j: 6, stop: 'spitzkoppe', t: 'Le Spitzkoppe', nuit: 'Camping', km: 150, img: 'spitzkoppe',
        a: 'Départ pour le Spitzkoppe (~150 km) et ses paysages spectaculaires, en totale autonomie, sans réseau ni wifi. Randonnée à pied ou en 4x4 et coucher de soleil sur le site. Nuit en camping.' },
      { j: 7, stop: 'brandberg', t: 'Le Brandberg et la White Lady', nuit: 'Camping', km: 130, img: 'rocher-damaraland',
        a: 'Départ pour le Brandberg et le White Lady Lodge, oasis isolée au cœur du désert (~130 km). Piscine et/ou randonnée jusqu’aux peintures rupestres de la White Lady. Nuit en camping.' },
      { j: 8, stop: 'palmwag', t: 'Brandberg – Palmwag', nuit: 'Camping', km: 240, img: 'paysage-damaraland',
        a: 'Randonnée à pied ou promenade en 4x4 sur le territoire du Brandberg, puis direction Palmwag (~240 km). Nuit en camping.' },
      { j: 9, stop: 'palmwag', t: 'Rencontre avec le peuple Himba', nuit: 'Camping', km: 120,
        a: 'Excursion en territoire Himba et rencontre avec ce peuple emblématique de la Namibie (~120 km). Nuit en camping à Palmwag.' },
      { j: 10, j2: 11, stop: 'okatare', t: 'Pause à la ferme Okatare', nuit: 'Lodge', km: 170, img: 'ferme-okatare',
        a: 'Route vers Okatare farm (~170 km) pour deux jours de repos, avec possibilité d’observer la faune de la ferme (gnous bleus, springboks, élans du Cap…), piscine et jeux de société. Nuit en lodge privé, repas inclus.' },
      { j: 12, stop: 'okaukuejo', t: 'Etosha, Okaukuejo', nuit: 'Camping', km: 320, img: 'zebres-point-eau',
        a: 'Départ pour le parc national d’Etosha (~320 km), safari possible jusqu’au coucher du soleil. Nuit en camping à Okaukuejo avec barbecue.' },
      { j: 13, stop: 'namutoni', t: 'Etosha, Namutoni', nuit: 'Camping', img: 'lions-famille',
        a: 'Matinée complète de safari en 4x4, puis route vers le camp de Namutoni, toujours à l’intérieur du parc. Nuit en camping avec barbecue.' },
      { j: 14, stop: 'rundu', t: 'Route vers la bande de Caprivi', nuit: 'Lodge', km: 430, img: 'mokoro-okavango',
        a: 'Route vers Rundu et la bande de Caprivi en fin de matinée (~430 km). Nuit en lodge à Tambuti.' },
      { j: 15, stop: 'mahango', t: 'Le parc du Mahangu', nuit: 'Camping', km: 230, img: 'hippopotames-okavango-2',
        a: 'Départ pour le parc du Mahangu (~230 km) à la découverte de nouvelles espèces : crocodiles, hippopotames, buffles d’eau… Nuit en camping.' },
      { j: 16, stop: 'divundu', t: 'Les parcs Bwabwata et Mahangu', nuit: 'Camping', km: 90, img: 'elephants-buffalo',
        a: 'Journée découverte des parcs du Bwabwata et du Mahangu, avec pause déjeuner et piscine entre les deux parcs (~90 km). Nuit en camping.' },
      { j: 17, j2: 18, stop: 'guma', t: 'Guma Lagoon, au Botswana', nuit: 'Camping', km: 140, img: 'peche-traditionnelle',
        a: 'Temps libre puis départ pour Guma Lagoon, avec passage de la frontière du Botswana (~140 km). Activités possibles : croisière au coucher du soleil, survol du delta en hélicoptère (non inclus). Nuit en camping.' },
      { j: 19, stop: 'dkar', t: 'Retour vers Dekar', nuit: 'Camping', km: 350, img: 'charrette-anes',
        a: 'Long trajet vers Dekar (~350 km) pour se rapprocher de la capitale namibienne, à travers les paysages désertiques. Nuit en camping.' },
      { j: 20, stop: 'gobabis', t: 'Étape à Gobabis', nuit: 'Lodge', km: 360,
        a: 'Direction Gobabis pour une nuit étape (~360 km) en lodge, repas du soir et petit-déjeuner inclus. Repos avant le vol retour.' },
      { j: 21, stop: 'windhoek', t: 'Retour à Windhoek', nuit: 'Vol retour', km: 160,
        a: 'Départ pour l’aéroport de Windhoek (~160 km) et vol retour vers la France.' }
    ],
    incl: ['La prise en charge à l’aéroport de Windhoek', 'Le véhicule 4x4 équipé et son assurance', 'Le carburant', 'L’intégralité des hébergements : camping, lodges et guest houses', 'Les entrées de parcs nationaux', 'L’accompagnateur francophone', 'Les petits-déjeuners et plusieurs repas en semi-autonomie ou au restaurant'],
    nonIncl: ['Les vols internationaux', 'Le visa touristique', 'Les cartes SIM', 'Les boissons alcoolisées', 'Les repas non mentionnés au programme', 'Les activités optionnelles', 'Les pourboires'],
    focus: {
      eyebrow: 'Le véhicule', title: ['4x4 équipé', 'pour 5'], img: 'installation-camp', imgAlt: 'Voyageurs installant la tente de toit de leur 4x4',
      img2: 'bivouac-4x4-nuit', img2Alt: 'Bivouac de nuit autour du feu',
      kits: ['Tentes de toit', 'Frigo et congélateur', 'Cuisine pour 5', 'Kilométrage illimité'],
      text: 'Un véhicule 4x4 équipé : tentes de toit, frigo et congélateur, matériel de camping et de cuisine pour 5 personnes, kilométrage illimité.'
    },
    gallery: [['oryx-desert', 'Oryx sur la route'], ['charrette-anes', 'Charrette tirée par des ânes'], ['peche-traditionnelle', 'Pêche traditionnelle'], ['passereaux', 'Passereaux au point d’eau']],
    regionsTitle: ['Du Namib', 'au delta de l’Okavango'],
    regions: [
      ['Désert du Namib', 'Sesriem, Sossusvlei et Solitaire, au cœur des dunes emblématiques du sud namibien.', '24°44′S 15°17′E', 'dunes-namib'],
      ['Swakopmund & Walvis Bay', 'Ville balnéaire et historique sur la côte atlantique, otaries et dunes de Sandwich Harbour.', '22°41′S 14°32′E', 'otaries-fourrure'],
      ['Damaraland', 'Spitzkoppe, Brandberg et ses peintures rupestres, rencontre avec le peuple Himba.', '21°50′S 15°11′E', 'spitzkoppe'],
      ['Etosha', 'Deux nuits en camping, Okaukuejo puis Namutoni, pour l’observation de la faune aux points d’eau.', '19°11′S 15°55′E', 'zebres-point-eau'],
      ['Caprivi & Okavango', 'Parcs du Mahangu et du Bwabwata, puis le Botswana jusqu’à Guma Lagoon, dans le delta.', '18°58′S 22°22′E', 'hippopotames-okavango-2']
    ],
    assist: { img: 'koudou-coucher-soleil', imgAlt: 'Silhouette d’un koudou au coucher du soleil', text: 'Un accompagnateur francophone vous accompagne du début à la fin du séjour, et notre équipe reste joignable pour toute question.' },
    related: ['namibie-integrale', 'grande-aventure']
  },

  'namibie-authentique': {
    modes: { confirme: 'namibie-authentique' },
    h1: ['Namibie', 'authentique'],
    hero: { img: 'kalahari', alt: 'Dunes rouges et acacias du Kalahari', pos: '0.5 0.6' },
    eyebrow: 'Kalahari, Namib & Etosha · 14 jours / 12 nuits sur place',
    overview: {
      title: ['Du Kalahari', 'à Etosha'],
      text: ['Un tour de 14 jours, dont 12 nuits sur place, pour découvrir la Namibie du Kalahari à Etosha, en véhicule 4x4 équipé, avec un accompagnateur francophone du début à la fin du séjour.',
        'L’itinéraire relie le désert du Kalahari au désert du Namib (Sesriem, Sossusvlei, Deadvlei, dune 45), la côte atlantique, le Spitzkoppe et le Brandberg, une pause à la ferme familiale d’Okatare, le parc national d’Etosha et le plateau du Waterberg, avec une halte possible à la Cheetah Conservation.'],
      imgs: [['impalas-face-noire', 'Impalas à face noire'], ['peuple-kalahari', 'Habitants du Kalahari']]
    },
    stats: { kind: 'chiffres', items: [['petits-déjeuners inclus', '9'], ['déjeuners inclus', '2'], ['dîners inclus', '5']] },
    season: null,
    driver: { confirme: 'Avec un accompagnateur francophone du début à la fin' },
    days: [
      { j: 1, stop: 'windhoek', t: 'Départ vers Windhoek', nuit: 'En vol',
        a: 'Départ depuis le domicile, vol vers Windhoek (non inclus).' },
      { j: 2, stop: 'windhoek', t: 'Arrivée à Windhoek', nuit: 'Urban Camp', img: 'g-route-acacias-aube-16x9',
        a: 'Arrivée à l’aéroport international de Windhoek, achat d’une carte SIM locale et change sur place. Courses pour les jours suivants, puis installation. Nuit à l’Urban Camp à Windhoek.' },
      { j: 3, stop: 'kalahari', t: 'Route vers le Kalahari', nuit: 'Lodge', km: 285, img: 'kalahari',
        a: 'Direction le Kalahari (~285 km) par des routes aux paysages spectaculaires, avec possibilité d’observer quelques animaux du désert. Nuit en lodge au choix : Lapa Lange Game Lodge ou Gondwana Kalahari Anib Lodge, petit-déjeuner inclus.' },
      { j: 4, j2: 5, stop: 'sesriem', after: ['sossusvlei', 'sesriem'], t: 'Le désert du Namib et Sesriem', nuit: 'Lodge', km: 280, img: 'sossusvlei',
        a: 'Route vers l’Elegant Desert Lodge (~280 km), au plus près de l’entrée du parc de Sesriem. Après-midi de repos, puis réveil avant le lever du soleil pour une journée complète dans le parc : Deadvlei, Big Daddy, la dune 45… Nuits à l’Elegant Desert Lodge.' },
      { j: 6, j2: 7, stop: 'swakopmund', after: ['walvisbay', 'swakopmund'], t: 'Swakopmund et Walvis Bay', nuit: 'Lodge', km: 400, img: 'otaries-fourrure',
        a: 'Départ pour Swakopmund en traversant le Naukluft (~365 km), avec arrêt pour observer les welwitschia et la faune du désert, puis découverte de la ville et de son marché artisanal. Le lendemain, excursion à Walvis Bay (~35 km) au choix : kayak ou bateau avec les otaries, Sandwich Harbour en 4x4, ou quad sur les dunes. Nuits au Desert Breeze Lodge.' },
      { j: 8, stop: 'brandberg', via: 'spitzkoppe', t: 'Le Spitzkoppe et le Brandberg', nuit: 'Camping', km: 280, img: 'spitzkoppe',
        a: 'Départ matinal pour le Spitzkoppe (~280 km), montagne de pierre culminant à 1784 mètres, puis route jusqu’au Brandberg, plus haut sommet de Namibie (2573 m). Nuit en camping au Madisa Camp, petite oasis au cœur du désert.' },
      { j: 9, j2: 10, stop: 'okatare', t: 'Pause à la ferme Okatare', nuit: 'Lodge', km: 100, img: 'ferme-okatare',
        a: 'Route vers Okatare Farm (~100 km) pour deux jours de repos : faune de la ferme (gnous bleus, springboks, élans du Cap…), balade à cheval, piscine et jeux de société. Nuit en lodge privé, repas inclus.' },
      { j: 11, j2: 12, stop: 'onguma', via: 'okaukuejo', t: 'Safari dans le parc d’Etosha', nuit: 'Camping', km: 190, img: 'impalas-face-noire',
        a: 'Départ matinal pour le parc national d’Etosha (~190 km) pour deux jours de safari en 4x4, à la recherche du Big Five, safari possible jusqu’au coucher du soleil. Nuits en camping à Etosha Village puis à Onguma Camp, avec possibilité de repas au barbecue.' },
      { j: 13, stop: 'waterberg', via: 'ccf', t: 'Cheetah Conservation et Waterberg', nuit: 'Camp', img: 'g-plateau-waterberg-4x5',
        a: 'Départ pour le plateau du Waterberg avec un arrêt possible à la Cheetah Conservation. Randonnée en fin d’après-midi pour gravir le sommet et profiter de la vue. Nuit au NWR Waterberg Wilderness Camp.' },
      { j: 14, stop: 'windhoek', t: 'Retour à l’aéroport de Windhoek', nuit: 'Vol retour', km: 310,
        a: 'Départ pour l’aéroport selon les horaires de vol (~310 km), avec possibilité de passer par Windhoek pour les derniers achats. Restitution du véhicule, plein fait et propre, puis dépose à l’aéroport.' }
    ],
    incl: ['La prise en charge à l’aéroport de Windhoek', 'Le véhicule 4x4 équipé et son assurance', 'Le carburant', 'L’intégralité des hébergements : camping, lodges et guest houses', 'Les entrées des parcs de Spitzkoppe, Waterberg, Sesriem et Etosha', 'L’accompagnateur francophone', '9 petits-déjeuners, 2 déjeuners et 5 dîners au restaurant ou en lodge'],
    nonIncl: ['Les vols internationaux', 'Le visa touristique', 'Les cartes SIM', 'Les boissons alcoolisées', 'Les repas non mentionnés au programme', 'Les activités optionnelles', 'Les pourboires'],
    focus: {
      eyebrow: 'Le véhicule', title: ['4x4 équipé', 'pour 5'], img: 'installation-camp', imgAlt: 'Voyageurs installant la tente de toit de leur 4x4',
      img2: 'bivouac-4x4-nuit', img2Alt: 'Bivouac de nuit autour du feu',
      kits: ['Tentes de toit', 'Frigo et congélateur', 'Cuisine pour 5', 'Kilométrage illimité'],
      text: 'Un véhicule 4x4 équipé : tentes de toit, frigo et congélateur, matériel de camping et de cuisine pour 5 personnes, kilométrage illimité.'
    },
    gallery: [['impalas-face-noire', 'Impalas à face noire'], ['spitzkoppe', 'Paysage du Spitzkoppe'], ['peuple-kalahari', 'Habitants du Kalahari'], ['kalahari', 'Kalahari']],
    regionsTitle: ['Cinq déserts', 'et une ferme'],
    regions: [
      ['Kalahari', 'Paysages arides et grands espaces, aux portes de la Namibie australe.', '≈ 24°S 18°E', 'kalahari'],
      ['Désert du Namib', 'Sesriem, Sossusvlei, Deadvlei, Big Daddy et la dune 45.', '24°44′S 15°17′E', 'sossusvlei'],
      ['Swakopmund & Walvis Bay', 'Ville balnéaire sur la côte atlantique, otaries et dunes de Sandwich Harbour.', '22°41′S 14°32′E', 'otaries-cape-cross'],
      ['Spitzkoppe & Brandberg', 'Massifs rocheux emblématiques du centre namibien.', '21°50′S 15°11′E', 'rocher-damaraland'],
      ['Etosha & Waterberg', 'La faune d’Etosha, puis le plateau du Waterberg et la Cheetah Conservation.', '19°11′S 15°55′E', 'girafe-etosha']
    ],
    assist: { img: 'koudou-coucher-soleil', imgAlt: 'Silhouette d’un koudou au coucher du soleil', text: 'Un accompagnateur francophone vous accompagne du début à la fin du séjour, et notre équipe reste joignable pour toute question.' },
    related: ['namibie-integrale', 'namibie-botswana']
  },

  'namibie-integrale': {
    modes: { confirme: 'namibie-integrale' },
    h1: ['Namibie', 'intégrale'],
    hero: { img: 'zebre-etosha', alt: 'Zèbre dans la plaine d’Etosha', pos: '0.5 0.45' },
    eyebrow: 'Namib, Etosha & Waterberg · 17 jours / 16 nuits',
    overview: {
      title: ['L’essentiel', 'de la Namibie'],
      text: ['Un tour de 17 jours et 16 nuits pour découvrir l’essentiel de la Namibie, en véhicule 4x4 équipé, avec un accompagnateur francophone du début à la fin du séjour.',
        'L’itinéraire relie les dunes de Sossusvlei à la côte atlantique, puis le Spitzkoppe et le Brandberg, une pause à la ferme familiale d’Okatare, le parc national d’Etosha, la région du Kavango et son parc du Mahango, avant de remonter vers la Cheetah Conservation Fund, Otjiwarongo et le plateau du Waterberg.'],
      imgs: [['dunes-namib', 'Dunes du Namib'], ['bivouac-4x4-nuit', 'Campement nocturne']]
    },
    stats: { kind: 'chiffres', items: [['kilomètres annoncés au programme', '≈ 3 300'], ['petits-déjeuners inclus', '9'], ['dîners inclus', '4']] },
    season: null,
    driver: { confirme: 'Avec un accompagnateur francophone du début à la fin' },
    days: [
      { j: 1, stop: 'sesriem', t: 'Arrivée à Windhoek, départ pour Sesriem', nuit: 'Lodge', km: 320, img: 'g-route-acacias-aube-16x9',
        a: 'Arrivée à Windhoek, prise en charge par l’accompagnateur, achat de cartes SIM et change à l’aéroport. Route vers Sesriem (~320 km) pour se rapprocher au maximum de Sossusvlei. Installation et nuit en lodge.' },
      { j: 2, stop: 'sossusvlei', after: ['sesriem'], t: 'Visite du parc de Sesriem', nuit: 'Lodge', km: 150, img: 'sossusvlei',
        a: 'Direction Sesriem (~150 km) pour les paysages les plus connus du sud namibien : dune 45, Big Daddy, Sesriem Canyon et Sossusvlei. Retour en fin de journée au lodge.' },
      { j: 3, stop: 'swakopmund', t: 'Route vers Swakopmund', nuit: 'Guesthouse', km: 365, img: 'g-cote-brume-dunes-4x5',
        a: 'Départ pour Swakopmund en traversant le Naukluft (~365 km), avec arrêts possibles pour observer la faune du désert et les welwitschia. Repos ou visite de la ville à l’arrivée. Nuit en guesthouse.' },
      { j: 4, stop: 'walvisbay', after: ['swakopmund'], t: 'Excursion à Walvis Bay', nuit: 'Guesthouse', km: 35, img: 'otaries-fourrure',
        a: 'Excursion matinale à Walvis Bay (~35 km) au choix : otaries en kayak ou en bateau, et/ou Sandwich Harbour en 4x4. Retour en début d’après-midi, temps libre ensuite. Nuit à Swakopmund.' },
      { j: 5, stop: 'brandberg', via: 'spitzkoppe', t: 'Le Spitzkoppe et le Brandberg', nuit: 'Lodge', km: 280, img: 'spitzkoppe',
        a: 'Départ pour le Spitzkoppe (~150 km), montagne de pierre culminant à 1784 mètres, avec déjeuner sur place, puis route jusqu’au Brandberg, plus haut sommet de Namibie (2573 m, ~130 km). Installation dans un lodge avec piscine.' },
      { j: 6, stop: 'okatare', t: 'White Lady et ferme d’Okatare', nuit: 'Bungalow', km: 150, img: 'rocher-damaraland',
        a: 'Sentier de la White Lady au Brandberg pour observer des peintures rupestres, avant la chaleur. Puis route vers la ferme familiale d’Okatare (~150 km) pour deux nuits en bungalows privatifs haut de gamme, en all inclusive.' },
      { j: 7, stop: 'okatare', t: 'Journée libre à la ferme Okatare', nuit: 'Bungalow', img: 'ferme-okatare',
        a: 'Journée libre dans ce cadre idyllique : sorties possibles sur la ferme pour observer la faune (gnous bleus, springboks, élans du Cap…), piscine et jeux de société, en all inclusive.' },
      { j: 8, j2: 9, stop: 'onguma', via: 'okaukuejo', t: 'Safari dans le parc d’Etosha', nuit: 'Camping', km: 200, img: 'zebres-point-eau',
        a: 'Départ matinal pour le parc national d’Etosha (~200 km) pour deux jours de safari en 4x4, à la recherche du Big Five, safari possible jusqu’au coucher du soleil. Nuits en camping à Okaukuejo puis à Onguma Camp, avec possibilité de repas au barbecue.' },
      { j: 10, stop: 'rundu', t: 'Route vers Rundu', nuit: 'Hôtel', km: 400, img: 'mokoro-okavango',
        a: 'Départ en fin de matinée pour le nord (~400 km), à la découverte d’un climat et de paysages très différents. Nuit en hôtel à Rundu.' },
      { j: 11, stop: 'mahango', t: 'Le parc du Mahango et le Buffalo', nuit: 'Lodge', km: 230, img: 'hippopotames-okavango-2',
        a: 'Départ pour le parc du Mahango (~230 km), le long de l’Okavango jusqu’au parc national du Buffalo : crocodiles, hippopotames, buffles d’eau… Nuit en lodge, dîner inclus.' },
      { j: 12, stop: 'mahango', t: 'Journée safari au Mahango', nuit: 'Camping', km: 6, img: 'elephants-buffalo',
        a: 'Départ très tôt pour le parc du Mahango (~6 km) dès son ouverture, safari aux aurores. Retour au lodge pour la vue et la piscine, avec possibilité de retourner dans l’un des deux parcs l’après-midi. Nuit en camping au bord de l’eau.' },
      { j: 13, stop: 'rundu', t: 'Living museum et route vers Tambuti', nuit: 'Lodge', km: 265,
        a: 'Visite d’un living museum consacré au peuple San (les Khwe), l’une des plus anciennes cultures de chasseurs-cueilleurs d’Afrique australe. Puis route jusqu’au Tambuti Lodge (~265 km).' },
      { j: 14, stop: 'grootfontein', t: 'Marché de Rundu, route vers Grootfontein', nuit: 'Guesthouse', km: 260,
        a: 'Visite du marché artisanal de Rundu, puis route vers Grootfontein (~260 km). Nuit en guesthouse.' },
      { j: 15, stop: 'otjiwarongo', via: 'ccf', t: 'Cheetah Conservation Fund', nuit: 'Hôtel', km: 230, img: 'guepard-etosha',
        a: 'Visite de la Cheetah Conservation Fund, organisation dédiée à la sauvegarde du guépard depuis 1990 (~230 km), puis direction Otjiwarongo. Nuit à l’hôtel.' },
      { j: 16, stop: 'waterberg', t: 'Centre culturel et parc du Waterberg', nuit: 'Lodge', km: 80, img: 'g-plateau-waterberg-4x5',
        a: 'Découverte du centre culturel et de la bibliothèque de l’association Peri Naua dans le township d’Otjiwarongo, puis route vers le parc national du Waterberg (~80 km) et randonnée en fin d’après-midi jusqu’au plateau. Nuit en lodge au pied du plateau.' },
      { j: 17, stop: 'windhoek', via: 'okahandja', t: 'Retour à Windhoek', nuit: 'Vol retour', km: 330,
        a: 'Départ pour l’aéroport de Windhoek (~330 km), avec arrêt possible au marché artisanal d’Okahandja pour les derniers souvenirs. Vol retour vers la France.' }
    ],
    incl: ['La prise en charge à l’aéroport de Windhoek', 'Le véhicule 4x4 équipé et son assurance', 'Le carburant', 'L’intégralité des hébergements : camping, lodges et guest houses', 'Les entrées de parcs nationaux et de la Cheetah Conservation', 'L’accompagnateur francophone', '9 petits-déjeuners, 2 déjeuners et 4 dîners au restaurant ou en lodge'],
    nonIncl: ['Les vols internationaux', 'Le visa touristique', 'Les cartes SIM', 'Les boissons alcoolisées', 'Les repas non mentionnés au programme', 'Les activités optionnelles', 'Les pourboires'],
    focus: {
      eyebrow: 'Le véhicule', title: ['4x4 équipé', 'pour 5'], img: 'installation-camp', imgAlt: 'Voyageurs installant la tente de toit de leur 4x4',
      img2: 'bivouac-4x4-nuit', img2Alt: 'Bivouac de nuit autour du feu',
      kits: ['Tentes de toit', 'Frigo et congélateur', 'Cuisine pour 5', 'Kilométrage illimité'],
      text: 'Un véhicule 4x4 équipé : tentes de toit, frigo et congélateur, matériel de camping et de cuisine pour 5 personnes, kilométrage illimité.'
    },
    gallery: [['zebre-etosha', 'Zèbre, Etosha'], ['bivouac-4x4-nuit', 'Campement nocturne'], ['dunes-namib', 'Dunes du Namib']],
    regionsTitle: ['Cinq régions,', 'l’essentiel du pays'],
    regions: [
      ['Désert du Namib', 'Sesriem, Sossusvlei, la dune 45 et le Sesriem Canyon.', '24°44′S 15°17′E', 'dunes-namib'],
      ['Swakopmund & Walvis Bay', 'Ville balnéaire sur la côte atlantique, otaries et dunes de Sandwich Harbour.', '22°41′S 14°32′E', 'otaries-cape-cross'],
      ['Spitzkoppe & Brandberg', 'Massifs rocheux emblématiques et peintures rupestres de la White Lady.', '21°50′S 15°11′E', 'spitzkoppe'],
      ['Etosha', 'Deux nuits en camping, Okaukuejo puis Onguma, pour l’observation de la faune.', '19°11′S 15°55′E', 'zebres-point-eau'],
      ['Kavango & Waterberg', 'Parc du Mahango le long de l’Okavango, Cheetah Conservation Fund et plateau du Waterberg.', '20°31′S 17°14′E', 'hippopotames-okavango-2']
    ],
    assist: { img: 'koudou-coucher-soleil', imgAlt: 'Silhouette d’un koudou au coucher du soleil', text: 'Un accompagnateur francophone vous accompagne du début à la fin du séjour, et notre équipe reste joignable pour toute question.' },
    related: ['namibie-botswana', 'namibie-authentique']
  }
};
