
export default function ProfileDropDown() {
  const items = ["Profile Settings", 'Shared Workouts']

  return (
    <div className="bg-white shadow-md fixed right-0 w-64 mt-5 py-5 flex flex-col gap-2">
      {items.map((item) => {
        return <p className="hover:font-bold cursor-pointer ml-3 text-lg">{item}</p>
      })}
      <br></br>
      <p className="cursor-pointer hover:underline font-semibold text-[#FE645D] ml-3 text-xl">Logout</p>
    </div>
  )
}