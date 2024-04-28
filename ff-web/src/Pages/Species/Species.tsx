import { Outlet } from "react-router-dom";

type Props = {};

const Species = (props: Props) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Species;
