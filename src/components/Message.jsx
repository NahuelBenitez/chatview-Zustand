import useStore from "../store"



export const Message = ({  message, isFromMe = false }) => {
    const username = useStore((state) => state.username);
    const setUsername = useStore((state) => state.setUsername);
  return (
    <div className="flex items-start space-x-2 p-2">
  <div className="bg-gray-100 rounded-lg p-2">
    <span className="text-blue-700 font-semibold">{username}</span>
    <p className="text-gray-800">{message}</p>
  </div>
</div>

  )
}