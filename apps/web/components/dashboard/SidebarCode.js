"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const image_1 = __importDefault(require("next/image"));
// Import SVG icons
const Home_1 = __importDefault(require("../svg/Home"));
const calendar_1 = __importDefault(require("../svg/calendar"));
const checklist_1 = __importDefault(require("../svg/checklist"));
const accuracy_1 = __importDefault(require("../svg/accuracy"));
const feedback_1 = __importDefault(require("../svg/feedback"));
const bell_1 = __importDefault(require("../svg/bell"));
const comp2_1 = __importDefault(require("../svg/comp2"));
const Refocus_1 = __importDefault(require("../svg/Refocus"));
// Define sidebar items
const sidebarItems = [
    { key: "home", icon: <Home_1.default />, label: "Home" },
    { key: "routine", icon: <calendar_1.default />, label: "Routine" },
    { key: "rival", icon: <comp2_1.default />, label: "Rival" },
    { key: "priority", icon: <checklist_1.default />, label: "Priority" },
    { key: "consistency", icon: <accuracy_1.default />, label: "Consistency" },
    { key: "feedback", icon: <feedback_1.default />, label: "Leave Feedback" },
    { key: "subscription", icon: <bell_1.default />, label: "Subscription" },
];
function Sidebar() {
    const [selectedItem, setSelectedItem] = (0, react_2.useState)("grey");
    const { data: session } = (0, react_1.useSession)();
    const router = (0, navigation_1.useRouter)();
    console.log(session);
    const handleDivClick = (itemKey, event) => {
        event.preventDefault();
        setSelectedItem(itemKey);
        router.push(`/dashboard/${itemKey}`);
    };
    return (<div className="w-64 h-screen bg-grey">
      <div className="h-18 p-6">
        <div className="flex pl-8">
          <div className="flex items-center gap-2 justify-center border rounded-full hover:rounded-xl p-2 pl-3 pr-3 cursor-pointer">
            <Refocus_1.default />
            <div className="font-semibold text-xl">Refocus</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item) => (<div key={item.key} className={`sidebar-div ${selectedItem === item.key ? "bg-green-500" : ""}`} onClick={(event) => handleDivClick(item.key, event)}>
            {item.icon}
            <button className="font-semibold">{item.label}</button>
          </div>))}
      </div>
      <div className="absolute w-64 bottom-5 p-3 border-t-2 pb-2">
        <div className="flex gap-3 items-center">
          <image_1.default src={session?.user?.image || ""} alt="user-profile" width={40} height={40} className="rounded-full cursor-pointer"/>
          <div className="font-semibold cursor-pointer p-2">
            {session?.user?.name ?? ""}
          </div>
          <button onClick={() => {
            (0, react_1.signOut)();
        }} className="absolute text-sm right-0 pr-2 text-red-700">
            Sign out
          </button>
        </div>
      </div>
    </div>);
}
exports.default = Sidebar;
