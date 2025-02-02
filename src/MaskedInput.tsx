import React, { useState } from "react";

type MaskType = "cpf" | "cnpj" | "cep" | "telefone" | "custom";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: MaskType;
  customMask?: (value: string) => string;
}

const applyMask = (value: string, mask: MaskType, customMask?: (value: string) => string): string => {
  if (!value) return "";

  const onlyNumbers = value.replace(/\D/g, "");

  switch (mask) {
    case "cpf":
      return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    case "cnpj":
      return onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    case "cep":
      return onlyNumbers.replace(/(\d{5})(\d{3})/, "$1-$2");
    case "telefone":
      return onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    case "custom":
      return customMask ? customMask(value) : value;
    default:
      return value;
  }
};

const MaskedInput: React.FC<MaskedInputProps> = ({ mask, customMask, ...props }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyMask(e.target.value, mask, customMask);
    setValue(maskedValue);
  };

  return <input {...props} value={value} onChange={handleChange} />;
};

export default MaskedInput;
