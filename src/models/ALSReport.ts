import { Track } from "types";
import { TrackParser } from "./Track";

export class ALSReport {
	fileName: string;
	liveVer: string;
	tracks: Track[];
  createdDate: Date;

  constructor(fileName: string, root: Element) {
    this.fileName = fileName
    this.liveVer = this.fetchLiveVersion(root)
    this.tracks = this.fetchTracks(root)
    this.createdDate = new Date()
  }

  private fetchLiveVersion(root: Element): string {
    const creatorAttribute = root.getElementsByTagName("Ableton").item(0)?.getAttribute("Creator");
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
}
