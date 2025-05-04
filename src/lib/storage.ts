import { Playthrough, PlaythroughUpdateData } from "@/types/app";
import * as browserStorage from "./localStorage";

export const STORAGE_KEY = "dinkum-tracker-playthroughs";

export const getPlaythroughs = async (): Promise<Playthrough[]> => {
  return browserStorage.getPlaythroughs();
};

export const getPlaythroughById = async (
  id: string,
): Promise<Playthrough | null> => {
  return browserStorage.getPlaythroughById(id);
};

export const savePlaythrough = async (
  playthrough: Playthrough,
): Promise<void> => {
  browserStorage.savePlaythrough(playthrough);
};

export const deletePlaythrough = async (id: string): Promise<void> => {
  browserStorage.deletePlaythrough(id);
};

export const createEmptyPlaythrough = (name: string): Playthrough => {
  return browserStorage.createEmptyPlaythrough(name);
};

export const updatePlaythroughData = async (
  playthroughId: string,
  updates: PlaythroughUpdateData,
): Promise<boolean> => {
  return browserStorage.updatePlaythroughData(playthroughId, updates);
};
