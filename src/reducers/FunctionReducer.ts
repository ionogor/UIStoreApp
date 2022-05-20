import react from "react";
import { useReducer } from "react";

enum ActionButtonKind {
  EDIT = "EDIT",
  DELETE = "DELETE",
  ADD = "ADD",
}

interface ActionButton {
  type: ActionButtonKind;
}
