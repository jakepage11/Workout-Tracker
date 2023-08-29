import NavBar from "../navbar/Navbar"
// import { AuthContextProvider } from "@/stores/authContext";

export default function Layout(props: any) {
  return (
      <div className={"relative"}>
        <div className="sticky top-0 z-10">
          <NavBar/>
        </div>
        <main>{props.children}</main>
      </div>
  )
}