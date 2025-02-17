import PopupModal from "./components/shared/popModal/PopupModal";
import HomeBlogComponent from "./home/HomeBlogComponent";


export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <>
      <PopupModal />
      <HomeBlogComponent />
    </>
  );
}
