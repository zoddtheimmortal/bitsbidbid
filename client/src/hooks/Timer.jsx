import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const SECOND=1_000;
const MINUTE=SECOND*60;
const HOUR=MINUTE*60;
const DAY=HOUR*24;

const Timer = ({ deadline = new Date().toString(), className}) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        return () => clearInterval(interval);
    }, [parsedDeadline]);

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
            {Object.entries({
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
            ))}
        </div>
    );
};

export default Timer;