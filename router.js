const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
const express = require('express');
const { Product } = require('../models');
const { authenticate, authorize } = require('../middlewares/authMiddleware');


router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
router.post('/admin/products', authenticate, authorize('admin'), async (req, res) => {
    try {
        const { name, description, category, scheduled_start_date, old_price, new_price, vendor_id, free_delivery, delivery_amount } = req.body;
        const expiry_date = new Date(new Date(scheduled_start_date).getTime() + 7 * 24 * 60 * 60 * 1000);
        const product = await Product.create({ name, description, category, scheduled_start_date, expiry_date, old_price, new_price, vendor_id, free_delivery, delivery_amount });
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll({ include: { model: User, as: 'vendor', attributes: ['name', 'email'] } });
        res.json(products.map(p => ({
            ...p.toJSON(),
            discount_percentage: ((p.old_price - p.new_price) / p.old_price * 100).toFixed(2),
            discount_amount: (p.old_price - p.new_price).toFixed(2)
        })));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

router.get('/products/search', async (req, res) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const { count, rows } = await Product.findAndCountAll({
            where: { name: { [Op.like]: `%${q}%` } },
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        res.json({ total: count, page, limit, products: rows });
    } catch (error) {
        res.status(500).json({ message: 'Error searching products' });
    }
});


module.exports = router;
