import { twMerge } from "tailwind-merge";
import "./styles.css";

interface ILoader {
  message?: string;
  className?: string;
}
export default function Loader({ message, className }: ILoader) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-2 text-md text-dark font-normal",
        className
      )}
    >
      <div className="loader" />
      {message}
    </div>
  );
}
