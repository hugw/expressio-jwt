/**
 * Expressio JWT
 *
 * Authorize requests based
 * on JWT Tokens
 *
 * @copyright Copyright (c) 2019, hugw.io
 * @author Hugo W - contact@hugw.io
 * @license MIT
 */

import ejwt from 'express-jwt'
import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'
import ndtk from 'ndtk'
import { sanitize } from 'expressio'
import merge from 'lodash/merge'

/**
 * Object schemas
 * to validate configuration
 */
const schema = Joi.object({
  enabled: Joi.boolean().required(),
  secret: Joi.string().required(),
  expiresIn: Joi.string().required(),
  algorithm: Joi.string().required(),
})

export default (server) => {
  // Load config variables
  const config = merge(ndtk.config(ndtk.req('./config')), server.config)

  const {
    secret,
    expiresIn,
    algorithm,
    enabled,
  } = sanitize(config.jwt, schema, 'Invalid JWT config')

  if (!enabled) return

  // Expose local configs
  // to the server object
  server.config = {
    ...server.config,
    jwt: config.jwt,
  }

  /**
   * Setup JWT authorization
   */
  const setup = ({ ignore = {} }) => {
    const fn = ejwt({ secret }).unless(ignore)
    server.use(fn)
  }

  /**
   * Create JWT tokens
   * with a given signature
   */
  const sign = (data, opts) => jwt.sign({ data }, secret, { expiresIn, ...opts, algorithm })

  /**
   * Verify if provided JWT
   * has a valid signature
   */
  const verify = (token, opts) => jwt.verify(token, secret, opts)

  /**
   * Format JWT authorization errors
   */
  const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      const messages = {
        'jwt expired': 'The token provided has expired',
        'invalid signature': 'The token provided is invalid',
        'jwt malformed': 'The token provided is invalid',
        'No authorization token was found': 'Authorization token is missing',
      }

      const authError = ndtk.httpError(401, { message: messages[err.message] || err.message })
      return next(authError)
    }

    return next(err)
  }

  // Expose JWT Api to the server object
  server.jwt = {
    sign,
    setup,
    verify,
    raw: jwt,
  }

  // Register error handler
  server.events.on('beforeStart', srv => srv.use(errorHandler))
}
