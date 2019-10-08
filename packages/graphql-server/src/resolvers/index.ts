import { merge } from "lodash";
import mesureImportResolver from "./mesure-import.resolver";
import mesureStatResolver from "./mesure-stat.resolver";

const resolvers = merge(mesureStatResolver, mesureImportResolver);

export default resolvers;
