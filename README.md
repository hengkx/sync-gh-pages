# 同步gh-pages

由于国内网络问题，导致一些开源项目的帮助文档无法访问，所以写了一个自动同步文档的小工具。

## 安装

```bash
npm install -g sync-gh-pages
# or
npm install -g https://github.com/hengkx/sync-gh-pages.git
```

## 使用

> 使用需要先建一个`gh-pages.json`配置文件

```js
{
    "url": "https://codeload.github.com/ant-design/ant-design/zip/gh-pages",// gh-pages链接
    "port": 11001,// 端口
    "schedule": "* */1 * * *"// 定时执行  
}
```

* 关于`schedule`[请参阅](https://github.com/node-schedule/node-schedule)

> 执行`gh-pages`命令即可