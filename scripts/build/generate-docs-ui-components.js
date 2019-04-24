const fs = require("fs-extra");
const path = require("path");
const mdToHtml = require("./utils/md-to-html");
const parseDocMd = require("./utils/parse-doc-md");
const firstLetterCapital = require("./utils/first-letter-capital");

const componentsPath = path.resolve(__dirname, "../../libraries/ng-moon/src/components");
const docsComponentsPath = path.resolve(__dirname, "../../src/main/docs/ui-bak");
const docsTemplatesPath = path.resolve(__dirname, "./templates/docs-ui-component");

// clean dir
fs.emptyDirSync(docsComponentsPath);

// create component by readme.md
const componentsFolder = fs.readdirSync(componentsPath);
componentsFolder.forEach(dirName => {
  const readmePath = `${componentsPath}/${dirName}/readme.md`;
  let html = mdToHtml(readmePath);
  if (html) {
    docComponentHtml(html, `${docsComponentsPath}/components/${dirName}`, dirName);
  }
});

// component doc
function docComponentHtml(doc, filePath, dirName) {
  fs.ensureDirSync(filePath);

  // component html
  const examples = exampleTemlate(dirName);
  const api = apiTemplate(dirName);
  const styleParam = styleParamTemplate(dirName);
  let htmlTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-component.template.html`, "utf8")
    .replace(/{{ content }}/g, doc)
    .replace(/{{ examples }}/g, examples.content)
    .replace(/{{ api }}/g, api.content)
    .replace(/{{ styleParam }}/g, styleParam.content);
  // add examples
  fs.writeFileSync(path.join(filePath, `${dirName}.component.html`), htmlTemplate, "utf8");

  // component ts
  const tsTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-component.template.ts`, "utf8")
    .replace(/{{ component }}/g, dirName)
    .replace(/{{ componentName }}/g, firstLetterCapital(dirName))
    .replace(
      /{{ param }}/g,
      paramCodes(examples.codes) + paramCodes(api.codes) + paramCodes(styleParam.codes)
    );
  fs.writeFileSync(path.join(filePath, `${dirName}.component.ts`), tsTemplate, "utf8");

  // component module
  const moduleTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-module.template.ts`, "utf8")
    .replace(/{{ component }}/g, dirName)
    .replace(/{{ componentName }}/g, firstLetterCapital(dirName));
  fs.writeFileSync(path.join(filePath, `${dirName}.module.ts`), moduleTemplate, "utf8");
}

function paramCodes(codes) {
  let params = "";
  if (codes && codes.length > 0) {
    codes.forEach(x => {
      params += `${x.key} = \`${x.value}\`;\n`;
    });
  }
  return params;
}

// examples
function exampleTemlate(dirName) {
  let template = fs.readFileSync(`${docsTemplatesPath}/example-component.template.html`, "utf8");
  const examplesPath = `${componentsPath}/${dirName}/examples`;
  let examplesFolder = fs.readdirSync(examplesPath);
  let menus = "";
  let contents = "";
  let codes = [];
  examplesFolder.sort().forEach((dirName, index) => {
    let names = dirName.split(".");
    if (names.length > 1) {
      let name = names[1];
      const examPath = `${examplesPath}/${dirName}`;
      const mdPath = `${examPath}/${name}.md`;
      if (fs.existsSync(mdPath)) {
        let content = fs.readFileSync(mdPath, "utf8");
        if (content) {
          let parse = parseDocMd(content);
          const rowCom = exConRowComTemplate(name, examPath, index);
          menus += `<li>${parse.meta.title}</li>`;
          codes = [...codes, { key: `ex${index}Code${index}`, value: rowCom.code }];
          contents += `<div class="row">${rowCom.content}</div>`;
        }
      }
    }
  });
  if (menus.length > 0) menus = `<ul class="menus">${menus}</ul>`;
  if (contents.length > 0) contents = `<div class="contents">${contents}</div>`;

  return {
    codes: codes,
    content: template.replace(/{{ menus }}/g, menus).replace(/{{ contents }}/g, contents)
  };
}

// examples-row
function exConRowComTemplate(name, examPath, index) {
  const code = fs.readFileSync(`${examPath}/${name}.html`, "utf8");
  let template = fs
    .readFileSync(`${docsTemplatesPath}/example-row-component.template.html`, "utf8")
    .replace(/{{ code }}/g, code)
    .replace(/{{ index }}/g, index)
    .replace(
      /{{ explain }}/g,
      parseDocMd(fs.readFileSync(`${examPath}/${name}.md`, "utf8")).content
    );

  return {
    code: code,
    content: template
  };
}

// api
function apiTemplate(dirName) {
  let template = fs.readFileSync(`${docsTemplatesPath}/api-component.template.html`, "utf8");
  let typeFile = fs.readFileSync(`${componentsPath}/${dirName}/nm-${dirName}.type.ts`, "utf8");
  let index = 1;
  let codes = [{ key: `api1Code1`, value: typeFile }];
  return {
    codes: codes,
    content: template.replace(/{{ index }}/g, index)
  };
}

// style param
function styleParamTemplate(dirName) {
  let template = fs.readFileSync(
    `${docsTemplatesPath}/style-param-component.template.html`,
    "utf8"
  );
  let typeFile = fs.readFileSync(`${componentsPath}/${dirName}/style/param.scss`, "utf8");
  let index = 1;
  let codes = [{ key: `style1Code1`, value: typeFile }];
  return {
    codes: codes,
    content: template.replace(/{{ index }}/g, index)
  };
}
