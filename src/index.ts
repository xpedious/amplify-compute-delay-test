import express from 'express'

const app = express()

// Default route
app.get('/', (_req, res) => {
  res.send('Hello from Express')
})

const port = Number(process.env.PORT ?? 3000)

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
}

export default app
