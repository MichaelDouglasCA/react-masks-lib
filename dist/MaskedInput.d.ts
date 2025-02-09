import React from "react";
type MaskType = "cpf" | "cnpj" | "cep" | "telefone" | "custom";
interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: MaskType;
    customMask?: (value: string) => string;
}
declare const MaskedInput: React.FC<MaskedInputProps>;
export default MaskedInput;
