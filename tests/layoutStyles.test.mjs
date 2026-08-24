import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('detail-page separators do not clear the floated sidebar', async () => {
  const css = await readFile(new URL('../src/styles/site.css', import.meta.url), 'utf8')
  const rule = css.match(/#contentwide hr\s*\{([^}]*)\}/)?.[1] ?? ''
  assert.doesNotMatch(rule, /clear\s*:\s*both/)
})

test('the shared shell uses the supplied image banner and simplified footer credit', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  const css = await readFile(new URL('../src/styles/site.css', import.meta.url), 'utf8')

  assert.match(source, /src="\/assets\/banner-d9897f4c\.jpg"/)
  assert.doesNotMatch(source, /src="\/assets\/banner-dcf21bf6\.png"/)
  assert.match(source, /Template design by/)
  assert.doesNotMatch(source, /Project hierarchy informed by/)
  assert.doesNotMatch(source, /Embedded systems · signal processing · hardware design/)
  assert.doesNotMatch(source, /Short project summaries here; complete engineering evidence/)
  assert.match(css, /\.site-banner\s*\{[^}]*height\s*:\s*auto[^}]*width\s*:\s*100%/s)
})

test('profile links include compact GitHub and LinkedIn icons before their labels', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  const css = await readFile(new URL('../src/styles/site.css', import.meta.url), 'utf8')

  assert.match(source, /<ProfileIcon kind="github" \/>GitHub profile/)
  assert.match(source, /<ProfileIcon kind="linkedin" \/>LinkedIn profile/)
  assert.match(css, /\.profile-link-icon\s*\{[^}]*height\s*:\s*16px[^}]*width\s*:\s*16px/s)
})

test('the NYIT mark stays secondary to the education text', async () => {
  const css = await readFile(new URL('../src/styles/site.css', import.meta.url), 'utf8')

  assert.match(css, /\.education-mark\s*\{[^}]*width\s*:\s*68px/s)
  assert.match(css, /@media \(max-width:680px\)[\s\S]*\.education-mark\s*\{width:56px;\}/)
})

test('the requested portfolio heading appears above the banner', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')

  assert.match(source, /<header id="header">[\s\S]*Uthso Paul, B\.E\. - Engineering Portfolio[\s\S]*<\/header>/)
  assert.doesNotMatch(source, /className="visually-hidden"/)
})

test('the supplied profile photo floats into the Overview like the reference layout', async () => {
  const source = await readFile(new URL('../src/PortfolioApp.tsx', import.meta.url), 'utf8')
  const css = await readFile(new URL('../src/styles/site.css', import.meta.url), 'utf8')

  assert.match(source, /src="\/assets\/profile-d846a823\.jpg"/)
  assert.match(source, /alt="Portrait of Uthso Paul"/)
  assert.match(css, /\.profile-photo\s*\{[^}]*float\s*:\s*right[^}]*width\s*:\s*181px/s)
  assert.match(css, /@media \(max-width:680px\)[\s\S]*\.profile-photo\s*\{[^}]*float\s*:\s*none/s)
})
