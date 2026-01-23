
import type { Oeuvre } from './types';

export const SYSTEM_PROMPT = `
TU ES “MARCELLE FERRON — GUIDE NUMÉRIQUE” POUR UN KIOSQUE TACTILE (MONTRÉAL, 10–14 ANS).
But: déclencher une création en 2–8 minutes, relier art ↔ science (lumière/couleur/perception + essai/erreur), et mettre en valeur une femme marquante du Québec.

TRANSPARENCE (IMPORTANT)
- Tu es une interprétation numérique inspirée de Marcelle Ferron.
- Les titres/phrases marqués “inspiré” dans le catalogue sont des contenus de prototype (pas des citations historiques vérifiées).
- Ne JAMAIS inventer de faits biographiques précis, dates exactes, ou citations authentifiées si ce n’est pas dans le CATALOGUE.

PUBLIC & TON
- Enfants 10–14 ans : phrases courtes, concrètes, positives, humor léger.
- Jamais professoral. Toujours orienté action (“On essaie?”).
- Évite les sujets sensibles (violence, sexualité, politique partisane). Si ça arrive: recentre vers art/science/création.

RÈGLES D’INTERACTION (KIOSQUE)
- Toujours proposer 3 à 6 “chips” (boutons) clairs pour répondre sans clavier.
- Chaque réponse = 1 idée principale + 1 action possible.
- Durées: privilégier 10 s / 20 s / 2 min / 5 min.
- Si l’utilisateur est perdu: ramener vers Accueil ou Parcours Éclat.
- Ne collecte aucune donnée personnelle. Ne demande pas d’adresse, numéro, école, etc.
- Si question hors-sujet: “Je peux t’aider à créer ou à explorer une œuvre. Tu préfères quoi?”

STRUCTURE DU PARCOURS (4 ZONES)
1) GALERIE: regarder, choisir, mini découverte (science), lancer un défi.
2) PARLER À MARCELLE: discussion guidée + citations (mur de vitrail).
3) ATELIER-JEU: jeu 2 min + création 2–5 min.
4) HÉRITAGE: vidéo 45–90 s + 3 boutons (“Dans la ville”, “Femmes & science”, “Ton futur”).

OBJECTIF DE CHAQUE ZONE
- Galerie: “choisis une œuvre” + “découvre 20 s” + “défi 2 min”.
- Chat: réponses courtes + chips + proposer un défi.
- Atelier: outils simples (3–5), contraste, formes, lumière.
- Héritage: émotion + art public + lien femmes & science.

DIRECTION ARTISTIQUE (UI) — INSPIRATION MARCELLE FERRON
- **Thème Visuel**: L'interface doit jongler entre deux styles : "vitrail" et "pictural".
  - **Vitrail**: Évoque la lumière traversant le verre. Utilise des lignes de séparation sombres et fortes (comme du plomb), des couleurs vives et un effet de lumière subtil. Idéal pour les écrans de navigation, de galerie et de découverte (accueil, galerie, citations, heritage).
  - **Pictural**: Inspire la peinture, la texture du papier ou de la toile. Moins de lignes dures, plus de focus sur les formes et les couleurs. Idéal pour les écrans de création (atelier, jeu, resultat).
- **Palette**: Utilise des palettes de couleurs contrastées et audacieuses, souvent 3 à 5 couleurs fortes plus le noir et le blanc/crème pour l'équilibre. Les couleurs doivent être vives et saturées.
- **Arrière-plans**: Les fonds doivent renforcer le thème. "vitrail_mosaic" pour le style vitrail, "paper_texture" ou "dark_lead" pour le style pictural.
- **Formes & Bords**: Les éléments interactifs (boutons, cartes) doivent avoir des bords légèrement arrondis (\`radius: "xl"\`) et des contours nets (\`stroke_px: 2\` à \`4\`).
- **Effets Subtils**: Utilise des effets de lumière (\`light_effect: "soft_shimmer"\`) pour le thème vitrail afin de donner vie à l'interface. Des sons discrets (\`sound: "soft_chime"\`) peuvent accompagner les interactions clés pour une expérience plus immersive.

UTILISATION DU CATALOGUE (SOURCE UNIQUE)
- Toute œuvre, défi, pont science et palette viennent du CATALOGUE.
- Si l’utilisateur demande une œuvre non présente:
  - Répondre: “Je ne l’ai pas dans cette galerie-prototype.”
  - Proposer 2 alternatives proches (mêmes tags couleur/énergie/type).
- Quand l’utilisateur sélectionne une œuvre:
  - Utiliser son id (ex: FERRON_P01) et ses champs: pitch_10s, pont_science_20s, defi_2min, palette_atelier, questions_rapides.

FORMAT DE RÉPONSE (OBLIGATOIRE) — JSON POUR INTERFACE TACTILE + STYLE VITRAIL
Tu réponds TOUJOURS avec un objet JSON de cette forme EXACTE (mêmes clés), même si l’utilisateur écrit en espagnol.

{
  "screen": "accueil|galerie|detail_oeuvre|chat|citations|atelier_hub|jeu|atelier|resultat|heritage",
  "voice": "Texte court (2–4 phrases). Voix de Marcelle. Action + émotion.",
  "on_screen": "Texte ultra court (1–2 lignes, idéalement <120 caractères).",
  "chips": ["bouton 1", "bouton 2", "bouton 3", "bouton 4"],
  "cta": {
    "label": "bouton principal",
    "route": "accueil|galerie|detail_oeuvre|chat|citations|atelier_hub|jeu|atelier|resultat|heritage",
    "params": { "oeuvre_id": "FERRON_P01", "mode": "parcours|libre" }
  },
  "context": {
    "oeuvre_id": "FERRON_P01|null",
    "mode": "parcours|libre",
    "last_zone": "galerie|chat|atelier|heritage|null"
  },
  "ui_hints": {
    "theme": "vitrail|pictural|mix",
    "palette_focus": ["#D7262E","#1D4ED8","#F2C94C","#0B0B0D","#F6F3EE"],
    "background": "vitrail_mosaic|paper_texture|dark_lead",
    "stroke_px": 3,
    "radius": "xl",
    "light_effect": "soft_shimmer|none",
    "sound": "soft_chime|none"
  }
}

RÈGLES STRICTES
- "chips": 3 à 6 items max, verbes d’action, lisibles pour 10–14 ans.
- Toujours inclure un chip de navigation: "🏠 Accueil" OU "← Retour" selon le contexte.
- "ui_hints":
  - Si screen ∈ {accueil, galerie, citations, heritage} => theme="vitrail", background="vitrail_mosaic", light_effect="soft_shimmer".
  - Si screen ∈ {atelier, jeu, resultat} => theme="pictural" OU "mix", background="paper_texture" (ou "dark_lead" si contraste fort).
  - stroke_px entre 2 et 4. Palette_focus = 3–5 couleurs fortes + noir + blanc.
- Ne jamais sortir de ce JSON (pas de texte autour, pas de markdown).
`;

export const CATALOGUE = {
  "meta": {
    "lang": "fr",
    "version": "prototype_v1",
    "public": "10-14",
    "format": "kiosque_tactile",
    "disclaimer": "Titres et phrases inspirés pour prototype. Remplacer par œuvres/quotes validées + crédits."
  },
  "global_ui": {
    "chips_questions_generales": [
      "Pourquoi autant de couleurs?",
      "C’est quoi un vitrail?",
      "Comment tu trouves tes formes?",
      "Le lien avec la science?",
      "Un défi rapide!",
      "Une phrase inspirante?"
    ],
    "defi_format_2min": [
      "Choisis 3 couleurs",
      "Ajoute 6 formes",
      "Crée un contraste fort",
      "Change 1 chose et observe"
    ]
  },
  "oeuvres": [
    {
      "id": "FERRON_P01",
      "titre": "Éclats rouges",
      "type": "peinture",
      "energie": "explosive",
      "couleurs_tags": ["rouge", "noir", "blanc"],
      "pitch_10s": "Des blocs rouges qui claquent, comme une percussion.",
      "phrase_inspiree": "Ose le contraste. C’est lui qui réveille l’œil.",
      "pont_science_20s": "Ton œil repère d’abord les contrastes (clair/sombre). Plus c’est contrasté, plus ton cerveau ‘accroche’ vite.",
      "defi_2min": [
        "Prends rouge + noir + blanc",
        "Place 3 grands blocs et 3 petits",
        "Laisse un ‘chemin’ blanc pour respirer",
        "Augmente le contraste une dernière fois"
      ],
      "questions_rapides": [
        "Pourquoi le rouge frappe autant?",
        "Comment faire du contraste?",
        "C’est abstrait… ça veut dire quoi?"
      ],
      "palette_atelier": ["#ef4444", "#111827", "#f9fafb", "#6b7280", "#f97316", "#991b1b"]
    },
    {
      "id": "FERRON_P02",
      "titre": "Noir en mouvement",
      "type": "peinture",
      "energie": "intense",
      "couleurs_tags": ["noir", "bleu", "blanc"],
      "pitch_10s": "Du noir qui semble bouger comme une ombre rapide.",
      "phrase_inspiree": "Le noir n’est pas vide. Il fait respirer la lumière.",
      "pont_science_20s": "Dans la perception, le sombre peut ‘pousser’ le clair. Ton cerveau lit les bords (contours) avant les détails.",
      "defi_2min": [
        "Fond clair (blanc/gris)",
        "Dessine 4 traits noirs épais (différentes directions)",
        "Ajoute 2 petites touches bleues pour l’énergie",
        "Éloigne-toi: est-ce que ça ‘bouge’?"
      ],
      "questions_rapides": [
        "Pourquoi le noir est important?",
        "Comment créer du mouvement?",
        "Tu regardes de près ou de loin?"
      ],
      "palette_atelier": ["#111827", "#f9fafb", "#3b82f6", "#6b7280", "#4338ca", "#22d3ee"]
    },
    {
      "id": "FERRON_P03",
      "titre": "Bleu électrique",
      "type": "peinture",
      "energie": "vive",
      "couleurs_tags": ["bleu", "jaune", "noir"],
      "pitch_10s": "Un bleu puissant, coupé par des éclairs de jaune.",
      "phrase_inspiree": "Quand deux couleurs se disputent, l’image s’allume.",
      "pont_science_20s": "Couleurs complémentaires: certaines paires (ex. bleu/jaune) augmentent la sensation d’énergie par contraste.",
      "defi_2min": [
        "Choisis bleu + jaune + noir",
        "Fais 5 formes bleues (tailles variées)",
        "Ajoute 3 ‘éclairs’ jaunes",
        "Pose 1 ligne noire pour ‘tenir’ la composition"
      ],
      "questions_rapides": [
        "Pourquoi ça ‘vibre’?",
        "Comment choisir 2 couleurs fortes?",
        "Tu planifies ou tu testes?"
      ],
      "palette_atelier": ["#3b82f6", "#facc15", "#111827", "#f9fafb", "#4338ca", "#f97316"]
    },
    {
      "id": "FERRON_P04",
      "titre": "Rythme fracturé",
      "type": "peinture",
      "energie": "explosive",
      "couleurs_tags": ["multicolore", "noir"],
      "pitch_10s": "Des morceaux de couleur comme un vitrail cassé… mais vivant.",
      "phrase_inspiree": "Brise la forme. C’est là que l’idée apparaît.",
      "pont_science_20s": "Ton cerveau adore reconnaître des motifs… puis il se réveille quand le motif se casse. Surprise = attention.",
      "defi_2min": [
        "Choisis 4 couleurs + noir",
        "Crée 8 formes ‘cassées’ (angles, triangles)",
        "Trace 3 lignes noires pour séparer comme du verre",
        "Change 1 forme: plus grande, plus audacieuse"
      ],
      "questions_rapides": [
        "Pourquoi casser les formes?",
        "Ça vient d’où, le style vitrail?",
        "Comment éviter le ‘trop plein’?"
      ],
      "palette_atelier": ["#ef4444", "#3b82f6", "#facc15", "#22c55e", "#111827", "#f9fafb"]
    },
    {
      "id": "FERRON_P05",
      "titre": "Silence lumineux",
      "type": "peinture",
      "energie": "calme",
      "couleurs_tags": ["blanc", "gris", "bleu pâle"],
      "pitch_10s": "Peu de couleurs, mais beaucoup de lumière.",
      "phrase_inspiree": "Moins, c’est parfois plus fort.",
      "pont_science_20s": "Quand il y a moins d’éléments, ton attention se fixe mieux. C’est comme réduire le “bruit” dans une expérience.",
      "defi_2min": [
        "Choisis blanc + gris + bleu pâle",
        "Fais 3 grandes zones douces",
        "Ajoute 2 petites formes plus foncées",
        "Demande-toi: où l’œil se pose?"
      ],
      "questions_rapides": [
        "Comment faire ‘calme’?",
        "Pourquoi laisser du vide?",
        "C’est quoi ‘respirer’ en art?"
      ],
      "palette_atelier": ["#f9fafb", "#6b7280", "#bfdbfe", "#3b82f6", "#111827", "#d1d5db"]
    },
    {
      "id": "FERRON_P06",
      "titre": "Collision chaude-froide",
      "type": "peinture",
      "energie": "vive",
      "couleurs_tags": ["orange", "rouge", "bleu"],
      "pitch_10s": "Des couleurs chaudes contre des couleurs froides: ça s’affronte.",
      "phrase_inspiree": "Fais se rencontrer deux mondes: chaud et froid.",
      "pont_science_20s": "Ton cerveau associe souvent chaud/froid à des émotions. C’est de la perception: on ‘ressent’ une couleur.",
      "defi_2min": [
        "Choisis 2 chaudes (rouge/orange) + 1 froide (bleu)",
        "Place une grande zone froide",
        "Fais 4 formes chaudes qui la traversent",
        "Ajoute 1 petite touche opposée pour l’équilibre"
      ],
      "questions_rapides": [
        "Pourquoi ça fait ‘chaud’?",
        "Comment équilibrer 2 mondes?",
        "Tu veux choquer ou calmer?"
      ],
      "palette_atelier": ["#ef4444", "#f97316", "#3b82f6", "#111827", "#f9fafb", "#facc15"]
    },
    {
      "id": "FERRON_P07",
      "titre": "Cadence en diagonales",
      "type": "peinture",
      "energie": "intense",
      "couleurs_tags": ["noir", "jaune", "blanc"],
      "pitch_10s": "Des diagonales qui donnent l’impression de vitesse.",
      "phrase_inspiree": "Une diagonale, c’est une flèche pour l’œil.",
      "pont_science_20s": "Les lignes obliques suggèrent souvent le mouvement. Ton cerveau anticipe une direction, comme dans le sport.",
      "defi_2min": [
        "Choisis noir + blanc + jaune",
        "Trace 5 diagonales (tailles variées)",
        "Place 3 formes jaunes sur les ‘intersections’",
        "Regarde: est-ce que ça va ‘vers’ quelque part?"
      ],
      "questions_rapides": [
        "Pourquoi les diagonales bougent?",
        "Comment guider le regard?",
        "C’est quoi une composition?"
      ],
      "palette_atelier": ["#111827", "#f9fafb", "#facc15", "#6b7280", "#f97316", "#3b82f6"]
    },
    {
      "id": "FERRON_V01",
      "titre": "Vitrail — Champ-de-Mars (inspiré)",
      "type": "vitrail",
      "energie": "éclatant",
      "couleurs_tags": ["multicolore", "noir"],
      "pitch_10s": "Comme une fenêtre de lumière: la couleur change quand tu bouges.",
      "phrase_inspiree": "La lumière est mon pinceau invisible.",
      "pont_science_20s": "Un vitrail filtre la lumière: selon l’intensité et l’angle, ton œil perçoit des couleurs différentes. Teste en bougeant!",
      "defi_2min": [
        "Active le slider ‘Lumière’",
        "Observe 2 couleurs qui changent le plus",
        "Choisis 3 couleurs et fais un ‘mini-vitrail’ en 6 formes",
        "Sépare avec des lignes sombres (comme du plomb)"
      ],
      "questions_rapides": [
        "Pourquoi la lumière change tout?",
        "Comment ça se construit, un vitrail?",
        "C’est quoi ‘filtrer’ la lumière?"
      ],
      "palette_atelier": ["#ef4444", "#3b82f6", "#facc15", "#22c55e", "#111827", "#f9fafb"]
    },
    {
      "id": "FERRON_V02",
      "titre": "Mur de lumière",
      "type": "vitrail",
      "energie": "calme",
      "couleurs_tags": ["bleu", "vert", "jaune"],
      "pitch_10s": "Des couleurs qui semblent flotter, comme de l’eau et du soleil.",
      "phrase_inspiree": "Je construis avec des éclats, comme des notes de musique.",
      "pont_science_20s": "La transparence laisse passer la lumière. Plus c’est transparent, plus l’arrière-plan influence ce que tu vois.",
      "defi_2min": [
        "Choisis 3 couleurs ‘calmes’ (bleu/vert/jaune)",
        "Fais 6 formes avec beaucoup d’espace entre elles",
        "Baisse puis monte la ‘Lumière’",
        "Décide: plus doux ou plus éclatant?"
      ],
      "questions_rapides": [
        "C’est quoi la transparence?",
        "Pourquoi l’arrière-plan compte?",
        "Comment faire ‘flotter’ une forme?"
      ],
      "palette_atelier": ["#3b82f6", "#22c55e", "#facc15", "#f9fafb", "#22d3ee", "#6ee7b7"]
    },
    {
      "id": "FERRON_V03",
      "titre": "Éclats urbains",
      "type": "vitrail",
      "energie": "vive",
      "couleurs_tags": ["rouge", "orange", "bleu"],
      "pitch_10s": "Une ville en morceaux de couleur: énergie, vitesse, bruit.",
      "phrase_inspiree": "La ville aussi peut devenir une toile.",
      "pont_science_20s": "Notre attention est attirée par les zones très lumineuses. C’est utile en ville… et en art public.",
      "defi_2min": [
        "Choisis rouge/orange/bleu",
        "Fais 3 zones ‘phares’ très lumineuses",
        "Entoure-les de formes plus sombres",
        "Teste: où ton œil va en premier?"
      ],
      "questions_rapides": [
        "Pourquoi l’art dans la ville?",
        "Comment attirer l’œil?",
        "C’est quoi l’art public?"
      ],
      "palette_atelier": ["#ef4444", "#f97316", "#3b82f6", "#111827", "#f9fafb", "#facc15"]
    },
    {
      "id": "FERRON_V04",
      "titre": "Prisme",
      "type": "vitrail",
      "energie": "éclatant",
      "couleurs_tags": ["multicolore"],
      "pitch_10s": "Comme un arc-en-ciel découpé: ça disperse la lumière.",
      "phrase_inspiree": "Je laisse la lumière faire une partie du travail.",
      "pont_science_20s": "Un prisme sépare la lumière en couleurs. Même sans prisme, ton œil voit des différences selon le contraste et la transparence.",
      "defi_2min": [
        "Choisis 5 couleurs (arc-en-ciel ou presque)",
        "Fais 10 petites formes en dégradé",
        "Ajoute 2 grandes formes pour ‘tenir’ la scène",
        "Joue avec ‘Lumière’ et observe les changements"
      ],
      "questions_rapides": [
        "C’est quoi un prisme?",
        "Pourquoi on voit un arc-en-ciel?",
        "Comment faire un dégradé simple?"
      ],
      "palette_atelier": ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6"]
    },
    {
      "id": "FERRON_V05",
      "titre": "Constellation",
      "type": "vitrail",
      "energie": "intense",
      "couleurs_tags": ["bleu", "blanc", "noir"],
      "pitch_10s": "Des points de lumière dans la nuit: ça scintille.",
      "phrase_inspiree": "Même un petit éclat peut guider tout le regard.",
      "pont_science_20s": "Dans le noir, ton œil cherche les points lumineux. C’est comme repérer des étoiles: peu d’infos, mais très fortes.",
      "defi_2min": [
        "Fond sombre (noir/bleu nuit)",
        "Ajoute 12 petits ‘éclats’ blancs",
        "Relie 3 éclats par des lignes fines",
        "Décide où mettre ‘l’étoile principale’ (plus grande)"
      ],
      "questions_rapides": [
        "Pourquoi ça scintille?",
        "Comment faire une ‘étoile’ en art?",
        "Le noir, c’est une couleur?"
      ],
      "palette_atelier": ["#111827", "#1e3a8a", "#f9fafb", "#6b7280", "#22d3ee", "#4338ca"]
    }
  ] as Oeuvre[],
  "heritage_module": {
    "video": {
      "titre": "Héritage de Marcelle (prototype)",
      "duree_cible": "45-90s",
      "caption": "Art public, vitrail, audace. Une femme qui a changé l’espace."
    },
    "boutons": [
      {
        "id": "H_CITY",
        "label": "Dans la ville",
        "microcopy": "Voir où l’art vit dehors."
      },
      {
        "id": "H_WOMEN_SCI",
        "label": "Femmes & science",
        "microcopy": "Créer = tester, oser, recommencer."
      },
      {
        "id": "H_FUTURE",
        "label": "Ton futur",
        "microcopy": "Et toi, qu’est-ce que tu veux inventer?"
      }
    ],
    "final_cta": {
      "label": "Refaire un défi (2 min)",
      "route": "atelier-jeu"
    }
  }
};

export const CATALOGUE_STRING = JSON.stringify(CATALOGUE, null, 2);
