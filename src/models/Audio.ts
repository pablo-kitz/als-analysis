export interface AudioClip {
  audioName: string;
  view: "session" | "arrangement";
  isOnRecommendedDir: boolean;
  location: string;
}

export class AudioParser {
  static parseAudio(node: Element): AudioClip {
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

export class AudioFactory implements AudioClip {
  audioName: string;
  view: "session" | "arrangement";
  isOnRecommendedDir: boolean;
  location: string;
  // TODO: Implement other properties
  // isEnabled: boolean;
  // isFrozen: boolean;

  constructor(view: "session" | "arrangement", node: Element) {
    this.view = view;
    this.location = this.fetchAudioLocation(node);
    this.isOnRecommendedDir = this.checkAudioDir();
    this.audioName = this.fetchAudioName();
  }

  fetchAudioLocation(node: Element): string {
    const location = node
      .getElementsByTagName("OriginalFileRef")
      .item(0)
      ?.getElementsByTagName("Path")
      .item(0)
      ?.getAttribute("Value");
    if (typeof location !== "string") {
      throw new Error("Could not find Clip Location");
    }
    return location;
  }

  checkAudioDir(): boolean {
    return this.location.includes("User Library");
  }

  fetchAudioName(): string {
    const pattern = "([^/]+)$";
    let match = this.location.match(pattern);

    if (match) {
      return match[1];
    } else {
      return this.location;
    }
  }
}

export class SessionAudio extends AudioFactory {
  constructor(node: Element) {
    super("session", node);
  }
}

export class ArrangementAudio extends AudioFactory {
  constructor(node: Element) {
    super("arrangement", node);
  }
}
