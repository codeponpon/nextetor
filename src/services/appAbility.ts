import { User, Profile, Role } from "@prisma/client";
import { AbilityClass, AbilityBuilder } from "@casl/ability";
import { PrismaAbility, Subjects } from "@casl/prisma";
import AuthStorage from "@/utils/auth-storage";

const actions = ["manage", "create", "read", "update", "delete"] as const;
const subjects = ["User", "all"] as const;

type AppAbility = PrismaAbility<
  [
    typeof actions[number],
    (
      | typeof subjects[number]
      | Subjects<{ User: User; Profile: Profile; Role: Role }>
    )
  ]
>;

const AppAbility = PrismaAbility as AbilityClass<AppAbility>;

type DefinePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void;

type Roles = "super_admin" | "admin" | "agent" | "call_center" | "member";

const rolePermissions: Record<Roles, DefinePermissions> = {
  super_admin(user, { can }) {
    can("manage", "all");
  },
  admin(user, { can }) {
    can("manage", "all");
  },
  agent(user, { can }) {},
  call_center(user, { can }) {},
  member(user, { can }) {
    can("update", "User", { id: user.id });
  },
};

export function defineAbilityFor(user: User): AppAbility {
  const builder = new AbilityBuilder(AppAbility);
  const role: Roles = AuthStorage.role;

  if (typeof rolePermissions[role] === "function") {
    rolePermissions[role](user, builder);
  } else {
    throw new Error(`Trying to use unknown role "${role}"`);
  }

  return builder.build();
}
