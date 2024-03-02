"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
function SessionMiddleware({ children, }) {
    return <react_1.SessionProvider>{children}</react_1.SessionProvider>;
}
exports.default = SessionMiddleware;
