import React from "react";
import { FormErrorType } from "./type";

const FormError: React.FC<FormErrorType> = ({ errorMessage }) => (
  <span className="text-medium text-red-500">{errorMessage}</span>
);

export default FormError;
