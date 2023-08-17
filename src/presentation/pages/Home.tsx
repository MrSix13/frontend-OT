import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const Home: React.FC = () => {
  const regions = useAppSelector((state) => state.utils);
  console.log("redux", regions);
  return (
    <div className="">
      <div className="flex justify-between w-1/2">
        <Link to="third">Listado de Personas</Link>
        <Link to="second">Pestaña 2</Link>
        <Link to="pes2">Pestaña 3</Link>
        <Link to="pes3">Pestaña 4</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
