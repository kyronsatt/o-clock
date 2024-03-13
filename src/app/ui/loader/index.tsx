import "./styles.css";

interface ILoader {
  message?: string;
}
export default function Loader({ message }: ILoader) {
  return (
    <div className="flex flex-col items-center gap-2 text-md text-dark font-normal">
      <div className="loader" />
      {message}
    </div>
  );
}
