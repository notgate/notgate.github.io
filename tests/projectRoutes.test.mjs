import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { PROJECT_ROUTES, getPageKey } from '../src/projectRoutes.ts'

test('project routes use dedicated HTML pages', () => {
  assert.deepEqual(
    PROJECT_ROUTES.map(({ key, href }) => [key, href]),
    [
      ['speech', '/speech-to-text.html'],
      ['vibroacoustic', '/vibroacoustic-monitoring.html'],
      ['vhdl', '/pokemon-vhdl.html'],
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
  assert.equal(getPageKey('/switch-modchip.html'), 'switch')
  assert.equal(getPageKey('/missing.html'), 'home')
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

test('the VHDL case study does not claim unsupported tools or FPGA hardware', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /Vivado|Basys 3/)
  assert.match(source, /Academic team project with Richard Gill · VHDL · ModelSim · December 2024/)
  assert.match(source, /The original report states that the team worked with no board or output display/)
})

test('active navigation exposes the current page semantically', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  assert.match(source, /aria-current=\{current === 'home' \? 'page' : undefined\}/)
  assert.match(source, /aria-current=\{current === project\.key \? 'page' : undefined\}/)
})
