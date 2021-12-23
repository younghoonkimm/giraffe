import { ButtonProps } from "./type";

export const Button: React.FC<ButtonProps> = ({ buttonType, canClick, loading, actionText }) => (
  <button
    type={buttonType}
    className={`text-lg font-medium focus:outline-none text-white py-4  transition-colors ${
      canClick ? "bg-lime-600 hover:bg-lime-700" : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
