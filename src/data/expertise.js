// Expertise — a "history wall": one long mural that pans sideways, one panel per scroll.
// Each panel is a 12-column grid split by the timeline rail into an upper and a lower zone.
// Items: { t: type, z: 'up' | 'down', c: [firstColumn, span], ...content }

const X = '/assets/expertise/'

export const expertise = {
  kicker: 'Expertise',
  standfirst: 'Six pillars built over three decades — teaching, industry, ventures, training, branding and innovation.',
}

export const pillars = [
  { id: 'teaching', label: 'Teaching' },
  { id: 'it', label: 'IT Industry' },
  { id: 'entrepreneur', label: 'Entrepreneur' },
  { id: 'training', label: 'Training & Placement' },
  { id: 'branding', label: 'Digital Branding' },
  { id: 'innovation', label: 'Innovation' },
]

export const panels = [
  // ---------------------------------------------------------------- 01 Teaching
  {
    pillar: 'teaching', title: 'Teaching', tone: '#0d0d0d', hue: '#f5b301',
    deco: [{ k: 'dots', x: 17, y: 24, s: 120 }, { k: 'stripes', x: 88, y: 64, s: 110 }],
    items: [
      { t: 'year', z: 'up', c: [1, 2], text: '1997', chev: true },
      { t: 'pin', z: 'up', c: [4, 3], org: 'APTECH', role: 'Lab Technician', head: 'The starting point',
        text: 'Hands-on lab support at the grassroots of technical education.' },
      { t: 'pin', z: 'up', c: [7, 3], org: 'ICSS', role: 'Technical Trainer', head: 'Broadening expertise',
        text: 'Structured, advanced curricula delivered to a wider audience.' },
      { t: 'pin', z: 'up', c: [10, 3], org: 'Aditya Degree College', role: 'Faculty', head: 'Entering formal academia',
        text: 'Brought industry-focused teaching into undergraduate classrooms.' },
      { t: 'lead', z: 'down', c: [1, 3], kicker: 'Teaching · 1997 – 2004', text: 'Where it began',
        sub: 'Seven years in labs and classrooms — from lab technician to engineering faculty.' },
      { t: 'pin', z: 'down', c: [4, 3], org: 'Datapro', role: 'Junior Technical Trainer', head: 'Stepping into instruction',
        text: 'Turned complex concepts into bite-sized lessons for beginners.' },
      { t: 'pin', z: 'down', c: [7, 3], org: 'NetGSC', role: 'Senior Technical Trainer', head: 'Leadership in training',
        text: 'Taught advanced technologies and mentored fellow trainers.' },
      { t: 'pin', z: 'down', c: [10, 3], org: 'Aditya Engineering College', role: 'Faculty', head: 'Shaping future engineers',
        text: 'Prepared engineering cohorts for the global tech industry.' },
    ],
  },

  // ---------------------------------------------------------------- 02 IT Industry
  {
    pillar: 'it', title: 'IT Industry', tone: '#0d0d0d', hue: '#ff8a65',
    deco: [{ k: 'stripes', x: 30, y: 24, s: 120 }, { k: 'dots', x: 70, y: 70, s: 130 }],
    items: [
      { t: 'year', z: 'up', c: [1, 2], text: '2005', chev: true },
      { t: 'pin', z: 'up', c: [4, 4], org: 'IBM', role: 'Java Software Engineer', logos: [{ src: X + 'ibm.webp', alt: 'IBM' }],
        text: 'Java engineering for finance and fintech platforms.' },
      { t: 'stat', z: 'up', c: [8, 4], value: '11', label: 'years in global IT', sub: 'February 2005 – January 2016', outline: true },
      { t: 'lead', z: 'down', c: [1, 3], kicker: 'IT Industry · 2005 – 2016', text: 'Global enterprise delivery',
        sub: 'Eleven years engineering and leading software for international clients.' },
      { t: 'pin', z: 'down', c: [4, 3], org: 'Wipro Technologies', role: 'Project Manager',
        logos: [{ src: X + 'wipro.webp', alt: 'Wipro' }], text: 'Led delivery for global clients, on site in Australia and Switzerland.' },
      { t: 'places', z: 'down', c: [7, 4], items: [
        { place: 'Australia', cities: 'Sydney & Brisbane' },
        { place: 'Switzerland', cities: 'Zurich & Basel' },
      ] },
      { t: 'year', z: 'down', c: [11, 2], text: '2016' },
    ],
  },

  // ---------------------------------------------------------------- 03 Entrepreneur
  {
    pillar: 'entrepreneur', title: 'Entrepreneur', tone: '#0d0d0d', hue: '#34d17e',
    deco: [{ k: 'dots', x: 48, y: 24, s: 110 }, { k: 'stripes', x: 6, y: 72, s: 100 }],
    items: [
      { t: 'year', z: 'up', c: [1, 2], text: '2016', chev: true },
      { t: 'pin', z: 'up', c: [4, 4], org: 'Technical Hub', role: 'Founder & CEO · 2016',
        logos: [{ src: X + 'th.webp', alt: 'Technical Hub' }],
        text: 'A skill-development and incubation centre whose certification-aligned programmes make engineers job-ready.' },
      { t: 'photos', z: 'up', c: [8, 5], srcs: ['qq-2.webp', 'qq-4.webp', 'qq-1.webp'], caption: 'Mentoring · QQ Media' },
      { t: 'lead', z: 'down', c: [1, 3], kicker: 'Entrepreneur · Ventures & incubation', text: 'Building institutions',
        sub: 'Two ventures that turn students into industry-ready professionals.' },
      { t: 'pin', z: 'down', c: [4, 4], org: 'Torii Minds', role: 'Founder & CEO · 2025 · Backed by NCC',
        logos: [{ src: X + 'torii.svg', alt: 'Torii Minds' }, { src: X + 'ncc.webp', alt: 'NCC Limited' }],
        text: 'A tech-education platform, named after the Japanese Torii gate, for coding, AI and career readiness.' },
      { t: 'year', z: 'down', c: [8, 2], text: '2025' },
      { t: 'pin', z: 'down', c: [10, 3], org: 'QQ Media', role: 'Mentoring',
        logos: [{ src: X + 'qq-logo.webp', alt: 'QQ Media' }], text: 'Mentoring a young media venture.' },
    ],
  },

  // ---------------------------------------------------------------- 04 Training & Placement — scale
  {
    pillar: 'training', title: 'Training & Placement', tone: '#0d0d0d', hue: '#4fb3ff',
    deco: [{ k: 'stripes', x: 40, y: 24, s: 110 }, { k: 'dots', x: 92, y: 70, s: 120 }],
    items: [
      { t: 'stat', z: 'up', c: [1, 3], value: '16,000+', label: 'students trained & certified', sub: 'Technical Hub · since 2016' },
      { t: 'photos', z: 'up', c: [4, 4], srcs: ['poster-16k.webp'], caption: 'World Youth Skills Day' },
      { t: 'pin', z: 'up', c: [9, 4], org: 'DriveReady Program', role: '7 successful editions',
        logos: [{ src: '/assets/vision/driveready.png', alt: 'DriveReady' }],
        text: '5,000+ students certified across different domains.' },
      { t: 'lead', z: 'down', c: [1, 3], kicker: 'Training & Placement', text: 'Training at scale',
        sub: 'Programmes that end in certifications and job offers.' },
      { t: 'photos', z: 'down', c: [4, 6], srcs: ['cert-1.webp', 'cert-5.webp', 'cert-8.webp'], caption: 'DriveReady certified batches' },
      { t: 'pin', z: 'down', c: [10, 3], org: 'T-Connect', role: '7 editions',
        logos: [{ src: '/assets/vision/tconnect.png', alt: 'T-Connect' }], stat: '25,000+', text: 'visitors across seven editions.' },
    ],
  },

  // ---------------------------------------------------------------- 04 Training & Placement — CoEs & partners
  {
    pillar: 'training', title: 'Centres of Excellence', tone: '#0d0d0d', hue: '#4fb3ff',
    deco: [{ k: 'dots', x: 26, y: 24, s: 110 }],
    items: [
      { t: 'stat', z: 'up', c: [1, 2], value: '20+', label: 'Centres of Excellence established' },
      { t: 'logowall', z: 'up', c: [3, 10], logos: [
        { src: X + 'coe-redhat.webp', alt: 'Red Hat Academy' }, { src: X + 'coe-splunk.webp', alt: 'Splunk' },
        { src: X + 'coe-mongodb.webp', alt: 'MongoDB University' }, { src: X + 'coe-cisco.webp', alt: 'Cisco Networking Academy' },
        { src: X + 'coe-aws.webp', alt: 'AWS Academy' }, { src: X + 'coe-oracle.webp', alt: 'Oracle Academy' },
        { src: X + 'coe-aa.webp', alt: 'Automation Anywhere' },
      ] },
      { t: 'partners', z: 'down', c: [1, 12], items: [
        { name: 'Pega University', logo: X + 'pega.webp', text: 'One of only two companies in India partnered with Pega.', star: true },
        { name: 'ServiceNow', word: 'servicenow', text: 'Enterprise workflows, cloud administration and app development.' },
        { name: 'Mile2', logo: X + 'mile2.webp', text: 'Cybersecurity: ethical hacking, forensics and information defence.' },
        { name: 'Automation Anywhere', logo: X + 'aa.webp', text: 'RPA centre: intelligent bots and the digital workforce.' },
        { name: 'Red Hat Academy', logo: X + 'redhat.webp', text: 'Enterprise Linux, OpenShift and containers.' },
        { name: 'OpenAI', logo: X + 'openai.webp', text: 'Generative AI, prompt engineering and LLM apps.' },
        { name: 'Anthropic Claude', logo: X + 'claude.webp', text: 'Agentic reasoning, model safety and conversational AI.' },
      ] },
    ],
  },

  // ---------------------------------------------------------------- 04 Training & Placement — on stage
  {
    pillar: 'training', title: 'On Stage', tone: '#0d0d0d', hue: '#4fb3ff',
    deco: [{ k: 'stripes', x: 58, y: 66, s: 110 }, { k: 'dots', x: 4, y: 70, s: 100 }],
    items: [
      { t: 'photos', z: 'up', c: [1, 4], srcs: ['talk-1.webp', 'talk-2.webp'], caption: 'Conference speaker' },
      { t: 'pin', z: 'up', c: [5, 3], org: 'Conference Speaker', role: 'Cisco & Oracle Academy',
        logos: [{ src: X + 'coe-cisco.webp', alt: 'Cisco Networking Academy' }, { src: X + 'coe-oracle.webp', alt: 'Oracle Academy' }],
        text: 'Invited speaker at Cisco and Oracle Academy events.' },
      { t: 'photos', z: 'up', c: [8, 5], srcs: ['talk-5.webp', 'talk-6.webp', 'talk-3.webp'], caption: 'Recognition' },
      { t: 'pin', z: 'down', c: [1, 3], org: 'Oracle Academy', role: 'Published success story', head: '“Bridging the Talent Gap”',
        logos: [{ src: X + 'coe-oracle.webp', alt: 'Oracle Academy' }], text: 'Technical Hub’s approach featured as an Oracle Academy story.' },
      { t: 'photos', z: 'down', c: [4, 6], srcs: ['ar-1.webp', 'ar-2.webp'], caption: 'Public AR Show' },
      { t: 'pin', z: 'down', c: [10, 3], org: 'Public AR Show', role: 'Augmented reality, live',
        text: 'Bringing immersive tech out of the lab and in front of the public.' },
    ],
  },

  // ---------------------------------------------------------------- 05 Digital Branding
  {
    pillar: 'branding', title: 'Digital Branding', tone: '#0d0d0d', hue: '#b388ff',
    deco: [{ k: 'dots', x: 34, y: 66, s: 120 }, { k: 'stripes', x: 90, y: 24, s: 100 }],
    items: [
      { t: 'stat', z: 'up', c: [1, 3], value: '24K+', label: 'Technical Hub · LinkedIn' },
      { t: 'stat', z: 'up', c: [5, 3], value: '8K+', label: 'Technical Hub · Facebook', outline: true },
      { t: 'stat', z: 'up', c: [9, 3], value: '4K+', label: 'Torii Minds · LinkedIn' },
      { t: 'lead', z: 'down', c: [1, 4], kicker: 'Digital Branding', text: 'Organic reach',
        sub: 'Communities grown organically for Technical Hub and Torii Minds.',
        logos: [{ src: X + 'th.webp', alt: 'Technical Hub' }, { src: X + 'torii.svg', alt: 'Torii Minds' }] },
      { t: 'pin', z: 'down', c: [6, 3], org: 'NGI', role: 'Digital branding', logos: [{ src: X + 'ngi.webp', alt: 'Nagarjuna Group of Institutions' }],
        text: 'Digital branding for the Nagarjuna Group of Institutions.' },
      { t: 'pin', z: 'down', c: [10, 3], org: 'T@G', role: 'Marketing platform', logos: [{ src: X + 'tag.webp', alt: 'T@G' }],
        text: 'An in-house app to plan and manage digital marketing.' },
    ],
  },

  // ---------------------------------------------------------------- 06 Innovation — apps
  {
    pillar: 'innovation', title: 'Innovation', tone: '#0d0d0d', hue: '#ff6fa8',
    deco: [{ k: 'stripes', x: 20, y: 24, s: 100 }, { k: 'dots', x: 86, y: 66, s: 120 }],
    items: [
      { t: 'lead', z: 'up', c: [1, 3], kicker: 'Innovation', text: 'Products built in-house',
        sub: 'Applications for learning, hiring and growth.' },
      { t: 'apps', z: 'up', c: [4, 9], apps: [
        { name: 'Myna', logo: X + 'myna.webp', text: 'A communication-building app.' },
        { name: 'Owl Coder', logo: X + 'owlcoder.webp', text: 'Improves coding performance for trainers.' },
        { name: 'Maya', logo: X + 'maya.webp', text: 'Improves coding performance for trainers.' },
        { name: 'T@G', logo: X + 'tag.webp', text: 'Manages digital marketing.' },
      ] },
      { t: 'apps', z: 'down', c: [2, 7], apps: [
        { name: 'HiBi', logo: X + 'hibi.webp', text: 'An HRMS platform.' },
        { name: 'mPod', logo: X + 'mpod.webp', text: 'An AI interview platform.' },
        { name: 'AptLogic', logo: '/assets/vision/aptlogic.png', text: 'Aptitude and logic improvement.' },
      ] },
      { t: 'stat', z: 'down', c: [11, 2], value: '7', label: 'products built' },
    ],
  },

  // ---------------------------------------------------------------- 06 Innovation — landmark launches
  {
    pillar: 'innovation', title: 'Landmark Launches', tone: '#0d0d0d', hue: '#ff6fa8',
    deco: [{ k: 'dots', x: 54, y: 24, s: 110 }, { k: 'stripes', x: 44, y: 74, s: 100 }],
    items: [
      { t: 'photos', z: 'up', c: [1, 6], srcs: ['besafe-3.webp', 'besafe-2.webp', 'besafe-1.webp'], caption: 'BeSafe launch' },
      { t: 'pin', z: 'up', c: [7, 5], org: 'BeSafe', role: 'Public safety & security AR app',
        head: 'Launched by Olympic medallist PV Sindhu & the State Home Minister',
        logos: [{ src: X + 'besafe-logo.webp', alt: 'BeSafe' }],
        text: 'Built with the Vijayawada City Police, the SHE Team and Technical Hub to raise public safety awareness.' },
      { t: 'pin', z: 'down', c: [1, 4], org: 'HRMS for Oman', role: 'Enterprise digital governance',
        head: 'Launched by the Ministry of Labour, Government of Oman',
        text: 'A complete Human Resource Management System, developed and implemented for the Government of Oman.' },
      { t: 'photos', z: 'down', c: [5, 8], srcs: ['oman-2.webp', 'oman-4.webp', 'oman-1.webp'], caption: 'Ministry of Labour, Oman' },
    ],
  },
]
