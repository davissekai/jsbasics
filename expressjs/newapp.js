const express = require('express');
const app = express();
app.use(express.json());


let users = []; // in-memory user storage


// Create acc
app.post('/signup', (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password required!');
    }

    users.push({ username, password });
    res.status(201).send('Account created successfully!');
});



// Sign in
app.post('/signin', (req,res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).send('Invalid credentials!');

    }

    res.send('Sign-in successful!');


});


// Change password
app.put('/changepassword', (req,res) => {
    const { username, oldPassword, newPassword } = req.body;

    const user = users.find(user => user.username === username && user.password === oldPassword);
    if (!user) {
        return res.status(401).send('Invalid credentials!');

    }

    user.password = newPassword;
    console.log('Password changed for user:', username);
    res.send('Password changed sucessfully!');
})


// Delete acc
app.delete('/deleteaccount', (req,res) => {
    const { username, password } = req.body;

    const userIndex = users.findIndex(user => user.username === username && user.password === password);
    if (userIndex === -1) {
        return res.status(401).send('Invalid credentials!');

    }

    users.splice(userIndex, 1); 
    console.log('Deleted user:', username);
    res.send('Account deleted successfully!');
});


const port = 3000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
