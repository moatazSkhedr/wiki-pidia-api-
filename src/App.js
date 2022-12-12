import { useState , useEffect } from "react";
import axios from 'axios'
export default function App() {
  const [term , setTerm ] = useState("javascript");
  const [result , setResult] = useState([]);
  const [debounceSearch , setDebounceSearch] = useState(term)
  useEffect(()=>{
    const timeOut = setTimeout(()=>setDebounceSearch(term), 1000)
    return()=>{
      clearTimeout(timeOut);
    }
   
  } , [term])
  useEffect(()=>{
        const search = async ()=>{
      const respond = await axios.get("https://en.wikipedia.org/w/api.php",{
        params:{
          action:"query",
          list:"search",
          origin:"*",
          format:'json',
          srsearch:debounceSearch,
        },
      
      });
      setResult(respond.data.query.search)
      // console.log(respond.data.query.search)
    };
    search()
  }, [debounceSearch])
  // useEffect(() => {
  //   const search = async ()=>{
  //     const respond = await axios.get("https://en.wikipedia.org/w/api.php",{
  //       params:{
  //         action:"query",
  //         list:"search",
  //         origin:"*",
  //         format:'json',
  //         srsearch:term
  //       },
      
  //     });
  //     setResult(respond.data.query.search)
  //     // console.log(respond.data.query.search)

  //   }
  //   if(!result.length){
  //     if(term){
  //       search();
  //     }
  // }else{
  //     const debounceSearch = setTimeout(()=>{
  //       if(term){
  //         search();
  //       }
  //     }, 1000);
  //     return ()=>{
  //         clearTimeout(debounceSearch);
  //     }
  
  //   }

  // } , [term]);
  const fetchResult = result.map((element)=>{
    return <tr  key={element.pageid}>
      <td scope="row">1</td>
      <td>{element.title}</td>
      <td><span dangerouslySetInnerHTML={{"__html":element.snippet}} /></td>
    </tr>
  })
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e)=> setTerm(e.target.value)} value={term}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
         {fetchResult}
            </thead>
            <tbody>



            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
