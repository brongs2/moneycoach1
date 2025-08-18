import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import {useState} from 'react';
import './CategoryButton.css';
// npm install react-datepicker --save

export default function DatePickerComponent({title, size = 'large'}) {
  const [startDate, setStartDate] = useState(null);

const inputClass = `category-trigger category ${size}`;
const wrapperClass = `dp-scope ${size}`;


  return (
    <div style = {{position: "relative"}}>
        {title && <h2>{title}</h2>}
    <DatePicker
      className={inputClass}
      wrapperClassName={wrapperClass}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy/MM/dd"
      placeholderText="날짜를 선택하세요"
    />
    </div>
  );
}
