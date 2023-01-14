const runtimeConfig = useRuntimeConfig();
const { cloudinaryPrefix, sitecoreApiUrl } = runtimeConfig;

export const sitecoreConverter = ({ parameter }: any) => {
  const value = parameter.value;

  if (!value) {
    return {};
  }
  if (Array.isArray(value)) {
    if (value.length === 1) {
      return transformItem(value[0]);
    }
    return value.map((p) => transformItem(p));
  } else {
    return transformItem(value);
  }
};

function transformItem(item: any) {
  // process as content item
  if (!item) {
    return item;
  }

  const parameters: any = {};
  Object.keys(item).forEach((key) => {
    let value = item[key];
    if (typeof value === 'object' && value !== null) {
      // image field
      if (
        Object.keys(value).includes('url') &&
        value['url'].startsWith('/-/media/')
      ) {
        const newValue = {
          ...value,
          url: `${cloudinaryPrefix}${sitecoreApiUrl}${value.url}`,
        };
        parameters[key] = newValue ?? '';
      }
    } else {
      parameters[key] = value ?? '';
    }
  });

  return parameters;
}