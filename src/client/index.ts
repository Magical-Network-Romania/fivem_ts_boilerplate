import config from "@common/config";
import { hello } from "@common/index";

hello();

RegisterNuiCallback("nuiReady", () => {
	if (config.loadWeb) SendNUIMessage({ action: "setVisible", data: { visible: true } });
});
