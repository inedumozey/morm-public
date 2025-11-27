"use client";

import React from "react";

export default function page() {
  return (
    <div className="min-h-screen pt-[50px] min-screen bg-card md:px-20 p-2">
      <h1 className="title text-center">🚀 MORM Documentation</h1>
      <div className="text-center text-text2 mt-[20px] mb-[30px]">
        Morm isn't just another ORM, it's a tool designed for developers who
        want simplicity without losing power. Instead of forcing you into rigid
        conventions or a heavy framework
      </div>

      <div className="text-center text-[#ccc] flex flex-wrap justify-center">
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
        <li className="list-inside list-disc pl-4">No hidden magic</li>
        <li className="list-inside list-disc pl-4">
          No unnecessary complexity
        </li>
      </div>
    </div>
  );
}
