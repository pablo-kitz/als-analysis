import { Device } from "types";

export class DeviceParser {
	static parseDevice(node: Element): Device {
		switch (node.nodeName) {
			case "PluginDevice":
				const vstNode = node.getElementsByTagName("PluginDesc").item(0)?.firstElementChild;
				switch (vstNode?.nodeName) {
					case "VstPluginInfo":
						return new VstPluginDevice(vstNode);
					case "Vst3PluginInfo":
						return new Vst3PluginDevice(vstNode);
				}
				throw new Error("Unable to define PluginDevice type");
			case "MxDeviceMidiEffect":
			case "MxDeviceInstrument":
			case "MxDeviceAudioEffect":
				return new M4LPluginDevice(node);
			default:
				// TODO:
				// check for simpler | sampler | drum rack | hybrid reverb for sample checking
				// otherwise normal abletonDevice implementation here
				return new AbletonDevice(node);
		}
	}
}

abstract class DeviceFactory implements Device {
	name: string = "";
	type: "vstPlugin" | "vst3Plugin" | "maxMidiDevice" | "maxInstrumentDevice" | "maxAudioEffectDevice" | "abletonDevice";

	constructor(type: "vstPlugin" | "vst3Plugin" | "maxMidiDevice" | "maxInstrumentDevice" | "maxAudioEffectDevice" | "abletonDevice", node: Element) {
		this.type = type;
		this.name = this.fetchDeviceName(node);
	}

	protected abstract fetchDeviceName(node: Element): string;
}

export class VstPluginDevice extends DeviceFactory {
	constructor(node: Element) {
		super("vstPlugin", node);
	}

	protected fetchDeviceName(node: Element): string {
		const deviceName = node.getElementsByTagName("Path").item(0)?.getAttribute("Value") ?? "";
		return deviceName;
	}
}

export class Vst3PluginDevice extends DeviceFactory {
	constructor(node: Element) {
		super("vst3Plugin", node);
	}

	protected fetchDeviceName(node: Element): string {
		const deviceName = node.getElementsByTagName("Name").item(0)?.getAttribute("Value") ?? "";
		return deviceName;
	}
}

export class M4LPluginDevice extends DeviceFactory {
	constructor(node: Element) {
		switch (node.nodeName) {
			case "MxDeviceMidiEffect":
				super("maxMidiDevice", node);
				break;
			case "MxDeviceInstrument":
				super("maxInstrumentDevice", node);
				break;
			case "MxDeviceAudioEffect":
				super("maxAudioEffectDevice", node);
				break;
		}
	}

	protected fetchDeviceName(node: Element): string {
		const deviceName = node.getElementsByTagName("Path").item(0)?.getAttribute("Value") ?? ""
		return deviceName
	}
}

export class AbletonDevice extends DeviceFactory {
	constructor(node: Element) {
		super("abletonDevice", node)
	} 

	protected fetchDeviceName(node: Element): string {
		return node.nodeName
	}
}