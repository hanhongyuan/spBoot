/**
 * MD5算法
 */
var MD5 = {
    safe_add : function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    },
    bit_rol : function(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    },
    md5_cmn : function(q, a, b, x, s, t) {
        return MD5.safe_add(MD5.bit_rol(MD5.safe_add(MD5.safe_add(a, q), MD5.safe_add(x, t)), s), b);
    },
    md5_ff : function(a, b, c, d, x, s, t) {
        return MD5.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    },
    md5_gg : function(a, b, c, d, x, s, t) {
        return MD5.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    },
    md5_hh : function(a, b, c, d, x, s, t) {
        return MD5.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    },
    md5_ii : function(a, b, c, d, x, s, t) {
        return MD5.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    },
    binl_md5 : function(x, len) {
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = MD5.md5_ff(a, b, c, d, x[i], 7, -680876936);
            d = MD5.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = MD5.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = MD5.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = MD5.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = MD5.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = MD5.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = MD5.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = MD5.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = MD5.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = MD5.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = MD5.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = MD5.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = MD5.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = MD5.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = MD5.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = MD5.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = MD5.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = MD5.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = MD5.md5_gg(b, c, d, a, x[i], 20, -373897302);
            a = MD5.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = MD5.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = MD5.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = MD5.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = MD5.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = MD5.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = MD5.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = MD5.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = MD5.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = MD5.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = MD5.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = MD5.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = MD5.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = MD5.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = MD5.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = MD5.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = MD5.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = MD5.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = MD5.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = MD5.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = MD5.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = MD5.md5_hh(d, a, b, c, x[i], 11, -358537222);
            c = MD5.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = MD5.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = MD5.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = MD5.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = MD5.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = MD5.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = MD5.md5_ii(a, b, c, d, x[i], 6, -198630844);
            d = MD5.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = MD5.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = MD5.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = MD5.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = MD5.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = MD5.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = MD5.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = MD5.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = MD5.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = MD5.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = MD5.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = MD5.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = MD5.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = MD5.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = MD5.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = MD5.safe_add(a, olda);
            b = MD5.safe_add(b, oldb);
            c = MD5.safe_add(c, oldc);
            d = MD5.safe_add(d, oldd);
        }
        return [ a, b, c, d ];
    },
    binl2rstr : function(input) {
        var i, output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    },
    rstr2binl : function(input) {
        var i, output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    },
    rstr_md5 : function(s) {
        return MD5.binl2rstr(MD5.binl_md5(MD5.rstr2binl(s), s.length * 8));
    },
    rstr_hmac_md5 : function(key, data) {
        var i, bkey = MD5.rstr2binl(key), ipad = [], opad = [], hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = MD5.binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = MD5.binl_md5(ipad.concat(MD5.rstr2binl(data)), 512 + data.length * 8);
        return MD5.binl2rstr(MD5.binl_md5(opad.concat(hash), 512 + 128));
    },
    rstr2hex : function(input) {
        var hex_tab = '0123456789abcdef', output = '', x, i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
        }
        return output;
    },
    str2rstr_utf8 : function(input) {
        return unescape(encodeURIComponent(input));
    },
    raw_md5 : function(s) {
        return MD5.rstr_md5(MD5.str2rstr_utf8(s));
    },
    hex_md5 : function(s) {
        return MD5.rstr2hex(MD5.raw_md5(s));
    },
    raw_hmac_md5 : function(k, d) {
        return MD5.rstr_hmac_md5(MD5.str2rstr_utf8(k), MD5.str2rstr_utf8(d));
    },
    hex_hmac_md5 : function(k, d) {
        return MD5.rstr2hex(MD5.raw_hmac_md5(k, d));
    },
    /**
     * 加密
     */
    encode : function(string, key, raw) {
        if (!key) {
            if (!raw) {
                return MD5.hex_md5(string);
            } else {
                return MD5.raw_md5(string);
            }
        }
        if (!raw) {
            return MD5.hex_hmac_md5(key, string);
        } else {
            return MD5.raw_hmac_md5(key, string);
        }
    }
};