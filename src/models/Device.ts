import { Track, TrackParser } from "./Track";

export interface Device {
  type:
    | "vstPlugin"
    | "vst3Plugin"
    | "maxMidiDevice"
    | "maxInstrumentDevice"
    | "maxAudioEffectDevice"
    | "abletonDevice";
  name: string;
  path: string;
  // isRack: boolean;
  // isEnabled: boolean;
  // isFrozen: boolean;
}

export class DeviceParser {
  static parseDevice(node: Element): Device {
    const vstNode = node.getElementsByTagName("PluginDesc").item(0)
      ?.firstElementChild;
    switch (node.nodeName) {
      case "PluginDevice":
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
        // TODO:
        // Check for possible audio samples
        return new M4LPluginDevice(node);
      case "InstrumentGroupDevice":
      case "AudioEffectGroupDevice":
        return new AbletonGroupDevice(node);
      default:
        // TODO:
        // check for simpler | sampler | drum rack | hybrid reverb for sample checking
        return new AbletonDevice(node);
    }
  }
}

abstract class DeviceFactory implements Device {
  name: string = "";
  type:
    | "vstPlugin"
    | "vst3Plugin"
    | "maxMidiDevice"
    | "maxInstrumentDevice"
    | "maxAudioEffectDevice"
    | "abletonDevice";
  path: string;

  constructor(
    type:
      | "vstPlugin"
      | "vst3Plugin"
      | "maxMidiDevice"
      | "maxInstrumentDevice"
      | "maxAudioEffectDevice"
      | "abletonDevice",
    node: Element,
  ) {
    this.type = type;
    this.path = this.fetchDevicePath(node);
    this.name = this.fetchDeviceName(node);
  }

  protected abstract fetchDeviceName(node: Element): string;
  private fetchDevicePath(node: Element): string {
    const devicePath =
      node.getElementsByTagName("Path").item(0)?.getAttribute("Value") ?? "";
    return devicePath;
  }
}

export class VstPluginDevice extends DeviceFactory {
  constructor(node: Element) {
    super("vstPlugin", node);
  }

  protected fetchDeviceName(node: Element): string {
    const deviceName =
      node.getElementsByTagName("PlugName").item(0)?.getAttribute("Value") ??
      "";
    return deviceName;
  }
}

export class Vst3PluginDevice extends DeviceFactory {
  constructor(node: Element) {
    super("vst3Plugin", node);
  }

  protected fetchDeviceName(node: Element): string {
    const deviceName =
      node.getElementsByTagName("Name").item(1)?.getAttribute("Value") ?? "";
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

  protected fetchDeviceName(): string {
    const regexPattern = "^(?:.*/)?([^/]+?|)(?=(?:.[^/.]*)?$)";
    const deviceNameMatch = this.path.match(regexPattern);

    if (deviceNameMatch) {
      return deviceNameMatch[1];
    } else {
      return "";
    }
  }
}

export class AbletonDevice extends DeviceFactory {
  constructor(node: Element) {
    super("abletonDevice", node);
    this.path = "Core Library";
  }

  protected fetchDeviceName(node: Element): string {
    return node.nodeName;
  }
}

export class AbletonGroupDevice extends DeviceFactory {
  chains: Track[] = [];
  constructor(node: Element) {
    super("abletonDevice", node);
    this.chains = this.fetchChains(node);
  }

  protected fetchDeviceName(node: Element): string {
    const deviceName =
      node.getElementsByTagName("UserName").item(0)?.getAttribute("Value") ??
      "";
    if (deviceName === "") {
      switch (node.nodeName) {
        case "InstrumentGroupDevice":
          return "Instrument Rack";
        case "AudioEffectGroupDevice":
          return "Audio Effect Rack";
      }
    }
    return deviceName;
  }

  private fetchChains(node: Element): Track[] {
    const chains: Track[] = [];
    const chainsNodes = node.getElementsByTagName("Branches").item(0)?.children;

    if (chainsNodes == undefined) {
      return chains;
    }

    for (let i = 0; i < chainsNodes?.length; i++) {
      const chain = TrackParser.parseTrack(chainsNodes[i]);
      chains.push(chain);
    }

    return chains;
  }
}
