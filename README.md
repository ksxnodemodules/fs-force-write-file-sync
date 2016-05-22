
# fs-force-write-file-sync

## Requirements

 * Node >= 6.0.0

## Usage

```javascript
var mkfileSync = require('fs-force-mkfile-sync');
try {
    let info = mkfileSync('./a/b/c/d', 'Hello, World!!');
    console.log('Succeed');
} catch (error) {
    console.log('Failed', info);
}
```

The code above would:
 * First, do [`force-mkdir`](https://www.npmjs.com/package/fs-force-mkdir-sync) to create a directory `'./a/b/c'`
 * Then, do [`fs.writeFileSync`](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options) to create file `'./a/b/c/d'` with content `'Hello, World!!'`

## License

[MIT](https://github.com/ksxnodemodules/my-licenses/blob/master/MIT.md) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
