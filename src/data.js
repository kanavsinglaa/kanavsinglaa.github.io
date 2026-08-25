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
  { t: 'i bridge ' },
  { t: 'ai and creativity', hl: 'models' },
  { t: '. at ' },
  { t: 'sadie ai', url: 'https://www.heysadie.ai/' },
  { t: ' i work on models & inference for voice: shaving ' },
  { t: 'the silence before the first word', hl: 'voice' },
  { t: ', trimming the token bill behind every turn, teaching small models to do big-model work, and cleaning data until the evals mean something. i co-founded ' },
  { t: 'ampliphi', hl: 'product', url: 'https://www.getampliphi.com/about-us' },
  { t: ' and grew it from zero to half a million arr in a year. earlier i trained ' },
  { t: 'planning models', hl: 'autonomy' },
  { t: ' for self-driving cars at ' },
  { t: 'huawei’s noah’s ark lab', url: 'https://github.com/huawei-noah' },
  { t: '. i like hard problems and instruments that feel alive.' },
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
    role: 'ai solutions lead',
    org: 'Valsoft / Aspire Software',
    url: 'https://www.aspiresoftware.com/ai-labs/',
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
    role: 'ai research engineer',
    org: 'Noah’s Ark Lab, Huawei',
    url: 'https://github.com/huawei-noah',
    sub: null,
    when: 'jun 2021 → sep 2022',
    where: 'markham',
    domain: 'autonomy',
    points: [
      'shipped a learning-based planning stack for Huawei’s self-driving system.',
      'trained large planning models end to end: multimodal data pipelines, distributed GPU runs, and closed-loop evaluation.',
      'benchmarked imitation learning against reinforcement learning for planning; reproduced state-of-the-art papers as team baselines.',
      'built a modular closed-loop CARLA simulator used for RL training and offline evaluation.',
      'contributed to team patents on learning-based autonomy.',
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
    title: 'undergraduate thesis: autonomous racing',
    orgSegs: [
      { t: 'Toronto Intelligent Systems Lab', url: 'https://tisl.cs.toronto.edu/' },
      { t: ' × ' },
      {
        t: 'Toyota Research Institute',
        url: 'https://www.tri.global/our-work/human-interactive-driving',
        emoji: '🏎️',
      },
    ],
    when: '2022 → 2023',
    domain: 'autonomy',
    points: [
      'joint TISL and Toyota Research Institute project on autonomous racing.',
      'learned online adaptation as track conditions shift at run time.',
      'advised by Prof. Igor Gilitschenski (TISL).',
    ],
  },
  {
    title: 'machine learning summer researcher',
    orgSegs: [{ t: 'University of Toronto', url: 'https://www.utoronto.ca/' }],
    when: 'may → aug 2020',
    domain: 'models',
    points: [
      'evaluated 25+ detection models; lifted recall 10%.',
      'shipped a 94%-recall real-time pipeline to Incheon Airport.',
      'won a UofT fellowship award.',
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
      { t: 'led vision pipelines for two ' },
      { t: 'IGVC', url: 'http://www.igvc.org/' },
      { t: ' competition rovers; deployed detection and classification with TorchScript; managed a 15-person team.' },
    ],
  },
  {
    title: 'junior machine learning engineer',
    org: 'Omdena',
    url: 'https://www.omdena.com/',
    when: 'jul → sep 2020',
    domain: 'models',
    textSegs: [
      { t: 'built satellite-imagery ML for malaria prevention with ' },
      { t: 'Zzapp Malaria', url: 'https://zzappmalaria.com/' },
      { t: ', winner of the $5M IBM Watson AI XPRIZE.' },
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
  detail: 'specialization in robotics and AI · minor in business · 2018 → 2023',
}

export const skills = [
  {
    group: 'machine learning',
    domain: 'models',
    items: ['PyTorch', 'HuggingFace', 'LLMs & RAG', 'fine-tuning (LoRA / PEFT)', 'quantization', 'computer vision'],
  },
  {
    group: 'real-time & voice ai',
    domain: 'voice',
    items: ['real-time streaming inference', 'TTS / STT voice models', 'WebRTC / LiveKit pipelines', 'latency & throughput optimization', 'ONNX Runtime'],
  },
  {
    group: 'data & evaluation',
    domain: 'product',
    items: ['dataset curation & labeling pipelines', 'eval harness & benchmark design', 'A/B testing', 'cost & capacity modeling'],
  },
  {
    group: 'ai-native development',
    domain: 'autonomy',
    items: ['Claude Code', 'Cursor', 'Codex', 'MCP server design', 'context engineering', 'eval-gated agent workflows'],
  },
  {
    group: 'engineering',
    domain: 'models',
    items: ['Python', 'SQL', 'Docker', 'CI/CD', 'AWS / GCP'],
  },
]
