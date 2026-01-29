import Play from "./pages/play";
import { StackedLayout } from "./components/stacked-layout";
import { AppNavbar } from "./components/app/navbar";
import { AppSidebar } from "./components/app/sidebar";
import Tutorial from "./pages/tutorial";
import { useState } from "react";

export const App = () => {
  const [page, setPage] = useState<"play" | "tutorial">("play");

  return (
    <>
      <StackedLayout navbar={<AppNavbar setPage={setPage} />} sidebar={<AppSidebar />}>
        {page === "play" && <Play />}
        {page === "tutorial" && <Tutorial />}
      </StackedLayout>
    </>
  )
}

export default App
