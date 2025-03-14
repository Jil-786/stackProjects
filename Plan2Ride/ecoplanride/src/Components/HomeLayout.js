import { Outlet } from 'react-router-dom';

const HomeLayout = ({ onConfirm }) => {
  return (
    <div>
      {/* <h2>Home</h2> */}
      <Outlet /> {/* This renders nested routes dynamically */}
    </div>
  );
};

export default HomeLayout;
