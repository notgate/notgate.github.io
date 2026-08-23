import assert from 'node:assert/strict'
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
