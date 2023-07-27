import IUser from "../src/models/users";

declare global {
  interface Error {
    status?: number;
  }

  namespace Express {
    interface Users extends IUser {}
  }
}
