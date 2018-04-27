const tiniKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxx'
const tinify = require('tinify');
const fs = require('fs');
const path = require('path');

function tinyFile(filePath) {
	let source = tinify.fromFile(filePath);
	source.toFile(filePath);
}

function tinyFolder(folder) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(folder, function(error, files) {
        if (error) {
            console.warn(error)
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                let fileorfolder = path.join(folder, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(fileorfolder, function(stat_error, stats) {
                    if (stat_error) {
                        console.warn('获取文件stats失败');
                    } else {
                        let isFile = stats.isFile();//是文件
                        let isDir = stats.isDirectory();//是文件夹
                        if (isFile) {
                            let ext = path.extname(fileorfolder);
                            if (['.png', '.jpg'].indexOf(ext) !== -1) {
                            	console.log('tiny image: ' + fileorfolder);
                            	tinyFile(fileorfolder);
                            }
                        }
                        if (isDir) {
                            tinyFolder(fileorfolder);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                });
            });
        }
    });
}

tinify.key = tiniKey;
let folder = process.argv[2];
console.log('tiny folder: ' + folder);
tinyFolder(folder);