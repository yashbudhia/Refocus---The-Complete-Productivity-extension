"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Initialize PrismaClient
let prisma;
if (process.env.NODE_ENV === "production") {
    // In production, create a new instance of PrismaClient
    exports.prisma = prisma = new client_1.PrismaClient();
}
else {
    if (typeof window === "undefined") {
        // In development on the server side, recreate PrismaClient for each request
        exports.prisma = prisma = new client_1.PrismaClient();
    }
    else {
        // On the client side in development, reuse PrismaClient across HMR updates
        if (!global.prisma) {
            global.prisma = new client_1.PrismaClient();
        }
        exports.prisma = prisma = global.prisma;
    }
}
