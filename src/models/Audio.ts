export interface Audio {
	view: "session" | "arrangement";
	location: string;
}

export class AudioParser {
	static parseAudio(node: Element): Audio {
		const sessionAudioNode = node.closest("ClipSlotList");
		const arrangementAudioNode = node.closest("Events");
		if (sessionAudioNode) {
			return new SessionAudio(sessionAudioNode);
		} else if (arrangementAudioNode) {
			return new ArrangementAudio(arrangementAudioNode);
		} else {
			throw new Error("Audio out of bounds");
		}
		//TODO: Define audio cases / session arrangement and instrumets/effects
	}
}

export class AudioFactory implements Audio {
	view: "session" | "arrangement";
	location: string = "";
	// TODO: Implement other properties
	// isOnRecommendedDir: boolean;
	// isEnabled: boolean;
	// isFrozen: boolean;

	constructor(view: "session" | "arrangement", node: Element) {
		this.view = view;
		this.location = this.fetchAudioLocation(node);
	}

	fetchAudioLocation(node: Element): string {
		const location = node.getElementsByTagName("OriginalFileRef").item(0)?.getElementsByTagName("Path").item(0)?.getAttribute("Value");
		if (typeof location !== "string") {
			throw new Error("Could not find Clip Location");
		}
		return location;
	}
}

export class SessionAudio extends AudioFactory {
	constructor(node: Element) {
		super("session", node);
	}
}

export class ArrangementAudio extends AudioFactory {
	constructor(node: Element) {
		super("arrangement", node)
	}
}