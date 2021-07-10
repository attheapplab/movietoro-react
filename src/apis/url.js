let hostname
let protocol
if (window.location.hostname === 'localhost' || window.location.hostname.substring(0, 8) === '192.168.') {
  hostname = window.location.hostname
  protocol = window.location.protocol
} else {
  hostname = 'movietoro.herokuapp.com'
  protocol = 'https:'
}
const url = new URL(protocol + '//' + hostname)

export default url
