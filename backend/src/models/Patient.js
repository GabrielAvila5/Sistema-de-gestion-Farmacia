const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    dob: {
        type: Date,
    },
    history: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            notes: {
                type: String,
                required: true,
            },
            diagnosis: {
                type: String,
            },
            doctor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        }
    ]
}, {
    timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
