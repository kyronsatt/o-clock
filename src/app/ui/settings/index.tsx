import React from "react";
import { signOut } from "next-auth/react";

import Modal, { IModal } from "../modal";

interface ISettings extends Omit<IModal, "children"> {}

export default function Settings({ open, setOpen }: ISettings) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-3 text-dark w-[36rem]">
        <h1 className="text-3xl font-normal text-left mb-8">Configurações</h1>
        <button
          type="button"
          className="w-full px-3 py-2 mt-4 font-normal text-center text-md bg-red-600 hover:bg-red-500 hover:ring-2 hover:ring-offset-2 hover:ring-red-300 transition-colors duration-200 text-white rounded-3xl"
          onClick={() => signOut()}
        >
          Sair
        </button>
      </div>
    </Modal>
  );
}
