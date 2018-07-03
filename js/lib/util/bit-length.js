/**
 * @file 获取一个串的bit长度(兼容中文的解析)
 */
module.exports = function(str) {
	if (!str) {
		return 0;
	}
	var aMatch = str.match(/[^\x00-\xff]/g);
	return (str.length + (!aMatch ? 0 : aMatch.length));
};
