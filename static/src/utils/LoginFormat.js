import { i18n } from '@/components/FastIntl';

export default (id) => {
  const Format = {
    '申请产品试用': i18n.format("申请产品试用"),
    '中文': i18n.format("中文"),
    '扫码登录': i18n.format("扫码登录"),
    '密码登录': i18n.format("密码登录"),
    '重置密码': i18n.format("重置密码"),
  
    '账号': i18n.format("账号"),
    '请输入账号': i18n.format("请输入账号"),
    '密码': i18n.format("密码"),
    '请输入密码': i18n.format("请输入密码"),
    '验证码': i18n.format("验证码"),
    '请输入验证码': i18n.format("请输入验证码"),
    '点击获取': i18n.format("重新获取"),
    '验证码已发送到邮箱': i18n.format("验证码已发送到邮箱"),
    '验证码已发送到邮箱、手机': i18n.format("验证码已发送到邮箱、手机"),
    '忘记密码': i18n.format("忘记密码"),
    '登录': i18n.format("登录"),
    '我已阅读并同意': i18n.format("我已阅读并同意"),
    '用户协议': i18n.format("用户协议"),
    '和': i18n.format("和"),
    '隐私政策': i18n.format("隐私政策"),
    '登录成功': i18n.format("登录成功"),
  
    '新密码': i18n.format("新密码"),
    '两次密码不一致': i18n.format("两次密码不一致"),
    '确认新密码': i18n.format("确认新密码"),
    '提交': i18n.format("提交"),
    '重置成功': i18n.format('重置成功'),
    '返回登录': i18n.format("返回登录"),
  
    '请使用微信扫描二维码登录': i18n.format("请使用微信扫描二维码登录"),
    '二维码已失效': i18n.format("二维码已失效"),
    '点击刷新': i18n.format("点击刷新"),
    '登录即代表我已阅读并同意': i18n.format("登录即代表我已阅读并同意"),
  
    '姓名': i18n.format("姓名"),
    '密码': i18n.format("密码"),
    '邮箱': i18n.format("邮箱"),
    '手机': i18n.format("手机"),
    '公司': i18n.format("公司"),
    '账户有效期': i18n.format("账户有效期"),
    '不过期': i18n.format("不过期"),
    '修改密码': i18n.format("修改密码"),
    '原密码': i18n.format("原密码"),
    '取消': i18n.format("取消"),
    '修改成功': i18n.format("修改成功"),
  
  }
  return Format[id] || i18n.format(id)
}