import config from '@/config'

describe('Expressio JWT / Configs', () => {
  it('should match a valid config object', () => {
    expect(config).toEqual({
      default: {
        jwt: {
          enabled: true,
          expiresIn: '7d',
          algorithm: 'HS256',
          secret: null,
        },
      },
      test: {},
      production: {},
    })
  })
})
