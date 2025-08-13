import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
// import type { ThemeConfig } from "tailwindcss/types/config";


const tailwind = resolveConfig(tailwindConfig)

export default tailwind;
