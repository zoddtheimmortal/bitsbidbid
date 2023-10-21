import { twMerge } from "tailwind-merge";
const PillButton = ({children,onClick,className,type}) => {
    return(
            <button onClick={onClick} className={twMerge(`
            rounded-full
            bg-royal-green
            border
            border-transparent
            m-1
            px-3
            py-3
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-neutral-800
            font-semibold
            hover:scale-105
            hover:text-black
            transition
        `,className)} type={type}>{children}
            </button>
    )
}
 
export default PillButton;