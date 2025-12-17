import ProfileElementA from "../components/ProfileElementA";
import ProfileElementC from "../components/ProfileElementC";
import '../components/ProfileElement.css';

export default function MyFavItems() {
  return (
    <>
      <div className="my-profile">
        <div className="profile-a">
          <ProfileElementA />
        </div>

        <div className="flex flex-col gap-5 w-full">
            <h1 className="text-5xl ml-6 mt-5">My Favourite Items</h1>

          <div className="profile-c">
            <ProfileElementC />
          </div>
        </div>
      </div>
    </>
  )
}