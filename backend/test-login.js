async function testLogin(email, password) {
    console.log(`\nTesting login for: ${email}`);
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(`Status: ${response.status}`);
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function runTests() {
    // 1. Valid login
    await testLogin('admin@example.com', 'admin123');

    // 2. Invalid password
    await testLogin('admin@example.com', 'wrongpassword');

    // 3. Invalid email format
    await testLogin('notanemail', 'admin123');
}

runTests();
