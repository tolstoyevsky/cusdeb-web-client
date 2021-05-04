import { fetchKernelConfiguratorThemesSucceeded } from "../kernelConfiguration";
import { FETCH_KERNEL_CONFIGURATOR_THEMES_SUCCEEDED } from "../../constants/kernelConfiguration";

describe("KernelConfiguration actions", () => {
    it("fetchKernelConfiguratorThemesSucceeded", () => {
        const kernelConfiguratorThemes = [
            "bluetitle",
            "mono",
            "blackbg",
            "classic",
        ];
        const expectedAction = {
            type: FETCH_KERNEL_CONFIGURATOR_THEMES_SUCCEEDED,
            payload: kernelConfiguratorThemes,
        };
        expect(fetchKernelConfiguratorThemesSucceeded(
            kernelConfiguratorThemes,
        )).toEqual(expectedAction);
    });
});
