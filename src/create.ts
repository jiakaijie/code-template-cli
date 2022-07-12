import path from 'path';

import { $, cd } from "zx";
import inquirer from 'inquirer';
import { mkdirSync, removeSync, existsSync } from "fs-extra";

import { getNewTamplateConfig, TemplateConfig } from './config';

const { resolve } = path;

const downloadTemplateFromGitlab = async (href: string, dirName: string): Promise<void> => {
  await $`git clone ${href} ${dirName}`;
}

const templateName = 'templateName' as const;

interface Inquireranswers {
  [templateName]: string;
  [propName: string]: any;
}

const inquirerPromptList = (newTamplateArr): Promise<Inquireranswers> => {
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

    // 判断必须输入项目名称
    const { args = [] } = obj || {};
    const fileName = args[0];
    if (!fileName) {
      console.error('必须要在 create 之后写项目名称');
      return;
    }

    // 创建的目录文件夹存在直接退出
    const newFilePath: string = resolve(process.cwd(), fileName);
    if (existsSync(newFilePath)) {
      console.error(`${newFilePath} --- ${fileName} 文件夹已经存在`);
      return;
    }

    // 删除原先从 git 上拉的配置文件
    const templateConfigDir = resolve(__dirname, './templateConfig');
    removeSync(templateConfigDir);

    // 重新下载 配置文件
    await downloadTemplateFromGitlab('git@github.com:jiakaijie/template-config.git', templateConfigDir);

    const templateConfig: TemplateConfig = require(resolve(templateConfigDir, './config.json'));

    // 根据配置文件做 shell 交互
    const answers: Inquireranswers = await inquirerPromptList(getNewTamplateConfig(templateConfig));

    // 根据交互选择模版下载
    await downloadTemplateFromGitlab(templateConfig[answers[templateName]].href, newFilePath);
    
    console.log('创建成功');
  } catch (error) {
    console.error(error);
  }
}

export default create;