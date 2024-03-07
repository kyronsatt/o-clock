import { twMerge } from "tailwind-merge";

interface IDynamicBackground {
    children: React.ReactNode;
    currentTime?: Date;
}

export default function DynamicBackground({
    children,
    currentTime,
}: IDynamicBackground) {
    const morningBackgroundColorGradient = "from-[#75FF83] to-[#00D2D2]";
    const afternoonBackgroundColorGradient = "from-[#FFB13D] to-[#FF5621]";
    const nightBackgroundColorGradient = "from-[#7F6AFF] to-[#8700C7]";

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
