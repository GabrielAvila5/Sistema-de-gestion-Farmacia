const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Patient = require('../models/Patient');

class MigrationService {
    /**
     * Import data from a JSON file.
     * @param {string} filePath - Path to the JSON file.
     * @param {string} type - 'products' or 'patients'.
     */
    async importData(filePath, type) {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            if (type === 'products') {
                await Product.insertMany(data);
                console.log('Products Imported!');
            } else if (type === 'patients') {
                await Patient.insertMany(data);
                console.log('Patients Imported!');
            } else {
                throw new Error('Invalid data type. Use "products" or "patients".');
            }
        } catch (error) {
            console.error(`Error with data import: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new MigrationService();
