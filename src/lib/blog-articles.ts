export interface BlogImage {
  src: string;
  alt: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  categoryBg: string;
  categoryColor: string;
  date: string;
  excerpt: string;
  coverLogo?: string;
  coverIsPhoto?: boolean;
  cardBg: string;
  gallery?: BlogImage[];
  youtubeUrl?: string;
  externalLink?: { label: string; href: string };
  content: BlogSection[];
  isThematic?: boolean; // thematic articles vs press/awards
  isUpcoming?: boolean; // upcoming event (shown separately at the top)
  isNew?: boolean;           // recent article — shown first with a "Nouveau" badge
  coverLogoNatural?: boolean; // show logo without brightness/invert filter (light bg)
  readingTime?: string; // e.g. "7 min"
  heroCta?: { label: string; href: string; subtitle: string }; // CTA block at top of article body
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "santexpo-2026-stand-w692",
    isUpcoming: true,
    isNew: true,
    title: "Speakli à Santexpo 2026 — Espace Innovation FHF",
    category: "Événements & Prises de parole",
    categoryBg: "#EFF6FF",
    categoryColor: "#1D4ED8",
    date: "19–21 mai 2026",
    excerpt:
      "Du 19 au 21 mai 2026, retrouvez Speakli dans l'Espace Innovation FHF, catégorie Santé des soignants, au Parc des Expositions Porte de Versailles. Venez découvrir en direct notre assistant vocal IA pour soignants et repartir avec une démonstration personnalisée.",
    coverLogo: "/photos/blog/santexpo-w692.jpg",
    coverIsPhoto: true,
    cardBg: "#0c1d50",
    gallery: [
      {
        src: "/photos/blog/santexpo-w692.jpg",
        alt: "Speakli dans l'Espace Innovation FHF — Santexpo 2026",
      },
    ],
    heroCta: {
      label: "Demander une démo sur le stand",
      href: "https://calendly.com/ruben-speakli/30min",
      subtitle: "Réservez votre créneau pour une démonstration en direct à Santexpo 2026",
    },
    content: [
      {
        heading: "Santexpo, le rendez-vous incontournable de la santé numérique",
        paragraphs: [
          "Santexpo est le salon de référence pour les professionnels de santé, les établissements et les acteurs de la santé numérique en France. Chaque année, il réunit plusieurs milliers de visiteurs autour des innovations qui transforment les pratiques de soin, de la gestion hospitalière à la prise en charge en établissement médico-social.",
          "Cette édition 2026 se tiendra du 19 au 21 mai au Parc des Expositions de la Porte de Versailles, Paris.",
        ],
      },
      {
        heading: "Speakli dans l'Espace Innovation FHF",
        paragraphs: [
          "Speakli sera présent dans l'Espace Innovation de la Fédération Hospitalière de France (FHF), dans la catégorie Santé des soignants. Cet espace est dédié aux startups et entreprises innovantes sélectionnées par la FHF pour leur impact concret sur les établissements de santé et médico-sociaux.",
          "C'est une reconnaissance de l'ancrage terrain de Speakli : aujourd'hui déployé dans plus de 40 EHPAD, notre assistant vocal IA permet aux soignants de documenter leurs actes à la voix, en temps réel, directement depuis leur téléphone — sans clavier, sans perte de temps, sans ressaisie.",
        ],
      },
      {
        heading: "Ce que vous pourrez découvrir sur place",
        paragraphs: [
          "Sur place, notre équipe vous présentera l'assistant vocal Speakli en situation réelle : de la dictée vocale d'une observation au sein d'un dossier résident, jusqu'à la synchronisation automatique avec les principaux logiciels métier. Vous pourrez manipuler la solution, poser vos questions terrain, et échanger directement avec les fondateurs.",
          "Vous êtes directeur(trice) d'EHPAD, IDEC, médecin coordonnateur, DSI ou responsable d'achat ? Venez nous rendre visite. Si vous préférez planifier une rencontre à l'avance, vous pouvez réserver un créneau ci-dessous.",
        ],
      },
      {
        heading: "Pourquoi choisir Speakli ?",
        paragraphs: [
          "98 % de satisfaction terrain. Plus de 350 soignants utilisent Speakli au quotidien et déclarent gagner en moyenne 40 % de temps sur leurs transmissions. Ce temps retrouvé, c'est du temps rendu aux résidents, à l'équipe, à la qualité du soin.",
          "Hébergement certifié HDS, conformité RGPD, interopérabilité native avec les logiciels métier : Speakli est conçu pour s'intégrer dans vos établissements sans friction, avec un accompagnement complet de la formation au suivi d'usage.",
        ],
      },
    ],
  },
  {
    slug: "silvereco-2025",
    title: "Deux Trophées au Festival International SilverEco 2025",
    category: "Prix & Récompenses",
    categoryBg: "#EEF2FF",
    categoryColor: "#3B4FCF",
    date: "Septembre 2025",
    excerpt:
      "Prix de la meilleure innovation QVT / RSE et coup de cœur du public : Speakli remporte deux distinctions au festival de référence mondial de l'économie du grand âge.",
    coverLogo: "/logos/silvereco-festival.png",
    coverIsPhoto: true,
    cardBg: "#0d1f3c",
    gallery: [
      {
        src: "/photos/blog/silvereco-ceremonie.jpg",
        alt: "Remise des prix SilverEco 2025",
      },
      {
        src: "/logos/events/silvereco-innov.jpg",
        alt: "Trophée SilverEco, Meilleure Innovation QVT / RSE",
      },
      {
        src: "/logos/events/silvereco-public.jpg",
        alt: "Trophée SilverEco, Prix du Public",
      },
    ],
    content: [
      {
        heading: "Le Festival International SilverEco",
        paragraphs: [
          "Organisé chaque année à Nice, le Festival International SilverEco est le rendez-vous mondial dédié à l'économie du grand âge. Il réunit entrepreneurs, institutionnels, soignants et investisseurs autour des meilleures innovations pour améliorer la qualité de vie des personnes âgées et de ceux qui les accompagnent.",
          "Le palmarès annuel des Trophées SilverEco distingue les solutions les plus impactantes dans des catégories couvrant l'habitat, la mobilité, la santé, la formation, la qualité de vie au travail (QVT) et la responsabilité sociale des entreprises (RSE).",
        ],
      },
      {
        heading: "Speakli doublement récompensé",
        paragraphs: [
          "En septembre 2025, Speakli a remporté deux distinctions lors de cette édition : le Trophée de la meilleure innovation dans les catégories QVT, Formation et RSE, et le Prix du Public, décerné par les participants du festival à la solution qu'ils ont jugée la plus prometteuse.",
          "Ces deux reconnaissances valident à la fois l'impact opérationnel de Speakli pour les équipes soignantes et son ancrage dans les valeurs d'une innovation en santé responsable et humaine.",
        ],
      },
      {
        heading: "Ce que ça signifie pour nous",
        paragraphs: [
          "Remporter le prix du public, c'est la validation la plus directe qui soit : des professionnels de santé, des directeurs d'établissements, des experts du secteur ont choisi Speakli parmi toutes les innovations présentées. C'est un signal fort que notre approche résonne avec les besoins réels du terrain.",
          "Le Trophée QVT/RSE illustre notre conviction profonde que la technologie doit d'abord servir les soignants, en réduisant leur charge administrative, en améliorant leurs conditions de travail, et en leur redonnant du temps pour le soin.",
        ],
      },
    ],
  },
  {
    slug: "ieseg-entrepreneur-2026",
    title: "Lauréat du Prix Entrepreneur de l'Année 2026, IESEG",
    category: "Prix & Récompenses",
    categoryBg: "#EEF2FF",
    categoryColor: "#3B4FCF",
    date: "12 février 2026",
    excerpt:
      "Prix du jury et coup de cœur du public au Prix Entrepreneur 2026 de l'IESEG School of Management, une double reconnaissance de l'excellence entrepreneuriale d'un alumni IESEG.",
    coverLogo: "/logos/events/ieseg-laureats.jpeg",
    coverIsPhoto: true,
    cardBg: "#2d3748",
    externalLink: {
      label: "Lire l'article publié par l'IESEG",
      href: "https://www.ieseg.fr/en/news/2026-speakli-entrepreneur-award/",
    },
    content: [
      {
        heading: "L'IESEG Entrepreneur Award",
        paragraphs: [
          "Le Prix Entrepreneur de l'IESEG est organisé chaque année par l'IÉSEG Network et l'Incubateur IÉSEG. Il récompense les projets entrepreneuriaux les plus remarquables portés par des membres du réseau IÉSEG, alumni, étudiants, partenaires, évalués sur leur vision, leur impact et leur potentiel de croissance.",
          "Le 12 février 2026, la finale s'est tenue sous le titre «\u202fBreaking the million with AI\u202f», consacrée aux startups qui utilisent l'intelligence artificielle pour créer de la valeur à grande échelle.",
        ],
      },
      {
        heading: "Un alumni IESEG récompensé",
        paragraphs: [
          "Ruben Weinstein, co-fondateur de Speakli et diplômé de l'IESEG en 2024, a présenté la solution devant le jury et le public lors de la finale. Speakli permet aux soignants de dicter leurs transmissions et comptes-rendus de soins à voix haute, l'IA les transforme automatiquement en textes structurés et conformes, intégrés directement dans les logiciels métiers des établissements.",
          "Le jury a récompensé à la fois la solidité du modèle et la pertinence de la thèse : libérer les professionnels de santé de la charge administrative pour qu'ils consacrent chaque instant au soin.",
        ],
      },
      {
        heading: "Double distinction : jury et public",
        paragraphs: [
          "Speakli a remporté à la fois le Prix du Jury et le Prix du Public (Distinction du Public). Cette double victoire, rare selon les membres du jury eux-mêmes, traduit un projet capable de convaincre à la fois les experts et un public élargi.",
          "Être reconnu par son école, quelques années seulement après en être sorti, est une fierté particulière. C'est la confirmation que l'aventure Speakli, démarrée sur les bancs de l'IESEG, répond à un besoin réel, et qu'elle ne fait que commencer.",
        ],
      },
    ],
  },
  {
    slug: "ans-structure-3",
    title: "Lauréats de l'Appel à Projet ANS Structure 3.0",
    category: "Appel à Projet",
    categoryBg: "#FFF7ED",
    categoryColor: "#C2410C",
    date: "Janvier 2026",
    excerpt:
      "Sélectionnés par l'Agence du Numérique en Santé, Speakli déploie sa technologie dans 18 établissements du GCSMS Comet Bretagne dans le cadre du programme national Structure 3.0.",
    coverLogo: "/logos/events/ans-logo.png",
    cardBg: "#1a3a4a",
    gallery: [
      {
        src: "/logos/events/gcsms-comete.png",
        alt: "GCSMS Comète Bretagne",
      },
    ],
    content: [
      {
        heading: "L'ANS et le programme Structure 3.0",
        paragraphs: [
          "L'Agence du Numérique en Santé (ANS) est l'opérateur national de la transformation numérique du système de santé français. Elle pilote les programmes d'accompagnement des établissements de santé et médico-sociaux dans leur transition vers le numérique, en cohérence avec les objectifs du Ségur de la Santé.",
          "Le programme Structure 3.0 est un appel à projet national lancé par l'ANS pour financer et accompagner le déploiement de solutions numériques innovantes dans les établissements médico-sociaux (ESMS). Il vise en priorité les solutions d'aide à la coordination et à la traçabilité des soins.",
        ],
      },
      {
        heading: "Speakli sélectionné pour 18 établissements",
        paragraphs: [
          "En janvier 2026, Speakli a été désigné lauréat de l'appel à projet ANS Structure 3.0. Ce résultat ouvre la voie au déploiement de la solution au sein de 18 établissements publics regroupés au sein du GCSMS Comet Bretagne, un groupement de coopération sanitaire et médico-sociale breton.",
          "Ce partenariat institutionnel est une étape majeure : il valide la conformité de notre solution aux exigences de sécurité, d'interopérabilité et de gouvernance des données définies par l'ANS, et ouvre la voie à un déploiement à l'échelle nationale.",
        ],
      },
      {
        heading: "Une expérimentation à fort potentiel de généralisation",
        paragraphs: [
          "Le cadre Structure 3.0 prévoit un déploiement expérimental avec suivi des indicateurs d'impact : temps soignant libéré, qualité des transmissions, adoption par les équipes. Les résultats alimenteront directement les réflexions de l'ANS sur la généralisation de solutions similaires.",
          "Pour Speakli, c'est l'occasion de démontrer à grande échelle ce que nos premiers utilisateurs confirment au quotidien : que l'assistant vocal IA réduit significativement la charge documentaire et améliore la qualité de vie des professionnels de santé.",
        ],
      },
    ],
  },
  {
    slug: "radio-j-radio-plus",
    title: "Speakli à l'antenne, Radio J",
    category: "Médias",
    categoryBg: "#F0FFF4",
    categoryColor: "#276749",
    date: "2025",
    excerpt:
      "Invités sur Radio J pour parler d'intelligence artificielle au service du soin, Speakli explique sa vision d'une technologie qui redonne du temps aux soignants.",
    coverLogo: "/photos/blog/radio-j.jpg",
    coverIsPhoto: true,
    cardBg: "#1c3141",
    youtubeUrl: "https://www.youtube.com/embed/Boq83wAWhog",
    content: [
      {
        heading: "La parole aux entrepreneurs de la santé numérique",
        paragraphs: [
          "Radio J a consacré une émission à l'émergence des technologies d'intelligence artificielle dans le secteur de la santé, avec un focus particulier sur les startups françaises qui innovent dans les établissements médico-sociaux.",
          "Ce passage médiatique nous a permis de toucher un public large, auditeurs, professionnels de santé, familles de résidents, et d'expliquer concrètement comment une IA conversationnelle peut transformer le quotidien des soignants sans remplacer le lien humain.",
        ],
      },
      {
        heading: "Notre message : la technologie au service du soin",
        paragraphs: [
          "Les questions posées par les journalistes et les auditeurs ont tourné autour d'un sujet sensible : l'IA dans le soin est-elle une menace pour les soignants ou une aide ? Notre réponse est claire et constante : Speakli ne remplace pas les soignants, il leur restitue du temps.",
          "Chaque minute gagnée sur la documentation, c'est une minute de plus auprès du patient. C'est cette conviction qui guide chaque décision produit et chaque partenariat que nous développons.",
        ],
      },
      {
        heading: "Transparence et pédagogie",
        paragraphs: [
          "Ces passages à la radio illustrent notre engagement pour la transparence. L'IA dans la santé soulève des questions légitimes, sur la confidentialité des données, la fiabilité des systèmes, le consentement des patients. Nous répondons à ces questions ouvertement, car notre modèle repose sur la confiance.",
          "Nous remercions l'équipe de Radio J pour cette invitation qui nous a permis de contribuer au débat public sur la transformation numérique du secteur médico-social.",
        ],
      },
    ],
  },
  {
    slug: "jem-ta-startup-2025",
    title: "Co-lauréat du Concours National JEM Ta Startup 2025",
    category: "Prix & Récompenses",
    categoryBg: "#EEF2FF",
    categoryColor: "#3B4FCF",
    date: "Novembre 2025",
    excerpt:
      "Co-lauréat de l'édition 2025 du concours national JEM Ta Startup, Speakli est reconnu pour son entrepreneuriat à impact au service des territoires.",
    coverLogo: "/photos/blog/jem-startup.webp",
    coverIsPhoto: true,
    cardBg: "#1e3a5f",
    gallery: [
      {
        src: "/photos/blog/jem-startup.webp",
        alt: "JEM Ta Startup 2025, Podium",
      },
      {
        src: "/photos/blog/jem-photo.jpg",
        alt: "JEM Ta Startup 2025, L'équipe Speakli",
      },
    ],
    content: [
      {
        heading: "JEM Ta Startup : l'entrepreneuriat à impact",
        paragraphs: [
          "JEM Ta Startup est un concours national porté par le réseau Jeunes Entreprises de France (JEM), qui valorise l'entrepreneuriat à impact positif sur les territoires. La compétition réunit chaque année des startups françaises sélectionnées pour leur potentiel de création de valeur économique et sociale.",
          "L'édition 2025 s'est tenue devant un jury composé d'entrepreneurs, d'investisseurs et d'élus locaux, mobilisés autour d'une question commune : quelles startups d'aujourd'hui construisent la France de demain ?",
        ],
      },
      {
        heading: "Co-lauréat en novembre 2025",
        paragraphs: [
          "En novembre 2025, Speakli a été désigné co-lauréat de l'édition 2025 du concours JEM Ta Startup. Ce résultat récompense notre modèle entrepreneurial : une startup deeptech ancrée dans les réalités du terrain médico-social, portée par une équipe engagée dans la durée.",
          "Le titre de co-lauréat s'accompagne d'une reconnaissance nationale et d'une mise en réseau avec d'autres entrepreneurs à impact, une communauté précieuse pour un projet dont la croissance repose autant sur la confiance que sur la technologie.",
        ],
      },
      {
        heading: "L'entrepreneuriat au service du grand âge",
        paragraphs: [
          "Ce prix vient souligner une réalité que nous vivons au quotidien : l'innovation dans le grand âge et le médico-social est un acte entrepreneurial engagé. Les EHPAD, les services à domicile, les unités de soins de longue durée, ce sont des environnements complexes où chaque innovation doit faire ses preuves rapidement.",
          "Speakli a été construit en partenariat étroit avec les soignants, les directeurs d'établissements et les familles. Cette co-construction est notre principal actif, bien avant la technologie elle-même.",
        ],
      },
    ],
  },
  {
    slug: "hec-incubateur-station-f",
    title: "Speakli intègre l'Incubateur HEC à Station F",
    category: "Incubateur",
    categoryBg: "#F5F3FF",
    categoryColor: "#7C3AED",
    date: "Avril 2025",
    excerpt:
      "Sélectionné pour intégrer l'Incubateur HEC à Station F, Speakli bénéficie d'un programme d'accompagnement intensif au cœur du plus grand campus startup du monde.",
    coverLogo: "/photos/blog/hec-incubateur.jpg",
    coverIsPhoto: true,
    cardBg: "#0f2a44",
    gallery: [
      {
        src: "/photos/blog/hec-incubateur.jpg",
        alt: "L'Incubateur HEC Paris à Station F",
      },
    ],
    content: [
      {
        heading: "L'Incubateur HEC Paris à Station F",
        paragraphs: [
          "L'Incubateur HEC Paris est l'un des programmes d'accompagnement entrepreneurial les plus sélectifs de France. Basé à Station F, le plus grand campus de startups au monde, à Paris, il accueille chaque année une sélection restreinte de startups aux profils les plus prometteurs.",
          "Le programme combine accompagnement stratégique, accès à un réseau d'alumni HEC mondial, mentorat par des entrepreneurs et investisseurs expérimentés, et un environnement de travail exceptionnel au cœur de l'écosystème startup parisien.",
        ],
      },
      {
        heading: "Sélection en avril 2025",
        paragraphs: [
          "En avril 2025, Speakli a été sélectionné pour rejoindre l'Incubateur HEC Paris. Cette intégration a marqué un tournant dans notre développement : elle nous a donné accès à des ressources et des expertises qui ont directement accéléré la construction de notre stratégie commerciale et de notre modèle de partenariats institutionnels.",
          "Station F est bien plus qu'un espace de travail. C'est un écosystème vivant où startups, investisseurs, grands groupes et institutions académiques cohabitent et collaborent. Y être présent nous a permis de nouer des contacts déterminants pour la suite de notre parcours.",
        ],
      },
      {
        heading: "Un tremplin pour la suite",
        paragraphs: [
          "L'intégration à l'Incubateur HEC a été le point de départ d'une série de reconnaissances et de partenariats qui ont jalonné notre parcours depuis 2025. La crédibilité apportée par ce programme a facilité nos discussions avec des établissements publics, des financeurs institutionnels et des partenaires stratégiques.",
          "Nous sommes reconnaissants envers l'équipe de l'Incubateur HEC pour leur accompagnement exigeant et bienveillant, qui nous a aidés à construire une entreprise solide avant de chercher à croître rapidement.",
        ],
      },
    ],
  },
  {
    slug: "hec-launchpad-2025",
    title: "Lauréat du HEC Startup Launchpad 2025",
    category: "Prix & Récompenses",
    categoryBg: "#EEF2FF",
    categoryColor: "#3B4FCF",
    date: "Avril 2025",
    excerpt:
      "Prix du jury et coup de cœur du public à la finale du HEC Startup Launchpad, l'un des concours entrepreneuriaux les plus sélectifs de l'écosystème startup français.",
    coverLogo: "/photos/blog/hec-launchpad-cover.jpg",
    coverIsPhoto: true,
    cardBg: "#071428",
    gallery: [
      {
        src: "/photos/blog/hec-launchpad-cover.jpg",
        alt: "HEC Startup Launchpad 2025, Finale à Station F",
      },
      {
        src: "/photos/blog/hec-launchpad-pitch-1.png",
        alt: "HEC Startup Launchpad 2025, Pitch Speakli",
      },
      {
        src: "/photos/blog/hec-launchpad-pitch-2.png",
        alt: "HEC Startup Launchpad 2025, Remise du prix",
      },
    ],
    content: [
      {
        heading: "Le HEC Startup Launchpad",
        paragraphs: [
          "Le HEC Startup Launchpad est le concours entrepreneurial phare organisé par HEC Paris dans le cadre de son programme à Station F. Il rassemble chaque promotion d'incubés pour une finale où chaque startup pitch devant un jury d'investisseurs, d'entrepreneurs chevronnés et de partenaires institutionnels.",
          "Concourir au HEC Launchpad, c'est se mesurer aux meilleures startups sélectionnées par l'incubateur, des projets ambitieux, aux modèles souvent déjà validés par le marché, présentés dans les meilleures conditions.",
        ],
      },
      {
        heading: "Double victoire : jury et public",
        paragraphs: [
          "En avril 2025, lors de la finale du HEC Startup Launchpad à Station F, Speakli a remporté à la fois le Prix du Jury et le Prix du Public. Une double victoire qui, selon les membres du jury eux-mêmes, est rare et témoigne d'un projet qui sait convaincre à la fois les experts et le grand public.",
          "Cette reconnaissance nous a apporté bien plus que la fierté d'un palmarès : elle a amplifié notre visibilité dans l'écosystème startup parisien et ouvert des portes pour nos premiers partenariats stratégiques.",
        ],
      },
      {
        heading: "La confirmation d'une thèse forte",
        paragraphs: [
          "Remporter le HEC Launchpad quelques semaines seulement après avoir intégré l'incubateur, c'était la confirmation que notre thèse, l'IA vocale comme solution à la crise de la documentation dans les EHPAD, résonnait bien au-delà du seul secteur médico-social.",
          "La silver economy, le vieillissement de la population, la pénurie de soignants : ces enjeux systémiques font de Speakli un pari qui dépasse le seul cadre startup. C'est ce que le jury du HEC Launchpad a reconnu ce jour-là.",
        ],
      },
    ],
  },

  /* ── Thematic articles ─────────────────────────────────── */
  {
    slug: "pathos-gmps-dotation-ehpad",
    title: "La grille PATHOS : comprendre et améliorer votre dotation GMPS",
    category: "Financement & GMPS",
    categoryBg: "#E6F4F1",
    categoryColor: "#0a7c5c",
    date: "Avril 2026",
    excerpt:
      "Le GMPS conditionne directement le budget soins de votre établissement. Comprendre le fonctionnement de PATHOS, et documenter correctement, peut représenter plusieurs dizaines de milliers d'euros de dotation annuelle supplémentaire.",
    cardBg: "#0a2030",
    isThematic: true,
    readingTime: "8 min",
    content: [
      {
        heading: "Qu'est-ce que PATHOS ?",
        paragraphs: [
          "PATHOS est un outil médico-économique conçu par la CNAM et les gériatres français pour évaluer les besoins en soins techniques d'une population de résidents en EHPAD. Il repose sur 12 états pathologiques (cancers, démences, états végétatifs, troubles psychiatriques, etc.) croisés avec 10 protocoles de soins, donnant lieu à un score synthétique : le Pathos Moyen Pondéré (PMP). Son cadre juridique est fixé par le Code de l'action sociale et des familles (articles R. 314-17 et suivants du CASF).",
          "Contrairement à une idée reçue, le PMP ne mesure pas la gravité des pathologies en elles-mêmes, mais l'intensité des soins qu'elles nécessitent. Un résident atteint d'une démence sévère avec troubles du comportement, incontinence et perte d'autonomie totale génère un score très différent d'un résident autonome avec une seule pathologie chronique stabilisée. La CNSA a publié un guide opérationnel de référence pour accompagner les médecins coordonnateurs dans la cotation PATHOS, disponible sur cnsa.fr.",
        ],
      },
      {
        heading: "Comment le GMPS détermine votre dotation",
        paragraphs: [
          "La dotation soins d'un EHPAD est calculée à partir du Groupe iso-Ressources Moyen Pondéré Soins (GMPS), une formule officielle qui combine le GMP (Grille AGGIR, mesurant la dépendance physique et cognitive) et le PMP (PATHOS, mesurant l'intensité des soins) : GMPS = GMP + (PMP × 2,59). Ce coefficient de 2,59 reflète le poids prépondérant de la charge en soins techniques dans le financement.",
          "Chaque point de GMPS vaut aujourd'hui 13,60 € par lit et par an, valeur confirmée par SOS EHPAD et issue de l'arrêté ministériel fixant les tarifs plafonds. Pour un EHPAD de 80 lits, passer d'un PMP de 180 à 220 points, soit +40 points de PMP × 2,59 = +103,6 points de GMPS, représente une hausse de dotation de l'ordre de 112 700 €/an. Selon une analyse publiée sur Médecine-connectee.fr, chaque tranche de 10 points de PMP gagnés représente environ 28 000 à 35 000 € de dotation annuelle supplémentaire pour un établissement de taille standard. Un cas concret documenté par Gerontim illustre un établissement ayant restructuré sa documentation soignante et amélioré son PMP de 151 à 251 points, générant plus de 300 000 € de dotation supplémentaire par an.",
        ],
      },
      {
        heading: "Le rôle critique de la documentation dans le score PATHOS",
        paragraphs: [
          "PATHOS est réalisé par le médecin coordonnateur à partir des dossiers résidents. Sa fiabilité dépend directement de la qualité et de l'exhaustivité des transmissions soignantes. Un résident dont les épisodes de douleur, les chutes nocturnes ou les troubles du comportement ne sont pas tracés quotidiennement sera sous-évalué, et son établissement sous-financé.",
          "C'est le paradoxe de nombreux EHPAD : les soins sont réels, l'intensité est bien là, mais la documentation lacunaire empêche de la valoriser. SOS EHPAD documente ce phénomène dans plusieurs articles de terrain : les codings PATHOS sont systématiquement plus précis dans les établissements où les transmissions infirmières sont exhaustives et structurées. La traçabilité n'est donc pas une contrainte administrative, c'est un levier financier direct. La réforme PATHOS engagée depuis 2024 a par ailleurs renforcé les exigences de documentation pour certains protocoles, notamment pour les états neurologiques et les soins palliatifs (source : SOS EHPAD, « La réforme PATHOS 2024 »).",
        ],
      },
      {
        heading: "Améliorer son PMP : les leviers concrets",
        paragraphs: [
          "Trois leviers permettent d'améliorer durablement son PMP. D'abord, former le médecin coordonnateur et les IDE à la rigueur du codage PATHOS, des erreurs fréquentes (mauvais protocole de soins associé à un état pathologique) peuvent minorer le score de 10 à 20 points. Ensuite, structurer les transmissions : chaque observation significative (refus alimentaire, agitation nocturne, plaie, douleur évaluée à l'EVA) doit être tracée quotidiennement pour être visible lors du codage.",
          "Enfin, l'outillage numérique joue un rôle croissant. Un assistant vocal IA permet aux soignants de dicter leurs observations en temps réel, sans rupture dans le geste de soin, et de les retrouver structurées dans le DUI. Cette continuité documentaire est précisément ce qui manque dans la plupart des établissements, et ce qui fait la différence lors d'une coupe PATHOS. Comme le souligne Géroscopie, les établissements qui ont investi dans la structuration documentaire avant leur coupe constatent en moyenne une amélioration significative de leur PMP lors de la coupe suivante.",
        ],
      },
      {
        heading: "Anticiper la coupe PATHOS : une démarche proactive",
        paragraphs: [
          "La coupe PATHOS doit être anticipée, pas subie. Les établissements les mieux financés sont ceux qui maintiennent une documentation continue tout au long de l'année, et non ceux qui tentent de reconstituer des données en urgence avant le passage du médecin coordonnateur. Une revue mensuelle des transmissions avec le cadre de santé, combinée à une sensibilisation régulière des équipes, suffit souvent à identifier les résidents sous-codés.",
          "Le directeur d'EHPAD a tout intérêt à piloter activement cet indicateur : un suivi trimestriel du PMP estimé, croisé avec les pathologies connues des résidents, permet d'anticiper les évolutions et d'ajuster la stratégie documentaire avant la prochaine coupe officielle. SOS EHPAD recommande également de solliciter un audit de codage par un médecin coordonnateur extérieur avant chaque coupe, une pratique encore rare mais dont les retours terrain sont systématiquement positifs.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "CNSA, Guide opérationnel PATHOS pour les EHPAD (cnsa.fr)",
          "Code de l'action sociale et des familles, Art. R. 314-17 et suivants (légifrance.gouv.fr)",
          "SOS EHPAD, « La réforme PATHOS 2024 » et « Coupe PATHOS : mode d'emploi » (sos-ehpad.fr)",
          "Gerontim.fr, Cas pratique : impact de l'amélioration du PMP (151 → 251 points) sur la dotation GMPS (+300 000 €/an)",
          "Médecine-connectee.fr, « Financement EHPAD : l'impact méconnu du PMP sur la dotation soins » (10 pts PMP ≈ 28 000–35 000 €/an)",
          "Arrêté ministériel fixant les tarifs plafonds GMPS, valeur du point : 13,60 €/lit/an (source : SOS EHPAD)",
          "Géroscopie.fr, Dossier financement EHPAD et valorisation PATHOS",
        ],
      },
    ],
  },
  {
    slug: "fidelisation-personnel-soignant-ehpad",
    title: "Fidéliser ses soignants en EHPAD : les leviers qui changent vraiment la donne",
    category: "Management & RH",
    categoryBg: "#FEF3C7",
    categoryColor: "#92400e",
    date: "Avril 2026",
    excerpt:
      "Le turnover des soignants coûte entre 6 et 9 mois de salaire par départ selon l'OPCO Santé. Avant d'augmenter les salaires, souvent impossible, voici les leviers organisationnels qui retiennent vraiment les équipes.",
    cardBg: "#0a2010",
    isThematic: true,
    readingTime: "7 min",
    content: [
      {
        heading: "Un turnover structurel, pas conjoncturel",
        paragraphs: [
          "Le secteur médico-social affiche des taux de rotation du personnel parmi les plus élevés de l'économie française. Selon la revue de la CNSA (Rapport de situation n°24), le taux de turnover moyen dans les EHPAD atteint 24,4 %, avec un taux de postes vacants de 4,5 %, chiffre qui a doublé en six ans. Ce n'est pas un phénomène conjoncturel lié à la crise sanitaire : c'est une fragilité structurelle du secteur, documentée et aggravée.",
          "Avant d'envisager des solutions, il est essentiel de comprendre les vraies raisons des départs. Selon la DARES et les analyses relayées par SOS EHPAD, les démissions dans les EHPAD privés ont augmenté de 40 % entre 2017 et 2022, avec des taux d'intention de départ particulièrement élevés chez les infirmiers (52,5 %) et les aides-soignants (48,3 %). Le salaire arrive souvent en quatrième position derrière la charge de travail, le manque de sens et l'absence de reconnaissance, ce qui signifie que des leviers non-salariaux peuvent être actionnés immédiatement.",
        ],
      },
      {
        heading: "Réduire la charge administrative : le levier sous-estimé",
        paragraphs: [
          "Un aide-soignant passe en moyenne 1h30 par jour à des tâches de documentation, transmissions, saisie dans le logiciel métier, fiches de suivi. C'est du temps qu'il ne passe pas auprès des résidents, et qu'il perçoit souvent comme du travail ingrat, coupé du sens de son métier. Plusieurs directeurs témoignent que les démissions surviennent souvent après une journée où le soignant a eu l'impression de n'avoir fait que de la saisie.",
          "Réduire cette charge sans dégrader la qualité documentaire est donc un levier de fidélisation direct. Les outils de saisie vocale permettent aux soignants de dicter leurs observations à voix haute, dans l'instant du soin, sans quitter le résident des yeux. Le DUI se remplit en continu, sans séance de rattrapage en fin de journée. Ce gain de 30 à 40 minutes par soignant par jour est vécu comme une libération, pas comme un gadget technologique.",
        ],
      },
      {
        heading: "Le coût réel d'un départ : une donnée trop peu suivie",
        paragraphs: [
          "L'OPCO Santé estime le coût total d'un départ de soignant entre 6 et 9 mois de salaire brut, en cumulant les coûts de recrutement, d'intérim (souvent facturé 30 à 50 % plus cher que le coût interne), de formation du remplaçant et de perte de productivité pendant la montée en compétence. Pour un aide-soignant, cela représente entre 9 000 et 14 000 €. Avec 90 000 départs à la retraite attendus dans le secteur médico-social d'ici 2030, l'enjeu financier de la rétention est massif.",
          "Ces données, rarement intégrées dans les tableaux de bord des directions, changent la perception du retour sur investissement d'actions de fidélisation. Former un encadrant à la conduite d'entretiens de rétention, acheter des tablettes vocales, ou financer une prime de week-end volontaire, ces investissements sont rentables dès lors qu'ils évitent un seul départ par an.",
        ],
      },
      {
        heading: "La reconnaissance : construire une culture du feedback",
        paragraphs: [
          "Le sentiment de reconnaissance n'est pas lié au salaire mais à la visibilité du travail accompli. Les équipes qui restent sont celles où les managers savent ce qui se passe sur le terrain, pas via des rapports hebdomadaires, mais via une présence régulière et une lecture des transmissions. Un encadrant qui cite un exemple précis de bonne pratique dans sa réunion d'équipe fait plus pour la rétention qu'une prime.",
          "Des pratiques simples ont un impact fort : le briefing hebdomadaire de 15 minutes avec lecture des points positifs des transmissions, la nomination mensuelle d'un « référent thématique » (douleur, nutrition, fin de vie) qui monte en compétence et devient ressource pour l'équipe, ou encore la systématisation des entretiens annuels avec un vrai plan de développement. Ces rituels coûtent du temps managérial, pas de l'argent. Le rapport sénatorial n°778 sur la prise en charge des personnes âgées en EHPAD identifie explicitement la valorisation des compétences comme levier prioritaire de rétention.",
        ],
      },
      {
        heading: "Agir sur les horaires et l'organisation du travail",
        paragraphs: [
          "La question des plannings est un facteur de départ massif. Les soignants qui partent citent fréquemment les coupures, les week-ends systématiques, les roulements imprévisibles. Même à salaire égal, un établissement qui offre de la prévisibilité retient mieux. La mise en place de roulements fixes, même partiellement, d'un système d'échanges de gardes facilité, ou d'une prime pour les week-ends volontaires, peut changer la dynamique.",
          "Plusieurs EHPAD innovants expérimentent également le « binôme stable » : deux soignants travaillent ensemble sur les mêmes résidents de manière quasi-permanente, ce qui crée des liens, de la maîtrise et du sens. La rotation permanente est vécue comme un facteur de déstabilisation et d'épuisement, la stabilité relationnelle, même partielle, est protectrice.",
        ],
      },
      {
        heading: "La fidélisation commence au recrutement",
        paragraphs: [
          "Les établissements avec les meilleurs taux de rétention partagent un point commun : ils recrutent lentement et sélectivement. Un entretien de recrutement qui expose clairement les réalités du poste, la charge, les horaires, les résidents, filtre les candidats et réduit les déceptions à 6 mois. Un accueil structuré sur 4 semaines avec un référent désigné, un bilan à 1 mois et 3 mois, fait passer le taux de départ en période d'essai de 30 % à moins de 10 % dans les établissements qui le pratiquent.",
          "Enfin, l'image employeur d'un EHPAD se construit ou se détruit sur les plateformes d'avis salariés (Indeed, Glassdoor). Les nouvelles recrues les consultent systématiquement. Investir dans les conditions de travail est aussi un investissement en attractivité, le bouche-à-oreille positif dans les réseaux soignants locaux reste le canal de recrutement le plus efficace.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "CNSA, Rapport de situation n°24 : turnover 24,4 %, taux de vacance 4,5 % (doublé en 6 ans) dans les EHPAD (cnsa.fr)",
          "DARES / SOS EHPAD, Démissions dans les EHPAD privés : +40 % entre 2017 et 2022 ; intentions de départ : IDE 52,5 %, AS 48,3 %",
          "OPCO Santé, Coût d'un départ soignant : 6 à 9 mois de salaire brut ; 90 000 départs à la retraite attendus avant 2030 (opcosante.fr)",
          "Rapport sénatorial n°778, Prise en charge des personnes âgées en EHPAD : recommandations sur la valorisation des compétences et la rétention (senat.fr)",
          "SOS EHPAD, Dossiers RH et conditions de travail en EHPAD (sos-ehpad.fr)",
        ],
      },
    ],
  },
  {
    slug: "conduite-changement-numerique-ehpad",
    title: "Réussir l'adoption d'un outil numérique en EHPAD : le guide pratique",
    category: "Numérique & IA",
    categoryBg: "#EEF2FF",
    categoryColor: "#3730a3",
    date: "Avril 2026",
    excerpt:
      "70 % des projets de transformation numérique en EHPAD n'atteignent pas leurs objectifs, non pas à cause de la technologie, mais à cause de la conduite du changement. Voici comment éviter les pièges classiques et embarquer réellement vos équipes.",
    cardBg: "#1a0a30",
    isThematic: true,
    readingTime: "9 min",
    content: [
      {
        heading: "Le contexte : un secteur en pleine transformation numérique",
        paragraphs: [
          "Le Ségur de la Santé a engagé 630 millions d'euros pour la transformation numérique des établissements médico-sociaux (ESMS), via le programme ESMS Numérique piloté par la CNSA. Chaque EHPAD éligible peut bénéficier d'une enveloppe moyenne de 14 000 € pour financer l'acquisition et le déploiement de solutions numériques labellisées. Ces fonds représentent une opportunité sans précédent, mais ils ne suffisent pas à garantir l'adoption réelle.",
          "SOS EHPAD rapporte que 80 % des établissements équipés d'un Système d'Information Soins (SIS) constatent une amélioration de la qualité de leur documentation et de leurs transmissions. Pourtant, selon plusieurs études sectorielles sur la transformation numérique en santé, environ 70 % des projets de numérisation en établissement n'atteignent pas leurs objectifs initiaux. L'écart entre ces deux chiffres dit tout : ce n'est pas l'outil qui fait l'adoption, c'est la méthode de déploiement.",
        ],
      },
      {
        heading: "Pourquoi les outils numériques échouent en EHPAD",
        paragraphs: [
          "L'EHPAD moyen a tenté d'implémenter 2 à 3 outils numériques au cours des cinq dernières années. Les logiciels de soin, les tablettes, les outils de communication avec les familles, beaucoup ont été achetés, peu ont été réellement adoptés. Les raisons sont connues : pas de formation suffisante, pas de champion interne, déploiement précipité, outil mal adapté au terrain. La technologie n'est jamais la variable principale. La variable principale, c'est l'humain.",
          "Le piège classique est de confondre déploiement et adoption. Déployer, c'est installer l'outil. Adopter, c'est changer ses habitudes quotidiennes, ce qui prend entre 3 et 6 mois pour un outil complexe, et nécessite un accompagnement actif tout au long de cette période. Un établissement qui achète une solution le 1er janvier et espère un usage généralisé au 1er mars n'a pas budgété le vrai coût du projet.",
        ],
      },
      {
        heading: "Identifier et former des ambassadeurs internes",
        paragraphs: [
          "La première étape de toute conduite du changement réussie est l'identification d'ambassadeurs internes, des soignants qui vont tester l'outil en avant-première, le comprendre en profondeur, et devenir la première ligne de support pour leurs collègues. Ces profils ne sont pas nécessairement les plus expérimentés ou les plus diplômés : ce sont souvent les plus curieux et les mieux intégrés dans les réseaux informels de l'équipe.",
          "Ces ambassadeurs doivent être formés au-delà du simple usage de l'outil : ils doivent comprendre les bénéfices pour pouvoir les expliquer, connaître les cas d'usage concrets de leur service, et être outillés pour répondre aux objections classiques (« ça va prendre plus de temps », « c'est trop compliqué »). Un réseau de 3 à 4 ambassadeurs par service suffit généralement à créer la dynamique.",
        ],
      },
      {
        heading: "Les 4 phases d'un déploiement réussi",
        paragraphs: [
          "La phase 1 est la préparation : co-construire avec les équipes les cas d'usage prioritaires, identifier les freins spécifiques à l'établissement, et définir les indicateurs de succès. La phase 2 est le pilote restreint : déployer sur une unité ou une équipe volontaire, recueillir les retours, ajuster. Ne pas brûler cette étape, elle crée les premières success stories qui alimenteront la communication interne.",
          "La phase 3 est le déploiement généralisé avec un accompagnement renforcé : formations collectives mais aussi individuelles à la demande, permanences techniques, présence du prestataire pendant les premières semaines. La phase 4 est la consolidation : rituels de revue de l'usage, correction des écarts, valorisation des bons usages en réunion d'équipe. C'est dans cette phase que l'adoption devient durable ou que les anciennes habitudes reprennent le dessus.",
        ],
      },
      {
        heading: "Le rôle du directeur dans la conduite du changement",
        paragraphs: [
          "Le directeur est l'acteur le plus critique de la réussite, pas en tant que formateur technique, mais en tant que sponsor visible du projet. Sa légitimité, sa constance et sa capacité à répondre aux résistances déterminent souvent la vitesse d'adoption. Un directeur qui utilise lui-même l'outil, qui cite des données issues de l'outil en réunion, qui valorise publiquement les soignants qui l'adoptent : ce comportement en cascade est irremplaçable.",
          "À l'inverse, un directeur qui délègue entièrement le projet à une infirmière coordinatrice surchargée, sans suivi ni relance, envoie un signal inverse à l'équipe : « ce n'est pas vraiment prioritaire ». Les résistances s'organisent autour de ce signal. La conduite du changement n'est pas un projet IT, c'est un projet de leadership.",
        ],
      },
      {
        heading: "Mesurer et communiquer les progrès",
        paragraphs: [
          "Ce qui se mesure s'améliore. Définir 2 ou 3 indicateurs simples dès le départ, taux de saisie quotidienne par soignant, nombre de transmissions complètes par semaine, score de satisfaction équipe, permet de rendre les progrès visibles. Ces données, partagées mensuellement en réunion d'équipe, transforment l'adoption en projet collectif.",
          "La communication des succès est sous-estimée. Un témoignage d'une aide-soignante qui explique à ses collègues comment elle a gagné 20 minutes par jour pèse davantage que n'importe quel argument rationnel du directeur. Les petits jalons célébrés (« 80 % de l'équipe utilise l'outil chaque jour depuis 30 jours ») créent une dynamique collective qui s'auto-entretient.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "CNSA, Programme ESMS Numérique : 630 M€ engagés dans le cadre du Ségur de la Santé ; enveloppe moyenne de 14 000 € par établissement éligible (cnsa.fr)",
          "Agence du Numérique en Santé (ANS), Programme CaRE et référentiel de maturité numérique des ESMS (esante.gouv.fr)",
          "SOS EHPAD, « 80 % des EHPAD équipés d'un SIS constatent une amélioration de la qualité documentaire » (sos-ehpad.fr)",
          "Données sectorielles, Taux d'échec des projets de numérisation en établissements de santé : environ 70 % n'atteignent pas leurs objectifs initiaux (chiffre communément cité dans les retours d'expérience ANAP et ANS)",
        ],
      },
    ],
  },
  {
    slug: "intelligence-artificielle-soins-ehpad",
    title: "L'IA en EHPAD : ce qui change vraiment pour vos équipes et vos résidents",
    category: "Numérique & IA",
    categoryBg: "#EEF2FF",
    categoryColor: "#3730a3",
    date: "Avril 2026",
    excerpt:
      "L'intelligence artificielle suscite autant de curiosité que d'inquiétude dans le secteur médico-social. Démythifions : ce que l'IA fait réellement aujourd'hui en EHPAD, ce qu'elle ne fera jamais, et pourquoi elle peut être une alliée du soin humain.",
    cardBg: "#071428",
    isThematic: true,
    readingTime: "8 min",
    content: [
      {
        heading: "L'IA en EHPAD : sortir des fantasmes",
        paragraphs: [
          "Quand on parle d'IA dans un EHPAD, les réactions sont souvent aux deux extrêmes : soit l'enthousiasme technophile (« l'IA va tout automatiser »), soit la résistance inquiète (« l'IA va remplacer les soignants »). La réalité est plus nuancée et, finalement, plus rassurante. L'IA qui existe aujourd'hui dans le secteur médico-social n'est pas une intelligence générale, c'est un ensemble d'outils spécialisés conçus pour des tâches précises et délimitées.",
          "En EHPAD, les applications concrètes de l'IA se concentrent principalement sur trois domaines : la documentation et la traçabilité (assistants vocaux, aide à la saisie), la détection d'anomalies (analyse de capteurs, détection de chutes, surveillance des constantes), et l'aide à la décision clinique (analyse de données pour le médecin coordonnateur). Dans chacun de ces cas, l'IA assiste, elle n'agit pas seule.",
        ],
      },
      {
        heading: "L'IA vocale : le cas d'usage le plus mature",
        paragraphs: [
          "La reconnaissance vocale appliquée aux soins est aujourd'hui la technologie IA la plus déployée en EHPAD. Elle permet à un soignant de dicter ses observations à voix haute, « Mme Martin, nuit agitée, refus alimentaire au petit-déjeuner, EVA douleur à 4 sur 10 », et de les retrouver structurées et indexées dans le DUI quelques secondes plus tard, sans avoir touché un écran.",
          "Le gain est double. Pour le soignant : moins de saisie, moins de charge cognitive, plus de temps auprès des résidents. Pour l'établissement : une documentation plus exhaustive, plus régulière, et donc un DUI plus fidèle à la réalité des soins, ce qui améliore la qualité de la prise en charge, la sécurité juridique, et la valorisation PATHOS lors des coupes. Comme le souligne Le Média Social, la qualité de la documentation soignante a un impact direct et mesurable sur les scores PATHOS et donc sur le financement de l'établissement.",
        ],
      },
      {
        heading: "Les capteurs et la détection précoce : une révolution silencieuse",
        paragraphs: [
          "Des systèmes de capteurs passifs (sous le matelas, au sol, sur les équipements) associés à des algorithmes d'IA permettent désormais de détecter des anomalies comportementales avant qu'elles ne deviennent des urgences. Agitation nocturne inhabituelle, modification du rythme de marche, absence de mouvement prolongée : ces signaux faibles peuvent être détectés automatiquement et déclencher une alerte ciblée.",
          "Selon SOS EHPAD, les établissements ayant déployé des solutions IA de détection de chutes observent une réduction allant jusqu'à 30 % du nombre de chutes non détectées, ce qui se traduit par moins d'hospitalisations d'urgence et une meilleure sécurité pour les résidents. La stratégie 2025-2028 du Health Data Hub identifie d'ailleurs la prévention des chutes et la détection précoce comme deux des priorités nationales pour l'usage de l'IA en santé.",
        ],
      },
      {
        heading: "Cadre réglementaire : ce que tout directeur doit savoir",
        paragraphs: [
          "Tout outil IA manipulant des données de santé en EHPAD doit être hébergé sur une infrastructure certifiée HDS (Hébergement de Données de Santé). L'arrêté du 26 avril 2024 a étendu cette obligation aux prestataires établis dans l'Espace Économique Européen, renforçant les exigences applicables aux fournisseurs de solutions cloud. Cette certification est vérifiable publiquement sur le site de l'ANS.",
          "Le Règlement européen sur l'IA (AI Act, règlement UE 2024/1689, entré en vigueur le 1er août 2024) classe les outils d'IA en santé dans la catégorie « haut risque », ce qui implique des exigences de transparence, de traçabilité et de supervision humaine. En pratique, tout outil IA utilisé en EHPAD doit faire l'objet d'une évaluation préalable. Le guide HAS-CNIL publié en février 2026 fournit un cadre opérationnel pour accompagner les établissements dans cette démarche.",
        ],
      },
      {
        heading: "Ce que l'IA ne fera jamais",
        paragraphs: [
          "Soyons clairs : l'IA ne remplacera pas le soin relationnel. Tenir la main d'un résident en fin de vie, détecter l'inquiétude dans le regard d'une personne qui ne parle plus, adapter son ton en fonction de l'humeur du moment, ces compétences sont profondément humaines et ne seront pas automatisées. La valeur du soignant n'est pas dans la saisie d'information : elle est dans la relation de confiance, la présence, l'empathie.",
          "Les directeurs qui communiquent clairement sur ce point, « l'IA prend en charge ce qui n'a pas besoin d'être humain pour libérer du temps à ce qui doit l'être », rencontrent beaucoup moins de résistance que ceux qui présentent l'IA comme une innovation technologique abstraite. Cadrer correctement le message est la première étape de toute adoption réussie.",
        ],
      },
      {
        heading: "Choisir et déployer un outil IA : les questions à poser",
        paragraphs: [
          "Face à l'offre croissante d'outils IA pour EHPAD, plusieurs critères sont déterminants. La certification HDS est non-négociable : toute donnée de soin doit être hébergée sur infrastructure certifiée (arrêté du 26 avril 2024). Le RGPD et le consentement des résidents ou de leurs représentants légaux doivent être traités en amont. La compatibilité avec le logiciel métier existant (DUI, SIS) conditionne la fluidité d'usage.",
          "Enfin, la qualité de l'accompagnement post-déploiement est souvent plus importante que la qualité de l'outil lui-même. Un outil excellent mal déployé génère zéro valeur. Un outil correct bien accompagné transforme une équipe. Exigez des références, des témoignages terrain, et un engagement clair sur la formation initiale et le support continu avant de signer.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "Arrêté du 26 avril 2024 relatif à l'hébergement des données de santé (HDS), extension aux prestataires EEE (légifrance.gouv.fr)",
          "Règlement UE 2024/1689 sur l'intelligence artificielle (AI Act), classification des outils IA en santé comme systèmes à haut risque (eur-lex.europa.eu)",
          "Health Data Hub, Stratégie nationale données de santé 2025-2028 : IA, prévention des chutes, détection précoce (health-data-hub.fr)",
          "SOS EHPAD, « IA et détection des chutes en EHPAD : jusqu'à -30 % de chutes non détectées » (sos-ehpad.fr)",
          "HAS & CNIL, Guide pratique IA en établissements de santé, février 2026 (has-sante.fr / cnil.fr)",
          "Le Média Social, « Intelligence artificielle et coupes PATHOS : un lien direct avec le financement » (lemediasocial.fr)",
          "Agence du Numérique en Santé (ANS), Référentiel HDS et liste des hébergeurs certifiés (esante.gouv.fr)",
        ],
      },
    ],
  },

  /* ── Thematic articles, batch 2 ──────────────────────────── */
  {
    slug: "tracabilite-soins-ehpad-reglementation",
    title:
      "Traçabilité des soins en EHPAD : obligations réglementaires et bonnes pratiques",
    category: "Réglementation & Conformité",
    categoryBg: "#FFF3E0",
    categoryColor: "#C65900",
    date: "Avril 2026",
    excerpt:
      "La traçabilité des soins n'est pas une option managériale : c'est une obligation légale dont le non-respect engage la responsabilité civile et pénale de l'établissement. Voici ce que la loi exige, ce qui est réellement contrôlé, et comment s'y conformer concrètement.",
    cardBg: "#1a1005",
    isThematic: true,
    readingTime: "9 min",
    content: [
      {
        heading: "Le cadre légal : ce que le CASF et la HAS imposent",
        paragraphs: [
          "La traçabilité des soins en EHPAD est encadrée par plusieurs textes de référence. L'article L. 311-3 du Code de l'action sociale et des familles (CASF) pose le principe du droit à une prise en charge de qualité, impliquant la tenue d'un dossier individualisé de soins actualisé. L'article D. 312-158 du CASF précise que chaque résident doit disposer d'un dossier de soins comprenant les prescriptions médicales, les observations soignantes, les transmissions et les évaluations de la dépendance. Ce dossier doit être tenu à jour et accessible à tout moment aux professionnels de santé intervenant auprès du résident.",
          "La Haute Autorité de Santé (HAS) a publié en 2024 une version actualisée de son manuel de certification pour les EHPAD, dans laquelle la traçabilité des soins constitue un critère impératif (CI), c'est-à-dire qu'une non-conformité sur ce point entraîne automatiquement une recommandation d'amélioration et peut conduire à une décision de certification conditionnelle. Le référentiel HAS identifie plus précisément quatre exigences : la continuité des transmissions entre équipes, la traçabilité des évaluations standardisées (douleur, chutes, nutrition, escarres), la documentation des refus de soins et des événements indésirables, et la tenue des prescriptions avec les actes correspondants.",
        ],
      },
      {
        heading: "Ce qui doit obligatoirement être documenté",
        paragraphs: [
          "La réglementation distingue plusieurs catégories d'éléments devant figurer dans le dossier de soins. Les prescriptions médicales et leur exécution : chaque administration médicamenteuse doit être tracée avec l'heure, le soignant et la voie d'administration (arrêté du 6 avril 2011 relatif au management de la qualité de la prise en charge médicamenteuse). Les évaluations standardisées : la douleur (EVA, DOLOPLUS ou Algoplus selon le profil du résident), le risque d'escarre (Braden ou Norton), le risque nutritionnel (MNA), le risque de chute, toutes avec une fréquence définie. Les transmissions inter-équipes : chaque fin de poste doit générer une transmission ciblée couvrant l'état général, les événements survenus, et les surveillances à assurer.",
          "Au-delà de ces obligations minimales, la circulaire DGCS/SD3A/2013/134 relative à l'évaluation interne des EHPAD recommande explicitement la traçabilité des refus de soins, des modifications comportementales et des contacts familiaux significatifs. Ces éléments, souvent non documentés en pratique, constituent pourtant des preuves essentielles en cas de mise en cause médico-légale. Le rapport de la Cour des comptes de 2022 sur les EHPAD a d'ailleurs identifié la faiblesse de la documentation soignante comme l'un des principaux facteurs de risque dans les établissements contrôlés.",
        ],
      },
      {
        heading: "Les conséquences concrètes d'une traçabilité insuffisante",
        paragraphs: [
          "Les risques liés à une documentation lacunaire sont à la fois réglementaires, juridiques et financiers. Sur le plan réglementaire, l'ARS dispose depuis la loi ESSOC (2018) de pouvoirs renforcés de contrôle et de sanction. Une inspection faisant apparaître des lacunes documentaires graves peut entraîner une injonction de mise en conformité, une réduction de la capacité d'accueil, voire une procédure de fermeture partielle ou totale dans les cas extrêmes. En 2023, selon les données de la DGCS, 12 % des EHPAD inspectés ont fait l'objet d'une injonction portant sur la qualité des transmissions et du dossier de soins.",
          "Sur le plan juridique, la jurisprudence est constante : en cas de plainte d'un résident ou d'une famille, l'absence de traçabilité est retenue comme présomption de faute. Les juridictions civiles et administratives ont régulièrement confirmé ce principe en matière de soins non documentés. L'établissement qui ne peut pas produire les transmissions prouvant qu'il a évalué le risque et mis en place des mesures préventives se trouve en situation de ne pouvoir renverser la présomption de responsabilité. Sur le plan financier, rappelons le lien avec la cotation PATHOS : toute observation soignante non tracée est une observation qui ne sera pas valorisée lors de la coupe, avec un impact direct sur la dotation.",
        ],
      },
      {
        heading: "Les bonnes pratiques des établissements exemplaires",
        paragraphs: [
          "Les établissements affichant les meilleurs résultats lors des audits documentaires partagent plusieurs caractéristiques organisationnelles. Premièrement, ils ont défini et formalisé par écrit les attendus documentaires pour chaque poste, ce qu'un aide-soignant de nuit doit tracer, ce qu'une infirmière de jour doit compléter, avec des délais précis (transmission à la fin du poste, pas le lendemain). Ces référentiels, souvent annexés au règlement intérieur soignant, donnent un cadre clair qui réduit les interprétations personnelles.",
          "Deuxièmement, ils font de la revue documentaire un rituel de management : chaque semaine, le cadre de santé ou l'IDEC consulte un échantillon de dossiers et restitue ses observations en réunion d'équipe, en valorisant les bonnes pratiques autant qu'en signalant les manques. Cette approche transforme la traçabilité d'une contrainte individuelle en responsabilité collective. Troisièmement, ils ont investi dans des outils réduisant la friction de la saisie. Des enquêtes menées auprès de soignants en EHPAD (DREES, 2023) montrent que la principale raison des transmissions incomplètes n'est pas le manque de volonté mais le manque de temps et l'accessibilité des terminaux en fin de poste.",
        ],
      },
      {
        heading: "Comment Speakli répond aux exigences de traçabilité",
        paragraphs: [
          "Speakli a été conçu en réponse directe aux obligations réglementaires de traçabilité en EHPAD. Son fonctionnement est simple : le soignant dicte ses observations à voix haute, immédiatement après l'acte de soin, sans interrompre sa présence auprès du résident. L'IA transcrit, structure et intègre ces observations dans le Dossier Usager Informatisé (DUI) en temps réel. La transmission est horodatée, nominative et rattachée au résident concerné, trois exigences formelles du référentiel HAS.",
          "Pour les établissements déployant Speakli, les audits documentaires internes montrent une augmentation moyenne de 40 % du nombre de transmissions quotidiennes complètes, et une réduction de 60 % des transmissions lacunaires (sans évaluation de la douleur ni description de l'état général). Ces données, mesurées sur les cohortes de déploiement du programme ANS Structure 3.0, illustrent qu'un outil adapté au terrain peut transformer structurellement la qualité de la traçabilité, sans alourdir la charge des soignants, mais en la rendant plus fluide et plus naturelle.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "CASF art. L. 311-3, D. 312-158, Droit à la qualité, dossier de soins individualisé (légifrance.gouv.fr)",
          "HAS, Manuel de certification des EHPAD 2024, critère impératif « traçabilité des soins » (has-sante.fr)",
          "Arrêté du 6 avril 2011 relatif au management de la qualité de la prise en charge médicamenteuse (légifrance.gouv.fr)",
          "Circulaire DGCS/SD3A/2013/134, Évaluation interne des EHPAD : recommandations documentaires",
          "Cour des comptes, Rapport 2022 sur les EHPAD : qualité de la documentation soignante (ccomptes.fr)",
          "DGCS, Données d'inspection 2023 : 12 % des EHPAD inspectés, injonction sur transmissions/dossier de soins",
          "Jurisprudence constante, Absence de traçabilité soignante retenue comme présomption de faute en cas de plainte (juridictions civiles et administratives)",
          "DREES, Enquête conditions de travail en EHPAD 2023 : causes des transmissions incomplètes",
        ],
      },
    ],
  },
  {
    slug: "prevention-chutes-ehpad-protocole-tracabilite",
    title:
      "Prévention des chutes en EHPAD : protocoles, documentation et responsabilité",
    category: "Qualité des soins",
    categoryBg: "#E8F5E9",
    categoryColor: "#2e7d32",
    date: "Avril 2026",
    excerpt:
      "Les chutes représentent la première cause de mortalité accidentelle chez les plus de 65 ans et engagent directement la responsabilité de l'EHPAD. Entre obligation de protocole, exigences documentaires et enjeux médico-légaux, voici ce que chaque directeur doit maîtriser.",
    cardBg: "#0a1a0a",
    isThematic: true,
    readingTime: "8 min",
    content: [
      {
        heading: "L'épidémiologie des chutes : un enjeu de santé publique majeur",
        paragraphs: [
          "Les chutes constituent la première cause de mortalité accidentelle chez les personnes de plus de 65 ans en France, selon les données de Santé Publique France. Chaque année, environ 450 000 hospitalisations sont liées à des chutes chez les personnes âgées, dont une part significative survient en EHPAD. Selon l'étude nationale DREES 2022 sur les événements indésirables graves (EIG) en établissements médico-sociaux, les chutes représentent 38 % des EIG déclarés en EHPAD, loin devant les autres catégories.",
          "En EHPAD, le taux de chutes est particulièrement élevé du fait du profil des résidents : polypathologie, polymédication (dont les psychotropes qui augmentent le risque de chute de 40 à 60 % selon la HAS), troubles cognitifs et déclin fonctionnel. La HAS estime qu'un résident en EHPAD chute en moyenne 1,5 fois par an, et que 30 % de ces chutes entraînent une blessure physique. Le coût médical moyen d'une chute avec fracture du col du fémur dépasse 20 000 € selon l'Assurance Maladie. La prévention des chutes n'est donc pas seulement un enjeu éthique et juridique, c'est un enjeu économique de premier plan.",
        ],
      },
      {
        heading: "Les obligations protocolaires : ce que la réglementation impose",
        paragraphs: [
          "L'obligation de protocole de prévention des chutes en EHPAD est explicitement prévue par le référentiel qualité HAS (manuel de certification 2024, critère « sécurité et prévention des risques »). Ce référentiel impose que chaque établissement dispose d'un protocole formalisé comprenant : une évaluation systématique du risque de chute à l'admission et à chaque modification de l'état de santé (outil validé : échelle de Morse, Tinetti ou Stratify), des mesures préventives individualisées consignées dans le projet de soins, une procédure de prise en charge post-chute incluant l'évaluation des conséquences et la révision des mesures préventives.",
          "La circulaire DGCS n°2010-179 du 31 mai 2010 relative à la qualité en EHPAD recommande par ailleurs l'inscription de la prévention des chutes dans le projet d'établissement, avec des indicateurs de suivi annuels. Ces indicateurs, nombre de chutes par mois, taux de chutes avec blessure, taux d'évaluation du risque à l'admission, doivent figurer dans le rapport d'activité et être présentés au Conseil de la Vie Sociale. Un établissement incapable de produire ces indicateurs lors d'une inspection ARS s'expose à une recommandation formelle de mise en conformité.",
        ],
      },
      {
        heading: "Les exigences documentaires et leurs enjeux médico-légaux",
        paragraphs: [
          "La documentation d'une chute obéit à des règles précises dont le non-respect peut avoir des conséquences lourdes. Immédiatement après la chute, le soignant présent doit consigner dans le DUI : l'heure et le lieu de la chute, les circonstances observées, l'état du résident avant et après, les lésions constatées et les premiers soins administrés, l'information des proches et du médecin traitant. Dans les 24 heures, le médecin coordonnateur ou le médecin traitant doit documenter son évaluation et ses prescriptions. Dans les 72 heures, une analyse des causes de la chute doit être réalisée en équipe pluridisciplinaire et tracée.",
          "Sur le plan médico-légal, la jurisprudence administrative et civile est exigeante. Les juridictions ont retenu la responsabilité d'EHPAD non pas pour la chute elle-même, dont le risque zéro est impossible, mais pour l'absence de traçabilité de l'évaluation préalable du risque et l'absence de mesures préventives documentées dans le dossier. Le principe est constant : la documentation ne prouve pas l'absence de faute, mais son absence peut constituer une faute en elle-même.",
        ],
      },
      {
        heading:
          "La documentation en temps réel : comment l'IA vocale change la pratique",
        paragraphs: [
          "La principale difficulté documentaire autour des chutes est la contrainte de temps réel : la chute survient de manière inattendue, le soignant doit gérer l'urgence immédiate (mise en sécurité, appel médical, réconfort du résident), et la documentation se retrouve systématiquement repoussée. En fin de poste, les détails précis, l'heure exacte, la position du résident au sol, les circonstances précises, commencent à s'effacer de la mémoire. C'est cette fenêtre de documentation différée qui génère la majorité des lacunes observées lors des audits.",
          "L'IA vocale permet de résoudre ce problème en permettant au soignant de dicter ses observations immédiatement, sans interrompre la prise en charge, le temps d'une observation orale de 30 secondes, faite pendant que le résident est encore sous surveillance. Ces observations sont automatiquement horodatées, structurées et intégrées au dossier. Le cadre de santé peut ensuite consulter la complétude de la documentation post-chute en temps réel, et relancer les soignants si des éléments manquent. Cette approche réduit également le risque d'erreurs de mémoire et de reconstructions a posteriori qui fragilisent la position de l'établissement en cas de contentieux.",
        ],
      },
      {
        heading:
          "Construire une culture de prévention : au-delà du protocole formel",
        paragraphs: [
          "Un protocole de prévention des chutes ne vaut que si les équipes se l'approprient. Les établissements qui obtiennent les meilleurs résultats en matière de prévention des chutes ont en commun une culture documentaire forte : les soignants comprennent que tracer l'évaluation du risque n'est pas de la bureaucratie mais un acte clinique qui protège le résident et l'établissement. Cette culture se construit par la formation (inclure la prévention des chutes dans les journées de formation annuelles obligatoires), par le partage régulier des données (présenter le bilan mensuel des chutes en réunion d'équipe), et par la valorisation des déclarations d'EIG.",
          "La déclaration des EIG via le système e-SATIS ou le portail de signalement de l'ARS est encore sous-utilisée dans beaucoup d'établissements, par crainte des conséquences. C'est pourtant une obligation réglementaire (article L. 1413-14 du Code de la santé publique) et, surtout, un outil de pilotage. Les établissements qui déclarent systématiquement leurs chutes et analysent les données accumulées sont ceux qui, au fil du temps, réduisent le plus efficacement leur taux de récidive, parce qu'ils identifient les facteurs de risque spécifiques à leur population et ajustent leurs protocoles en conséquence.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "Santé Publique France, Chutes : première cause de mortalité accidentelle chez les +65 ans ; 450 000 hospitalisations/an (santepubliquefrance.fr)",
          "DREES, Étude sur les événements indésirables graves en ESMS 2022 : chutes = 38 % des EIG en EHPAD",
          "HAS, Manuel de certification des EHPAD 2024, critère « sécurité et prévention des risques » (has-sante.fr)",
          "HAS, Prévention des chutes accidentelles chez la personne âgée, recommandation de bonne pratique (has-sante.fr)",
          "Assurance Maladie, Coût moyen d'une fracture du col du fémur : >20 000 € (ameli.fr)",
          "Circulaire DGCS n°2010-179 du 31 mai 2010, Qualité en EHPAD, prévention des chutes et indicateurs de suivi",
          "Jurisprudence constante, Responsabilité EHPAD engagée pour absence de traçabilité du risque de chute (juridictions administratives et civiles)",
          "Code de la santé publique art. L. 1413-14, Obligation de déclaration des événements indésirables graves",
        ],
      },
    ],
  },
  {
    slug: "inspection-ars-ehpad-preparation",
    title: "Inspection ARS en EHPAD : comment préparer votre établissement",
    category: "Réglementation & Conformité",
    categoryBg: "#FFF3E0",
    categoryColor: "#C65900",
    date: "Mai 2026",
    excerpt:
      "Une inspection ARS peut survenir à tout moment et déboucher sur une injonction, une mise sous administration provisoire ou une fermeture partielle. Voici ce que les inspecteurs contrôlent réellement, les défaillances les plus fréquentes, et comment préparer votre établissement sur 6 à 12 mois.",
    cardBg: "#1a0a00",
    isThematic: true,
    readingTime: "10 min",
    content: [
      {
        heading: "Ce que l'ARS vérifie lors d'une inspection",
        paragraphs: [
          "Les Agences Régionales de Santé (ARS) disposent d'un pouvoir d'inspection des établissements médico-sociaux fondé sur les articles L. 313-13 et suivants du CASF. Ce pouvoir est exercé par les inspecteurs de l'Agence, qui peuvent intervenir à tout moment, sur signal (plainte d'un résident, d'une famille ou d'un soignant), sur programme (visites planifiées de contrôle), ou en urgence (décès suspect, signalement grave). Selon le rapport annuel de la DGCS de 2024, 847 visites d'inspection ont été réalisées dans des EHPAD sur l'année, dont 38 % à la suite d'un signalement.",
          "L'inspection porte sur trois domaines principaux. D'abord, la qualité de la prise en charge : adéquation de l'effectif soignant aux besoins, continuité des soins, gestion des urgences, respect du projet de soins individualisé. Ensuite, la conformité documentaire : tenue et mise à jour du dossier de soins, qualité des transmissions, traçabilité des évaluations standardisées, gestion du dossier administratif et du contrat de séjour. Enfin, la gouvernance et le management : fonctionnement du Conseil de la Vie Sociale, existence et application du règlement de fonctionnement, gestion des réclamations, formation du personnel.",
        ],
      },
      {
        heading: "Les défaillances les plus fréquemment relevées",
        paragraphs: [
          "L'analyse des rapports d'inspection ARS publiés par les ARS régionales (notamment Île-de-France, Auvergne-Rhône-Alpes et PACA, qui publient des synthèses annuelles) révèle des défaillances récurrentes. En matière documentaire, les problèmes les plus fréquents sont : les transmissions incomplètes ou inexistantes sur certaines nuits de week-end, l'absence d'évaluation systématique de la douleur à l'admission et à chaque épisode douloureux, la non-traçabilité des refus de soins, et les dossiers de soins partiels pour les résidents en fin de vie.",
          "En matière de gouvernance, les défaillances récurrentes incluent : un Conseil de la Vie Sociale (CVS) ne se réunissant pas aux fréquences réglementaires (3 fois par an minimum selon l'article D. 311-9 du CASF), un règlement de fonctionnement non mis à jour depuis plus de 3 ans, et l'absence de procédure formalisée de gestion des réclamations. Sur le plan des ressources humaines, les inspecteurs relèvent fréquemment des taux d'encadrement inférieurs aux normes, une utilisation intensive de l'intérim sans formation préalable aux protocoles de l'établissement, et l'absence de tableaux de bord de suivi des absences et des remplacements.",
        ],
      },
      {
        heading: "Préparer l'inspection sur 6 à 12 mois : le calendrier",
        paragraphs: [
          "Une préparation sérieuse à une inspection ARS nécessite au minimum 6 mois de travail structuré, idéalement 12 mois. Entre J-12 et J-9 mois, l'effort doit porter sur le diagnostic interne : audit de la conformité documentaire (20 dossiers tirés au sort, grille HAS), état des protocoles (à jour ? validés médicalement ? connus des équipes ?), état du CVS et des registres réglementaires. Cette phase permet d'identifier les zones rouges à traiter en priorité.",
          "Entre J-9 et J-6 mois, le travail porte sur la remédiation des défaillances identifiées : mise à jour des protocoles, formation ciblée des soignants sur les éléments manquants (traçabilité de la douleur, gestion des EIG), reconstitution des instances de gouvernance si elles sont défaillantes. Entre J-6 et J-3 mois, vient la phase de consolidation : audit interne de contrôle, simulation d'inspection avec un regard extérieur (consultant, réseau associatif), actualisation du projet d'établissement si nécessaire. Dans les 3 derniers mois, le travail est principalement documentaire : vérifier que les archives sont accessibles, organisées et datées sur les 5 dernières années comme l'exige l'article L. 313-17 du CASF.",
        ],
      },
      {
        heading: "La qualité documentaire : l'enjeu central de l'inspection",
        paragraphs: [
          "Dans la grande majorité des inspections défavorables, la défaillance documentaire est citée comme motif principal ou comme facteur aggravant. Les inspecteurs ne peuvent pas observer directement chaque acte de soin, ils évaluent la qualité de la prise en charge à travers ce que les dossiers révèlent. Un établissement dont les transmissions sont complètes, horodatées, pertinentes et continues envoie un signal fort de professionnalisme même si d'autres points restent perfectibles.",
          "Les inspecteurs de l'ARS utilisent généralement une grille d'évaluation de la qualité documentaire comprenant : le taux de complétude des transmissions quotidiennes (objectif : >90 % des postes tracés), la présence systématique des évaluations standardisées à l'admission, la traçabilité des 5 derniers épisodes de douleur de chaque résident consulté, la documentation des 3 dernières chutes et des mesures prises en conséquence. Sur chacun de ces critères, des benchmarks nationaux sont disponibles dans les publications de la CNSA, un établissement bien préparé connaît sa position relative.",
        ],
      },
      {
        heading:
          "Les risques en cas d'injonction : ce que l'établissement encourt",
        paragraphs: [
          "En cas de constat de non-conformités graves lors d'une inspection, l'ARS dispose d'un arsenal de mesures graduées. L'injonction (article L. 313-14 du CASF) impose à l'établissement de se mettre en conformité dans un délai fixé, en général de 3 à 6 mois. Elle est assortie d'une mesure de contrôle et peut, en cas de non-respect du délai, être suivie d'une mise sous administration provisoire, d'une réduction de la capacité d'accueil ou d'une fermeture partielle. Ces mesures sont publiques : elles sont notifiées au gestionnaire, à l'ARS financeur, et peuvent, dans certains cas, donner lieu à des communiqués régionaux.",
          "Le risque financier associé est significatif : une réduction de capacité de 20 lits pendant 6 mois représente une perte de recettes de l'ordre de 180 000 € pour un établissement tarifé à un coût journalier moyen de 100 €. La mise sous administration provisoire entraîne des frais d'administrateur qui sont généralement facturés à l'établissement. Au-delà du risque financier, le risque réputationnel, auprès des familles, des résidents potentiels et des partenaires, est souvent plus durable. Prévenir une injonction coûte structurellement moins cher que d'en gérer les conséquences.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "CASF art. L. 313-13 et suivants, Pouvoir d'inspection des ARS sur les ESMS (légifrance.gouv.fr)",
          "CASF art. D. 311-9, Fréquence minimale des réunions du Conseil de la Vie Sociale (3 fois/an)",
          "CASF art. L. 313-14, Procédure d'injonction et mesures graduées de l'ARS",
          "CASF art. L. 313-17, Conservation des archives réglementaires (5 ans minimum)",
          "DGCS, Rapport annuel d'activité d'inspection 2024 : 847 visites en EHPAD, 38 % sur signalement",
          "ARS Île-de-France / ARA / PACA, Synthèses annuelles des inspections EHPAD (publications régionales)",
          "CNSA, Indicateurs de qualité documentaire en EHPAD, benchmarks nationaux (cnsa.fr)",
          "HAS, Manuel de certification des EHPAD 2024 : grilles d'évaluation documentaire (has-sante.fr)",
        ],
      },
    ],
  },
  {
    slug: "charge-administrative-soignants-solutions",
    title:
      "Réduire la charge administrative des soignants en EHPAD : 5 leviers concrets",
    category: "Management & RH",
    categoryBg: "#FEF3C7",
    categoryColor: "#92400e",
    date: "Mai 2026",
    excerpt:
      "Les soignants consacrent entre 30 et 40 % de leur temps de travail à des tâches administratives, transmissions, saisie, dossiers, au détriment du temps auprès des résidents. Voici 5 leviers concrets, avec leur ROI estimé, pour inverser cette tendance.",
    cardBg: "#001829",
    isThematic: true,
    readingTime: "7 min",
    content: [
      {
        heading: "Quantifier le problème : combien de temps perd-on réellement ?",
        paragraphs: [
          "Avant d'agir, il faut mesurer. Les études disponibles sur la charge administrative des soignants en EHPAD convergent vers un chiffre préoccupant. Selon une étude publiée par la DREES en 2023 sur les conditions de travail en EHPAD, les aides-soignants passent en moyenne 28 % de leur temps de travail à des tâches non directement liées au soin, essentiellement la saisie informatique, les transmissions écrites, la gestion des fiches de suivi et les temps de relève. Pour les infirmiers, ce taux monte à 38 % en raison des prescriptions, des ordonnances et des dossiers de soins plus complexes.",
          "Sur un poste de 7h30, cela représente entre 2h et 3h consacrées à de l'administratif chaque jour. Rapporté à une équipe de 15 soignants en ETP, c'est l'équivalent de 5 à 6 postes à temps plein entièrement absorbés par des tâches documentaires, sans générer de valeur soignante directe. Cette donnée change la perspective sur l'investissement dans des outils de réduction de la charge : même une réduction de 30 % du temps administratif libère l'équivalent de 1,5 à 2 ETP par établissement de taille standard.",
        ],
      },
      {
        heading:
          "Levier 1, La dictée vocale pour les transmissions quotidiennes",
        paragraphs: [
          "La dictée vocale est le levier le plus immédiatement opérationnel pour réduire la charge administrative soignante. Son principe est simple : au lieu de saisir les transmissions sur un terminal en fin de poste, le soignant les dicte à voix haute pendant ou juste après l'acte de soin. L'outil transcrit, structure et intègre automatiquement ces observations dans le DUI.",
          "Les gains mesurés sur les établissements ayant déployé Speakli dans le cadre du programme ANS Structure 3.0 montrent une réduction de 35 à 45 minutes de saisie quotidienne par soignant, soit une réduction de 20 à 25 % du temps administratif total. Pour un EHPAD de 80 résidents avec 12 soignants par jour, cela représente 7 à 9 heures de temps soignant libéré quotidiennement, soit l'équivalent d'un poste supplémentaire à temps partiel. Ce levier est également le plus rapide à déployer : l'adoption est généralement complète en 4 à 6 semaines avec un accompagnement adapté.",
        ],
      },
      {
        heading:
          "Levier 2, Standardiser et simplifier les formulaires de suivi",
        paragraphs: [
          "Beaucoup d'EHPAD accumulent au fil des années des formulaires de suivi redondants, fiches de chutes, fiches de douleur, fiches de contention, fiches nutritionnelles, qui coexistent avec des entrées correspondantes dans le logiciel métier. Ce doublon papier-numérique est l'une des sources de charge administrative les plus sous-estimées : le soignant saisit la même information deux fois.",
          "Un audit des formulaires en circulation dans l'établissement révèle souvent qu'un tiers d'entre eux sont redondants avec des champs déjà présents dans le DUI, un autre tiers ne sont jamais utilisés par personne, et un tiers sont réellement utiles. Supprimer les formulaires redondants, dématérialiser les formulaires utiles (en les intégrant comme modèles dans le DUI), et former les équipes à cette simplification peut réduire le temps administratif de 10 à 15 % supplémentaires, sans aucun investissement technologique.",
        ],
      },
      {
        heading: "Levier 3, Optimiser les temps de relève",
        paragraphs: [
          "La relève, moment de transmission orale entre les équipes entrante et sortante, dure en moyenne 25 à 35 minutes dans la plupart des EHPAD. Cette durée est souvent le signe d'une documentation insuffisante en cours de poste : si les transmissions écrites sont incomplètes, la relève orale doit compenser par une narration détaillée. Dans les établissements où la documentation est exhaustive et structurée, les relèves durent 10 à 15 minutes, le temps de cibler les résidents qui nécessitent une attention particulière.",
          "Restructurer la relève autour d'une lecture commentée des transmissions du jour (plutôt qu'une narration de mémoire) change radicalement son efficacité. Cette approche nécessite que les transmissions soient accessibles sur un terminal partagé pendant la relève, et, idéalement, que l'équipe sortante ait complété ses saisies avant le début de celle-ci. Des protocoles de relève structurée (type SBAR : Situation, Background, Assessment, Recommendation) ont montré une réduction de 30 % de la durée des relèves dans les établissements qui les appliquent systématiquement, selon une étude publiée dans la revue Soins Gérontologie en 2022.",
        ],
      },
      {
        heading:
          "Leviers 4 et 5, Délégation et formation ciblée sur les outils",
        paragraphs: [
          "Le levier 4 est la délégation organisée des tâches administratives non-soignantes. Certaines tâches aujourd'hui effectuées par des IDE, saisie des entrées-sorties, mise à jour des données administratives du dossier, gestion des prescriptions imprimées, peuvent être déléguées à un agent administratif ou à un secrétaire médical à temps partiel. Cette délégation, bien encadrée par une procédure écrite, libère les IDE pour les tâches à valeur soignante ajoutée. Dans les établissements ayant mis en place ce type de délégation, le gain est évalué à 45 à 60 minutes par IDE et par jour.",
          "Le levier 5 est souvent négligé : la formation continue et ciblée aux outils numériques en place. La majorité des établissements possèdent un logiciel métier capable de beaucoup plus que ce que les équipes en utilisent réellement. Des fonctionnalités comme les modèles de transmissions, les alertes automatiques, les bilans hebdomadaires pré-remplis sont souvent méconnues. Une formation de 2 heures par équipe sur les fonctionnalités avancées du DUI existant génère en moyenne une réduction de 15 % du temps de saisie, selon les retours des formateurs des principaux éditeurs de logiciels EHPAD (Titan, Netsoins, Osiris, Cerner). Le ROI de cette formation, quasi-nul en coût, immédiat en gain, en fait l'un des leviers les plus accessibles.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "DREES, Étude conditions de travail en EHPAD 2023 : 28-38 % du temps soignant consacré à des tâches administratives (drees.solidarites-sante.gouv.fr)",
          "CNSA, Programme ESMS Numérique : gains mesurés sur les établissements pilotes ANS Structure 3.0 (cnsa.fr)",
          "Revue Soins Gérontologie, Étude sur la relève structurée SBAR en EHPAD : -30 % de durée (2022)",
          "OPCO Santé, Guide RH EHPAD : ETP équivalents dégagés par la réduction de la charge administrative (opcosante.fr)",
          "Retours terrain éditeurs logiciels EHPAD, Gains de temps par formation aux fonctionnalités avancées",
        ],
      },
    ],
  },
  {
    slug: "hds-rgpd-logiciel-soins-ehpad",
    title:
      "HDS et RGPD en EHPAD : ce que la loi impose à votre logiciel de soins",
    category: "Réglementation & Conformité",
    categoryBg: "#FFF3E0",
    categoryColor: "#C65900",
    date: "Mai 2026",
    excerpt:
      "Depuis 2018, tout logiciel manipulant des données de santé en EHPAD doit être hébergé sur infrastructure certifiée HDS. Le RGPD ajoute des obligations spécifiques sur les données sensibles. Ce que vous devez vérifier dans votre contrat prestataire, et ce que vous risquez si ce n'est pas en ordre.",
    cardBg: "#0d0420",
    isThematic: true,
    readingTime: "8 min",
    content: [
      {
        heading: "La certification HDS : obligatoire depuis 2018, encore mal connue",
        paragraphs: [
          "La certification Hébergement de Données de Santé (HDS) est encadrée par l'article L. 1111-8 du Code de la santé publique, modifié par la loi du 26 janvier 2016 de modernisation du système de santé. Depuis le 1er avril 2018, tout prestataire qui héberge des données de santé à caractère personnel pour le compte d'un professionnel ou d'un établissement de santé doit être titulaire de la certification HDS délivrée par un organisme accrédité par le COFRAC.",
          "Cette obligation s'applique à toute solution numérique utilisée en EHPAD qui collecte, stocke ou traite des données de santé : logiciels de DUI (Dossier Usager Informatisé), solutions de dictée vocale, outils de suivi des constantes, applications de communication avec les familles incluant des données médicales. L'arrêté du 26 avril 2024, qui a étendu la certification HDS aux prestataires établis dans l'Espace Économique Européen (EEE), a mis fin à une pratique courante consistant à utiliser des solutions cloud étrangères non certifiées. La liste des hébergeurs certifiés est consultable et actualisée en temps réel sur le site de l'ANS (esante.gouv.fr/hds).",
        ],
      },
      {
        heading:
          "Ce que la certification HDS implique concrètement pour un prestataire",
        paragraphs: [
          "La certification HDS repose sur un référentiel en deux parties. La partie 1 porte sur les activités d'hébergement physique : l'infrastructure (datacenter, serveurs, réseau) doit répondre à des exigences strictes de disponibilité, de sécurité physique et de redondance. La partie 2 porte sur les activités d'hébergement infogéré : l'exploitation, la maintenance, la sauvegarde et la restitution des données. Un prestataire peut être certifié sur l'une ou les deux parties. Un éditeur de logiciel EHPAD qui utilise un datacenter certifié HDS Partie 1 mais ne dispose pas lui-même de la certification Partie 2 pour ses activités d'exploitation n'est pas en conformité.",
          "La certification HDS est valable 3 ans et fait l'objet d'audits de surveillance annuels. Elle implique notamment : une politique de sécurité formalisée (PSSI), un plan de continuité d'activité (PCA) testé régulièrement, des procédures de notification des incidents de sécurité dans les délais réglementaires (72 heures pour la CNIL en cas de violation de données), et des mécanismes de traçabilité des accès aux données. Lors de la signature d'un contrat avec un prestataire numérique en EHPAD, la vérification de la certification HDS est une due diligence non-négociable.",
        ],
      },
      {
        heading:
          "RGPD et données de santé : les obligations spécifiques aux EHPAD",
        paragraphs: [
          "Le Règlement Général sur la Protection des Données (RGPD, règlement UE 2016/679) classe les données de santé comme données « sensibles » au sens de l'article 9, dont le traitement est en principe interdit sauf exceptions spécifiques. Les EHPAD bénéficient de l'exception prévue à l'article 9.2.h (traitement nécessaire à des fins de médecine préventive ou de médecine du travail), mais cette exception n'exonère pas des autres obligations du RGPD.",
          "En pratique, un EHPAD est responsable de traitement au sens du RGPD pour toutes les données de santé de ses résidents. À ce titre, il doit : tenir un registre des activités de traitement (article 30 RGPD), nommer un Délégué à la Protection des Données (DPO), obligatoire pour les établissements traitant des données de santé à grande échelle (guidelines CNIL, 2023), réaliser une Analyse d'Impact relative à la Protection des Données (AIPD) pour les traitements présentant un risque élevé (article 35 RGPD), et encadrer contractuellement ses prestataires par des clauses de sous-traitance conformes (article 28 RGPD). Selon la CNIL, 62 % des établissements de santé et médico-sociaux contrôlés en 2023 présentaient des lacunes sur au moins un de ces points.",
        ],
      },
      {
        heading: "Ce qu'il faut vérifier dans votre contrat prestataire",
        paragraphs: [
          "Un contrat avec un prestataire de logiciel de soins en EHPAD doit obligatoirement contenir, sous peine de non-conformité RGPD, un accord de sous-traitance (Data Processing Agreement, DPA) précisant : la liste et la finalité des traitements réalisés, les garanties de sécurité mises en œuvre (en lien avec la certification HDS), la localisation des données (en France ou dans l'EEE), les modalités de notification des violations de données, les conditions de suppression ou restitution des données en fin de contrat.",
          "Au-delà du DPA, plusieurs clauses contractuelles doivent faire l'objet d'une attention particulière. La clause de localisation des données : les données de santé des résidents doivent être hébergées en France ou dans l'Union Européenne, tout transfert hors UE sans mécanisme de protection adéquat (clauses contractuelles types de la Commission européenne ou décision d'adéquation) est illégal. La clause de sous-traitance en cascade : si le prestataire fait appel à des sous-traitants (opérateurs cloud, mainteneurs), il doit les identifier et s'engager à leur imposer les mêmes obligations. La clause de droit d'audit : l'EHPAD doit pouvoir vérifier la conformité du prestataire, un prestataire qui refuse ce droit n'est pas en conformité avec l'article 28.3.h du RGPD.",
        ],
      },
      {
        heading: "Les sanctions encourues et la conformité de Speakli",
        paragraphs: [
          "Les sanctions pour non-conformité HDS et RGPD sont substantielles. Sur le plan RGPD, la CNIL peut infliger des amendes allant jusqu'à 4 % du chiffre d'affaires annuel mondial ou 20 millions d'euros (le plus élevé étant retenu). Des sanctions significatives ont été prononcées dans le secteur de la santé : Dedalus Biologie a écopé d'une amende de 1,5 million d'euros en 2022 suite à une violation massive de données médicales. Pour un EHPAD, même une sanction symbolique de quelques dizaines de milliers d'euros peut être financièrement déstabilisante. Sur le plan HDS, l'utilisation d'un hébergeur non certifié constitue une infraction pénale pouvant être sanctionnée par 1 an d'emprisonnement et 15 000 € d'amende (article L. 1115-1 du Code de la santé publique).",
          "Speakli est hébergé sur une infrastructure certifiée HDS (Parties 1 et 2), exploitée en France. L'ensemble des données de santé traitées restent sur le territoire français et ne font l'objet d'aucun transfert hors UE. Speakli met à disposition de chaque établissement partenaire un DPA conforme, un registre des traitements pré-rempli et une documentation AIPD. La liste des sous-traitants est disponible sur demande et fait l'objet d'une mise à jour trimestrielle. Ces éléments permettent à chaque directeur d'EHPAD de justifier sa conformité HDS/RGPD sans effort documentaire supplémentaire.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "Code de la santé publique art. L. 1111-8, Obligation de certification HDS pour l'hébergement de données de santé",
          "Arrêté du 26 avril 2024, Extension de la certification HDS aux prestataires établis dans l'EEE (légifrance.gouv.fr)",
          "ANS, Liste des hébergeurs certifiés HDS, mise à jour en temps réel (esante.gouv.fr/hds)",
          "Règlement UE 2016/679 (RGPD), Art. 9 (données sensibles), art. 28 (sous-traitance), art. 30 (registre), art. 35 (AIPD)",
          "CNIL, Guidelines DPO pour les établissements de santé et médico-sociaux (2023) ; bilan des contrôles 2023 : 62 % de lacunes (cnil.fr)",
          "CNIL, Délibération Dedalus Biologie 2022 : amende 1,5 M€ pour violation de données de santé (cnil.fr)",
          "Code de la santé publique art. L. 1115-1, Sanctions pénales pour hébergement non certifié HDS",
        ],
      },
    ],
  },
  {
    slug: "dossier-soin-informatise-ehpad-guide",
    title:
      "Dossier de Soins Informatisé en EHPAD : avantages, transition et critères de choix",
    category: "Numérique & IA",
    categoryBg: "#EEF2FF",
    categoryColor: "#3730a3",
    date: "Mai 2026",
    excerpt:
      "Le dossier de soins papier appartient au passé réglementaire : la loi pousse les EHPAD vers l'informatisation complète. Comment comparer les solutions, gérer la transition, et éviter les pièges d'un choix précipité ? Le guide complet pour les directeurs et cadres de santé.",
    cardBg: "#001820",
    isThematic: true,
    readingTime: "9 min",
    content: [
      {
        heading: "DSI vs papier : pourquoi la comparaison ne tient plus",
        paragraphs: [
          "Pendant longtemps, certains directeurs d'EHPAD ont défendu le dossier de soins papier avec des arguments légitimes : les soignants le connaissent, il ne tombe pas en panne, il ne coûte pas de licence annuelle. Ces arguments ont perdu de leur pertinence face à deux évolutions simultanées. D'abord, une évolution réglementaire : le programme ESMS Numérique de l'ANS, financé par le Ségur de la Santé, fait du Dossier Usager Informatisé (DUI) une condition d'éligibilité aux financements publics dans le cadre de l'article L. 312-9-2 du CASF introduit par la loi de financement de la Sécurité Sociale 2023. En clair, les établissements non informatisés seront progressivement exclus des enveloppes de financement numérique.",
          "Ensuite, une évolution de terrain : la qualité documentaire dans les établissements utilisateurs d'un DUI est mesurée comme significativement supérieure. L'ANS a publié en 2024 une étude comparative sur 420 EHPAD montrant que les établissements avec DUI affichent un taux de complétude des transmissions de 87 % contre 58 % pour les établissements encore au papier. Cet écart de 29 points se traduit directement en différentiel de qualité de prise en charge, et, rappelons-le, en différentiel de dotation GMPS lors des coupes PATHOS. Le papier a un coût caché qui dépasse souvent le coût d'une licence logicielle.",
        ],
      },
      {
        heading:
          "Les exigences réglementaires pour le Dossier Usager Informatisé",
        paragraphs: [
          "Le DUI en EHPAD n'est pas libre dans sa conception : il doit répondre à un référentiel défini par l'ANS dans le cadre du programme ESMS Numérique. Ce référentiel, publié en version 2.0 en mars 2024, précise les fonctionnalités minimales obligatoires : gestion du projet de soins individualisé, traçabilité des évaluations standardisées (GIR, PATHOS, MNA, EVA), transmissions ciblées structurées, gestion des prescriptions et des actes, compatibilité HL7 FHIR pour l'interopérabilité.",
          "La conformité au référentiel ANS conditionne l'éligibilité au financement ESMS Numérique. Les logiciels conformes sont référencés sur le catalogue de solutions de l'ANS (solutions.esante.gouv.fr). Un EHPAD qui choisit un logiciel non référencé ne pourra pas bénéficier des enveloppes du Ségur, et risque de se retrouver en dehors de l'écosystème d'interopérabilité qui se met en place entre les EHPAD, les hôpitaux et les médecins de ville. La traçabilité des données, leur exportabilité et leur compatibilité avec les messageries sécurisées de santé (MSSanté) font partie des critères de conformité.",
        ],
      },
      {
        heading: "Les critères de choix essentiels pour un DSI en EHPAD",
        paragraphs: [
          "Le choix d'un logiciel de soins est une décision stratégique qui engage l'établissement sur 5 à 10 ans. Plusieurs critères sont déterminants. L'interopérabilité est le premier : le logiciel doit communiquer avec les systèmes environnants, messagerie sécurisée MSSanté pour les transmissions aux médecins traitants, connexion avec le Dossier Médical Partagé (DMP) pour les échanges hospitaliers, compatibilité avec les solutions de pharmacie pour la gestion des prescriptions. Un logiciel en silo, même excellent en usage interne, devient un frein dès que l'établissement doit coordonner avec des partenaires extérieurs.",
          "La facilité d'utilisation est le deuxième critère, souvent sous-évalué lors de l'achat. Un outil complexe, avec de nombreuses étapes pour saisir une observation simple, génère des résistances et des contournements. Les taux d'adoption réels, mesurables par les éditeurs à partir des logs de connexion, varient de 40 % à 95 % selon les solutions, pour des établissements aux profils comparables. Demandez systématiquement au prestataire ses données de taux d'adoption observés chez ses clients, et demandez à parler à des directeurs d'établissements utilisateurs.",
        ],
      },
      {
        heading:
          "Gérer la transition : les pièges à éviter et les facteurs de succès",
        paragraphs: [
          "La transition d'un dossier papier vers un DUI, ou d'un ancien logiciel vers un nouveau, est l'étape la plus critique du projet. Les erreurs les plus fréquentes sont : vouloir migrer toutes les données historiques d'un coup (chronophage et source d'erreurs), former les équipes trop tard et trop vite (une formation de 2 heures la veille du démarrage est insuffisante), et sous-estimer la résistance des profils les moins à l'aise avec le numérique. Ces erreurs sont documentées dans le rapport ANS de 2023 sur les retours d'expérience des déploiements ESMS Numérique.",
          "Les facteurs de succès sont les mêmes que pour tout projet de transformation numérique en EHPAD (voir notre article dédié à la conduite du changement) : un champion interne désigné et formé en profondeur avant le déploiement, un pilote sur une unité avant la généralisation, des formations en petits groupes avec du temps de pratique supervisée, et un support prestataire disponible pendant les 4 premières semaines. La CNSA recommande également une phase de double saisie papier-numérique de 2 à 4 semaines pour sécuriser la transition sans perdre de données.",
        ],
      },
      {
        heading:
          "Évaluer les vendeurs : les questions à poser avant de signer",
        paragraphs: [
          "Avant toute signature, plusieurs questions doivent obtenir des réponses claires et vérifiables. Sur la conformité : « Votre solution est-elle référencée sur le catalogue ANS ESMS Numérique ? Quelle est votre certification HDS (Parties 1 et 2) et par quel organisme ? » Sur l'interopérabilité : « Supportez-vous les standards HL7 FHIR R4 pour les échanges de données ? Êtes-vous connecté à la MSSanté et au DMP ? » Sur l'adoption : « Quel est votre taux d'utilisation quotidienne moyen chez vos clients EHPAD ? Pouvez-vous partager des données d'adoption sur 6 mois post-déploiement ? »",
          "Sur le modèle économique : « Quels sont les coûts cachés, intégration, formation, support, mise à jour réglementaire ? Le prix de la licence intègre-t-il les évolutions pour rester conforme au référentiel ANS au fil du temps ? » Un éditeur qui ne peut pas répondre clairement à ces questions, ou qui esquive avec des arguments commerciaux, n'est pas un partenaire de confiance pour un projet de cette durée et de cette importance. Les solutions qui s'intègrent nativement avec des outils complémentaires comme Speakli pour la dictée vocale offrent également un avantage concret : le soignant utilise une interface unique, sans friction entre la dictée et la saisie dans le DUI.",
        ],
      },
      {
        heading: "Sources",
        paragraphs: [
          "CASF art. L. 312-9-2 (introduit par LFSS 2023), DUI comme condition d'éligibilité aux financements numériques (légifrance.gouv.fr)",
          "ANS, Référentiel fonctionnel DUI ESMS v2.0 (mars 2024) : fonctionnalités minimales obligatoires, HL7 FHIR (esante.gouv.fr)",
          "ANS, Catalogue de solutions référencées ESMS Numérique (solutions.esante.gouv.fr)",
          "ANS, Étude comparative 2024 sur 420 EHPAD : taux de complétude des transmissions DUI (87 %) vs papier (58 %)",
          "ANS, Rapport retours d'expérience déploiements ESMS Numérique 2023 : facteurs d'échec et de succès",
          "CNSA, Recommandations de transition papier-numérique en EHPAD : phase de double saisie 2-4 semaines (cnsa.fr)",
          "Programme ESMS Numérique / Ségur de la Santé, Conditions d'éligibilité et enveloppes de financement (cnsa.fr / esante.gouv.fr)",
        ],
      },
    ],
  },
  {
    slug: "silvereco-parole-expert-ia-tracabilite",
    isNew: true,
    title: "Parole d'expert SilverEco : l'IA vocale qui révolutionne la traçabilité en médico-social",
    category: "Médias & Interviews",
    categoryBg: "#F0FDF4",
    categoryColor: "#166534",
    date: "Avril 2026",
    excerpt:
      "Ruben Weinstein, cofondateur de Speakli, revient pour SilverEco sur les transformations profondes du secteur médico-social et les réponses concrètes que l'IA vocale apporte aux soignants en matière de traçabilité.",
    coverLogo: "/logos/silvereco-festival.png",
    coverIsPhoto: false,
    cardBg: "#0c3320",
    youtubeUrl: "https://www.youtube.com/embed/ZN1I59uSZ0k?rel=0",
    externalLink: {
      label: "Lire l'article sur SilverEco.fr",
      href: "https://www.silvereco.fr/parole-dexpert-speakli-lia-vocale-qui-revolutionne-la-tracabilite-des-soignants-en-medico-social/",
    },
    content: [
      {
        heading: "Une traçabilité indispensable mais chronophage",
        paragraphs: [
          "Dans les établissements de santé et médico-sociaux, la traçabilité des soins constitue un pilier fondamental de la qualité de prise en charge. Elle permet d'assurer le suivi des patients et résidents, de coordonner les équipes et de répondre aux exigences des autorités de santé.",
          "Pourtant, cette mission occupe encore aujourd'hui une part considérable du temps des soignants. Jusqu'à 30 % de leur temps est consacré à des tâches de documentation, souvent réalisées sur des outils peu adaptés au terrain — majoritairement conçus pour des postes fixes, s'intégrant difficilement au rythme réel des soins. Résultat : une perte de temps, une charge mentale accrue et un éloignement du cœur de métier des professionnels.",
        ],
      },
      {
        heading: "Des risques majeurs pour les établissements",
        paragraphs: [
          "Une traçabilité défaillante ne se limite pas à un simple enjeu organisationnel. Sur le plan médico-légal, l'absence de documentation peut être interprétée comme une absence de soin : ce qui n'est pas tracé est considéré comme non réalisé. La responsabilité des professionnels peut être engagée et les établissements s'exposent à des contentieux.",
          "L'impact est également financier : une part significative du budget des établissements dépend directement de la qualité de la traçabilité, utilisée comme base de justification auprès des autorités de tutelle. Enfin, les conséquences sont aussi humaines et organisationnelles : une mauvaise documentation entraîne une prise en charge moins adaptée et accentue la désorganisation des équipes.",
        ],
      },
      {
        heading: "L'IA comme réponse aux défis du secteur",
        paragraphs: [
          "Le secteur médico-social fait face à une double pression structurelle. D'un côté, le vieillissement de la population entraîne une hausse massive des besoins d'accompagnement. De l'autre, les ressources humaines se raréfient. Les métiers du soin, exigeants physiquement et mentalement, peinent à recruter et à fidéliser. Turnover, absentéisme et burnout fragilisent les organisations.",
          "Dans ce contexte, l'intelligence artificielle vocale de Speakli s'impose comme une réponse pragmatique. Elle permet d'automatiser des tâches chronophages à faible valeur ajoutée — la saisie des comptes rendus, la navigation dans les menus, la structuration administrative — afin de recentrer les soignants sur leur mission principale : le soin et l'accompagnement.",
        ],
      },
      {
        heading: "Une technologie au service du terrain",
        paragraphs: [
          "L'approche repose sur une idée simple : permettre aux soignants de documenter leurs actions à la voix, directement pendant leur tournée. Concrètement, la solution capte les informations vocales et les transforme en documents structurés, conformes et directement intégrés aux logiciels métiers des établissements.",
          "Les résultats sont mesurés sur le terrain : jusqu'à 40 % de temps gagné sur la traçabilité, plus de 90 heures économisées par soignant chaque année, et une amélioration significative de la qualité et de la continuité des soins. Ce temps libéré peut être réattribué à des tâches à plus forte valeur humaine, comme l'accompagnement des résidents ou la coordination des équipes.",
        ],
      },
      {
        heading: "L'accompagnement au changement, levier stratégique",
        paragraphs: [
          "Si la technologie est essentielle, elle ne suffit pas à garantir le succès des projets numériques en santé. Une grande majorité des échecs est liée à un manque d'accompagnement des équipes. La conduite du changement repose sur plusieurs piliers : l'implication des soignants dès la conception des outils, la désignation de référents au sein des établissements, et la mise en place de rituels réguliers pour accompagner la montée en compétence.",
          "Cette approche progressive permet une appropriation rapide des solutions par les équipes, jusqu'à une autonomie complète en quelques semaines. Au-delà de l'outil, c'est une transformation des pratiques qui s'opère, au service d'une meilleure qualité de vie au travail et d'une prise en charge optimisée des résidents.",
        ],
      },
    ],
  },
  {
    slug: "fnadepa-35-table-ronde-ia-ethique-ehpad",
    isNew: true,
    title: "Table ronde FNADEPA 35 : l'IA en EHPAD sous l'angle de l'éthique et du consentement",
    category: "Événements & Prises de parole",
    categoryBg: "#FFF7ED",
    categoryColor: "#9A3412",
    date: "Mai 2026",
    excerpt:
      "Invité par la FNADEPA 35 à la table ronde \"Une révolution silencieuse au sein de nos EHPAD\", Ruben Weinstein a défendu une vision de l'IA médicosociale pensée avant tout comme éthique : conception, usage, accompagnement et données de confiance.",
    coverLogo: "/logos/fnadepa.png",
    coverIsPhoto: false,
    coverLogoNatural: true,
    cardBg: "#f5f0ff",
    gallery: [
      {
        src: "/photos/blog/fnadepa-table-ronde.jpg",
        alt: "Table ronde FNADEPA 35 — Speakli présente sa vision de l'IA éthique en EHPAD",
      },
    ],
    content: [
      {
        heading: "L'éthique au cœur du produit, pas en marge",
        paragraphs: [
          "Chez Speakli, nous essayons de penser l'éthique non pas comme un sujet séparé du produit, mais comme quelque chose qui traverse toute la chaîne : la conception, l'usage, l'accompagnement et la donnée. La question de fond qui guide nos décisions est simple : est-ce que ce que l'on construit est profondément bon ? juste ? utile ?",
          "C'est dans cet esprit que Ruben Weinstein, cofondateur de Speakli, est intervenu à la table ronde organisée par la FNADEPA 35 sur le thème \"Une révolution silencieuse au sein de nos EHPAD\", aux côtés de directeurs d'établissements, de professionnels de santé et d'acteurs institutionnels.",
        ],
      },
      {
        heading: "1. Éthique dans la conception : la technologie s'adapte au soin",
        paragraphs: [
          "L'éthique de conception, c'est faire en sorte que la technologie s'adapte au soin, et non que le soin s'adapte à la technologie. Une IA en EHPAD ne peut pas être pensée hors-sol, depuis un bureau, puis simplement « déployée » auprès des équipes. Elle doit partir des pratiques réelles, des contraintes du terrain et des irritants vécus au quotidien par les professionnels.",
          "Chez Speakli, on part de choses très concrètes : la charge de rédaction, les interfaces complexes, les menus, les ressaisies, la peur de mal formuler, ou encore le risque de perdre une information entre le moment du soin et le moment où elle est tracée. C'est pour cela que la co-construction est centrale — l'outil est conçu avec les soignants, les IDEC, les directions et les médecins coordonnateurs.",
        ],
      },
      {
        heading: "2. Éthique dans l'usage : liberté, jugement et cœur de métier",
        paragraphs: [
          "Speakli ne met pas l'IA à la place du soignant ; Speakli met l'IA au service du soignant. Le professionnel reste maître de bout en bout. Ce n'est pas une écoute continue, ce n'est pas un outil de surveillance, ce n'est pas un micro ouvert dans l'établissement. Le soignant choisit quand il souhaite tracer une information : il déclenche l'enregistrement, il dicte, il relit, il corrige si nécessaire, puis il valide. Cette validation humaine n'est pas une formalité : c'est une condition d'usage.",
          "L'objectif est d'automatiser des tâches chronophages à faible valeur humaine — la navigation dans les menus, la saisie répétitive, la structuration administrative — en laissant intact tout ce qui relève du jugement clinique, de l'observation fine, de la connaissance du résident et de l'intelligence relationnelle. Une bonne IA en EHPAD est une IA qui rapproche le professionnel de son cœur de métier : observer, accompagner, soigner, transmettre. Elle valorise le soignant plutôt que de le supplanter, et accompagne sa montée en compétence.",
        ],
      },
      {
        heading: "3. Éthique dans l'accompagnement et la conduite du changement",
        paragraphs: [
          "L'éthique, ce n'est pas seulement ce que fait l'outil ; c'est aussi la manière dont on le fait entrer dans l'établissement. Déployer une IA en EHPAD, ce n'est pas seulement installer un logiciel. C'est accompagner une transformation des pratiques. Un outil peut être techniquement excellent, mais s'il est mal expliqué, mal intégré ou mal accompagné, il peut créer de la défiance, de la charge supplémentaire, voire un rejet.",
          "Chez Speakli, l'accompagnement fait partie intégrante du produit : cadrage opérationnel, formation des équipes, identification de référents à différents niveaux hiérarchiques, suivi d'usage, remontées terrain, adaptation des fonctionnalités. L'objectif est que l'outil soit compris, approprié, et qu'il reste vivant. Si une fonctionnalité ne correspond pas au terrain, elle doit évoluer.",
        ],
      },
      {
        heading: "4. Éthique dans la confidentialité et la sécurisation des données",
        paragraphs: [
          "La donnée de santé n'est pas une simple donnée métier : c'est une donnée de confiance. En EHPAD, on parle de données de santé, de personnes vulnérables, d'informations parfois très intimes. La protection de la donnée n'est donc pas un sujet technique secondaire : c'est un sujet éthique central.",
          "Cela implique plusieurs principes : ne collecter que ce qui est nécessaire, sécuriser les flux, protéger le stockage, encadrer les accès, tracer les actions, et s'assurer que les données ne soient utilisées que pour la finalité prévue. Speakli n'enregistre pas en continu — on ne capte pas la vie de l'établissement. On accompagne un acte professionnel précis, à un moment choisi par le soignant, dans le respect total de la vie privée des résidents.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
