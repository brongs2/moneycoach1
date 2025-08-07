import './GotoButton.css';

import { HiOutlineArrowSmLeft, HiOutlineArrowSmUp,HiOutlineArrowSmRight,HiOutlineArrowSmDown } from "react-icons/hi";


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
    ) : variant === 'up' ? (
      <>
        <HiOutlineArrowSmUp /> {children}
      </>
    )
    :(
      <>
        <HiOutlineArrowSmLeft /> {children}
      </>
    )}
        </Button>
    );
}
    

