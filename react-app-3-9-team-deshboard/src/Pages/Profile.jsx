import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      <img
        src={user?.avatar}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold text-center mb-2">{user?.name}</h2>
      <p className="text-center text-gray-600">{user?.email}</p>
      <p className="text-center text-gray-600">{user?.phone}</p>
      <p className="text-center text-gray-600">{user?.website}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Address:</h3>
        <p>{`${user?.address.suite}, ${user?.address.street}, ${user?.address.city}, ${user?.address.zipcode}`}</p>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">Company:</h3>
        <p>{user?.company.name}</p>
        <p className="italic">{user?.company.catchPhrase}</p>
      </div>
    </div>
  );
}

export default Profile;
