import { exportData, importData } from "../reference/dataService";
import {
  deletePlaythrough,
  getPlaythroughs,
  savePlaythrough,
  updatePlaythroughData,
} from "../reference/localStorage";
import { asFile, describeStorageContract } from "./contract";

describeStorageContract("old localStorage code", () => ({
  readAll: getPlaythroughs,
  save: savePlaythrough,
  update: updatePlaythroughData,
  remove: deletePlaythrough,
  exportJson: exportData,
  importText: (text) => importData(asFile(text)),
}));
