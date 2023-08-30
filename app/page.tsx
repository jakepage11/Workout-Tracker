import main_logo from "../public/main_logo.png"
import styles from "./login.module.css"
export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className="text-white text-[40px] font-semibold">Log-in to Momentum</h1>
      <img src={main_logo.src} className="w-[50px]"/>
      <div className={styles.input}>
        <p>Email or username</p>
        <input />
      </div>
      <div className={styles.input}>
        <p>Password</p>
        <input type="password"/>
      </div>
      
      <button className="bg-[var(--pink)] text-white w-[200px] rounded-full h-[40px] mt-10">Log in</button>
      <p>Forgot your password?</p>
      <p>New user?<u>Sign up here</u></p>
    </div>
  )
}