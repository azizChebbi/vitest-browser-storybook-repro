import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { defineConfig } from "vite";
import { defineProject } from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            defineProject(
                    {
                        plugins: [
                            storybookTest({
                                configDir: path.join(__dirname, ".storybook"),
                                // The --no-open flag will skip the automatic opening of a browser
                                storybookScript: "npm run storybook -- --no-open",
                            }),
                        ],

                        test: {
                            name: "storybook",
                            // Enable browser mode
                            browser: {
                                enabled: true,
                                provider: playwright({}),
                                headless: true,
                                instances: [{ browser: "chromium" }],
                            },
                            setupFiles: ["./.storybook/vitest.setup.ts"],
                        },

                        optimizeDeps: {
                            include: ["react/jsx-dev-runtime"]
                        }
                    }
            ),
        ],
    }
});
