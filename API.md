# 接口分类
### v1.user
### v2.shopping
### v3.address
### v4.other 
### v5.admin
### v6.statis

# node-elm 接口文档
```

baseUrl: http://localhost:8001

```

## 目录：

[1、获取城市列表](#1获取城市列表)<br/>
[2、获取所选城市信息](#2获取所选城市信息)<br/>
[3、搜索地址](#3搜索地址)<br/>
[4、根据经纬度详细定位](#4根据经纬度详细定位)<br/>
[5、食品分类列表](#5食品分类列表)<br/>
[6、获取商铺列表](#6获取商铺列表)<br/>
[7、搜索餐馆](#7搜索餐馆)<br/>
[8、获取所有商铺分类列表](#8获取所有商铺分类列表)<br/>
[9、获取配送方式](#9获取配送方式)<br/>
[10、商家属性活动列表](#10商家属性活动列表)<br/>
[11、餐馆详情](#11餐馆详情)<br/>
[12、上传图片](#12上传图片)<br/>
[13、添加餐馆](#13添加餐馆)<br/>
[14、添加食品种类](#14添加食品种类)<br/>
[15、添加食品](#15添加食品)<br/>
[16、获取食品列表](#16获取食品列表)<br/>
[17、获取评价信息](#17获取评价信息)<br/>
[18、获取评价分数](#18获取评价分数)<br/>
[19、获取评价分类](#19获取评价分类)<br/>
[20、加入购物车](#20加入购物车)<br/>
[21、获取备注信息](#21获取备注信息)<br/>
[22、获取收货地址列表](#22获取收货地址列表)<br/>
[23、获取验证码](#23获取验证码)<br/>
[24、获取用户信息](#24获取用户信息)<br/>
[25、登录](#25登录)<br/>
[26、退出](#26退出)<br/>
[27、修改密码](#27修改密码)<br/>
[28、增加收货地址](#28增加收货地址)<br/>
[29、删除收货地址](#29删除收货地址)<br/>
[30、下单](#30下单)<br/>
[31、订单列表](#31订单列表)<br/>
[32、订单详情](#32订单详情)<br/>
[33、服务中心](#33服务中心)<br/>
[34、可用红包](#34可用红包)<br/>
[35、过期红包](#35过期红包)<br/>
[36、兑换红包](#36兑换红包)<br/>
[37、管理员登录](#37管理员登录)<br/>
[38、管理员退出登录](#38管理员退出登录)<br/>
[39、管理员信息](#39管理员信息)<br/>
[40、获取某日API请求量](#40获取某日API请求量)<br/>
[41、获取所有API请求量](#41获取所有API请求量)<br/>
[42、获取某天用户注册量](#42获取某天用户注册量)<br/>
[43、获取所有用户注册量](#43获取所有用户注册量)<br/>
[44、获取某天订单数量](#44获取某天订单数量)<br/>
[45、获取所有订单数量](#45获取所有订单数量)<br/>
[46、管理员列表](#46管理员列表)<br/>
[47、获取管理员数量](#47获取管理员数量)<br/>
[48、获取店铺食品种类](#48获取店铺食品种类)<br/>
[49、获取餐馆数量](#49获取餐馆数量)<br/>
[50、更新餐馆](#50更新餐馆)<br/>
[51、删除餐馆](#51删除餐馆)<br/>
[52、获取食品列表](#52获取食品列表)<br/>
[53、获取食品数量](#53获取食品数量)<br/>
[54、获取食品种类详情](#54获取食品种类详情)<br/>
[55、更新食品](#55更新食品)<br/>
[56、删除食品](#56删除食品)<br/>
[57、获取用户列表](#57获取用户列表)<br/>
[58、获取订单列表](#58获取订单列表)<br/>
[59、获取地址信息](#59获取地址信息)<br/>
[60、获取用户分布信息](#60获取用户分布信息)<br/>
[61、获取某天管理员注册量](#61获取某天管理员注册量)<br/>





## 接口列表：

### 1、获取城市列表

```
http://localhost:8001/v1/cities
```

 [http://localhost:8001/v1/cities?type=guess](http://localhost:8001/v1/cities?type=guess)

### 2、获取所选城市信息

```
http://localhost:8001/v1/cities/:id
```

[http://localhost:8001/v1/cities/1](http://localhost:8001/v1/cities/1)


### 3、搜索地址

```
http://localhost:8001/v1/pois
```

[http://localhost:8001/v1/pois?city_id=1&keyword=迪士尼&type=search](http://localhost:8001/v1/pois?city_id=1&keyword=%E8%BF%AA%E5%A3%AB%E5%B0%BC&type=search)


### 4、根据经纬度详细定位

```
http://localhost:8001/v2/pois/:geohash
```

[http://localhost:8001/v2/pois/31.22967,121.4762](http://localhost:8001/v2/pois/31.22967,121.4762)


### 5、食品分类列表

```
http://localhost:8001/v2/index_entry
```

[http://localhost:8001/v2/index_entry](http://localhost:8001/v2/index_entry)


### 6、获取商铺列表

```
http://localhost:8001/shopping/restaurants
```

[http://localhost:8001/shopping/restaurants?latitude=31.22967&longitude=121.4762](http://localhost:8001/shopping/restaurants?latitude=31.22967&longitude=121.4762)


### 7、搜索餐馆

```
http://localhost:8001/v4/restaurants
```

[http://localhost:8001/v4/restaurants?geohash=31.22967,121.4762&keyword=肯德基](http://localhost:8001/v4/restaurants?geohash=31.22967,121.4762&keyword=肯德基)


### 8、获取所有商铺分类列表

```
http://localhost:8001/shopping/v2/restaurant/category
```

[http://localhost:8001/shopping/v2/restaurant/category](http://localhost:8001/shopping/v2/restaurant/category)


### 9、获取配送方式

```
http://localhost:8001/shopping/v1/restaurants/delivery_modes
```

[http://localhost:8001/shopping/v1/restaurants/delivery_modes](http://localhost:8001/shopping/v1/restaurants/delivery_modes)


### 10、商家属性活动列表

```
http://localhost:8001/shopping/v1/restaurants/activity_attributes
```

[http://localhost:8001/shopping/v1/restaurants/activity_attributes](http://localhost:8001/shopping/v1/restaurants/activity_attributes)


### 11、餐馆详情

```
http://localhost:8001/shopping/restaurant/:shopid
```

[http://localhost:8001/shopping/restaurant/1](http://localhost:8001/shopping/restaurant/1)


### 12、上传图片
 
```
http://localhost:8001/v1/addimg/:type
```


### 13、添加餐馆

```
http://localhost:8001/shopping/addshop
```


### 14、添加食品种类

```
http://localhost:8001/shopping/addcategory
```


### 15、添加食品

```
http://localhost:8001/shopping/addfood
```

### 16、获取食品列表

```
http://localhost:8001/shopping/v2/menu
```


[http://localhost:8001/shopping/v2/menu?restaurant_id=1](http://localhost:8001/shopping/v2/menu?restaurant_id=1)


### 17、获取评价信息

```
http://localhost:8001/ugc/v2/restaurants/:restaurant_id/ratings
```


[http://localhost:8001/ugc/v2/restaurants/1/ratings?offset=0&limit=10](http://localhost:8001/ugc/v2/restaurants/1/ratings?offset=0&limit=10)


### 18、获取评价分数

```
http://localhost:8001/ugc/v2/restaurants/:restaurant_id/ratings/scores
```


[http://localhost:8001/ugc/v2/restaurants/1/ratings/scores](http://localhost:8001/ugc/v2/restaurants/1/ratings/scores)


### 19、获取评价分类

```
http://localhost:8001/ugc/v2/restaurants/:restaurant_id/ratings/tags
```


[http://localhost:8001/ugc/v2/restaurants/1/ratings/tags](http://localhost:8001/ugc/v2/restaurants/1/ratings/tags)


### 20、加入购物车

```
http://localhost:8001/v1/carts/checkout
```


### 21、获取备注信息

```
http://localhost:8001/v1/carts/:cart_id/remarks
```


[http://localhost:8001/v1/carts/1/remarks](http://localhost:8001/v1/carts/1/remarks)



### 22、获取收货地址列表

```
http://localhost:8001/v1/users/:user_id/addresses
```


[http://localhost:8001/v1/users/1/addresses](http://localhost:8001/v1/users/1/addresses)


### 23、获取验证码

```
http://localhost:8001/v1/captchas
```


### 24、获取用户信息

```
http://localhost:8001/v1/user
```


### 25、登录

```
http://localhost:8001/v2/login
```

### 26、退出

```
http://localhost:8001/v2/signout
```


### 27、修改密码

```
http://localhost:8001/v2/changepassword
```


### 28、增加收货地址

```
http://localhost:8001/v1/users/:user_id/addresses
```


### 29、删除收货地址

```
http://localhost:8001/v1/users/:user_id/addresses/:address_id
```


### 30、下单

```
http://localhost:8001/v1/users/:user_id/carts/:cart_id/orders
```


### 31、订单列表

```
http://localhost:8001/bos/v2/users/:user_id/orders
```


[http://localhost:8001/bos/v2/users/1/orders?limit=10&offset=0](http://localhost:8001/bos/v2/users/1/orders?limit=10&offset=0)



### 32、订单详情

```
http://localhost:8001/bos/v1/users/:user_id/orders/:order_id/snapshot
```


[http://localhost:8001/bos/v1/users/1/orders/1/snapshot](http://localhost:8001/bos/v1/users/1/orders/1/snapshot)



### 33、服务中心

```
http://localhost:8001/v3/profile/explain
```


[http://localhost:8001/v3/profile/explain](http://localhost:8001/v3/profile/explain)



### 34、可用红包

```
http://localhost:8001/promotion/v2/users/:user_id/hongbaos
```


[http://localhost:8001/promotion/v2/users/1/hongbaos?limit=20&offset=0](http://localhost:8001/promotion/v2/users/1/hongbaos?limit=20&offset=0)


### 35、过期红包

```
http://localhost:8001/promotion/v2/users/:user_id/expired_hongbaos
```


[http://localhost:8001/promotion/v2/users/1/expired_hongbaos?limit=20&offset=0](http://localhost:8001/promotion/v2/users/1/expired_hongbaos?limit=20&offset=0)


### 36、兑换红包

```
http://localhost:8001/v1/users/:user_id/hongbao/exchange
```


### 37、管理员登录

```
http://localhost:8001/admin/login
```


### 38、管理员退出登录

```
http://localhost:8001/admin/singout
```


### 39、管理员信息

```
http://localhost:8001/admin/info
```


### 40、获取某日API请求量

```
http://localhost:8001/statis/api/:date/count
```

[http://localhost:8001/statis/api/2017-05-29/count](http://localhost:8001/statis/api/2017-05-29/count)


### 41、获取所有API请求量

```
http://localhost:8001/statis/api/count
```

[http://localhost:8001/statis/api/count](http://localhost:8001/statis/api/count)


### 42、获取某天用户注册量

```
http://localhost:8001/statis/user/:date/count
```

[http://localhost:8001/statis/user/2017-05-29/count](http://localhost:8001/statis/user/2017-05-29/count)



### 43、获取所有用户注册量

```
http://localhost:8001/v1/users/count
```

[http://localhost:8001/v1/users/count](http://localhost:8001/v1/users/count)


### 44、获取某天订单数量

```
http://localhost:8001/statis/order/:date/count
```

[http://localhost:8001/statis/order/2017-05-29/count](http://localhost:8001/statis/order/2017-05-29/count)


### 45、获取所有订单数量

```
http://localhost:8001/bos/orders/count
```

[http://localhost:8001/bos/orders/count](http://localhost:8001/bos/orders/count)


### 46、管理员列表

```
http://localhost:8001/admin/all
```

[http://localhost:8001/admin/all?offset=0&limit=20](http://localhost:8001/admin/all?offset=0&limit=20)


### 47、获取管理员数量

```
http://localhost:8001/admin/count
```

[http://localhost:8001/admin/count](http://localhost:8001/admin/count)


### 48、获取店铺食品种类

```
http://localhost:8001/shopping/getcategory/:restaurant_id
```

[http://localhost:8001/shopping/getcategory/2](http://localhost:8001/shopping/getcategory/2)


### 49、获取餐馆数量

```
http://localhost:8001/shopping/restaurants/count
```

[http://localhost:8001/shopping/restaurants/count](http://localhost:8001/shopping/restaurants/count)


### 50、更新餐馆

```
http://localhost:8001/shopping/updateshop
```

### 51、删除餐馆

```
http://localhost:8001/shopping/restaurant/:restaurant_id
```

### 52、获取食品列表

```
http://localhost:8001/shopping/v2/foods
```

[http://localhost:8001/shopping/v2/foods?offset=0&limit=20&restaurant_id=2](http://localhost:8001/shopping/v2/foods?offset=0&limit=20&restaurant_id=2)


### 53、获取食品数量

```
http://localhost:8001/shopping/v2/foods/count
```

[http://localhost:8001/shopping/v2/foods/count](http://localhost:8001/shopping/v2/foods/count)


### 54、获取食品种类详情

```
http://localhost:8001/shopping/v2/menu/:category_id
```

[http://localhost:8001/shopping/v2/menu/1](http://localhost:8001/shopping/v2/menu/1)


### 55、更新食品

```
http://localhost:8001/shopping/v2/updatefood
```


### 56、删除食品

```
http://localhost:8001/shopping/v2/food/:food_id
```


### 57、获取用户列表

```
http://localhost:8001/v1/users/list
```

[http://localhost:8001/v1/users/list?offset=0&limit=20](http://localhost:8001/v1/users/list?offset=0&limit=20)


### 58、获取订单列表

```
http://localhost:8001/bos/orders
```

[http://localhost:8001/bos/orders?offset=0&limit=20](http://localhost:8001/bos/orders?offset=0&limit=20)


### 59、获取地址信息

```
http://localhost:8001/v1/addresse/:address_id
```

[http://localhost:8001/v1/addresse/1](http://localhost:8001/v1/addresse/1)


### 60、获取用户分布信息

```
http://localhost:8001/v1/user/city/count
```

[http://localhost:8001/v1/user/city/count](http://localhost:8001/v1/user/city/count)


### 61、获取某天管理员注册量

```
http://localhost:8001/statis/admin/:date/count
```

[http://localhost:8001/statis/admin/2017-05-30/count](http://localhost:8001/statis/admin/2017-05-30/count)
