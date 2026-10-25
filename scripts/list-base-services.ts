// QA — enumerasi base service page untuk perancangan langkah 34
import { BASE_SERVICES } from "../src/lib/catalog/generators";

const bases = [...BASE_SERVICES.keys()];
console.log("TOTAL_BASE:", bases.length);
console.log(bases.join("\n"));
console.log("===SIUP?===");
console.log(bases.filter((s) => s.includes("siup") || s.includes("siup-")));
