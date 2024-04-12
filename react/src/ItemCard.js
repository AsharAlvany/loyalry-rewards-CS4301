import React, { useState, useEffect } from 'react';


const ClubCard = (props) => {
//   const [club, setClub] = useState(props);

  useEffect(()=>{

  })


  return (
    <div className="justify-self-center transition-all flex h-full min-h-[400px] min-w-[300px] max-w-xs flex-col self-center justify-between rounded-lg bg-white shadow-lg md:min-h-[600px] hover:scale-105">
      <div className="relative h-48 overflow-hidden rounded-t-lg sm:h-56 md:h-64 lg:h-72">
        <img
          src={"/home/ash/Projects/loyalty-program/react/public/logo512.png"}
          alt={"react"}
          className="absolute h-full w-full inset-0 select-none object-cover"
        />
        <div className="absolute left-2 right-2 top-2 flex h-fit flex-row items-center space-x-2">
          <button className="ml-auto rounded-full bg-black bg-opacity-50 p-1.5 font-bold text-white transition-colors">
            <img src="/HeartOutline.svg" alt="Heart icon" className="h-7 w-7" />
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-6">
        <h1 className="line-clamp-1 text-2xl font-medium text-slate-800 md:text-xl">iPhone 12 Pro</h1>
        <p className="text-sm text-slate-500 md:text-xs">Description</p>
        <p className="text-base text-slate-600 md:text-sm">Wonder of Technology</p>
      </div>
      <div className="m-5 mt-auto flex flex-row space-x-2">
        <button onClick={()=>{window.open("https://www.google.com", "_blank")}} className="bg-cornflower-500 text-xs font-extrabold text-white transition-colors hover:bg-royal mr-2 rounded-2xl px-4 py-2">
          Join
        </button>
        <button onClick={()=>{window.open(`https://www.apple.com`, "_blank")}} className="rounded-2xl bg-cornflower-50 px-4 py-2 text-xs font-extrabold text-blue-primary transition-colors hover:bg-cornflower-100">
        Learn More
        </button>
        {/* <Link
          href={`https://jupiter.utdnebula.com/directory/${club.id}`}
          className="rounded-2xl bg-cornflower-50 px-4 py-2 text-xs font-extrabold text-blue-primary transition-colors hover:bg-cornflower-100"
        >
        Learn More
        </Link> */}
      </div>
    </div>
  );
};

export default ClubCard;
