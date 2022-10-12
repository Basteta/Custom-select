import React from "react";

import { ListGroup, ListGroupItem } from "react-bootstrap";

export interface Option {
  id: string;
  name: string;
}

interface ListProps {
  list: Option[];
  onSelectedValue: (selectedValue: string) => void;
  query: string;
}

const List: React.FC<ListProps> = (props) => {
  let FullList = props.list;

  if (props.query !== "") {
    FullList = props.list.filter((item) =>
      item.name.toLowerCase().includes(props.query)
    );
  }

  return (
    <ListGroup variant="flush">
      {FullList.map((item) => (
        <ListGroupItem
          key={item.id}
          action
          onClick={(event) => {
            props.onSelectedValue(item.name);
            event.currentTarget.className =
              "list-group-item list-group-item-action active disabled";
          }}
        >
          {item.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default List;
