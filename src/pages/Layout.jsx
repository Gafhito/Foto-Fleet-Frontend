import { Outlet } from "react-router-dom"
import { Header } from "../components/common/header/Header"
import { Footer } from "../components/common/footer/Footer"


export const Layout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}