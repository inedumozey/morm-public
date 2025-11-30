"use client";
const removeDelineation = (text: string, remove: string, add: string) => {
  return text && text.split(remove).join(add);
};

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
import { useTheme } from "next-themes";
import Images from "../components/Image";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { api } from "@/services/api";

const AppContext = createContext<any>({});

export default function ContextAPI({ children }: { children: ReactNode }) {
  const [doc, set_doc] = useState([]);
  const [error, set_error] = useState("");
  const [fetching, set_fetching] = useState(true);

  async function fetchDocs() {
    try {
      const { data } = await api.get("/");
      set_doc(data.data);
    } catch (err: any) {
      if (err.response) {
        set_error(err.response.data.message);
      } else {
        set_error(err.message);
      }
    } finally {
      set_fetching(false);
    }
  }

  const data = { doc, removeDelineation };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    fetchDocs();
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents mismatch between SSR and client
    return null;
  }

  return fetching ? (
    <div className="w-screen h-screen flex justify-center items-center">
      Preparing...
    </div>
  ) : error ? (
    <ErrorMsg msg={error} />
  ) : (
    <div>
      <AppContext.Provider value={data}>
        <Layout doc={doc}>{children}</Layout>
      </AppContext.Provider>
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="animate-bounce text-center bg-red-faded text-red rounded-md px-[10px] text-xl">
        {msg || "Unknown error occurred"}
      </div>
      <div className="text-center my-[10px]">
        <div className="text-xl"> Reload the browser</div>
      </div>
    </div>
  );
}

function Layout({ doc, children }: { doc: any; children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const doScroll = () => {
    if (!scrollRef.current) return;

    if (window.innerWidth < 768) {
      scrollRef.current.scrollTo({
        left: scrolled ? 0 : 250,
        behavior: "smooth",
      });
    }
  };

  // Trigger scroll on route change (only on smaller screen)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setScrolled(true);
      doScroll();
    }
  }, [pathname]);

  // Trigger when resizing below md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScrolled(true);
        doScroll();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle button
  const toggleScroll = () => {
    setScrolled((prev) => !prev);
    setTimeout(doScroll, 50);
  };

  return (
    <div>
      <div className="bg-pri flex w-full justify-between fixed top-0 left-0 right-0 h-[35px] items-center px-2 gap-2 z-[150]">
        <div className="flex gap-2 items-center">
          <div>
            <Images src="images/rillbill.png" />
          </div>
          <div className="text-white text-lg">
            <span className="font-extrabold ">Morm</span>
            <span> / Docs</span>
          </div>
        </div>
        <div className="">
          {" "}
          <ThemeToggleButton />
        </div>
      </div>

      {/* Main */}
      <div
        ref={scrollRef}
        className={`pt-[35px] h-[100vh] overflow-y-hidden overflow-x-auto`}
      >
        <div className="w-full h-[100%] relative translate-x-[250px] md:translate-x-0">
          {/* sidebar */}
          <div
            className={`z-40 w-[250px] bg-bg transition h-full md:translate-x-0 translate-x-[-250px] overflow-hidden absolute top-0 bottom-0`}
          >
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                href={`/`}
                className={`uppercase text-pri hover:opacity-[.5] ${
                  pathname == "/" ? "opacity-[1]" : "opacity-[.6]"
                } text-sm font-bold cursor-pointer`}
              >
                Home
              </Link>
              {doc?.map((doc: any, i: number) => {
                return (
                  <Link
                    key={i}
                    href={`/${removeDelineation(doc.title, " ", "-")}` || "#"}
                    onClick={() => doScroll()}
                    className={`cursor-pointer uppercase text-pri hover:opacity-[.5] ${
                      removeDelineation(pathname, "-", " ") == `/${doc.title}`
                        ? "opacity-[1]"
                        : "opacity-[.6]"
                    } text-sm font-bold`}
                  >
                    {doc.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Area: Constrained by TopFrame and SideFrame */}
          <div
            className={`relative bg-card transition md:pl-[250px] p-0 h-[100%] w-[100%] overflow-y-auto`}
          >
            <div
              onClick={toggleScroll}
              className="absolute md:hidden block top-[-3px] md:left-[248px] left-0 z-10 cursor-pointer"
            >
              <FiMenu size={24} className="text-pri font-extrabold" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div
      title="Theme"
      onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}
      className={`rounded-full cursor-pointer`}
    >
      {resolvedTheme == "dark" ? (
        <MdOutlineWbSunny size={20} />
      ) : (
        <FaMoon size={20} />
      )}
    </div>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
