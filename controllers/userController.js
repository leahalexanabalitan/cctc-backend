const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', data: user });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'User added successfully', data: newUser });
        console.log("This is a demo for add user api");
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
};

