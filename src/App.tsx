import { BrowserRouter, Routes, Route } from "react-router";
import Play from "./pages/play";

export const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
