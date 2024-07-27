"use client";

import { useTranslations } from "hooks";

const TranslationWrapper = ({ label }: { label: string }) => {
  const t = useTranslations();

  return <>{t(label)}</>;
};

export default TranslationWrapper;
