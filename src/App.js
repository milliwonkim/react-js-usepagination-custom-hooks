import React, {useState, useEffect} from "react";
import { Container} from "react-bootstrap";
import { usePagination } from "./usePagination";
import Paginator from "./Paginator";
import axios from 'axios';

import './App.css';

function App() {

  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setList(res.data))
  }, [])

  // const handleConsole = () => {
  //   console.log('list: ', list)
  //   console.log('title: ', list[2].title)
  //   console.log('content: ', content);
  // }

  const [maxItemsPerPage, setMaxItemsPerPage] = useState(1)
  const limit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [isInitialized, setIsInitialized] = useState(false);

  const {
    isPaginating,
    currentPage,
    setCurrentPage,
    pageItems,
    setItemList,
    totalPages
  } = usePagination([], maxItemsPerPage);

  // const numbers = [];

  if (!isInitialized) {
    // for (let i = 0; i < 100; i++)
    // {
    //   numbers.push(i);
    // }

    // setItemList(numbers);
    setItemList(list)

    setIsInitialized(true);
  }

  let content = pageItems.map( (val, index) => {
    console.log('val: ', val)
    console.log('index: ', index)
    console.log('----------------------');
    return (
      <div key={index} style={{ 'border': '2px solid black', 'padding': '4px', 'margin': '10px' }}>
        <div style={{ 'border': '1px solid gray' }}>
          <h1>{val.title}</h1>
        </div>
        <div style={{ 'border': '1px solid gray' }}>
          <h5>{val.id}</h5>
        </div>
        <div style={{ 'border': '1px solid gray' }}>
          <h4>{val.body}</h4>
        </div>
      </div>
    );
  });
  

  return (
    <Container>
      {/* <button className="btn" onClick={handleConsole}>Console</button> */}
      <div className="App" style={{ 'margin': '10px' }}>
        {content}
      </div>
      <select
        onChange={(e) => setMaxItemsPerPage(e.target.value)}
      >
        {
          limit.map((item, index) => (
            <option 
              value={item} 
              key={index}
            >
              {item}
            </option>
          ))
        }
      </select>
      <p>maxItemsPerPage: {maxItemsPerPage}</p>
      {isPaginating &&
      <Paginator totalPages={totalPages}
                currentPage={currentPage}
                changePageHandler={setCurrentPage}/>
      }
    </Container>
  );
}

export default App;
