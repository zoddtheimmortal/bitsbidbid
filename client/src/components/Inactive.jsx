import { twMerge } from "tailwind-merge";

const Inactive = (styles) => {
    return (
        <div className={twMerge(`
            rounded-full
            bg-red-400
            text-black
            text-center
            font-semibold
            p-2
            `,styles)}>
            <span>Auction Inactive</span>
        </div>
    );
}
 
export default Inactive;