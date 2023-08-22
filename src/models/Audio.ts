import { Audio } from "types";

export class AudioReference implements Audio {
	view: "session" | "arrangement";
	location: string = "";
  // TODO: Implement other properties
	// isOnRecommendedDir: boolean;
	// isEnabled: boolean;
	// isFrozen: boolean;

	constructor(view: "session" | "arrangement") {
		this.view = view;
	}

	createAudioReference(node: Element): Audio {
		this.location = this.getAudioLocation(node);

    return {
      view: this.view,
      location: this.location
    }
	}

	getAudioLocation(node: Element): string {
		const location = node.getElementsByTagName("OriginalFileRef").item(0)?.getElementsByTagName("Path").item(0)?.getAttribute("Value");

		if (typeof location !== "string") {
			throw new Error("Could not find Clip Location");
		}
		return location;
	}
}
