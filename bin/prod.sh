#!/bin/bash
#设置变量
projectName="ranshu-finance-node"
workerNumber=4
logPath="/data/app/${projectName}/log"
logPath_stdout="${logPath}/master-stdout.log"
logPath_stderr="${logPath}/master-stderr.log"
#设置当前目录
#日志地址
export NODE_PROJECT_LOGPATH=${logPath}
#定时任务日志地址
export NODE_SCHEDULELOGGER="${logPath}/egg-schedule.log"
#alinode日志地址
export NODE_LOG_DIR=${logPath}

# 接口代理 临时添加
export API_URL="http://172.24.4.37:82/research-finance-backend"
export PERMISSIONS_URL="http://172.24.4.37:80/privilege/"
export LOGIN_API_URL="http://172.24.4.37:85"
export PASSPORT_URL="https://passport.databurning.com"
export CRM_URL="http://172.24.4.37:84"

# redis 地址
export REDIS_HOST="172.24.4.4"

#设置运行环境
export NODE_ENV=production

echo "-------------启动信息-------------------------------"
echo " 项目名称：${projectName}  worker数量：${workerNumber}  日志地址：${logPath} \n"

#执行命令
echo '------------静态资源打包----------------------------';
webpack --progress --config ./static/build/webpack.prod.config.js
echo '------------node服务启动----------------------------';
egg-scripts start --workers=${workerNumber} --env=prod  --stdout=${logPath_stdout} --stderr=${logPath_stderr} --daemon --title=${projectName}