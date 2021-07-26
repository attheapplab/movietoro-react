import apis from '../apis/index.js'
import Identification from '../components/identification.js'
import Navbar from '../components/navbar.js'

function App() {
  const [isFavorite, setIsFavorite] = React.useState(true)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [favorites, setFavorites] = React.useState([])
  const [predictions, setPredictions] = React.useState([])
  const [query, setQuery] = React.useState('')
  const [selection, setSelection] = React.useState({})

  React.useEffect(() => {
    getHome()
    checkIsLoggedIn()
  }, [])

  React.useEffect(() => {
    if (!query) {
      setPredictions([])
      return
    }
    getPredictions()
  }, [query])

  const clearSelection = () => {
    setSelection({})
    setQuery('')
  }

  const checkIsLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('username') ? true : false
    setIsLoggedIn(isLoggedIn)
  }

  const getPredictions = () => {
    apis('predictions').get().one(query).then(response => {
      // console.log('Get predictions.', response)
      setPredictions(response)
    }).catch(status => {
    })
  }

  const getHome = () => {
    apis('home').get().all().then(response => {
      // console.log('Get home.', response)
      setFavorites([ ...response ])
    }).catch(status => {
    })
  }

  const postFavorite = () => {
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : ''
    const data = {
      username: username,
      ...selection
    }
    apis('favorites').post(data).all().then(response => {
      console.log('Post favorites', response)
      clearSelection()
      getHome()
    }).catch(status => {
    })
  }

  const onAddClick = () => {
    postFavorite()
  }

  const onCancelClick = () => {
    clearSelection()
  }

  const onLogup = () => {
    checkIsLoggedIn()
  }

  const onPredictionClick = prediction => {
    setSelection(prediction)
  }

  const onQueryChange = e => {
    setQuery(e.target.value)
  }

  const onFavoriteClick = favorite => {
    const id = favorite.asset.id
    const params = {
      id: id
    }
    const searchParams = new URLSearchParams(params)
    const queryString = searchParams.toString()
    location.assign('/title?' + queryString)
  }

  const addSection =
  <section>
    <h2>
      { selection.name }
    </h2>
    <p>
      { selection.year }
    </p>
    <p>
      { selection.starring }
    </p>
    <button disabled={ !isLoggedIn } onClick={ onAddClick } type="button">
      Add to Favorites
    </button>
    <button onClick={ onCancelClick } type="button">
      Cancel
    </button>
    { !isLoggedIn ? <Identification onLogup={ onLogup }></Identification> : null  }
  </section>

const favoriteArticles = 
  <React.Fragment>
    <p>
      <u>Recently added to favorites:</u>
    </p>
    { favorites.map(favorite =>
      <article key={ favorite.id } onClick={ () => onFavoriteClick(favorite) }>
        <h2>
          { favorite.asset.name }
        </h2>
        <p>
          <strong>{ favorite.user.username }</strong> { favorite.count ? "+" + favorite.count : null }
        </p>
      </article>
    ) }
  </React.Fragment>

  const predictionArticles = predictions.map(prediction =>
    <article key={ prediction.aid } onClick={ () => onPredictionClick(prediction) }>
      <h2>
        { prediction.name }
      </h2>
      <p>
        { prediction.year }
      </p>
      <p>
        { prediction.starring }
      </p>
    </article>
  )

  const viewSection =
  <section>
    <input onChange={ onQueryChange } placeholder="Search for movies" type="text" value={ query }>
    </input>
    { !predictions.length ? favoriteArticles : predictionArticles }
  </section>

  const main = () => {
    if (selection.name) {
      return addSection
    }
    return viewSection
  }

  return (
    <React.Fragment>
      <Navbar>
      </Navbar>
      <hr>
      </hr>
      { main() }
    </React.Fragment>
  )
}

ReactDOM.render(<App></App>, document.getElementById('root'))
