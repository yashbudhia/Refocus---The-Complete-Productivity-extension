"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
const google_1 = require("next/font/google");
require("./globals.css");
const session_1 = __importDefault(require("./session"));
const theme_provider_1 = require("@/components/theme-provider");
const OpenSans = (0, google_1.Open_Sans)({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});
exports.metadata = {
    title: "boost your productivity",
    description: "Never compromoise on productivity anymore",
};
function RootLayout({ children, }) {
    return (<html lang="en">
      <body className={`${OpenSans.className} overflow-x-hidden`}>
        <theme_provider_1.ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <session_1.default>{children}</session_1.default>
        </theme_provider_1.ThemeProvider>
      </body>
    </html>);
}
exports.default = RootLayout;
