exports.getWebpackConfig = (args, config) => {
    // 判断版本 aus|ace
    const _argvs = args.slice(2);
    let app_version = _argvs.indexOf('--aus') !== -1 ? 'aus' : 'ace';
    // 输出路径
    config.output.path += `/${app_version}`;
    // 对应入口文件
    config.entry.webapp = [`./js/app-${app_version}.js`];
    // 对应html模板
    try {
        config.plugins[0].options.template = `./template/index-${app_version}.html`;
    } catch (error) {
        console.error('getWebpackConfig[scripts/util.js]: aus html模板替换失败', error);
    }
    return {
        app_version,
        config
    }
}
