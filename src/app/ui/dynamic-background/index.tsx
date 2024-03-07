import { twMerge } from "tailwind-merge";

interface IDynamicBackground {
  children: React.ReactNode;
  currentTime?: Date;
}

export default function DynamicBackground({
  children,
  currentTime,
}: IDynamicBackground) {
  const morningBackgroundColorGradient = "from-[#CDFFFF] to-[#00D2D2]";
  const afternoonBackgroundColorGradient = "from-[#FFBA08] to-[#E85D04]";
  const nightBackgroundColorGradient = "from-[#3E1F47] to-[#03071E]";

  const getBackgroundColorGradient = () => {
    if (currentTime) {
      const hours = currentTime?.getHours();

      if (hours >= 5 && hours < 12) {
        return morningBackgroundColorGradient;
      } else if (hours >= 12 && hours < 18) {
        return afternoonBackgroundColorGradient;
      } else if (hours >= 18 || hours < 5) {
        return nightBackgroundColorGradient;
      }
    }
  };

  return (
    <div
      className={twMerge(
        "flex h-screen w-screen flex-col items-center justify-center px-6 py-16 bg-gradient-to-b",
        getBackgroundColorGradient()
      )}
    >
      {children}
    </div>
  );
}
