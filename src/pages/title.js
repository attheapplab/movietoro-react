import apis from '../apis/index.js'
import Navbar from '../components/navbar.js'

function Title() {
  const [asset, setAsset] = React.useState({})
  
  React.useEffect(() => {
    getAsset()
  }, [])

  const deleteFavorite = () => {
    const id = asset.favorite.id
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : ''
    const data = {
      username: username
    }
    apis('favorites').delete(data).one(id).then(response => {
      location.assign("/")
    }).catch(status => {
    })
  }

  const getAsset = () => {
    const searchParams = new URLSearchParams(location.search)
    const params = Object.fromEntries(searchParams)
    const id = params.id
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : ''
    const data = {
      username: username
    }
    apis('assets').get(data).one(id).then(response => {
      console.log('Get asset.', response)
      setAsset(response)
    }).catch(status => {
    })
  }

  const onRemoveClick = () => {
    deleteFavorite()
  }

  const actionButtons = !asset.favorite ? null :
  <div>
    <button onClick={ onRemoveClick } type="button">
      Remove from Favorites
    </button>
  </div>

  return (
    <React.Fragment>
      <Navbar>
      </Navbar>
      <hr>
      </hr>
      <section>
        <article>
          <h2>
            { asset.name }
          </h2>
          <img src={ asset.preview }>
          </img>
          <p>
            { asset.year !== "0" ? asset.year : null }
          </p>
          <p>
            { asset.starring }
          </p>
        </article>
        { actionButtons }
      </section>
    </React.Fragment>
  )
}

ReactDOM.render(<Title></Title>, document.getElementById('root'))
