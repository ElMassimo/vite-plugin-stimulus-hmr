import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import { build, InlineConfig } from 'vite'
import { describe, test, expect } from 'vitest'
import glob from 'fast-glob'

const exampleRoot = resolve(__dirname, '../example')

function compiledFile (fileWithExt: string) {
  const [file, ext] = fileWithExt.split('.')
  const [filename] = glob.sync(join(exampleRoot, `dist/assets/${file}.*.${ext}`))
  expect(filename).not.toEqual(undefined)
  return readFileSync(filename, { encoding: 'utf8' })
}

async function buildApp (options?: InlineConfig) {
  const root = resolve(__dirname, '../example')
  await build({ root: exampleRoot, logLevel: 'warn', ...options })
}

describe('build', () => {
  test('does not interfere with the build process', async () => {
    await buildApp()
    const index = compiledFile('index.js')
    expect(index).not.toContain('$$StimulusApp$$')
    expect(index).not.toContain('import.meta.hot')

    const vendor = compiledFile('vendor.js')
    expect(vendor).not.toContain('$$StimulusApp$$')
  }, 5000)
})
