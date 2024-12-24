"use client";
import withAuth from "../hoc/withAuth";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <h1>Admin Layout</h1>
      <div>{children}</div>
    </div>
  );
};

export default withAuth(AdminLayout);
