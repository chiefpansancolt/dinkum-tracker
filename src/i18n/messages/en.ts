import common from "./en/common.json";
import shell from "./en/shell.json";
import ui from "./en/ui.json";

/**
 * The English catalog is the source of truth for the key names and their types. One file for each
 * area keeps a change to one page in one file. A new language copies this shape.
 */
const en = {
  common,
  ui,
  shell,
};

export default en;
