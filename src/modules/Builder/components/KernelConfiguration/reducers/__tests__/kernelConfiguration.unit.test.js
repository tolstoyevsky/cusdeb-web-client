import KernelConfigurationReducer from "../kernelConfiguration";
import {
    fetchKernelConfiguratorThemesSucceeded,
} from "../../actions/kernelConfiguration";

describe("KernelConfiguration reducer", () => {
    it("Default state", () => {
        expect(KernelConfigurationReducer(undefined, {})).toEqual({
            kernelConfiguratorThemes: [],
        });
    });

    it("FETCH_KERNEL_CONFIGURATOR_THEMES_SUCCEEDED", () => {
        const kernelConfiguratorThemes = [
            "bluetitle",
            "mono",
            "blackbg",
            "classic",
        ];
        const reducer = KernelConfigurationReducer({ kernelConfiguratorThemes },
            fetchKernelConfiguratorThemesSucceeded(kernelConfiguratorThemes));
        expect(reducer).toEqual({ kernelConfiguratorThemes });
    });
});
