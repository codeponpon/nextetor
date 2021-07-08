import { detectSubjectType } from "@casl/ability";

export default (subject: any) => {
  if (subject && typeof subject === "object" && subject.__typename) {
    return subject.__typename;
  }

  return detectSubjectType(subject);
};
