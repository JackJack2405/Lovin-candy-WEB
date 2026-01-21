import './ProfileElement.css';

export default function ProfileElementC ({ data }) {
  return (
    <>
    <div className='element-c flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-20 p-6 md:px-16'>
      <div className='tableitemsc flex flex-col gap-1'>
        <span className='text-gray-400 text-sm md:text-lg font-medium'> Name - Surname</span>
        <span className='text-gray-700 font-semibold'>{data?.first_name} {data?.last_name || "-"}</span>
      </div>
      <div className='tableitemsc flex flex-col gap-1'>
        <span className='text-gray-400 text-sm md:text-lg font-medium'>Email</span>
        <span className='text-gray-700 font-semibold truncate max-w-62.5 md:max-w-none'>{data?.email || "No email"}</span>
      </div>
      <div className='tableitemsc flex flex-col gap-1'>
        <span className='text-gray-400 text-sm md:text-lg font-medium'>Phone Number</span>
        <span className='text-gray-700 font-semibold'>{data?.phone || data?.phoneNumber || "No phone number"}</span>
      </div>
    </div>
    </>
  )
}