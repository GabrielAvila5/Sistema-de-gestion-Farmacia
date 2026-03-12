"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleSupplierStatus = exports.deleteSupplier = exports.updateSupplier = exports.createSupplier = exports.getSupplierById = exports.getSuppliers = void 0;
const SupplierService_1 = __importDefault(require("../services/SupplierService"));
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await SupplierService_1.default.getAllSuppliers();
        res.json(suppliers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSuppliers = getSuppliers;
const getSupplierById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        const supplier = await SupplierService_1.default.getSupplierById(id);
        res.json(supplier);
    }
    catch (error) {
        if (error.message === 'Proveedor no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
exports.getSupplierById = getSupplierById;
const createSupplier = async (req, res) => {
    try {
        const supplier = await SupplierService_1.default.createSupplier(req.body);
        res.status(201).json(supplier);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createSupplier = createSupplier;
const updateSupplier = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        const supplier = await SupplierService_1.default.updateSupplier(id, req.body);
        res.json(supplier);
    }
    catch (error) {
        if (error.message === 'Proveedor no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
exports.updateSupplier = updateSupplier;
const deleteSupplier = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        await SupplierService_1.default.deleteSupplier(id);
        res.json({ message: 'Proveedor eliminado exitosamente' });
    }
    catch (error) {
        if (error.message === 'Proveedor no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};
exports.deleteSupplier = deleteSupplier;
const toggleSupplierStatus = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ error: 'ID inválido' });
        const { is_active } = req.body;
        if (typeof is_active !== 'boolean')
            return res.status(400).json({ error: 'is_active field must be a boolean' });
        const supplier = await SupplierService_1.default.updateSupplierStatus(id, is_active);
        res.json(supplier);
    }
    catch (error) {
        if (error.message === 'Proveedor no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
exports.toggleSupplierStatus = toggleSupplierStatus;
//# sourceMappingURL=supplierController.js.map