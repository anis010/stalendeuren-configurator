/**
 * Asset mapping for Aluwdoors textures
 * Maps configurator state values to texture file paths
 */

export type MetalTexture = 'antraciet' | 'beige' | 'brons' | 'goud' | 'zwart' | 'ral';
export type GlassTexture = 'blank' | 'brons-tint' | 'grijs-tint' | 'mat-blank' | 'mat-brons' | 'mat-zwart';
export type HandleType = 'beugelgreep' | 'geen' | 'hoekgreep' | 'maangreep' | 'ovaalgreep';
export type DividerType = 'platte-roede' | 't-roede';

const TEXTURE_BASE = '/textures/aluwdoors';

/**
 * Metal texture mapping
 */
export const metalTextures: Record<MetalTexture, string> = {
  antraciet: `${TEXTURE_BASE}/aluwdoors-configurator-metaalkleur-antraciet.jpg`,
  beige: `${TEXTURE_BASE}/aluwdoors-configurator-metaalkleur-beige.jpg`,
  brons: `${TEXTURE_BASE}/aluwdoors-configurator-metaalkleur-brons.jpg`,
  goud: `${TEXTURE_BASE}/aluwdoors-configurator-metaalkleur-goud.jpg`,
  zwart: `${TEXTURE_BASE}/aluwdoors-configurator-metaalkleur-zwart.jpg`,
  ral: `${TEXTURE_BASE}/aluwdoors-configurator-metaalkleur-ral-keuze.jpg`,
};

/**
 * Glass texture mapping
 */
export const glassTextures: Record<GlassTexture, string> = {
  'blank': `${TEXTURE_BASE}/aluwdoors-configurator-glaskleur-blank.jpg`,
  'brons-tint': `${TEXTURE_BASE}/aluwdoors-configurator-glaskleur-brons.jpg`,
  'grijs-tint': `${TEXTURE_BASE}/aluwdoors-configurator-glaskleur-grijs.jpg`,
  'mat-blank': `${TEXTURE_BASE}/aluwdoors-configurator-glaskleur-mat-blank.jpg`,
  'mat-brons': `${TEXTURE_BASE}/aluwdoors-configurator-glaskleur-mat-brons.jpg`,
  'mat-zwart': `${TEXTURE_BASE}/aluwdoors-configurator-glaskleur-mat-zwart.jpg`,
};

/**
 * Handle SVG mapping
 */
export const handleSVGs: Record<HandleType, string> = {
  beugelgreep: `${TEXTURE_BASE}/aluwdoors-configurator-fineer-handgreep-beugelgreep.svg`,
  geen: `${TEXTURE_BASE}/aluwdoors-configurator-fineer-handgreep-geen.svg`,
  hoekgreep: `${TEXTURE_BASE}/aluwdoors-configurator-fineer-handgreep-hoekgreep.svg`,
  maangreep: `${TEXTURE_BASE}/aluwdoors-configurator-fineer-handgreep-maangreep.svg`,
  ovaalgreep: `${TEXTURE_BASE}/aluwdoors-configurator-fineer-handgreep-ovaalgreep.svg`,
};

/**
 * Divider SVG mapping
 */
export const dividerSVGs: Record<DividerType, string> = {
  'platte-roede': `${TEXTURE_BASE}/aluwdoors-configurator-roedetype-platte-roede.svg`,
  't-roede': `${TEXTURE_BASE}/aluwdoors-configurator-roedetype-t-roede.svg`,
};

/**
 * Map store finish values to metal textures
 */
export function getMetalTexture(finish: string): string {
  const mapping: Record<string, MetalTexture> = {
    'zwart': 'zwart',
    'brons': 'brons',
    'grijs': 'antraciet',
  };

  return metalTextures[mapping[finish] || 'zwart'];
}

/**
 * Glass material properties based on texture type
 */
export interface GlassMaterialProps {
  texture: string;
  transmission: number;
  roughness: number;
  color: string;
  opacity: number;
}

export function getGlassMaterial(glassType: GlassTexture): GlassMaterialProps {
  // Frosted/Mat glass
  if (glassType.startsWith('mat')) {
    return {
      texture: glassTextures[glassType],
      transmission: 0.6,
      roughness: 0.4,
      color: '#ffffff',
      opacity: 0.8,
    };
  }

  // Clear glass with tint
  return {
    texture: glassTextures[glassType],
    transmission: 1,
    roughness: 0.05,
    color: '#eff6ff',
    opacity: 0.3,
  };
}

/**
 * Aluwdoors extracted color scheme
 */
export const aluwColors = {
  // Primary action color (from CSS analysis)
  primary: '#b1de6e', // Pistachio green
  primaryDark: '#9fcd5b',

  // Dark backgrounds
  darkest: '#1b2221',
  dark: '#2b3937',
  darkMedium: '#3e4b49',

  // Light backgrounds
  light: '#e0e5e5',
  lightest: '#f0f3f3',

  // Neutral
  gray: '#868c8b',

  // Accent/Error
  error: '#e74242',
  errorDark: '#c40c0c',
} as const;
