import { detectSubjectType } from "@casl/ability";

const SubjectTypeFromGraphQL = (subject: any) => {
  if (subject && typeof subject === "object" && subject.__typename) {
    return subject.__typename;
  }

  return detectSubjectType(subject);
};

export default SubjectTypeFromGraphQL;
