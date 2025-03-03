"use client";
import { useState, forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";

import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faListOl,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
type TextareaProps = React.ComponentProps<"textarea"> & {
  onChange?: (e: { target: { name?: string; value: string } }) => void;
};

const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const editor = useEditor({
      editorProps: {
        attributes: {
          class: cn(
            `min-h-[80px] w-full rounded-md bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
              props.disabled !== true && ` border border-input`
            }`,
            className
          ),
        },
        ...props,
      },
      extensions: [StarterKit, ListKeymap],
      content: props.value as string,
      onUpdate: ({ editor }) => {
        props.onChange?.({
          target: { name: props.name, value: editor.getHTML() },
        });
      },
      editable: props.disabled !== true,
    });

    return (
      <div ref={ref}>
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="bubble-menu flex flex-wrap flex-row z-10 bg-white divide-x divide-gray-100 rounded-lg shadow-sm overflow-hidden">
              <button
                className={`block px-4 py-2 hover:bg-gray-300 hover:text-black${
                  editor.isActive("bold")
                    ? " bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBold().run();
                }}
              >
                <FontAwesomeIcon icon={faBold} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleItalic().run();
                  return true;
                }}
                className={`block px-4 py-2 hover:bg-gray-300 hover:text-black${
                  editor.isActive("italic")
                    ? " bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={faItalic} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={`block px-4 py-2 hover:bg-gray-300 hover:text-black${
                  editor.isActive("bulletList")
                    ? " bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={faListUl} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={`block px-4 py-2 hover:bg-gray-300 hover:text-black${
                  editor.isActive("orderedList")
                    ? " bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={faListOl} />
              </button>
            </div>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
