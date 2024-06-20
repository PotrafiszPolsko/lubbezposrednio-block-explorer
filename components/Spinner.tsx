import { cssVar } from "@/utils";

export function Spinner({
  size = 20,
  width = 4,
}: {
  size?: number;
  width?: number;
}) {
  return (
    <svg className="spinner" viewBox="0 0 50 50" width={size} height={size}>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={`rgb(${cssVar("--gray")})`}
        strokeWidth={width}
      />

      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={`rgb(${cssVar("--blue")})`}
        strokeDasharray="30"
        strokeDashoffset="20"
        strokeWidth={width}
        strokeLinecap="round"
      />
      <style jsx>{`
        .spinner {
          animation: rotate 2s linear infinite;
        }

        .spinner circle.path {
          strokelinecap: round;
          stroke-dasharray: 90;
          animation: dash 2s ease-in-out infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
    </svg>
  );
}
