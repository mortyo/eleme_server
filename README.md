# 技术栈

nodejs + express + mongodb + mongoose + es6/7 


# 项目运行

```
项目运行之前，请确保系统已经安装以下应用
1、node (6.0 及以上版本)
2、mongodb (开启状态)
```

```
git clone https://github.com/mortyo/eleme_server  

cd eleme_server

npm install

npm run dev

访问: http://localhost:8001（如果已启动前台程序，则不需打开此地址）
```

# 接口文档
### v1.user（用户相关）
#### 1.用户登录 POST
```
/v1/login
```
#### 2.获取用户信息 GET
```
/v1/user
```
#### 3.通过id获取用户信息 GET
```
/v1/user/:user_id
```
#### 4.退出登录 GET
```
/v1/signout
```
#### 5.修改密码 POST
```
/v1/changepassword
```
#### 6.修改头像 POST
```
/v1/user/:user_id/changeavatar
```
#### 7.获取用户列表 GET
```
/v1/users/list
```
#### 8.用户数量统计 GET
```
/v1/users/count
```
#### 9.用户城市统计 GET
```
/v1/users/city/count
```
#### 10.获取用户收货地址 GET
```
/v1/user/:user_id/getAddress
```
#### 11.添加用户收货地址 POST
```
/v1/user/:user_id/addAddress
```
#### 12.删除用户收货地址 DELETE
```
/v1/user/:user_id/address/:address_id
```
#### 13.通过收货地址id获取收货地址 GET
```
/v1/address/:address_id
```
#### 14.获取用户红包 GET
```
/v1/user/:user_id/hongbaos
```
#### 14.获取用户过期红包 GET
```
/v1/user/:user_id/expired_hongbaos
```
#### 14.用户兑换红包 POST
```
/v1/user/:user_id/hongbao_exchange
```
### v2.shopping(购物相关)
#### 1.添加商店 POST
```
/v2/addshop
```
#### 2.获取筛选后的所有商店 GET
```
/v2/shops
```
#### 3.通过商店id获取商店详情 GET
```
/v2/shop/:shop_id
```
#### 4.更新商店信息 POST
```
/v2/updateshop
```
#### 5.商店搜索 GET
```
/v2/shops/search
```
#### 6.商店统计 GET
```
/v2/shops/count
```
#### 7.删除商店 DELETE
```
/v2/shop/:shop_id
```
#### 8.添加商品 POST
```
/v2/addfood
```
#### 9.获取商店内筛选的商品 GET
```
/v2/foods
```
#### 10.获取商品统计 GET
```
/v2/foods/count
```
#### 11.更新商品信息 POST
```
/v2/updatefood
```
#### 12.删除商品 DELETE 
```
/v2/food/:food_id
```
#### 13.添加商店内菜单 POST
```
/v2/addmenu
```
#### 14.获取商店内所有菜单 GET
```
/v2/shopmenu/:shop_id
```
#### 15.通过菜单id获取菜单 GET
```
/v2/menu/:menu_id
```
#### 16.确认购物车信息 POST
```
/v2/cart/checkout
```
#### 17.获取购物车备注 GET
```
/v2/cart/:cart_id/remarks
```
#### 18.下单 POST
```
/v2/user/:user_id/cart/:cart_id/order
```
#### 19.获取用户所有订单 GET
```
/v2/user/:user_id/orders
```
#### 20.通过用户id和订单id获取订单详情 GET
```
/v2/user/:user_id/order/:order_id
```
#### 21.获取所有订单 GET 
```
/v2/orders
```
#### 22.获取所有订单数量 GET
```
/v2/orders/count
```
#### 23.主页面入口导航 GET
```
/v2/index_entry
```
#### 24.添加商品分类 POST
```
/v2/addCategory
```
#### 25.获取所有商品分类 GET
```
/v2/getCategories
```
#### 26.获取配送模式 GET
```
/v2/delivery_modes
```
#### 27.获取商店活动 GET
```
/v2/activity_attributes
```
#### 28.获取商店评论 GET
```
/v2/shop/:shop_id/ratings
```
#### 29.获取商店评论分数 GET
```
/v2/shop/:shop_id/ratings/scores
```
#### 30.获取商店评论标签 GET
```
/v2/shop/:shop_id/ratings/tags
```
### v3.position(位置相关)
#### 1.获取相关城市 GET
```
/v3/cities
```
#### 2.通过城市id获取城市GET
```
/v3/cities/:id
```
#### 3.获取额外的地址 GET
```
/v3/exactaddress
```
#### 4.通过经纬度获取详细地址 GET
```
/v3/pois/:geohash
```
#### 5.通过经纬度搜索详细地址 GET
```
/v3/pois
```
### v4.other 
#### 1.兑换vip卡 POST
```
/v4/vip_cart
```
#### 2.获取验证码 POST
```
/v4/captchas
```
#### 3.上传图片 POST
```
/v4/addimg/:type
```
#### 4.获取解释内容 GET
```
/v4/explain
```
#### 5.支付 GET
```
/v4/payment
```
### v5.admin(后台管理相关)
#### 1.管理员登录 GET
```
/v5/login
```
#### 2.管理员退出登录 GET
```
/v5/signout
```
#### 3.获取管理员详细信息 GET
```
/v5/info
```
#### 4.更新管理员头像 POST  
```
/v5/update/avatar/:admin_id
```
#### 5.获取所有管理员 GET
```
/v5/all
```
#### 6.获取所有管理员数量 GET
```
/v5/count
```
### v6.statis(统计相关)
#### 1.获取当天API请求次数 GET
```
/v6/api/:date/count
```
#### 2.获取所有API请求次数 GET
```
/v6/api/count
```
#### 3.获取所有API请求信息 GET
```
/v6/api/all
```
#### 4.获取当天用户注册数量 GET
```
/v6/user/:date/count
```
#### 5.获取当天订单数量 GET
```
/v6/order/:date/count
```
#### 6.获取当天管理员注册数量 GET 
```
/v6/admin/:date/count
```