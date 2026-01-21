import ProfileElementA from "../../components/MyProfile/ProfileElementA";
import '../../components/MyProfile/ProfileElement.css';
import ProfileOrder from "../../components/MyProfile/ProfileOrder";

export default function MyOrder() {
  return (
    <>
      <div className="my-profile flex flex-col md:flex-row gap-0 p-4 md:p-0 max-w-400 mx-auto">
        <div className="profile-a w-full md:w-auto shrink-0">
          <ProfileElementA />
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0 overflow-hidden">
            <h1 className="text-3xl md:text-5xl font-bold px-2 md:px-6 mt-5 md:mt-8">My Order</h1>

          <div className="profile-c w-full">
            <ProfileOrder />
          </div>
        </div>
      </div>
    </>
  )
}