
export type ScreenName = 
  | "accueil" 
  | "galerie" 
  | "detail_oeuvre" 
  | "chat" 
  | "citations" 
  | "atelier_hub" 
  | "jeu" 
  | "atelier" 
  | "resultat" 
  | "heritage";

export interface UIHints {
  theme: "vitrail" | "pictural" | "mix";
  palette_focus: string[];
  background: "vitrail_mosaic" | "paper_texture" | "dark_lead";
  stroke_px: number;
  radius: "xl";
  light_effect: "soft_shimmer" | "none";
  sound: "soft_chime" | "none";
}

export interface CTA {
  label: string;
  route: ScreenName;
  params?: {
    oeuvre_id?: string;
    mode?: "parcours" | "libre";
  };
}

export interface Context {
  oeuvre_id?: string | null;
  mode?: "parcours" | "libre";
  last_zone?: "galerie" | "chat" | "atelier" | "heritage" | null;
}

export interface ApiResponse {
  screen: ScreenName;
  voice: string;
  on_screen: string;
  chips: string[];
  cta?: CTA;
  context: Context;
  ui_hints: UIHints;
}

export interface Oeuvre {
  id: string;
  titre: string;
  type: "peinture" | "vitrail";
  energie: string;
  couleurs_tags: string[];
  pitch_10s: string;
  phrase_inspiree: string;
  pont_science_20s: string;
  defi_2min: string[];
  questions_rapides: string[];
  palette_atelier: string[];
}

// Types for Atelier Screen
export interface Point { x: number; y: number; }
interface BaseShape { id: number; color: string; }
export interface RectShape extends BaseShape { type: 'rect'; x: number; y: number; size: number; }
export interface CircleShape extends BaseShape { type: 'circle'; x: number; y: number; size: number; }
export interface PathShape extends BaseShape { type: 'path'; strokeWidth: number; points: Point[]; }
export type AtelierShape = RectShape | CircleShape | PathShape;
