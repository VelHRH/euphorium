import { gqlRequest } from "@/utils/gql-request";
import type { LogoutOutput } from "shared";

const LOGOUT = `
  mutation Logout {
    logout {
      success
    }
  }
` 

export const logoutMutation = async () => gqlRequest<LogoutOutput>(LOGOUT)