import {
  deletePlaythrough,
  getPlaythroughs,
  savePlaythrough,
  updatePlaythroughData,
} from "@/lib/localStorage";
import { exportData, importData } from "@/lib/services/dataService";
import { asFile, describeStorageContract } from "./contract";

describeStorageContract("old localStorage code", () => ({
  readAll: getPlaythroughs,
  save: savePlaythrough,
  update: updatePlaythroughData,
  remove: deletePlaythrough,
  exportJson: exportData,
  importText: (text) => importData(asFile(text)),
}));
