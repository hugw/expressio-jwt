/**
 * Default configs
 *
 * @copyright Copyright (c) 2019, hugw.io
 * @author Hugo W - contact@hugw.io
 * @license MIT
 */

export default {
  default: {
    jwt: {
      enabled: true,
      expiresIn: '7d',
      algorithm: 'HS256',
      secret: process.env.SECRET || 'cAQk{m04|:b&MCkD2T0S3C!Da$dko7{EN/gtoH{UO:EM`zdGc-~O>U@$yhz.UDA',
    },
  },

  // Test environment
  test: {},

  // Production environment
  production: {},
}
