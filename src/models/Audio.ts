const recommendedDirs = [
  "User Library",
  "Biblioteca de Usuario",
  "Project",
  "Proyecto",
];

export interface AudioClip {
  audioFileName: string;
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
  }
}

export class AudioFactory implements AudioClip {
  name: string;
  audioFileName: string;
  view: "session" | "arrangement";
  isOnRecommendedDir: boolean;
  location: string;

  constructor(view: "session" | "arrangement", node: Element) {
    this.view = view;
    this.name = this.fetchAudioName(node);
    this.location = this.fetchAudioLocation(node);
    this.audioFileName = this.fetchAudioFileName();
    this.isOnRecommendedDir = this.isAudioOnRecommendedDir();
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

  public isAudioOnRecommendedDir() {
    return recommendedDirs.some((dir) => this.location.includes(dir));
  }

  fetchAudioFileName(): string {
    const pattern = "([^/]+)$";
    const match = this.location.match(pattern);

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
