import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from '../template'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

// ONLY in development: webpack middleware & HMR
import devBundle from './devBundle'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../frontend/App'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()
const isDev = process.env.NODE_ENV === 'development'

// --- Development bundle (HMR + webpack middleware) ---
devBundle.compile(app)

// --- Standard middleware ---
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// --- Static asset serving ---
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// --- API routes ---
app.use('/', userRoutes)
app.use('/', authRoutes)

// --- React Server-Side Render handler ---
app.get('*', (req, res) => {
  if (isDev) {
    return res
      .status(200)
      .send(
        Template({
          markup: '',  // no markup yet, will be filled by React
          css: ''      // no inlined CSS needed when using Tailwind
        })
      )
  }

  // Prod: real SSR 
  const context = {}

  // Render the app to a string, within a StaticRouter
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )

  // Redirect on React-router <Redirect>
  if (context.url) {
    return res.redirect(303, context.url)
  }

  // Send HTML with the rendered markup; CSS is linked in your template
  return res
    .status(200)
    .send(
      Template({
        markup,      // the React HTML
        css: ''      // no inlined CSS needed when using Tailwind
      })
    )
})

// --- Error handling for auth ---
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: `${err.name}: ${err.message}` })
  }
  if (err) {
    console.error(err)
    return res.status(400).json({ error: `${err.name}: ${err.message}` })
  }
  next()
})

export default app
