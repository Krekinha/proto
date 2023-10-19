"use client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function HelpReader() {
  function extractContent(s: any) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  const input = `<div className="bg-red-500">Some *emphasis* and <strong>strong</strong>!</div>`;

  return (
    <>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{input}</ReactMarkdown>
    </>
  );
}
