const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/database')

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' })
    }

    const connection = await pool.getConnection()
    
    // Check if user exists
    const [users] = await connection.query('SELECT * FROM user WHERE username = ?', [username])
    
    if (users.length > 0) {
      connection.release()
      return res.status(400).json({ message: 'Username already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    await connection.query('INSERT INTO user (username, password, role, status) VALUES (?, ?, ?, ?)', 
      [username, hashedPassword, 'user', 1])
    connection.release()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' })
    }

    const connection = await pool.getConnection()
    const [users] = await connection.query('SELECT * FROM user WHERE username = ?', [username])
    connection.release()

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    const user = users[0]
    
    if (user.status === 0) {
      return res.status(400).json({ message: 'Account is locked' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username, role: user.role } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
