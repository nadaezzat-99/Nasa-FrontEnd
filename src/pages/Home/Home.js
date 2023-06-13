import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemCart from "../../components/itemCart";
function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const data = useSelector((state) => state.search.searchResults)
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="d-flex flex-wrap">
      {data?.length ? (
        data.map((item) => <ItemCart item={item} />)
      ) : (
        <p>Explore new Thing</p>
      )}
    </div>
  );
}
export default Home;
