const RESET = '\x1b[0m';
const LIGHT_GREEN = '\x1b[92m';
const YELLOW = '\x1b[33m';
const LIGHT_BLUE = '\x1b[94m';
const RED = '\x1b[31m';
const GRAYISH = '\x1b[37m';

const nodeLogger = ({logHeaders = false, logBody = false}) => ((req, res, next) => {
    const arrow = `${GRAYISH}==> `;
    const arrow2 = `${GRAYISH}> `;
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const method = req.method;
    const url = req.url;

    let methodColor;
    switch (method) {
        case 'GET':
            methodColor = LIGHT_GREEN;
            break;
        case 'POST':
            methodColor = YELLOW;
            break;
        case 'DELETE':
            methodColor = RED;
            break;
        case 'PUT':
            methodColor = LIGHT_BLUE;
            break;
        default:
            methodColor = RESET;
    }

    const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    console.log(`\n${arrow}[${formattedTimestamp}] Incoming request: ${methodColor}${method}${RESET} ${GRAYISH}${url}${RESET} from ${ip}`);

    logHeaders && console.log(`${arrow2}Headers: ${JSON.stringify(req.headers)}`);
    logBody && console.log(`${arrow2}Body: ${JSON.stringify(req.body)}`);

    res.on('finish', () => {
        const statusCode = res.statusCode;
        let statusColor;
        if (statusCode >= 300) {
            statusColor = RED;
        } else {
            statusColor = LIGHT_GREEN;
        }
        console.log(`${GRAYISH}[${formattedTimestamp}] Response status to ${methodColor}${method}${RESET} ${GRAYISH}${url}${RESET}: ${statusColor}${statusCode}${RESET}`);
    });

    next();
});

module.exports = nodeLogger;
