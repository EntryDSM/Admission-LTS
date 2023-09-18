import { useCallback, useState } from 'react';

export const useTextArea = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);
  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, maxLength } = e.currentTarget;
    if (value.length >= maxLength) {
      return { ...form, [name]: value.slice(0, maxLength) };
    }
    return setForm({ ...form, [name]: value });
  }, []);
  return { form, onChange, setForm };
};