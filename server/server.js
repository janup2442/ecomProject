
import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 8000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err)
  process.exit(1)
})
