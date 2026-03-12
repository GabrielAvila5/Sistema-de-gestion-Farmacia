"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.toggleUserActive = toggleUserActive;
const UserService_1 = __importDefault(require("../services/UserService"));
// GET /api/users
async function getUsers(_req, res, next) {
    try {
        const users = await UserService_1.default.getAllUsers();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}
// POST /api/users
async function createUser(req, res, next) {
    try {
        const user = await UserService_1.default.createUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
}
// PATCH /api/users/:id/toggle-active
async function toggleUserActive(req, res, next) {
    try {
        const targetId = parseInt(req.params.id, 10);
        const requestingUserId = req.user?.id;
        if (isNaN(targetId)) {
            res.status(400).json({ message: 'ID de usuario inválido' });
            return;
        }
        const user = await UserService_1.default.toggleActive(targetId, requestingUserId);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=userController.js.map