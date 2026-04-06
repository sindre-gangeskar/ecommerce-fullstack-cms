import { createAndThrowHttpError } from "@/helpers/utils";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
export function parseSequelizeError(error: unknown, context: "create" | "read" | "update" | "delete"): never {
  console.error(error);
  if (error instanceof ForeignKeyConstraintError) {
    let message: string = "";
    switch (context) {
      case "create":
        message = `Failed to create a record because it relies on a(n) ${error.table} record that could not be found`;
        break;
      case "delete":
        message = `Could not delete ${error.table} record because other records are relying on this record`;
        break;
      case "update":
        message = `Could not update record because it relies on a(n) ${error.table} record that could not be found`;
        break;
      default:
        break;
    }
    createAndThrowHttpError({ message: message, state: "fail", status: context !== "delete" ? 404 : 409, name: context !== "delete" ? "RecordNotFoundError" : "RecordConflictError" });
  }
  if (error instanceof UniqueConstraintError) {
    let message = "";
    switch (context) {
      case "create": {
        const fields = error.errors.map(e => e.path).join(', ');
        message = `Could not create record because another record with the same ${fields} already exists`
        break;
      }
      default:
        break;
    }
    createAndThrowHttpError({ message: message, state: "fail", status: 409, name: "DuplicateEntryError" });
  }
  createAndThrowHttpError({ message: undefined, state: "error", status: 500 })
}