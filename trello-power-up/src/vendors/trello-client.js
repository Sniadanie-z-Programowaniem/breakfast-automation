/* eslint-disable */
/**
 * Trello client.js requires jQuery
 */
import jquery from 'jquery';
window.jQuery = jquery;

/**
 * @file Copy of Trello client.js with limited tweaks
 *  - hardcoded script URL
 *  - app key from env vars instead of script URL query params
 *
 * @see https://trello.com/1/client.js
 * @see https://developer.atlassian.com/cloud/trello/guides/client-js/getting-started-with-client-js/
 */
(function () {
    var u = new URL('https://trello.com/1/client.js');
    var o = u.origin;
    if (u.host.substring(0, 4) === 'api.') {
        o = u.protocol + '//' + u.host.substring(4, u.host.length);
    }
    var opts = {
        authEndpoint: o,
        intentEndpoint: o,
        apiEndpoint: u.hostname === 'trello.com' ? 'https://api.trello.com' : o,
        version: 1,
        key: import.meta.env.VITE_TRELLO_API_KEY,
        token: u.searchParams.get('token'),
    };
    (() => {
        'use strict';
        function e(e, n) {
            return (
                (function (e) {
                    if (Array.isArray(e)) return e;
                })(e) ||
                (function (e, t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) {
                        var n = [],
                            r = !0,
                            o = !1,
                            a = void 0;
                        try {
                            for (
                                var i, c = e[Symbol.iterator]();
                                !(r = (i = c.next()).done) &&
                                (n.push(i.value), !t || n.length !== t);
                                r = !0
                            );
                        } catch (e) {
                            (o = !0), (a = e);
                        } finally {
                            try {
                                r || null == c.return || c.return();
                            } finally {
                                if (o) throw a;
                            }
                        }
                        return n;
                    }
                })(e, n) ||
                t(e, n) ||
                (function () {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function t(e, t) {
            if (e) {
                if ('string' == typeof e) return n(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return (
                    'Object' === r && e.constructor && (r = e.constructor.name),
                    'Map' === r || 'Set' === r
                        ? Array.from(e)
                        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? n(e, t)
                        : void 0
                );
            }
        }
        function n(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
            return r;
        }
        var r = function (e) {
                return 'function' == typeof e;
            },
            o = {};
        !(function (n, a, i) {
            for (
                var c,
                    u,
                    s = a,
                    l = i.key,
                    f = i.token,
                    d = i.apiEndpoint,
                    h = i.authEndpoint,
                    p = i.intentEndpoint,
                    v = i.version,
                    y = ''.concat(d, '/').concat(v, '/'),
                    m = n.location,
                    g = function (e) {
                        var t = { response_type: 'token', key: l };
                        return ''
                            .concat(h, '/')
                            .concat(v, '/authorize?')
                            .concat(s.param(s.extend(t, e)));
                    },
                    b = function () {
                        var t = arguments.length <= 0 ? void 0 : arguments[0],
                            n = e(t, 4),
                            o = n[0],
                            a = n[1],
                            i = n[2],
                            c = n[3];
                        return (
                            r(a) && ((c = i), (i = a), (a = {})),
                            [(o = o.replace(new RegExp('^/*'), '')), a, i, c]
                        );
                    },
                    w = {
                        version: function () {
                            return v;
                        },
                        key: function () {
                            return l;
                        },
                        setKey: function (e) {
                            l = e;
                        },
                        token: function () {
                            return f;
                        },
                        setToken: function (e) {
                            f = e;
                        },
                        rest: function (t) {
                            for (
                                var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1;
                                o < n;
                                o++
                            )
                                r[o - 1] = arguments[o];
                            var a = b(r),
                                i = e(a, 4),
                                c = i[0],
                                u = i[1],
                                d = i[2],
                                h = i[3],
                                p = {
                                    url: ''.concat(y).concat(c),
                                    type: t,
                                    data: {},
                                    dataType: 'json',
                                    success: d,
                                    error: h,
                                };
                            return (
                                l && (p.data.key = l),
                                f && (p.data.token = f),
                                null != u && s.extend(p.data, u),
                                s.ajax(p)
                            );
                        },
                        authorized: function () {
                            return null != f;
                        },
                        deauthorize: function () {
                            u('token', (f = null));
                        },
                        authorize: function (e) {
                            var a = s.extend(
                                    !0,
                                    {
                                        type: 'redirect',
                                        persist: !0,
                                        interactive: !0,
                                        scope: { read: !0, write: !1, account: !1 },
                                        expiration: '30days',
                                    },
                                    e,
                                ),
                                i = /[&#]?token=([0-9a-f]{64})/,
                                l = function () {
                                    a.persist && null != f && u('token', f);
                                };
                            if ((a.persist && null == f && (f = c('token')), null == f)) {
                                var d = i.exec(m.hash);
                                d && (f = d[1]);
                            }
                            if (this.authorized())
                                return (
                                    l(),
                                    (m.hash = m.hash.replace(i, '')),
                                    void (r(a.success) && a.success())
                                );
                            if (a.interactive) {
                                var p = Object.keys(a.scope || {})
                                    .reduce(function (e, t) {
                                        return a.scope[t] && e.push(t), e;
                                    }, [])
                                    .join(',');
                                switch (a.type) {
                                    case 'popup':
                                        !(function () {
                                            var e, i;
                                            (i = function (e) {
                                                if (e)
                                                    return l(), void (r(a.success) && a.success());
                                                r(a.error) && a.error();
                                            }),
                                                o[(e = 'authorized')] || (o[e] = []),
                                                o[e].push(i);
                                            var c = n.screenX + (n.innerWidth - 720) / 2,
                                                u = n.screenY + (n.innerHeight - 800) / 2,
                                                s = new RegExp('^[a-z]+://[^/]*').exec(m),
                                                d = s && s[0],
                                                v = n.open(
                                                    g({
                                                        return_url: d,
                                                        callback_method: 'postMessage',
                                                        scope: p,
                                                        expiration: a.expiration,
                                                        name: a.name,
                                                    }),
                                                    'trello',
                                                    'width='
                                                        .concat(720, ',height=')
                                                        .concat(800, ',left=')
                                                        .concat(c, ',top=')
                                                        .concat(u),
                                                );
                                            r(n.addEventListener) &&
                                                n.addEventListener(
                                                    'message',
                                                    function e(a) {
                                                        a.origin === h &&
                                                            a.source === v &&
                                                            (null != a.source && a.source.close(),
                                                            (f =
                                                                null != a.data &&
                                                                /[0-9a-f]{64}/.test(a.data)
                                                                    ? a.data
                                                                    : null),
                                                            r(n.removeEventListener) &&
                                                                n.removeEventListener(
                                                                    'message',
                                                                    e,
                                                                    !1,
                                                                ),
                                                            (function (e, n) {
                                                                if (o[e]) {
                                                                    var r = o[e];
                                                                    delete o[e];
                                                                    var a,
                                                                        i = (function (e, n) {
                                                                            var r;
                                                                            if (
                                                                                'undefined' ==
                                                                                    typeof Symbol ||
                                                                                null ==
                                                                                    e[
                                                                                        Symbol
                                                                                            .iterator
                                                                                    ]
                                                                            ) {
                                                                                if (
                                                                                    Array.isArray(
                                                                                        e,
                                                                                    ) ||
                                                                                    (r = t(e))
                                                                                ) {
                                                                                    r && (e = r);
                                                                                    var o = 0,
                                                                                        a =
                                                                                            function () {};
                                                                                    return {
                                                                                        s: a,
                                                                                        n: function () {
                                                                                            return o >=
                                                                                                e.length
                                                                                                ? {
                                                                                                      done: !0,
                                                                                                  }
                                                                                                : {
                                                                                                      done: !1,
                                                                                                      value: e[
                                                                                                          o++
                                                                                                      ],
                                                                                                  };
                                                                                        },
                                                                                        e: function (
                                                                                            e,
                                                                                        ) {
                                                                                            throw e;
                                                                                        },
                                                                                        f: a,
                                                                                    };
                                                                                }
                                                                                throw new TypeError(
                                                                                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                                                                                );
                                                                            }
                                                                            var i,
                                                                                c = !0,
                                                                                u = !1;
                                                                            return {
                                                                                s: function () {
                                                                                    r =
                                                                                        e[
                                                                                            Symbol
                                                                                                .iterator
                                                                                        ]();
                                                                                },
                                                                                n: function () {
                                                                                    var e =
                                                                                        r.next();
                                                                                    return (
                                                                                        (c =
                                                                                            e.done),
                                                                                        e
                                                                                    );
                                                                                },
                                                                                e: function (e) {
                                                                                    (u = !0),
                                                                                        (i = e);
                                                                                },
                                                                                f: function () {
                                                                                    try {
                                                                                        c ||
                                                                                            null ==
                                                                                                r.return ||
                                                                                            r.return();
                                                                                    } finally {
                                                                                        if (u)
                                                                                            throw i;
                                                                                    }
                                                                                },
                                                                            };
                                                                        })(r);
                                                                    try {
                                                                        for (
                                                                            i.s();
                                                                            !(a = i.n()).done;

                                                                        )
                                                                            (0, a.value)(n);
                                                                    } catch (e) {
                                                                        i.e(e);
                                                                    } finally {
                                                                        i.f();
                                                                    }
                                                                }
                                                            })('authorized', w.authorized()));
                                                    },
                                                    !1,
                                                );
                                        })();
                                        break;
                                    default:
                                        n.location = g({
                                            redirect_uri: m.href,
                                            callback_method: 'fragment',
                                            scope: p,
                                            expiration: a.expiration,
                                            name: a.name,
                                        });
                                }
                            } else r(a.error) && a.error();
                        },
                        addCard: function (e, t) {
                            var o = { mode: 'popup', source: l || n.location.host },
                                a = function (t) {
                                    r(n.addEventListener) &&
                                        n.addEventListener(
                                            'message',
                                            function e(r) {
                                                n.removeEventListener('message', e);
                                                try {
                                                    var o = JSON.parse(r.data);
                                                    if (o.success) return void t(null, o.card);
                                                    t(new Error(o.error));
                                                } catch (e) {}
                                            },
                                            !1,
                                        );
                                    var a = n.screenX + (n.outerWidth - 500) / 2,
                                        i = n.screenY + (n.outerHeight - 600) / 2;
                                    return n.open(
                                        ''.concat(p, '/add-card?').concat(s.param(s.extend(o, e))),
                                        'trello',
                                        'width='
                                            .concat(500, ',height=')
                                            .concat(600, ',left=')
                                            .concat(a, ',top=')
                                            .concat(i),
                                    );
                                };
                            if (null == t)
                                return n.Promise
                                    ? new Promise(function (e, t) {
                                          return a(function (n, r) {
                                              n ? t(n) : e(r);
                                          });
                                      })
                                    : void a(function () {});
                            a(t);
                        },
                    },
                    E = function () {
                        var e = x[k];
                        w[e.toLowerCase()] = function () {
                            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                                n[r] = arguments[r];
                            return this.rest.apply(this, [e].concat(n));
                        };
                    },
                    k = 0,
                    x = ['GET', 'PUT', 'POST', 'DELETE'];
                k < x.length;
                k++
            )
                E();
            w.del = w.delete;
            for (
                var S = function () {
                        var e = z[j];
                        w[e] = {
                            get: function (t, n, r, o) {
                                return w.get(''.concat(e, '/').concat(t), n, r, o);
                            },
                        };
                    },
                    j = 0,
                    z = [
                        'actions',
                        'cards',
                        'checklists',
                        'boards',
                        'lists',
                        'members',
                        'organizations',
                        'lists',
                    ];
                j < z.length;
                j++
            )
                S();
            n.Trello = w;
            var A = n.localStorage;
            if (null != A) {
                var L = 'trello_';
                (c = function (e) {
                    return A[L + e];
                }),
                    (u = function (e, t) {
                        if (null !== t)
                            try {
                                A[L + e] = t;
                            } catch (e) {}
                        else delete A[L + e];
                    });
            } else (c = function () {}), (u = function () {});
        })(window, jQuery, opts);
    })();
})();
