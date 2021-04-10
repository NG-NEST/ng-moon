import * as fs from 'fs-extra';
import * as readline from 'readline';
import { NcSpec } from '../interfaces/spec';

/**
 * 测试文件处理
 * 获取测试文件中依赖的模块加入到组件文档模块中
 *
 * @export
 * @param {string} fsPath
 */
export function hanlderSpec(fsPath: string): Promise<NcSpec[]> {
  return new Promise((res, rej) => {
    if (!fs.existsSync(fsPath)) {
      res([]);
      return;
    }
    let lines = readline.createInterface({
      input: fs.createReadStream(fsPath)
    });
    let specs: NcSpec[] = [];
    lines.on('line', (line: string) => {
      line = line.trim();
      if (line.startsWith('import ') && line.indexOf('Module') !== -1 && line.indexOf('@ng-nest/ui/') !== -1) {
        let spec: NcSpec = {};
        let mod = line.slice(0, line.indexOf('Module') + 6);
        mod = mod.slice(mod.lastIndexOf(' ') + 1, mod.length);
        spec.module = mod;
        let impt = line.slice(line.indexOf('@ng-nest/ui/'), line.length);
        spec.name = impt.slice(12, impt.indexOf("'"));
        spec.import = `import { ${mod} } from '${impt}`;
        specs.push(spec);
      }
    });
    lines.on('close', () => {
      res(specs);
    });
  });
}
