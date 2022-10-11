import React, { useState } from "react";
import SearchInput from "./SearchInput";
import List, { Option } from "./List";
import { useWindowSize } from "../hooks/useWindowSize";
import classes from "./DualList.module.scss";
import { Button, Card } from "react-bootstrap";

const DualList: React.FC<{ data: Option[] }> = (props) => {
  const leftList = props.data;
  const rightList: Option[] = [];

  const [leftQuery, setLeftQuery] = useState<string>("");
  const [rightQuery, setRightQuery] = useState<string>("");
  const [leftListValues, setLeftListValues] = useState<Option[]>(leftList);
  const [rightListValues, setRightListValues] = useState<Option[]>(rightList);
  const [selectedLeftValues, setSelectedLeftValues] = useState<Option[]>([]);
  const [selectedRightValues, setSelectedRightValues] = useState<Option[]>([]);

  const size = useWindowSize();

  const leftListElementSelectHandler = (selectedValue: string): void => {
    const selectedValueList = props.data.filter((el) =>
      el.name.toLowerCase().includes(selectedValue.toLowerCase())
    );
    setSelectedLeftValues([...selectedValueList, ...selectedLeftValues]);
  };

  const rightListElementSelectHandler = (selectedValue: string): void => {
    const selectedValueList = props.data.filter((el) =>
      el.name.toLowerCase().includes(selectedValue.toLowerCase())
    );
    setSelectedRightValues([...selectedValueList, ...selectedRightValues]);
  };

  // on mobile this represents Move all Down
  const moveAllToRightHandler = (): void => {
    setLeftListValues([]);
    setRightListValues([...rightListValues, ...leftListValues]);
  };

  // on mobile this represents Move all Up
  const moveAllToLeftHandler = (): void => {
    setRightListValues([]);
    setLeftListValues([...leftListValues, ...rightListValues]);
  };

  // on mobile this represents Move selected Up
  const moveLeftHandler = (): void => {
    if (selectedRightValues !== null) {
      let rightOptionsList = rightListValues;
      selectedRightValues.map((item) => {
        rightOptionsList = rightOptionsList.filter((x) => x.id !== item.id);
        return rightOptionsList;
      });
      setRightListValues(rightOptionsList);
      setLeftListValues([...leftListValues, ...selectedRightValues]);
      setSelectedRightValues([]);
    }
  };

  // on mobile this represents Move selected Down
  const moveRightHandler = (): void => {
    if (selectedLeftValues !== null) {
      let leftOptionsList = leftListValues;
      selectedLeftValues.map((item) => {
        leftOptionsList = leftOptionsList.filter((el) => el.id !== item.id);
        return leftOptionsList;
      });
      setLeftListValues(leftOptionsList);
      setRightListValues([...rightListValues, ...selectedLeftValues]);
      setSelectedLeftValues([]);
    }
  };

  return (
    <div className={classes.Main}>
      <div>
        <SearchInput
          onChangeSearchQuery={(query) => {
            setLeftQuery(query);
          }}
        />
        <Card style={{ width: "250px", minHeight: "415px" }}>
          <List
            list={leftListValues}
            query={leftQuery}
            onSelectedValue={leftListElementSelectHandler}
          ></List>
        </Card>
      </div>
      <div className={classes.Buttons}>
        <Button
          variant="outline-dark"
          onClick={moveLeftHandler}
          className="m-2 mx-md-0"
        >
          {size.width >= 600 && <i className="bi bi-chevron-left"></i>}
          {size.width < 600 && <i className="bi bi-chevron-up"></i>}
        </Button>
        <Button
          variant="outline-dark"
          onClick={moveRightHandler}
          className="m-2 mx-md-0"
        >
          {size.width >= 600 && <i className="bi bi-chevron-right"></i>}
          {size.width < 600 && <i className="bi bi-chevron-down"></i>}
        </Button>
        <Button
          variant="outline-info"
          onClick={moveAllToLeftHandler}
          className="m-2 mx-md-0"
        >
          {size.width >= 600 && <i className="bi bi-chevron-double-left"></i>}
          {size.width < 600 && <i className="bi bi-chevron-double-up"></i>}
        </Button>
        <Button
          variant="outline-info"
          onClick={moveAllToRightHandler}
          className="m-2 mx-md-0"
        >
          {size.width >= 600 && <i className="bi bi-chevron-double-right"></i>}
          {size.width < 600 && <i className="bi bi-chevron-double-down"></i>}
        </Button>
      </div>
      <div>
        <SearchInput
          onChangeSearchQuery={(query) => {
            setRightQuery(query);
          }}
        />
        <Card style={{ width: "250px", minHeight: "415px" }}>
          <List
            query={rightQuery}
            list={rightListValues}
            onSelectedValue={rightListElementSelectHandler}
          ></List>
        </Card>
      </div>
    </div>
  );
};

export default DualList;
