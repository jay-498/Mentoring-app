const MentorCard = ({mentor}) => {
    return (
        <div onClick={() => window.location = `/profile/${mentor._id}`} className="relative flex flex-col">
            <img
                src={mentor.profile_picture}
                loading="lazy"
                alt="1"
                className="pb-0 mb-0 h-[300px] rounded-t-[15px] rounded-b-[15px]"
            />
            <div className="flex items-end absolute bg-[#00000057] h-full w-full rounded-[15px]">
                <div className="relative bottom-[0px] w-full lg:p-[20px] p-[15px]">
                    <div className="flex w-full justify-between items-center text-sm font-bold text-[#fff] font-Manrope">
                        <span className="">{mentor.name}</span>
                        <span className="">₹{mentor.session_rate}</span>
                    </div>
                    <div className="flex-col">
                        <p className="text-xs text-[#fff] font-poppins pt-[3px]">{mentor.companies.length && mentor.companies[0]?.company.name}</p>
                        <p className="text-xs text-[#fff] font-poppins pt-[5px]">{mentor.companies.length && mentor.companies[0]?.job_title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorCard