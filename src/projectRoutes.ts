export const PROJECT_ROUTES = [
  {
    key: 'speech',
    href: '/speech-to-text.html',
    navLabel: 'Speech-to-Text',
    title: 'Speech-to-Text Audio Communications',
    category: 'Embedded audio · Rust · Raspberry Pi · KiCad',
    image: '/projects/speech-to-text/carrier-3d.png',
    alt: 'Three-dimensional render of a dual-microphone Raspberry Pi carrier PCB',
    summary: 'A dual-SPH0645 Raspberry Pi audio path combining Rust capture and signal processing, local speech-recognition design, and an editable KiCad carrier board.',
  },
  {
    key: 'vibroacoustic',
    href: '/vibroacoustic-monitoring.html',
    navLabel: 'Vibroacoustic',
    title: 'Vibroacoustic Condition Monitoring',
    category: 'Current design study · planned hardware',
    image: '/projects/vibroacoustic/prototype-concept.png',
    alt: 'Conceptual two-piezo aluminum cantilever condition-monitoring experiment',
    summary: 'A planned two-piezo aluminum-cantilever experiment for comparing structural response before and after a reversible mass or boundary-condition change.',
  },
  {
    key: 'vhdl',
    href: '/pokemon-vhdl.html',
    navLabel: 'VHDL Architecture',
    title: 'Game Boy–Inspired VHDL Architecture Study',
    category: 'Academic team project · VHDL · VGA timing',
    image: '/projects/pokemon-vhdl/vga-simulation-waveform.png',
    alt: 'ModelSim waveform from the VHDL display-controller simulation',
    summary: 'An ambitious academic hardware-architecture study whose strongest demonstrated work was VGA timing, pixel selection, and ModelSim inspection—not a completed game CPU.',
  },
  {
    key: 'switch',
    href: '/switch-modchip.html',
    navLabel: 'Switch Modchip',
    title: 'Nintendo Switch RP2040 Modchip Installation',
    category: 'Early personal project · microsoldering',
    image: '/projects/switch-modchip/modchip-closeup.jpg',
    alt: 'Close-up of the RP2040 modchip flex installed beside a Nintendo Switch processor',
    summary: 'An introductory RP2040/Picofly microsoldering project documenting teardown and installed hardware, without claiming a verified final custom-firmware boot.',
  },
] as const

export type ProjectPageKey = (typeof PROJECT_ROUTES)[number]['key']
export type PageKey = 'home' | ProjectPageKey

export function getPageKey(pathname: string): PageKey {
  const normalized = pathname === '/index.html' ? '/' : pathname.replace(/\/$/, '') || '/'
  const project = PROJECT_ROUTES.find(({ href }) => href === normalized)
  return project?.key ?? 'home'
}
