import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import AuctionService from "../api/auction.service";

const SECOND=1_000;
const MINUTE=SECOND*60;
const HOUR=MINUTE*60;
const DAY=HOUR*24;


const Timer = ({ deadline = new Date().toString(), className,id,trigger}) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [init,setInit]=useState(false);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    const makeInactive=useCallback(()=>{
        AuctionService.KillAuctionListing(id);
        AuctionService.getWinnerOfAuction(id);
    })

    useEffect(() => {
        const interval = setInterval(
            () =>{
                if(parsedDeadline-Date.now()>0){
                    setTime(parsedDeadline - Date.now());
                }
                else{
                    if(!init){
                        setInit(true);
                        makeInactive();
                        clearInterval(interval);
                    }
                }
            }
            ,
            1000,
        );

        return () => clearInterval(interval);
    }, [parsedDeadline,makeInactive]);

    return (
        <div 
        className={twMerge(
            `timer
             grid 
             grid-cols-4 
             bg-white rounded-full 
             p-2 
             justify-items-center`
        ,className)}
        >   
            {
            Object.entries({
                days: time / DAY,
                hours: (time / HOUR) % 24,
                minutes: (time / MINUTE) % 60,
                seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="text-black">
                    <div>
                        <div>
                            <span>
                                {`${Math.floor(value)}`.padStart(2, "0")}
                            </span>
                            <span>{label[0]}</span>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default Timer;