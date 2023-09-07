export interface AudioClip {
  audioFileName: string;
  view: "session" | "arrangement";
  isOnRecommendedDir: boolean | undefined;
  location: string;
  checkAudioDir(shortFileName: string): boolean;
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
  name: string;
  audioFileName: string;
  view: "session" | "arrangement";
  isOnRecommendedDir: boolean | undefined;
  location: string;
  // TODO: Implement other properties
  // isEnabled: boolean;
  // isFrozen: boolean;

  constructor(view: "session" | "arrangement", node: Element) {
    this.view = view;
    this.name = this.fetchAudioName(node);
    this.location = this.fetchAudioLocation(node);
    this.audioFileName = this.fetchAudioFileName();
  }

  fetchAudioName(node: Element): string {
    const name = node
      .getElementsByTagName("Name")
      .item(0)
      ?.getAttribute("Value");

    if (typeof name !== "string") {
      throw new Error("Could not find Audio Clip Name");
    }

    return name;
  }

  fetchAudioLocation(node: Element): string {
    const location = node
      .getElementsByTagName("FileRef")
      .item(0)
      ?.getElementsByTagName("Path")
      .item(0)
      ?.getAttribute("Value");

    if (typeof location !== "string") {
      throw new Error("Could not find Clip Location");
    }

    return location;
  }

  public checkAudioDir(shortFileName: string): boolean {
    if (
      this.location.includes("User Library") ||
      this.location.includes(shortFileName)
    ) {
      this.isOnRecommendedDir = true;
      return true;
    }
    return false;
  }

  fetchAudioFileName(): string {
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
