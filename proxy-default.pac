//block hosts by company firewall
var comHostsList = [
    'gw-ec.com',
    'hqygou.com',
    //'globalegrow.com',
    'apidoc.gearbest-beta.com',
    'kibana2.egomsl.com',
    'egomsl',
    'rms110',
    '192.168.0.229',
    '119.81.140.227',
    '10.60.50.68',
    '10.40',
]

//block hosts by great-wall
var blockHostsList = [
    'google',
    'twitter.com',
    'youtube.com',
    'docker.com',
    'wikipedia',
    '.wiki',
    'php.net',
    'atlassian',
    'alpinelinux',
    'cloudfront.net',
    'gstatic',
    'cldup',
    'cloudup',
    'vimeo.com',
    'quora',
    'gohugo.io',
    'snapchat',
    'golang',
    'go-zh.org',
    'gopherchina',
    'programming.guide',
    'appspot.com',
    'amazonaws.com',
    'github',
    'gitbooks',
    'brew',
    'twimg',
    'jetbrains.com',
    'highlightjs.org',
    'privoxy.org',
    'haproxy.org',
    'apple.com',
    'lintut.com',
    'facebook',
    'stackoverflow.com',
    'disqus',
    'vagrantup.com',
    'hashicorp.com',
    'tsyndicate',
    'segment.com',
    'ahcdn.com',
    'ytimg.com',
    'ruanyifeng.com',
    'wangbase.com',
    'rawgit',
    'cn.linux.vbird.org',
    'marketo.net',
    'dropbox.com',
    'ggpht.com',
    'doubleclick',
    'goo.gl',
    'mongodb',
    'potatso.com',
]

var proxyIp = '127.0.0.1'
var hkProxyPort = 10443
var tkProxyPort = 18180

var proxyList = [
    //Proxy By HkProxy
    {
        ip: proxyIp,
        port: hkProxyPort,
        hosts: blockHostsList,
    },
    //Proxy By TkProxy
    {
        ip: proxyIp,
        port: tkProxyPort,
        hosts: comHostsList,
    },
]

/**
 * get a appropriate proxy
 *
 * @param url request url
 * @param host request host
 * @returns {*}
 * @constructor
 */
function FindProxyForURL (url, host) {

    // 查看设置的block
    for (let i = 0; i < proxyList.length; i++) {
        let pxy = proxyList[i]

        for (let j = 0; j < pxy.hosts.length; j++) {
            if (host.indexOf(pxy.hosts[j]) !== -1) {
                return 'SOCKS5 ' + pxy.ip + ':' + pxy.port
            }
        }
    }

    //其他情况不走代理
    return 'DIRECT'
}
