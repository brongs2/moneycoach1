import '../pages/Page.css';
import './ResultButton.css';



export default function ResultButton({purchasePrice, currentPrice, hasloan, loanPrice, interestRate, repayment}){
    function LittleComponents({title, value}){
        return(
            <div className='little-components'>
            <div style = {{color:"#333333", fontFamily:"Pretendard", fontWeight:"400", fontSize:"16px"}}>{title}</div>
            <div style = {{color:"#000000", fontFamily:"Pretendard", fontWeight:"400", fontSize:"22px"}}>{value}</div>
            </div>
        );
    }
    return(
        <div className='result-button'>
            <div className='inline-field'>
                <LittleComponents
                    title = '구매가'
                    value = {purchasePrice}
                />
                <LittleComponents
                    title = '현재가'
                    value = {currentPrice}
                />
                <LittleComponents
                    title = '대출여부'
                    value = {hasloan?  '유':'무'}
                />
            </div>
            <br />
            <div className='inline-field'>
                <LittleComponents
                    title = '대출금'
                    value = {loanPrice}
                />
                <LittleComponents
                    title = '이자율'
                    value = {interestRate}
                />
                <LittleComponents
                    title = '월 상환액'
                    value = {repayment}
                />
            </div>
        </div>
    );
}