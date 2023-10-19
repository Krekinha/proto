"use client";
import { menuContent } from "./menuContent";
import { Tree } from "react-arborist";
import { Node } from "./nodeContent";

export default function Sidebar() {
  return (
    <div className="relative my-3 h-full ml-4 shadow-lg lg:block w-80">
      <div className="h-full rounded-2xl bg-zinc-900">
        <nav>
          <div className="ml-4 pt-3">
            <Tree initialData={menuContent} rowHeight={25} disableDrag>
              {Node}
            </Tree>
          </div>
        </nav>
      </div>
    </div>
  );
}
