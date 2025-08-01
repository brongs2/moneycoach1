import CategoryButton from "../components/CategoryButton";
export default function Setup_Basic(){

  const cat =  { name: "음악", items: ["K-POP", "락", "재즈"]};
  const cat2 =  { name: "음악", items: ["K-POP", "락", "재즈"]};
  const cat3 =  { name: "음악", items: ["K-POP", "락", "재즈"]};
  

  return(
    <>
    <h1> 머니코치에 오신 것을 환영합니다. </h1>
    <CategoryButton 
    items = {cat.items}
    key={cat.name} 
    title={cat.name}
    />
    <CategoryButton 
    items = {cat2.items}
    key={cat2.name} 
    title={cat2.name}
    />
    <CategoryButton 
    items = {cat3.items}
    key={cat3.name} 
    title={cat3.name}
    />
    
    </>
  );

}