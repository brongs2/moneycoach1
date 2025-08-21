// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'; 
// import {useState} from 'react';
// import './CategoryButton.css';
// // npm install react-datepicker --save

// export default function DatePickerComponent({title, size = 'large', handleBirthChange}) {

// const inputClass = `category-trigger category ${size}`;
// const wrapperClass = `dp-scope ${size}`;
// const [startDate, setStartDate] = useState(null);


//   return (
//     <div style = {{position: "relative"}}>
//         {title && <h2>{title}</h2>}
//     <DatePicker
//       className={inputClass}
//       wrapperClassName={wrapperClass}
//       selected={startDate}
//       onChange={(date) => {
//         setStartDate(date)
//         console.log(date)
//         handleBirthChange(startDate)
//       }}
    

//       dateFormat="yyyy/MM/dd"
//       placeholderText="날짜를 선택하세요"
//     />
//     </div>
//   );
// }

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './CategoryButton.css';

// Controlled DatePicker wrapper:
//  - value: Date | null
//  - onChange: (date: Date | null) => void
export default function DatePickerComponent({ title, size = 'large', value, onChange}) {
  const inputClass = `category-trigger category ${size}`;
  const wrapperClass = `dp-scope ${size}`;

  return (
    <div style={{ position: "relative" }}>
      {title && <h2>{title}</h2>}
      <DatePicker
        className={inputClass}
        wrapperClassName={wrapperClass}
        selected={value}
        onChange={v => {
          console.log(v)
          onChange(v)
          console.log(value)
        }}
        dateFormat="yyyy/MM/dd"
        placeholderText="날짜를 선택하세요"
        
      />
    </div>
  );
}
