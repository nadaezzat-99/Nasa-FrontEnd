import { Menu, Input, Button } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setSearchTerm, fetchSearchResults } from "../features/searchSlice";
import { logout as logoutAction } from "../features/authSlice";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [searchWord, setSearchWord] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchWord(searchTerm);
    dispatch(setSearchTerm(searchTerm));
  };

  const handleSearchSubmit = () => {
    if (searchWord.length < 3) {
      toast.error("Enter 3 letters Minimum", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch(fetchSearchResults(searchWord));
  };

  const loggingOut = () => {
    dispatch(logoutAction());
    navigate("/")
  }
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      className="justify-content-end"
    >
      <Menu.Item key="1" className="m-1">
        Home
      </Menu.Item>
      <Menu.Item key="2" className="m-1">
        <Input
          placeholder="Search"
          value={searchWord}
          onChange={handleSearchChange}
          onPressEnter={handleSearchSubmit}
        />
      </Menu.Item>
      <Menu.Item key="3" className="m-1">
        <Button type="primary" onClick={handleSearchSubmit}>
          Search
        </Button>
      </Menu.Item>
      <Menu.Item
        key="4"
        className="m-1"
        onClick={loggingOut}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};
export default Navbar;
