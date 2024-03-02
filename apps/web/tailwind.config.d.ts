declare const config: {
    darkMode: ["class"];
    content: string[];
    prefix: string;
    theme: {
        container: {
            center: true;
            padding: string;
            screens: {
                "2xl": string;
            };
        };
        extend: {
            colors: {
                border: string;
                input: string;
                ring: string;
                background: string;
                foreground: string;
                grey: string;
                primary: {
                    DEFAULT: string;
                    foreground: string;
                };
                secondary: {
                    DEFAULT: string;
                    foreground: string;
                };
                destructive: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                popover: {
                    DEFAULT: string;
                    foreground: string;
                };
                card: {
                    DEFAULT: string;
                    foreground: string;
                };
            };
            borderRadius: {
                lg: string;
                md: string;
                sm: string;
            };
            keyframes: {
                "accordion-down": {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
                "accordion-up": {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
                gradient: {
                    "0%": {
                        backgroundPosition: string;
                    };
                    "100%": {
                        backgroundPosition: string;
                    };
                };
            };
            animation: {
                "accordion-down": string;
                "accordion-up": string;
                gradient: string;
            };
        };
    };
    plugins: any[];
};
export default config;
//# sourceMappingURL=tailwind.config.d.ts.map