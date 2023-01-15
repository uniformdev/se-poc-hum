import type { ManifestV2 } from '@uniformdev/context';
import manifestJson from './context-manifest.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/styles.css'],
  modules: ['@uniformdev/uniform-nuxt', '@nuxtjs/tailwindcss'],
  uniform: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    readOnlyApiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    outputType: process.env.OUTPUT_TYPE,
    manifest: manifestJson as ManifestV2,
    defaultConsent: true,
    // If you prefer to have full control over your Uniform Context instance:
    // uniformContextPath: './path-to-my-uniform-context-instance',
  },
  runtimeConfig: {
    sitecoreApiUrl: process.env.SITECORE_API_URL,
    sitecoreSiteName: process.env.SITECORE_SITENAME,
    sitecoreApiKey: process.env.SITECORE_API_KEY,
    aemPublishUrl: process.env.AEM_PUBLISH_URL,
    aemBaseUrl: process.env.AEM_BASE_URL,
    aemEndpoint: process.env.AEM_ENDPOINT,
    aemAuthType: process.env.AEM_AUTH_TYPE,
    aemUser: process.env.AEM_USER,
    aemPassword: process.env.AEM_PASSWORD,
    cloudinaryPrefix:
      'https://res.cloudinary.com/uniformdev/image/fetch/f_auto,c_limit,q_75/',
  },
});
