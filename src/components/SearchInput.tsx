import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";

import { Form, InputGroup, Button } from "react-bootstrap";

interface InputSearchProps {
  onChangeSearchQuery: (searchQuery: string) => void;
}

const SearchInput: React.FC<InputSearchProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { onChangeSearchQuery } = props;
  const debouncedSearchQuery = useDebounce(searchQuery, 250);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChangeSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, onChangeSearchQuery]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const resetHandler = (): void => {
    setSearchQuery("");
    // @ts-expect-error
    inputRef.current.value = "";
  };

  return (
    <InputGroup style={{ width: "250px" }}>
      <Form.Control
        placeholder="Search"
        onChange={changeHandler}
        className="mb-4"
        ref={inputRef}
      />
      {searchQuery !== "" && (
        <Button
          variant="outline-secondary"
          onClick={resetHandler}
          className="mb-4"
        >
          <i className="bi bi-x"></i>
        </Button>
      )}
    </InputGroup>
  );
};

export default SearchInput;
