#!/usr/bin/env node
import { Command } from 'commander';
import { copyPackage, parsePackage } from './utils.js';

const program = new Command();
const { version } = parsePackage();
// program
//   .command('build')
//   .description('打包组件库')
//   .hook('postAction', generateTheme)
//   .action(build);

program.command('package').description('复制package.json文件').action(copyPackage);

program.parse().version(version);
