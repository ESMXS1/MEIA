import { useEffect, useState } from "react"

export default function OpenAIApi() {
  const [list, setList] = useState([])
  const [count, setCount] = useState(0);
 
    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setCount(count + 1);
        }, 1000);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);

  useEffect(() => {
    console.log("useEffect");
    fetch("https://raw.githubusercontent.com/Kotlin/KMP-App-Template/main/list.json")
      .then((res) => {
        console.log("response", res);
        res.json().then((json) => {
          console.log("json", json);
          setList(json);
        })
      });
  }, []);
  return (
    list.map((item) => (
      <figure>
        <img src={item.primaryImageSmall} />
        <figcaption>{item.title}</figcaption>
      </figure>
    ))
  )
}