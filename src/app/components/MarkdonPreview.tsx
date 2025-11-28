"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import React from "react";
import "highlight.js/styles/github.css";
import MarkdownCodeBlock from "./MarkdownCodeBlock";

export default function MarkdonPreview({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          code: MarkdownCodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
