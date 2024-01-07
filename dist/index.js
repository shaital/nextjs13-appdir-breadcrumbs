"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const getPathFromUrl = (url) => {
    return url.split(/[?#]/)[0];
};
const convertBreadcrumb = (title, toUpperCase, replaceCharacterList, transformLabel) => {
    let transformedTitle = getPathFromUrl(title);
    if (transformLabel) {
        return transformLabel(transformedTitle);
    }
    if (replaceCharacterList) {
        for (let i = 0; i < replaceCharacterList.length; i++) {
            transformedTitle = transformedTitle.replaceAll(replaceCharacterList[i].from, replaceCharacterList[i].to);
        }
    }
    return toUpperCase
        ? decodeURI(transformedTitle).toUpperCase()
        : decodeURI(transformedTitle);
};
const Breadcrumbs = ({ useDefaultStyle = false, rootLabel = "Home", omitRootLabel = false, labelsToUppercase = false, replaceCharacterList = [
    { from: "-", to: " " },
    { from: "_", to: " " },
], transformLabel = undefined, omitIndexList = undefined, containerStyle = null, containerClassName = "", listStyle = null, listClassName = "", inactiveItemStyle = null, inactiveItemClassName = "", activeItemStyle = null, activeItemClassName = "", }) => {
    const router = (0, navigation_1.usePathname)();
    const [breadcrumbs, setBreadcrumbs] = (0, react_1.useState)(null);
    const [pathToIgnore, setPathToIgnore] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (router) {
            const linkPath = router.split("/");
            linkPath.shift();
            const pathArray = linkPath.map((path, i) => {
                return {
                    breadcrumb: path,
                    href: "/" + linkPath.slice(0, i + 1).join("/"),
                };
            });
            setBreadcrumbs(pathArray);
        }
    }, [router]);
    if (!breadcrumbs) {
        return null;
    }
    if (!pathToIgnore) {
        return null;
    }
    return (react_1.default.createElement("nav", { style: containerStyle, className: containerClassName, "aria-label": "breadcrumbs" },
        react_1.default.createElement("ol", { style: listStyle, className: useDefaultStyle ? "_2jvtI" : listClassName },
            !omitRootLabel && (react_1.default.createElement("li", { style: inactiveItemStyle, className: inactiveItemClassName },
                react_1.default.createElement(link_1.default, { href: "/" }, convertBreadcrumb(rootLabel || "Home", labelsToUppercase, replaceCharacterList, transformLabel)))),
            breadcrumbs.length >= 1 &&
                breadcrumbs.map((breadcrumb, i) => {
                    if (!breadcrumb ||
                        breadcrumb.breadcrumb.length === 0 ||
                        (omitIndexList && omitIndexList.find((value) => value === i))) {
                        return;
                    }
                    return (react_1.default.createElement("li", { key: breadcrumb.href, className: i === breadcrumbs.length - 1
                            ? activeItemClassName
                            : inactiveItemClassName, style: i === breadcrumbs.length - 1
                            ? activeItemStyle
                            : inactiveItemStyle },
                        react_1.default.createElement(link_1.default, { href: breadcrumb.href }, convertBreadcrumb(breadcrumb.breadcrumb, labelsToUppercase, replaceCharacterList, transformLabel))));
                }))));
};
exports.default = Breadcrumbs;
//# sourceMappingURL=index.js.map