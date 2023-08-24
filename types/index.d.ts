export interface Track {
  name: string;
	type: "audio" | "midi" | "group" | "return";
	groupId: number | null;
	devices: Device[];
	audios: Audio[];
}

export type Device = {
	type: "vstPlugin" | "vst3Plugin" | "maxMidiDevice" | "maxInstrumentDevice" | "maxAudioEffectDevice" | "abletonDevice" 
	name: string;
	// isRack: boolean;
	// isEnabled: boolean;
	// isFrozen: boolean;

	// version: string | number;
};

export type Audio = {
	view: "session" | "arrangement";
	location: string;
	// isOnRecommendedDir: boolean;
	// isEnabled: boolean;
	// isFrozen: boolean;
};

