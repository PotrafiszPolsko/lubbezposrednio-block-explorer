import { Icon } from "@/components/Icon";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface ActionButtonProps {
  href: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ href }) => {
  const t = useTranslations();
  return (
    <Link
      href={href}
      className="text-sm font-bold flex items-center gap-1 group"
    >
      {t("show-all")}
      <Icon
        name="arrowRight"
        className="group-hover:translate-x-[5px] transition duration-300"
      />
    </Link>
  );
};
