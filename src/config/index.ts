import templateConfig1 from './templateConfig.json';

export const templateConfig = templateConfig1;

export type TemplateConfig = typeof templateConfig;

export type TemplateConfigKeys = keyof TemplateConfig;

interface NewTamplateArrObj {
  name: string;
  value: TemplateConfigKeys;
}

const getNewTamplateConfig = (templateConfig: TemplateConfig): Array<NewTamplateArrObj> => {
  return Object.keys(templateConfig).map((key) => {
    return {
      name: `${key} ------- ${templateConfig[key].desc}`,
      value: key as TemplateConfigKeys
    };
  });
}

export const newTamplateArr = getNewTamplateConfig(templateConfig);