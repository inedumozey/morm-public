import "./globals.css";
import type { Metadata } from "next";
import ProgressProvider from "./ProgressProvider";
import { Toaster } from "sonner";
import { api } from "@/services/api";
import ContextAPI from "./context/ContextAPI";

export const metadata: Metadata = {
  title: `Morm`,
  description: `Morm is an ORM for SQL (Postgressql)`,
  keywords: [
    "Morm",
    "ORM",
    "Object Relational Mapper",
    "SQL",
    "Database",
    "Postgres",
    "Postgressql",
    "Relational Database",
    "Prisma",
    "Sequelize",
    "TypeORM",
    "Mongoose",
    "MongoDB",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL || ""),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
  openGraph: {
    title: `Morm | EMR & Hospital Management System`,
    description:
      "Modern EMR and HMS built by a medical doctor and software developer to simplify patient care, records, and hospital workflows.",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    siteName: "Morm",
    locale: "en_NG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const doc_data = { error: "", data: [] };
  try {
    const { data } = await api.get("/");

    doc_data.data = data.data;
  } catch (err: any) {
    if (err.response) {
      doc_data.error = err.response.data.message;
    } else {
      doc_data.error = err.message;
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Morm",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    applicationCategory: "Object Relational Mapper",
    operatingSystem: "Web",
    description: `"Morm is an ORM FOR SQL (Postgressql for now).`,
    author: {
      "@type": "Person",
      name: "Dr. Moses Inedu",
    },
    publisher: {
      "@type": "Organization",
      name: "Morm",
      url: process.env.NEXT_PUBLIC_FRONTEND_URL,
      // logo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}}/images/logo.png`,
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans">
        <Toaster closeButton duration={8000} richColors />
        <ProgressProvider />
        <ContextAPI doc_data={doc_data}>{children}</ContextAPI>
      </body>
    </html>
  );
}
