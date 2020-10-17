          //定义变量
			let oTxt = document.getElementById("txt");
			let oList = document.getElementById("list");
			let oBtn = document.getElementById("btn");
			let src11 = "";
         //单击输入框
			oTxt.oninput = ()=>{
				oList.style.display = "block";
				let val = oTxt.value;
				var oScript = document.createElement("script");
				//
				oScript.src = "https://suggest.taobao.com/sug?code=utf-8&q="+val+"&callback=jsonp&area=c2c";
				document.body.appendChild(oScript);
            }
            
          //函数封装 使用跨域来获取数据
			function jsonp(data){
				/*console.log(data)
                            console.log(data.magic)*/
				data1 = data.result;
				data2 = data.magic;
				let str ="";
				for(let i = 0;i<data1.length;i++){
					str +="<li><a href='https://s.taobao.com/search?q="+data1[i][0]+"'>"+data1[i][0]+"</a></li>";
				}
				oList.innerHTML = str;
				console.log(str)
				//data.magic 数组,爆款的个数（箭头）有几个，数组长度就是多少
				//data.magic[j] 数组里是对象
				//data.magic[j].index 对象里的index属性，取得二级菜单
				//data.magic[j].data[m] 对象里的data属性，是一个数组
				//data.magic[j].data[m][k] data 里的    对象
				//data.magic[j].data[m][k].title 名字
				//data.magic[j].data[m][k].type 热卖
 
				if(data2){
					/*console.log(data2[0])//{index: "1", type: "tag_group", data: Array(3)}
                     console.log(data2.length)
                     console.log(data2[0].index)// 1
                     console.log(data2[0].data)  //[Array(2), Array(2), Array(6)]
                     console.log(data2[0].data[0])    //(2) [{…}, {…}]
                     console.log(data2[0].data[0][0].title) //{title: "短款"}
                      console.log(data2.length)*/
 
					//创建二级菜单的ul
					for(var j=0;j<data2.length;j++){
						var oUl = document.createElement("ul");
						oUl.className = "ul2";
						/*console.log([oList.children[data2[j].index-1]])*/
 
						//把ul放入对应的一级菜单li里，由于li没有，用oList.children
						oList.children[data2[j].index-1].appendChild(oUl);
						//在对应li中添加符号>
						//在有二级菜单的一级后面加个符号：为什么会是.children[0]是因为这个一级本身就有HTML内容节点，选中这个节点，以+=字符拼接上去；
						oList.children[data2[j].index-1].children[0].innerHTML += "&gt;";
 
 
						//遍历data2[0].data
						for(var m=0;m<data2[j].data.length;m++){
							//遍历data2[0].data[m]中的每一个数据
							for(var k=0;k<data2[j].data[m].length;k++){
								//创建二级菜单中的li
								let oLi = document.createElement("li");
								oLi.className = "li2";
								oUl.appendChild(oLi);
								//将li变为超链接，所以要创建a
								let oA = document.createElement("a");
								oLi.appendChild(oA);
								//选择路径，给到oA,使其能够跳转到相应的页面
								//console.log(data2[j].data[m][k].title)
								oA.href = "https://s.taobao.com/search?q="+data2[j].data[m][k].title;
								//将取到的数据显示在页面上，否则，页面上二级菜单的li里将会为空
								oA.innerHTML = data2[j].data[m][k].title;
								//给有type的添加类名，让字体变红， hover为任意的类名，不是划过
								if(data2[j].data[m][k].type){
									oA.className = "hover";
								}
							}
							oUl.innerHTML+="<br/><br/>"
						}
					}
				}
			}
			oBtn.onclick = function(){
				location.href = "https://s.taobao.com/search?q="+oTxt.value;
			}

