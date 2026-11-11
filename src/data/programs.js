// Signature programmes — the flagship programmes run by Technical Hub and Torii Minds.
// Each card: a small square that plays a silent loop (`loop`) or cycles photos, the full film
// (`video`) opens in the big player, `photos` open in the viewer.
// Media copied from the Road Map, Company Profile and Thub Presentation apps.

const P = '/assets/programs/'

export const programmes = {
  kicker: 'Signature Programmes',
  standfirst: 'Flagship programmes that take a student from the first line of code to the first offer.',
}

export const programs = [
  {
    id: 'tconnect', name: 'T-Connect', tag: 'Industry meets campus', hue: '#2fae4e',
    logo: P + 'tconnect.png', loop: P + 'tconnect-loop.mp4', video: P + 'tconnect.mp4', poster: P + 'tc-poster.webp',
    stat: '25,000+', statLabel: 'visitors · 7 editions',
    text: 'Technical Hub’s annual tech expo: trainees demo live projects at industry stalls for Oracle, Pega and more.',
    photos: ['tc-1.webp', 'tc-2.webp', 'tc-3.webp', '/assets/gallery/press-2.webp'],
  },
  {
    id: 'driveready', name: 'DriveReady', tag: 'Placement-ready programme', hue: '#ef6a2b',
    logo: P + 'driveready.png', loop: P + 'driveready-loop.mp4', video: P + 'driveready.mp4', poster: P + 'dr-poster.webp',
    stat: '5,000+', statLabel: 'certified · 7 editions',
    text: '100 days on industry stacks such as AWS, Flutter, Full Stack and Data, ending in certification and placement drives.',
    photos: ['dr-1.webp', 'dr-4.webp', 'dr-2.webp', 'dr-3.webp', 'dr-5.webp'],
  },
  {
    id: 'owlcoder', name: 'Owl Coder', tag: 'Final-year programme', hue: '#e0a100',
    logo: P + 'owl.png', loop: P + 'owlcoder-loop.mp4', video: P + 'owlcoder.mp4', poster: P + 'owl-poster.webp',
    stat: '5.0', statLabel: 'editions to date',
    text: 'Live projects, deployment and the placement run, with problem solving right up to the offer.',
    photos: ['owl-1.webp', 'owl-2.webp', 'owl-3.webp', '/assets/gallery/owl-booth.webp'],
  },
  {
    id: 'projectspace', name: 'Project Space', tag: 'Identify · Solve · Deploy', hue: '#2f8fd8',
    logo: P + 'project-space-t.png',
    stat: '3,000+', statLabel: 'internships · 8 seasons',
    text: 'Hundreds of trainees ship real projects every season inside a 24×7 innovation space.',
    photos: ['ps-1.webp', 'ps-2.webp', 'ps-3.webp', 'ps-4.webp', 'ps-5.webp', 'ps-6.webp'],
  },
  {
    id: 'projectstreet', name: 'Project Street', tag: 'Every project, out in the open', hue: '#0d0d0d',
    logo: P + 'project-street.png', loop: P + 'projectstreet-loop.mp4', video: P + 'projectstreet.mp4', poster: P + 'st-poster.webp',
    stat: 'Open air', statLabel: 'showcase on the campus walkway',
    text: 'Work set up on easels along the campus walkway, explained to mentors, faculty and the crowd at every board.',
    photos: ['st-1.webp', 'st-2.webp', 'st-3.webp', 'st-4.webp', 'st-5.webp'],
  },
].map(p => ({ ...p, photos: p.photos.map(s => (s.startsWith('/') ? s : P + s)) }))
