import React, { useEffect, useState } from 'react'; 
import type { Car } from '../types/Car'; 
import './CarList.css'; // 스타일 적용 
 
const CarList: React.FC = () => { 
  const [cars, setCars] = useState<Car[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
 
  useEffect(() => { 
    fetch('http://localhost:8080/api/cars') 
      .then((res) => { 
        if (!res.ok) { 
          throw new Error('서버 응답 오류'); 
        } 
        return res.json(); 
      }) 
      .then((data: Car[]) => { 
        setCars(data); 
        setLoading(false); 
      }) 
      .catch((err: Error) => { 
        setError(err.message); 
        setLoading(false); 
      }); 
  }, []); 
 
  if (loading) return <p>로딩 중...</p>; 
  if (error) return <p>오류 발생: {error}</p>; 
 
  return ( 
    <div className="carlist-container"> 
      <h2>          자동차 목록</h2> 
      <table className="carlist-table"> 
        <thead> 
          <tr> 
            <th>브랜드</th> 
            <th>모델</th> 
            <th>색상</th> 
            <th>연식</th> 
            <th>가격</th> 
            <th>등록번호</th> 
            <th>소유자</th> 
          </tr> 
        </thead> 
        <tbody> 
          {cars.map((car) => ( 
            <tr key={car.id}> 
              <td>{car.brand}</td> 
              <td>{car.model}</td> 
              <td>{car.color}</td> 
              <td>{car.modelYear}</td> 
              <td>${car.price.toLocaleString()}</td> 
              <td>{car.registrationNumber}</td> 
              <td> 
                {car.owner.firstname} {car.owner.lastname} 
              </td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
    </div> 
  ); 
}; 
 
export default CarList;

/** 
 * useState<Car[]>([]) : 서버에서 받은 자동차 목록을 저장합니다. 
 * useState<boolean>(true) : 데이터를 불러오는 동안 로딩 상태를 관리합니다. 
 * useState<string | null>(null) : 서버 요청 중 발생한 오류 메시지를 저장합니다. 
 * useEffect(..., []) : 화면이 처음 나타날 때 자동차 API를 한 번 호출합니다. 
 * fetch('http://localhost:8080/cars') : Spring Boot의 GET /cars API에 자동차 목록을 요청합니다. 
 * res.ok : 서버의 응답이 정상인지 확인합니다. 
 * res.json() : 서버에서 받은 JSON 데이터를 JavaScript 객체로 변환합니다. 
 * setCars(data) : 서버에서 받은 자동차 목록을 React 상태에 저장합니다. 
 * setLoading(false) : 데이터 로딩이 완료되었음을 표시합니다. 
 * catch(...) : API 요청 중 오류가 발생하면 오류 메시지를 저장합니다. 
 * cars.map(...) : 자동차 한 대마다 <tr>을 만들어 표의 한 행으로 표시합니다. 
 * car.owner.firstname / lastname : 자동차 소유자의 이름과 성을 화면에 표시합니다. 
 * car.price.toLocaleString() : 자동차 가격을 천 단위 구분 기호가 들어간 숫자로 표시합니다. */ 