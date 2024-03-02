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
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const command_1 = require("@/components/ui/command");
const popover_1 = require("@/components/ui/popover");
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const z = __importStar(require("zod"));
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const use_toast_1 = require("@/components/ui/use-toast");
const input_1 = require("@/components/ui/input");
const react_2 = require("next-auth/react");
const languages = [
    { label: "College Student", value: "C-student" },
    { label: "School Student", value: "S-student" },
    { label: "Programmer", value: "programmer" },
    { label: "Business Owner", value: "business" },
    { label: "Doctor", value: "doctor" },
    { label: "Public servant", value: "government" },
    { label: "Organisation", value: "organisation" },
    { label: "Other", value: "Other" },
];
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    age: z.string().min(1, {
        message: "Age must not be empty.,",
    }),
    occupation: z.string({
        required_error: "Please select an occupation",
    }),
    email: z.string().email("Please entire an appropriate email"),
});
function Signin() {
    const [currentstep, setCurrentstep] = (0, react_1.useState)(0);
    const { data: session } = (0, react_2.useSession)();
    // 1. Define your form.
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            name: "",
            age: "",
            occupation: "",
            email: "",
        },
    });
    /* Defining register and handleSubmit
  
    const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    });
    late night commit
    */
    // 2. Define a submit handler.
    async function onSubmit(values) {
        try {
            await (0, react_2.signIn)("email", { email: values.email });
            console.log(values);
            (0, use_toast_1.toast)({
                title: "You submitted the following values:",
                description: (<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>),
            });
            // Update the step after successful form submission
            setCurrentstep(2);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (<>
      <div className="relative flex flex-col items-center justify-center top-[120px] z-50 ">
        {currentstep === 0 && (<form_1.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md">
              <p>Fill in the details and continue</p>
              <form_1.FormField control={form.control} name="name" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Name</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input placeholder="name" {...field}/>
                    </form_1.FormControl>
                    <form_1.FormDescription>Enter your name.</form_1.FormDescription>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
              <form_1.FormField control={form.control} name="age" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>
                      Age <br />
                    </form_1.FormLabel>
                    <form_1.FormControl>
                      <input type="number" placeholder="age" className="p-2 bg-inherit border rounded-lg" {...field}/>
                    </form_1.FormControl>
                    <form_1.FormDescription>Enter your age.</form_1.FormDescription>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
              <form_1.FormField control={form.control} name="occupation" render={({ field }) => (<form_1.FormItem className="flex flex-col">
                    <form_1.FormLabel>Occupation</form_1.FormLabel>
                    <popover_1.Popover>
                      <popover_1.PopoverTrigger asChild>
                        <form_1.FormControl>
                          <button_1.Button variant="outline" role="combobox" className={(0, utils_1.cn)("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                            {field.value
                    ? languages.find((language) => language.value === field.value)?.label
                    : "Select Occupation"}
                            <lucide_react_1.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                          </button_1.Button>
                        </form_1.FormControl>
                      </popover_1.PopoverTrigger>
                      <popover_1.PopoverContent className="w-[200px] p-0">
                        <command_1.Command>
                          <command_1.CommandInput placeholder="Search Occupation..."/>
                          <command_1.CommandEmpty>No Occupation found.</command_1.CommandEmpty>
                          <command_1.CommandGroup>
                            {languages.map((language) => (<command_1.CommandItem value={language.label} key={language.value} onSelect={() => {
                        form.setValue("occupation", language.value);
                    }}>
                                <lucide_react_1.Check className={(0, utils_1.cn)("mr-2 h-4 w-4", language.value === field.value
                        ? "opacity-100"
                        : "opacity-0")}/>
                                {language.label}
                              </command_1.CommandItem>))}
                          </command_1.CommandGroup>
                        </command_1.Command>
                      </popover_1.PopoverContent>
                    </popover_1.Popover>
                    <form_1.FormDescription>
                      Choose the occupation which describes you best
                    </form_1.FormDescription>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>

              <div>
                <button_1.Button type="button" onClick={() => {
                setCurrentstep(1);
            }}>
                  Continue
                </button_1.Button>
              </div>
            </form>
          </form_1.Form>)}
        {currentstep === 1 && (<form_1.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md">
              <p>Enter your email to verify </p>
              <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Email</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input placeholder="abc@xyz.com" {...field}/>
                    </form_1.FormControl>
                    <form_1.FormDescription>Enter your email.</form_1.FormDescription>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>

              <div className=" flex items-center justify-center gap-x-6 ">
                <button_1.Button type="button" onClick={() => setCurrentstep(0)}>
                  Previous
                </button_1.Button>
                <button_1.Button type="submit">Submit</button_1.Button>
              </div>
              <form_1.FormDescription className=" flex items-center justify-center">
                Or
              </form_1.FormDescription>
              <div className="flex flex-col gap-5 items-center justify-center dark:bg-inherit">
                <button onClick={() => (0, react_2.signIn)("google")} className="px-4 py-2 border flex gap-2 border-slate-200 dark:bg-inherit rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                  <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                  <span>Login with Google</span>
                </button>
                <button onClick={() => (0, react_2.signIn)("github")} className="px-4 py-2 border flex gap-2 border-slate-200 dark:bg-inherit rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                  <img className="w-6 h-6 " src="https://www.svgrepo.com/show/439171/github.svg" loading="lazy" alt="github logo"/>
                  <span>Login with Github</span>
                </button>
              </div>
            </form>
          </form_1.Form>)}
        {currentstep === 2 && (<form_1.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[400px] border p-9 rounded-lg shadow-md">
              <p>
                A link has been sent to your email. Click the link to verify{" "}
              </p>
            </form>
          </form_1.Form>)}
      </div>
    </>);
}
exports.default = Signin;
