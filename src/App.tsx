import { BrowserRouter, Routes, Route } from "react-router";
import Play from "./pages/play";
import { StackedLayout } from "./components/stacked-layout";
import { AppNavbar } from "./components/app/navbar";
import { AppSidebar } from "./components/app/sidebar";

export const App = () => {

  return (
    <>
      <BrowserRouter>
        <StackedLayout navbar={<AppNavbar />} sidebar={<AppSidebar />}>
          <Routes>
            <Route path="/" element={<Play />} />
          </Routes>
        </StackedLayout>
      </BrowserRouter>
    </>
  )
}

export default App
