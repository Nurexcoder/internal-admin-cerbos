import logo from "../assets/image.png";


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
        <span style={{fontWeight: 'bold', fontSize: '1.3rem'}}>Dev<span style={{fontWeight: 'lighter'}}>Zero</span></span>
      </div>
    </div>
  )
}

export default Navbar
