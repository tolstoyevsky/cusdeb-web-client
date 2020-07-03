import React from "react";

export const formatBytes = (bytes) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 B";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    const result = (bytes / 1024 ** i);
    return result.toFixed(1) + sizes[i];
};

export const spaceSeparation = (largeNumber) => {
    const results = largeNumber.toLocaleString();
    return results;
};

const formatPackageDescriptionList = (paragraph) => {
    const itemsList = paragraph.split("*");

    return (
        <div className="text-justify" key>
            {paragraph.split("*").splice(0, 1)}
            <ul>
                {itemsList.map((item) => (
                    <li key={item.length}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const formatPackageDescription = (description, packageName) => {
    let content = description.split(".");

    if (content.length - 1 < 2) {
        return description;
    }

    const firstParagraph = content[0];
    content = description.substr(firstParagraph.length + 1).split("\n .\n");
    const collapseKey = packageName.replace(/\d/g, "");

    return [
        <p className="text-justify" key="firstParagraph">{firstParagraph}</p>,
        <div className={`collapse ${collapseKey}`} key={packageName}>
            {content.map((paragraph) => (
                paragraph.split("*").length - 1 < 2 ? (
                    <p className="text-justify" key={paragraph.length}>
                        {paragraph}
                    </p>
                )
                    : formatPackageDescriptionList(paragraph)
            ))}
        </div>,
        <div className="mt-n3" key="button">
            <button
                className="btn btn-link pl-0"
                type="button"
                data-toggle="collapse"
                data-target={`.${collapseKey}`}
                aria-expanded="false"
                aria-controls={`${collapseKey}`}
            >
                <span className={`collapse show ${collapseKey}`}>More</span>
                <span className={`collapse ${collapseKey}`}>Less</span>
            </button>
        </div>,
    ];
};
