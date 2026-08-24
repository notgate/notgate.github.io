# Uthso Paul — Engineering Portfolio

Source for the engineering portfolio published at **https://notgate.github.io/**.

The homepage is a concise project index organized into Professional, Academic, and Personal Projects. Each project links to a dedicated HTML case-study page with its design story, engineering decisions, images, results, and lessons:

- dual-microphone offline speech-to-text on Raspberry Pi;
- vibroacoustic condition-monitoring design work;
- a Game Boy–inspired VHDL architecture study;
- a resource-efficient search engine built around disk-aware data structures;
- an RP2040/Picofly Nintendo Switch modchip installation.

Profile and header photography will be added later.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run test
npm run typecheck
npm run build
```

Vite builds `index.html` plus five standalone project entries so direct GitHub Pages links do not depend on a client-side routing fallback. The GitHub Pages workflow deploys `dist/` whenever `main` is updated.
