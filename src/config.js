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
      secret: null,
    },
  },

  // Test environment
  test: {},

  // Production environment
  production: {},
}
