# login

## set
    
**简要描述：** 

- 登录日志 - 写入

**请求URL：** 
- ` /api/log/login/set `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----|:---|:-----|-----|
|sw |否|int |screenWidth:屏幕宽度   |
|sh |否|int |screenHeight:屏幕高度  |
|iw |否|int | |
|ih |否| | |
|ua |否| | |
|store |否| | |
| |否| | |

 **返回示例**

``` 
  {
    "error_code": 0,
    "data": {
      "uid": "1",
      "username": "12154545",
      "name": "吴系挂",
      "groupid": 2 ,
      "reg_time": "1436864169",
      "last_login_time": "0",
    }
  }
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|groupid |int   |用户组id，1：超级管理员；2：普通用户  |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述




