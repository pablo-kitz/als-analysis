import { AudioClip } from "./Audio";
import { TrackParser, Track } from "./Track";

export class ALSReport {
  fileName: string;
  shortFileName: string;
  liveVer: string;
  tracks: Track[];
  createdDate: Date;
  externalAudios: AudioClip[];

  constructor(fileName: string, root: Element) {
    this.fileName = fileName;
    this.shortFileName = this.fileName.replace(".als", "");
    this.liveVer = this.fetchLiveVersion(root);
    this.tracks = this.fetchTracks(root);
    this.tracks.push(this.fetchMasterTrack(root));
    this.createdDate = new Date();
    this.externalAudios = this.scanAudiosDir();
  }

  private fetchLiveVersion(root: Element): string {
    const creatorAttribute = root.getAttribute("Creator");
    return creatorAttribute ?? "";
  }

  private fetchTracks(root: Element): Track[] {
    const trackNodes = root.getElementsByTagName("Tracks").item(0)?.children;
    const tracks: Track[] = [];
    if (trackNodes == undefined) {
      throw new Error("No tracks found");
    }
    for (let i = 0; i < trackNodes.length; i++) {
      const track = TrackParser.parseTrack(trackNodes[i]);
      tracks.push(track);
    }

    return tracks;
  }

  private fetchMasterTrack(root: Element): Track {
    const masterNode = root.getElementsByTagName("MasterTrack").item(0);
    if (masterNode) {
      return TrackParser.parseTrack(masterNode);
    }
    throw new Error("No Master Track found");
  }

  private scanAudiosDir(): AudioClip[] {
    let externalAudios = [];

    for (const track of this.tracks) {
      for (const audio of track.audios) {
        if (!audio.checkAudioDir(this.shortFileName)) {
          externalAudios.push(audio);
        }
      }
    }
    return externalAudios;
  }
}
