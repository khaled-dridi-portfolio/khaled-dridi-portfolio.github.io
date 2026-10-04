export const profile = {
  summary:
    'Software engineer passionate about building interactive and scalable software systems. Experienced in gamification, full-stack web development and automation testing, with a focus on engaging user experiences and reliable architectures.',
  skills: [
    { group: 'Languages', items: ['C#', 'Python', 'Java', 'C', 'JavaScript', 'SQL', 'MongoDB'] },
    { group: 'Game Development', items: ['Unity (2D/3D)', 'Gameplay Systems', 'Animation', 'Photon Networking', 'Unreal Engine'] },
    { group: 'Web & Mobile', items: ['Flutter', 'Django', 'React', 'REST APIs', 'Docker'] },
    { group: 'Tools', items: ['Git', 'Figma', 'Jira', 'Selenium', 'Blender', 'Fusion 360', 'OpenCV'] },
  ],
  spoken: [
    { name: 'English', level: 'Bilingual' },
    { name: 'French', level: 'Bilingual' },
    { name: 'Arabic', level: 'Native' },
  ],
  education: [
    { school: 'Mediterranean Institute of Technology (MEDTECH)', degree: 'Engineering Degree — Software Engineering', period: 'Graduated July 2026' },
    { school: 'Mohamed Dachraoui High School', degree: 'Tunisian Baccalaureate', period: 'July 2021' },
  ],
  achievements: ['Two-time Best Project Winner — Fondation SMU', 'Upwork Rising Talent badge — 0% client dissatisfaction'],
  hackathons: [
    { name: 'Game Development Hackathons (2×)', detail: 'Created complete prototypes under time constraints, focusing on gameplay and code structure.' },
    { name: 'Blockchain Hackathon', detail: 'Designed and implemented decentralized application concepts.' },
    { name: 'App Development Hackathon', detail: 'Built an app to improve university service accessibility.' },
  ],
} as const;
