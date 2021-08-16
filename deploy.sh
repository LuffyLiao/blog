  
#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
 
# 生成静态文件
npm run docs:build
 
# 进入生成的文件夹
cd docs/.vuepress/dist
# git init 官网是有这行的，但我的项目里给注释掉了，因为我是现有项目，不想每次都初始化
 
# 下面这行是官网没有的，如果是多人开发项目，务必执行此命令
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/LuffyLiao/blog.git dev:gh-pages