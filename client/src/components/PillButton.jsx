const PillButton = ({children,onClick}) => {
    return(
            <button onClick={onClick} className="
             bg-royal-green
             hover:bg-lime-600
             text-black
             my-2
             p-2
             px-4
             rounded-full
            ">{children}
            </button>
    )
}
 
export default PillButton;