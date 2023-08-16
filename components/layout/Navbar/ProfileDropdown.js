import AuthContext from "@/stores/authContext"
import { useContext } from "react"

export default function ProfileDropDown() {
  const items = ["Profile Settings", 'Invites']
  const {logout} = useContext(AuthContext) 

  return (
    <div className="bg-white shadow-md absolute right-0 top-[110%] w-48 flex flex-col gap-2 py-5 rounded-md">
      {items.map((item) => {
        return <p key={item} className="hover:font-bold cursor-pointer ml-3 text-lg">{item}</p>
      })}
      <hr className="mx-2"></hr>
      <p className="cursor-pointer hover:underline font-semibold text-[#FE645D] ml-3 text-xl" onClick={logout}>Logout</p>
    </div>
  )
}