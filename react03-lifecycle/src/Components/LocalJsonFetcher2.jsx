import { useEffect, useState } from 'react';

const LocalJsonFetcher2 = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('./json/books.json')
      .then((response) => response.json())
      .then((json) => {
        setBooks(json);
      });
  }, []);

  return (
    <>
      <h2>내부통신2 - 도서 목록</h2>

      <table border="1">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>저자</th>
            <th>출판사</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.price.toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LocalJsonFetcher2;