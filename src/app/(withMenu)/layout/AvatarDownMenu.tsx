"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { FaUserCog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdHelp } from "react-icons/io";
import { signIn, signOut, useSession } from "next-auth/react";

interface RadixMenuItem {
  label: string;
  shortcut?: string;
  icon?: ReactNode;
  link: string;
}

export default function AvatarDropDownMenu() {
  const { status } = useSession();
  const generalMenuItems: RadixMenuItem[] = [
    {
      label: "Ajuda",
      icon: <IoMdHelp className=" text-sky-500 mr-2 h-3.5 w-3.5" />,
      link: "#", //"/settings"
    },
    {
      label: "Configurações",
      icon: <IoSettingsSharp className=" text-sky-500 mr-2 h-3.5 w-3.5" />,
      link: "#", //"/settings"
    },
  ];

  function isLogged() {
    if (status === "authenticated") return true;
    else return false;
  }

  function loginOrLogout() {
    isLogged() ? signOut() : signIn();
  }

  return (
    <>
      <div className="relative inline-block text-left ml-3">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              type="button"
              className="bg-gray-100 text-white active:bg-gray-100 hover:bg-gray-100 py-1 px-1 border font-bold uppercase shadow-md hover:shadow-lg outline-none focus:shadow-lg focus:bg-gray-100 mr-1 mb-1 ease-linear transition-all duration-150 rounded-full"
            >
              <Image src="/images/user.png" alt={""} width={25} height={25} />
            </button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={5}
              className={clsx(
                "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
                "bg-zinc-900 ml-4 border border-zinc-600"
              )}
            >
              {/* Outros Menus */}

              {generalMenuItems.map(({ label, icon, shortcut, link }, i) => (
                <Link key={`${label}-${i}`} href={link} className="font-medium">
                  <DropdownMenuPrimitive.Item
                    className={clsx(
                      "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                      "text-gray-500 hover:bg-zinc-700 cursor-pointer"
                    )}
                  >
                    {icon}
                    <span className="flex-grow text-gray-300">{label}</span>
                    {shortcut && <span className="text-xs">{shortcut}</span>}
                  </DropdownMenuPrimitive.Item>
                </Link>
              ))}

              {/* Menus Somente Logado*/}
              {isLogged() && (
                <Link href="" className="font-medium">
                  <DropdownMenuPrimitive.Item
                    className={clsx(
                      "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                      "text-gray-500 cursor-pointer hover:bg-zinc-700"
                    )}
                  >
                    <FaUserCog className=" text-sky-500 mr-2 h-3.5 w-3.5" />

                    <span className="flex-grow text-gray-300">Perfil</span>
                  </DropdownMenuPrimitive.Item>
                </Link>
              )}

              <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-700" />

              {/* Menu Login/Logout*/}
              <DropdownMenuPrimitive.Item
                onClick={() => {
                  loginOrLogout();
                }}
                className={clsx(
                  "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                  "text-gray-500 cursor-pointer hover:bg-zinc-700"
                )}
              >
                {isLogged() ? (
                  <BsArrowDownCircleFill className="text-red-500 mr-2 h-3.5 w-3.5" />
                ) : (
                  <BsArrowUpCircleFill className="text-green-500 mr-2 h-3.5 w-3.5" />
                )}

                <span className="flex-grow text-gray-300">
                  {isLogged() ? "Sair" : "Entrar"}
                </span>
              </DropdownMenuPrimitive.Item>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
    </>
  );
}
