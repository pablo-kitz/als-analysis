import { AudioParser, AudioClip } from "./Audio";
import { DeviceParser, Device } from "./Device";

export interface Track {
  name: string;
  type: "audio" | "midi" | "group" | "return" | "master" | "chain";
  groupId: number | null;
  devices: Device[];
  audios: AudioClip[];
}

export class TrackParser {
  static parseTrack(node: Element): Track {
    switch (node.nodeName) {
      case "AudioTrack":
        return new AudioTrack(node);
      case "MidiTrack":
        return new MidiTrack(node);
      case "GroupTrack":
        return new GroupTrack(node);
      case "ReturnTrack":
        return new ReturnTrack(node);
      case "MasterTrack":
        return new MasterTrack(node);
      case "InstrumentBranch":
      case "AudioEffectBranch":
        return new ChainTrack(node);
      default:
        console.log(node.nodeName);
        throw new Error("Unknown track type or no current implementation");
    }
  }
}

abstract class TrackFactory implements Track {
  name: string = "";
  groupId: number | null = null;
  type: "audio" | "midi" | "group" | "return" | "master" | "chain";
  devices: Device[] = [];
  audios: AudioClip[] = [];

  constructor(
    type: "audio" | "midi" | "group" | "return" | "master" | "chain",
    node: Element,
  ) {
    this.type = type;
    this.name = this.fetchTrackName(node);
    this.groupId = this.fetchGroupId(node);
    this.devices = this.fetchDevices(node);
    this.audios = this.fetchAudios(node);
  }

  private fetchTrackName(node: Element): string {
    const name = node
      .getElementsByTagName("EffectiveName")
      .item(0)
      ?.getAttribute("Value");
    if (typeof name !== "string") {
      throw new Error("Name was not found");
    }

    return name;
  }

  private fetchGroupId(node: Element): number | null {
    const groupId = node
      .getElementsByTagName("TrackGroupId")
      .item(0)
      ?.getAttribute("TrackGroupId");
    if (typeof groupId !== "string" || groupId === "-1" || groupId === null) {
      return null;
    }

    return parseInt(groupId, 10);
  }

  private fetchDevices(node: Element): Device[] {
    const deviceNodes = node.getElementsByTagName("Devices").item(0)?.children;
    const devices: Device[] = [];

    if (deviceNodes == undefined) {
      return devices;
    }

    for (let i = 0; i < deviceNodes.length; i++) {
      const device = DeviceParser.parseDevice(deviceNodes[i]);
      devices.push(device);
    }

    return devices;
  }

  protected fetchAudios(node: Element): AudioClip[] {
    node;
    return [];
  }
}

export class AudioTrack extends TrackFactory {
  constructor(node: Element) {
    super("audio", node);
  }

  protected fetchAudios(node: Element): AudioClip[] {
    const audios: AudioClip[] = [];

    const audioClips = node.getElementsByTagName("AudioClip");
    for (let i = 0; i < audioClips.length; i++) {
      const audio = AudioParser.parseAudio(audioClips[i]);
      audios.push(audio);
    }

    return audios;
  }
}

export class MidiTrack extends TrackFactory {
  constructor(node: Element) {
    super("midi", node);
  }
}

export class GroupTrack extends TrackFactory {
  constructor(node: Element) {
    super("group", node);
  }
}

export class ReturnTrack extends TrackFactory {
  constructor(node: Element) {
    super("return", node);
  }
}

export class MasterTrack extends TrackFactory {
  constructor(node: Element) {
    super("master", node);
  }
}

export class ChainTrack extends TrackFactory {
  constructor(node: Element) {
    super("chain", node);
  }
}
