import fetchPlus from './fetchPlus.js'
import url from './url.js'

function Method(name, resource, query, body) {
  this.init = {
    body: body,
    credentials: 'include',
    method: name
  }
  this.resource = resource
  this.url = url
  this.url.search = query
}

Method.prototype.all = function () {
  this.url.pathname = this.resource
  return fetchPlus(this.url, this.init)
}

Method.prototype.one = function (id) {
  this.url.pathname = this.resource + '/' + id
  return fetchPlus(this.url, this.init)
}

function Resource(name) {
  this.name = name
}

Resource.prototype.delete = function (parameters) {
  const query = parameters ? new URLSearchParams(parameters).toString() : ''
  return new Method('DELETE', this.name, query)
}

Resource.prototype.get = function (parameters) {
  const query = parameters ? new URLSearchParams(parameters).toString() : ''
  return new Method('GET', this.name, query)
}

Resource.prototype.patch = function (parameters) {
  const body = parameters ? JSON.stringify(parameters) : null
  return new Method('PATCH', this.name, '', body)
}

Resource.prototype.post = function (parameters) {
  const body = parameters ? JSON.stringify(parameters) : null
  return new Method('POST', this.name, '', body)
}

Resource.prototype.put = function (parameters) {
  const body = parameters ? JSON.stringify(parameters) : null
  return new Method('PUT', this.name, '', body)
}

export default function (resource) {
  return new Resource(resource)
}
