import { describe, test, expect } from 'vitest'

// @vitest-environment happy-dom

describe('development', () => {
  test('adds HMR injection', async () => {
    // @ts-ignore $$StimulusApp$$ is injected by the HMR plugin.
    const { app, $$StimulusApp$$ } = await import('../example/controllers')
    expect($$StimulusApp$$).toEqual(app)

    // @ts-ignore
    const modules: Map<string, any> = app.router.modulesByIdentifier
    const controllers = Array.from(modules.keys())
    expect(controllers).toEqual(['home', 'hello', 'image--reveal'])
  })
})
