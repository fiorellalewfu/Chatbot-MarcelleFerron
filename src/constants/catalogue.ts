import type { Oeuvre } from '../types/index';

export const CATALOGUE = {
  "meta": {
    "lang": "fr",
    "version": "prototype_v1",
    "public": "10-14",
    "format": "kiosque_tactile",
    "disclaimer": "Titres et phrases inspirés pour prototype. Remplacer par œuvres/quotes validées + crédits."
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
      "defi_2min": [],
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
      "defi_2min": [],
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
      "defi_2min": [],
      "questions_rapides": [
        "Pourquoi ça ‘vibre’?",
        "Comment choisir 2 couleurs fortes?",
        "Tu planifies ou tu testes?"
      ],
      "palette_atelier": ["#3b82f6", "#facc15", "#111827", "#f9fafb", "#4338ca", "#f97316"]
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
      "defi_2min": [],
      "questions_rapides": [
        "Pourquoi la lumière change tout?",
        "Comment ça se construit, un vitrail?",
        "C’est quoi ‘filtrer’ la lumière?"
      ],
      "palette_atelier": ["#ef4444", "#3b82f6", "#facc15", "#22c55e", "#111827", "#f9fafb"]
    }
  ] as Oeuvre[]
};

export const CATALOGUE_STRING = JSON.stringify(CATALOGUE, null, 2);