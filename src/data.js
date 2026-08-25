// All site content, mapped from the Aug 2026 resume (Kanav_Singla_Resume_1.pdf).
// Domains drive the color system: each entry is tagged with one.
//   voice  = voice & inference (amber)
//   models = models & training (green)
//   product = product & business (lilac)
//   autonomy = autonomy & robotics (blue)

export const contact = {
  name: 'kanav singla',
  location: 'Toronto, ON, Canada',
  email: 'navsngla@gmail.com',
  phone: '+1 647 936 7827',
  linkedin: 'https://linkedin.com/in/kanavsinglaa',
  github: 'https://github.com/kanavsinglaa',
  resume: '/resume.pdf',
}

export const intro = [
  { t: 'at ' },
  { t: 'sadie ai', url: 'https://www.heysadie.ai/', icon: '/logos/sadie.png' },
  { t: ' i work on models & inference for voice: shaving ' },
  { t: 'the silence before the first word', hl: 'voice' },
  { t: ', trimming the token bill behind every turn, teaching small models to do big-model work, and cleaning data until the evals mean something. i co-founded ' },
  { t: 'ampliphi', hl: 'product', url: 'https://www.getampliphi.com/about-us', icon: '/logos/ampliphi.png' },
  { t: ' and grew it from zero to half a million arr in a year. earlier i trained ' },
  { t: 'planning models', hl: 'autonomy' },
  { t: ' for self-driving cars at ' },
  { t: 'huawei’s noah’s ark lab', url: 'https://auto.huawei.com/en/ads', icon: '/logos/huawei.png' },
  { t: '. the thread through all of it is ' },
  { t: 'ai and creativity', hl: 'models' },
  { t: ': i like hard problems and instruments that feel alive.' },
]

export const updated = 'august 2026'

/* A paper closes on future work. These are open, not settled. */
export const openQuestions = [
  {
    domain: 'voice',
    q: 'where does the expressivity and latency frontier in speech synthesis actually sit, and is it a modelling limit or an engineering one?',
  },
  {
    domain: 'models',
    q: 'do evaluation harnesses transfer across verticals, or does every vertical earn its own gold set from scratch?',
  },
  {
    domain: 'autonomy',
    q: 'what can closed-loop evaluation for language agents borrow from autonomous driving simulation? i have built both and they still feel further apart than they should.',
  },
  {
    domain: 'product',
    q: 'how small can a model get before turn-level decisions stop being reliable, and what is the right test for that boundary?',
  },
  {
    domain: 'models',
    q: 'which parts of an agent belong in a prompt at all, given that emergent prompt behaviour cannot be tested and a classifier can?',
  },
]

export const discussion = [
  {
    title: 'speed',
    domain: 'voice',
    text: 'model stacks have a half-life of months now. i treat that as the game: learn continuously, push each new tool to its cracks, and ship with it while everyone else is still forming an opinion.',
  },
  {
    title: 'taste',
    domain: 'product',
    text: 'i got here through the bridge between ai and creativity: generative art, music, interfaces that feel alive. products get judged with a designer’s eye, not just a benchmark suite.',
  },
  {
    title: 'depth',
    domain: 'autonomy',
    text: 'taste without depth is decoration. mine is earned: training planning models end-to-end for huawei’s self-driving lab, and engineering science at uoft, the most rigorous undergraduate engineering program in canada.',
  },
]

export const experience = [
  {
    id: 'sadie',
    icon: '/logos/sadie.png',
    role: 'models & inference',
    org: 'Sadie AI',
    url: 'https://www.heysadie.ai/',
    sub: 'voice AI for hospitality, live in 1,500+ restaurants and hotels',
    when: 'apr 2026 → present',
    where: 'toronto',
    domain: 'voice',
    points: [
      'cut first-sentence latency 218 ms to 22 ms; benchmarked GPU endpoints to low-200 ms p50 time-to-first-token.',
      'fine-tune models for specific verticals so restaurants, hotels, and car rental each book in their own language.',
      'shipped an int8 ONNX classifier (40% to 87% accuracy) that cut per-turn LLM tokens 20% input and 33% output on live production calls.',
      'cut LLM spend ~55% with a targeted inference migration, validated independently by finance to within 4%.',
      'own the data path end to end: mine production calls, build labeling pipelines, and freeze gold eval sets before every training run.',
      'stabilized turn-to-turn delivery, cutting acoustic discontinuity 72% on call replays.',
      'killed two costly bets with data, not opinion, using traps the baseline fails by design.',
    ],
  },
  {
    id: 'ampliphi',
    icon: '/logos/ampliphi.png',
    role: 'technical co-founder & ai lead',
    org: 'Ampliphi',
    url: 'https://www.getampliphi.com/about-us',
    sub: 'dynamic pricing & AI demand aggregator for hospitality · a Valsoft company',
    when: 'jan 2025 → apr 2026',
    where: 'toronto',
    domain: 'product',
    points: [
      'owned the complete MVP: backend, ML and LLM architecture, and the end-to-end AI team.',
      'built the platform from 0 to half a million ARR in under a year, focused on boutique hotels and hotel chains across the US, Canada, and Australia.',
      'shipped demand forecasting, compression-event consolidation, and dynamic pricing to 150+ hotels.',
      'layered LLM pricing insights and LLM-extracted event signals into demand forecasts.',
      'hired and led the AI team, owning the evaluation bar every model cleared before it touched customer pricing.',
    ],
  },
  {
    id: 'valsoft',
    icon: '/logos/valsoft.png',
    role: 'ai solutions lead',
    org: 'Valsoft / Aspire Software',
    url: 'https://www.valsoftcorp.com/ai-labs/ai-ventures',
    sub: 'ai founding engineer (2023) · ai solutions architect (2024) · ai solutions lead (2025)',
    when: 'jun 2023 → apr 2026',
    where: 'toronto',
    domain: 'models',
    points: [
      'first AI hire; built Valsoft’s M&A sourcing platform on LLM extraction and retrieval.',
      'turned it into a repeatable acquisition-sourcing engine, funded by parent firm Valsef.',
      'grew from sole contributor to owning AI architecture across the portfolio.',
      'shipped AI features from prototype to revenue with portfolio SaaS teams.',
    ],
  },
  {
    id: 'huawei',
    icon: '/logos/huawei.png',
    role: 'ai research engineer',
    org: 'Noah’s Ark Lab, Huawei',
    url: 'https://auto.huawei.com/en/ads',
    sub: '15-month PEY research internship, alongside a team of senior researchers',
    when: 'jun 2021 → sep 2022',
    where: 'markham',
    domain: 'autonomy',
    points: [
      'contributed to the research, the implementation, and the patents behind a learning-based planning stack for Huawei’s self-driving system.',
      'trained large planning models end to end over large public perception, prediction, and planning datasets, on distributed GPU runs.',
      'benchmarked imitation learning against reinforcement learning for planning; reproduced state-of-the-art papers as team baselines.',
      'built a modular, RL-friendly closed-loop CARLA environment that materially cut iteration time across the team.',
    ],
  },
]

export const contributions = [
  {
    n: '01',
    title: 'hard problems in hospitality',
    domain: 'product',
    text: 'messy, real-world demand, solved in production: voice agents live in 1,500+ restaurants and hotels, dynamic pricing running on 150+ properties, and a platform i co-founded that went from zero to half a million arr in a year.',
  },
  {
    n: '02',
    title: 'first-in, last-mile voice',
    domain: 'voice',
    text: 'owning the edge of the conversation: inference optimized until answers feel instant, llm spend cut by more than half, and small fine-tuned models doing big-model work on live calls.',
  },
  {
    n: '03',
    title: 'planning models that drive',
    domain: 'autonomy',
    text: 'contributed to patents and end-to-end planning for huawei’s self-driving system: multimodal data pipelines, distributed training, and closed-loop evaluation.',
  },
]

export const research = [
  {
    title: 'learned online adaptation for autonomous racing',
    kicker: 'undergraduate thesis',
    titleUrl: 'https://www.tri.global/our-work/human-interactive-driving',
    titleEmoji: '🏎️',
    orgSegs: [
      { t: 'Toronto Intelligent Systems Lab', url: 'https://tisl.cs.toronto.edu/' },
      { t: ' × ' },
      {
        t: 'Toyota Research Institute',
        url: 'https://www.tri.global/our-work/human-interactive-driving',
        chip: 'autonomy',
      },
    ],
    when: 'sep 2022 → jun 2023',
    domain: 'autonomy',
    spec: [
      ['question', ['can a racing vehicle adapt its own behaviour at run time, as conditions change underneath it?']],
      ['approach', ['learned online adaptation, updating behaviour mid-run', 'no assumption that the track still matches training']],
      ['setting', ['TISL, advised by Prof. Igor Gilitschenski', 'at the limit of handling, where grip decides the lap']],
    ],
  },
  {
    title: 'contraband detection in x-ray baggage scans',
    kicker: 'machine learning summer researcher',
    orgSegs: [{ t: 'University of Toronto', url: 'https://www.utoronto.ca/' }],
    when: 'may → aug 2020',
    domain: 'models',
    spec: [
      ['question', ['which architecture holds up when a missed threat costs far more than a false alarm?']],
      ['approach', ['transfer learning, TensorFlow / Keras', 'led analysis and testing of 25+ detection and classification architectures', 'tuned the strongest for recall at real-time inference']],
      ['result', ['+10% recall from the architecture study', '94% recall at real-time speed, deployed at Seoul–Incheon International Airport']],
      ['outcome', ['secured follow-on research funding', 'UofT fellowship award']],
    ],
  },
  {
    title: 'satellite-imagery ML for malaria prevention',
    kicker: 'junior machine learning engineer',
    orgSegs: [
      { t: 'Omdena', url: 'https://www.omdena.com/' },
      { t: ' × ' },
      { t: 'Zzapp Malaria', url: 'https://zzappmalaria.com/', chip: 'models' },
    ],
    when: 'jul → sep 2020',
    domain: 'models',
    spec: [
      ['question', ['where should limited spraying effort go to prevent the most malaria?']],
      ['approach', ['satellite imagery models, one of 50 global contributors']],
      ['result', ['shipped into Zzapp’s planning tool, then an XPRIZE finalist', 'Zzapp went on to win the $5M IBM Watson AI XPRIZE']],
    ],
  },
]

export const projects = [
  {
    title: 'computer vision lead, autonomous rover team',
    org: 'UofT Robotics Association',
    url: 'https://www.utra.ca/',
    when: '2021 → 2022',
    domain: 'autonomy',
    textSegs: [
      { t: 'built two rovers from scratch for the ' },
      { t: 'Intelligent Ground Vehicle Competition', url: 'http://www.igvc.org/' },
      { t: '; led a 15-person vision team on an agile cycle, deploying detection and classification with TorchScript.' },
    ],
  },
  {
    title: 'software developer',
    org: 'sMart, student marketplace',
    url: null,
    when: 'jul → oct 2020',
    domain: 'product',
    text: 'built a student and mentor marketplace with personalized mentor recommendations. Django, React.',
  },
]

export const education = {
  school: 'University of Toronto',
  schoolUrl: 'https://www.utoronto.ca/',
  programUrl: 'https://engsci.utoronto.ca/',
  degree: 'BASc, Engineering Science (honors)',
  detail: 'robotics & AI · minor in business · 2018 → 2023',
}

export const skills = [
  {
    group: 'models & training',
    domain: 'models',
    items: ['PyTorch', 'HuggingFace', 'LoRA / PEFT fine-tuning', 'post-training', 'quantization', 'distributed GPU training'],
  },
  {
    group: 'inference & serving',
    domain: 'voice',
    items: ['ONNX Runtime', 'real-time streaming inference', 'TTFT & latency profiling', 'WebRTC / LiveKit pipelines', 'TorchScript'],
  },
  {
    group: 'problem domains',
    domain: 'autonomy',
    items: ['voice (TTS / STT)', 'LLMs & retrieval', 'computer vision', 'planning & control'],
  },
  {
    group: 'data & evaluation',
    domain: 'product',
    items: ['dataset curation', 'labeling pipelines', 'gold eval sets', 'adversarial test design', 'A/B testing', 'cost & capacity modeling'],
  },
  {
    group: 'ai-native development',
    domain: 'models',
    items: ['Claude Code', 'Cursor', 'Codex', 'MCP server design', 'context engineering', 'eval-gated agent workflows'],
  },
  {
    group: 'engineering',
    domain: 'product',
    items: ['Python', 'SQL', 'Docker', 'CI/CD', 'AWS / GCP'],
  },
]

export const coursework = {
  courses: [
    { t: 'deep learning & neural networks', meta: 'csc413 · graduate level', star: true },
    { t: 'intro to machine learning' },
    { t: 'control systems' },
    { t: 'probability & statistics' },
    { t: 'linear algebra' },
    { t: 'data structures & algorithms' },
  ],
  footnote: 'csc413 was taught by Jimmy Ba, who went on to co-found xAI.',
  honours: [
    'multiple dean’s honours list',
    'euclid math contest honour roll · ranked 13th',
  ],
}
