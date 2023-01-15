import { H3Event } from 'h3';
import { enhance, compose, EnhancerBuilder } from '@uniformdev/canvas';
import { CANVAS_SITECORE_PARAMETER_TYPES } from '@uniformdev/canvas-sitecore';
import { AEM_PARAMETER_TYPES } from '@uniformdev/canvas-aem';
import { getSitecoreEnhancer } from '../../lib/uniform/enhancers/sitecore';
import { aemEnhancer } from '../../lib/uniform/enhancers/aem';
import { aemConverter } from '../../lib/uniform/converters/aemConverter';
import { sitecoreConverter } from '~~/lib/uniform/converters/sitecoreConverter';

const noopEnhancer = () => {
  console.log('WARN: noopEnhancer enhancer called.');
};

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const composition = body.composition;

  await enhance({
    composition,
    enhancers: new EnhancerBuilder()
      .parameterType(
        CANVAS_SITECORE_PARAMETER_TYPES,
        sitecoreConfigured()
          ? compose(getSitecoreEnhancer(), sitecoreConverter)
          : noopEnhancer,
      )
      .parameterType(
        AEM_PARAMETER_TYPES,
        aemConfigured() ? compose(aemEnhancer(), aemConverter) : noopEnhancer,
      ),
    context: {},
  });

  return { composition };
});

export function aemConfigured() {
  const runtimeConfig = useRuntimeConfig();
  const { aemBaseUrl, aemEndpoint, aemAuthType, aemUser, aemPassword } =
    runtimeConfig;
  return aemBaseUrl && aemEndpoint && aemAuthType && aemUser && aemPassword;
}

export function sitecoreConfigured() {
  const runtimeConfig = useRuntimeConfig();
  const { sitecoreApiKey, sitecoreSiteName, sitecoreApiUrl } = runtimeConfig;
  if (!sitecoreApiKey || !sitecoreSiteName || !sitecoreApiUrl) {
    return false;
  }
  return true;
}
