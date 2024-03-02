"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const prisma_1 = require("@/prisma");
const next_1 = __importDefault(require("next-auth/next"));
const github_1 = __importDefault(require("next-auth/providers/github"));
const google_1 = __importDefault(require("next-auth/providers/google"));
const prisma_adapter_1 = require("@auth/prisma-adapter");
const email_1 = __importDefault(require("next-auth/providers/email"));
const authOptions = {
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prisma_1.prisma),
    providers: [
        (0, google_1.default)({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        (0, github_1.default)({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        (0, email_1.default)({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    pages: {
        //error: "/auth/error", // Error code passed in query string as ?error=
        //verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: "/dashboard", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};
const handler = (0, next_1.default)(authOptions);
exports.GET = handler;
exports.POST = handler;
