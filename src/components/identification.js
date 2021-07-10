import apis from '../apis/index.js'

function Identification(props) {
  const [username, setUsername] = React.useState('')

  const postLogup = () => {
    const data = {
      username: username
    }
    apis('logup').post(data).all().then(response => {
      console.log('Post logup', response)
      localStorage.setItem('username', username)
      props.onLogup()
    }).catch(status => {
    })
  }

  const onRememberMeClick = () => {
    postLogup()
  }

  const onUsernameChange = e => {
    const username = e.target.value.replace(/[^_a-z0-9]/g, '')
    setUsername(username)
  }

  return (
    <div>
      <p>
        Who are you?
      </p>
      <input onChange={ onUsernameChange } placeholder="username" type="text" value={ username }>
      </input>
      <div>
        <button onClick={ onRememberMeClick } type="button">
          Remember Me
        </button>
      </div>
    </div>
  )
}

export default Identification
