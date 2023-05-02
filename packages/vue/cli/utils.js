import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

function createFolder(dirpath, dirname) {
  if (typeof dirname === 'undefined') {
    if (fs.existsSync(dirpath)) {
    } else {
      createFolder(dirpath, path.dirname(dirpath));
    }
  } else {
    if (dirname !== path.dirname(dirpath)) {
      createFolder(dirpath);
      return;
    }
    if (fs.existsSync(dirname)) {
      fs.mkdirSync(dirpath);
    } else {
      createFolder(dirname, path.dirname(dirname));
      fs.mkdirSync(dirpath);
    }
  }
}
function copyFile(orgfilepath, desdirpath, desfilename) {
  if (fs.existsSync(orgfilepath)) {
    let desfilepath = path.join(desdirpath, desfilename);
    if (!fs.existsSync(desfilepath)) {
      createFolder(desdirpath);
      fs.copyFileSync(orgfilepath, desfilepath);
    } else {
      console.error(
        Date().toString() + 'FolderAndFileOperation_copyFile: des file already existed.' + ' new path: ' + desfilepath.toString()
      );
    }
  } else {
    console.error(Date().toString() + 'FolderAndFileOperation_copyFile: org file not existed.' + ' org path: ' + orgfilepath.toString());
  }
}

export const copyPackage = () => {
  copyFile(path.resolve(__dirname, './package.json'), path.resolve(__dirname, './lib'), 'package.json');
};

export const parsePackage = () => {
  const data = fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8');
  return JSON.parse(data)
};
