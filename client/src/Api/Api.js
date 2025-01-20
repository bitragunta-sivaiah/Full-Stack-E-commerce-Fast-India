export const baseURL =  import.meta.env.VITE_API_URL



const Api ={
    register:{
        url:'/api/auth/register',
        method:'post'
    },
    login:{
        url:'/api/auth/login',
        method:'post'
    },
    refreshToken:{
        url:'/api/auth/refresh-token',
        method:'post'
    },
    userDetails:{
        url:'/api/auth/user-details',
        method:'get'
    },
    logout:{
        url:'/api/auth/logout',
        method:'get'
    },
    uploadAvatar:{
        url:'/api/auth//upload-avatar',
        method:'put'
    },
    updateUserDetails:{
        url:'/api/auth/update-user',
        method:'put'
    },
    addCategory:{
        url:'/api/category/add-category',
        method:'post'
    },uploadImage:{
        url:'/api/file/upload',
        method:'post'
    },
    getCategory:{
        url:'/api/category/get',
        method:'get'
    },
    updateCategory:{
        url:'/api/category/update',
        method:'put'
    },
    deleteCategory:{
        url:'/api/category/delete',
        method:'delete'
    }, createSubCategory: { 
        url: '/api/subcategory/create',
         method: 'post' 
        }
    , getSubCategory: {
         url: '/api/subcategory/get',
          method: 'post'
         },
     updateSubCategory: { 
        url: '/api/subcategory/update', 
        method: 'put' 
    },
         deleteSubCategory: { 
            url: '/api/subcategory/delete',
             method: 'delete' 
            },
            createProduct:{
                url:'/api/product/create',
                method:'post'
            },
            getProduct : {
                url : '/api/product/get',
                method : 'post'
            },
            getProductByCategory : {
                url : '/api/product/get-product-by-category',
                method : 'post'
            } , 
            getProductByCategoryAndSubCategory: {
                url: '/api/product/get-pruduct-by-category-and-subcategory',
                method: 'post'
            },
            getProductDetails : {
                url : '/api/product/get-product-details',
                method : 'post'
            },
            updateProductDetails : {
                url : "/api/product/update-product-details",
                method : 'put'
            },
            deleteProduct : {
                url : "/api/product/delete-product",
                method : 'delete'
            },
            searchProduct : {
                url : '/api/product/search-product',
                method : 'post'
            },
            addTocart : {
                url : "/api/cart/create",
                method : 'post'
            },
            getCartItem : {
                url : '/api/cart/get',
                method : 'get'
            },
            updateCartItemQty : {
                url : '/api/cart/update-qty',
                method : 'put'
            },
            deleteCartItem : {
                url : '/api/cart/delete-cart-item',
                method : 'delete'
            },
            createAddress : {
                url : '/api/address/create',
                method : 'post'
            },
            getAddress : {
                url : '/api/address/get',
                method : 'get'
            },
            updateAddress : {
                url : '/api/address/update',
                method : 'put'
            },
            disableAddress : {
                url : '/api/address/disable',
                method : 'delete'
            },
            CashOnDeliveryOrder : {
                url : "/api/order/cash-on-delivery",
                method : 'post'
            },
            payment_url : {
                url : "/api/order/checkout",
                method : 'post'
            },
            getOrderItems : {
                url : '/api/order/order-list',
                method : 'get'
            },deleteOrder: {
                method: "DELETE",
                url: "/api/orders/:orderId",
              },
              updateOrderStatus: {
                method: "PUT",
                url: "/api/orders/status",
              },
}


export default Api;
