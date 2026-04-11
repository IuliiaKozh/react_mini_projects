import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //этотт код выполняется после каждого рендера
    console.log("компонент отрисован!");
    console.log("текущее значение count: ", count);
  });

  return (
    <div>
      <p>Счетчик: {count} </p>
      <button onClick={()=>setCount(count+1)}></button>
    </div>
  )
}
export default MyComponent;