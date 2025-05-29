const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
//const { v4: uuidv4 } = require('uuid'); (If you want to use UUIDs instead of numeric IDs, you can uncomment this line and modify the code accordingly)
const { readUsers, writeUsers } = require('../utils/file.util');
const { generateToken } = require('../utils/token.util');
const { hashPassword, comparePassword } = require('../utils/hash.util');

exports.createUser = async ({ name, email, password }) => {
    if (!name || !email || !password) throw new Error('Missing fields');

    const users = await readUsers();
    if (users.find(u => u.email === email)) throw new Error('Email already exists');

    const hashedPassword = await hashPassword(password);

    // Generate a new numeric id by incrementing the max existing id
    const maxId = users.length > 0 ? Math.max(...users.map(u => Number(u.id) || 0)) : 0;
    const newUser = new User({
        id: maxId + 1,
        name,
        email,
        password: hashedPassword
    });

    users.push(newUser);
    await writeUsers(users);

    const { password: pw, ...safeUser } = newUser;
    return safeUser;
};

exports.loginUser = async ({ email, password }) => {
    const users = await readUsers();
    const user = users.find(u => u.email === email);
    if (!user || !(await comparePassword(password, user.password)))
        throw new Error('Invalid email or password');

    const token = generateToken({ id: user.id, email: user.email });
    return {
        message: 'Login successful',
        token
    };
};

exports.getAllUsers = async () => {
    const users = await readUsers();
    return users.map(({ password, ...u }) => u);
};

exports.getUserById = async (id) => {
    const users = await readUsers();
    // const user = users.find(u => u.id === id); (If you want to use UUIDs instead of numeric IDs, you can uncomment this line and modify the code accordingly)
    const user = users.find(u => u.id === Number(id));
    if (!user) throw new Error('User not found');

    const { password, ...safeUser } = user;
    return safeUser;
};
