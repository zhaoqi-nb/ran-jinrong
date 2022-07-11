#!/bin/bash
#设置变量
projectName="ranshu-finance-node"
workerNumber=1
logPath="/usr/local/servers/${projectName}/logs"
logPath_stdout="${logPath}/master-stdout.log"
logPath_stderr="${logPath}/master-stderr.log"
#设置当前目录
#日志地址
export NODE_PROJECT_LOGPATH=${logPath}
#定时任务日志地址
export NODE_SCHEDULELOGGER="${logPath}/egg-schedule.log"
#alinode日志地址
export NODE_LOG_DIR=${logPath}
#设置运行环境
export NODE_ENV=test

# 接口代理 临时添加
export API_URL="http://172.24.4.43:28580/research-finance-backend"
export PERMISSIONS_URL="http://172.24.4.43:18180/privilege/"
export LOGIN_API_URL="http://172.24.4.43:7002"
export PASSPORT_URL="http://passport.test.inc"
export CRM_URL="http://172.24.4.43:18380"
export CONTENT_MANAGE_URL="http://172.24.4.43:28980"

echo "-------------启动信息-------------------------------"
echo " 项目名称：${projectName}  worker数量：${workerNumber} 日志地址：${logPath}"

#执行命令
echo '------------静态资源打包----------------------------';
webpack --progress --config ./static/build/webpack.test.config.js
echo '------------node服务启动----------------------------';
egg-scripts start --workers=${workerNumber} --env=test  --stdout=${logPath_stdout} --stderr=${logPath_stderr} --daemon --title=${projectName}