import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
const applyMask = (value, mask, customMask) => {
    if (!value)
        return "";
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
const MaskedInput = ({ mask, customMask, ...props }) => {
    const [value, setValue] = useState("");
    const handleChange = (e) => {
        const maskedValue = applyMask(e.target.value, mask, customMask);
        setValue(maskedValue);
    };
    return _jsx("input", { ...props, value: value, onChange: handleChange });
};
export default MaskedInput;
