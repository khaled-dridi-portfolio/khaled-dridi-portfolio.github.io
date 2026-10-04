export const CATEGORIES = ['game', 'web', 'app', 'simulation'] as const;
export type Category = (typeof CATEGORIES)[number];

export const PROJECT_TYPES = ['freelance', 'client', 'personal', 'academic', 'hackathon', 'internship'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const TITLE_FONTS = ['pixelify-sans', 'orbitron', 'titan-one', 'saira-stencil-one', 'fredoka', 'press-start-2p'] as const;
export type TitleFont = (typeof TITLE_FONTS)[number];

export const PRESET_KEYS = ['default', 'freelance', 'job', 'gamedev'] as const;
export type PresetKey = (typeof PRESET_KEYS)[number];

export const SECTION_KEYS = ['hero', 'projects', 'skills', 'experience', 'education', 'achievements', 'contact'] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export type Theme = 'clean' | 'game';
