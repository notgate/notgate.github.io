export const PROJECT_CATEGORIES = [
  { key: 'professional', label: 'Professional Projects' },
  { key: 'academic', label: 'Academic Projects' },
  { key: 'personal', label: 'Personal Projects' },
] as const

export type ProjectCategoryKey = (typeof PROJECT_CATEGORIES)[number]['key']

export const PROJECT_ROUTES = [
  {
    key: 'speech',
    href: '/speech-to-text.html',
    navLabel: 'Speech-to-Text',
    title: 'Speech-to-Text Audio Communications',
    category: 'professional',
    meta: 'Embedded audio · Rust · Raspberry Pi · KiCad',
    image: '/projects/speech-to-text/carrier-3d.png',
    alt: 'Three-dimensional render of a dual-microphone Raspberry Pi carrier PCB',
    summary: 'A dual-SPH0645 Raspberry Pi audio path combining Rust capture and signal processing, local speech-recognition design, and an editable KiCad carrier board.',
  },
  {
    key: 'vibroacoustic',
    href: '/vibroacoustic-monitoring.html',
    navLabel: 'Vibroacoustic',
    title: 'Vibroacoustic Condition Monitoring',
    category: 'professional',
    meta: 'Current design study · planned hardware',
    image: '/projects/vibroacoustic/prototype-concept.png',
    alt: 'Conceptual two-piezo aluminum cantilever condition-monitoring experiment',
    summary: 'A planned two-piezo aluminum-cantilever experiment for comparing structural response before and after a reversible mass or boundary-condition change.',
  },
  {
    key: 'vhdl',
    href: '/pokemon-vhdl.html',
    navLabel: 'VHDL Architecture',
    title: 'Game Boy–Inspired VHDL Architecture Study',
    category: 'academic',
    meta: 'Academic team project · FPGA-inspired VHDL · VGA timing',
    image: '/projects/pokemon-vhdl/vga-simulation-waveform.png',
    alt: 'ModelSim waveform from the VHDL display-controller simulation',
    summary: 'An academic VHDL architecture study inspired by FPGA-based handhelds, combining a planned Pokémon-style game system with VGA timing, RGB selection, and ModelSim analysis.',
  },
  {
    key: 'search',
    href: '/search-engine.html',
    navLabel: 'Search Engine',
    title: 'Scalable Search Engine',
    category: 'personal',
    meta: 'Data structures · Rust · disk I/O · binary search',
    image: '/projects/search-engine/search-engine-flow.png',
    alt: 'Simple flow diagram for a resource-efficient search engine using sorted pairs and binary search',
    summary: 'A resource-efficient search engine for datasets larger than available memory, using sorted key/value pairs, memory mapping, and binary search for fast local lookups.',
  },
  {
    key: 'switch',
    href: '/switch-modchip.html',
    navLabel: 'Switch Modchip',
    title: 'Nintendo Switch RP2040 Modchip Installation',
    category: 'personal',
    meta: 'Microsoldering · successful Hekate boot',
    image: '/projects/switch-modchip/modchip-closeup.jpg',
    alt: 'Close-up of the RP2040 modchip flex installed beside a Nintendo Switch processor',
    summary: 'A successful RP2040/Picofly microsoldering installation covering teardown, fine-pitch flex work, reassembly, microSD setup, and a completed boot into Hekate.',
  },
] as const

export type ProjectPageKey = (typeof PROJECT_ROUTES)[number]['key']
export type PageKey = 'home' | ProjectPageKey

export function getPageKey(pathname: string): PageKey {
  const normalized = pathname === '/index.html' ? '/' : pathname.replace(/\/$/, '') || '/'
  const project = PROJECT_ROUTES.find(({ href }) => href === normalized)
  return project?.key ?? 'home'
}
