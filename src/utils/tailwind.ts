import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

// Load your Tailwind config into JS
const tailwind = resolveConfig(tailwindConfig);

export default tailwind;
