import { Device } from "types";

abstract class DeviceReference implements Device {
	name: string = "";
	type: "pluginDevice" | "abletonDevice" | "maxDevice";
	format: "vst3" | "vst" | undefined;

	constructor(type: "pluginDevice" | "abletonDevice" | "maxDevice") {
		this.type = type;
	}

	createDevice(node: Element): Device {
		this.name = this.fetchDeviceName(node);
		this.format = this.fetchDeviceFormat(node);

		return {
			name: this.name,
			type: this.type,
			format: this.format,
		};
	}

	fetchDeviceName(node: Element): string {
		throw new Error("Method not implemented.");
	}
	fetchDeviceType(node: Element): "pluginDevice" | "abletonDevice" | "maxDevice" | undefined {
		throw new Error("Method not implemented.");
	}
	fetchDeviceFormat(node: Element): "vst3" | "vst" | undefined {
		throw new Error("Method not implemented.");
	}
}

export class PluginDevice extends DeviceReference {
	constructor() {
		super("pluginDevice");
	}

	fetchDeviceFormat(node: Element): "vst3" | "vst" | undefined {
		const deviceInfo = node.getElementsByTagName("PluginDesc").item(0)?.firstElementChild;

    switch (deviceInfo?.nodeName) {
			case "Vst3PluginInfo":
				return "vst3";
			case "VstPluginInfo":
				return "vst";
			default:
				return undefined;
		}
	}
}
