import * as outlineIcons from "@heroicons/react/24/outline";

export interface IHeroIcon {
  icon: keyof typeof outlineIcons;
  className?: string;
}

export default function HeroIcon({ icon, className }: IHeroIcon) {
  const HeroIconComponent = outlineIcons[icon];
  return <HeroIconComponent className={className} />;
}
