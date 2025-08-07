import AddButton from '../components/AddButton';
import './Page.css';

export default function SetupAssets(){
    function handleAssests(){
        
    }
    return (
        <div className='setup-page'>
            <h1>어떤 자산을 <br />가지고 계신가요?</h1>
            <AddButton
                className = 'add link'>
                onClick = {handleAssests}
            </AddButton>
        </div>
    );
}