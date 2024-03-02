"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const motion_1 = require("./../utils/motion");
const link_1 = __importDefault(require("next/link"));
const SigninButton_1 = __importDefault(require("./SigninButton"));
const react_2 = require("next-auth/react");
function Navbar() {
    const { scrollY } = (0, framer_motion_1.useScroll)();
    const [hidden, setHidden] = (0, react_1.useState)(false);
    //session
    const { data: session } = (0, react_2.useSession)();
    (0, framer_motion_1.useMotionValueEvent)(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous) {
            setHidden(true);
        }
        else {
            setHidden(false);
        }
    });
    // if session is there dont render
    return (<framer_motion_1.motion.nav variants={motion_1.navVariants} initial="hidden" animate={hidden ? "hidden" : "show"} className="fixed top-0 left-0 right-0 z-50 w-full h-16 text-white ">
      <div className="flex h-16 items-center pl-3 gap-4 w-32 ">
        <link_1.default href="/">
          <div className="text-xl pl-2 font-bold cursor-pointer ">ReFocus</div>
        </link_1.default>
        <div className="flex h-16 items-center gap-4 pl-4">
          <div className="text-18 px-1 font-semibold">About</div>
          <div className="text-18 px-1 font-semibold">Pricing</div>
        </div>

        <SigninButton_1.default />
      </div>
    </framer_motion_1.motion.nav>);
}
exports.default = Navbar;
