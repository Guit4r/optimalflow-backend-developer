const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
