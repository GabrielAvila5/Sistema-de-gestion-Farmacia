async function testDashboard() {
    console.log('--- Empezando Tests del Dashboard ---');

    // 1. Obtener Token de Admin
    let adminToken;
    try {
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' })
        });
        const loginData = await loginRes.json();
        adminToken = loginData.token;
        console.log(`[AUTH] Admin logueado para acceder al dashboard.`);
    } catch (e) {
        console.error('Error logueando admin. Revisa DB seed.');
        return;
    }

    try {
        const dashboardRes = await fetch('http://localhost:5000/api/dashboard/summary', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            }
        });

        const summary = await dashboardRes.json();
        console.log(`[DASHBOARD] GET /api/dashboard/summary -> Status: ${dashboardRes.status} (Esperado 200)`);
        console.log(`[DASHBOARD] Ventas de Hoy: $${summary.todaysSales}`);
        console.log(`[DASHBOARD] Citas Programadas Hoy: ${summary.todaysAppointments}`);
        console.log(`[DASHBOARD] Productos en Stock Crítico: ${summary.criticalStock?.length || 0}`);
        console.log(`[DASHBOARD] Lotes Próximos a Caducar: ${summary.expiringBatches?.length || 0}`);

    } catch (e) { console.log('Error conectando al endpoint del dashboard:', e) }
}

testDashboard();
