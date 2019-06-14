import expressio from 'expressio'
import jwt from '@'

const app = expressio()

app.initialize('jwt', jwt)

app.jwt.setup({
  ignore: {
    path: ['/public'],
  },
})

app.get('/private', (req, res) => {
  res.json(req.user)
})

app.get('/public', (req, res) => {
  res.status(204).json()
})

export default app
