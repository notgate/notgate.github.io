import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pages = [
  ['speech-to-text.html', 'Speech-to-Text Audio Communications'],
  ['vibroacoustic-monitoring.html', 'Vibroacoustic Condition Monitoring'],
  ['pokemon-vhdl.html', 'Game Boy–Inspired VHDL Architecture Study'],
  ['switch-modchip.html', 'Nintendo Switch RP2040 Modchip Installation'],
]

test('every project has a dedicated Vite HTML entry', async () => {
  for (const [file, title] of pages) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
    assert.match(html, new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} — Uthso Paul</title>`))
    assert.match(html, /<script type="module" src="\/src\/main\.tsx"><\/script>/)
  }
})

test('Vite builds every project entry', async () => {
  const config = await readFile(new URL('../vite.config.ts', import.meta.url), 'utf8')
  for (const [file] of pages) {
    assert.match(config, new RegExp(file.replace('.', '\\.')))
  }
})

test('every page declares the shared favicon', async () => {
  for (const [file] of [['index.html'], ...pages]) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
    assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="\/assets\/favicon\.svg" \/>/)
  }
})

test('the supplied project reference images are published as local assets', async () => {
  for (const file of [
    '../public/projects/pokemon-vhdl/analogue-pocket-reference.png',
    '../public/projects/switch-modchip/hekate-success.png',
    '../public/projects/switch-modchip/switch-install-guide-preview.jpg',
  ]) {
    const image = await readFile(new URL(file, import.meta.url))
    assert.ok(image.byteLength > 1000)
  }
})
