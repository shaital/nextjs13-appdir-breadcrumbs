"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
], transformLabel = undefined, omitIndexList = undefined, containerStyle = null, containerClassName = "", listStyle = null, listClassName = "", inactiveItemStyle = null, inactiveItemClassName = "", activeItemStyle = null, activeItemClassName = "", pathsToIgnore = [] }) => {
    const router = usePathname();
    const [breadcrumbs, setBreadcrumbs] = useState(null);
    const [pathToIgnore, setPathToIgnore] = useState(true);
    useEffect(() => {
        if (router) {
            setPathToIgnore(true);
            const linkPath = router.split("/");
            linkPath.shift();
            if (pathsToIgnore.includes(router)) {
                setPathToIgnore(false);
            }
            const pathArray = linkPath.map((path, i) => {
                const pathHref = "/" + linkPath.slice(0, i + 1).join("/");
                return {
                    breadcrumb: path,
                    href: pathHref,
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
    return (React.createElement("nav", { style: containerStyle, className: containerClassName, "aria-label": "breadcrumbs" },
        React.createElement("ol", { style: listStyle, className: useDefaultStyle ? "_2jvtI" : listClassName },
            !omitRootLabel && (React.createElement("li", { style: inactiveItemStyle, className: inactiveItemClassName },
                React.createElement(Link, { href: "/" }, convertBreadcrumb(rootLabel || "Home", labelsToUppercase, replaceCharacterList, transformLabel)))),
            breadcrumbs.length >= 1 &&
                breadcrumbs.map((breadcrumb, i) => {
                    if (!breadcrumb ||
                        breadcrumb.breadcrumb.length === 0 ||
                        (omitIndexList && omitIndexList.find((value) => value === i))) {
                        return;
                    }
                    return (React.createElement("li", { key: breadcrumb.href, className: i === breadcrumbs.length - 1
                            ? activeItemClassName
                            : inactiveItemClassName, style: i === breadcrumbs.length - 1
                            ? activeItemStyle
                            : inactiveItemStyle },
                        React.createElement(Link, { href: breadcrumb.href }, convertBreadcrumb(breadcrumb.breadcrumb, labelsToUppercase, replaceCharacterList, transformLabel))));
                }))));
};
export default Breadcrumbs;
//# sourceMappingURL=index.js.map