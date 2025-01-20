
export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing content.",
};

export default function AdminLayout({ children }) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <main>{children}</main>
    </div>
  );
}
