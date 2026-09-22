export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  tag: string
  year: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  summary: string
  architectureNodes: { label: string; description: string }[]
  highlights: string[]
}

export interface Certification {
  title: string
  issuer: string
  status?: string
  type: 'certification' | 'course' | 'achievement'
}

export interface SkillCategory {
  name: string
  tagline: string
  skills: string[]
}

export const PERSONAL_INFO = {
  name: 'Sujit Gorai',
  firstName: 'SUJIT',
  lastName: 'GORAI',
  role: 'Full Stack Java Developer',
  positioning: 'Full Stack Java Developer | Spring Boot & REST APIs',
  location: 'Dhanbad, Jharkhand',
  university: 'Asansol Engineering College',
  degree: 'Bachelor of Technology — Computer Science & Engineering (AI & ML)',
  graduationYear: '2027',
  cgpa: '7.54 / 10',
  currentYear: 'Computer Science Student',
  email: 'sujitgorai920@gmail.com',
  phone: '+91 6205196015',
  github: 'https://github.com/sujitcodes01-dev',
  githubHandle: '@sujitcodes01-dev',
  // TODO: replace with your real LinkedIn profile URL (the CV link only points to linkedin.com/feed)
  linkedin: 'https://www.linkedin.com/in/sujit-gorai-6797032a0/',
  summary:
    'Full Stack Java Developer skilled in Spring Boot, JavaScript, and building end-to-end web applications. I like building real-world problem-solving applications, designing REST APIs, and working with relational databases to build reliable, scalable backend systems.',
  statementBig: 'I BUILD BACKENDS THAT REAL APPLICATIONS RUN ON.',
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'smartstock',
    number: '01',
    title: 'SMARTSTOCK',
    subtitle: 'Inventory & Warehouse Management System',
    tag: 'FULL-STACK INVENTORY SYSTEM',
    year: '2026',
    technologies: ['Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'ModelMapper', 'HTML', 'CSS', 'JavaScript', 'Neon', 'Render'],
    // TODO: add githubUrl once you have the repository link
    liveUrl: 'https://lnkd.in/d6QFFRYk',
    summary:
      'A web-based application to manage products, warehouses, users, and inventory in one place.',
    architectureNodes: [
      { label: 'CONTROLLER LAYER', description: 'REST endpoints for products, warehouses, users, and stock operations.' },
      { label: 'SERVICE LAYER', description: 'Business logic for stock-in and stock-out, kept separate from the web layer.' },
      { label: 'DATA ACCESS', description: 'Spring Data JPA / Hibernate repositories backed by PostgreSQL on Neon.' },
      { label: 'DTO MAPPING', description: 'ModelMapper converts entities to DTOs so the API never exposes raw entities.' },
      { label: 'FRONTEND', description: 'HTML, CSS, and JavaScript pages integrated with the Spring Boot backend.' },
      { label: 'DEPLOYMENT', description: 'Deployed on Render with a managed Neon PostgreSQL database.' },
    ],
    highlights: [
      'REST APIs for product and warehouse management, including stock-in and stock-out operations',
      'Spring Boot integrated with PostgreSQL on Neon using Spring Data JPA / Hibernate',
      'Entity-to-DTO conversion with ModelMapper',
      'Simple HTML, CSS, and JavaScript frontend integrated with the backend',
      'Deployed on Render',
    ],
  },
  {
    id: 'codedrop',
    number: '02',
    title: 'CODEDROP',
    subtitle: 'Time-Bound Code Snippet Sharing Platform',
    tag: 'FULL-STACK SNIPPET SHARING',
    year: '2026',
    technologies: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Monaco Editor', 'Docker', 'Render', 'Vercel'],
    summary:
      'A full-stack platform for securely sharing immutable code snippets through unique access codes with configurable validity periods.',
    architectureNodes: [
      { label: 'SNIPPET API', description: 'RESTful endpoints to create and retrieve snippets by access code.' },
      { label: 'ACCESS CODES', description: 'Every snippet is shared through a unique code with a configurable validity period.' },
      { label: 'READ-ONLY ACCESS', description: 'Snippets cannot be modified after publication.' },
      { label: 'EXPIRY', description: 'Expired snippets are deactivated and removed from PostgreSQL automatically.' },
      { label: 'REACT FRONTEND', description: 'React interface with the Monaco editor for writing and viewing code.' },
      { label: 'DEPLOYMENT', description: 'Backend on Render with a multi-stage Docker build, frontend on Vercel.' },
    ],
    highlights: [
      'Immutable code snippets shared through unique access codes',
      'RESTful APIs in Java and Spring Boot that enforce read-only access after publication',
      'Time-based snippet expiration that removes expired snippets from PostgreSQL',
      'Production setup with a multi-stage Dockerfile, deployed on Render and Vercel',
    ],
  },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'LANGUAGES',
    tagline: 'Languages I use across my projects.',
    skills: ['Java', 'Python', 'SQL', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    name: 'BACKEND',
    tagline: 'Building reliable server-side applications.',
    skills: ['Spring Boot', 'REST APIs', 'Spring Data JPA', 'Backend Development'],
  },
  {
    name: 'FRONTEND',
    tagline: 'Building interfaces that talk to my backends.',
    skills: ['React', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    name: 'DATABASES',
    tagline: 'Relational databases and hosted Postgres.',
    skills: ['MySQL', 'PostgreSQL', 'Neon'],
  },
  {
    name: 'CORE COMPUTER SCIENCE',
    tagline: 'Core concepts that shape how I build software.',
    skills: [
      'Object-Oriented Programming',
      'Data Structures & Algorithms',
      'Database Management Systems',
    ],
  },
  {
    name: 'TOOLS & DEPLOYMENT',
    tagline: 'Tools I use to build, test, and ship projects.',
    skills: ['Git', 'GitHub', 'Postman', 'IntelliJ IDEA', 'DBeaver', 'Render'],
  },
  {
    name: 'AI & PROMPT ENGINEERING',
    tagline: 'AI tools I use to work faster.',
    skills: ['Prompt Engineering', 'ChatGPT', 'Claude', 'Gemini'],
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Smart India Hackathon (SIH) 2024',
    issuer: 'Government of India',
    status: '4TH PLACE',
    type: 'achievement',
  },
  {
    title: 'Building Full Stack E-Commerce App using SpringBoot',
    issuer: 'Udemy',
    type: 'certification',
  },
  {
    title: 'Progressive JavaScript Learning Path: Fundamentals to Advanced',
    issuer: 'Cursa',
    type: 'certification',
  },
]
