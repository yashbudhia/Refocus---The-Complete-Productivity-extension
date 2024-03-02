"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function About() {
    return (<section className="pt-32 p-10">
      <div className="flex flex-col justify-center items-center">
        <div className=" font-sans font-medium text-3xl md:text-6xl text-center">
          "Even a small cause cause have a huge Effect"
          <div className="font-italic text-lg p-4">- The Butterfly effect</div>
        </div>
        <div className=" font-medium text-lg text-justify mt-8">
          <p className="">
            The butterfly effect, when applied to productivity, highlights how
            small actions or decisions can lead to significant consequences over
            time. Just like how a tiny butterfly flapping its wings can
            eventually cause a large-scale phenomenon like a tornado, small
            changes in our habits, routines, or choices can compound and ripple
            out, impacting our productivity in profound ways.
          </p>
          <p>
            Whether it's adopting a new time management technique, cultivating a
            positive mindset, or making small improvements to workflows, these
            seemingly minor adjustments can accumulate and result in substantial
            increases in productivity over the long term. So, paying attention
            to the small details and making consistent efforts to optimize
            productivity can lead to significant improvements in overall
            efficiency and effectiveness.
          </p>
        </div>
      </div>
    </section>);
}
exports.default = About;
