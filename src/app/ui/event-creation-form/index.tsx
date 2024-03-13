import dayjs from "dayjs";
import React from "react";

import Modal, { IModal } from "../modal";
import Loader from "../loader";

import DateInput from "./date-input";
import TextInput from "./text-input";

interface IEventCreationForm extends Omit<IModal, "children"> {}

export default function EventCreationForm({
  open,
  setOpen,
}: IEventCreationForm) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmitForm = (formData: FormData) => {
    setLoading(true);

    const timeZone = "America/Sao_Paulo";
    const eventCreationPayload: IEventCreationPayload = {
      summary: formData.get("summary") as string,
      start: {
        dateTime: dayjs(formData.get("start") as string).toISOString(),
        timeZone,
      },
      end: {
        dateTime: dayjs(formData.get("end") as string).toISOString(),
        timeZone,
      },
    };

    fetch("/api/calendar/create-event", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(eventCreationPayload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) window.location.reload();
        else alert("Ocorreu um erro ao criar o evento. Tente novamente.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-3 text-dark w-[36rem]">
        {loading ? (
          <div className="w-full flex justify-center py-8">
            <Loader message="Criando evento..." />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-normal text-left mb-8">Novo evento</h1>
            <form
              className="flex flex-col gap-3 w-full"
              action={handleSubmitForm}
            >
              <TextInput fieldName="summary" label="Título" />
              <div className="flex gap-3 w-full">
                <DateInput fieldName="start" label="Início" />
                <DateInput fieldName="end" label="Término" />
              </div>
              <button
                type="submit"
                className="w-full px-3 py-2 mt-4 font-normal text-center text-md bg-violet-700 hover:bg-violet-600 hover:ring-2 hover:ring-offset-2 hover:ring-violet-300 transition-colors duration-200 text-white rounded-3xl"
              >
                Criar evento
              </button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}
