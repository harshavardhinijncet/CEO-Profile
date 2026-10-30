// The leadership timeline. Only dated milestones, checked against Babji Sir's profile site
// (Babji-Sir-s-Profile-main/src/sections/About.jsx and Expertise.jsx):
//   Aug 1997 – Dec 2004  Teaching period (Expertise)      — APTECH, Datapro, ICSS, NetGSC, Aditya colleges
//   Feb 2005 – Jan 2016  IT Industry period (Expertise)   — IBM, Wipro Technologies
//   2016  Foundation of Technical Hub (About + Expertise)
//   2019  Enterprise Solutions Expansion (About)
//   2025  Launch of Torii Minds, backed by NCC (About + Expertise)
//   2026  AI partnerships — Claude, OpenAI, Sarvam AI (Company Profile app; year confirmed by the user)
// Undated items on the site (GITEX, BeSafe, Oman HRMS, DriveReady, T-Connect…) are deliberately left out.
// Logos come from the same site's /public folder.

const logo = name => `/assets/journey/${name}`

export const journey = {
  kicker: 'Leadership Journey',
  standfirst: 'Three decades across teaching, global IT and entrepreneurship.',
}

export const chapters = [
  {
    years: 'Aug 1997 – Dec 2004', phase: 'The Educator', icon: 'board', // non-breaking spaces: a range only wraps at the dash
    title: 'Learning to teach technology',
    text: 'From Lab Technician at APTECH to Senior Trainer at NetGSC, then faculty at Aditya colleges.',
    points: ['Lab Technician at APTECH', 'Trainer at Datapro, ICSS & NetGSC', 'Faculty at Aditya colleges'],
    roles: ['Lab Technician', 'Technical Trainer', 'Faculty'],
    logos: [],
    marks: ['board', 'book', 'cap'],   // no partner logos: line emblems fill the same circles
  },
  {
    years: 'Feb 2005 – Jan 2016', phase: 'The Technologist', icon: 'globe',
    title: 'Eleven years in global IT',
    text: 'Java Software Engineer at IBM, then Project Manager at Wipro Technologies.',
    points: ['Java Software Engineer at IBM', 'Project Manager at Wipro Technologies'],
    roles: ['Java Engineer · IBM', 'Project Manager · Wipro'],
    logos: [{ src: logo('logo-ibm.png'), alt: 'IBM' }, { src: logo('logo-wipro.png'), alt: 'Wipro Technologies' }],
  },
  {
    years: '2016', phase: 'The Founder', icon: 'bulb',
    title: 'Technical Hub is founded',
    text: 'A skill development and incubation centre bridging academia and industry.',
    points: ['Skill development & incubation centre', 'Bridging academia and industry'],
    roles: ['Founder & CEO'],
    logos: [{ src: logo('logo-th-mark.png'), alt: 'Technical Hub' }],
  },
  {
    years: '2019', phase: 'The Builder', icon: 'layers',
    title: 'Enterprise solutions',
    text: 'From training centre to solutions company, building apps for corporate clients.',
    points: ['From training centre to solutions company', 'Custom apps for corporate clients'],
    roles: ['Enterprise apps', 'Corporate clients'],
    logos: [],
    marks: ['code', 'app', 'office'],
  },
  {
    years: '2025', phase: 'The Next Chapter', icon: 'spark',
    title: 'Torii Minds is launched',
    text: 'An AI-driven tech education platform, backed by NCC, making engineers industry-ready.',
    points: ['AI-driven tech education platform', 'Backed by NCC', 'Industry-ready engineers'],
    roles: ['Founder & CEO', 'Backed by NCC'],
    logos: [{ src: logo('logo-torii.svg'), alt: 'Torii Minds' }, { src: logo('logo-ncc.png'), alt: 'NCC Limited', via: 'backed by' }],
  },
  {
    // year as given by the user; partner statuses from the Company Profile app's "AI partners" block
    years: '2026', phase: 'The AI Era', icon: 'chip',
    title: 'The AI-first shift',
    text: 'Partnering with Claude, OpenAI and Sarvam AI to lead AI-first education.',
    points: ['Claude, OpenAI & Sarvam AI partner', 'Leading AI-first education'],
    roles: ['Claude Partner', 'OpenAI Select Partner', 'Sarvam AI'],
    logos: [{ src: logo('logo-claude.png'), alt: 'Anthropic Claude' }, { src: logo('logo-openai.png'), alt: 'OpenAI' }, { src: logo('logo-sarvam.png'), alt: 'Sarvam AI' }],
  },
]
