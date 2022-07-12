export const templateConfig = {
  'create-react-app-ts-template': {
    href: 'git@github.com:jiakaijie/create-react-app-ts-template.git',
    desc: '基于 create-react-app 创建 + typescript 模版'
  },
  'vue3-ts-template': {
    href: 'git@github.com:jiakaijie/vue3-ts-template.git',
    desc: '基于 vue3 cli 创建 + typescript 模版'
  }
} as const;

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