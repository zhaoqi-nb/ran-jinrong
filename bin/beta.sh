#!/bin/bash
#设置变量
projectName="ranshu-finance-node-beta"
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
export NODE_ENV=beta

# 接口代理 临时添加
export API_URL="http://172.19.228.109:28580/research-finance-backend"
export PERMISSIONS_URL="http://172.19.228.109:18180/privilege/"
export LOGIN_API_URL="http://172.19.228.132"
export PASSPORT_URL="http://beta.passport.databurning.com"
export CRM_URL="http://172.24.4.37:84"

echo "-------------关闭服务信息-------------------------------"
egg-scripts stop  --title=${projectName}

echo "-------------启动信息-------------------------------"
echo " 项目名称：${projectName}  worker数量：${workerNumber} 日志地址：${logPath}"

#执行命令
echo '------------静态资源打包----------------------------';
webpack --progress --config ./static/build/webpack.beta.config.js
echo '------------node服务启动----------------------------';
egg-scripts start --workers=${workerNumber} --env=beta  --stdout=${logPath_stdout} --stderr=${logPath_stderr} --daemon --title=${projectName}