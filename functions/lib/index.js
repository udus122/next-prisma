"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const functions = require("firebase-functions");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.getUser = functions.https.onCall(async (data, context) => {
    try {
        const result = await prisma.user.findOne({
            where: {
                email: data.email,
            },
        });
        if (!result) {
            throw new functions.https.HttpsError('not-found', 'user not found');
        }
        return result;
    }
    catch (e) {
        throw new functions.https.HttpsError('internal', e.message, e);
    }
});
exports.createUser = functions.https.onCall(async (data, context) => {
    try {
        const result = await prisma.user.create({
            data,
        });
        return result;
    }
    catch (e) {
        throw new functions.https.HttpsError('internal', e.message, e);
    }
});
//# sourceMappingURL=index.js.map