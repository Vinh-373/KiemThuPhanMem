const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running' })
})

// Database connection test
const pool = require('./config/database')

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n========================================`)
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ API endpoints ready:`)
  console.log(`  - POST   /api/auth/register`)
  console.log(`  - POST   /api/auth/login`)
  console.log(`  - GET    /api/products`)
  console.log(`  - GET    /api/products/:id`)
  console.log(`  - POST   /api/products`)
  console.log(`  - PUT    /api/products/:id`)
  console.log(`  - DELETE /api/products/:id`)
  console.log(`========================================\n`)
})
