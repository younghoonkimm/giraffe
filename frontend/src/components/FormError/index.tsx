import React from "react";
import { FormErrorType } from "./type";

export const FormError: React.FC<FormErrorType> = ({ errorMessage }) => (
  <span className="text-medium text-red-500">{errorMessage}</span>
);
