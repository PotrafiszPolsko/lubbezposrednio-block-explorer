import { useTranslations } from "next-intl";

type HeaderTabProps = {
  actualHash: string;
  allTxHash: string;
  time: number;
  parentHash: string;
  version: number;
};

export const HeaderTab = (props: HeaderTabProps) => {
  const { actualHash, allTxHash, parentHash, time, version } = props;

  const t = useTranslations();

  const items = [
    { label: "block-hash", value: actualHash },
    { label: "parent-hash", value: parentHash },
    { label: "block-version", value: version },
    {
      label: "block-time",
      value: new Date(time * 1000).toISOString().split("T")[0]
    },
    { label: "hash-of-all-transactions", value: allTxHash }
  ];

  return (
    <div>
      <table className="w-full">
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-sm">
              <td className="py-[25px] min-w-[150px] w-1/3 text-left border-b-[1px] font-medium border-light-gray">
                {t(item.label)}
              </td>
              <td className="border-b-[1px] border-light-gray font-bold break-all">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
