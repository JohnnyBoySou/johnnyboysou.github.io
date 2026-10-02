import { defineConfig } from '@playwright/test'

const externalBaseURL = process.env.E2E_BASE_URL

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: externalBaseURL || 'http://127.0.0.1:4175',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: 'mobile',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'mobile-reduced-motion',
      use: {
        viewport: { width: 320, height: 740 },
        isMobile: true,
        hasTouch: true,
        reducedMotion: 'reduce',
      },
    },
  ],
  webServer: externalBaseURL ? undefined : {
    command: 'bun run preview --host 127.0.0.1 --port 4175 --strictPort',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: false,
  },
})
