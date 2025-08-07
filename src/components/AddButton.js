import './AddButton.css';

export default function AddButton({children, onClick}){
    return(
        <button 
            className='AddButton'
            onClick = {onClick}
        >
            {children}
        </button>
    );
}