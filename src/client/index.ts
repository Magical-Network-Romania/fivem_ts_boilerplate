import configPromise from "@common/config";
import { hello } from "@common/index";

hello();
configPromise.then((config) => {
	if (config.loadWeb) SendNUIMessage({ action: "setVisible", data: { visible: true } });
});
