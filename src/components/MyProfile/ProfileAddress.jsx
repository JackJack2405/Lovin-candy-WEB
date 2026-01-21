import "./ProfileElement.css";

export default function ProfileAddress ({ data }) {

  const address = data?.address;

  return (
    <div className='element-b'>
      <div className="w-full mb-6">
        <div className="flex flex-col text-xl">
          Name - Surname
          <p className="mt-1 text-[#FF74B1]">
            {address?.fullName || `${data?.first_name} ${data?.last_name}` || "-"}
          </p>
        </div>
        <div className="flex flex-col mt-3 text-xl">
          Phone Number
          <p className="mt-1 text-[#FF74B1]">
            {address?.phone || data?.phone || "-"}
          </p>
        </div>
        <div className="flex flex-col mt-3 text-xl">
          Address
          <p className="mt-1 text-[#FF74B1]">
            {address?.streetAddress || "-"}
          </p>
        </div>

        <div className="flex gap-86">
          <div className="flex flex-col mt-3 text-xl">
            Province
            <p className="mt-1 text-[#FF74B1]">
              {address?.province || "-"}
            </p>
          </div>
          <div className="flex flex-col mt-3 text-xl">
            District
            <p className="mt-1 text-[#FF74B1] ">
              {address?.district || "-"}
            </p>
          </div>
        </div>

        <div className="flex gap-80">
          <div className="flex flex-col mt-3 text-xl">
            Sub-District
            <p className="mt-1 text-[#FF74B1] ">
              {address?.subDistrict || "-"}
            </p>
          </div>
          <div className="flex flex-col mt-3 text-xl">
            Postal Code
            <p className="mt-1 text-[#FF74B1] ">
              {address?.postalCode || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}