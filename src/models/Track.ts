import { Device, Track, Audio } from "types";
import { AudioReference } from "./Audio";

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
			default:
				throw new Error("Unknown track type or no current implementation");
		}
	}
}

abstract class TrackFactory implements Track {
	name: string = "";
	groupId: number | null = null;
	type: "audio" | "midi" | "group" | "return";
	devices: Device[] = [];
	audios: Audio[] = [];

	constructor(type: "audio" | "midi" | "group" | "return", node: Element) {
		this.type = type;
    this.name = this.fetchTrackName(node);
    this.groupId = this.fetchGroupId(node);
		this.devices = this.fetchDevices(node);
		this.audios = this.fetchAudios(node);
	}

	private fetchTrackName(node: Element): string {
		const e = node.getElementsByTagName("Name");
		const name = e[0].getElementsByTagName("EffectiveName").item(0)?.getAttribute("Value");
		if (typeof name !== "string") {
			throw new Error("Name was not found");
		}

		return name;
	}

	private fetchGroupId(node: Element): number | null {
		const e = node.getElementsByTagName("TrackGroupId");
		const groupId = e[0].getAttribute("TrackGroupId");
		if (typeof groupId !== "string" || groupId === "-1") {
			return null;
		}

		return parseInt(groupId, 10);
	}

	private fetchDevices(node: Element): Device[] {
		throw new Error("getDevices Method not implemented");
	}

	protected fetchAudios(node: Element): Audio[] {
		return [];
	}
}

export class AudioTrack extends TrackFactory {
	constructor(node: Element) {
		super("audio", node);
	}

	protected fetchAudios(node: Element): Audio[] {
		const audios: Audio[] = [];

		const audioClips = node.getElementsByTagName("AudioClip");
		for (let i = 0; i < audioClips.length; i++) {
			const audioClip = audioClips[i];

			if (this.isSessionView(audioClip)) {
				audios.push(new AudioReference("session").createAudioReference(audioClip));
			} else if (this.isArrangementView(audioClip)) {
				audios.push(new AudioReference("arrangement").createAudioReference(audioClip));
			} else {
				throw new Error("Audio out of bounds");
			}
		}

		return audios;
	}

	// Extra audio searching methods
	private isSessionView(audioClip: Element): boolean {
		const clipSlot = audioClip.closest("ClipSlotList");
		return clipSlot !== null;
	}

	private isArrangementView(audioClip: Element): boolean {
		const arrangerEvent = audioClip.closest("Events");
		return arrangerEvent !== null;
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
