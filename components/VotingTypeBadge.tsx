import { BADGE_TYPES } from "@/constants";
import { EyeIcon, LockIcon } from "@/public/SvgIcons";
import { useTranslations } from "next-intl";

export function VotingTypeBadge(props: { type: keyof typeof BADGE_TYPES }) {
  const { type } = props;

  const t = useTranslations();

  const name = BADGE_TYPES[type] ? t(BADGE_TYPES[type]) : "";

  if (type === 0) {
    return (
      <div className="bg-red/10 rounded-md w-fit py-1 px-2 text-red flex gap-1 items-center">
        <div className="flex-shrink-0">
          <LockIcon />
        </div>
        <span className="font-semibold text-sm">{name}</span>
      </div>
    );
  }

  if (type === 1) {
    return (
      <div className="bg-blue/10 rounded-md w-fit py-1 px-2 text-blue flex gap-1 items-center">
        <div className="flex-shrink-0">
          <EyeIcon />
        </div>
        <span className="font-semibold text-sm">{name}</span>
      </div>
    );
  }

  return (
    <>
      <span className="font-bold">{name}</span>
    </>
  );
}
