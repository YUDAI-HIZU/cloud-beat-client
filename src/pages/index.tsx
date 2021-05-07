// import Link from "next/link";
import { Login, Logout, auth } from "../lib/firebase";
import { newReleaseTracks } from "../repository/track"

import Tracks from "../components/organisms/contents/Tracks"

const Index = () => {
  const { data } = newReleaseTracks()
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <Tracks></Tracks>
      <div>
        <button onClick={() => Login()}>ログイン</button>
        <button onClick={() => Logout()}>ログアウト</button>
      </div>
      <div>
        <pre>
          {auth.currentUser
            ? auth.currentUser.displayName + "でログインしています"
            : "ログインしていません"}
        </pre>
      </div>
    </>
  )
}
export default Index;