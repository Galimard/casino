import { Routes, Route } from "react-router";
import { Greeting } from "./pages/Greeting";
import { Login } from "./pages/Login";
import { Combination } from "./pages/Combination";
import { Layout } from "@widgets/layout/Layout";


function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/combination" element={<Combination />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App;
