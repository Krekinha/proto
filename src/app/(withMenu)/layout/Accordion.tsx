import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import React from "react";

interface AccordionProps {
  header?: string;
  children?: React.ReactNode;
}

const Accordion = ({ header, children }: AccordionProps) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={clsx("space-y-4 w-full")}
    >
      
        <AccordionPrimitive.Item
          value="item-1"
          className="rounded-lg focus:outline-none w-full"
        >
          <AccordionPrimitive.Header className="w-full">
            <AccordionPrimitive.Trigger
              className={clsx(
                "group",
                "radix-state-open:rounded-t-lg radix-state-closed:rounded-lg",
                "focus:outline-none",
                "inline-flex w-full items-center justify-between px-3 py-2 text-left border border-gray-400"
              )}
            >
              <span className="text-sm font-medium text-gray-900">
                {header}
              </span>
              <ChevronDownIcon
                className={clsx(
                  "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-500",
                  "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                )}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="w-full rounded-b-lg border border-gray-400">
            <div className="text-sm text-gray-700 dark:text-gray-400">
              {children}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};

export { Accordion };
