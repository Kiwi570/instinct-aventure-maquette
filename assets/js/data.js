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
      img: 'elephants-panorama', page: 'https://www.instinct-aventure.fr/nos-offres/autotours/grande-aventure',
      regions: ['etosha', 'okavango', 'waterberg', 'damaraland', 'cote', 'namib'],
      route: ['windhoek', 'okahandja', 'okaukuejo', 'halali', 'namutoni', 'rundu', 'divundu', 'mahango', 'roys', 'waterberg', 'spitzkoppe', 'brandberg', 'swakopmund', 'walvisbay', 'swakopmund', 'sesriem', 'sossusvlei', 'solitaire', 'windhoek']
    },
    {
      id: 'grande-aventure-guide', name: 'Grande aventure guidée', sub: 'Etosha, Okavango & Namib',
      formule: 'guide', jours: 21, nuits: 20, nuitsLabel: '21 jours / 20 nuits',
      prix: 4215, base: 4, statut: 'libre', periode: null,
      img: 'elephants-buffalo', page: 'https://www.instinct-aventure.fr/nos-offres/sejours-guides/grande-aventure-guide',
      regions: ['etosha', 'okavango', 'waterberg', 'damaraland', 'cote', 'namib'],
      route: ['windhoek', 'okahandja', 'okaukuejo', 'halali', 'namutoni', 'rundu', 'divundu', 'mahango', 'roys', 'waterberg', 'spitzkoppe', 'brandberg', 'swakopmund', 'walvisbay', 'swakopmund', 'sesriem', 'sossusvlei', 'solitaire', 'windhoek']
    },
    {
      id: 'immersion-sauvage', name: 'Immersion Sauvage', sub: 'Damaraland, Etosha & Swakopmund',
      formule: 'guide', jours: 10, nuits: 9, nuitsLabel: '10 jours / 9 nuits',
      prix: 2840, base: 4, statut: 'libre', periode: 'Juin à fin septembre 2027',
      img: 'immersion-panorama', page: 'https://www.instinct-aventure.fr/nos-offres/sejours-guides/immersion-sauvage',
      note: 'Véhicule et chauffeur dédiés, séjour sur une ferme privée de 11 000 ha.',
      regions: ['cote', 'damaraland', 'etosha'],
      route: ['windhoek', 'swakopmund', 'uis', 'okatare', 'twyfelfontein', 'okatare', 'halali', 'okaukuejo', 'okatare', 'vingerklip', 'okatare', 'windhoek']
    },
    {
      id: 'namibie-botswana', name: 'Namibie & Botswana, grande traversée en 4x4', short: 'Grande traversée en 4x4', sub: 'Namib, Damaraland & Caprivi',
      formule: 'confirme', jours: 21, nuits: 20, nuitsLabel: '21 jours / 20 nuits',
      prix: 4250, base: 4, statut: 'complet', depart: '2027-04-13', departLabel: '13 avril 2027',
      img: 'passereaux', page: 'https://www.instinct-aventure.fr/nos-offres/sejours-guides/confirmes/namibie-botswana-grande-traversee',
      note: 'Accompagnateur francophone du début à la fin.',
      regions: ['namib', 'cote', 'damaraland', 'etosha', 'okavango', 'botswana'],
      route: ['windhoek', 'rehoboth', 'sesriem', 'sossusvlei', 'solitaire', 'swakopmund', 'walvisbay', 'swakopmund', 'spitzkoppe', 'brandberg', 'palmwag', 'okatare', 'okaukuejo', 'namutoni', 'rundu', 'mahango', 'divundu', 'guma', 'dkar', 'gobabis', 'windhoek']
    },
    {
      id: 'namibie-authentique', name: 'Namibie authentique', short: 'Namibie authentique', sub: 'Kalahari, Namib & Etosha',
      formule: 'confirme', jours: 14, nuits: 12, nuitsLabel: '14 jours / 12 nuits sur place',
      prix: 3925, base: 2, statut: 'complet', depart: '2027-02-25', departLabel: '25 février 2027',
      img: 'kalahari', page: 'https://www.instinct-aventure.fr/nos-offres/sejours-guides/confirmes/namibie-authentique-kalahari-namib-etosha',
      note: 'Accompagnateur francophone du début à la fin.',
      regions: ['kalahari', 'namib', 'cote', 'damaraland', 'etosha', 'waterberg'],
      route: ['windhoek', 'kalahari', 'sesriem', 'sossusvlei', 'sesriem', 'swakopmund', 'walvisbay', 'swakopmund', 'spitzkoppe', 'brandberg', 'okatare', 'okaukuejo', 'onguma', 'ccf', 'waterberg', 'windhoek']
    },
    {
      id: 'namibie-integrale', name: 'Namibie intégrale', short: 'Namibie intégrale', sub: 'Namib, Etosha & Waterberg',
      formule: 'confirme', jours: 17, nuits: 16, nuitsLabel: '17 jours / 16 nuits',
      prix: 3600, base: 3, statut: 'complet', depart: '2027-05', departLabel: 'Mai 2027 (dates à définir)',
      img: 'zebre-etosha', page: 'https://www.instinct-aventure.fr/nos-offres/sejours-guides/confirmes/namibie-integrale-namib-etosha-waterberg',
      note: 'Accompagnateur francophone du début à la fin.',
      regions: ['namib', 'cote', 'damaraland', 'etosha', 'okavango', 'waterberg'],
      route: ['windhoek', 'sesriem', 'sossusvlei', 'swakopmund', 'walvisbay', 'swakopmund', 'spitzkoppe', 'brandberg', 'okatare', 'okaukuejo', 'onguma', 'rundu', 'mahango', 'rundu', 'grootfontein', 'ccf', 'otjiwarongo', 'waterberg', 'okahandja', 'windhoek']
    }
  ],

  /* Programme jour par jour de la fiche « De l'océan au Caprivi ».
     a = texte de l'autotour, g = texte du séjour guidé (si différent). */
  oceanCaprivi: [
    { j: 1, stop: 'okahandja', t: 'Arrivée à Windhoek', nuit: 'Nuit en dur', img: 'g-route-acacias-aube-16x9',
      a: 'Prise en charge du 4x4 équipé à l’aéroport international. Première nuit en dur à Okahandja, à une heure de Windhoek.',
      g: 'Accueil par votre chauffeur-guide dès l’aéroport international, à bord du 4x4 équipé. Première nuit en dur à Okahandja, à une heure de Windhoek.' },
    { j: 2, stop: 'swakopmund', t: 'Vers Swakopmund', nuit: 'Appartement', img: 'g-cote-brume-dunes-4x5',
      a: 'Route goudronnée à travers le désert du Namib (4 h). Installation dans un appartement tout équipé près de l’océan et du centre-ville. Courses, balade sur la côte, restaurants et food trucks.' },
    { j: 3, stop: 'walvisbay', t: 'Sortie en mer à Walvis Bay', nuit: 'Appartement', img: 'otaries-fourrure',
      a: 'Minibus jusqu’à Walvis Bay et sortie en bateau à la rencontre des otaries à fourrure, dauphins et pélicans, avec repas léger à bord. Après-midi libre : dunes ou ville. Nuit à l’appartement.' },
    { j: 4, stop: 'brandberg', via: 'uis', t: 'Le Brandberg', nuit: 'Camping', img: 'rocher-damaraland',
      a: 'Départ matinal vers le Damaraland via Uis, jusqu’au pied du Brandberg, point culminant de la Namibie. Paysages et faune locale, dont les éléphants du désert. Nuit en camping équipé avec restaurant et bar.' },
    { j: 5, stop: 'okaukuejo', t: 'Entrée dans Etosha', nuit: 'Camping', img: 'girafe-etosha',
      a: 'Route vers le parc d’Etosha, arrivée à Okaukuejo avant la nuit. Observation de la faune au point d’eau, un incontournable en saison sèche. Nuit en camping dans le parc.' },
    { j: 6, stop: 'namutoni', t: 'Traversée d’Etosha', nuit: 'Camping', img: 'guepard-etosha',
      a: 'D’Okaukuejo à Namutoni par les pistes : félins, éléphants, zèbres, gnous, springboks, oryx, impalas, koudous, girafes… Nuit en camping à Namutoni.',
      g: 'D’Okaukuejo à Namutoni par les pistes, accompagné par votre chauffeur-guide : félins, éléphants, zèbres, gnous, springboks, oryx, impalas, koudous, girafes… Nuit en camping à Namutoni.' },
    { j: 7, stop: 'rundu', via: 'grootfontein', t: 'Rundu et l’Okavango', nuit: 'Lodge', img: 'hippopotames-okavango-2',
      a: 'Route vers Rundu via Grootfontein. Nuit en lodge sur les rives du fleuve.' },
    { j: 8, stop: 'divundu', t: 'Divundu, porte du Caprivi', nuit: 'Camping au lodge', img: 'buffles-okavango',
      a: 'Visite possible de la réserve de Mahango en route : début du delta, faune exceptionnelle, loin de la foule d’Etosha. Nuit en camping dans un lodge au bord du fleuve (bungalow en option), avec activités sur place : bateau, pêche.' },
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
    { j: 13, stop: 'waterberg', t: 'Le plateau du Waterberg', nuit: 'Camping', img: 'g-plateau-waterberg-4x5',
      a: 'Randonnée matinale jusqu’au plateau ou repos à la piscine. L’après-midi, visite du parc avec les rangers (en option) ou détente au camp Bernabé de la Bat.' },
    { j: 14, stop: 'windhoek', t: 'Retour à Windhoek', nuit: 'Vol retour', img: 'g-route-acacias-aube-16x9',
      a: 'Route vers la capitale, restitution du véhicule vers 15 h au plus tard et transfert à l’aéroport pour votre vol du soir.',
      g: 'Route vers la capitale avec votre chauffeur-guide, puis transfert à l’aéroport pour votre vol du soir.' }
  ],

  /* Programme simplifié de la Grande aventure (accueil : la piste qui traverse le pays) */
  grandeAventure: [
    { j: 1, stop: 'okahandja', t: 'Windhoek – Okahandja' },
    { j: 2, stop: 'okaukuejo', t: 'Route vers Etosha' },
    { j: 3, stop: 'halali', t: 'Etosha, d’Okaukuejo à Halali' },
    { j: 4, stop: 'namutoni', t: 'Etosha, d’Halali à Namutoni' },
    { j: 5, stop: 'rundu', t: 'Etosha – Rundu' },
    { j: 6, stop: 'divundu', t: 'Rives de l’Okavango' },
    { j: 7, stop: 'mahango', t: 'Parcs Mahangu et Buffalo' },
    { j: 8, stop: 'mahango', t: 'Journée détente à l’Okavango' },
    { j: 9, stop: 'roys', t: 'Divundu – Roy’s Camp' },
    { j: 10, stop: 'waterberg', t: 'Roy’s Camp – Waterberg' },
    { j: 11, stop: 'waterberg', t: 'Parc du Waterberg' },
    { j: 12, stop: 'spitzkoppe', t: 'Waterberg – Spitzkoppe' },
    { j: 13, stop: 'spitzkoppe', t: 'Le Spitzkoppe' },
    { j: 14, stop: 'brandberg', t: 'Spitzkoppe – Brandberg' },
    { j: 15, stop: 'swakopmund', t: 'Brandberg – Swakopmund' },
    { j: 16, stop: 'walvisbay', t: 'Swakopmund & Walvis Bay' },
    { j: 17, stop: 'sesriem', t: 'Swakopmund – Sesriem' },
    { j: 18, stop: 'sossusvlei', t: 'Sesriem – Sossusvlei' },
    { j: 19, stop: 'solitaire', t: 'Sesriem – Solitaire' },
    { j: 20, stop: 'windhoek', t: 'Solitaire – Windhoek' },
    { j: 21, stop: 'windhoek', t: 'Windhoek, retour' }
  ]
};
