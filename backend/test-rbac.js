async function testRBAC() {
    console.log('--- Testing RBAC ---');

    // 1. Get an Employee Token
    let employeeToken;
    try {
        const employeeRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'employee@test.com', password: 'employee123' })
        });
        const employeeData = await employeeRes.json();
        employeeToken = employeeData.token;
        console.log(`Employee Token acquired: ${!!employeeToken}`);
    } catch (error) {
        console.error('Failed to get employee token. Make sure the user exists.');
        return;
    }

    // 2. Test GET Products with Employee Token (Should Succeed 200)
    try {
        const getProductsRes = await fetch('http://localhost:5000/api/products', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${employeeToken}` }
        });
        console.log(`[Employee] GET /api/products -> Status: ${getProductsRes.status} (Expected: 200)`);
    } catch (e) {
        console.error(e)
    }

    // 3. Test POST Products with Employee Token (Should Fail 403 Forbidden)
    try {
        const createProductRes = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${employeeToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Test Aspirina",
                sku: "TES123",
                base_price: 15.5
            })
        });
        console.log(`[Employee] POST /api/products -> Status: ${createProductRes.status} (Expected: 403)`);
    } catch (e) {
        console.error(e)
    }

    // 4. Test missing Token (Should Fail 401 Unauthorized)
    try {
        const noTokenRes = await fetch('http://localhost:5000/api/products', {
            method: 'GET'
        });
        console.log(`[No User] GET /api/products -> Status: ${noTokenRes.status} (Expected: 401)`);
    } catch (e) {
        console.error(e)
    }
}

testRBAC();
