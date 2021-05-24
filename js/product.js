const productList = document.getElementById('productList')
const productCount = document.getElementById('productCount')

const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
console.log(token)
axios.defaults.headers.common['Authorization'] = token

const url = `https://vue3-course-api.hexschool.io`
const path = `uy_neish`

let data = []
let content = ``
function getProduct () {
  content = ``
  axios.get(`${url}/api/${path}/admin/products`)
    .then(res => {
      console.log(res)
      data = res.data.products
      console.log(data)
      renderProduct(data)
    })
}

function renderProduct (data) {
  data.forEach(item => {
    content+=`
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
    productList.innerHTML = content
  })
  productCount.innerHTML = data.length
}

function deleteSingleProduct(e) {
  if(e.target.nodeName === 'BUTTON'){
    productId = e.target.dataset.id
    axios.delete(`${url}/api/${path}/admin/product/${productId}`)
      .then(res => {
        console.log(res)
        getProduct()
      })
      .catch(err => console.log(err))
  }
}



getProduct()
productList.addEventListener('click', deleteSingleProduct)