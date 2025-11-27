"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/layout";
import MarkdonPreview from "../context/MarkdonPreview";

export default function page() {
  const { doc } = useAppContext();
  const [content, set_content] = useState("");
  const params = useParams();
  const { title } = params;

  useEffect(() => {
    const data = doc?.find((doc: any) => doc.title == title);
    set_content(data.content);
  }, [title]);

  return (
    <div className="p-6 bg-card">
      <div className="title">{doc.length ? doc[0]?.title : "Page Title"}</div>

      <MarkdonPreview content={content} />
    </div>
  );
}
