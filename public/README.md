
## 1.file watcher

#### 2.1 SASS的设置
##### 2.1.1 [Arguments]
```
--no-cache --style compressed --update $FileName$:$ProjectFileDir$\public\stylesheets\css\$FileDirPathFromParent(scss)$$FileNameWithoutExtension$.css
```

##### 2.1.2 [Output paths to refresh]
```
$ProjectFileDir$\public\stylesheets\css\$FileDirPathFromParent(scss)$$FileNameWithoutExtension$.css
```

#### 2.2 browserify的设置

##### 2.2.0 参考[给WebStorm添加FileWatcher支持Browserify](http://blog.meathill.com/tech/devtools/add-file-watcher-for-webstorm-to-support-browserify.html)

##### 2.2.1 Scope 设置为dd528_web
  * 应将需要链入的index.js单个include到scope的目录中
  
##### 2.2.2 Arguments
```
index.js -o .\bundle.min.js --debug
```

##### 2.2.3 Working directory
```
$ProjectFileDir$\public\javascript\$FileDirPathFromParent(javascript)$
```

##### 2.2.4 Output paths to refresh
```
$ProjectFileDir$\public\src\
```

## 2.文档说明
* JavaScript 存放js源码
* lib 存放库文件
* src 存放压缩后min的js
* stylesheets 存放css和sass源码
