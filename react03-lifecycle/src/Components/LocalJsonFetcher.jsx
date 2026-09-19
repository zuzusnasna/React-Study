import {useState, useEffect} from 'react';

const GlobalTop = (props) => {
  console.log('1.컴포넌트실행');
  const [myList, setMyList] = useState([]); 

  useEffect(() => {    
    console.log('3.useEffect실행');
    fetch('./json/myData.json')
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);      
        setMyList(json);
      });
  }, []);

  let listTag = myList.map((data) => {
    return (
      <li key={data.id}>
        <a href={data.id} data-id={data.num} onClick={(e)=>{
          e.preventDefault(); // a태그의 기본 이벤트 제거, -> 이벤트 제거 : 클릭시 페이지 이동 방지
          props.myLinkClick(e.target.dataset.id);
        }}>{data.id}</a>
      </li>
    );
  });

  console.log('2.return실행(rendering)');  
  return (
    <nav>
      <ul>
        {listTag}
      </ul>
    </nav>
  );
}

const ContentBody = (props)=>{
  return (
    <div>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>num : {props.myResult.num}</li>
        <li>id : {props.myResult.id}</li>
        <li>cell : {props.myResult.cell}</li>
        <li>description : {props.myResult.description}</li>
      </ul>        
    </div>
  );
}

function LocalJsonFetcher() {  
  const [myResult, setMyResult] = useState({});  
  return (<>
    <h2>내부 서버 통신</h2>
    <GlobalTop myLinkClick={(num)=>{
      console.log('클릭', num); // 클릭한 a태그의 data-id값을 가져옴 dto'1', dto'2', dto'3'
      fetch('./json/dto'+num+'.json')
        .then((result)=>{
          return result.json();
        })
        .then((json)=>{
          setMyResult(json);
        });
    }}></GlobalTop>
    <ContentBody myResult={myResult}></ContentBody>
  </>);
}

export default LocalJsonFetcher;


