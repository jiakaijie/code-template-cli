
export interface TemplateConfig{
  [propName: string]: {
    href: string;
    desc: string;
  }
}

export interface NewTamplateArrObj {
  name: string;
  value: string;
}

export const getNewTamplateConfig = (templateConfig: TemplateConfig): Array<NewTamplateArrObj> => {
  return Object.keys(templateConfig).map((key) => {
    return {
      name: `${key} ------- ${templateConfig[key].desc}`,
      value: key
    };
  });
}