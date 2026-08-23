import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('detail-page separators do not clear the floated sidebar', async () => {
  const css = await readFile(new URL('../src/styles/site.css', import.meta.url), 'utf8')
  const rule = css.match(/#contentwide hr\s*\{([^}]*)\}/)?.[1] ?? ''
  assert.doesNotMatch(rule, /clear\s*:\s*both/)
})
