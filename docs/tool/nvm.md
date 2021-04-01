---
title: nvm - node管理工具
date: 2021-04-01 15:53:21
sidebar: 'auto'
categories: 
 - 工具
---
### nvm：node版本管理工具(mac)
在终端输入以下命令：

```bash   
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```
给`.zshrc`文件添加环境变量
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

如果没有`.zshrc`文件，则自己建立一个即可
```bash
nvm --version   // nvm版本
nvm ls         // node list 清单
nvm use 8.0.0  // 使用node 8.0.0版本
```

设置node默认版本
```bash
nvm alias default v14.15.0
```
