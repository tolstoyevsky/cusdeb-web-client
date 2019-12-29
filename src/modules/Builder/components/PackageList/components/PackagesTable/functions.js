import React from "react";

const getBadgeByPackageType = packageType => {
    if (packageType === "base")
        return <span className="badge bg-warning">Base</span>;
    else if (packageType === "selected")
        return <span className="badge bg-success">Selected</span>;
    if (packageType === "dependent")
        return <span className="badge bg-danger">Dependent</span>;
}

const prepareTableItem = (_item, packages, onPackageActionClick) => {
    let item = Object.assign({}, _item);

    let packageType = "unset";
    if (packages.base.includes(item.package))
        packageType = "base";
    if (packages.selected.includes(item.package))
        packageType = "selected";
    if (packages.dependent.includes(item.package))
        packageType = "dependent";

    let badge = getBadgeByPackageType(packageType);
    if (badge)
        item["package"] = <span>{item["package"]}{badge}</span>;

    if (packageType !== "base" && packageType !== "dependent") {
        item["action"] = (
            <button className="btn btn-default"
                onClick={onPackageActionClick}
                data-action={packageType === "selected" ? "remove" : "add"}
                data-package={item.package}>

                {packageType === "selected" ? "-" : "+"}
            </button>
        );
    }

    return item;
}

export default prepareTableItem;
