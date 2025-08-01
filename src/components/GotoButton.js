import './GotoButton.css';

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
            children = {children}
        >
        {children}
        </Button>
    );
}
    

