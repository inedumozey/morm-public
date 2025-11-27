"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/ContextAPI";
import MarkdonPreview from "../context/MarkdonPreview";

export default function page() {
  const { doc, removeDelineation } = useAppContext();
  const [content, set_content] = useState("");
  const [content_title, set_content_title] = useState("");
  const params = useParams();
  let { title } = params;
  title = removeDelineation(title, "-", " ");

  useEffect(() => {
    const data = doc?.find((doc: any) => doc?.title == title);
    set_content(data?.content);
    set_content_title(data?.title);
  }, [title]);

  return (
    <div className="p-6 bg-card">
      <div className="title">
        {content_title ? content_title : "Page Title"}
      </div>

      <MarkdonPreview content={content} />
    </div>
  );
}
