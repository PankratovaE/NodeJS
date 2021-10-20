const http = require('http');
const path = require('path');
const fs = require('fs');

(async () => {
    const isFile = (filePath) => fs.lstatSync(filePath).isFile();

    http.createServer((req, res) => {
        // console.log(req.url);
        const fullPath = path.join(process.cwd(), req.url);
        // console.log(fullPath);
        if (!fs.existsSync(fullPath)) return res.end('Not found');
        if (isFile(fullPath)) return fs.createReadStream(fullPath).pipe(res);
        let linkList = '';
        fs.readdirSync(fullPath).forEach(fileName => {
            // console.log(fileName);
            const filePath = path.join(req.url, fileName);
            // console.log(filePath);
            linkList += `<li><a href="${filePath}">${fileName}</a></li>`;
        });
        const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('##li', linkList);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        return res.end(HTML);
    }).listen(5555);
})();