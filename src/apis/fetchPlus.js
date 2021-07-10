const checkOk = function (response) {
  if (!response.ok) {
    throw response.status
  }
  return response
}

const checkContent = function (response) {
  const statusCode = response.status
  const contentType = response.headers.get('content-type')
  if (statusCode !== 200) {
    return response.status
  } else if (statusCode === 200 && contentType && contentType.includes('application/json')) {
    return response.json()
  }
  return response
}

const fetchPlus = (resource, init) =>
fetch(resource, init)
.then(response => checkOk(response))
.then(response => checkContent(response))

export default fetchPlus
