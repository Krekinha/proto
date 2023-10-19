"use client";
import { useHelpContext } from "@/context/HelpContext";
import { useRef, useState } from "react";
import { Tree } from "react-arborist";
import { menuContent } from "./menuContent";
import { Node } from "./nodeContent";


export default function IframeContent() {
  const { url, setUrl, openTab } = useHelpContext();
  const iframeRef = useRef(null);

  console.log(url);

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <div className="relative my-3 h-full ml-4 shadow-lg lg:block w-80">
        <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
          <nav>
            <div className="ml-4 pt-3">
              <Tree initialData={menuContent} rowHeight={25} disableDrag>
                {Node}
              </Tree>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
