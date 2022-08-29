import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate,Link } from 'react-router-dom'
import './navbar.css'

function Navbar1() {
   
    const navigate = useNavigate()
    
 
    const logOut = () => { 
      localStorage.removeItem("token")
      localStorage.removeItem("name")
      navigate('/')
    }
    
  return (
    <Navbar collapseOnSelect expand="lg"   variant="dark">
    
      <Container>
        <Navbar.Brand  onClick={() => navigate('/')} >
  
          <span 
          className='text-dark strong'>
            GameOrGame
            </span>
       
         </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
         {
           !localStorage.getItem("token") && <Nav.Link eventKey={2}>
            <button
            style={{color:'white'}}
            onClick={() => navigate("/login")} 
             className='btn btn-outline-secondary '>Login
           </button> 
          </Nav.Link>
         }   
         {
          !localStorage.getItem("token") &&  <Nav.Link eventKey={2}>
          <button
             style={{color:'white'}}
             onClick={() => navigate("/register")} 
             className='btn btn-outline-primary'>Register
          </button> 
          </Nav.Link>
         }   
                  {
          localStorage.getItem("token") &&  <Nav.Link eventKey={2}>
          <button
             onClick={() => navigate("/games")} 
             className='btn btn-outline-primary bg-danger link'>games
          </button> 
          </Nav.Link>
         } 
        {
            localStorage.getItem("token") &&  <Nav.Link eventKey={2}>
          <button
             style={{color:'white'}}
             onClick={logOut} 
             className='btn btn-outline-danger bg-dark ' >Logout
          </button> 
          </Nav.Link>
         }   
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Navbar1;





























// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCurrentToken, logOut } from '../feature/auth/authSlice';


// const Navbar = () => {
//     const dispatch = useDispatch()
//     const token = useSelector(selectCurrentToken)
//     const navigate = useNavigate()
//     const current = new Date();
//     const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
//     const exit = () => {
//         dispatch(logOut({}))
//         navigate('/home')
//     }
//     // projectlist
    // return (
       
    



        // <div>
        //     {/* navbar navbar-expand bg-dark shadow */}
        //     <nav class="navbar navbar-expand bg-dark shadow">
        //         {
        //              <button
        //                 style={{ color: 'white' }}
        //                 onClick={() => navigate('/definitions')}
        //                 className='btn btn-outline m-2'>⚙️
        //             </button>
        //         }
        //         <div className='container'>
        //             {
        //                 !   <button
        //                     style={{ color: 'white' }}
        //                     onClick={() => navigate('/home')}
        //                     className='btn btn-outline m-2'>Home
        //                 </button>
        //             }


        //             <div class="collapse navbar-collapse" id="navbarNavDropdown">
        //                 <ul class="navbar-nav">
        //                     {
        //                          <li class="nav-item ">
        //                             <button
        //                                 style={{ color: 'white' }}
        //                                 onClick={() => navigate('/workers')}
        //                                 className='btn btn-outline  m-2'>Add workers
        //                             </button>
        //                         </li>
        //                     }
        //                 </ul>
        //                 {
        //                      <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/manageyourself')}
        //                         className='btn btn-outline  m-2'>Manage Yourself
        //                     </button>
        //                 }
        //                 {
        //                      <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/createProject')}
        //                         className='btn btn-outline  m-2'>Create project
        //                     </button>
        //                 }

        //                 {
        //                      <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/projectlist')}
        //                         className='btn btn-outline  m-2'>Your projects
        //                     </button>
        //                 }
        //             </div>




        //             {
        //                 ! <li class="nav-item active">
        //                     <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/login')}
        //                         className='btn btn-outline float-end m-2'>Login
        //                     </button>
        //                 </li>
        //             }
        //             {
        //                 ! <li class="nav-item ">
        //                     <button
        //                         style={{ color: 'white' }}
        //                         onClick={() => navigate('/register')}
        //                         className='btn btn-outline  m-2'>Register
        //                     </button>
        //                 </li>
        //             }
        //             {
        //                  <li class="nav-item ">
        //                     <button
        //                         onClick={exit}
        //                         style={{ color: 'white' }}
        //                         className='btn btn-outline-danger  m-2'>Logout
        //                     </button>
        //                 </li>
        //             }

        //         </div>
        //         <div className='m-2'>{date}</div>
        //     </nav>
        // </div>
    // )
// }

// export default Navbar