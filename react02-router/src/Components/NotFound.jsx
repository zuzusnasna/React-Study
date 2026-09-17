import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>페이지를 찾을 수 없습니다. 돌아가시오.</p>
      <Link to="/">Go back to Home</Link>
    </>
  );
};

export default NotFound;