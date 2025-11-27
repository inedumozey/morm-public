"use client";

import React from "react";
import { useAppContext } from "./context/layout";
import "highlight.js/styles/github.css";
import MarkdonPreview from "./context/MarkdonPreview";

export default function page() {
  const { doc } = useAppContext();

  return (
    <div className="min-h-screen min-screen bg-card md:p-6 p-2">
      <h1 className="title text-center">
        🚀 Meet MORM — The Lightweight PostgreSQL ORM Built for Control
      </h1>
      <p>
        {" "}
        Morm isn't just another ORM, it's a tool designed for developers who
        want simplicity without losing power. Instead of forcing you into rigid
        conventions or a heavy framework
      </p>
      <p>
        <ul>
          <div className="font-bold">Morm gives you:</div>
          <li className="list-inside list-disc pl-4">Direct SQL control</li>
          <li className="list-inside list-disc pl-4">
            TypeScript-first workflow
          </li>
          <li className="list-inside list-disc pl-4">Auto-managed schemas</li>
          <li className="list-inside list-disc pl-4">
            Highly controlled relations
          </li>
          <li className="list-inside list-disc pl-4">
            Simple and human-readable queries
          </li>
        </ul>
      </p>
      <p>No hidden magic</p>
      <p>No unnecessary complexity</p>
      <p>Just clear, intentional database control</p>
    </div>
  );
}
