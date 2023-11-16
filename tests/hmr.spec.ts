import { describe, expect, it } from 'vitest'

// @vitest-environment happy-dom

describe('development', () => {
  it('adds HMR injection', async () => {
    // @ts-expect-error $$StimulusApp$$ is injected by the HMR plugin.
    const { app, $$StimulusApp$$ } = await import('../example/controllers')
    expect($$StimulusApp$$).toEqual(app)

    // @ts-expect-error using private variable
    const modules: Map<string, any> = app.router.modulesByIdentifier
    const controllers = Array.from(modules.keys())
    expect(controllers).toEqual(['home', 'hello', 'image--reveal'])
  })
})
