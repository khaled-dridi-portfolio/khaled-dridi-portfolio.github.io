import type { Category, PresetKey, SectionKey, Theme } from '../lib/types';
import { CATEGORIES } from '../lib/types';
import { site } from './site';

export interface Cta {
  label: string;
  href: string;
  download?: boolean;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface Preset {
  key: PresetKey;
  path: string;
  theme: Theme;
  seo: { title: string; description: string };
  eyebrow: string;
  headline: string;
  subline: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  stats: HeroStat[];
  projectCategories: readonly Category[];
  /** Project ids pinned to the top, in this order. Others follow (featured first, then newest). */
  projectOrder: readonly string[];
  sections: readonly SectionKey[];
}

export const PRESETS: Record<PresetKey, Preset> = {
  default: {
    key: 'default',
    path: '/',
    theme: 'clean',
    seo: {
      title: `${site.name} — Software Engineer`,
      description: 'Software engineer building games, websites and apps — Unity multiplayer, full-stack web and mobile.',
    },
    eyebrow: 'Software Engineer',
    headline: 'Software engineer — games, web & apps',
    subline: 'Software engineering graduate (MEDTECH, 2026) — Unity multiplayer, full-stack web and mobile.',
    primaryCta: { label: 'Get in touch', href: '#contact' },
    secondaryCta: { label: 'See my work', href: '#projects' },
    stats: [],
    projectCategories: CATEGORIES,
    projectOrder: [],
    sections: ['hero', 'projects', 'skills', 'experience', 'education', 'achievements', 'contact'],
  },
  freelance: {
    key: 'freelance',
    path: '/freelance/',
    theme: 'clean',
    seo: {
      title: `${site.name} — Freelance Game, Web & App Developer`,
      description: 'Freelance developer for games, websites and mobile apps. Upwork Rising Talent with 0% client dissatisfaction.',
    },
    eyebrow: 'Freelance Developer',
    headline: 'I build your game, website or app — start to finish',
    subline: 'Upwork Rising Talent · 0% client dissatisfaction',
    primaryCta: { label: 'Start a project', href: '#contact' },
    secondaryCta: { label: 'Hire me on Upwork', href: site.upwork },
    stats: [],
    projectCategories: CATEGORIES,
    projectOrder: [],
    sections: ['hero', 'projects', 'skills', 'achievements', 'experience', 'contact'],
  },
  job: {
    key: 'job',
    path: '/job/',
    theme: 'clean',
    seo: {
      title: `${site.name} — Software Engineer, open to full-time roles`,
      description: 'Software engineering graduate (MEDTECH, July 2026) and multiplayer Unity developer, open to full-time roles.',
    },
    eyebrow: 'Software Engineer',
    headline: 'Software engineer — open to full-time roles',
    subline: 'Engineering degree in Software Engineering, MEDTECH (July 2026). Multiplayer Unity developer at Renske since 2024.',
    primaryCta: { label: 'Download CV', href: site.cv, download: true },
    secondaryCta: { label: 'LinkedIn', href: site.linkedin },
    stats: [],
    projectCategories: CATEGORIES,
    projectOrder: [],
    sections: ['hero', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact'],
  },
  gamedev: {
    key: 'gamedev',
    path: '/gamedev/',
    theme: 'game',
    seo: {
      title: `${site.name} — Game Developer (2D & 3D)`,
      description: 'Game developer — multiplayer Unity, gameplay systems and Photon networking, 2D and 3D.',
    },
    eyebrow: 'Game Developer',
    headline: 'Game developer — 2D & 3D',
    subline: 'Multiplayer Unity developer · gameplay systems · Photon networking.',
    primaryCta: { label: "Let's make a game", href: '#contact' },
    secondaryCta: { label: 'See my games', href: '#projects' },
    stats: [
      { label: 'Unity since', value: '2023' },
      { label: 'Hackathons', value: '4' },
      { label: 'Best Project wins', value: '2' },
    ],
    projectCategories: ['game', 'simulation'],
    projectOrder: [],
    sections: ['hero', 'projects', 'skills', 'experience', 'achievements', 'contact'],
  },
};

export function getPreset(key: string | null | undefined): Preset {
  return key && Object.hasOwn(PRESETS, key) ? PRESETS[key as PresetKey] : PRESETS.default;
}

export const PRESET_THEMES: Record<string, Theme> = Object.fromEntries(Object.values(PRESETS).map((p) => [p.key, p.theme]));
export const PRESET_PATHS: Record<string, string> = Object.fromEntries(Object.values(PRESETS).map((p) => [p.key, p.path]));
