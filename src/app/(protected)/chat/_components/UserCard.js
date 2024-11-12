import { cn } from "@/lib/utils";
import Image from "next/image";
import styles from "./UserCard.module.css";

export default function UserCard({ user, active }) {
  const { img, name, latestMsg } = user;

  return (
    <div
      className={cn("flex items-stretch gap-x-4 px-2", {
        [styles.active]: active === true,
      })}
    >
      <div className="w-[16%]">
        <Image src={img} alt={name} className="w-full rounded-full" />
      </div>

      <div className="flex-grow space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-medium text-primary-black">{name}</h4>
          <p className="font-semibold text-secondary-2">12m</p>
        </div>
        <p className="text-ellipsis">{latestMsg}</p>
      </div>
    </div>
  );
}
