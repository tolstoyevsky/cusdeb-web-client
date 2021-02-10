import Select from "./Select";

export default class SelectSearch extends Select {
    componentDidMount() {
        const { id, onChange } = this.props;
        $(`#${id}`).select2({
            width: "100%",
        }).on("change", function () {
            onChange(this.value);
        });
    }
}
