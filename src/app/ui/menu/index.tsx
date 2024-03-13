import React from "react";
import { signOut } from "next-auth/react";

import EventCreationForm from "../event-creation-form";

import MenuButton, { IMenuButton } from "./button";

interface IMenu {}

export default function Menu({}: IMenu) {
  const [openEventCreationForm, setOpenEventCreationForm] =
    React.useState<boolean>(false);

  const onCreateEventButtonClick = () => {
    setOpenEventCreationForm(true);
  };
  const onAccountButtonClick = () => {};
  const onCalendarButtonClick = () => {};
  const onSettingsButtonClick = () => {
    signOut();
  };

  const buttonsIndexer: Array<IMenuButton> = [
    {
      icon: "PlusCircleIcon",
      onClick: onCreateEventButtonClick,
    },
    {
      icon: "UserCircleIcon",
      onClick: onAccountButtonClick,
    },
    {
      icon: "CalendarDaysIcon",
      onClick: onCalendarButtonClick,
    },
    {
      icon: "CogIcon",
      onClick: onSettingsButtonClick,
    },
  ];

  return (
    <div className="flex w-full justify-center gap-3 items-center mt-12 mb-4">
      {buttonsIndexer.map((buttonProps) => (
        <MenuButton key={`menu-button-${buttonProps.icon}`} {...buttonProps} />
      ))}
      <EventCreationForm
        open={openEventCreationForm}
        setOpen={setOpenEventCreationForm}
      />
    </div>
  );
}
