"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const navigation_1 = require("next/navigation");
const Layout_1 = __importDefault(require("./Layout"));
function Dashboard() {
    const { data: session } = (0, react_1.useSession)();
    if (session) {
        return (<Layout_1.default>
        <div>Welcome User</div>
      </Layout_1.default>);
    }
    if (!session) {
        (0, navigation_1.redirect)("/");
    }
}
exports.default = Dashboard;
