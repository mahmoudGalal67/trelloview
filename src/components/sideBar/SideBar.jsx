import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import Cookies from "js-cookie";

import group from "../../../public/group.svg";
import table from "../../../public/table.svg";
import date from "../../../public/date.svg";
import removedUsers from "../../../public/removedUsers.svg";
import addMember from "../../../public/addUSer.svg";

import "./SideBar.css";
import { Link, NavLink, useParams } from "react-router-dom";
import api from "../../apiAuth/auth";
import Spinner from "react-bootstrap/esm/Spinner";
import { AuthContext } from "../context/Auth";
import { IoIosArrowForward } from "react-icons/io";
import AddUserModal from "../addUserModal/AddUserModal";
import { BsPeople } from "react-icons/bs";

const allusers = [
  {
    id: 1,
    name: "mohamed mahmoud galal",
    email: "mohamed_sala712@yahoo.com",
    super_admin: 1,
  },

  {
    id: 7,
    name: "mohamed mahmoud galal",
    email: "mohamed_sala712345679@yahoo.com",
    super_admin: 0,
  },

  {
    id: 10,
    name: "mohamed mahmoud galal",
    email: "mohamed_sala71234@yahoo.com",
    super_admin: 0,
  },
];

function SideBar({ show, setShow, workSpaces }) {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [workSpace, setworkSpace] = useState({
    workspace_id: 1,
    workspace_name: "programmer2",
    name: "programmer2",
    boards_of_the_workspace: [
      {
        board_id: 1,
        board_name: "mohamed back",
        name: "mohamed back",
      },
      {
        board_id: 2,
        board_name: "mahmoud front",
        name: "mahmoud front",
      },
    ],
  });
  const [showUsers, setShowUsers] = useState(false); // State to control user list visibility
  const [users, setUsers] = useState(allusers);

  const { workspaceId, boardId } = useParams();

  const path = location.pathname;
  const pathName = path.split("/")[1];

  const cookies = Cookies.get("token");

  useEffect(() => {
    if (window.innerWidth <= 400) {
      setShow(false);
    }
  }, []);

  useEffect(() => {
    if (workspaceId) {
      const getWorkSpace = async () => {
        try {
          // const { data } = await api({
          //   url: `workspaces/get-workspace/${workspaceId}`,
          //   // Authorization: `Bearer ${cookies?.token}`,
          //   headers: { Authorization: `Bearer ${cookies}` },
          // });
          // setworkSpace(data.result);
          // if (workspaceId && !boardId) {
          //   setUsers(data.result.users);
          // }
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      };
      getWorkSpace();
    }

    if (boardId) {
      const getBoarrdUsers = async () => {
        try {
          // const { data } = await api({
          //   url: `boards/get-board/${boardId}`,
          //   // Authorization: `Bearer ${cookies?.token}`,
          //   headers: { Authorization: `Bearer ${cookies}` },
          // });
          // setUsers(data.data.users);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      };
      getBoarrdUsers();
    } else {
      setLoading(false);
    }
  }, [boardId]);

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center position-fixed top-0 left-0">
        <Spinner animation="border" role="status" variant="primary" size="md">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <button
        className="sideNav-link"
        onClick={() => setShow((prev) => !prev)}
        style={{
          transform: show
            ? "translateX(260px) rotate(180deg)"
            : "translateX(2px)",
        }}
      >
        <IoIosArrowForward style={{ color: "#b6c2cf" }} />
      </button>

      <div className="Offcanvas" style={{ width: show ? "280px" : "15px" }}>
        {
          <div
            className="Offcanvas-header"
            style={{ opacity: show ? "1" : "0" }}
            closeButton
          >
            {workSpace ? (
              <div
                className="Offcanvas-title"
                style={{ opacity: show ? "1" : "0" }}
              >
                <span
                  style={{
                    backgroundColor: workSpace.color
                      ? workSpace.color
                      : "#e774bb",

                    width: "24px",
                    height: "24px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#1d2125",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {workSpace.name.charAt(0).toUpperCase()}
                </span>
                {workSpace.name}
              </div>
            ) : (
              <div className="Offcanvas-title"> Workspaces</div>
            )}
          </div>
        }

        <div className="Offcanvas-body" style={{ opacity: show ? "1" : "0" }}>
          {pathName === "" &&
            workSpaces.map((ws) => (
              <NavLink
                to={`/workspace/${ws.id}`}
                key={ws.id}
                className="board-item"
              >
                <span
                  style={{
                    backgroundColor: ws?.color ? ws?.color : "#e774bb",

                    width: "24px",
                    height: "24px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#1d2125",
                    fontWeight: "bold",
                  }}
                >
                  {ws.name.charAt(0).toUpperCase()}
                </span>
                {ws.name}
              </NavLink>
            ))}
          {workspaceId && (
            <a
              href="#"
              className="board-item"
              onClick={(e) => {
                e.preventDefault();
                setShowUsers((prev) => !prev);
              }}
            >
              <BsPeople />
              <span>{boardId ? "Board" : "Workspace"} Members</span>
            </a>
          )}
          {showUsers && (
            <div className="users-list">
              {users?.length > 0 ? (
                users.map((user) => (
                  <div key={user.user_id} className="board-item">
                    <span>
                      {user.user_name} ({user.email})
                    </span>
                  </div>
                ))
              ) : (
                <p>No members found.</p>
              )}
            </div>
          )}

          {pathName === "board" && user?.role === "admin" && (
            <Link to="/allMembers" className="board-item">
              <img src={table} alt="" />
              <span>invite</span>
            </Link>
          )}

          {workspaceId && boardId && (
            <Link to={`/archeivedCards/${boardId}`} className="board-item">
              <img src={removedUsers} alt="" />
              <span>Archive</span>
            </Link>
          )}
          {workSpace && <h2>Your Boards</h2>}
          {workSpace &&
            workSpace.boards_of_the_workspace.map((board) => (
              <Link
                key={board.id}
                to={`/board/${workSpace.id}/${board.id}`}
                className="board-item"
              >
                <img
                  src={
                    board.photo
                      ? `https://back.alyoumsa.com/public/storage/${board.photo}`
                      : "/photo-1675981004510-4ec798f42006.jpg"
                  }
                  alt=""
                />
                <span>{board.name} </span>
              </Link>
            ))}

          {/* admin can only add user */}

          {user?.role === "admin" && <AddUserModal />}
        </div>
      </div>
    </>
  );
}

export default SideBar;
