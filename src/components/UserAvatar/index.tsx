import { useAppSelector } from "../../app/hooks"

const UserAvatar: React.FC = () => {
  const userData = useAppSelector((state) => state?.user?.data)
  return (
    <div className="rounded-full h-9 overflow-hidden flex justify-center items-center">
      {userData?.picture && (
        <img src={userData?.picture} alt="user-avatar" className="h-full" />
      )}
    </div>
  )
}

export default UserAvatar
