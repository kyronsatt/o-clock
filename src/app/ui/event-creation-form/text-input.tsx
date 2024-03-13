interface ITextInput {
  label: string;
  fieldName: string;
}

export default function TextInput({ label, fieldName }: ITextInput) {
  return (
    <div className="flex flex-col justify-center items-start w-full">
      <label className="text-sm font-medium pl-1">{label}</label>
      <input
        name={fieldName}
        type="text"
        placeholder="Digite aqui"
        className="w-full rounded-lg px-2 py-1 border-[1px] border-dark/20 focus:outline-violet-600 focus:outline-offset-2 focus:outline-1"
        required
      />
    </div>
  );
}
