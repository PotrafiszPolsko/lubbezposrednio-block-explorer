import { VotingTypeBadge } from "@/components/VotingTypeBadge";
import { BADGE_TYPES } from "@/constants";
import { formatDate } from "@/utils";

export function formatMetaTabValue(key: string, value: any) {
  const formatter = {
    Start_voting_date: (val: number) => formatDate(val),
    End_voting_date: (val: number) => formatDate(val),
    Voting_type: (val: number) => (
      <VotingTypeBadge type={val as keyof typeof BADGE_TYPES} />
    ),
    Options: (val: string[] | string) =>
      Array.isArray(val)
        ? val.map((option: string) => `"${option}"`).join(", ")
        : val
  };

  return key in formatter
    ? formatter[key as keyof typeof formatter](value)
    : value;
}
