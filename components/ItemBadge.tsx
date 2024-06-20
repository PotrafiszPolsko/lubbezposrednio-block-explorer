import { ReactNode } from "react";

type ItemBadgeProps = {
  color: string;
  bgColor: string;
  icon: ReactNode;
  label: string;
  value: string;
};

export const ItemBadge = (props: ItemBadgeProps) => {
  const { color, bgColor, icon, label, value } = props;
  return (
    <div className="flex items-center gap-5">
      <div
        style={{ color: color }}
        className="w-[60px] h-[60px]  flex items-center justify-center shrink-0 relative"
      >
        <div
          className="w-full h-full rounded-full absolute inset-0 opacity-10"
          style={{ backgroundColor: bgColor }}
        />
        <span className="relative opacity-100">{icon}</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-dark opacity-50 font-semibold text-sm">
          {label}
        </span>
        <span className="text-2xl font-medium">
          {/* {Intl.NumberFormat("pl-PL", {
              notation: "standard",
              useGrouping: true,
            }).format(item.value)} */}
          {value}
        </span>
      </div>
    </div>
  );
};
