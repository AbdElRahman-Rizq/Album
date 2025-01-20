import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("album-token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
    </div>
  );
}
