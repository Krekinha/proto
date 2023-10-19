import Link from "next/link";
import { GiBookCover, GiSecretBook } from "react-icons/gi";
import { GoDash } from "react-icons/go";

export function Node({ node, style, dragHandle }: any) {
  return (
    <div
      style={style}
      ref={dragHandle}
      onClick={() => node.isInternal && node.toggle()}
    >
      {node.isLeaf ? (
        <div className="flex">
          <GoDash className="mr-2 text-green-500" />
          <Link href={node.data.link}>
            <span className="flex-grow text-gray-300 text-sm bg-red-500">
              {node.data.name}
            </span>
          </Link>
        </div>
      ) : node.isOpen ? (
        <div className="flex">
          <GiBookCover className="mr-2 text-green-500" />
          <span className="flex-grow text-gray-300 text-sm">
            {node.data.name}
          </span>
        </div>
      ) : (
        <div className="flex">
          <GiSecretBook className="mr-2 text-green-500" />
          <span className="flex-grow text-gray-300 text-sm">
            {node.data.name}
          </span>
        </div>
      )}
    </div>
  );
}
