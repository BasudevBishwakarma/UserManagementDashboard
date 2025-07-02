import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";

interface FilterInputProps {
  onSearch: (value: string) => void;
  delay?: number;
  placeholder?: string;
}

const Search: React.FC<FilterInputProps> = ({
  onSearch,
  delay = 1000,
  placeholder = "Search...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value === "") {
      onSearch("");
    } else {
      debounceTimeout.current = setTimeout(() => {
        onSearch(value);
      }, delay);
    }
  };

  return (
    <div style={{ width: 200 }}>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        allowClear
      />
    </div>
  );
};

export default Search;
