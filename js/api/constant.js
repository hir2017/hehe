/**
 * http错误码
 */
export default {
    errCode: [{
            id: 'DATA_NULL',
            status: 10011,
            message: '数据为空'
        }, {
            id: 'COMMON_PARAM_BLANK',
            status: 0,
            message: '参数为空'
        }, {
            id: 'USER_TOKEN_ERROR',
            status: 9999,
            message: 'token验证失败'
        }, {
            id: 'SQL_SQLINJECT_ERROR',
            status: 9998,
            message: '防sql注入捕获'
        }, {
            id: 'USER_PWDORUNAME_ERROR',
            status: 401,
            message: '用户名或密码错误或者为空'
        }, {
            id: 'USER_AUTHCODE_EXPIRED',
            status: 402,
            message: '验证码过期'
        }, {
            id: 'USER_AUTHCODE_ERROR',
            status: 403,
            message: '验证码错误'
        }, {
            id: 'USER_FDPASSWORDAU_ERROR',
            status: 456,
            message: '交易密码格式不正确'
        }, {
            id: 'USER_FDANDLOGINSAME_ERROR',
            status: 477,
            message: '交易密码与登录密码相同'
        },
        // 登录模块, login
        {
            id: 'USER_AUTH_BY_GA',
            status: 5555,
            message: '请进行谷歌认证'
        },
        {
            id: 'USER_NOT_AUTH_GA',
            status: 5554,
            message: '未进行谷歌认证'
        },
        {
            id: 'USER_AUTH_CODE_TIMEOUT',
            status: 5556,
            message: '验证码超时,请重新登录'
        },
        {
            id: 'USER_AUTH_BY_PHONE',
            status: 5557,
            message: '请进行手机认证'
        },
        {
            id: 'USER_AUTH_BY_GA_FAIL',
            status: 5558,
            message: '谷歌密码输入有误'
        },
        {
            id: 'USER_AUTH_CODE_FAIL',
            status: 5559,
            message: '验证码错误,请重新登录'
        },
        {
            id: 'UNAME_OR_PASSWORD_ERROR',
            status: 405,
            message: '用户名或密码错误'
        }, {
            id: 'USER_USEREXIST',
            status: 406,
            message: '用户已存在'
        }, {
            id: 'USER_USERBANNED',
            status: 407,
            message: '用户已禁用,请联系管理员'
        }, {
            id: 'USER_REGISTERERROR',
            status: 408,
            message: '注册失败'
        }, {
            id: 'USER_FINDPWD_NOUSER',
            status: 409,
            message: '用户不存在'
        }, {
            id: 'USER_RESRTPWD_FAIL',
            status: 410,
            message: '重置密码失败'
        }, {
            id: 'USER_RESETPHONE_FAIL',
            status: 410,
            message: '重置手机号失败'
        }, {
            id: 'USER_IMGCODE_ERROR',
            status: 412,
            message: '图片验证码错误'
        }, {
            id: 'USER_BIND_EMAIL_FORMAT_ERROR',
            status: 413,
            message: '邮箱格式错误'
        }, {
            id: 'USER_BIND_EMAIL_ERROR_EXIST',
            status: 414,
            message: '邮箱已经被绑定'
        }, {
            id: 'UPLOAD_FILE_ERROR',
            status: 415,
            message: '文件上传失败'
        }, {
            id: 'USER_AUTH_UPDATE_ERROR',
            status: 416,
            message: '资料有误，请重新填写'
        }, {
            id: 'USER_BIND_EMAIL_ERROR',
            status: 417,
            message: '邮箱绑定失败'
        }, {
            id: 'USER_QUESTION_RECORD_NOT_EXIST',
            status: 418,
            message: '用户提问记录不存在'
        }, {
            id: 'USER_QUESTION_AUTH_ERROR',
            status: 419,
            message: '用户无权限删除此记录'
        }, {
            id: 'USER_QUESTION_SELECTAUTH_ERROR',
            status: 4190,
            message: '用户无权限查看此记录'
        }, {
            id: 'USER_PWD_EMAIL_ERROR',
            status: 420,
            message: '重置密码邮件发送失败'
        }, {
            id: 'USER_PHONE_EXIST',
            status: 421,
            message: '手机号已经被使用'
        }, {
            id: 'USER_QUESTION_OP_ERROR',
            status: 422,
            message: '用户操作反馈问题失败'
        }, {
            id: 'USER_PHONE_INCORRECT',
            status: 422,
            message: '输入的手机号码不正确'
        }, {
            id: 'USER_CODE_INCORRECT',
            status: 423,
            message: '输入验证码不正确'
        }, {
            id: 'USER_AUTHCODE_FORMATERROR',
            status: 423,
            message: '验证码格式有误'
        }, {
            id: 'USER_PWD_EMAIL_ISOTHERS',
            status: 424,
            message: '不是本人邮箱,请确认!'
        }, {
            id: 'USER_ADDRESS_SET_FAIL',
            status: 43000,
            message: '用户已经设置过'
        }, {
            id: 'USER_NOT_LOGIN',
            status: 430,
            message: '用户未登录'
        }, {
            id: 'USER_PASSWORD_CHECKED',
            status: 443,
            message: '请输入8-16位密码'
        }, {
            id: 'USER_AUTH_HASCOMMIT',
            status: 444,
            message: '用户已经提交过'
        }, {
            id: 'USER_PHONE_ERROR',
            status: 511,
            message: '手机格式错误'
        }, {
            id: 'USER_NOTEXIST',
            status: 512,
            message: '用户不存在'
        }, {
            id: 'USER_UNAME_NOTMATCH',
            status: 514,
            message: '用户名格式不正确'
        }, {
            id: 'USER_UNAME_ISSAME',
            status: 515,
            message: '新用户名与原用户名相同'
        },
        //找回密码相关
        {
            id: 'USER_OLDPWD_ERROR',
            status: 555,
            message: '用户原密码错误'
        },
        // 认证相关
        {
            id: 'USER_NOT_AUTH',
            status: 41700,
            message: '用户未认证'
        }, {
            id: 'USER_AUTH_REFUSED',
            status: 41701,
            message: '认证被拒绝'
        }, {
            id: 'USER_AUTH_REVIEW',
            status: 41702,
            message: '认证审核中'
        }, {
            id: 'USER_AUTH_CHECK_OK',
            status: 41703,
            message: '审核通过'
        }, {
            id: 'USER_NOT_AUTH_LEVELA',
            status: 41711,
            message: '认证级别不是A'
        },
        {
            id: 'USER_NOT_AUTH_LEVELB',
            status: 41712,
            message: '认证级别不是B'
        }, {
            id: 'USER_NOT_AUTH_LEVELC',
            status: 41713,
            message: '认证级别不是C'
        },
        {
            id: 'VIDEO_AUTH_MONEY_REFUSED',
            status: 41731,
            message: '认证C资金不足'
        }, {
            id: 'VIDEO_UPLOAD_ERROR',
            status: 41801,
            message: '认证视频上传失败'
        },
        {
            id: 'VIDEO_URL_UPDATE_ERROR',
            status: 41802,
            message: '视频地址更新失败'
        }, {
            id: 'USER_LOGIN_ERROR',
            status: 455,
            message: '您已连续多次输入错误密码， 请五分钟后重试'
        },
        {
            id: 'USER_RENAME_FAIL',
            status: 466,
            message: '更改用户名失败'
        }, {
            id: 'USER_FDPASSWORD_ERROR',
            status: 467,
            message: '绑定交易密码失败'
        },
        {
            id: 'USER_FDPASSWORD_NOTMATCH',
            status: 468,
            message: '交易密码错误'
        },
        {
            id: 'SMS_SEND_OK',
            status: 567,
            message: '短信发送成功'
        }, {
            id: 'MAIL_SEND_OK',
            status: 568,
            message: '邮件发送成功'
        },
        {
            id: 'MAIL_SEND_ERROR',
            status: 569,
            message: '邮件发送失败'
        }, {
            id: 'LOGIN_RISK_LIST',
            status: 570,
            message: '无登录限制用户'
        },
        {
            id: 'SENIOR_RISK_LIST',
            status: 571,
            message: '无验证限制用户'
        },
        {
            id: 'POSTCODE_ERROR',
            status: 699,
            message: '邮编格式有误'
        },
        {
            id: 'VIRTUAL_TRADE_SUCCESS',
            status: 580,
            message: '虚拟交易成功'
        },
        {
            id: 'VIRTUAL_TRADE_FAIL',
            status: 581,
            message: '虚拟交易失败'
        },
        {
            id: 'QSK_DETAIL_LENGTHERROR',
            status: 600,
            message: '反馈内容过长'
        }, {
            id: 'REDIS_CON_ERROR',
            status: 20000,
            message: 'Redis连接失败'
        }, {
            id: 'SYSTEM_ERROR',
            status: 10000,
            message: '系统错误'
        }, {
            id: 'SMS_SEND_NOTEXPRIED',
            status: 502,
            message: '发送短信操作频繁,请稍后再试'
        }, {
            id: 'SMS_SEND_ERROR',
            status: 501,
            message: '短信发送失败'
        }
    ]
}
