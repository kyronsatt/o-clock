import { signOut } from "next-auth/react";
import MenuButton, { IMenuButton } from "./button";

interface IMenu {}

export default function Menu({}: IMenu) {
  const onCreateEventButtonClick = () => {};
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
    </div>
  );
}
