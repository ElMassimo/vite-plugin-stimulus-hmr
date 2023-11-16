import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { type InlineConfig, build } from 'vite'
import { describe, expect, it } from 'vitest'
import glob from 'fast-glob'

const exampleRoot = resolve(__dirname, '../example')

function compiledFile (fileWithExt: string) {
  const [file, ext] = fileWithExt.split('.')
  const [filename] = glob.sync(join(exampleRoot, `dist/assets/${file}-*.${ext}`))
  expect(filename).not.toEqual(undefined)
  return readFileSync(filename, { encoding: 'utf8' })
}

async function buildApp (options?: InlineConfig) {
  await build({ root: exampleRoot, logLevel: 'warn', ...options })
}

describe('build', () => {
  it('does not interfere with the build process', async () => {
    await buildApp()
    const index = compiledFile('index.js')
    expect(index).not.toContain('$$StimulusApp$$')
    expect(index).not.toContain('import.meta.hot')

    const vendor = compiledFile('vendor.js')
    expect(vendor).not.toContain('$$StimulusApp$$')
  }, 5000)
})
