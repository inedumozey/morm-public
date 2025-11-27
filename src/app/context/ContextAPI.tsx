"use client";

import { FiMenu, FiX } from "react-icons/fi";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppContext = createContext<any>({});

export default function ContextAPI({
  doc_data,
  children,
}: {
  doc_data: any;
  children: ReactNode;
}) {
  const [doc, set_doc] = useState(doc_data?.data);
  const [error, set_error] = useState(doc_data?.error);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = { doc };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents mismatch between SSR and client
    return null;
  }

  return error ? (
    <ErrorMsg msg={error} />
  ) : (
    <div>
      <AppContext.Provider value={data}>
        <Layout
          doc={doc}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        >
          {children}
        </Layout>
      </AppContext.Provider>
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="animate-bounce bg-red-faded text-red rounded-md px-[10px] text-xl">
        {msg || "Unknown error occurred"}
      </div>
      <div className="text-center my-[10px]">
        <div className="text-xl"> Reload the browser</div>
      </div>
    </div>
  );
}

function Layout({
  doc,
  setSidebarOpen,
  sidebarOpen,
  children,
}: {
  doc: any;
  setSidebarOpen: any;
  sidebarOpen: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static left-0 top-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Morm Doc</h1>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href={`/`}
            className={`uppercase text-pri ${
              pathname == "/" ? "opacity-[1]" : "opacity-[.4]"
            } text-sm font-bold`}
          >
            Home
          </Link>
          {doc?.map((doc: any, i: number) => {
            return (
              <Link
                key={i}
                href={`/${doc.title}` || "#"}
                className={`uppercase text-pri ${
                  pathname == `/${doc.title}` ? "opacity-[1]" : "opacity-[.4]"
                } text-sm font-bold`}
              >
                {doc.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top bar */}
        <div className="p-4 bg-white shadow flex items-center md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl p-1"
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h2 className="ml-4 text-lg font-bold">Morm Doc</h2>
        </div>

        {/* Content */}
        <main className="p-4 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
