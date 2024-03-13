import React from "react";

import EventCreationForm from "../event-creation-form";
import Settings from "../settings";

import MenuButton, { IMenuButton } from "./button";

interface IMenu {}

export default function Menu({}: IMenu) {
  const [openEventCreationForm, setOpenEventCreationForm] =
    React.useState<boolean>(false);
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);

  const onCalendarButtonClick = () => {
    const googleCalendarUrl = "https://calendar.google.com/calendar";
    window.open(googleCalendarUrl, "_blank")?.focus();
  };

  const buttonsIndexer: Array<IMenuButton> = [
    {
      icon: "PlusCircleIcon",
      onClick: () => setOpenEventCreationForm(true),
    },
    {
      icon: "CalendarDaysIcon",
      onClick: onCalendarButtonClick,
    },
    {
      icon: "CogIcon",
      onClick: () => setOpenSettings(true),
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
      <Settings open={openSettings} setOpen={setOpenSettings} />
    </div>
  );
}
