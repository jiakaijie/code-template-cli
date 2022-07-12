import path from 'path';

import { $, cd } from "zx";
import inquirer from 'inquirer';
import { mkdirSync, removeSync } from "fs-extra";

import { templateConfig, newTamplateArr, TemplateConfigKeys } from './config';

const downloadTemplateFromGitlab = async (href: string, dirName: string): Promise<void> => {
  await $`git clone ${href} ${dirName}`;
}

const templateName = 'templateName' as const;

interface Inquireranswers {
  [templateName]: TemplateConfigKeys;
  [propName: string]: any;
}

const inquirerPromptList = (): Promise<Inquireranswers> => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: templateName,
          message: '请选择项目模版',
          choices: newTamplateArr
        },
      ])
      .then((answers) => {
        resolve(answers);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

interface ArgObj {
  args: Array<string>;
  [propName: string]: any;
}

const create = async (a, obj: ArgObj): Promise<void> => {
  try {
    const { args = [] } = obj || {};
    const fileName = args[0];
    if (!fileName) {
      console.error('必须要在 create 之后写项目名称');
      return;
    }

    const answers: Inquireranswers = await inquirerPromptList();
    
    await downloadTemplateFromGitlab(templateConfig[answers[templateName]].href, fileName);
    
    console.log('成功');
  } catch (error) {
    console.error(error);
  }
}

export default create;