(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orderDetail"],{"26ea":function(t,e,a){},"702d":function(t,e,a){"use strict";var s=a("26ea"),i=a.n(s);i.a},bf93:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"loading_container"},[a("div",{staticClass:"load_img",style:{backgroundPositionY:-t.positionY%7*2.5+"rem"}})])},i=[],r={data:function(){return{positionY:0,timer:null}},mounted:function(){var t=this;this.timer=setInterval((function(){t.positionY++}),600)},beforeDestroy:function(){clearInterval(this.timer)}},n=r,o=(a("ef94"),a("2877")),l=Object(o["a"])(n,s,i,!1,null,"4795715c",null);e["a"]=l.exports},c51e:function(t,e,a){},ece4:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order_detail_page"},[t.showLoading?t._e():a("section",{staticClass:"container"},[a("section",{staticClass:"order_title"},[a("router-link",{attrs:{to:{path:"/shop",query:{geohash:t.geohash,id:t.orderDetail.restaurant_id}}}},[a("img",{attrs:{src:t.imgBaseUrl+t.orderDetail.restaurant_image_url}})]),a("div",{staticClass:"right"},[a("router-link",{attrs:{to:{path:"/shop",query:{geohash:t.geohash,id:t.orderDetail.restaurant_id}}}},[t._v(" 商家名称："),a("span",{staticStyle:{color:"blue"}},[t._v(t._s(t.orderDetail.restaurant_name))])]),a("p",[t._v("订单状态："+t._s(t.orderDetail.status_bar.title))]),a("p",[t._v(t._s(t.orderDetail.timeline_node.description))]),a("router-link",{staticStyle:{color:"blue"},attrs:{to:{path:"/shop",query:{geohash:t.geohash,id:t.orderDetail.restaurant_id}}}},[t._v("再来一单")])],1)],1),a("section",{staticClass:"food_list"},[a("header",[t._v("订单列表")]),a("ul",{staticClass:"food_list_ul"},t._l(t.orderDetail.basket.group[0],(function(e){return a("li",{key:e.key},[a("p",{staticClass:"food_name ellipsis"},[t._v(t._s(e.name))]),a("div",{staticClass:"quantity_price"},[a("span",[t._v("X"+t._s(e.quantity))]),a("span",[t._v("¥"+t._s(e.price))])])])})),0),a("div",{staticClass:"deliver_fee"},[a("span",[t._v("餐盒费")]),a("span",[t._v("¥"+t._s(t.orderDetail.basket.packing_fee.price*t.orderDetail.basket.packing_fee.quantity||0))])]),a("div",{staticClass:"deliver_fee"},[a("span",[t._v("配送费")]),a("span",[t._v("¥"+t._s(t.orderDetail.basket.deliver_fee&&t.orderDetail.basket.deliver_fee.price||0))])]),a("div",{staticClass:"pay_ment"},[t._v("实付"+t._s(t.orderDetail.total_amount.toFixed(2)))])]),a("section",{staticClass:"order_detail_style"},[a("header",[t._v("配送信息")]),a("section",{staticClass:"item_style"},[a("p",{staticClass:"item_left"},[t._v("送达时间：")]),a("div",{staticClass:"item_right"},[a("p",[t._v(t._s(t.orderData.deliver_time))])])]),a("section",{staticClass:"item_style"},[a("p",{staticClass:"item_left"},[t._v("送货地址：")]),a("div",{staticClass:"item_right"},[a("p",[t._v(t._s(t.orderData.consignee))]),a("p",[t._v(t._s(t.orderData.phone))]),a("p",[t._v(t._s(t.orderData.address))])])]),t._m(0)]),a("section",{staticClass:"order_detail_style"},[a("header",[t._v("订单信息")]),a("section",{staticClass:"item_style"},[a("p",{staticClass:"item_left"},[t._v("订单号：")]),a("div",{staticClass:"item_right"},[a("p",[t._v(t._s(t.orderDetail.id))])])]),t._m(1),a("section",{staticClass:"item_style"},[a("p",{staticClass:"item_left"},[t._v("下单时间：")]),a("div",{staticClass:"item_right"},[a("p",[t._v(t._s(t.orderDetail.formatted_created_at))])])])])]),a("transition",{attrs:{name:"loading"}},[t.showLoading?a("loading"):t._e()],1)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"item_style"},[a("p",{staticClass:"item_left"},[t._v("配送方式：")]),a("div",{staticClass:"item_right"},[a("p",[t._v("蜂鸟专送")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"item_style"},[a("p",{staticClass:"item_left"},[t._v("支付方式：")]),a("div",{staticClass:"item_right"},[a("p",[t._v("在线支付")])])])}],r=(a("96cf"),a("1da1")),n=a("5530"),o=a("bf93"),l=a("2f62"),c=a("bdaa"),_=a("51be"),d={components:{loading:o["a"]},data:function(){return{showLoading:!0,orderData:null,imgBaseUrl:_["a"]}},computed:Object(n["a"])({},Object(l["d"])(["orderDetail","geohash","userInfo"])),mounted:function(){this.initData()},methods:{initData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.userInfo&&t.userInfo.user_id&&t.orderDetail.user_id)){e.next=5;break}return e.next=3,Object(c["k"])(t.orderDetail.user_id,t.orderDetail.unique_id).then((function(e){t.orderData=e.data,t.showLoading=!1,console.log(t.orderData)}));case 3:e.next=6;break;case 5:t.$router.push("/profile");case 6:case"end":return e.stop()}}),e)})))()}},watch:{userInfo:function(t){t&&t.user_id&&this.initData()}}},u=d,v=(a("702d"),a("2877")),p=Object(v["a"])(u,s,i,!1,null,"2316229e",null);e["default"]=p.exports},ef94:function(t,e,a){"use strict";var s=a("c51e"),i=a.n(s);i.a}}]);
//# sourceMappingURL=orderDetail.d67acf97.js.map