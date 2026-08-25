import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { PROJECT_CATEGORIES, PROJECT_ROUTES, getPageKey } from '../src/projectRoutes.ts'

test('project routes use dedicated HTML pages', () => {
  assert.deepEqual(
    PROJECT_ROUTES.map(({ key, href }) => [key, href]),
    [
      ['speech', '/speech-to-text.html'],
      ['vibroacoustic', '/vibroacoustic-monitoring.html'],
      ['vhdl', '/pokemon-vhdl.html'],
      ['search', '/search-engine.html'],
      ['switch', '/switch-modchip.html'],
    ],
  )
})

test('page routing resolves the home page and every project page', () => {
  assert.equal(getPageKey('/'), 'home')
  assert.equal(getPageKey('/index.html'), 'home')
  assert.equal(getPageKey('/speech-to-text.html'), 'speech')
  assert.equal(getPageKey('/vibroacoustic-monitoring.html'), 'vibroacoustic')
  assert.equal(getPageKey('/pokemon-vhdl.html'), 'vhdl')
  assert.equal(getPageKey('/search-engine.html'), 'search')
  assert.equal(getPageKey('/switch-modchip.html'), 'switch')
  assert.equal(getPageKey('/missing.html'), 'home')
})

test('projects are organized into the requested professional, academic, and personal groups', () => {
  assert.deepEqual(
    PROJECT_CATEGORIES.map(({ key, label }) => [key, label]),
    [
      ['professional', 'Professional Projects'],
      ['academic', 'Academic Projects'],
      ['personal', 'Personal Projects'],
    ],
  )

  assert.deepEqual(
    PROJECT_ROUTES.map(({ key, category }) => [key, category]),
    [
      ['speech', 'professional'],
      ['vibroacoustic', 'professional'],
      ['vhdl', 'academic'],
      ['search', 'personal'],
      ['switch', 'personal'],
    ],
  )
})

test('every homepage project entry has one concise summary and a preview image', () => {
  for (const project of PROJECT_ROUTES) {
    assert.ok(project.summary.length >= 60)
    assert.ok(project.summary.length <= 220)
    assert.equal(project.summary.includes('\n'), false)
    assert.match(project.image, /^\/projects\//)
    assert.ok(project.alt.length > 20)
  }
})

test('the VHDL case study presents the rebuilt hardware pipeline and removes the old concept artifacts', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  const route = PROJECT_ROUTES.find(({ key }) => key === 'vhdl')
  const start = source.indexOf('function VhdlPage()')
  const end = source.indexOf('function SearchEnginePage()')
  const page = source.slice(start, end)

  assert.equal(route?.title, 'Game Boy–Style VGA Pixel Pipeline')
  assert.equal(route?.image, '/projects/gb-vga/vga-frame.png')
  assert.match(route?.summary ?? '', /VHDL-2008.*640×480 VGA/i)
  assert.match(page, /Academic course concept · ground-up 2026 rebuild · VHDL-2008 · GHDL/)
  assert.match(page, /video-pipeline\.svg/)
  assert.match(page, /vga-frame\.png/)
  assert.match(page, /640×480/)
  assert.match(page, /160×144/)
  assert.match(page, /GHDL synthesis elaboration/)
  assert.match(page, /github\.com\/notgate\/gb_vhdl/)
  assert.match(page, /releases\/tag\/v1\.0\.0/)
  assert.doesNotMatch(page, /Vivado|Basys 3|Analogue Pocket|architecture-diagram\.jpg|vga-output-logic\.png|vga-simulation-waveform\.png|Pokemon-VHDL-Project-Report|player control|battle flow|profile data|random encounters/i)
})

test('active navigation exposes the current page semantically', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  assert.match(source, /aria-current=\{current === 'home' \? 'page' : undefined\}/)
  assert.match(source, /aria-current=\{current === project\.key \? 'page' : undefined\}/)
})

test('project copy leads with achievements instead of audit disclaimers', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  const publicCopy = `${source}\n${JSON.stringify(PROJECT_ROUTES)}`

  assert.doesNotMatch(publicCopy, /do not independently demonstrate|without claiming a verified final|Scope an FPGA project|no board or output display|not the final boot state|not successfully validated|available functional evidence|candid boundaries|what remains unfinished|validation boundaries/)
  assert.match(publicCopy, /successfully reached Hekate/)
  assert.match(publicCopy, /simulation-generated VGA frame/i)
})

test('speech and Switch pages present the tutorials used as references', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')

  assert.match(source, /youtube-nocookie\.com\/embed\/aIadwRaK6F0/)
  assert.match(source, /youtube\.com\/watch\?v=P4ZWLazR6xQ&t=928s/)
  assert.match(source, /switch-install-guide-preview\.jpg/)
  assert.match(source, /Speech-To-Text on the Edge/)
  assert.match(source, /Nintendo Switch OLED PicoFly Modchip Install Guide/)
})

test('the personal search-engine case study stays concise and product-agnostic', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  const start = source.indexOf('function SearchEnginePage()')
  const end = source.indexOf('function SwitchPage()')
  const searchPage = source.slice(start, end)

  assert.match(searchPage, /Scalable Search Engine/)
  assert.match(searchPage, /key\/value pairs/i)
  assert.match(searchPage, /binary search/i)
  assert.match(searchPage, /memory mapping/i)
  assert.match(searchPage, /search-engine-flow\.png/)
  assert.doesNotMatch(searchPage, /href="https?:|commercial|production|customer|client|credential|threat|billion|\d{1,3}(,\d{3}){2,}/i)
})
