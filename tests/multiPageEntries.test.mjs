import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pages = [
  ['speech-to-text.html', 'Speech-to-Text Audio Communications'],
  ['vibroacoustic-monitoring.html', 'Vibroacoustic Condition Monitoring'],
  ['pokemon-vhdl.html', 'Game Boy–Inspired VHDL Architecture Study'],
  ['search-engine.html', 'Scalable Search Engine'],
  ['switch-modchip.html', 'Nintendo Switch RP2040 Modchip Installation'],
]

test('every project has a dedicated Vite HTML entry', async () => {
  for (const [file] of pages) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
    assert.match(html, /<title>Uthso Paul, B\.E<\/title>/)
    assert.match(html, /<script type="module" src="\/src\/main\.tsx"><\/script>/)
  }
})

test('the homepage uses the same concise browser-tab title', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /<title>Uthso Paul, B\.E<\/title>/)
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
    assert.match(html, /<link rel="icon" type="image\/png" sizes="128x128" href="\/assets\/favicon\.png" \/>/)
  }
})

test('the supplied project reference images are published as local assets', async () => {
  for (const file of [
    '../public/projects/pokemon-vhdl/analogue-pocket-reference.png',
    '../public/projects/switch-modchip/hekate-success.png',
    '../public/projects/switch-modchip/switch-install-guide-preview.jpg',
    '../public/projects/search-engine/search-engine-flow.png',
    '../public/assets/favicon.png',
    '../public/assets/banner-d9897f4c.jpg',
    '../public/assets/profile-d846a823.jpg',
  ]) {
    const image = await readFile(new URL(file, import.meta.url))
    assert.ok(image.byteLength > 1000)
  }
})

test('the UP favicon is an RGBA PNG with transparency support', async () => {
  const favicon = await readFile(new URL('../public/assets/favicon.png', import.meta.url))

  assert.equal(favicon.readUInt32BE(16), 128)
  assert.equal(favicon.readUInt32BE(20), 128)
  assert.equal(favicon[25], 6)
})
