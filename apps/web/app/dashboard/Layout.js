"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SidebarCode_1 = __importDefault(require("@/components/dashboard/SidebarCode"));
const Layout = ({ children }) => {
    return (<div style={{ display: "flex", height: "100vh" }}>
      <SidebarCode_1.default />
      {children}
    </div>);
};
exports.default = Layout;
