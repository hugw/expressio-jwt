import config from '@/config'

describe('Expressio JWT / Configs', () => {
  it('should match a valid config object', () => {
    expect(config).toEqual({
      default: {
        jwt: {
          enabled: true,
          expiresIn: '7d',
          algorithm: 'HS256',
          secret: process.env.SECRET || 'cAQk{m04|:b&MCkD2T0S3C!Da$dko7{EN/gtoH{UO:EM`zdGc-~O>U@$yhz.UDA',
        },
      },
      test: {},
      production: {},
    })
  })
})
