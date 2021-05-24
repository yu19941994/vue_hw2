const loginBtn = document.getElementById('loginBtn')
const checkBtn = document.getElementById('checkBtn')
const addProductBtn = document.getElementById('addProductBtn')
const deleteProductBtn = document.getElementById('deleteProductBtn')

// const fileInput = document.querySelector('#file')

const url = `https://vue3-course-api.hexschool.io`
const path = `uy_neish`
const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
console.log(token)
axios.defaults.headers.common['Authorization'] = token

function login (e) {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  e.preventDefault()
  console.log(username, password)
  axios.post(`${url}/admin/signin`,
  {
    'username': username,
    'password': password
  })
    .then(res => {
      console.log(res)
      const {token, expired} = res.data
      console.log(token, expired)
      document.cookie = `myToken = ${token}; expires = ${new Date(expired)}`
      window.location = `product.html`
      // getProduct()
    })
    .catch(err => {console.log(err)})
  // console.log('hi')
}

function checkLogin (e) {
  e.preventDefault()
  axios.post(`${url}/api/user/check`)
    .then(res => console.log(res))
}

// function fileUpload () {
//   console.log('upload')
//   console.dir(fileInput.files[0])
//   const file = fileInput.files[0]
//   const formData = new FormData()
//   formData.append('file-to-upload', file)
//   axios.post(`${url}/api/${path}/admin/upload`, formData)
//     .then(res => {
//       console.log(res)
//     })
// }

loginBtn.addEventListener('click', login)
checkBtn.addEventListener('click', checkLogin)
// fileInput.addEventListener('change', fileUpload)
