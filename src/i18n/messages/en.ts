import common from "./en/common.json";
import overview from "./en/overview.json";
import pedia from "./en/pedia.json";
import playthroughs from "./en/playthroughs.json";
import settings from "./en/settings.json";
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
  playthroughs,
  settings,
  overview,
  pedia,
};

export default en;
