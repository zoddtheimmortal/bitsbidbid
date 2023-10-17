const PillButton = ({children,onClick}) => {
    return(
            <button onClick={onClick} className="
             bg-lime-300
             hover:bg-lime-700
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