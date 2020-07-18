import React from "react";

const formatFirstParagraph = (paragraph, wrapParagraph = true) => {
    const paragraphItems = String(paragraph).split("\n ");
    const paragraphTitle = paragraphItems.splice(0, 1);
    return (
        <>
            <p>{paragraphTitle}</p>
            {wrapParagraph ? (
                <p>{paragraphItems}</p>
            ) : (
                paragraphItems
            )}
        </>
    );
};

const formatPackageDescriptionList = (listItems) => {
    const listTitle = listItems[0].trim().endsWith(":") && listItems.splice(0, 1);
    return (
        <>
            {listTitle}
            <ul>
                {listItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </>
    );
};

const parseListItems = (paragraph, key) => (
    paragraph.split(key).filter((paragraphItem) => paragraphItem.trim())
);

export const formatBytes = (bytes) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 B";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    const result = (bytes / 1024 ** i);
    return result.toFixed(1) + sizes[i];
};

export const formatPackageDescription = (description, packageName) => {
    const content = description.split("\n .\n").filter((paragraph) => paragraph.trim());
    if (content.length === 1) {
        return formatFirstParagraph(description, false);
    }

    const firstParagraph = formatFirstParagraph(content.splice(0, 1));
    const collapseKey = `package-${packageName}`;
    return (
        <>
            <div className="text-justify">
                {firstParagraph}
                <div className={`collapse ${collapseKey}`}>
                    {content.map((paragraph, index) => {
                        let listItems = parseListItems(paragraph, " * ");
                        if (listItems.length < 2) {
                            listItems = parseListItems(paragraph, " - ");
                        }

                        const paragraphKey = `${collapseKey}-${index}`;
                        if (listItems.length > 1) {
                            return (
                                <div key={paragraphKey}>
                                    {formatPackageDescriptionList(listItems)}
                                </div>
                            );
                        }
                        return <p key={paragraphKey}>{paragraph}</p>;
                    })}
                </div>
            </div>
            <button
                className="btn btn-link pl-0 mt-n3"
                type="button"
                data-toggle="collapse"
                data-target={`.${collapseKey}`}
                aria-expanded="false"
                aria-controls={`${collapseKey}`}
            >
                <span className={`collapse show ${collapseKey}`}>More</span>
                <span className={`collapse ${collapseKey}`}>Less</span>
            </button>
        </>
    );
};

export const spaceSeparation = (largeNumber) => {
    const results = largeNumber.toLocaleString();
    return results;
};
