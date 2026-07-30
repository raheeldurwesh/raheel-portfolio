// ============================================
// AI HEADQUARTERS DATA — Raheel Parvez Durwesh
// ============================================

export const OWNER = {
  name: 'Raheel Parvez Durwesh',
  role: 'AI Software Developer & Product Architect',
  tagline: 'Building AI-powered software that solves real-world problems through intelligent automation, modern software engineering, and AI technologies.',
  subtitles: [
    'AI Software Developer',
    'Python Developer',
    'Aspiring AI & Data Science Engineer',
  ],
  missionStatement: 'I don\'t just learn technology. I build products with it.',
  email: 'raheel.durwesh@example.com',
  github: 'https://github.com/raheeldurwesh',
  linkedin: 'https://www.linkedin.com/in/raheelparvezdurwesh',
  instagram: 'https://www.instagram.com/raheeldurwesh',
} as const;

export const NAV_LINKS = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Products', href: '#products' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Founder', href: '#founder' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
] as const;

export interface ProjectFeature {
  label: string;
}

export interface ProjectButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technicalChallenges: string;
  technologies: string[];
  outcome: string;
  architecture?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  color: string;
  colorRgb: string;
  features: ProjectFeature[];
  buttons: ProjectButton[];
  stats?: { label: string; value: string }[];
  caseStudy?: CaseStudy;
}

export const PRODUCTS: Product[] = [
  {
    id: 'rex',
    title: 'REX',
    subtitle: 'AI Desktop Assistant',
    tagline: 'Voice-controlled desktop automation & intelligent productivity engine.',
    description:
      'A powerful AI desktop assistant with 120+ voice commands, capable of desktop automation, AI conversations, OCR, messaging integration, and system monitoring — all controlled by natural voice.',
    color: '#3B82F6',
    colorRgb: '59, 130, 246',
    features: [
      { label: '120+ Voice Commands' },
      { label: 'AI Conversations' },
      { label: 'Desktop Automation' },
      { label: 'OCR' },
      { label: 'WhatsApp Automation' },
      { label: 'Telegram Integration' },
      { label: 'Translation' },
      { label: 'Email Automation' },
      { label: 'Weather' },
      { label: 'System Monitoring' },
      { label: 'Focus Mode' },
      { label: '6,600+ Lines of Code' },
    ],
    buttons: [
      { label: 'Live Demo', href: 'https://rex-ai-raheel.vercel.app/', variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/raheeldurwesh', variant: 'secondary' },
      { label: 'Architecture', href: '#', variant: 'secondary' },
      { label: 'Case Study', href: '#', variant: 'secondary' },
    ],
    stats: [
      { label: 'Voice Commands', value: '120+' },
      { label: 'Lines of Code', value: '6,600+' },
      { label: 'Integrations', value: '10+' },
    ],
    caseStudy: {
      overview: 'REX is an AI-powered desktop assistant designed to make everyday computer interaction more natural through voice, automation, and intelligent task execution. Instead of acting as a traditional chatbot, REX combines conversational AI with desktop automation to assist users in real-world workflows.',
      problem: 'Most desktop assistants are limited to answering questions or opening applications. They rarely combine AI, voice interaction, desktop control, messaging, productivity tools, and automation into a single experience. Users often switch between multiple applications for tasks like translation, reminders, messaging, system monitoring, and information retrieval.',
      solution: 'I designed REX as an intelligent desktop assistant capable of understanding voice commands, interacting with AI models, controlling the operating system, and automating repetitive tasks through a unified interface. The goal was to create an assistant that feels practical rather than just conversational.',
      keyFeatures: [
        '120+ Voice Commands', 'AI Conversations', 'Desktop Automation', 'OCR (Screen Text Recognition)',
        'WhatsApp Automation', 'Telegram Remote Control', 'Email Automation', 'Translation',
        'Weather & News', 'Focus Mode', 'Timers & Reminders', 'System Monitoring',
        'Voice Recognition', 'Modern Holographic Dashboard'
      ],
      technicalChallenges: 'One of the biggest challenges was combining multiple independent systems into a single responsive application. Some challenges included: Managing multiple APIs reliably. Synchronizing voice recognition with desktop automation. Maintaining responsive UI while executing long-running tasks. Building a modular architecture for future expansion. Handling asynchronous events and background processes.',
      technologies: ['Python', 'SpeechRecognition', 'Edge TTS', 'Selenium', 'OCR', 'Telegram Bot API', 'REST APIs', 'Async Programming', 'Desktop Automation'],
      outcome: 'REX became my flagship AI project and demonstrates my ability to combine Artificial Intelligence, automation, and software engineering into a complete desktop application.',
      architecture: `                                         USER
                                           │
                     Voice Command / Text Command / UI Click
                                           │
                                           ▼
                     ┌────────────────────────────────────┐
                     │        Input Processing Layer      │
                     │------------------------------------│
                     │ Speech Recognition                 │
                     │ Text Input                         │
                     │ Wake Word Detection                │
                     └────────────────────────────────────┘
                                           │
                                           ▼
                     ┌────────────────────────────────────┐
                     │      Command Processing Engine     │
                     │------------------------------------│
                     │ Intent Detection                   │
                     │ Command Parser                     │
                     │ Context Manager                    │
                     │ Conversation Memory                │
                     └────────────────────────────────────┘
                                           │
                 ┌─────────────────────────┼──────────────────────────────┐
                 │                         │                              │
                 ▼                         ▼                              ▼
      AI Processing Layer        Automation Layer              Utility Layer
                 │                         │                              │
                 │                         │                              │
        OpenRouter / Gemini         File Explorer                  OCR Engine
        AI Chat Engine              Application Launcher           Translation
        Prompt Builder              Browser Controller             Weather
        Response Generator          Window Automation              News
                                    Keyboard & Mouse              Calculator
                                    Screenshot                   Notes
                                    Clipboard                    Timers
                                    System Commands              Focus Mode
                 │                         │                              │
                 └─────────────────────────┼──────────────────────────────┘
                                           │
                                           ▼
                     ┌────────────────────────────────────┐
                     │ Integration Services               │
                     │------------------------------------│
                     │ WhatsApp Automation                │
                     │ Telegram Bot                       │
                     │ Email Service                      │
                     │ Music Player                       │
                     │ Web Search                         │
                     └────────────────────────────────────┘
                                           │
                                           ▼
                     ┌────────────────────────────────────┐
                     │      Response Generation Layer     │
                     │------------------------------------│
                     │ Text Formatter                     │
                     │ UI Log Generator                   │
                     │ Notification Manager               │
                     │ Edge TTS                           │
                     └────────────────────────────────────┘
                                           │
                                           ▼
                    Voice Response + Dashboard + Desktop Action`
    }
  },
  {
    id: 'tableserve',
    title: 'TableServe',
    subtitle: 'AI Restaurant SaaS Platform',
    tagline: 'Next-generation contactless dining, real-time kitchen dispatch & AI menu translation.',
    description:
      'A multi-tenant SaaS platform for restaurants featuring AI chat assistance, QR ordering, real-time order management, role-based dashboards (Admin, Waiter, Customer), and comprehensive revenue analytics.',
    color: '#06B6D4',
    colorRgb: '6, 182, 212',
    features: [
      { label: 'Multi Tenant SaaS' },
      { label: 'AI Chat Assistant' },
      { label: 'AI Menu Translation' },
      { label: 'Realtime Orders' },
      { label: 'QR Ordering' },
      { label: 'Admin Dashboard' },
      { label: 'Customer Dashboard' },
      { label: 'Waiter Dashboard' },
      { label: 'Analytics' },
      { label: 'Payment Integration' },
      { label: 'Supabase' },
      { label: 'React' },
    ],
    buttons: [
      { label: 'Live Demo', href: 'https://table-serve.vercel.app/', variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/raheeldurwesh', variant: 'secondary' },
      { label: 'Architecture', href: '#', variant: 'secondary' },
      { label: 'Case Study', href: '#', variant: 'secondary' },
    ],
    stats: [
      { label: 'Role Dashboards', value: '3' },
      { label: 'SaaS Architecture', value: 'Multi-Tenant' },
      { label: 'Sync Engine', value: 'Realtime' },
    ],
    caseStudy: {
      overview: 'TableServe is a full-stack AI-powered Restaurant SaaS platform designed to modernize restaurant operations through intelligent automation, real-time synchronization, and role-based management. Rather than building a basic restaurant management system, the objective was to create a scalable platform capable of serving multiple restaurants from a single application.',
      problem: 'Many restaurants still rely on fragmented systems for order management, billing, customer interaction, and analytics. This leads to: Slow service, Manual coordination, Poor operational visibility, Limited customer engagement, Inefficient workflows.',
      solution: 'TableServe provides a centralized cloud-based platform where restaurant owners, staff, and customers interact in real time through dedicated dashboards. Artificial Intelligence enhances customer interaction while automation reduces operational complexity.',
      keyFeatures: [
        'Multi-Tenant SaaS Architecture', 'Super Admin Dashboard', 'Restaurant Dashboard',
        'Waiter Dashboard', 'Customer Dashboard', 'QR-Based Ordering', 'AI Chat Assistant',
        'AI Menu Translation', 'Real-Time Order Synchronization', 'Analytics Dashboard',
        'Payment Integration', 'Secure QR Validation', 'Voice Alerts', 'Customer Engagement Features'
      ],
      technicalChallenges: 'Building TableServe required solving several architectural problems: Designing a scalable multi-tenant database. Managing multiple user roles and permissions. Synchronizing restaurant orders in real time. Integrating AI services into restaurant workflows. Maintaining security between restaurant tenants.',
      technologies: ['React', 'JavaScript', 'Supabase', 'PostgreSQL', 'REST APIs', 'Artificial Intelligence', 'Real-Time Database', 'QR Technology'],
      outcome: 'TableServe demonstrates full-stack software engineering, SaaS architecture, real-time systems, and AI integration while solving practical business problems.',
      architecture: `                              CUSTOMER / WAITER / ADMIN
                                          │
                                          ▼
                               React Frontend (Web App)
                                          │
               ┌──────────────────────────┼──────────────────────────┐
               │                          │                          │
               ▼                          ▼                          ▼
        Customer Portal           Waiter Dashboard           Admin Dashboard
               │                          │                          │
               └──────────────────────────┼──────────────────────────┘
                                          ▼
                              Authentication & Authorization
                                          │
                                          ▼
                              Role-Based Access Control
                                          │
                                          ▼
                              Business Logic Layer
        ┌────────────────────────────┬────────────────────────────┐
        │                            │                            │
        ▼                            ▼                            ▼
 Order Management             Table Management           Restaurant Settings
        │                            │                            │
        ▼                            ▼                            ▼
 Menu Management              QR Ordering               User Management
        │                            │                            │
        └────────────────────────────┼────────────────────────────┘
                                     ▼
                             AI Services Layer
        ┌────────────────────────────┼────────────────────────────┐
        ▼                            ▼                            ▼
 AI Chat Assistant         AI Menu Translation          AI Insights
                                     │
                                     ▼
                              Supabase Backend
        ┌────────────────────────────┼────────────────────────────┐
        ▼                            ▼                            ▼
 Authentication             PostgreSQL Database          Realtime Engine
        │                            │                            │
        ▼                            ▼                            ▼
 Storage                  Orders / Users / Menu        Live Order Sync
                                     │
                                     ▼
                            Payment Gateway Integration
                                     │
                                     ▼
                             Customer Notifications`
    }
  },
  {
    id: 'rexai',
    title: 'REX AI',
    subtitle: 'AI Web Platform',
    tagline: 'High-speed async AI search engine with streaming token response generation.',
    description:
      'A modern web-based AI platform with streaming responses, authentication, Google Search integration, built on FastAPI with an async backend for lightning-fast inference.',
    color: '#8B5CF6',
    colorRgb: '139, 92, 246',
    features: [
      { label: 'FastAPI' },
      { label: 'Streaming AI' },
      { label: 'Authentication' },
      { label: 'Google Search' },
      { label: 'Async Backend' },
      { label: 'Modern UI' },
    ],
    buttons: [
      { label: 'Live Demo', href: 'https://rex-ai-raheel.vercel.app/', variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/raheeldurwesh', variant: 'secondary' },
      { label: 'Architecture', href: '#', variant: 'secondary' },
      { label: 'Case Study', href: '#', variant: 'secondary' },
    ],
    stats: [
      { label: 'Inference Delay', value: '<500ms' },
      { label: 'Search Indexing', value: 'Live' },
      { label: 'Backend Architecture', value: 'Async' },
    ],
    caseStudy: {
      overview: 'REX AI is a modern web-based AI platform designed to provide fast conversational AI with a clean user experience and scalable backend architecture. Unlike a simple chatbot, the platform focuses on reliable AI interaction, streaming responses, authentication, and extensibility.',
      problem: 'Many AI web interfaces prioritize conversation but overlook scalability, responsiveness, and architecture. The challenge was to create a production-style AI application with a modern backend and frontend.',
      solution: 'I developed a web platform that combines conversational AI with modern backend practices including streaming responses, authentication, API management, and responsive design.',
      keyFeatures: [
        'Conversational AI', 'Streaming Responses', 'Authentication', 'Modern Responsive UI',
        'FastAPI Backend', 'Google Search Integration', 'API Key Management', 'Asynchronous Processing'
      ],
      technicalChallenges: 'Managing multiple AI API providers. Implementing streaming responses. Designing scalable backend architecture. Optimizing frontend responsiveness. Handling asynchronous requests efficiently.',
      technologies: ['FastAPI', 'Python', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'Authentication', 'Async Programming'],
      outcome: 'REX AI demonstrates backend engineering, AI integration, modern web development, and scalable software architecture.',
      architecture: `                              USER
                               │
                               ▼
                         React Frontend
                               │
          ┌────────────────────┼─────────────────────┐
          ▼                    ▼                     ▼
     Login/Register       Chat Interface       Settings
          │                    │                     │
          └────────────────────┼─────────────────────┘
                               ▼
                      Authentication Layer
                               │
                               ▼
                         FastAPI Backend
                               │
         ┌─────────────────────┼─────────────────────────┐
         ▼                     ▼                         ▼
   AI Request Handler     Search Handler         Conversation Manager
         │                     │                         │
         ▼                     ▼                         ▼
 OpenRouter API         Google Search API        Chat History
         │                     │                         │
         └─────────────────────┼─────────────────────────┘
                               ▼
                      Response Processing
                               │
                               ▼
                     Streaming Response Engine
                               │
                               ▼
                       React Chat Interface
                               │
                               ▼
                        User Receives Response`
    }
  },
];

export const PROJECTS = PRODUCTS;

export const ENGINEERING_STACK = [
  {
    category: 'Artificial Intelligence',
    description: 'LLM Prompt Engineering, Voice Recognition, OCR, Intelligent Automation',
    chips: ['NLP', 'Voice Processing', 'Tesseract OCR', 'OpenAI API', 'Speech Synthesis'],
  },
  {
    category: 'Python',
    description: 'Core Language, AsyncIO, Multi-Threading, System Automation, Scripts',
    chips: ['Python 3.11', 'AsyncIO', 'PyQt', 'Subprocess Automation', 'REST Clients'],
  },
  {
    category: 'Frontend',
    description: 'Modern Web UIs, Next.js, React, Tailwind CSS, Framer Motion, Three.js',
    chips: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: 'Backend',
    description: 'High-performance APIs, Microservices, Async Endpoints, Database Schemas',
    chips: ['FastAPI', 'Supabase', 'PostgreSQL', 'WebSockets', 'REST API', 'Auth JWT'],
  },
  {
    category: 'Automation',
    description: 'Desktop OS Control, Messaging APIs, Web Scraping, Task Pipelines',
    chips: ['PyAutoGUI', 'Twilio / WhatsApp API', 'Telegram Bot API', 'Selenium', 'BeautifulSoup'],
  },
  {
    category: 'Data Science',
    description: 'Data Analysis, Vector Math, Scientific Computing, Data Visualization',
    chips: ['NumPy', 'Pandas', 'Matplotlib', 'Jupyter', 'Git'],
  },
];

export const TIMELINE = [
  {
    year: '2023',
    title: 'Started Programming & AI Development',
    description: 'Began the journey into computer science, algorithms, and advanced Python automation.',
  },
  {
    year: '2026',
    title: 'Built REX AI Desktop Assistant',
    description: 'Created a full-blown desktop AI assistant with 120+ voice commands in 6,600+ lines of Python code.',
  },
  {
    year: '2026',
    title: 'Built TableServe SaaS',
    description: 'Designed and deployed a multi-tenant AI restaurant platform with real-time kitchen synchronization.',
  },
  {
    year: '2026',
    title: 'Built REX AI Web Platform',
    description: 'Engineered a high-performance web AI engine using FastAPI and async streaming token architecture.',
  },
  {
    year: '2026',
    title: 'Advanced Machine Learning & AI Engineering',
    description: 'Diving deep into neural networks, deep learning models, and advanced data science pipelines.',
  },
  {
    year: 'Next',
    title: 'Building Future AI Products',
    description: 'Expanding product research and creating autonomous AI agents to transform human workflows.',
  },
];

export const STATS = [
  { value: 3, suffix: '', label: 'Flagship Products' },
  { value: 120, suffix: '+', label: 'Voice Commands' },
  { value: 10000, suffix: '+', label: 'Lines of Code' },
  { value: 20, suffix: '+', label: 'Technologies' },
];

export const BOOT_SEQUENCE = [
  { text: 'Energizing the Chipset...', duration: 950 },
  { text: 'REX OS Booting...', duration: 850 },
  { text: 'Loading AI Core...', duration: 750 },
  { text: 'Initializing Products...', duration: 650 },
  { text: 'Access Granted.', duration: 500 },
];

export const RESEARCH_ARTICLES = [
  {
    id: '1',
    title: 'Architecting Voice-Controlled Desktop Agents in Python',
    category: 'Artificial Intelligence',
    date: '2026',
    readTime: '6 min read',
    snippet: 'An in-depth breakdown of multi-threaded audio listening, phrase recognition, and zero-latency command parsing in Python desktop software.',
  },
  {
    id: '2',
    title: 'Async Token Streaming with FastAPI & Server-Sent Events',
    category: 'Backend Engineering',
    date: '2026',
    readTime: '8 min read',
    snippet: 'How to build lightning-fast web APIs that stream LLM tokens directly to Next.js clients with minimal time-to-first-token latency.',
  },
  {
    id: '3',
    title: 'Multi-Tenant SaaS State Synchronization with Supabase Realtime',
    category: 'System Architecture',
    date: '2026',
    readTime: '7 min read',
    snippet: 'Designing real-time kitchen display synchronization, role-based database permissions, and dynamic customer ordering queues.',
  },
];
