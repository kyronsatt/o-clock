import { twMerge } from "tailwind-merge";
import "./styles.css";

interface IDynamicBackground {
  children: React.ReactNode;
  currentTime?: Date;
}

export default function DynamicBackground({
  children,
  currentTime,
}: IDynamicBackground) {
  const morningBackgroundColorGradient = "morning-radial-gradient";
  const afternoonBackgroundColorGradient = "afternoon-radial-gradient";
  const nightBackgroundColorGradient = "night-radial-gradient";

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
        "flex h-screen w-screen",
        getBackgroundColorGradient()
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-center px-6 py-16">
        {children}
      </div>
    </div>
  );
}
