"use client";
import useRouteMap from "@/hooks/useRouteMap";
import { RouteMap } from "@/utils/types";
import { usePathname } from "next/navigation";

interface PropsAdress {
  items: RouteMap[];
}

export default function Adress({ items }: PropsAdress) {
  const pathname = usePathname();
  const mapRoutes = useRouteMap(pathname || "", items);

  return (
    <div className="flex ml-3 mt-1">
      {mapRoutes &&
        mapRoutes.map((route, i) => (
          <div key={i}>
            <span
              className={`flex-1 inline-block rounded-full ${route.bgColor} 
                        px-[0.65em] pt-[0.35em] pb-[0.30em] text-center align-middle text-[0.65em] 
                        font-semibold leading-none text-neutral-50 mr-1`}
            >
              {route.name}
            </span>

            {/*<span>{i != mapRoutes.length - 1 ? "-" : ""}</span>*/}
          </div>
        ))}
    </div>
  );
}
