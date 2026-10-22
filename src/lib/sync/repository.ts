import type { InstalledRepository } from "@gamerdexapp/gamerdex-sync";

export const DATA_REPOSITORY_NAME = "gamerdex-data";

export const CREATE_REPOSITORY_URL = `https://github.com/new?name=${DATA_REPOSITORY_NAME}&visibility=private`;

export type DataRepository =
  | { kind: "ready"; fullName: string }
  | { kind: "public"; fullName: string }
  | { kind: "missing" };

const hasDataName = (repository: InstalledRepository) =>
  repository.fullName.split("/")[1] === DATA_REPOSITORY_NAME;

export const findDataRepository = (
  repositories: InstalledRepository[],
): DataRepository => {
  const matches = repositories.filter(hasDataName);
  const privateMatch = matches.find((repository) => repository.private);
  if (privateMatch) return { kind: "ready", fullName: privateMatch.fullName };
  if (matches[0]) return { kind: "public", fullName: matches[0].fullName };
  return { kind: "missing" };
};
