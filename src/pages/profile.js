import Identification from '../components/identification.js'
import Navbar from '../components/navbar.js'

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    checkIsLoggedIn()
  }, [])

  const checkIsLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('username') ? true : false
    setIsLoggedIn(isLoggedIn)
  }

  const onLogup = () => {
    checkIsLoggedIn()
  }

  return (
    <React.Fragment>
      <Navbar>
      </Navbar>
      <hr>
      </hr>
      { !isLoggedIn ? <Identification onLogup={ onLogup }></Identification> : "Hello, " + localStorage.getItem('username')  }
    </React.Fragment>
  )
}

ReactDOM.render(<Profile></Profile>, document.getElementById('root'))
