import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((preValue) => ({ ...preValue, [name]: value }));
  };

  const resetForm = () => setFormData(initialValues);

  return { formData, setFormData, handleChange, resetForm };
};
