import { Playthrough, PlaythroughUpdateData } from "@/types/app";
import * as electronStore from "./electronStorage";
import * as browserStorage from "./localStorage";

const isElectron = (): boolean => {
  return false;
};

export const STORAGE_KEY = "dinkum-tracker-playthroughs";

export const getPlaythroughs = async (): Promise<Playthrough[]> => {
  if (isElectron()) {
    return await electronStore.getPlaythroughs();
  } else {
    return browserStorage.getPlaythroughs();
  }
};

export const getPlaythroughById = async (
  id: string,
): Promise<Playthrough | null> => {
  if (isElectron()) {
    return await electronStore.getPlaythroughById(id);
  } else {
    return browserStorage.getPlaythroughById(id);
  }
};

export const savePlaythrough = async (
  playthrough: Playthrough,
): Promise<void> => {
  if (isElectron()) {
    await electronStore.savePlaythrough(playthrough);
  } else {
    browserStorage.savePlaythrough(playthrough);
  }
};

export const deletePlaythrough = async (id: string): Promise<void> => {
  if (isElectron()) {
    await electronStore.deletePlaythrough(id);
  } else {
    browserStorage.deletePlaythrough(id);
  }
};

export const createEmptyPlaythrough = (name: string): Playthrough => {
  return browserStorage.createEmptyPlaythrough(name);
};

export const updatePlaythroughData = async (
  playthroughId: string,
  updates: PlaythroughUpdateData,
): Promise<boolean> => {
  if (isElectron()) {
    return await electronStore.updatePlaythroughData(playthroughId, updates);
  } else {
    return browserStorage.updatePlaythroughData(playthroughId, updates);
  }
};
