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
Object.defineProperty(exports, "__esModule", { value: true });
const framer_motion_1 = require("framer-motion");
const react_1 = __importStar(require("react"));
const motion_1 = require("@/utils/motion");
function CircleGradient() {
    const mouseX = (0, framer_motion_1.useMotionValue)(0);
    const mouseY = (0, framer_motion_1.useMotionValue)(0);
    const mouseSize = (0, framer_motion_1.useMotionValue)(0);
    const { scrollY } = (0, framer_motion_1.useScroll)();
    const [hidden, setHidden] = (0, react_1.useState)(false);
    (0, framer_motion_1.useMotionValueEvent)(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        console.log(latest, previous);
        if (latest > 65) {
            setHidden(true);
        }
        else {
            setHidden(false);
        }
    });
    function handleMouseMove({ clientX, clientY, currentTarget }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        let clientX2 = 740 + clientX / 10;
        let xPosition = clientX2 - left;
        let yPosition = clientY / 8 - top - 80;
        let size = 750 + clientY / 5;
        let opacity = 120 - clientY / 7;
        mouseX.set(xPosition);
        mouseY.set(yPosition);
        mouseSize.set(size);
    }
    return (<framer_motion_1.motion.div variants={motion_1.circleGraVariant} initial="hidden" animate={hidden ? "hidden" : "show"} onMouseMove={handleMouseMove} className="absolute inset-0 opacity-20 z-[1]" style={{
            background: (0, framer_motion_1.useMotionTemplate) `radial-gradient(${mouseSize}px circle at ${mouseX}px ${mouseY}px, rgb(95, 180, 245), transparent 80%)`,
        }}/>);
}
exports.default = CircleGradient;
