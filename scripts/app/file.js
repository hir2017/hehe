/**
 * 导出多语言文件
 */
var GoogleSpreadsheet = require('google-spreadsheet');
var Promise = require('bluebird');
var stringify = require('json-stable-stringify');
var filetool = require('./filetool');
var fs = require('fs');

var languages = [
    'zh-CN', 'zh-TW', 'zh-HK', 'ar-EG', 'vi-VN', 'en-US',
    'fr-FR', 'ko-KR', 'ru-RU', 'ja-JP', 'ar-SA', 'bg-BG',
    'hr-HR', 'cs-CZ', 'da-DK', 'nl-NL', 'et-EE', 'fi-FI',
    'de-DE', 'el-GR', 'he-IL', 'hu-HU', 'it-IT', 'lv-LV',
    'nb-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'sr-Latn-CS',
    'sk-SK', 'sl-SI', 'es-ES', 'sv-SE', 'th-TH', 'tr-TR',
    'uk-UA', 'yo-NG', 'cy-GB', 'uz-Latn-UZ', 'ur-PK', 'te-IN',
    'tt-RU', 'ta-IN', 'si-LK', 'tn-ZA', 'nso-ZA', 'sr-Cyrl-CS',
    'quz-PE', 'pa-IN', 'fa-IR', 'or-IN', 'nn-NO', 'ne-NP',
    'mr-IN', 'mi-NZ', 'mt-MT', 'ml-IN', 'ms-MY', 'ms-BN',
    'mk-MK', 'lb-LU', 'ky-KG', 'kok-IN', 'sw-KE', 'km-KH',
    'kk-KZ', 'kn-IN', 'zu-ZA', 'xh-ZA', 'ga-IE', 'iu-Latn-CA',
    'id-ID', 'ig-NG', 'is-IS', 'hi-IN', 'ha-Latn-NG', 'gu-IN',
    'ka-GE', 'gl-ES', 'fil-PH', 'ca-ES', 'bs-Latn-BA', 'bs-Cyrl-BA',
    'bn-IN', 'bn-BD', 'eu-ES', 'az-Latn-AZ', 'as-IN', 'hy-AM', 'am-ET',
    'sq-AL', 'af-ZA'
];

var exportLangFile = {
    main: function(cfg) {
        var self = this;
        var split = cfg.split;
        var cwd = process.cwd();
        var package = require(cwd + '/package.json');
        var spreadsheetId = package.googleSpreadsheetId;
        var googleWorksheet = package.googleWorksheet || 0; // 从0开始
        var fileContent = package.googleFileExport || 'module.exports'

        if (cfg.multi) {
            for (var entername in googleWorksheet) {
                var self = this;
                (function() {
                    var _entername = entername;
                    var sheetTitle = googleWorksheet[entername];
                    self.spreadsheetToJson({
                            spreadsheetId: spreadsheetId,
                            vertical: true,
                            hash: 'key',
                            worksheet: sheetTitle
                        })
                        .then(function(res) {
                            // 获取JSON数据
                            // TODO 导出到指定的文件目录中
                            self.save(res, fileContent, cfg, _entername);
                        })
                        .catch(function(err) {
                            console.log(err);
                        })
                })();


            }
            return;
        }
        if (spreadsheetId) {
            console.log(spreadsheetId, googleWorksheet);
            this.spreadsheetToJson({
                    spreadsheetId: spreadsheetId,
                    vertical: true,
                    hash: 'key',
                    worksheet: googleWorksheet
                })
                .then(function(res) {
                    // 获取JSON数据
                    // TODO 导出到指定的文件目录中
                    self.save(res, fileContent, cfg);
                })
                .catch(function(err) {
                    console.log(err);
                })
        } else {
            console.log('googleSpreadsheetId未配置，请在package.json中进行配置');
        }
    },

    save: function(data, fileContent, cfg, entername) {
        var gsfile = process.cwd() + '/js/lang/' + (entername ? (entername + '/') : '') + 'pack.js';
        var split = cfg.split;

        var content = stringify(data, { space: '    ' });

        content = fileContent + '=' + content;

        filetool.writefile(gsfile, content);

        // console.log('++++++++++++++++++++++++++++++++', split);
        if (split) {
            this.splitFile(content, gsfile);
        }
        console.log('多语言文件已生成:' + ' ==========> ' + (gsfile));

        this.check(content);
    },

    /**
     * 验证google是否有不匹配的key
     * 1、google中哪种语言，哪个key没有被翻译
     * 2、google中缺少哪个key
     * 3、google中哪个key在代码中没有被使用
     */
    check: function(content) {
        const keyfile = process.cwd() + '/js/lang/keys';
        let exsitKeys = [];

        if (filetool.isFile(keyfile)) {
            // array keys文件中的字段
            exsitKeys = fs.readFileSync(keyfile, 'utf-8').split('\n');
        } else {
            console.log('请先执行：zenbone lang key 提取多语言包keys');
            return;
        }

        if (exsitKeys.length <= 1) {
            console.log('请先执行：zenbone lang key提取多语言包keys');
            return;
        }

        content = JSON.parse(content.replace('module.exports=', ''));

        let remains = [];

        for (let i in content) {
            let data = content[i];
            let list = [...exsitKeys];


            for (let j in data) {
                let idx = list.indexOf(j + '');

                if (idx > -1) {
                    list.splice(idx, 1)
                } else {
                    remains[remains.length] = j;
                }
            }
            console.log('========================== ' + i + ' ========================')
            console.log('--- Google中多余的keys有：' + remains.length + '个，极客精神，可适当优化');
            console.log('--- Google中缺少或者没有被翻译的keys ===> ');
            console.log(list.length > 0 ? list.join('\n') : 'very good，多语言全部完成啦');
        }
    },


    splitFile(content, _path) {
        content = JSON.parse(content.replace('module.exports=', ''));
        var itemPath;
        for (var i in content) {
            itemPath = _path.replace('pack', i);
            // console.log(content[i])
            filetool.writefile(itemPath, 'module.exports=' + stringify(content[i], {
                space: '    '
            }) + ';');
            console.log('多语言文件已生成:' + ' ==========> ' + (itemPath));
        }
    },

    cellsToJson: function(cells, options) {
        options = options || {};

        var rowProp = options.vertical ? 'col' : 'row';
        var colProp = options.vertical ? 'row' : 'col';
        var isHashed = options.hash && !options.listOnly;
        var includeHeaderAsValue = options.listOnly && options.includeHeader;
        var finalList = isHashed ? {} : [];

        // organizing (and ordering) the cells into arrays

        var rows = cells.reduce(function(rows, cell) {
            var rowIndex = cell[rowProp] - 1;

            if (typeof rows[rowIndex] === 'undefined')
                rows[rowIndex] = [];
            rows[rowIndex].push(cell);
            return rows;
        }, []);

        var cols = cells.reduce(function(cols, cell) {
            var colIndex = cell[colProp] - 1;

            if (typeof cols[colIndex] === 'undefined')
                cols[colIndex] = [];
            cols[colIndex].push(cell);
            return cols;
        }, []);
        // find the first row with data to use it as property names

        for (var firstRowIndex = 0; firstRowIndex < rows.length; firstRowIndex++) {
            if (rows[firstRowIndex])
                break;
        }

        // creating the property names map (to detect the name by index)

        var properties = (rows[firstRowIndex] || []).reduce(function(properties, cell) {
            if (typeof cell.value !== 'string' || cell.value === '')
                return properties;

            properties[cell[colProp]] = (cell.value || '').trim();

            return properties;
        }, {});

        // removing first rows, before and including (or not) the one that is used as property names
        rows.splice(0, firstRowIndex + (includeHeaderAsValue ? 0 : 1));

        // iterating through remaining row to fetch the values and build the final data object

        rows.forEach(function(cells) {

            var newObject = options.listOnly ? [] : {};
            var hasValues = false;

            cells.forEach(function(cell) {
                var val;
                var colNumber = cell[colProp];

                if (!options.listOnly && !properties[colNumber])
                    return;

                if (typeof cell.numericValue !== 'undefined') {
                    val = parseFloat(cell.numericValue);
                    hasValues = true;
                } else if (cell.value === 'TRUE') {
                    val = true;
                    hasValues = true;
                } else if (cell.value === 'FALSE') {
                    val = false;
                    hasValues = true;
                } else if (cell.value !== '' && typeof cell.value !== 'undefined') {
                    val = cell.value;
                    hasValues = true;
                }

                if (properties[colNumber] == options.hash) {
                    newObject[options.hash] = val;
                } else {
                    if (!newObject.data) {
                        newObject.data = {};
                    }
                    if (options.listOnly)
                        newObject['data'][colNumber - 1] = val;
                    else
                        newObject['data'][properties[colNumber]] = val;
                }
            });

            if (hasValues) {
                if (isHashed) {
                    var key = newObject[options.hash];
                    console.log(key);
                    if (languages.indexOf(key) > -1) {
                        key = key.replace('-', '').toLowerCase();
                        finalList[key] = newObject.data;
                    } else {
                        return;
                    }

                } else {
                    finalList.push(newObject);
                }
            }
        });

        return finalList;
    },

    spreadsheetToJson: function(options) {
        var self = this;

        return this.getWorksheets(options)
            .then(function(worksheets) {
                var identifiers = normalizeWorksheetIdentifiers(options.worksheet);

                var selectedWorksheets = worksheets.filter(function(worksheet, index) {
                    return identifiers.indexOf(index) !== -1 || identifiers.indexOf(worksheet.title) !== -1;
                });

                // if an array is not passed here, expects only first result
                if (!Array.isArray(options.worksheet)) {
                    selectedWorksheets = selectedWorksheets.slice(0, 1);
                    if (selectedWorksheets.length === 0)
                        throw new Error('No worksheet found!');
                }

                return selectedWorksheets;
            })
            .then(function(worksheets) {
                return Promise.all(worksheets.map(function(worksheet) {
                    return worksheet.getCellsAsync();
                }));
            })
            .then(function(results) {
                var finalList = results.map(function(cells) {
                    return self.cellsToJson(cells, options);
                });

                if (Array.isArray(options.worksheet)) {
                    var result = {};
                    for (var i = finalList.length; i--;) { // 前面的sheet覆盖后面
                        var finalListItem = finalList[i];
                        for (var key in finalListItem) {
                            var value = finalListItem[key]
                            if (result[key]) {
                                result[key] = MergeRecursive(result[key], value);
                            } else {
                                result[key] = value;
                            }
                        }
                    }
                    return result;
                } else {
                    return finalList[0];
                }
            });
    },

    getWorksheets: function(options) {
        return Promise.try(function() {

                var spreadsheet = Promise.promisifyAll(new GoogleSpreadsheet(options.spreadsheetId));

                if (options.token) {

                    spreadsheet.setAuthToken({
                        value: options.token,
                        type: options.tokentype || 'Bearer'
                    });

                } else if (options.user && options.password) {

                    return spreadsheet.setAuthAsync(options.user, options.password).return(spreadsheet);

                }
                return spreadsheet;
            })
            .then(function(spreadsheet) {
                return spreadsheet.getInfoAsync();
            })
            .then(function(sheetInfo) {
                return sheetInfo.worksheets.map(function(worksheet) {
                    return Promise.promisifyAll(worksheet);
                });
            });
    }
}

function MergeRecursive(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }
        } catch (e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;
}

function normalizeWorksheetIdentifiers(option) {

    if (typeof option === 'undefined')
        return [0];

    if (!Array.isArray(option))
        return [option];

    return option;
}

module.exports = exportLangFile;