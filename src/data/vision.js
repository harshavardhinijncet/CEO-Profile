// The CEO's vision as one picture: a student at the top, a job offer at the bottom,
// the industry gap between them — and the four stages he built to bridge it.
// Programme logos from the roadmap app (Company Profile/roadmap/media).

const logo = (name, alt) => ({ src: `/assets/vision/${name}.png`, alt })

export const vision = {
  kicker: 'The Vision',
  title: 'Skills, not just degrees — the bridge I set out to build',
}

// the opening: his vision in one thought
export const opening = {
  kicker: 'The Vision',
  // markup: **bold**  _italic gold_  [highlight]
  quote: ['Talent was **never** the shortage.', '_Industry readiness_ was.', 'My mission is to [bridge that gap.]'],
  text: 'Academic success was not translating into **employability**. By aligning learning with the competencies industry demands, every graduate can step into the workplace **ready to contribute from day one.**',
  facts: [
    { value: 16, suffix: 'K+', label: 'Students certified' },
    { value: 20, suffix: '+', label: 'Courses launched' },
    { value: 2016, suffix: '', label: 'Building since', plain: true },
  ],
  name: 'Babji Neelam',
  role: 'Founder & CEO · Technical Hub & Torii Minds',
  cta: 'Dive into my vision',
}

// the opening thought, before the diagram
export const intro = {
  kicker: 'Where it began',
  lines: ['Students were passing their exams —', 'but they were not getting hired.'],
  sub: 'Degrees without skills. Talent without a path into industry. That gap is what made me think — and what made me act.',
  facts: [
    { icon: 'book', label: 'Curriculum', text: 'cleared on paper' },
    { icon: 'gap', label: 'Skills', text: 'missing in interviews' },
    { icon: 'building', label: 'Industry', text: 'still searching for talent' },
  ],
  cta: 'Dive into my thought process',
}

// one line of narration per step, in his voice
export const narration = [
  'It began with a gap: talented students on one side, job offers they could not reach on the other.',
  'Stage 1 — I made every student a coder first: logic and problem solving from day one.',
  'Stage 2 — then real depth, with extra hours for the ones who wanted more.',
  'Stage 3 — then what industry actually uses, with AI woven into every stack.',
  'Stage 4 — finally, I raised the best higher and made every student placement-ready.',
  'The path is complete. My students now walk straight into top companies.',
]

export const stages = [
  {
    color: '#f5b301', level: 'Stage 1', tags: ['#Logic', '#C', '#Python', '#DSA'], note: 'Every student starts thinking like an engineer.', title: 'Spark the coder', icon: 'code',
    points: ['Logic & problem solving', 'C, Python, data structures', 'Early industry exposure'],
    value: 'Think like engineers early',
    logos: [logo('ignite', 'Ignite Coder'), logo('tconnect', 'T-Connect')],
  },
  {
    color: '#34d17e', level: 'Stage 2', tags: ['#Java', '#DSA+', '#RedHat', '#Oracle'], note: 'Depth that holds up in technical rounds.', title: 'Build real depth', icon: 'layers',
    points: ['Java & advanced DSA', 'Red Hat & Oracle training', 'After-hours practice for the best'],
    value: 'Clear technical rounds',
    logos: [logo('bamboo', 'Bamboo Coder'), logo('moon', 'Moon Coders')],
  },
  {
    color: '#4fb3ff', level: 'Stage 3', tags: ['#FullStack', '#AWS', '#Data', '#AI'], note: 'Real industry stacks, with AI in every one.', title: 'Industry & AI ready', icon: 'chip',
    points: ['Full stack, AWS, data analytics', 'AI woven into every stack', 'Prompting, vibe coding, deploying'],
    value: 'Job-ready for the AI era',
    logos: [logo('driveready', 'Drive Ready'), logo('aiready', 'AI Ready Engineer')],
  },
  {
    color: '#b388ff', level: 'Stage 4', tags: ['#Logic', '#Aptitude', '#Mocks'], note: 'The best go further; everyone gets hire-ready.', title: 'Elevate the best', icon: 'target',
    points: ['Top coders chosen by tests', 'Daily logic building', 'Aptitude & mock interviews'],
    value: 'Hire-ready with confidence',
    logos: [logo('owl', 'Owl Coder'), logo('aptlogic', 'AptLogic')],
  },
]

export const outcome = {
  title: 'Job offer',
  sub: '16K+ certified · Aditya University',
  companies: ['Amazon', 'Google', 'Walmart', 'Flipkart', 'Visa', 'Accenture', 'Deloitte', 'Wipro', 'Infosys', 'TCS'],
}
