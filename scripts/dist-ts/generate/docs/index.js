"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../../interfaces/page");
const utils_1 = require("../../utils");
const path = require("path");
const fs = require("fs-extra");
const _ = require("lodash");
exports.docsDir = path.resolve(__dirname, "../../../../docs");
exports.componentsDir = path.resolve(__dirname, "../../../../libraries/ng-moon/src/components");
exports.genDir = path.resolve(__dirname, "../../../../src/main/docs");
exports.genMenusDir = path.resolve(__dirname, "../../../../src/environments");
exports.docsPrefix = "docs";
class NcDocs {
    constructor() {
        this.genDir = exports.genDir;
        this.menus = [];
        this.genPages();
    }
    genPages() {
        this.page = utils_1.createRouterOutlet(exports.docsPrefix);
        utils_1.handlerPage(this.page, exports.genDir);
        this.addChildren(this.page, exports.genDir, exports.docsDir, `./${exports.docsPrefix}`);
        utils_1.generatePage(this.page);
        this.menus = _.sortBy(this.menus, ["parentId", "order"]);
        utils_1.generateMenu(exports.genMenusDir, this.menus);
    }
    addChildren(page, genDir, docDir, router, index, level) {
        let children = fs.readdirSync(docDir);
        if (typeof level !== "undefined")
            level--;
        children.forEach((x, i) => {
            const dir = path.join(docDir, x);
            const stat = fs.statSync(dir);
            if (stat.isDirectory()) {
                const read = utils_1.parseMdDoc(path.join(dir, "readme.md"));
                const folder = path.join(genDir, x);
                const child = this.createChild(read, x, folder);
                child.path = dir;
                page.children = [...page.children, child];
                const thisRouter = `${router}/${x}`;
                const menu = this.createMenu(read, x, index, i, thisRouter);
                if (x === "components") {
                    child.path = exports.componentsDir;
                    this.addChildren(child, folder, exports.componentsDir, menu.router, menu.id, 2);
                }
                else if (level !== 0) {
                    this.addChildren(child, folder, dir, menu.router, menu.id, level);
                }
                if (dir.indexOf(exports.componentsDir) === 0 && typeof read.meta.type === "undefined") {
                    utils_1.handlerComponent(child);
                }
                utils_1.generatePage(child);
            }
        });
        page.children = _.sortBy(page.children, x => x.order);
        utils_1.pageAddChildren(page, page.children);
    }
    createChild(read, dirName, folder) {
        let child = read.meta.type == "router"
            ? utils_1.createRouterOutlet(dirName)
            : new page_1.NcPage({
                name: dirName,
                prefix: exports.docsPrefix,
                type: "custom",
                custom: read.content
            });
        child.order = read.meta.order;
        utils_1.handlerPage(child, folder);
        return child;
    }
    createMenu(read, dirName, index, i, router) {
        const id = index == null ? `${i}` : `${index}-${i}`;
        const parentId = index == null ? null : `${index}`;
        const menu = Object.assign({ id: id, parentId: parentId, name: dirName, router: router }, read.meta);
        this.menus = [...this.menus, menu];
        return menu;
    }
}
exports.NcDocs = NcDocs;
global["NcDocs"] = new NcDocs();
