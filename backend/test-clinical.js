async function testClinical() {
    console.log('--- Empezando Tests de Módulo Clínico ---');

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
        const adminId = loginData.user.id;
        console.log(`[AUTH] Admin logueado. ID: ${adminId}`);
    } catch (e) {
        console.error('Error logueando admin. Revisa DB seed.');
        return;
    }

    // 2. Test Crear Paciente
    let patientId;
    try {
        const createPatientRes = await fetch('http://localhost:5000/api/patients', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: "Juan",
                last_name: "Pérez",
                date_of_birth: "1990-05-15T00:00:00Z",
                phone: "1234567890"
            })
        });
        const patientData = await createPatientRes.json();
        patientId = patientData.id;
        console.log(`[PACIENTES] POST /api/patients -> Status: ${createPatientRes.status} (Esperado 201) | Paciente ID: ${patientId}`);
    } catch (e) { console.log(e) }

    // 3. Test Agendar Cita
    const testDate = new Date();
    testDate.setHours(testDate.getHours() + 2); // Cita en 2 horas
    const isoDate = testDate.toISOString();

    try {
        const createAptRes = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patient_id: patientId,
                // doctor_id se inferirá del token si no se envía, pero como somos admin enviemos nuestro pripio ID artificialmente
                doctor_id: 1,
                appointment_date: isoDate
            })
        });
        console.log(`[CITAS] Primera Cita -> Status: ${createAptRes.status} (Esperado 201)`);
    } catch (e) { console.log(e) }

    // 4. Test Error de Double Booking (Misma hora y doctor)
    try {
        const doubleAptRes = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patient_id: patientId,
                doctor_id: 1,
                appointment_date: isoDate // MISMA FECHA EXACTA
            })
        });
        const doubleData = await doubleAptRes.json();
        console.log(`[CITAS] Double Booking -> Status: ${doubleAptRes.status} (Esperado 409) | Mensaje: ${doubleData.message}`);
    } catch (e) { console.log(e) }

    // 5. Test Generar PDF de Receta Médica
    try {
        const pdfRes = await fetch('http://localhost:5000/api/prescriptions/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doctorName: "House M.D.",
                patientName: "Juan Pérez",
                diagnosis: "Gripe Aviar",
                medications: [
                    { name: 'Ibuprofeno 400mg', dosage: '1 pastilla/8 horas', instructions: 'Tomar con comida' },
                    { name: 'Jarabe Tos', dosage: '10ml/12 horas', instructions: 'Agitar antes de tomar' }
                ]
            })
        });

        console.log(`[PDF] Endpoint Receta -> Status: ${pdfRes.status} (Esperado 200)`);
        console.log(`[PDF] Content-Type Header: ${pdfRes.headers.get('content-type')}`);

        const buffer = await pdfRes.arrayBuffer();
        console.log(`[PDF] Buffer Size: ${buffer.byteLength} bytes (Cuyo tamaño debe ser mayor a 0)`);

    } catch (e) { console.log(e) }

}

testClinical();
