// types.d.ts
import "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}
