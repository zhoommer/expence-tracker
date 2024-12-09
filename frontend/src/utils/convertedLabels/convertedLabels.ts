import { useI18n } from "vue-i18n";

export const convertedLabels = (labels: string[]) => {
  const { t } = useI18n();

  return labels.map((label) => t(label));
};
