import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
import { User } from "@/generated/client";
import subjectTypeFromGraphql from "./subjectTypeFromGraphql";

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "User" | User | "all";

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(user: User, role: string) {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility);

  if (role === "super_admin") {
    can("manage", "all");
  } else if (role === "admin") {
    can("manage", "all", {
      "role.type": { $in: ["ADMIN", "AGENT", "CALL_CENTER", "MEMBER"] },
    });
  } else if (role === "agent") {
    can(["read", "create"], "User");
    can(["update"], "User", { id: user.id });
  } else if (role === "call_center") {
  } else if (role === "member") {
    can(["read"], "User");
    can(["update"], "User", { id: user.id });
  }

  return rules;
}

export function buildAbilityFor(user: User, role: string): AppAbility {
  return new AppAbility(defineRulesFor(user, role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: subjectTypeFromGraphql,
  });
}
