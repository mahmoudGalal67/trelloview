import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

import Cookies from "js-cookie";
import api from "../../apiAuth/auth";
import { Dropdown } from "react-bootstrap";

function addList({ boardId, setboard, setShow }) {
  const listTitle = useRef(null);
  const [error, seterror] = useState(null);

  const cookies = Cookies.get("token");

  const addList = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await api({
      //   url: "/lists/create",
      //   method: "post",
      //   headers: { Authorization: `Bearer ${cookies}` },
      //   data: {
      //     title: listTitle.current.value,
      //     board_id: boardId,
      //   },
      // });
      setboard((prev) => ({
        ...prev,
        lists_of_the_board: [
          ...prev.lists_of_the_board,
          {
            id: Math.random(),
            title: listTitle.current.value,
            cards_of_the_list: [],
          },
        ],
      }));
      listTitle.current.value = "";
    } catch (err) {
      console.log(err);
      seterror(err.response?.data?.message);
      console.log("can not add list");
    }
  };
  return (
    <>
      <Dropdown
        className="addList "
        style={{
          backgroundColor: "#ffffff80",
          borderRadius: "12px",
        }}
        // autoClose="inside"
      >
        <Dropdown.Toggle className="addList " id="dropdown-basic">
          <img src="/plus.svg" alt="" />
          <button type="text">Add another list</button>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="addListForm addListCard"
          onClick={(e) => e.stopPropagation()}
          popperConfig={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 10], // Adjust dropdown positioning
                },
              },
            ],
          }}
        >
          <form onSubmit={addList}>
            <input
              type="text"
              ref={listTitle}
              placeholder="Enter list title…"
              required
              autoFocus
            />
            <div>
              <Button
                type="submit"
                variant="primary"
                onClick={() => seterror(null)}
              >
                Add list
              </Button>
            </div>
            {error && <div className="err">{error}</div>}
          </form>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default addList;
