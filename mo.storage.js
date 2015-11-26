
/**
 * @author Cloud
 * @email xunuoi@163.com
 * 
 * LocalStorage 本地存储兼容函数
 * getItem: 获取属性
 * setItem: 设置属性
 * removeItem: 删除属性
 *
 * @API
 * localStorage.setItem('key', 'value')
 * localStorage.getItem('key')
 * localStorage.removeItem('key')
 */
 
 
(function(window, document){
    var UserData
    // 1. IE7下的UserData对象
    function getUserData(){
        UserData = {
            userData: null,
            name: location.href,
            init: function(){
                // IE7下的初始化
                if(!UserData.userData){
                    try{
                        UserData.userData = document.createElement("INPUT");
                        UserData.userData.type = "hidden";
                        UserData.userData.style.display = "none";
                        UserData.userData.addBehavior("#default#userData");
                        document.body.appendChild(UserData.userData);
                        var expires = new Date();
                        expires.setDate(expires.getDate() + 365);
                        UserData.userData.expires = expires.toUTCString();

                        return true
                    } catch(e){
                        return false;
                    }
                }
                return true;
            },
     
            setItem: function(key, value){
                if(UserData.init()){
                    UserData.userData.load(UserData.name);
                    UserData.userData.setAttribute(key, value);
                    UserData.userData.save(UserData.name);
                }
            },
     
            getItem: function(key){
                if(UserData.init()){
                    UserData.userData.load(UserData.name);
                    return UserData.userData.getAttribute(key);
                }
            },
     
            removeItem: function(key){
                if(UserData.init()){
                    UserData.userData.load(UserData.name);
                    UserData.userData.removeAttribute(key);
                    UserData.userData.save(UserData.name);
                }
            },

            clear: function() {
                if(UserData.init()){
                    UserData.userData.load(UserData.name)

                    try{
                        for (var dt in UserData.userData){

                            var keyname,
                                d = new Date();

                            d.setDate(d.getDate()-1);
                            dt.load(keyname);
                            dt.expires=d.toUTCString();
                            dt.save(keyname);
                        }
                    }catch(err){

                    }
        
                }
            }
     
        }

        return UserData
    }
 
    // 2. 兼容只支持globalStorage的浏览器
    // 使用： var storage = getLocalStorage();
    function getLocalStorage(){
        if(typeof localStorage == "object"){
            return localStorage
        } else if(typeof globalStorage == "object"){
            return globalStorage[location.href]
        } else if(typeof userData == "object"){
            return globalStorage[location.href]
        }else if(getUserData() && UserData.userData){
            return UserData
        } else{
            // console.log("不支持本地存储");
            function _empty (){}

            return {
                'setItem': _empty,
                'getItem': _empty,
                'removeItem': _empty,
                'clear': _empty
            }
        }
    }
    

    window.localStorage ? '' :  window.localStorage = getLocalStorage()
 
})(window, document);