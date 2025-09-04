function UserCard({ user, onClick }) {
  return (
    <div
      onClick={() => onClick?.(user?.id)}
      className="cursor-pointer bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-6 w-80"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-1">{user?.name}</h2>
      <p className="text-sm text-gray-500 mb-4">@{user?.username}</p>

      <div className="space-y-1 text-gray-700 text-sm">
        <p>
          <span className="font-medium">📧 Email:</span> {user?.email}
        </p>
        <p>
          <span className="font-medium">📞 Phone:</span> {user?.phone}
        </p>
        <p>
          <span className="font-medium">🌐 Website:</span> {user?.website}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-1">🏠 Address</h3>
        <p className="text-gray-600 text-sm">
          {user?.address?.street}, {user?.address?.suite}
        </p>
        <p className="text-gray-600 text-sm">
          {user?.address?.city} - {user?.address?.zipcode}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-1">🏢 Company</h3>
        <p className="text-gray-700 text-sm">{user?.company?.name}</p>
        <p className="italic text-gray-500 text-xs">
          "{user?.company?.catchPhrase}"
        </p>
      </div>
    </div>
  );
}

export default UserCard;
