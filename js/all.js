const loginBtn = document.getElementById('loginBtn')
const addProductBtn = document.getElementById('addProductBtn')
const productList = document.getElementById('productList')
const productCount = document.getElementById('productCount')

const url = `https://vue3-course-api.hexschool.io`
const path = `uy_neish`

loginBtn.addEventListener('click', login)

// 取得 Token
// 將 Token 存到 Cookie
function login (e) {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const data = {
    username,
    password
  }
  e.preventDefault()
  console.log(username, password)
  axios.post(`${url}/admin/signin`, data)
    .then(res => {
      console.log(res)
      if(res.data.success) {
        const {token, expired} = res.data
        console.log(token, expired)
        document.cookie = `myToken = ${token}; expires = ${new Date(expired)}`
        // window.location = `product.html`
        app.init()
      }else{
        alert('帳號或密碼輸入有誤喲！')
      }
    })
    .catch(err => {console.log(err)})
}

const app = {
  data: {
    product: [],
    content: ''
    // productId: ''
  },
  init () {
    // 將 Cookie 取出來
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    console.log(token)
    axios.defaults.headers.common['Authorization'] = token
    this.getProduct()
  },
  getProduct () {
    axios.get(`${url}/api/${path}/admin/products`)
      .then(res => {
        console.log(res)
        if(res.data.success) {
          this.data.product = res.data.products
          console.log(this.data.product) 
          this.renderProduct(this.data.product)
        }
      })
      .catch(err => console.log(err))
  },
  renderProduct (product) {
    this.data.content = ''
    product.forEach(item => {
      this.data.content+=`
        <tr>
          <td>${item.title}</td>
          <td width="120">
            ${item.origin_price}
          </td>
          <td width="120">
            ${item.price}
          </td>
          <td width="100">
            <span class="">${item.is_enabled}</span>
          </td>
          <td width="120">
            <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove"
              data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>
      `
      productList.innerHTML = this.data.content
    })
    productCount.innerHTML = this.data.product.length
    productList.addEventListener('click', app.deleteSingleProduct)
  },
  deleteSingleProduct (e) {
    if(e.target.nodeName === 'BUTTON'){
      console.log(e.target.dataset.id)
      const productId = e.target.dataset.id
      axios.delete(`${url}/api/${path}/admin/product/${productId}`)
        .then(res => {
          console.log(res)
          if(res.data.success) {
            app.getProduct()
          }
        })
        .catch(err => console.log(err))
    }
  }
}


