import { gqlRequest } from "@/utils/gql-request";
import type { GetUserOutput } from "shared";

const ME = `
  query Me {
    me {
      id
      email
      createdAt
      updatedAt
    }
  }
`;


export const fetchMe = async () => gqlRequest<GetUserOutput>(ME)