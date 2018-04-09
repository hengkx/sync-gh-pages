#!/usr/bin/env node

const download = require('download');
const moment = require('moment');
const decompress = require('decompress');
const path = require('path');
const fs = require('fs-extra');
const serve = require('serve');
const schedule = require('node-schedule');

const cfgPath = path.join(process.cwd(), 'gh-pages.json');

if (!fs.existsSync(cfgPath)) {
    console.log('gh-pages.json 配置文件不存在');
    process.exit(0);
}

const config = fs.readJsonSync(cfgPath);

const ghPagesDir = path.join(process.cwd(), 'gh-pages');
fs.mkdirpSync(ghPagesDir);

async function downloadFile() {
    const filename = `${moment().format('YYYY-MM-DD HH:mm:ss')}.zip`;
    console.log('begin download');
    await download(config.url, 'gh-pages-temp', { filename })
    console.log('end download');
    decompress(path.join('gh-pages-temp', filename), ghPagesDir, { strip: 1 })
}

const server = serve(ghPagesDir, {
    port: config.port,
    // ignore: ['node_modules']
})

downloadFile();

schedule.scheduleJob(config.schedule, async function () {
    console.log('downloadFile');
    await downloadFile();
});

// dl.pipe(process.stdout);
// const app = express();

// app.use(compression());
// console.log(path.join(process.cwd(), 'gh-pages'));
// app.use('/', express.static(path.join(process.cwd(), 'gh-pages')));

// app.get('*', function (req, res) {
//     res.sendFile(path.resolve('index.html'));
// });

// app.listen(11001, function () {
//     console.log('Example app listening on port 11001!');
// });
