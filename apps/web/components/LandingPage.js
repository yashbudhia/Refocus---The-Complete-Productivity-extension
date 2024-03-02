"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const motion_1 = require("@/utils/motion");
const circle_gradient_1 = __importDefault(require("./ux/circle-gradient"));
const react_2 = require("next-auth/react");
const navigation_1 = require("next/navigation");
const Navbar_1 = __importDefault(require("./Navbar"));
const About_1 = __importDefault(require("./About"));
function LandingPage() {
    const { data: session } = (0, react_2.useSession)();
    if (session) {
        (0, navigation_1.redirect)("/dashboard");
    }
    // Missing block of code, please add the relevant code here.
    return (<>
      <Navbar_1.default />
      <div className="">
        <circle_gradient_1.default />
        <div className="h-[800px] flex flex-col justify-center items-center">
          <div className="font-semibold text-8xl flex flex-col justify-center items-center">
            <framer_motion_1.motion.div variants={(0, motion_1.textVariant)(0.7)} initial="hidden" whileInView="show">
              "Never Compromise
            </framer_motion_1.motion.div>
            <framer_motion_1.motion.div variants={(0, motion_1.textVariant)(0.9)} initial="hidden" whileInView="show">
              on Your{" "}
              <span className="text-transparent gradient-text-1 animate-gradient">
                Productivity
              </span>
            </framer_motion_1.motion.div>
            <framer_motion_1.motion.div variants={(0, motion_1.textVariant)(1.1)} initial="hidden" whileInView="show">
              again"
            </framer_motion_1.motion.div>
          </div>
        </div>
      </div>
      <About_1.default />
    </>);
}
exports.default = LandingPage;
