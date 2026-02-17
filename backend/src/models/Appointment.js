const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient',
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    reason: {
        type: String,
    },
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
