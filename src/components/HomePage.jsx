import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

function HomePage() {
  const [data, setData] = useState('');
  let isLoggedIn = window.localStorage.getItem('userId');

  useEffect(() => {
    async function getData() {
      if (!isLoggedIn) return;
      let response = await axios.get(`http://localhost:4000/user/details/${isLoggedIn}`);
      setData(response.data.data);
      console.log(response.data.data);
    }
   
    getData();
  }, [isLoggedIn]);

  const navigate = useNavigate();

  const handleClick=()=>{ 
    console.log('hello world');
    window.localStorage.clear();
    setData('');
    navigate('/');
  }

  // Conditionally render content based on whether the user is logged in or not
  if (!isLoggedIn) {
    return <div>Please log in to see this page</div>;
  }

  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col>
            <h1 className="text-center">User List</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <div style={{textAlign:'center'}}>
                <h1>welcome</h1>
                <h3>{data.name}</h3>
                <h3>{data.email}</h3>       
              </div>
              <div style={{display:'flex', justifyContent:"center" }}>
                <button className='btn btn-primary' style={{width:'20%' }} onClick={handleClick}> Logout</button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
