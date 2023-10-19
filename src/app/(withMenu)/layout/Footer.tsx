"use client";
import { IconContext } from "react-icons";
import { IoIosMail } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="relative bottom-0 p-3 bg-gray-900 w-full border-t border-slate-600">
      <div className="flex justify-center">
        <h1 className="text-gray-500 text-sm justify-center align-middle">
          © 2023 Copyright: Dionison Ataide. Todos os direitos reservados
        </h1>
        <a href="mailto:krekmg@gmail.com">
          <IconContext.Provider
            value={{
              color: "white",
              className: "w-5 h-5 ml-3",
            }}
          >
            <IoIosMail />
          </IconContext.Provider>
        </a>
      </div>
    </footer>
  );
}
