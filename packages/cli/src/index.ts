#!/usr/bin/env node
import chalk from 'chalk';
import program from 'commander';
import figlet from 'figlet';
import inquirer from 'inquirer';
import inquirerFuzzyPath from 'inquirer-fuzzy-path';
import { Common } from './commonQuestion';
import { caseTransform, createCustomRoute, TemplateCreator } from './helper';

inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath);
console.clear();

console.log(chalk(figlet.textSync('Onramplab CLI Boilerplate')));

inquirer.prompt;

program
  .command('addFile')
  .alias('a')
  .description('Add a file')
  .action(async () => {
    const answers = await inquirer.prompt(Common.commonQuestion);
    if (answers.isPage) {
      TemplateCreator.pageWriter(answers.name, process.cwd(), answers.hasStyle);
      if (answers.hasCustomRoute) {
        const routeName = answers.customRouteName.replace(/^\//, '');
        createCustomRoute(routeName, `${caseTransform(answers.name)}`);
      }
    } else if (answers.name !== '') {
      TemplateCreator.component(answers.name, answers.componentBasedOnModuleName, answers.hasStyle);
    }
  });

program.parse(process.argv);
