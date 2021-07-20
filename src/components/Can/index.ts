import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { AppAbility } from "@/services/appAbility";

export const AbilityContext = createContext<AppAbility>(undefined!);
const Can = () => createContextualCan(AbilityContext.Consumer);
export default Can;
