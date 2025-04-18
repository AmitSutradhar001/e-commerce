"use client";

import { useTheme } from "next-themes";

const Loading = () => {
  const { theme } = useTheme();

  return (
    <section className="flex flex-row justify-center items-center gap-5 h-[500px]">
      <div
        className={`relative w-[100px] h-[100px] rounded-full bg-gradient-to-b ${
          theme === "light"
            ? " from-cyan-300 via-white to-white "
            : " from-cyan-300 via-slate-950 to-slate-950"
        }  animate-spin`}
      >
        <div
          className={`absolute top-[10px] left-0 w-[80%] h-[80%] ${
            theme === "light" ? " bg-white" : " bg-slate-950"
          } rounded-full`}
        ></div>
        <div className="absolute top-[30%] right-0 w-[20%] h-[20%] bg-cyan-400 rounded-full shadow-[0_0_10px_rgb(56,214,245),_0_0_20px_rgb(56,214,245),_0_0_30px_rgb(56,214,245)]"></div>
      </div>
    </section>
  );
};

export default Loading;
