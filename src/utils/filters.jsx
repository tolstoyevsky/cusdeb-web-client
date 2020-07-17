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

export const formatPackageDescription = (description, packageName) => {
    const content = description.split("\n .\n").filter((paragraph) => paragraph.trim());
    if (content.length === 1) {
        return description;
    }

    const firstParagraph = content.splice(0, 1);
    const collapseKey = `package-${packageName}`;

    return (
        <>
            <div className="text-justify">
                <p>{firstParagraph}</p>
                <div className={`collapse ${collapseKey}`}>
                    {content.map((paragraph, index) => {
                        const paragraphKey = `${collapseKey}-${index}`;
                        const listItems = paragraph.split(" * ").filter((paragraphItem) => (
                            paragraphItem.trim()
                        ));

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
