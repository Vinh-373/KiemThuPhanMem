const express = require('express')
const pool = require('../config/database')

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const [products] = await connection.query('SELECT * FROM product WHERE status = 1')
    connection.release()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const connection = await pool.getConnection()
    const [products] = await connection.query('SELECT * FROM product WHERE id = ? AND status = 1', [id])
    connection.release()

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(products[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create product (admin only)

module.exports = router
