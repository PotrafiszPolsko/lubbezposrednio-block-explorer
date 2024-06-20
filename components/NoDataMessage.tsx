import { ReactNode } from "react";

export const NoDataMessage = (props: { children: ReactNode }) => {
  return (
    <em className="text-[#dcdcdc] leading-tight text-xl w-full block text-center py-10">
      {props.children}
    </em>
  );
};
