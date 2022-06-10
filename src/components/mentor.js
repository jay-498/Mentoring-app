
const Mentor = ({pic,name,bio}) =>
    <div className="flex items-center pt-1">
        <div className="max-w-sm rounded overflow-hidden shadow-xl">
            <div className="flex flex-wrap justify-center pt-2">
            <img className="object-cover overflow-hidden rounded-full max-w-full h-48"  src={pic} alt="Mentor_Pic" loading="lazy"/> 
            </div>
            <div className="px-6 pt-6 pb-32 text-left">
                <h1 className="text-3xl text-slate-500 p-2 pt-0">{name}</h1>
                <a href=" " className="text-xl p-2 pt-0 pb-0">Demo Call</a>
                <div className="flex flex-wrap justify-left">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-4sm text-slate-500 pt-2">30 min</h1>
                </div>         
                <p className="text-gray-700 text-left p-2 pt-0 pb-4">{bio}</p>
            </div>
        </div>
    </div>;

export default Mentor;