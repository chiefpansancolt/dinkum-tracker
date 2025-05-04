export interface SaveFABProps {
  isDirty: boolean;
  onSave: () => boolean | Promise<boolean>;
}
