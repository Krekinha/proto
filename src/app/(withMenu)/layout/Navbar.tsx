"use client";
import Link from "next/link";
import Image from "next/image";
import NavDropDownMenu from "./NavDropDownMenu";
import { useSession } from "next-auth/react";
import { User } from "@/utils/types";
import AvatarDropDownMenu from "./AvatarDownMenu";

/*const useSeverSession = async () => {
  const session: any = await getServerSession(authOptions);
  return session;
};*/

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user as User;
  //console.log(session);
  //const srvSession = useSeverSession();
  //console.log("Server-session: ", srvSession);
  //console.log(data, status);
  return (
    <div className="border-b border-slate-600">
      <nav className="relative w-full flex flex-wrap py-2 bg-gray-900 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div className="grid grid-cols-2 w-full items-center px-3">
          <div className="flex">
            <div>
              <Link href={"/"} className="font-medium">
                <Image
                  src="/images/makit.svg"
                  width={89}
                  height={40}
                  alt="makit"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="justify-self-end">
            <div className="flex gap-2 items-center">
              <span className="text-sky-600 text-[0.75rem] font-bold">{user?.name}</span>
              <AvatarDropDownMenu/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
