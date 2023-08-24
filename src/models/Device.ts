import { Device } from "types";

export class DeviceParser {
	static parseDevice(node: Element): Device {
		switch (node.nodeName) {
			case "VstPluginInfo":
				return new VstPluginDevice(node);
			case "Vst3PluginInfo":
				return new Vst3PluginDevice(node);
			default:
				throw new Error("Unknown device type or no current implementation");
		}
	}
}

abstract class DeviceFactory implements Device {
	name: string = "";
	type: "vstPlugin" | "vst3Plugin" | "maxMidiDevice" | "maxInstrumentDevice" | "maxAudioEffectDevice" | "abletonDevice";
	format: "vst3" | "vst" | undefined;

	constructor(type: "vstPlugin" | "vst3Plugin" | "maxMidiDevice" | "maxInstrumentDevice" | "maxAudioEffectDevice" | "abletonDevice", node: Element) {
		this.type = type;
		this.name = this.fetchDeviceName(node)
	}

	abstract fetchDeviceName(node: Element): string
}

export class VstPluginDevice extends DeviceFactory {
	constructor(node: Element) {
		super("vstPlugin", node);
	}
	
	fetchDeviceName(node: Element): string {
		throw new Error("Method not implemented.");
	}
}

export class Vst3PluginDevice extends DeviceFactory {
	constructor(node: Element) {
		super("vst3Plugin", node);
	}
	
	fetchDeviceName(node: Element): string {
		throw new Error("Method not implemented.");
	}
}