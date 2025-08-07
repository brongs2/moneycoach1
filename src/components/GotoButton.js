import './GotoButton.css';

import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { HiOutlineArrowSmDown } from "react-icons/hi";

export default function GotoButton({ onClick, children, variant }) {
    const variantClass = `goto-button ${variant}`;

    function Button({children, className, onClick, value}){
        return(
        <button 
            className={className} 
            onClick={onClick} 
            value={value}
        >
            {children} 
        </button >
        );
    }

    
    return(
        <Button
            className = {variantClass}
            onClick={onClick}
        >
         {variant === 'right' ? (
      <>
        {children} <HiOutlineArrowSmRight />
      </>
    ) : variant === 'down' ? (
      <>
        {children} <HiOutlineArrowSmDown />
      </>
    ) : (
      <>
        <HiOutlineArrowSmLeft /> {children}
      </>
    )}
        </Button>
    );
}
    

