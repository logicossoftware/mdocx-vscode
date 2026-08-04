"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/fflate/esm/index.mjs
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
    if (r.length)
      err(8);
    return s;
  }
}
function zipSync(data, opts) {
  if (!opts)
    opts = {};
  var r = {};
  var files = [];
  fltn(data, "", r, opts);
  var o = 0;
  var tot = 0;
  for (var fn in r) {
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var compression = p.level == 0 ? 0 : 8;
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    if (s > 65535)
      err(11);
    var d = compression ? deflateSync(file, p) : file, l = d.length;
    var c = crc();
    c.p(file);
    files.push(mrg(p, {
      size: file.length,
      crc: c.d(),
      c: d,
      f,
      m,
      u: s != fn.length || m && com.length != ms,
      o,
      compression
    }));
    o += 30 + s + exl + l;
    tot += 76 + 2 * (s + exl) + (ms || 0) + l;
  }
  var out = new u8(tot + 22), oe = o, cdl = tot - o;
  for (var i = 0; i < files.length; ++i) {
    var f = files[i];
    wzh(out, f.o, f, f.f, f.u, f.c.length);
    var badd = 30 + f.f.length + exfl(f.extra);
    out.set(f.c, f.o + badd);
    wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
  }
  wzf(out, o, files.length, cdl, oe);
  return out;
}
function unzipSync(data, opts) {
  var files = {};
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558)
      err(13);
  }
  ;
  var c = b2(data, e + 8);
  if (!c)
    return {};
  var o = b4(data, e + 16);
  var z = o == 4294967295 || c == 65535;
  if (z) {
    var ze = b4(data, e - 12);
    z = b4(data, ze) == 101075792;
    if (z) {
      c = b4(data, ze + 32);
      o = b4(data, ze + 48);
    }
  }
  var fltr = opts && opts.filter;
  for (var i = 0; i < c; ++i) {
    var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
    o = no;
    if (!fltr || fltr({
      name: fn,
      size: sc,
      originalSize: su,
      compression: c_2
    })) {
      if (!c_2)
        files[fn] = slc(data, b, b + sc);
      else if (c_2 == 8)
        files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
      else
        err(14, "unknown compression type " + c_2);
    }
  }
  return files;
}
var import_module, require2, Worker, u8, u16, i32, fleb, fdeb, clim, freb, _a, fl, revfl, _b, fd, revfd, rev, x, i, hMap, flt, i, i, i, i, fdt, i, flm, flrm, fdm, fdrm, max, bits, bits16, shft, slc, ec, err, inflt, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, deo, et, dflt, crct, crc, dopt, mrg, b2, b4, b8, wbytes, fltn, te, td, tds, dutf8, slzh, zh, z64e, exfl, wzh, wzf;
var init_esm = __esm({
  "node_modules/fflate/esm/index.mjs"() {
    import_module = require("module");
    require2 = (0, import_module.createRequire)("/");
    try {
      Worker = require2("worker_threads").Worker;
    } catch (e) {
    }
    u8 = Uint8Array;
    u16 = Uint16Array;
    i32 = Int32Array;
    fleb = new u8([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      0,
      /* unused */
      0,
      0,
      /* impossible */
      0
    ]);
    fdeb = new u8([
      0,
      0,
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      /* unused */
      0,
      0
    ]);
    clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    freb = function(eb, start) {
      var b = new u16(31);
      for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
      }
      var r = new i32(b[30]);
      for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
          r[j] = j - b[i] << 5 | i;
        }
      }
      return { b, r };
    };
    _a = freb(fleb, 2);
    fl = _a.b;
    revfl = _a.r;
    fl[28] = 258, revfl[258] = 28;
    _b = freb(fdeb, 0);
    fd = _b.b;
    revfd = _b.r;
    rev = new u16(32768);
    for (i = 0; i < 32768; ++i) {
      x = (i & 43690) >> 1 | (i & 21845) << 1;
      x = (x & 52428) >> 2 | (x & 13107) << 2;
      x = (x & 61680) >> 4 | (x & 3855) << 4;
      rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
    }
    hMap = function(cd, mb, r) {
      var s = cd.length;
      var i = 0;
      var l = new u16(mb);
      for (; i < s; ++i) {
        if (cd[i])
          ++l[cd[i] - 1];
      }
      var le = new u16(mb);
      for (i = 1; i < mb; ++i) {
        le[i] = le[i - 1] + l[i - 1] << 1;
      }
      var co;
      if (r) {
        co = new u16(1 << mb);
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
          if (cd[i]) {
            var sv = i << 4 | cd[i];
            var r_1 = mb - cd[i];
            var v = le[cd[i] - 1]++ << r_1;
            for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
              co[rev[v] >> rvb] = sv;
            }
          }
        }
      } else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
          if (cd[i]) {
            co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
          }
        }
      }
      return co;
    };
    flt = new u8(288);
    for (i = 0; i < 144; ++i)
      flt[i] = 8;
    for (i = 144; i < 256; ++i)
      flt[i] = 9;
    for (i = 256; i < 280; ++i)
      flt[i] = 7;
    for (i = 280; i < 288; ++i)
      flt[i] = 8;
    fdt = new u8(32);
    for (i = 0; i < 32; ++i)
      fdt[i] = 5;
    flm = /* @__PURE__ */ hMap(flt, 9, 0);
    flrm = /* @__PURE__ */ hMap(flt, 9, 1);
    fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
    fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
    max = function(a) {
      var m = a[0];
      for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
          m = a[i];
      }
      return m;
    };
    bits = function(d, p, m) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
    };
    bits16 = function(d, p) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
    };
    shft = function(p) {
      return (p + 7) / 8 | 0;
    };
    slc = function(v, s, e) {
      if (s == null || s < 0)
        s = 0;
      if (e == null || e > v.length)
        e = v.length;
      return new u8(v.subarray(s, e));
    };
    ec = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data"
      // determined by unknown compression method
    ];
    err = function(ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
      if (!nt)
        throw e;
      return e;
    };
    inflt = function(dat, st, buf, dict) {
      var sl = dat.length, dl = dict ? dict.length : 0;
      if (!sl || st.f && !st.l)
        return buf || new u8(0);
      var noBuf = !buf;
      var resize = noBuf || st.i != 2;
      var noSt = st.i;
      if (noBuf)
        buf = new u8(sl * 3);
      var cbuf = function(l2) {
        var bl = buf.length;
        if (l2 > bl) {
          var nbuf = new u8(Math.max(bl * 2, l2));
          nbuf.set(buf);
          buf = nbuf;
        }
      };
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      var tbts = sl * 8;
      do {
        if (!lm) {
          final = bits(dat, pos, 1);
          var type = bits(dat, pos + 1, 3);
          pos += 3;
          if (!type) {
            var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
            if (t > sl) {
              if (noSt)
                err(0);
              break;
            }
            if (resize)
              cbuf(bt + l);
            buf.set(dat.subarray(s, t), bt);
            st.b = bt += l, st.p = pos = t * 8, st.f = final;
            continue;
          } else if (type == 1)
            lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
          else if (type == 2) {
            var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
            var tl = hLit + bits(dat, pos + 5, 31) + 1;
            pos += 14;
            var ldt = new u8(tl);
            var clt = new u8(19);
            for (var i = 0; i < hcLen; ++i) {
              clt[clim[i]] = bits(dat, pos + i * 3, 7);
            }
            pos += hcLen * 3;
            var clb = max(clt), clbmsk = (1 << clb) - 1;
            var clm = hMap(clt, clb, 1);
            for (var i = 0; i < tl; ) {
              var r = clm[bits(dat, pos, clbmsk)];
              pos += r & 15;
              var s = r >> 4;
              if (s < 16) {
                ldt[i++] = s;
              } else {
                var c = 0, n = 0;
                if (s == 16)
                  n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                else if (s == 17)
                  n = 3 + bits(dat, pos, 7), pos += 3;
                else if (s == 18)
                  n = 11 + bits(dat, pos, 127), pos += 7;
                while (n--)
                  ldt[i++] = c;
              }
            }
            var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
            lbt = max(lt);
            dbt = max(dt);
            lm = hMap(lt, lbt, 1);
            dm = hMap(dt, dbt, 1);
          } else
            err(1);
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
        }
        if (resize)
          cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (; ; lpos = pos) {
          var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
          pos += c & 15;
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (!c)
            err(2);
          if (sym < 256)
            buf[bt++] = sym;
          else if (sym == 256) {
            lpos = pos, lm = null;
            break;
          } else {
            var add = sym - 254;
            if (sym > 264) {
              var i = sym - 257, b = fleb[i];
              add = bits(dat, pos, (1 << b) - 1) + fl[i];
              pos += b;
            }
            var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
            if (!d)
              err(3);
            pos += d & 15;
            var dt = fd[dsym];
            if (dsym > 3) {
              var b = fdeb[dsym];
              dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
            }
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
            if (resize)
              cbuf(bt + 131072);
            var end = bt + add;
            if (bt < dt) {
              var shift = dl - dt, dend = Math.min(dt, end);
              if (shift + bt < 0)
                err(3);
              for (; bt < dend; ++bt)
                buf[bt] = dict[shift + bt];
            }
            for (; bt < end; ++bt)
              buf[bt] = buf[bt - dt];
          }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
          final = 1, st.m = lbt, st.d = dm, st.n = dbt;
      } while (!final);
      return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
    };
    wbits = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
    };
    wbits16 = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
      d[o + 2] |= v >> 16;
    };
    hTree = function(d, mb) {
      var t = [];
      for (var i = 0; i < d.length; ++i) {
        if (d[i])
          t.push({ s: i, f: d[i] });
      }
      var s = t.length;
      var t2 = t.slice();
      if (!s)
        return { t: et, l: 0 };
      if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return { t: v, l: 1 };
      }
      t.sort(function(a, b) {
        return a.f - b.f;
      });
      t.push({ s: -1, f: 25001 });
      var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
      t[0] = { s: -1, f: l.f + r.f, l, r };
      while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l, r };
      }
      var maxSym = t2[0].s;
      for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
          maxSym = t2[i].s;
      }
      var tr = new u16(maxSym + 1);
      var mbt = ln(t[i1 - 1], tr, 0);
      if (mbt > mb) {
        var i = 0, dt = 0;
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function(a, b) {
          return tr[b.s] - tr[a.s] || a.f - b.f;
        });
        for (; i < s; ++i) {
          var i2_1 = t2[i].s;
          if (tr[i2_1] > mb) {
            dt += cst - (1 << mbt - tr[i2_1]);
            tr[i2_1] = mb;
          } else
            break;
        }
        dt >>= lft;
        while (dt > 0) {
          var i2_2 = t2[i].s;
          if (tr[i2_2] < mb)
            dt -= 1 << mb - tr[i2_2]++ - 1;
          else
            ++i;
        }
        for (; i >= 0 && dt; --i) {
          var i2_3 = t2[i].s;
          if (tr[i2_3] == mb) {
            --tr[i2_3];
            ++dt;
          }
        }
        mbt = mb;
      }
      return { t: new u8(tr), l: mbt };
    };
    ln = function(n, l, d) {
      return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
    };
    lc = function(c) {
      var s = c.length;
      while (s && !c[--s])
        ;
      var cl = new u16(++s);
      var cli = 0, cln = c[0], cls = 1;
      var w = function(v) {
        cl[cli++] = v;
      };
      for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
          ++cls;
        else {
          if (!cln && cls > 2) {
            for (; cls > 138; cls -= 138)
              w(32754);
            if (cls > 2) {
              w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
              cls = 0;
            }
          } else if (cls > 3) {
            w(cln), --cls;
            for (; cls > 6; cls -= 6)
              w(8304);
            if (cls > 2)
              w(cls - 3 << 5 | 8208), cls = 0;
          }
          while (cls--)
            w(cln);
          cls = 1;
          cln = c[i];
        }
      }
      return { c: cl.subarray(0, cli), n: s };
    };
    clen = function(cf, cl) {
      var l = 0;
      for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
      return l;
    };
    wfblk = function(out, pos, dat) {
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
      return (o + 4 + s) * 8;
    };
    wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a2 = hTree(lf, 15), dlt = _a2.t, mlb2 = _a2.l;
      var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
      var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
      var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
      var lcfreq = new u16(19);
      for (var i = 0; i < lclt.length; ++i)
        ++lcfreq[lclt[i] & 31];
      for (var i = 0; i < lcdt.length; ++i)
        ++lcfreq[lcdt[i] & 31];
      var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
      var flen = bl + 5 << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
      if (bs >= 0 && flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
        lm = hMap(dlt, mlb2, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
          wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
          var clct = lcts[it];
          for (var i = 0; i < clct.length; ++i) {
            var len = clct[i] & 31;
            wbits(out, p, llm[len]), p += lct[len];
            if (len > 15)
              wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
          }
        }
      } else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i = 0; i < li; ++i) {
        var sym = syms[i];
        if (sym > 255) {
          var len = sym >> 18 & 31;
          wbits16(out, p, lm[len + 257]), p += ll[len + 257];
          if (len > 7)
            wbits(out, p, sym >> 23 & 31), p += fleb[len];
          var dst = sym & 31;
          wbits16(out, p, dm[dst]), p += dl[dst];
          if (dst > 3)
            wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
        } else {
          wbits16(out, p, lm[sym]), p += ll[sym];
        }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
    };
    deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
    et = /* @__PURE__ */ new u8(0);
    dflt = function(dat, lvl, plvl, pre, post, st) {
      var s = st.z || dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
      var w = o.subarray(pre, o.length - post);
      var lst = st.l;
      var pos = (st.r || 0) & 7;
      if (lvl) {
        if (pos)
          w[0] = st.r >> 3;
        var opt = deo[lvl - 1];
        var n = opt >> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function(i2) {
          return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
        };
        var syms = new i32(25e3);
        var lf = new u16(288), df = new u16(32);
        var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
        for (; i + 2 < s; ++i) {
          var hv = hsh(i);
          var imod = i & 32767, pimod = head[hv];
          prev[imod] = pimod;
          head[hv] = imod;
          if (wi <= i) {
            var rem = s - i;
            if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
              pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
              li = lc_1 = eb = 0, bs = i;
              for (var j = 0; j < 286; ++j)
                lf[j] = 0;
              for (var j = 0; j < 30; ++j)
                df[j] = 0;
            }
            var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
            if (rem > 2 && hv == hsh(i - dif)) {
              var maxn = Math.min(n, rem) - 1;
              var maxd = Math.min(32767, i);
              var ml = Math.min(258, rem);
              while (dif <= maxd && --ch_1 && imod != pimod) {
                if (dat[i + l] == dat[i + l - dif]) {
                  var nl = 0;
                  for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                    ;
                  if (nl > l) {
                    l = nl, d = dif;
                    if (nl > maxn)
                      break;
                    var mmd = Math.min(dif, nl - 2);
                    var md = 0;
                    for (var j = 0; j < mmd; ++j) {
                      var ti = i - dif + j & 32767;
                      var pti = prev[ti];
                      var cd = ti - pti & 32767;
                      if (cd > md)
                        md = cd, pimod = ti;
                    }
                  }
                }
                imod = pimod, pimod = prev[imod];
                dif += imod - pimod & 32767;
              }
            }
            if (d) {
              syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
              var lin = revfl[l] & 31, din = revfd[d] & 31;
              eb += fleb[lin] + fdeb[din];
              ++lf[257 + lin];
              ++df[din];
              wi = i + l;
              ++lc_1;
            } else {
              syms[li++] = dat[i];
              ++lf[dat[i]];
            }
          }
        }
        for (i = Math.max(i, wi); i < s; ++i) {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        if (!lst) {
          st.r = pos & 7 | w[pos / 8 | 0] << 3;
          pos -= 7;
          st.h = head, st.p = prev, st.i = i, st.w = wi;
        }
      } else {
        for (var i = st.w || 0; i < s + lst; i += 65535) {
          var e = i + 65535;
          if (e >= s) {
            w[pos / 8 | 0] = lst;
            e = s;
          }
          pos = wfblk(w, pos + 1, dat.subarray(i, e));
        }
        st.i = s;
      }
      return slc(o, 0, pre + shft(pos) + post);
    };
    crct = /* @__PURE__ */ function() {
      var t = new Int32Array(256);
      for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
          c = (c & 1 && -306674912) ^ c >>> 1;
        t[i] = c;
      }
      return t;
    }();
    crc = function() {
      var c = -1;
      return {
        p: function(d) {
          var cr = c;
          for (var i = 0; i < d.length; ++i)
            cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
          c = cr;
        },
        d: function() {
          return ~c;
        }
      };
    };
    dopt = function(dat, opt, pre, post, st) {
      if (!st) {
        st = { l: 1 };
        if (opt.dictionary) {
          var dict = opt.dictionary.subarray(-32768);
          var newDat = new u8(dict.length + dat.length);
          newDat.set(dict);
          newDat.set(dat, dict.length);
          dat = newDat;
          st.w = dict.length;
        }
      }
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
    };
    mrg = function(a, b) {
      var o = {};
      for (var k in a)
        o[k] = a[k];
      for (var k in b)
        o[k] = b[k];
      return o;
    };
    b2 = function(d, b) {
      return d[b] | d[b + 1] << 8;
    };
    b4 = function(d, b) {
      return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
    };
    b8 = function(d, b) {
      return b4(d, b) + b4(d, b + 4) * 4294967296;
    };
    wbytes = function(d, b, v) {
      for (; v; ++b)
        d[b] = v, v >>>= 8;
    };
    fltn = function(d, p, t, o) {
      for (var k in d) {
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val))
          op = mrg(o, val[1]), val = val[0];
        if (val instanceof u8)
          t[n] = [val, op];
        else {
          t[n += "/"] = [new u8(0), op];
          fltn(val, n, t, o);
        }
      }
    };
    te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
    td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
    tds = 0;
    try {
      td.decode(et, { stream: true });
      tds = 1;
    } catch (e) {
    }
    dutf8 = function(d) {
      for (var r = "", i = 0; ; ) {
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length)
          return { s: r, r: slc(d, i - 1) };
        if (!eb)
          r += String.fromCharCode(c);
        else if (eb == 3) {
          c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
        } else if (eb & 1)
          r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
        else
          r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
      }
    };
    slzh = function(d, b) {
      return b + 30 + b2(d, b + 26) + b2(d, b + 28);
    };
    zh = function(d, b, z) {
      var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
      var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
      return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
    };
    z64e = function(d, b) {
      for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
        ;
      return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
    };
    exfl = function(ex) {
      var le = 0;
      if (ex) {
        for (var k in ex) {
          var l = ex[k].length;
          if (l > 65535)
            err(9);
          le += l + 4;
        }
      }
      return le;
    };
    wzh = function(d, b, f, fn, u, c, ce, co) {
      var fl2 = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
      if (ce != null)
        d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2;
      d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
        err(10);
      wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
      if (c != -1) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c < 0 ? -c - 2 : c);
        wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl2);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl2;
      if (exl) {
        for (var k in ex) {
          var exf = ex[k], l = exf.length;
          wbytes(d, b, +k);
          wbytes(d, b + 2, l);
          d.set(exf, b + 4), b += 4 + l;
        }
      }
      if (col)
        d.set(co, b), b += col;
      return b;
    };
    wzf = function(o, b, c, d, e) {
      wbytes(o, b, 101010256);
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
    };
  }
});

// node_modules/fzstd/esm/index.mjs
function decompress(dat, buf) {
  var bufs = [], nb = +!buf;
  var bt = 0, ol = 0;
  for (; dat.length; ) {
    var st = rzfh(dat, nb || buf);
    if (typeof st == "object") {
      if (nb) {
        buf = null;
        if (st.w.length == st.u) {
          bufs.push(buf = st.w);
          ol += st.u;
        }
      } else {
        bufs.push(buf);
        st.e = 0;
      }
      for (; !st.l; ) {
        var blk = rzb(dat, st, buf);
        if (!blk)
          err2(5);
        if (buf)
          st.e = st.y;
        else {
          bufs.push(blk);
          ol += blk.length;
          cpw(st.w, 0, blk.length);
          st.w.set(blk, st.w.length - blk.length);
        }
      }
      bt = st.b + st.c * 4;
    } else
      bt = st;
    dat = dat.subarray(bt);
  }
  return cct(bufs, ol);
}
var ab, u82, u162, i16, i322, slc2, fill, cpw, ec2, err2, rb, b42, rzfh, msb, rfse, rhu, dllt, dmlt, doct, b2bl, llb, llbl, mlb, mlbl, dhu, dhu4, rzb, cct;
var init_esm2 = __esm({
  "node_modules/fzstd/esm/index.mjs"() {
    ab = ArrayBuffer;
    u82 = Uint8Array;
    u162 = Uint16Array;
    i16 = Int16Array;
    i322 = Int32Array;
    slc2 = function(v, s, e) {
      if (u82.prototype.slice)
        return u82.prototype.slice.call(v, s, e);
      if (s == null || s < 0)
        s = 0;
      if (e == null || e > v.length)
        e = v.length;
      var n = new u82(e - s);
      n.set(v.subarray(s, e));
      return n;
    };
    fill = function(v, n, s, e) {
      if (u82.prototype.fill)
        return u82.prototype.fill.call(v, n, s, e);
      if (s == null || s < 0)
        s = 0;
      if (e == null || e > v.length)
        e = v.length;
      for (; s < e; ++s)
        v[s] = n;
      return v;
    };
    cpw = function(v, t, s, e) {
      if (u82.prototype.copyWithin)
        return u82.prototype.copyWithin.call(v, t, s, e);
      if (s == null || s < 0)
        s = 0;
      if (e == null || e > v.length)
        e = v.length;
      while (s < e) {
        v[t++] = v[s++];
      }
    };
    ec2 = [
      "invalid zstd data",
      "window size too large (>2046MB)",
      "invalid block type",
      "FSE accuracy too high",
      "match distance too far back",
      "unexpected EOF"
    ];
    err2 = function(ind, msg, nt) {
      var e = new Error(msg || ec2[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
        Error.captureStackTrace(e, err2);
      if (!nt)
        throw e;
      return e;
    };
    rb = function(d, b, n) {
      var i = 0, o = 0;
      for (; i < n; ++i)
        o |= d[b++] << (i << 3);
      return o;
    };
    b42 = function(d, b) {
      return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
    };
    rzfh = function(dat, w) {
      var n3 = dat[0] | dat[1] << 8 | dat[2] << 16;
      if (n3 == 3126568 && dat[3] == 253) {
        var flg = dat[4];
        var ss = flg >> 5 & 1, cc = flg >> 2 & 1, df = flg & 3, fcf = flg >> 6;
        if (flg & 8)
          err2(0);
        var bt = 6 - ss;
        var db = df == 3 ? 4 : df;
        var di = rb(dat, bt, db);
        bt += db;
        var fsb = fcf ? 1 << fcf : ss;
        var fss = rb(dat, bt, fsb) + (fcf == 1 && 256);
        var ws = fss;
        if (!ss) {
          var wb = 1 << 10 + (dat[5] >> 3);
          ws = wb + (wb >> 3) * (dat[5] & 7);
        }
        if (ws > 2145386496)
          err2(1);
        var buf = new u82((w == 1 ? fss || ws : w ? 0 : ws) + 12);
        buf[0] = 1, buf[4] = 4, buf[8] = 8;
        return {
          b: bt + fsb,
          y: 0,
          l: 0,
          d: di,
          w: w && w != 1 ? w : buf.subarray(12),
          e: ws,
          o: new i322(buf.buffer, 0, 3),
          u: fss,
          c: cc,
          m: Math.min(131072, ws)
        };
      } else if ((n3 >> 4 | dat[3] << 20) == 25481893) {
        return b42(dat, 4) + 8;
      }
      err2(0);
    };
    msb = function(val) {
      var bits2 = 0;
      for (; 1 << bits2 <= val; ++bits2)
        ;
      return bits2 - 1;
    };
    rfse = function(dat, bt, mal) {
      var tpos = (bt << 3) + 4;
      var al = (dat[bt] & 15) + 5;
      if (al > mal)
        err2(3);
      var sz = 1 << al;
      var probs = sz, sym = -1, re = -1, i = -1, ht = sz;
      var buf = new ab(512 + (sz << 2));
      var freq = new i16(buf, 0, 256);
      var dstate = new u162(buf, 0, 256);
      var nstate = new u162(buf, 512, sz);
      var bb1 = 512 + (sz << 1);
      var syms = new u82(buf, bb1, sz);
      var nbits = new u82(buf, bb1 + sz);
      while (sym < 255 && probs > 0) {
        var bits2 = msb(probs + 1);
        var cbt = tpos >> 3;
        var msk = (1 << bits2 + 1) - 1;
        var val = (dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (tpos & 7) & msk;
        var msk1fb = (1 << bits2) - 1;
        var msv = msk - probs - 1;
        var sval = val & msk1fb;
        if (sval < msv)
          tpos += bits2, val = sval;
        else {
          tpos += bits2 + 1;
          if (val > msk1fb)
            val -= msv;
        }
        freq[++sym] = --val;
        if (val == -1) {
          probs += val;
          syms[--ht] = sym;
        } else
          probs -= val;
        if (!val) {
          do {
            var rbt = tpos >> 3;
            re = (dat[rbt] | dat[rbt + 1] << 8) >> (tpos & 7) & 3;
            tpos += 2;
            sym += re;
          } while (re == 3);
        }
      }
      if (sym > 255 || probs)
        err2(0);
      var sympos = 0;
      var sstep = (sz >> 1) + (sz >> 3) + 3;
      var smask = sz - 1;
      for (var s = 0; s <= sym; ++s) {
        var sf = freq[s];
        if (sf < 1) {
          dstate[s] = -sf;
          continue;
        }
        for (i = 0; i < sf; ++i) {
          syms[sympos] = s;
          do {
            sympos = sympos + sstep & smask;
          } while (sympos >= ht);
        }
      }
      if (sympos)
        err2(0);
      for (i = 0; i < sz; ++i) {
        var ns = dstate[syms[i]]++;
        var nb = nbits[i] = al - msb(ns);
        nstate[i] = (ns << nb) - sz;
      }
      return [tpos + 7 >> 3, {
        b: al,
        s: syms,
        n: nbits,
        t: nstate
      }];
    };
    rhu = function(dat, bt) {
      var i = 0, wc = -1;
      var buf = new u82(292), hb = dat[bt];
      var hw = buf.subarray(0, 256);
      var rc = buf.subarray(256, 268);
      var ri = new u162(buf.buffer, 268);
      if (hb < 128) {
        var _a2 = rfse(dat, bt + 1, 6), ebt = _a2[0], fdt2 = _a2[1];
        bt += hb;
        var epos = ebt << 3;
        var lb = dat[bt];
        if (!lb)
          err2(0);
        var st1 = 0, st2 = 0, btr1 = fdt2.b, btr2 = btr1;
        var fpos = (++bt << 3) - 8 + msb(lb);
        for (; ; ) {
          fpos -= btr1;
          if (fpos < epos)
            break;
          var cbt = fpos >> 3;
          st1 += (dat[cbt] | dat[cbt + 1] << 8) >> (fpos & 7) & (1 << btr1) - 1;
          hw[++wc] = fdt2.s[st1];
          fpos -= btr2;
          if (fpos < epos)
            break;
          cbt = fpos >> 3;
          st2 += (dat[cbt] | dat[cbt + 1] << 8) >> (fpos & 7) & (1 << btr2) - 1;
          hw[++wc] = fdt2.s[st2];
          btr1 = fdt2.n[st1];
          st1 = fdt2.t[st1];
          btr2 = fdt2.n[st2];
          st2 = fdt2.t[st2];
        }
        if (++wc > 255)
          err2(0);
      } else {
        wc = hb - 127;
        for (; i < wc; i += 2) {
          var byte = dat[++bt];
          hw[i] = byte >> 4;
          hw[i + 1] = byte & 15;
        }
        ++bt;
      }
      var wes = 0;
      for (i = 0; i < wc; ++i) {
        var wt = hw[i];
        if (wt > 11)
          err2(0);
        wes += wt && 1 << wt - 1;
      }
      var mb = msb(wes) + 1;
      var ts = 1 << mb;
      var rem = ts - wes;
      if (rem & rem - 1)
        err2(0);
      hw[wc++] = msb(rem) + 1;
      for (i = 0; i < wc; ++i) {
        var wt = hw[i];
        ++rc[hw[i] = wt && mb + 1 - wt];
      }
      var hbuf = new u82(ts << 1);
      var syms = hbuf.subarray(0, ts), nb = hbuf.subarray(ts);
      ri[mb] = 0;
      for (i = mb; i > 0; --i) {
        var pv = ri[i];
        fill(nb, i, pv, ri[i - 1] = pv + rc[i] * (1 << mb - i));
      }
      if (ri[0] != ts)
        err2(0);
      for (i = 0; i < wc; ++i) {
        var bits2 = hw[i];
        if (bits2) {
          var code = ri[bits2];
          fill(syms, i, code, ri[bits2] = code + (1 << mb - bits2));
        }
      }
      return [bt, {
        n: nb,
        b: mb,
        s: syms
      }];
    };
    dllt = rfse(/* @__PURE__ */ new u82([
      81,
      16,
      99,
      140,
      49,
      198,
      24,
      99,
      12,
      33,
      196,
      24,
      99,
      102,
      102,
      134,
      70,
      146,
      4
    ]), 0, 6)[1];
    dmlt = rfse(/* @__PURE__ */ new u82([
      33,
      20,
      196,
      24,
      99,
      140,
      33,
      132,
      16,
      66,
      8,
      33,
      132,
      16,
      66,
      8,
      33,
      68,
      68,
      68,
      68,
      68,
      68,
      68,
      68,
      36,
      9
    ]), 0, 6)[1];
    doct = rfse(/* @__PURE__ */ new u82([
      32,
      132,
      16,
      66,
      102,
      70,
      68,
      68,
      68,
      68,
      36,
      73,
      2
    ]), 0, 5)[1];
    b2bl = function(b, s) {
      var len = b.length, bl = new i322(len);
      for (var i = 0; i < len; ++i) {
        bl[i] = s;
        s += 1 << b[i];
      }
      return bl;
    };
    llb = /* @__PURE__ */ new u82((/* @__PURE__ */ new i322([
      0,
      0,
      0,
      0,
      16843009,
      50528770,
      134678020,
      202050057,
      269422093
    ])).buffer, 0, 36);
    llbl = /* @__PURE__ */ b2bl(llb, 0);
    mlb = /* @__PURE__ */ new u82((/* @__PURE__ */ new i322([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      16843009,
      50528770,
      117769220,
      185207048,
      252579084,
      16
    ])).buffer, 0, 53);
    mlbl = /* @__PURE__ */ b2bl(mlb, 3);
    dhu = function(dat, out, hu) {
      var len = dat.length, ss = out.length, lb = dat[len - 1], msk = (1 << hu.b) - 1, eb = -hu.b;
      if (!lb)
        err2(0);
      var st = 0, btr = hu.b, pos = (len << 3) - 8 + msb(lb) - btr, i = -1;
      for (; pos > eb && i < ss; ) {
        var cbt = pos >> 3;
        var val = (dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (pos & 7);
        st = (st << btr | val) & msk;
        out[++i] = hu.s[st];
        pos -= btr = hu.n[st];
      }
      if (pos != eb || i + 1 != ss)
        err2(0);
    };
    dhu4 = function(dat, out, hu) {
      var bt = 6;
      var ss = out.length, sz1 = ss + 3 >> 2, sz2 = sz1 << 1, sz3 = sz1 + sz2;
      dhu(dat.subarray(bt, bt += dat[0] | dat[1] << 8), out.subarray(0, sz1), hu);
      dhu(dat.subarray(bt, bt += dat[2] | dat[3] << 8), out.subarray(sz1, sz2), hu);
      dhu(dat.subarray(bt, bt += dat[4] | dat[5] << 8), out.subarray(sz2, sz3), hu);
      dhu(dat.subarray(bt), out.subarray(sz3), hu);
    };
    rzb = function(dat, st, out) {
      var _a2;
      var bt = st.b;
      var b0 = dat[bt], btype = b0 >> 1 & 3;
      st.l = b0 & 1;
      var sz = b0 >> 3 | dat[bt + 1] << 5 | dat[bt + 2] << 13;
      var ebt = (bt += 3) + sz;
      if (btype == 1) {
        if (bt >= dat.length)
          return;
        st.b = bt + 1;
        if (out) {
          fill(out, dat[bt], st.y, st.y += sz);
          return out;
        }
        return fill(new u82(sz), dat[bt]);
      }
      if (ebt > dat.length)
        return;
      if (btype == 0) {
        st.b = ebt;
        if (out) {
          out.set(dat.subarray(bt, ebt), st.y);
          st.y += sz;
          return out;
        }
        return slc2(dat, bt, ebt);
      }
      if (btype == 2) {
        var b3 = dat[bt], lbt = b3 & 3, sf = b3 >> 2 & 3;
        var lss = b3 >> 4, lcs = 0, s4 = 0;
        if (lbt < 2) {
          if (sf & 1)
            lss |= dat[++bt] << 4 | (sf & 2 && dat[++bt] << 12);
          else
            lss = b3 >> 3;
        } else {
          s4 = sf;
          if (sf < 2)
            lss |= (dat[++bt] & 63) << 4, lcs = dat[bt] >> 6 | dat[++bt] << 2;
          else if (sf == 2)
            lss |= dat[++bt] << 4 | (dat[++bt] & 3) << 12, lcs = dat[bt] >> 2 | dat[++bt] << 6;
          else
            lss |= dat[++bt] << 4 | (dat[++bt] & 63) << 12, lcs = dat[bt] >> 6 | dat[++bt] << 2 | dat[++bt] << 10;
        }
        ++bt;
        var buf = out ? out.subarray(st.y, st.y + st.m) : new u82(st.m);
        var spl = buf.length - lss;
        if (lbt == 0)
          buf.set(dat.subarray(bt, bt += lss), spl);
        else if (lbt == 1)
          fill(buf, dat[bt++], spl);
        else {
          var hu = st.h;
          if (lbt == 2) {
            var hud = rhu(dat, bt);
            lcs += bt - (bt = hud[0]);
            st.h = hu = hud[1];
          } else if (!hu)
            err2(0);
          (s4 ? dhu4 : dhu)(dat.subarray(bt, bt += lcs), buf.subarray(spl), hu);
        }
        var ns = dat[bt++];
        if (ns) {
          if (ns == 255)
            ns = (dat[bt++] | dat[bt++] << 8) + 32512;
          else if (ns > 127)
            ns = ns - 128 << 8 | dat[bt++];
          var scm = dat[bt++];
          if (scm & 3)
            err2(0);
          var dts = [dmlt, doct, dllt];
          for (var i = 2; i > -1; --i) {
            var md = scm >> (i << 1) + 2 & 3;
            if (md == 1) {
              var rbuf = new u82([0, 0, dat[bt++]]);
              dts[i] = {
                s: rbuf.subarray(2, 3),
                n: rbuf.subarray(0, 1),
                t: new u162(rbuf.buffer, 0, 1),
                b: 0
              };
            } else if (md == 2) {
              _a2 = rfse(dat, bt, 9 - (i & 1)), bt = _a2[0], dts[i] = _a2[1];
            } else if (md == 3) {
              if (!st.t)
                err2(0);
              dts[i] = st.t[i];
            }
          }
          var _b2 = st.t = dts, mlt = _b2[0], oct = _b2[1], llt = _b2[2];
          var lb = dat[ebt - 1];
          if (!lb)
            err2(0);
          var spos = (ebt << 3) - 8 + msb(lb) - llt.b, cbt = spos >> 3, oubt = 0;
          var lst = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << llt.b) - 1;
          cbt = (spos -= oct.b) >> 3;
          var ost = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << oct.b) - 1;
          cbt = (spos -= mlt.b) >> 3;
          var mst = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << mlt.b) - 1;
          for (++ns; --ns; ) {
            var llc = llt.s[lst];
            var lbtr = llt.n[lst];
            var mlc = mlt.s[mst];
            var mbtr = mlt.n[mst];
            var ofc = oct.s[ost];
            var obtr = oct.n[ost];
            cbt = (spos -= ofc) >> 3;
            var ofp = 1 << ofc;
            var off = ofp + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16 | dat[cbt + 3] << 24) >>> (spos & 7) & ofp - 1);
            cbt = (spos -= mlb[mlc]) >> 3;
            var ml = mlbl[mlc] + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (spos & 7) & (1 << mlb[mlc]) - 1);
            cbt = (spos -= llb[llc]) >> 3;
            var ll = llbl[llc] + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (spos & 7) & (1 << llb[llc]) - 1);
            cbt = (spos -= lbtr) >> 3;
            lst = llt.t[lst] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << lbtr) - 1);
            cbt = (spos -= mbtr) >> 3;
            mst = mlt.t[mst] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << mbtr) - 1);
            cbt = (spos -= obtr) >> 3;
            ost = oct.t[ost] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << obtr) - 1);
            if (off > 3) {
              st.o[2] = st.o[1];
              st.o[1] = st.o[0];
              st.o[0] = off -= 3;
            } else {
              var idx = off - (ll != 0);
              if (idx) {
                off = idx == 3 ? st.o[0] - 1 : st.o[idx];
                if (idx > 1)
                  st.o[2] = st.o[1];
                st.o[1] = st.o[0];
                st.o[0] = off;
              } else
                off = st.o[0];
            }
            for (var i = 0; i < ll; ++i) {
              buf[oubt + i] = buf[spl + i];
            }
            oubt += ll, spl += ll;
            var stin = oubt - off;
            if (stin < 0) {
              var len = -stin;
              var bs = st.e + stin;
              if (len > ml)
                len = ml;
              for (var i = 0; i < len; ++i) {
                buf[oubt + i] = st.w[bs + i];
              }
              oubt += len, ml -= len, stin = 0;
            }
            for (var i = 0; i < ml; ++i) {
              buf[oubt + i] = buf[stin + i];
            }
            oubt += ml;
          }
          if (oubt != spl) {
            while (spl < buf.length) {
              buf[oubt++] = buf[spl++];
            }
          } else
            oubt = buf.length;
          if (out)
            st.y += oubt;
          else
            buf = slc2(buf, 0, oubt);
        } else if (out) {
          st.y += lss;
          if (spl) {
            for (var i = 0; i < lss; ++i) {
              buf[i] = buf[spl + i];
            }
          }
        } else if (spl)
          buf = slc2(buf, spl);
        st.b = ebt;
        return buf;
      }
      err2(2);
    };
    cct = function(bufs, ol) {
      if (bufs.length == 1)
        return bufs[0];
      var buf = new u82(ol);
      for (var i = 0, b = 0; i < bufs.length; ++i) {
        var chk = bufs[i];
        buf.set(chk, b);
        b += chk.length;
      }
      return buf;
    };
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/zstd.js
var require_zstd = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/zstd.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Module = void 0;
    var Module = typeof Module !== "undefined" ? Module : {};
    exports2.Module = Module;
    var moduleOverrides = {};
    var key;
    for (key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
      }
    }
    var arguments_ = [];
    var err3 = Module["printErr"] || console.warn.bind(console);
    for (key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
      }
    }
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    moduleOverrides = null;
    if (Module["arguments"])
      arguments_ = Module["arguments"];
    if (Module["thisProgram"])
      thisProgram = Module["thisProgram"];
    if (Module["quit"])
      quit_ = Module["quit"];
    if (typeof WebAssembly !== "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    var HEAPU8;
    var HEAP8;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      Module["HEAP8"] = HEAP8 = new Int8Array(b);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
    }
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      runtimeInitialized = true;
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var dependenciesFulfilled = null;
    function addRunDependency(id) {
      var _a2;
      runDependencies++;
      (_a2 = Module["monitorRunDependencies"]) === null || _a2 === void 0 ? void 0 : _a2.call(Module, runDependencies);
    }
    function removeRunDependency(id) {
      var _a2;
      runDependencies--;
      (_a2 = Module["monitorRunDependencies"]) === null || _a2 === void 0 ? void 0 : _a2.call(Module, runDependencies);
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      var _a2;
      (_a2 = Module["onAbort"]) === null || _a2 === void 0 ? void 0 : _a2.call(Module, what);
      what = "Aborted(" + what + ")";
      err3(what);
      ABORT = true;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      throw e;
    }
    function getWasmImports() {
      return { a: wasmImports };
    }
    function getBinaryPromise(url) {
      return fetch(url, { credentials: "same-origin" }).then(function(response) {
        if (!response["ok"]) {
          throw "failed to load wasm binary file at '" + url + "'";
        }
        return response["arrayBuffer"]();
      });
    }
    function init2(filePathOrBuf) {
      var info = getWasmImports();
      function receiveInstance(instance, module3) {
        wasmExports = instance.exports;
        wasmMemory = wasmExports["f"];
        updateMemoryViews();
        addOnInit(wasmExports["g"]);
        removeRunDependency("wasm-instantiate");
        return wasmExports;
      }
      addRunDependency("wasm-instantiate");
      function receiveInstantiationResult(result) {
        receiveInstance(result["instance"]);
      }
      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise(filePathOrBuf).then(function(binary) {
          var result = WebAssembly.instantiate(binary, info);
          return result;
        }).then(receiver, function(reason) {
          err3("failed to asynchronously prepare wasm: " + reason);
          abort(reason);
        });
      }
      function instantiateAsync() {
        if (filePathOrBuf && filePathOrBuf.byteLength > 0) {
          return WebAssembly.instantiate(filePathOrBuf, info).then(receiveInstantiationResult, function(reason) {
            err3("wasm compile failed: " + reason);
          });
        } else if (typeof WebAssembly.instantiateStreaming === "function" && typeof filePathOrBuf === "string" && typeof fetch === "function") {
          return fetch(filePathOrBuf, { credentials: "same-origin" }).then(function(response) {
            var result = WebAssembly.instantiateStreaming(response, info);
            return result.then(receiveInstantiationResult, function(reason) {
              err3("wasm streaming compile failed: " + reason);
              err3("falling back to ArrayBuffer instantiation");
              return instantiateArrayBuffer(receiveInstantiationResult);
            });
          });
        } else {
          return instantiateArrayBuffer(receiveInstantiationResult);
        }
      }
      if (Module["instantiateWasm"]) {
        try {
          var exports3 = Module["instantiateWasm"](info, receiveInstance);
          return exports3;
        } catch (e) {
          err3("Module.instantiateWasm callback failed with error: " + e);
          return false;
        }
      }
      instantiateAsync();
      return {};
    }
    var ExitStatus = class {
      constructor(status) {
        this.name = "ExitStatus";
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    };
    var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    };
    var noExitRuntime = Module["noExitRuntime"] || true;
    var __abort_js = () => abort("");
    var runtimeKeepaliveCounter = 0;
    var __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false;
      runtimeKeepaliveCounter = 0;
    };
    var timers = {};
    var handleException = (e) => {
      if (e instanceof ExitStatus || e == "unwind") {
        return EXITSTATUS;
      }
      quit_(1, e);
    };
    var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
    var _proc_exit = (code) => {
      var _a2;
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        (_a2 = Module["onExit"]) === null || _a2 === void 0 ? void 0 : _a2.call(Module, code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
    var exitJS = (status, implicit) => {
      EXITSTATUS = status;
      _proc_exit(status);
    };
    var _exit = exitJS;
    var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
    var callUserCallback = (func) => {
      if (ABORT) {
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
    var _emscripten_get_now = () => performance.now();
    var __setitimer_js = (which, timeout_ms) => {
      if (timers[which]) {
        clearTimeout(timers[which].id);
        delete timers[which];
      }
      if (!timeout_ms)
        return 0;
      var id = setTimeout(() => {
        delete timers[which];
        callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
      }, timeout_ms);
      timers[which] = { id, timeout_ms };
      return 0;
    };
    var getHeapMax = () => 2147483648;
    var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
    var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536 | 0;
      try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1;
      } catch (e) {
      }
    };
    var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    var wasmImports = {
      c: __abort_js,
      b: __emscripten_runtime_keepalive_clear,
      d: __setitimer_js,
      e: _emscripten_resize_heap,
      a: _proc_exit
    };
    var wasmExports;
    var _ZSTD_isError = Module["_ZSTD_isError"] = (a0) => (_ZSTD_isError = Module["_ZSTD_isError"] = wasmExports["h"])(a0);
    var _ZSTD_compressBound = Module["_ZSTD_compressBound"] = (a0) => (_ZSTD_compressBound = Module["_ZSTD_compressBound"] = wasmExports["i"])(a0);
    var _ZSTD_createCCtx = Module["_ZSTD_createCCtx"] = () => (_ZSTD_createCCtx = Module["_ZSTD_createCCtx"] = wasmExports["j"])();
    var _ZSTD_freeCCtx = Module["_ZSTD_freeCCtx"] = (a0) => (_ZSTD_freeCCtx = Module["_ZSTD_freeCCtx"] = wasmExports["k"])(a0);
    var _ZSTD_compress_usingDict = Module["_ZSTD_compress_usingDict"] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_ZSTD_compress_usingDict = Module["_ZSTD_compress_usingDict"] = wasmExports["l"])(a0, a1, a2, a3, a4, a5, a6, a7);
    var _ZSTD_compress = Module["_ZSTD_compress"] = (a0, a1, a2, a3, a4) => (_ZSTD_compress = Module["_ZSTD_compress"] = wasmExports["m"])(a0, a1, a2, a3, a4);
    var _ZSTD_createDCtx = Module["_ZSTD_createDCtx"] = () => (_ZSTD_createDCtx = Module["_ZSTD_createDCtx"] = wasmExports["n"])();
    var _ZSTD_freeDCtx = Module["_ZSTD_freeDCtx"] = (a0) => (_ZSTD_freeDCtx = Module["_ZSTD_freeDCtx"] = wasmExports["o"])(a0);
    var _ZSTD_getFrameContentSize = Module["_ZSTD_getFrameContentSize"] = (a0, a1) => (_ZSTD_getFrameContentSize = Module["_ZSTD_getFrameContentSize"] = wasmExports["p"])(a0, a1);
    var _ZSTD_decompress_usingDict = Module["_ZSTD_decompress_usingDict"] = (a0, a1, a2, a3, a4, a5, a6) => (_ZSTD_decompress_usingDict = Module["_ZSTD_decompress_usingDict"] = wasmExports["q"])(a0, a1, a2, a3, a4, a5, a6);
    var _ZSTD_decompress = Module["_ZSTD_decompress"] = (a0, a1, a2, a3) => (_ZSTD_decompress = Module["_ZSTD_decompress"] = wasmExports["r"])(a0, a1, a2, a3);
    var _malloc = Module["_malloc"] = (a0) => (_malloc = Module["_malloc"] = wasmExports["s"])(a0);
    var _free = Module["_free"] = (a0) => (_free = Module["_free"] = wasmExports["t"])(a0);
    var __emscripten_timeout = (a0, a1) => (__emscripten_timeout = wasmExports["v"])(a0, a1);
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun)
        run();
      if (!calledRun)
        dependenciesFulfilled = runCaller;
    };
    function run() {
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        var _a2;
        if (calledRun)
          return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT)
          return;
        initRuntime();
        (_a2 = Module["onRuntimeInitialized"]) === null || _a2 === void 0 ? void 0 : _a2.call(Module);
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(() => {
          setTimeout(() => Module["setStatus"](""), 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    Module["run"] = run;
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    Module["init"] = init2;
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/module.js
var require_module = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/module.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Module = exports2.waitInitialized = void 0;
    var zstd_1 = require_zstd();
    Object.defineProperty(exports2, "Module", { enumerable: true, get: function() {
      return zstd_1.Module;
    } });
    var initialized = (() => new Promise((resolve) => {
      zstd_1.Module.onRuntimeInitialized = resolve;
    }))();
    var waitInitialized = () => __awaiter(void 0, void 0, void 0, function* () {
      yield initialized;
    });
    exports2.waitInitialized = waitInitialized;
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/errors/index.js
var require_errors = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/errors/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isError = void 0;
    var module_1 = require_module();
    var isError = (code) => {
      const _isError = module_1.Module["_ZSTD_isError"];
      return _isError(code);
    };
    exports2.isError = isError;
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/decompress.js
var require_decompress = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/simple/decompress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decompress = void 0;
    var module_1 = require_module();
    var errors_1 = require_errors();
    var getFrameContentSize = (src, size) => {
      const getSize = module_1.Module["_ZSTD_getFrameContentSize"];
      return getSize(src, size);
    };
    var decompress3 = (buf, opts = { defaultHeapSize: 1024 * 1024 }) => {
      const malloc = module_1.Module["_malloc"];
      const src = malloc(buf.byteLength);
      module_1.Module.HEAP8.set(buf, src);
      const contentSize = getFrameContentSize(src, buf.byteLength);
      const size = contentSize === -1 ? opts.defaultHeapSize : contentSize;
      const free = module_1.Module["_free"];
      const heap = malloc(size);
      try {
        const _decompress = module_1.Module["_ZSTD_decompress"];
        const sizeOrError = _decompress(heap, size, src, buf.byteLength);
        if ((0, errors_1.isError)(sizeOrError)) {
          throw new Error(`Failed to compress with code ${sizeOrError}`);
        }
        const data = new Uint8Array(module_1.Module.HEAPU8.buffer, heap, sizeOrError).slice();
        free(heap, size);
        free(src, buf.byteLength);
        return data;
      } catch (e) {
        free(heap, size);
        free(src, buf.byteLength);
        throw e;
      }
    };
    exports2.decompress = decompress3;
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/compress.js
var require_compress = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/simple/compress.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.compress = void 0;
    var module_1 = require_module();
    var errors_1 = require_errors();
    var compressBound = (size) => {
      const bound = module_1.Module["_ZSTD_compressBound"];
      return bound(size);
    };
    var compress2 = (buf, level) => {
      const bound = compressBound(buf.byteLength);
      const malloc = module_1.Module["_malloc"];
      const compressed = malloc(bound);
      const src = malloc(buf.byteLength);
      module_1.Module.HEAP8.set(buf, src);
      const free = module_1.Module["_free"];
      try {
        const _compress = module_1.Module["_ZSTD_compress"];
        const sizeOrError = _compress(compressed, bound, src, buf.byteLength, level !== null && level !== void 0 ? level : 3);
        if ((0, errors_1.isError)(sizeOrError)) {
          throw new Error(`Failed to compress with code ${sizeOrError}`);
        }
        const data = new Uint8Array(module_1.Module.HEAPU8.buffer, compressed, sizeOrError).slice();
        free(compressed, bound);
        free(src, buf.byteLength);
        return data;
      } catch (e) {
        free(compressed, bound);
        free(src, buf.byteLength);
        throw e;
      }
    };
    exports2.compress = compress2;
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/decompress_using_dict.js
var require_decompress_using_dict = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/simple/decompress_using_dict.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decompressUsingDict = exports2.freeDCtx = exports2.createDCtx = void 0;
    var module_1 = require_module();
    var errors_1 = require_errors();
    var getFrameContentSize = (src, size) => {
      const getSize = module_1.Module["_ZSTD_getFrameContentSize"];
      return getSize(src, size);
    };
    var createDCtx = () => {
      return module_1.Module["_ZSTD_createDCtx"]();
    };
    exports2.createDCtx = createDCtx;
    var freeDCtx = (dctx) => {
      return module_1.Module["_ZSTD_freeDCtx"](dctx);
    };
    exports2.freeDCtx = freeDCtx;
    var decompressUsingDict = (dctx, buf, dict, opts = { defaultHeapSize: 1024 * 1024 }) => {
      const malloc = module_1.Module["_malloc"];
      const src = malloc(buf.byteLength);
      module_1.Module.HEAP8.set(buf, src);
      const pdict = malloc(dict.byteLength);
      module_1.Module.HEAP8.set(dict, pdict);
      const contentSize = getFrameContentSize(src, buf.byteLength);
      const size = contentSize === -1 ? opts.defaultHeapSize : contentSize;
      const free = module_1.Module["_free"];
      const heap = malloc(size);
      try {
        const _decompress = module_1.Module["_ZSTD_decompress_usingDict"];
        const sizeOrError = _decompress(dctx, heap, size, src, buf.byteLength, pdict, dict.byteLength);
        if ((0, errors_1.isError)(sizeOrError)) {
          throw new Error(`Failed to compress with code ${sizeOrError}`);
        }
        const data = new Uint8Array(module_1.Module.HEAPU8.buffer, heap, sizeOrError).slice();
        free(heap, size);
        free(src, buf.byteLength);
        free(pdict, dict.byteLength);
        return data;
      } catch (e) {
        free(heap, size);
        free(src, buf.byteLength);
        free(pdict, dict.byteLength);
        throw e;
      }
    };
    exports2.decompressUsingDict = decompressUsingDict;
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/compress_using_dict.js
var require_compress_using_dict = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/simple/compress_using_dict.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.compressUsingDict = exports2.freeCCtx = exports2.createCCtx = void 0;
    var module_1 = require_module();
    var errors_1 = require_errors();
    var compressBound = (size) => {
      const bound = module_1.Module["_ZSTD_compressBound"];
      return bound(size);
    };
    var createCCtx = () => {
      return module_1.Module["_ZSTD_createCCtx"]();
    };
    exports2.createCCtx = createCCtx;
    var freeCCtx = (cctx) => {
      return module_1.Module["_ZSTD_freeCCtx"](cctx);
    };
    exports2.freeCCtx = freeCCtx;
    var compressUsingDict = (cctx, buf, dict, level) => {
      const bound = compressBound(buf.byteLength);
      const malloc = module_1.Module["_malloc"];
      const compressed = malloc(bound);
      const src = malloc(buf.byteLength);
      module_1.Module.HEAP8.set(buf, src);
      const pdict = malloc(dict.byteLength);
      module_1.Module.HEAP8.set(dict, pdict);
      const free = module_1.Module["_free"];
      try {
        const _compress = module_1.Module["_ZSTD_compress_usingDict"];
        const sizeOrError = _compress(cctx, compressed, bound, src, buf.byteLength, pdict, dict.byteLength, level !== null && level !== void 0 ? level : 3);
        if ((0, errors_1.isError)(sizeOrError)) {
          throw new Error(`Failed to compress with code ${sizeOrError}`);
        }
        const data = new Uint8Array(module_1.Module.HEAPU8.buffer, compressed, sizeOrError).slice();
        free(compressed, bound);
        free(src, buf.byteLength);
        free(pdict, dict.byteLength);
        return data;
      } catch (e) {
        free(compressed, bound);
        free(src, buf.byteLength);
        free(pdict, dict.byteLength);
        throw e;
      }
    };
    exports2.compressUsingDict = compressUsingDict;
  }
});

// node_modules/@bokuweb/zstd-wasm/dist/common/index.node.js
var require_index_node = __commonJS({
  "node_modules/@bokuweb/zstd-wasm/dist/common/index.node.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.init = void 0;
    var module_1 = require_module();
    var init2 = () => __awaiter(void 0, void 0, void 0, function* () {
      const { readFile } = require("fs/promises");
      const { resolve } = require("path");
      const buf = yield readFile(resolve(__dirname, "./zstd.wasm"));
      module_1.Module["init"](buf);
      yield (0, module_1.waitInitialized)();
    });
    exports2.init = init2;
    __exportStar(require_decompress(), exports2);
    __exportStar(require_compress(), exports2);
    __exportStar(require_decompress_using_dict(), exports2);
    __exportStar(require_compress_using_dict(), exports2);
  }
});

// node_modules/lz4js/util.js
var require_util = __commonJS({
  "node_modules/lz4js/util.js"(exports2) {
    exports2.hashU32 = function hashU32(a) {
      a = a | 0;
      a = a + 2127912214 + (a << 12) | 0;
      a = a ^ -949894596 ^ a >>> 19;
      a = a + 374761393 + (a << 5) | 0;
      a = a + -744332180 ^ a << 9;
      a = a + -42973499 + (a << 3) | 0;
      return a ^ -1252372727 ^ a >>> 16 | 0;
    };
    exports2.readU64 = function readU64(b, n) {
      var x = 0;
      x |= b[n++] << 0;
      x |= b[n++] << 8;
      x |= b[n++] << 16;
      x |= b[n++] << 24;
      x |= b[n++] << 32;
      x |= b[n++] << 40;
      x |= b[n++] << 48;
      x |= b[n++] << 56;
      return x;
    };
    exports2.readU32 = function readU32(b, n) {
      var x = 0;
      x |= b[n++] << 0;
      x |= b[n++] << 8;
      x |= b[n++] << 16;
      x |= b[n++] << 24;
      return x;
    };
    exports2.writeU32 = function writeU32(b, n, x) {
      b[n++] = x >> 0 & 255;
      b[n++] = x >> 8 & 255;
      b[n++] = x >> 16 & 255;
      b[n++] = x >> 24 & 255;
    };
    exports2.imul = function imul(a, b) {
      var ah = a >>> 16;
      var al = a & 65535;
      var bh = b >>> 16;
      var bl = b & 65535;
      return al * bl + (ah * bl + al * bh << 16) | 0;
    };
  }
});

// node_modules/lz4js/xxh32.js
var require_xxh32 = __commonJS({
  "node_modules/lz4js/xxh32.js"(exports2) {
    var util = require_util();
    var prime1 = 2654435761;
    var prime2 = 2246822519;
    var prime3 = 3266489917;
    var prime4 = 668265263;
    var prime5 = 374761393;
    function rotl32(x, r) {
      x = x | 0;
      r = r | 0;
      return x >>> (32 - r | 0) | x << r | 0;
    }
    function rotmul32(h, r, m) {
      h = h | 0;
      r = r | 0;
      m = m | 0;
      return util.imul(h >>> (32 - r | 0) | h << r, m) | 0;
    }
    function shiftxor32(h, s) {
      h = h | 0;
      s = s | 0;
      return h >>> s ^ h | 0;
    }
    function xxhapply(h, src, m0, s, m1) {
      return rotmul32(util.imul(src, m0) + h, s, m1);
    }
    function xxh1(h, src, index) {
      return rotmul32(h + util.imul(src[index], prime5), 11, prime1);
    }
    function xxh4(h, src, index) {
      return xxhapply(h, util.readU32(src, index), prime3, 17, prime4);
    }
    function xxh16(h, src, index) {
      return [
        xxhapply(h[0], util.readU32(src, index + 0), prime2, 13, prime1),
        xxhapply(h[1], util.readU32(src, index + 4), prime2, 13, prime1),
        xxhapply(h[2], util.readU32(src, index + 8), prime2, 13, prime1),
        xxhapply(h[3], util.readU32(src, index + 12), prime2, 13, prime1)
      ];
    }
    function xxh32(seed, src, index, len) {
      var h, l;
      l = len;
      if (len >= 16) {
        h = [
          seed + prime1 + prime2,
          seed + prime2,
          seed,
          seed - prime1
        ];
        while (len >= 16) {
          h = xxh16(h, src, index);
          index += 16;
          len -= 16;
        }
        h = rotl32(h[0], 1) + rotl32(h[1], 7) + rotl32(h[2], 12) + rotl32(h[3], 18) + l;
      } else {
        h = seed + prime5 + len >>> 0;
      }
      while (len >= 4) {
        h = xxh4(h, src, index);
        index += 4;
        len -= 4;
      }
      while (len > 0) {
        h = xxh1(h, src, index);
        index++;
        len--;
      }
      h = shiftxor32(util.imul(shiftxor32(util.imul(shiftxor32(h, 15), prime2), 13), prime3), 16);
      return h >>> 0;
    }
    exports2.hash = xxh32;
  }
});

// node_modules/lz4js/lz4.js
var require_lz4 = __commonJS({
  "node_modules/lz4js/lz4.js"(exports2) {
    var xxhash = require_xxh32();
    var util = require_util();
    var minMatch = 4;
    var minLength = 13;
    var searchLimit = 5;
    var skipTrigger = 6;
    var hashSize = 1 << 16;
    var mlBits = 4;
    var mlMask = (1 << mlBits) - 1;
    var runBits = 4;
    var runMask = (1 << runBits) - 1;
    var blockBuf = makeBuffer(5 << 20);
    var hashTable = makeHashTable();
    var magicNum = 407708164;
    var fdContentChksum = 4;
    var fdContentSize = 8;
    var fdBlockChksum = 16;
    var fdVersion = 64;
    var fdVersionMask = 192;
    var bsUncompressed = 2147483648;
    var bsDefault = 7;
    var bsShift = 4;
    var bsMask = 7;
    var bsMap = {
      4: 65536,
      5: 262144,
      6: 1048576,
      7: 4194304
    };
    function makeHashTable() {
      try {
        return new Uint32Array(hashSize);
      } catch (error) {
        var hashTable2 = new Array(hashSize);
        for (var i = 0; i < hashSize; i++) {
          hashTable2[i] = 0;
        }
        return hashTable2;
      }
    }
    function clearHashTable(table) {
      for (var i = 0; i < hashSize; i++) {
        hashTable[i] = 0;
      }
    }
    function makeBuffer(size) {
      try {
        return new Uint8Array(size);
      } catch (error) {
        var buf = new Array(size);
        for (var i = 0; i < size; i++) {
          buf[i] = 0;
        }
        return buf;
      }
    }
    function sliceArray(array, start, end) {
      if (typeof array.buffer !== void 0) {
        if (Uint8Array.prototype.slice) {
          return array.slice(start, end);
        } else {
          var len = array.length;
          start = start | 0;
          start = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
          end = end === void 0 ? len : end | 0;
          end = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
          var arraySlice = new Uint8Array(end - start);
          for (var i = start, n = 0; i < end; ) {
            arraySlice[n++] = array[i++];
          }
          return arraySlice;
        }
      } else {
        return array.slice(start, end);
      }
    }
    exports2.compressBound = function compressBound(n) {
      return n + n / 255 + 16 | 0;
    };
    exports2.decompressBound = function decompressBound(src) {
      var sIndex = 0;
      if (util.readU32(src, sIndex) !== magicNum) {
        throw new Error("invalid magic number");
      }
      sIndex += 4;
      var descriptor = src[sIndex++];
      if ((descriptor & fdVersionMask) !== fdVersion) {
        throw new Error("incompatible descriptor version " + (descriptor & fdVersionMask));
      }
      var useBlockSum = (descriptor & fdBlockChksum) !== 0;
      var useContentSize = (descriptor & fdContentSize) !== 0;
      var bsIdx = src[sIndex++] >> bsShift & bsMask;
      if (bsMap[bsIdx] === void 0) {
        throw new Error("invalid block size " + bsIdx);
      }
      var maxBlockSize = bsMap[bsIdx];
      if (useContentSize) {
        return util.readU64(src, sIndex);
      }
      sIndex++;
      var maxSize = 0;
      while (true) {
        var blockSize = util.readU32(src, sIndex);
        sIndex += 4;
        if (blockSize & bsUncompressed) {
          blockSize &= ~bsUncompressed;
          maxSize += blockSize;
        } else {
          maxSize += maxBlockSize;
        }
        if (blockSize === 0) {
          return maxSize;
        }
        if (useBlockSum) {
          sIndex += 4;
        }
        sIndex += blockSize;
      }
    };
    exports2.makeBuffer = makeBuffer;
    exports2.decompressBlock = function decompressBlock(src, dst, sIndex, sLength, dIndex) {
      var mLength, mOffset, sEnd, n, i;
      sEnd = sIndex + sLength;
      while (sIndex < sEnd) {
        var token = src[sIndex++];
        var literalCount = token >> 4;
        if (literalCount > 0) {
          if (literalCount === 15) {
            while (true) {
              literalCount += src[sIndex];
              if (src[sIndex++] !== 255) {
                break;
              }
            }
          }
          for (n = sIndex + literalCount; sIndex < n; ) {
            dst[dIndex++] = src[sIndex++];
          }
        }
        if (sIndex >= sEnd) {
          break;
        }
        mLength = token & 15;
        mOffset = src[sIndex++] | src[sIndex++] << 8;
        if (mLength === 15) {
          while (true) {
            mLength += src[sIndex];
            if (src[sIndex++] !== 255) {
              break;
            }
          }
        }
        mLength += minMatch;
        for (i = dIndex - mOffset, n = i + mLength; i < n; ) {
          dst[dIndex++] = dst[i++] | 0;
        }
      }
      return dIndex;
    };
    exports2.compressBlock = function compressBlock(src, dst, sIndex, sLength, hashTable2) {
      var mIndex, mAnchor, mLength, mOffset, mStep;
      var literalCount, dIndex, sEnd, n;
      dIndex = 0;
      sEnd = sLength + sIndex;
      mAnchor = sIndex;
      if (sLength >= minLength) {
        var searchMatchCount = (1 << skipTrigger) + 3;
        while (sIndex + minMatch < sEnd - searchLimit) {
          var seq = util.readU32(src, sIndex);
          var hash = util.hashU32(seq) >>> 0;
          hash = (hash >> 16 ^ hash) >>> 0 & 65535;
          mIndex = hashTable2[hash] - 1;
          hashTable2[hash] = sIndex + 1;
          if (mIndex < 0 || sIndex - mIndex >>> 16 > 0 || util.readU32(src, mIndex) !== seq) {
            mStep = searchMatchCount++ >> skipTrigger;
            sIndex += mStep;
            continue;
          }
          searchMatchCount = (1 << skipTrigger) + 3;
          literalCount = sIndex - mAnchor;
          mOffset = sIndex - mIndex;
          sIndex += minMatch;
          mIndex += minMatch;
          mLength = sIndex;
          while (sIndex < sEnd - searchLimit && src[sIndex] === src[mIndex]) {
            sIndex++;
            mIndex++;
          }
          mLength = sIndex - mLength;
          var token = mLength < mlMask ? mLength : mlMask;
          if (literalCount >= runMask) {
            dst[dIndex++] = (runMask << mlBits) + token;
            for (n = literalCount - runMask; n >= 255; n -= 255) {
              dst[dIndex++] = 255;
            }
            dst[dIndex++] = n;
          } else {
            dst[dIndex++] = (literalCount << mlBits) + token;
          }
          for (var i = 0; i < literalCount; i++) {
            dst[dIndex++] = src[mAnchor + i];
          }
          dst[dIndex++] = mOffset;
          dst[dIndex++] = mOffset >> 8;
          if (mLength >= mlMask) {
            for (n = mLength - mlMask; n >= 255; n -= 255) {
              dst[dIndex++] = 255;
            }
            dst[dIndex++] = n;
          }
          mAnchor = sIndex;
        }
      }
      if (mAnchor === 0) {
        return 0;
      }
      literalCount = sEnd - mAnchor;
      if (literalCount >= runMask) {
        dst[dIndex++] = runMask << mlBits;
        for (n = literalCount - runMask; n >= 255; n -= 255) {
          dst[dIndex++] = 255;
        }
        dst[dIndex++] = n;
      } else {
        dst[dIndex++] = literalCount << mlBits;
      }
      sIndex = mAnchor;
      while (sIndex < sEnd) {
        dst[dIndex++] = src[sIndex++];
      }
      return dIndex;
    };
    exports2.decompressFrame = function decompressFrame(src, dst) {
      var useBlockSum, useContentSum, useContentSize, descriptor;
      var sIndex = 0;
      var dIndex = 0;
      if (util.readU32(src, sIndex) !== magicNum) {
        throw new Error("invalid magic number");
      }
      sIndex += 4;
      descriptor = src[sIndex++];
      if ((descriptor & fdVersionMask) !== fdVersion) {
        throw new Error("incompatible descriptor version");
      }
      useBlockSum = (descriptor & fdBlockChksum) !== 0;
      useContentSum = (descriptor & fdContentChksum) !== 0;
      useContentSize = (descriptor & fdContentSize) !== 0;
      var bsIdx = src[sIndex++] >> bsShift & bsMask;
      if (bsMap[bsIdx] === void 0) {
        throw new Error("invalid block size");
      }
      if (useContentSize) {
        sIndex += 8;
      }
      sIndex++;
      while (true) {
        var compSize;
        compSize = util.readU32(src, sIndex);
        sIndex += 4;
        if (compSize === 0) {
          break;
        }
        if (useBlockSum) {
          sIndex += 4;
        }
        if ((compSize & bsUncompressed) !== 0) {
          compSize &= ~bsUncompressed;
          for (var j = 0; j < compSize; j++) {
            dst[dIndex++] = src[sIndex++];
          }
        } else {
          dIndex = exports2.decompressBlock(src, dst, sIndex, compSize, dIndex);
          sIndex += compSize;
        }
      }
      if (useContentSum) {
        sIndex += 4;
      }
      return dIndex;
    };
    exports2.compressFrame = function compressFrame(src, dst) {
      var dIndex = 0;
      util.writeU32(dst, dIndex, magicNum);
      dIndex += 4;
      dst[dIndex++] = fdVersion;
      dst[dIndex++] = bsDefault << bsShift;
      dst[dIndex] = xxhash.hash(0, dst, 4, dIndex - 4) >> 8;
      dIndex++;
      var maxBlockSize = bsMap[bsDefault];
      var remaining = src.length;
      var sIndex = 0;
      clearHashTable(hashTable);
      while (remaining > 0) {
        var compSize = 0;
        var blockSize = remaining > maxBlockSize ? maxBlockSize : remaining;
        compSize = exports2.compressBlock(src, blockBuf, sIndex, blockSize, hashTable);
        if (compSize > blockSize || compSize === 0) {
          util.writeU32(dst, dIndex, 2147483648 | blockSize);
          dIndex += 4;
          for (var z = sIndex + blockSize; sIndex < z; ) {
            dst[dIndex++] = src[sIndex++];
          }
          remaining -= blockSize;
        } else {
          util.writeU32(dst, dIndex, compSize);
          dIndex += 4;
          for (var j = 0; j < compSize; ) {
            dst[dIndex++] = blockBuf[j++];
          }
          sIndex += blockSize;
          remaining -= blockSize;
        }
      }
      util.writeU32(dst, dIndex, 0);
      dIndex += 4;
      return dIndex;
    };
    exports2.decompress = function decompress3(src, maxSize) {
      var dst, size;
      if (maxSize === void 0) {
        maxSize = exports2.decompressBound(src);
      }
      dst = exports2.makeBuffer(maxSize);
      size = exports2.decompressFrame(src, dst);
      if (size !== maxSize) {
        dst = sliceArray(dst, 0, size);
      }
      return dst;
    };
    exports2.compress = function compress2(src, maxSize) {
      var dst, size;
      if (maxSize === void 0) {
        maxSize = exports2.compressBound(src.length);
      }
      dst = exports2.makeBuffer(maxSize);
      size = exports2.compressFrame(src, dst);
      if (size !== maxSize) {
        dst = sliceArray(dst, 0, size);
      }
      return dst;
    };
  }
});

// node_modules/ts-mdocx/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  COMP_BR: () => COMP_BR,
  COMP_LZ4: () => COMP_LZ4,
  COMP_NONE: () => COMP_NONE,
  COMP_ZIP: () => COMP_ZIP,
  COMP_ZSTD: () => COMP_ZSTD,
  FIXED_HEADER_SIZE_V1: () => FIXED_HEADER_SIZE_V1,
  MDOCX_MAGIC: () => MDOCX_MAGIC,
  MDOCX_MEDIA_URI_PREFIX: () => MDOCX_MEDIA_URI_PREFIX,
  MarkdownBundleBuilder: () => MarkdownBundleBuilder,
  MdocxBuilder: () => MdocxBuilder,
  MediaBundleBuilder: () => MediaBundleBuilder,
  MediaResolver: () => MediaResolver,
  SECTION_TYPE_MARKDOWN: () => SECTION_TYPE_MARKDOWN,
  SECTION_TYPE_MEDIA: () => SECTION_TYPE_MEDIA,
  createBuilder: () => createBuilder,
  createMediaIdRef: () => createMediaIdRef,
  createSimpleDocument: () => createSimpleDocument,
  defaultReadLimits: () => defaultReadLimits,
  documentToMdocxBytes: () => documentToMdocxBytes,
  documentToMdocxBytesAsync: () => documentToMdocxBytesAsync,
  extractMediaReferences: () => extractMediaReferences,
  findUnresolvedReferences: () => findUnresolvedReferences,
  initZstd: () => initZstd,
  isValidMdocx: () => isValidMdocx,
  isZstdCompressionAvailable: () => isZstdCompressionAvailable,
  parseMediaReference: () => parseMediaReference,
  readMdocx: () => readMdocx,
  resolveMediaReference: () => resolveMediaReference,
  validateMdocx: () => validateMdocx,
  validateMdocxDetailed: () => validateMdocxDetailed,
  writeMdocx: () => writeMdocx,
  writeMdocxAsync: () => writeMdocxAsync
});
function bytesEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false;
  for (let i = 0; i < a.byteLength; i++) if (a[i] !== b[i]) return false;
  return true;
}
function decodeUtf8(bytes) {
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}
function encodeUtf8(text) {
  return new TextEncoder().encode(text);
}
async function initZstd() {
  if (!zstdWasmInitialized) {
    await (0, import_zstd_wasm.init)();
    zstdWasmInitialized = true;
  }
}
function isZstdCompressionAvailable() {
  return zstdWasmInitialized;
}
function decompressPayload(alg, compressed, expectedSize) {
  if (expectedSize < 0) throw new Error("expectedSize < 0");
  switch (alg) {
    case "none":
      if (compressed.byteLength !== expectedSize) ;
      return compressed;
    case "br": {
      const out = (0, import_zlib.brotliDecompressSync)(compressed);
      if (out.byteLength !== expectedSize) throw new Error(`Brotli size mismatch (got ${out.byteLength}, expected ${expectedSize})`);
      return out;
    }
    case "zstd": {
      const out = decompress(compressed);
      if (out.byteLength !== expectedSize) throw new Error(`ZSTD size mismatch (got ${out.byteLength}, expected ${expectedSize})`);
      return out;
    }
    case "lz4": {
      const out = (0, import_lz4js.decompress)(compressed);
      if (out.byteLength !== expectedSize) throw new Error(`LZ4 size mismatch (got ${out.byteLength}, expected ${expectedSize})`);
      return out;
    }
    case "zip": {
      const files = unzipSync(compressed);
      const keys = Object.keys(files);
      if (keys.length !== 1 || keys[0] !== "payload.gob") {
        throw new Error("ZIP must contain exactly one file named payload.gob");
      }
      const out = files["payload.gob"];
      if (!out) throw new Error("ZIP missing payload.gob");
      if (out.byteLength !== expectedSize) throw new Error(`ZIP size mismatch (got ${out.byteLength}, expected ${expectedSize})`);
      return out;
    }
  }
}
function compressPayload(alg, raw) {
  switch (alg) {
    case "none":
      return raw;
    case "br":
      return (0, import_zlib.brotliCompressSync)(raw);
    case "zstd": {
      if (!zstdWasmInitialized) {
        throw new Error("ZSTD compression requires initialization. Call `await initZstd()` first, or use `compressPayloadAsync`.");
      }
      return (0, import_zstd_wasm.compress)(raw, DEFAULT_ZSTD_LEVEL);
    }
    case "lz4":
      return (0, import_lz4js.compress)(raw);
    case "zip":
      return zipSync({ "payload.gob": raw });
  }
}
async function compressPayloadAsync(alg, raw) {
  if (alg === "zstd") {
    await initZstd();
  }
  return compressPayload(alg, raw);
}
function toSafeNumber(x, what) {
  if (x > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error(`${what} exceeds MAX_SAFE_INTEGER`);
  if (x < BigInt(Number.MIN_SAFE_INTEGER)) throw new Error(`${what} below MIN_SAFE_INTEGER`);
  return Number(x);
}
function isAllZeroBytes(b) {
  for (const x of b) if (x !== 0) return false;
  return true;
}
function decodeValue(r, reg, typeId) {
  const t = reg.get(typeId);
  switch (t.kind) {
    case "bool": {
      const u = r.readGobUint();
      return u !== 0n;
    }
    case "int": {
      return toSafeNumber(r.readGobInt(), "int");
    }
    case "uint": {
      return toSafeNumber(r.readGobUint(), "uint");
    }
    case "float": {
      const u = r.readGobUint();
      if (u > 0xffffffffffffffffn) throw new Error("float bits too large");
      const buf = new ArrayBuffer(8);
      const dv = new DataView(buf);
      dv.setBigUint64(0, u, false);
      return dv.getFloat64(0, false);
    }
    case "bytes": {
      return r.readGobBytes();
    }
    case "string": {
      return r.readGobString();
    }
    case "complex": {
      const real = decodeValue(r, reg, 4);
      const imag = decodeValue(r, reg, 4);
      return { real, imag };
    }
    case "interface": {
      const name = r.readGobString();
      if (name === "") return null;
      const concreteId = toSafeNumber(r.readGobInt(), "interface concrete type id");
      return { name, value: decodeValue(r, reg, concreteId) };
    }
    case "array": {
      const n = toSafeNumber(r.readGobUint(), "array len");
      if (n !== t.len) throw new Error(`Array length mismatch: got ${n}, expected ${t.len}`);
      const elemType = reg.get(t.elem);
      if (elemType.kind === "uint" && t.len > 0) {
        const out = new Uint8Array(t.len);
        for (let i = 0; i < t.len; i++) {
          const v = toSafeNumber(r.readGobUint(), "array uint elem");
          if (!Number.isInteger(v) || v < 0 || v > 255) throw new Error("uint8 out of range");
          out[i] = v;
        }
        return out;
      }
      const arr = [];
      for (let i = 0; i < t.len; i++) arr.push(decodeValue(r, reg, t.elem));
      return arr;
    }
    case "slice": {
      const n = toSafeNumber(r.readGobUint(), "slice len");
      const elemType = reg.get(t.elem);
      if (elemType.kind === "uint") {
        const out2 = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
          const v = toSafeNumber(r.readGobUint(), "slice uint elem");
          if (!Number.isInteger(v) || v < 0 || v > 255) throw new Error("uint8 out of range");
          out2[i] = v;
        }
        return out2;
      }
      const out = [];
      for (let i = 0; i < n; i++) out.push(decodeValue(r, reg, t.elem));
      return out;
    }
    case "map": {
      const n = toSafeNumber(r.readGobUint(), "map len");
      const obj = {};
      for (let i = 0; i < n; i++) {
        const k = decodeValue(r, reg, t.key);
        const v = decodeValue(r, reg, t.elem);
        if (typeof k !== "string") throw new Error("Only string keys supported in this decoder");
        obj[k] = v;
      }
      return obj;
    }
    case "struct": {
      const result = {};
      let fieldNum = -1;
      while (true) {
        const delta = toSafeNumber(r.readGobUint(), "field delta");
        if (delta === 0) break;
        fieldNum += delta;
        if (fieldNum < 0 || fieldNum >= t.fields.length) {
          throw new Error(`Struct field out of range: ${fieldNum} (have ${t.fields.length})`);
        }
        const field = t.fields[fieldNum];
        result[field.name] = decodeValue(r, reg, field.typeId);
      }
      return result;
    }
  }
}
function encodeValue(w, reg, typeId, value) {
  const t = reg.get(typeId);
  switch (t.kind) {
    case "bool": {
      w.writeGobUint(value ? 1n : 0n);
      return;
    }
    case "int": {
      if (typeof value !== "number" || !Number.isFinite(value) || !Number.isInteger(value)) {
        throw new Error("Expected int number");
      }
      w.writeGobInt(BigInt(value));
      return;
    }
    case "uint": {
      if (typeof value !== "number" || !Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
        throw new Error("Expected uint number");
      }
      w.writeGobUint(BigInt(value));
      return;
    }
    case "float": {
      if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("Expected float number");
      const buf = new ArrayBuffer(8);
      const dv = new DataView(buf);
      dv.setFloat64(0, value, false);
      w.writeGobUint(dv.getBigUint64(0, false));
      return;
    }
    case "bytes": {
      if (!(value instanceof Uint8Array)) throw new Error("Expected Uint8Array for bytes");
      w.writeGobBytes(value);
      return;
    }
    case "string": {
      if (typeof value !== "string") throw new Error("Expected string");
      w.writeGobString(value);
      return;
    }
    case "complex": {
      throw new Error("complex not supported for encoding");
    }
    case "interface": {
      throw new Error("interface not supported for encoding");
    }
    case "array": {
      if (!(value instanceof Uint8Array) && !Array.isArray(value)) throw new Error("Expected array");
      w.writeGobUint(BigInt(t.len));
      const elemType = reg.get(t.elem);
      if (value instanceof Uint8Array) {
        if (value.byteLength !== t.len) throw new Error("Array byte length mismatch");
        if (elemType.kind !== "uint") throw new Error("Uint8Array arrays only supported for uint elements");
        for (const b of value) w.writeGobUint(BigInt(b));
        return;
      }
      if (value.length !== t.len) throw new Error("Array length mismatch");
      for (const v of value) encodeValue(w, reg, t.elem, v);
      return;
    }
    case "slice": {
      const elemType = reg.get(t.elem);
      if (value instanceof Uint8Array && elemType.kind === "uint") {
        w.writeGobUint(BigInt(value.byteLength));
        for (const b of value) w.writeGobUint(BigInt(b));
        return;
      }
      if (!Array.isArray(value)) throw new Error("Expected slice as JS array");
      w.writeGobUint(BigInt(value.length));
      for (const v of value) encodeValue(w, reg, t.elem, v);
      return;
    }
    case "map": {
      if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected map object");
      const entries = Object.entries(value);
      w.writeGobUint(BigInt(entries.length));
      for (const [k, v] of entries) {
        encodeValue(w, reg, t.key, k);
        encodeValue(w, reg, t.elem, v);
      }
      return;
    }
    case "struct": {
      if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected struct object");
      const obj = value;
      let lastField = -1;
      for (let i = 0; i < t.fields.length; i++) {
        const field = t.fields[i];
        const v = obj[field.name];
        const fieldType = reg.get(field.typeId);
        const shouldAlwaysSend = fieldType.kind === "array";
        let shouldSend = shouldAlwaysSend;
        if (!shouldSend) {
          if (v === void 0) {
            shouldSend = false;
          } else if (fieldType.kind === "string" && v === "") {
            shouldSend = false;
          } else if ((fieldType.kind === "int" || fieldType.kind === "uint") && v === 0) {
            shouldSend = false;
          } else if (fieldType.kind === "bytes" && v instanceof Uint8Array && v.byteLength === 0) {
            shouldSend = false;
          } else if (fieldType.kind === "slice" && Array.isArray(v) && v.length === 0) {
            shouldSend = false;
          } else {
            shouldSend = true;
          }
        }
        if (!shouldSend) continue;
        const delta = i - lastField;
        w.writeGobUint(BigInt(delta));
        encodeValue(w, reg, field.typeId, v);
        lastField = i;
      }
      w.writeGobUint(0n);
      return;
    }
  }
}
function encodeMessage(payload) {
  const w = new GobWriter();
  w.writeGobUint(BigInt(payload.byteLength));
  w.writeBytes(payload);
  return w.concat();
}
function decodeWireTypeObject(reg, bytes) {
  const r = new GobReader(bytes);
  return decodeValue(r, reg, 16);
}
function wireTypeToType(wire) {
  const pick = (k) => {
    const v = wire[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v;
    return void 0;
  };
  const arrayT = pick("ArrayT");
  if (arrayT) {
    const ct = arrayT["CommonType"];
    const elem = Number(arrayT["Elem"]);
    const len = Number(arrayT["Len"]);
    return { kind: "array", name: String(ct?.["Name"] ?? ""), elem, len };
  }
  const sliceT = pick("SliceT");
  if (sliceT) {
    const ct = sliceT["CommonType"];
    const elem = Number(sliceT["Elem"]);
    return { kind: "slice", name: String(ct?.["Name"] ?? ""), elem };
  }
  const structT = pick("StructT");
  if (structT) {
    const ct = structT["CommonType"];
    const fieldArr = structT["Field"];
    if (!Array.isArray(fieldArr)) throw new Error("structType.Field must be an array");
    const fields = fieldArr.map((f) => {
      if (!f || typeof f !== "object" || Array.isArray(f)) throw new Error("fieldType must be object");
      const ff = f;
      return { name: String(ff["Name"]), typeId: Number(ff["Id"]) };
    });
    return { kind: "struct", name: String(ct?.["Name"] ?? ""), fields };
  }
  const mapT = pick("MapT");
  if (mapT) {
    const ct = mapT["CommonType"];
    const key = Number(mapT["Key"]);
    const elem = Number(mapT["Elem"]);
    return { kind: "map", name: String(ct?.["Name"] ?? ""), key, elem };
  }
  throw new Error("Unsupported wireType (no ArrayT/SliceT/StructT/MapT)");
}
function decodeGobSingleValue(stream) {
  const reg = new TypeRegistry(true);
  const r = new GobReader(stream);
  while (r.remaining() > 0) {
    const msgLen = r.readGobUint();
    const n = toSafeNumber(msgLen, "message length");
    const msg = r.readBytes(n);
    const mr = new GobReader(msg);
    const id = toSafeNumber(mr.readGobInt(), "message type id");
    if (id < 0) {
      const typeId = -id;
      if (typeId < 64) throw new Error(`Received reserved/builtin type id: ${typeId}`);
      const wire = decodeWireTypeObject(reg, mr.readBytes(mr.remaining()));
      reg.set(typeId, wireTypeToType(wire));
      continue;
    }
    const value = decodeValue(mr, reg, id);
    return { typeId: id, value };
  }
  throw new Error("No gob value found");
}
function encodeGobSingleValue(typeId, reg, value) {
  const runtime = new TypeRegistry(true);
  for (const [id, t] of reg.entries()) runtime.set(id, t);
  const messages = [];
  const defs = [...reg.entries()].sort((a, b) => a[0] - b[0]);
  for (const [id, t] of defs) {
    const wireTypeValue = typeToWireTypeValue(id, t);
    const payloadWriter2 = new GobWriter();
    payloadWriter2.writeGobInt(BigInt(-id));
    encodeValue(payloadWriter2, runtime, 16, wireTypeValue);
    messages.push(encodeMessage(payloadWriter2.concat()));
  }
  const payloadWriter = new GobWriter();
  payloadWriter.writeGobInt(BigInt(typeId));
  encodeValue(payloadWriter, runtime, typeId, value);
  messages.push(encodeMessage(payloadWriter.concat()));
  const total = messages.reduce((acc, b) => acc + b.byteLength, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const m of messages) {
    out.set(m, off);
    off += m.byteLength;
  }
  return out;
}
function typeToWireTypeValue(id, t) {
  const common = (name) => ({ Name: name, Id: id });
  const wire = {};
  if (t.kind === "array") {
    wire["ArrayT"] = { CommonType: common(t.name ?? ""), Elem: t.elem, Len: t.len };
    return wire;
  }
  if (t.kind === "slice") {
    wire["SliceT"] = { CommonType: common(t.name ?? ""), Elem: t.elem };
    return wire;
  }
  if (t.kind === "map") {
    wire["MapT"] = { CommonType: common(t.name ?? ""), Key: t.key, Elem: t.elem };
    return wire;
  }
  if (t.kind === "struct") {
    wire["StructT"] = {
      CommonType: common(t.name ?? ""),
      Field: t.fields.map((f) => ({ Name: f.name, Id: f.typeId }))
    };
    return wire;
  }
  throw new Error(`Type kind ${t.kind} cannot be sent as a user type`);
}
function normalizeOptionalSha256(bytes) {
  if (bytes.byteLength !== 32) throw new Error("sha256 must be 32 bytes");
  return isAllZeroBytes(bytes) ? void 0 : bytes;
}
function requireString(v, field) {
  if (typeof v !== "string") throw new Error(`${field} must be a string`);
  return v;
}
function requireNumber(v, field) {
  if (typeof v !== "number" || !Number.isFinite(v)) throw new Error(`${field} must be a number`);
  return v;
}
function requireBytes(v, field) {
  if (!(v instanceof Uint8Array)) throw new Error(`${field} must be bytes`);
  return v;
}
function optionalString(v) {
  if (v === void 0) return void 0;
  if (typeof v !== "string") throw new Error("Expected optional string");
  return v.length ? v : void 0;
}
function optionalStringArray(v) {
  if (v === void 0) return void 0;
  if (!Array.isArray(v)) throw new Error("Expected optional string array");
  const arr = v.map((x) => {
    if (typeof x !== "string") throw new Error("Expected string in array");
    return x;
  });
  return arr.length ? arr : void 0;
}
function optionalStringMap(v) {
  if (v === void 0) return void 0;
  if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("Expected optional map");
  const out = {};
  for (const [k, val] of Object.entries(v)) {
    if (typeof val !== "string") throw new Error("Expected string map values");
    out[k] = val;
  }
  return Object.keys(out).length ? out : void 0;
}
function parseHeader(r) {
  const magic = r.readBytes(8);
  const version = r.readU16LE();
  const headerFlags = r.readU16LE();
  const fixedHeaderSize = r.readU32LE();
  const metadataLength = r.readU32LE();
  const reserved0 = r.readU32LE();
  const reserved1 = r.readU64LE();
  return { magic, version, headerFlags, fixedHeaderSize, metadataLength, reserved0, reserved1 };
}
function parseSectionHeader(r) {
  const sectionType = r.readU16LE();
  const sectionFlags = r.readU16LE();
  const payloadLen = r.readU64LE();
  const reserved = r.readU32LE();
  return { sectionType, sectionFlags, payloadLen, reserved };
}
function compressionFromFlags(sectionFlags) {
  const algBits = sectionFlags & 15;
  const hasUncompressedLen = (sectionFlags & SECTIONFLAG_HAS_UNCOMPRESSED_LEN) !== 0;
  switch (algBits) {
    case COMP_NONE:
      return { alg: "none", hasUncompressedLen };
    case COMP_ZIP:
      return { alg: "zip", hasUncompressedLen };
    case COMP_ZSTD:
      return { alg: "zstd", hasUncompressedLen };
    case COMP_LZ4:
      return { alg: "lz4", hasUncompressedLen };
    case COMP_BR:
      return { alg: "br", hasUncompressedLen };
    default:
      throw new Error(`Unknown compression value: 0x${algBits.toString(16)}`);
  }
}
function readMetadata(r, header, limits) {
  if (header.metadataLength === 0) return void 0;
  if (header.metadataLength > limits.maxMetadataLength) {
    throw new Error(`MetadataLength too large: ${header.metadataLength}`);
  }
  const bytes = r.readBytes(header.metadataLength);
  if ((header.headerFlags & HEADERFLAG_METADATA_JSON) === 0) {
    return { raw: bytes };
  }
  const text = decodeUtf8(bytes);
  const json = JSON.parse(text);
  if (!json || typeof json !== "object" || Array.isArray(json)) throw new Error("Metadata JSON must be an object");
  return json;
}
function decodeSectionPayload(r, section, limits, expectedType, maxUncompressed) {
  if (section.sectionType !== expectedType) {
    throw new Error(`Unexpected section type: ${section.sectionType}, expected ${expectedType}`);
  }
  if (section.reserved !== 0) throw new Error("Section reserved must be 0");
  if (section.payloadLen > BigInt(limits.maxSectionPayloadLen)) {
    throw new Error(`Section payloadLen too large: ${section.payloadLen}`);
  }
  const payloadLenNum = Number(section.payloadLen);
  if (!Number.isSafeInteger(payloadLenNum) || payloadLenNum < 0) throw new Error("payloadLen is not a safe JS integer");
  const payload = r.readBytes(payloadLenNum);
  const { alg, hasUncompressedLen } = compressionFromFlags(section.sectionFlags);
  if (alg === "none") {
    if (hasUncompressedLen) throw new Error("HAS_UNCOMPRESSED_LEN must be 0 for COMP_NONE");
    return payload;
  }
  if (!hasUncompressedLen) throw new Error("Compressed payloads MUST set HAS_UNCOMPRESSED_LEN");
  if (payload.byteLength < 8) throw new Error("Compressed payload missing UncompressedLen prefix");
  const dv = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
  const uncompressedLen = dv.getBigUint64(0, true);
  if (uncompressedLen > BigInt(maxUncompressed)) throw new Error(`UncompressedLen too large: ${uncompressedLen}`);
  const expectedSize = Number(uncompressedLen);
  if (!Number.isSafeInteger(expectedSize) || expectedSize < 0) throw new Error("UncompressedLen is not a safe JS integer");
  const compressedBytes = payload.subarray(8);
  return decompressPayload(alg, compressedBytes, expectedSize);
}
async function readMdocx(bytes, limits = defaultReadLimits) {
  const r = new ByteReader(bytes);
  if (r.remaining() < FIXED_HEADER_SIZE_V1) throw new Error("File too small");
  const header = parseHeader(r);
  if (!bytesEqual(header.magic, MDOCX_MAGIC)) throw new Error("Bad magic");
  if (header.fixedHeaderSize !== FIXED_HEADER_SIZE_V1) throw new Error(`FixedHeaderSize must be ${FIXED_HEADER_SIZE_V1}`);
  if (header.version !== 1) throw new Error(`Unsupported version: ${header.version}`);
  if (header.reserved0 !== 0 || header.reserved1 !== 0n) throw new Error("Reserved header fields must be 0");
  const metadata = readMetadata(r, header, limits);
  if (r.remaining() < SECTION_HEADER_SIZE) throw new Error("Missing markdown section header");
  const mdSection = parseSectionHeader(r);
  const mdGob = decodeSectionPayload(r, mdSection, limits, SECTION_TYPE_MARKDOWN, limits.maxMarkdownUncompressed);
  if (r.remaining() < SECTION_HEADER_SIZE) throw new Error("Missing media section header");
  const mediaSection = parseSectionHeader(r);
  let mediaGob = new Uint8Array();
  if (mediaSection.payloadLen === 0n) {
    if (mediaSection.sectionType !== SECTION_TYPE_MEDIA) {
      throw new Error(`Unexpected section type: ${mediaSection.sectionType}, expected ${SECTION_TYPE_MEDIA}`);
    }
    if (mediaSection.reserved !== 0) throw new Error("Section reserved must be 0");
    mediaGob = new Uint8Array();
  } else {
    mediaGob = decodeSectionPayload(r, mediaSection, limits, SECTION_TYPE_MEDIA, limits.maxMediaUncompressed);
  }
  const decoder = new GobDecoder();
  const markdown = decoder.decodeMarkdownBundle(mdGob);
  const media = mediaGob.byteLength ? decoder.decodeMediaBundle(mediaGob) : { bundleVersion: 1, items: [] };
  if (metadata) {
    return { header, metadata, markdown, media };
  }
  return { header, markdown, media };
}
function buildMdocxTypeRegistry() {
  const reg = /* @__PURE__ */ new Map();
  reg.set(ID_SLICE_STRING, { kind: "slice", name: "[]string", elem: T_STRING });
  reg.set(ID_MAP_STRING_STRING, { kind: "map", name: "map[string]string", key: T_STRING, elem: T_STRING });
  reg.set(ID_MARKDOWN_FILE, {
    kind: "struct",
    name: "MarkdownFile",
    fields: [
      { name: "Path", typeId: T_STRING },
      { name: "Content", typeId: T_BYTES },
      { name: "MediaRefs", typeId: ID_SLICE_STRING },
      { name: "Attributes", typeId: ID_MAP_STRING_STRING }
    ]
  });
  reg.set(ID_SLICE_MARKDOWN_FILE, { kind: "slice", name: "[]MarkdownFile", elem: ID_MARKDOWN_FILE });
  reg.set(ID_MARKDOWN_BUNDLE, {
    kind: "struct",
    name: "MarkdownBundle",
    fields: [
      { name: "BundleVersion", typeId: T_UINT },
      { name: "RootPath", typeId: T_STRING },
      { name: "Files", typeId: ID_SLICE_MARKDOWN_FILE }
    ]
  });
  reg.set(ID_ARRAY_32_UINT8, { kind: "array", name: "[32]uint8", elem: T_UINT, len: 32 });
  reg.set(ID_MEDIA_ITEM, {
    kind: "struct",
    name: "MediaItem",
    fields: [
      { name: "ID", typeId: T_STRING },
      { name: "Path", typeId: T_STRING },
      { name: "MimeType", typeId: T_STRING },
      { name: "Data", typeId: T_BYTES },
      { name: "SHA256", typeId: ID_ARRAY_32_UINT8 },
      { name: "Attributes", typeId: ID_MAP_STRING_STRING }
    ]
  });
  reg.set(ID_SLICE_MEDIA_ITEM, { kind: "slice", name: "[]MediaItem", elem: ID_MEDIA_ITEM });
  reg.set(ID_MEDIA_BUNDLE, {
    kind: "struct",
    name: "MediaBundle",
    fields: [
      { name: "BundleVersion", typeId: T_UINT },
      { name: "Items", typeId: ID_SLICE_MEDIA_ITEM }
    ]
  });
  return reg;
}
function compToBits(comp) {
  switch (comp) {
    case "none":
      return COMP_NONE;
    case "zip":
      return COMP_ZIP;
    case "zstd":
      return COMP_ZSTD;
    case "lz4":
      return COMP_LZ4;
    case "br":
      return COMP_BR;
  }
}
function writeFixedHeader(w, metadataLength, headerFlags) {
  w.writeBytes(MDOCX_MAGIC);
  w.writeU16LE(1);
  w.writeU16LE(headerFlags);
  w.writeU32LE(FIXED_HEADER_SIZE_V1);
  w.writeU32LE(metadataLength);
  w.writeU32LE(0);
  w.writeU64LE(0n);
}
function writeSection(w, sectionType, comp, gobBytes) {
  const compBits = compToBits(comp);
  let sectionFlags = compBits;
  let payload;
  if (comp === "none") {
    payload = gobBytes;
  } else {
    sectionFlags |= SECTIONFLAG_HAS_UNCOMPRESSED_LEN;
    const compressed = compressPayload(comp, gobBytes);
    const ww = new ByteWriter();
    ww.writeU64LE(BigInt(gobBytes.byteLength));
    ww.writeBytes(compressed);
    payload = ww.concat();
  }
  w.writeU16LE(sectionType);
  w.writeU16LE(sectionFlags);
  w.writeU64LE(BigInt(payload.byteLength));
  w.writeU32LE(0);
  w.writeBytes(payload);
}
async function writeSectionAsync(w, sectionType, comp, gobBytes) {
  const compBits = compToBits(comp);
  let sectionFlags = compBits;
  let payload;
  if (comp === "none") {
    payload = gobBytes;
  } else {
    sectionFlags |= SECTIONFLAG_HAS_UNCOMPRESSED_LEN;
    const compressed = await compressPayloadAsync(comp, gobBytes);
    const ww = new ByteWriter();
    ww.writeU64LE(BigInt(gobBytes.byteLength));
    ww.writeBytes(compressed);
    payload = ww.concat();
  }
  w.writeU16LE(sectionType);
  w.writeU16LE(sectionFlags);
  w.writeU64LE(BigInt(payload.byteLength));
  w.writeU32LE(0);
  w.writeBytes(payload);
}
function computeSha256(data) {
  return (0, import_crypto.createHash)("sha256").update(data).digest();
}
function ensureMediaSha256(media) {
  const items = media.items.map((item) => {
    if (item.sha256) return item;
    return { ...item, sha256: computeSha256(item.data) };
  });
  return { ...media, items };
}
function writeMdocx(markdown, media, opts = {}) {
  const encoder = new GobEncoder();
  const mdGob = encoder.encodeMarkdownBundle(markdown);
  const processedMedia = opts.autoPopulateSha256 !== false ? ensureMediaSha256(media) : media;
  const mediaGob = processedMedia.items.length ? encoder.encodeMediaBundle(processedMedia) : new Uint8Array();
  const metaBytes = opts.metadata ? encodeUtf8(JSON.stringify(opts.metadata)) : new Uint8Array();
  const headerFlags = opts.metadata ? HEADERFLAG_METADATA_JSON : 0;
  const w = new ByteWriter();
  writeFixedHeader(w, metaBytes.byteLength, headerFlags);
  if (metaBytes.byteLength) w.writeBytes(metaBytes);
  writeSection(w, SECTION_TYPE_MARKDOWN, opts.markdownCompression ?? "zip", mdGob);
  if (mediaGob.byteLength === 0) {
    w.writeU16LE(SECTION_TYPE_MEDIA);
    w.writeU16LE(COMP_NONE);
    w.writeU64LE(0n);
    w.writeU32LE(0);
  } else {
    writeSection(w, SECTION_TYPE_MEDIA, opts.mediaCompression ?? "zip", mediaGob);
  }
  return w.concat();
}
async function writeMdocxAsync(markdown, media, opts = {}) {
  const encoder = new GobEncoder();
  const mdGob = encoder.encodeMarkdownBundle(markdown);
  const processedMedia = opts.autoPopulateSha256 !== false ? ensureMediaSha256(media) : media;
  const mediaGob = processedMedia.items.length ? encoder.encodeMediaBundle(processedMedia) : new Uint8Array();
  const metaBytes = opts.metadata ? encodeUtf8(JSON.stringify(opts.metadata)) : new Uint8Array();
  const headerFlags = opts.metadata ? HEADERFLAG_METADATA_JSON : 0;
  const w = new ByteWriter();
  writeFixedHeader(w, metaBytes.byteLength, headerFlags);
  if (metaBytes.byteLength) w.writeBytes(metaBytes);
  await writeSectionAsync(w, SECTION_TYPE_MARKDOWN, opts.markdownCompression ?? "zip", mdGob);
  if (mediaGob.byteLength === 0) {
    w.writeU16LE(SECTION_TYPE_MEDIA);
    w.writeU16LE(COMP_NONE);
    w.writeU64LE(0n);
    w.writeU32LE(0);
  } else {
    await writeSectionAsync(w, SECTION_TYPE_MEDIA, opts.mediaCompression ?? "zip", mediaGob);
  }
  return w.concat();
}
function documentToMdocxBytes(doc, opts = {}) {
  if (doc.metadata) {
    return writeMdocx(doc.markdown, doc.media, { ...opts, metadata: doc.metadata });
  }
  return writeMdocx(doc.markdown, doc.media, opts);
}
async function documentToMdocxBytesAsync(doc, opts = {}) {
  if (doc.metadata) {
    return writeMdocxAsync(doc.markdown, doc.media, { ...opts, metadata: doc.metadata });
  }
  return writeMdocxAsync(doc.markdown, doc.media, opts);
}
function isSafeRelativePath(p) {
  if (!p) return false;
  if (p.startsWith("/")) return false;
  const parts = p.split("/");
  if (parts.some((s) => s === "..")) return false;
  if (parts.some((s) => s.length === 0)) return false;
  return true;
}
function toHex(bytes) {
  return Buffer.from(bytes).toString("hex");
}
function validateMdocxDetailed(doc, options2 = {}) {
  const issues = [];
  const opts = {
    verifyHashes: true,
    checkPaths: true,
    checkDuplicates: true,
    warnOnMissingOptional: false,
    includeInfo: false,
    ...options2
  };
  const addIssue = (severity, message, path3, details) => {
    if (severity === "info" && !opts.includeInfo) return;
    const issue = { severity, message };
    if (path3 !== void 0) issue.path = path3;
    if (details !== void 0) issue.details = details;
    issues.push(issue);
  };
  if (doc.markdown.bundleVersion !== 1) {
    addIssue("error", "markdown.bundleVersion must be 1", "markdown.bundleVersion");
  }
  if (!doc.markdown.files.length) {
    addIssue("error", "markdown.files must be non-empty", "markdown.files");
  }
  const mdPaths = /* @__PURE__ */ new Set();
  doc.markdown.files.forEach((f, idx) => {
    const basePath = `markdown.files[${idx}]`;
    if (opts.checkPaths && !isSafeRelativePath(f.path)) {
      addIssue("error", `Invalid markdown path: "${f.path}"`, `${basePath}.path`, { path: f.path });
    }
    if (opts.checkDuplicates) {
      if (mdPaths.has(f.path)) {
        addIssue("error", `Duplicate markdown path: "${f.path}"`, `${basePath}.path`);
      }
      mdPaths.add(f.path);
    }
    if (opts.warnOnMissingOptional) {
      if (!f.mediaRefs?.length) {
        addIssue("info", "No media references", `${basePath}.mediaRefs`);
      }
    }
  });
  if (doc.media.bundleVersion !== 1) {
    addIssue("error", "media.bundleVersion must be 1", "media.bundleVersion");
  }
  const mediaIds = /* @__PURE__ */ new Set();
  doc.media.items.forEach((m, idx) => {
    const basePath = `media.items[${idx}]`;
    if (!m.id) {
      addIssue("error", "MediaItem.id must be non-empty", `${basePath}.id`);
    }
    if (opts.checkDuplicates) {
      if (mediaIds.has(m.id)) {
        addIssue("error", `Duplicate media ID: "${m.id}"`, `${basePath}.id`);
      }
      mediaIds.add(m.id);
    }
    if (opts.checkPaths && m.path && !isSafeRelativePath(m.path)) {
      addIssue("error", `Invalid media path: "${m.path}"`, `${basePath}.path`, { path: m.path });
    }
    if (opts.verifyHashes && m.sha256) {
      if (m.sha256.byteLength !== 32) {
        addIssue("error", `MediaItem.sha256 must be 32 bytes for id="${m.id}"`, `${basePath}.sha256`);
      } else {
        const computed = (0, import_crypto.createHash)("sha256").update(m.data).digest();
        if (toHex(computed) !== toHex(m.sha256)) {
          addIssue("error", `MediaItem.sha256 mismatch for id="${m.id}"`, `${basePath}.sha256`, {
            stored: toHex(m.sha256),
            computed: toHex(computed)
          });
        }
      }
    }
    if (opts.warnOnMissingOptional) {
      if (!m.mimeType) {
        addIssue("warning", `Missing MIME type for id="${m.id}"`, `${basePath}.mimeType`);
      }
      if (!m.sha256) {
        addIssue("warning", `Missing SHA256 hash for id="${m.id}"`, `${basePath}.sha256`);
      }
    }
  });
  const stats = {
    markdownFileCount: doc.markdown.files.length,
    mediaItemCount: doc.media.items.length,
    totalMarkdownBytes: doc.markdown.files.reduce((acc, f) => acc + f.content.byteLength, 0),
    totalMediaBytes: doc.media.items.reduce((acc, m) => acc + m.data.byteLength, 0)
  };
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  return {
    valid: errorCount === 0,
    issues,
    errorCount,
    warningCount,
    stats
  };
}
function validateMdocx(doc) {
  const result = validateMdocxDetailed(doc);
  return result.issues.filter((i) => i.severity === "error").map((i) => i.message);
}
function isValidMdocx(doc) {
  return validateMdocxDetailed(doc).valid;
}
function parseMediaReference(ref) {
  if (!ref) return void 0;
  if (ref.startsWith(MDOCX_MEDIA_URI_PREFIX)) {
    const id = ref.slice(MDOCX_MEDIA_URI_PREFIX.length);
    if (id) return { type: "id", id };
    return void 0;
  }
  if (!ref.includes("://")) {
    return { type: "path", path: ref };
  }
  return void 0;
}
function createMediaIdRef(id) {
  return `${MDOCX_MEDIA_URI_PREFIX}${id}`;
}
function resolveMediaReference(ref, media, basePath) {
  const parsed = parseMediaReference(ref);
  if (!parsed) return void 0;
  if (parsed.type === "id") {
    return media.items.find((item) => item.id === parsed.id);
  }
  const targetPath = normalizePath(parsed.path, basePath);
  return media.items.find(
    (item) => item.path && normalizePath(item.path) === targetPath
  );
}
function normalizePath(path3, basePath) {
  if (basePath && !path3.startsWith("/")) {
    const baseDir = basePath.includes("/") ? basePath.substring(0, basePath.lastIndexOf("/")) : "";
    path3 = baseDir ? `${baseDir}/${path3}` : path3;
  }
  const parts = path3.split("/").filter((p) => p && p !== ".");
  const result = [];
  for (const part of parts) {
    if (part === "..") {
      result.pop();
    } else {
      result.push(part);
    }
  }
  return result.join("/");
}
function extractMediaReferences(content) {
  const text = typeof content === "string" ? content : new TextDecoder().decode(content);
  const refs = /* @__PURE__ */ new Set();
  const markdownLinkRegex = /!?\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    const ref = match[2];
    if (ref) {
      const cleanRef = ref.split(/\s+/)[0];
      if (cleanRef) {
        const parsed = parseMediaReference(cleanRef);
        if (parsed) refs.add(cleanRef);
      }
    }
  }
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  while ((match = htmlImgRegex.exec(text)) !== null) {
    const ref = match[1];
    if (ref) {
      const parsed = parseMediaReference(ref);
      if (parsed) refs.add(ref);
    }
  }
  return [...refs];
}
function findUnresolvedReferences(file, media) {
  const refs = extractMediaReferences(file.content);
  const unresolved = [];
  for (const ref of refs) {
    if (!resolveMediaReference(ref, media, file.path)) {
      unresolved.push(ref);
    }
  }
  return unresolved;
}
function toBytes(content) {
  return typeof content === "string" ? new TextEncoder().encode(content) : content;
}
function sha256(data) {
  return (0, import_crypto.createHash)("sha256").update(data).digest();
}
function guessMimeType(path3) {
  const ext = path3.split(".").pop()?.toLowerCase();
  const mimeTypes = {
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "webp": "image/webp",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",
    "bmp": "image/bmp",
    "mp3": "audio/mpeg",
    "wav": "audio/wav",
    "ogg": "audio/ogg",
    "mp4": "video/mp4",
    "webm": "video/webm",
    "pdf": "application/pdf",
    "json": "application/json",
    "xml": "application/xml",
    "zip": "application/zip",
    "txt": "text/plain",
    "css": "text/css",
    "js": "application/javascript",
    "html": "text/html",
    "md": "text/markdown",
    "markdown": "text/markdown"
  };
  return ext ? mimeTypes[ext] ?? "application/octet-stream" : "application/octet-stream";
}
function pathToId(path3) {
  return path3.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}
function createSimpleDocument(path3, content, metadata) {
  const builder = new MdocxBuilder().addMarkdown(path3, content).root(path3);
  if (metadata) {
    builder.setMetadata(metadata);
  }
  return builder.build();
}
function createBuilder() {
  return new MdocxBuilder();
}
var import_zlib, import_zstd_wasm, import_lz4js, import_util, import_crypto, defaultReadLimits, MDOCX_MAGIC, FIXED_HEADER_SIZE_V1, HEADERFLAG_METADATA_JSON, SECTION_TYPE_MARKDOWN, SECTION_TYPE_MEDIA, SECTION_HEADER_SIZE, COMP_NONE, COMP_ZIP, COMP_ZSTD, COMP_LZ4, COMP_BR, SECTIONFLAG_HAS_UNCOMPRESSED_LEN, ByteReader, ByteWriter, DEFAULT_ZSTD_LEVEL, zstdWasmInitialized, textDecoder, textEncoder, GobReader, GobWriter, TypeRegistry, GobDecoder, T_UINT, T_BYTES, T_STRING, ID_MARKDOWN_BUNDLE, ID_MARKDOWN_FILE, ID_SLICE_MARKDOWN_FILE, ID_SLICE_STRING, ID_MAP_STRING_STRING, ID_MEDIA_BUNDLE, ID_MEDIA_ITEM, ID_SLICE_MEDIA_ITEM, ID_ARRAY_32_UINT8, GobEncoder, MDOCX_MEDIA_URI_PREFIX, MediaResolver, MarkdownBundleBuilder, MediaBundleBuilder, MdocxBuilder;
var init_dist = __esm({
  "node_modules/ts-mdocx/dist/index.js"() {
    import_zlib = require("zlib");
    init_esm();
    init_esm2();
    import_zstd_wasm = __toESM(require_index_node(), 1);
    import_lz4js = __toESM(require_lz4(), 1);
    import_util = require("util");
    import_crypto = require("crypto");
    defaultReadLimits = {
      maxMetadataLength: 1024 * 1024,
      // 1 MiB
      maxSectionPayloadLen: 1024 * 1024 * 1024,
      // 1 GiB
      maxMarkdownUncompressed: 256 * 1024 * 1024,
      // 256 MiB
      maxMediaUncompressed: 2 * 1024 * 1024 * 1024
      // 2 GiB
    };
    MDOCX_MAGIC = Uint8Array.from([
      77,
      68,
      79,
      67,
      88,
      13,
      10,
      26
    ]);
    FIXED_HEADER_SIZE_V1 = 32;
    HEADERFLAG_METADATA_JSON = 1;
    SECTION_TYPE_MARKDOWN = 1;
    SECTION_TYPE_MEDIA = 2;
    SECTION_HEADER_SIZE = 16;
    COMP_NONE = 0;
    COMP_ZIP = 1;
    COMP_ZSTD = 2;
    COMP_LZ4 = 3;
    COMP_BR = 4;
    SECTIONFLAG_HAS_UNCOMPRESSED_LEN = 16;
    ByteReader = class {
      view;
      buf;
      offset = 0;
      constructor(bytes) {
        this.buf = bytes;
        this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      }
      remaining() {
        return this.buf.byteLength - this.offset;
      }
      readBytes(n) {
        if (n < 0) throw new Error("readBytes: negative length");
        if (this.offset + n > this.buf.byteLength) {
          throw new Error(`Unexpected EOF (need ${n}, have ${this.remaining()})`);
        }
        const out = this.buf.subarray(this.offset, this.offset + n);
        this.offset += n;
        return out;
      }
      readU16LE() {
        const v = this.view.getUint16(this.offset, true);
        this.offset += 2;
        return v;
      }
      readU32LE() {
        const v = this.view.getUint32(this.offset, true);
        this.offset += 4;
        return v;
      }
      readU64LE() {
        const v = this.view.getBigUint64(this.offset, true);
        this.offset += 8;
        return v;
      }
    };
    ByteWriter = class {
      chunks = [];
      writeBytes(bytes) {
        this.chunks.push(bytes);
      }
      writeU16LE(v) {
        const b = new Uint8Array(2);
        new DataView(b.buffer).setUint16(0, v, true);
        this.chunks.push(b);
      }
      writeU32LE(v) {
        const b = new Uint8Array(4);
        new DataView(b.buffer).setUint32(0, v, true);
        this.chunks.push(b);
      }
      writeU64LE(v) {
        const b = new Uint8Array(8);
        new DataView(b.buffer).setBigUint64(0, v, true);
        this.chunks.push(b);
      }
      concat() {
        const total = this.chunks.reduce((acc, c) => acc + c.byteLength, 0);
        const out = new Uint8Array(total);
        let o = 0;
        for (const c of this.chunks) {
          out.set(c, o);
          o += c.byteLength;
        }
        return out;
      }
    };
    DEFAULT_ZSTD_LEVEL = 3;
    zstdWasmInitialized = false;
    textDecoder = new import_util.TextDecoder();
    textEncoder = new import_util.TextEncoder();
    GobReader = class {
      constructor(bytes) {
        this.bytes = bytes;
      }
      off = 0;
      remaining() {
        return this.bytes.byteLength - this.off;
      }
      readByte() {
        if (this.off >= this.bytes.byteLength) throw new Error("Unexpected EOF");
        return this.bytes[this.off++];
      }
      readBytes(n) {
        if (n < 0) throw new Error("Invalid length");
        if (this.off + n > this.bytes.byteLength) throw new Error("Unexpected EOF");
        const out = this.bytes.subarray(this.off, this.off + n);
        this.off += n;
        return out;
      }
      readGobUint() {
        const b = this.readByte();
        if (b <= 127) return BigInt(b);
        const n = 256 - b;
        let x = 0n;
        for (let i = 0; i < n; i++) {
          x = x << 8n | BigInt(this.readByte());
        }
        return x;
      }
      readGobInt() {
        const u = this.readGobUint();
        if ((u & 1n) === 0n) return u >> 1n;
        return ~(u >> 1n);
      }
      readGobString() {
        const n = this.readGobUint();
        const len = toSafeNumber(n, "string length");
        const b = this.readBytes(len);
        return textDecoder.decode(b);
      }
      readGobBytes() {
        const n = this.readGobUint();
        const len = toSafeNumber(n, "bytes length");
        return this.readBytes(len);
      }
    };
    GobWriter = class {
      chunks = [];
      writeByte(b) {
        const bb = new Uint8Array(1);
        bb[0] = b & 255;
        this.chunks.push(bb);
      }
      writeBytes(b) {
        this.chunks.push(b);
      }
      writeGobUint(x) {
        if (x < 0n) throw new Error("uint must be non-negative");
        if (x <= 0x7fn) {
          this.writeByte(Number(x));
          return;
        }
        const bytes = [];
        let v = x;
        while (v > 0n) {
          bytes.push(Number(v & 0xffn));
          v >>= 8n;
        }
        bytes.reverse();
        if (bytes.length > 255) throw new Error("uint too large");
        this.writeByte(256 - bytes.length);
        this.writeBytes(Uint8Array.from(bytes));
      }
      writeGobInt(x) {
        if (x < 0n) {
          const u = ~x << 1n | 1n;
          this.writeGobUint(u);
        } else {
          const u = x << 1n;
          this.writeGobUint(u);
        }
      }
      writeGobString(s) {
        const b = textEncoder.encode(s);
        this.writeGobUint(BigInt(b.byteLength));
        this.writeBytes(b);
      }
      writeGobBytes(b) {
        this.writeGobUint(BigInt(b.byteLength));
        this.writeBytes(b);
      }
      concat() {
        const total = this.chunks.reduce((acc, c) => acc + c.byteLength, 0);
        const out = new Uint8Array(total);
        let off = 0;
        for (const c of this.chunks) {
          out.set(c, off);
          off += c.byteLength;
        }
        return out;
      }
    };
    TypeRegistry = class {
      types = /* @__PURE__ */ new Map();
      constructor(withBuiltins) {
        if (!withBuiltins) return;
        this.types.set(1, { kind: "bool" });
        this.types.set(2, { kind: "int" });
        this.types.set(3, { kind: "uint" });
        this.types.set(4, { kind: "float" });
        this.types.set(5, { kind: "bytes" });
        this.types.set(6, { kind: "string" });
        this.types.set(7, { kind: "complex" });
        this.types.set(8, { kind: "interface" });
        this.types.set(18, {
          kind: "struct",
          name: "CommonType",
          fields: [
            { name: "Name", typeId: 6 },
            { name: "Id", typeId: 2 }
          ]
        });
        this.types.set(17, {
          kind: "struct",
          name: "arrayType",
          fields: [
            { name: "CommonType", typeId: 18 },
            { name: "Elem", typeId: 2 },
            { name: "Len", typeId: 2 }
          ]
        });
        this.types.set(19, {
          kind: "struct",
          name: "sliceType",
          fields: [
            { name: "CommonType", typeId: 18 },
            { name: "Elem", typeId: 2 }
          ]
        });
        this.types.set(21, {
          kind: "struct",
          name: "fieldType",
          fields: [
            { name: "Name", typeId: 6 },
            { name: "Id", typeId: 2 }
          ]
        });
        this.types.set(22, { kind: "slice", name: "[]fieldType", elem: 21 });
        this.types.set(20, {
          kind: "struct",
          name: "structType",
          fields: [
            { name: "CommonType", typeId: 18 },
            { name: "Field", typeId: 22 }
          ]
        });
        this.types.set(23, {
          kind: "struct",
          name: "mapType",
          fields: [
            { name: "CommonType", typeId: 18 },
            { name: "Key", typeId: 2 },
            { name: "Elem", typeId: 2 }
          ]
        });
        this.types.set(16, {
          kind: "struct",
          name: "wireType",
          fields: [
            { name: "ArrayT", typeId: 17 },
            { name: "SliceT", typeId: 19 },
            { name: "StructT", typeId: 20 },
            { name: "MapT", typeId: 23 }
          ]
        });
      }
      get(id) {
        const t = this.types.get(id);
        if (!t) throw new Error(`Unknown gob type id: ${id}`);
        return t;
      }
      has(id) {
        return this.types.has(id);
      }
      set(id, t) {
        this.types.set(id, t);
      }
    };
    GobDecoder = class {
      decodeMarkdownBundle(_bytes) {
        const decoded = decodeGobSingleValue(_bytes);
        const v = decoded.value;
        if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("MarkdownBundle gob must decode to an object");
        const obj = v;
        const bundleVersion = requireNumber(obj["BundleVersion"], "BundleVersion");
        const rootPath = optionalString(obj["RootPath"]);
        const filesRaw = obj["Files"];
        if (!Array.isArray(filesRaw)) throw new Error("Files must be an array");
        const files = filesRaw.map((f, idx) => {
          if (!f || typeof f !== "object" || Array.isArray(f)) throw new Error(`Files[${idx}] must be an object`);
          const ff = f;
          const path3 = requireString(ff["Path"], "Path");
          const content = ff["Content"] === void 0 ? new Uint8Array() : requireBytes(ff["Content"], "Content");
          const mediaRefs = optionalStringArray(ff["MediaRefs"]);
          const attributes = optionalStringMap(ff["Attributes"]);
          return {
            path: path3,
            content,
            ...mediaRefs ? { mediaRefs } : {},
            ...attributes ? { attributes } : {}
          };
        });
        return {
          bundleVersion,
          ...rootPath ? { rootPath } : {},
          files
        };
      }
      decodeMediaBundle(_bytes) {
        const decoded = decodeGobSingleValue(_bytes);
        const v = decoded.value;
        if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("MediaBundle gob must decode to an object");
        const obj = v;
        const bundleVersion = requireNumber(obj["BundleVersion"], "BundleVersion");
        const itemsRaw = obj["Items"];
        if (itemsRaw === void 0) {
          return { bundleVersion, items: [] };
        }
        if (!Array.isArray(itemsRaw)) throw new Error("Items must be an array");
        const items = itemsRaw.map((it, idx) => {
          if (!it || typeof it !== "object" || Array.isArray(it)) throw new Error(`Items[${idx}] must be an object`);
          const ii = it;
          const id = requireString(ii["ID"], "ID");
          const path3 = optionalString(ii["Path"]);
          const mimeType = optionalString(ii["MimeType"] ?? ii["MIMEType"]);
          const data = ii["Data"] === void 0 ? new Uint8Array() : requireBytes(ii["Data"], "Data");
          const sha256Raw = ii["SHA256"];
          const sha2562 = sha256Raw instanceof Uint8Array ? normalizeOptionalSha256(sha256Raw) : void 0;
          const attributes = optionalStringMap(ii["Attributes"]);
          return {
            id,
            ...path3 ? { path: path3 } : {},
            ...mimeType ? { mimeType } : {},
            data,
            ...sha2562 ? { sha256: sha2562 } : {},
            ...attributes ? { attributes } : {}
          };
        });
        return { bundleVersion, items };
      }
    };
    T_UINT = 3;
    T_BYTES = 5;
    T_STRING = 6;
    ID_MARKDOWN_BUNDLE = 65;
    ID_MARKDOWN_FILE = 66;
    ID_SLICE_MARKDOWN_FILE = 67;
    ID_SLICE_STRING = 68;
    ID_MAP_STRING_STRING = 69;
    ID_MEDIA_BUNDLE = 70;
    ID_MEDIA_ITEM = 71;
    ID_SLICE_MEDIA_ITEM = 72;
    ID_ARRAY_32_UINT8 = 73;
    GobEncoder = class {
      encodeMarkdownBundle(_bundle) {
        const reg = buildMdocxTypeRegistry();
        const value = {
          BundleVersion: _bundle.bundleVersion,
          RootPath: _bundle.rootPath ?? "",
          Files: _bundle.files.map((f) => ({
            Path: f.path,
            Content: f.content,
            MediaRefs: f.mediaRefs ?? [],
            ...f.attributes ? { Attributes: f.attributes } : {}
          }))
        };
        return encodeGobSingleValue(ID_MARKDOWN_BUNDLE, reg, value);
      }
      encodeMediaBundle(_bundle) {
        const reg = buildMdocxTypeRegistry();
        const value = {
          BundleVersion: _bundle.bundleVersion,
          Items: _bundle.items.map((it) => ({
            ID: it.id,
            Path: it.path ?? "",
            MimeType: it.mimeType ?? "",
            Data: it.data,
            SHA256: it.sha256 ?? new Uint8Array(32),
            ...it.attributes ? { Attributes: it.attributes } : {}
          }))
        };
        return encodeGobSingleValue(ID_MEDIA_BUNDLE, reg, value);
      }
    };
    MDOCX_MEDIA_URI_PREFIX = "mdocx://media/";
    MediaResolver = class {
      constructor(doc) {
        this.doc = doc;
      }
      /**
       * Resolve a media reference from a markdown file.
       * 
       * @param ref - The reference string
       * @param fromFile - The markdown file containing the reference (for relative path resolution)
       */
      resolve(ref, fromFile) {
        return resolveMediaReference(ref, this.doc.media, fromFile?.path);
      }
      /**
       * Get a media item by ID.
       */
      getById(id) {
        return this.doc.media.items.find((item) => item.id === id);
      }
      /**
       * Get a media item by path.
       */
      getByPath(path3) {
        const normalized = normalizePath(path3);
        return this.doc.media.items.find(
          (item) => item.path && normalizePath(item.path) === normalized
        );
      }
      /**
       * Get all media items referenced by a markdown file.
       */
      getReferencedMedia(file) {
        if (!file.mediaRefs) return [];
        const items = [];
        for (const ref of file.mediaRefs) {
          const item = this.getById(ref);
          if (item) items.push(item);
        }
        return items;
      }
      /**
       * Get all media items in the document.
       */
      getAllMedia() {
        return [...this.doc.media.items];
      }
      /**
       * Check if a media ID exists.
       */
      hasId(id) {
        return this.doc.media.items.some((item) => item.id === id);
      }
      /**
       * Get the MIME type of a media item.
       */
      getMimeType(item) {
        return item.mimeType ?? "application/octet-stream";
      }
    };
    MarkdownBundleBuilder = class {
      files = [];
      rootPath;
      /**
       * Set the root markdown file path.
       */
      root(path3) {
        this.rootPath = path3;
        return this;
      }
      /**
       * Add a markdown file.
       * 
       * @param path - Container path (e.g., 'docs/readme.md')
       * @param content - Markdown content as string or bytes
       * @param opts - Additional options
       */
      addFile(path3, content, opts = {}) {
        this.files.push({
          path: path3,
          content: toBytes(content),
          ...opts.mediaRefs?.length ? { mediaRefs: opts.mediaRefs } : {},
          ...opts.attributes && Object.keys(opts.attributes).length ? { attributes: opts.attributes } : {}
        });
        return this;
      }
      /**
       * Add multiple markdown files.
       */
      addFiles(files) {
        for (const file of files) {
          this.addFile(file.path, file.content, file);
        }
        return this;
      }
      /**
       * Build the MarkdownBundle.
       */
      build() {
        if (this.files.length === 0) {
          throw new Error("MarkdownBundle must contain at least one file");
        }
        return {
          bundleVersion: 1,
          ...this.rootPath ? { rootPath: this.rootPath } : {},
          files: this.files
        };
      }
    };
    MediaBundleBuilder = class {
      items = [];
      usedIds = /* @__PURE__ */ new Set();
      /**
       * Add a media item.
       * 
       * @param id - Unique identifier for the media
       * @param data - Media data as bytes
       * @param opts - Additional options
       */
      addItem(id, data, opts = {}) {
        if (this.usedIds.has(id)) {
          throw new Error(`Duplicate media ID: ${id}`);
        }
        this.usedIds.add(id);
        const item = {
          id,
          data,
          ...opts.path ? { path: opts.path } : {},
          mimeType: opts.mimeType ?? (opts.path ? guessMimeType(opts.path) : "application/octet-stream"),
          ...opts.computeSha256 !== false ? { sha256: sha256(data) } : {},
          ...opts.attributes && Object.keys(opts.attributes).length ? { attributes: opts.attributes } : {}
        };
        this.items.push(item);
        return this;
      }
      /**
       * Add a media item with auto-generated ID from path.
       */
      addFromPath(path3, data, opts = {}) {
        const id = pathToId(path3);
        return this.addItem(id, data, { ...opts, path: path3 });
      }
      /**
       * Add multiple media items.
       */
      addItems(items) {
        for (const item of items) {
          this.addItem(item.id, item.data, item);
        }
        return this;
      }
      /**
       * Build the MediaBundle.
       */
      build() {
        return {
          bundleVersion: 1,
          items: this.items
        };
      }
      /**
       * Create an empty MediaBundle.
       */
      static empty() {
        return { bundleVersion: 1, items: [] };
      }
    };
    MdocxBuilder = class {
      markdownBuilder = new MarkdownBundleBuilder();
      mediaBuilder = new MediaBundleBuilder();
      metadata;
      /**
       * Set document metadata.
       */
      setMetadata(metadata) {
        this.metadata = metadata;
        return this;
      }
      /**
       * Add or update metadata fields.
       */
      addMetadata(fields) {
        this.metadata = { ...this.metadata ?? {}, ...fields };
        return this;
      }
      /**
       * Set the document title in metadata.
       */
      title(title) {
        return this.addMetadata({ title });
      }
      /**
       * Set the document description in metadata.
       */
      description(description) {
        return this.addMetadata({ description });
      }
      /**
       * Set the root markdown file.
       */
      root(path3) {
        this.markdownBuilder.root(path3);
        this.addMetadata({ root: path3 });
        return this;
      }
      /**
       * Add a markdown file.
       */
      addMarkdown(path3, content, opts = {}) {
        this.markdownBuilder.addFile(path3, content, opts);
        return this;
      }
      /**
       * Add a media item.
       */
      addMedia(id, data, opts = {}) {
        this.mediaBuilder.addItem(id, data, opts);
        return this;
      }
      /**
       * Add a media item with auto-generated ID from path.
       */
      addMediaFromPath(path3, data, opts = {}) {
        this.mediaBuilder.addFromPath(path3, data, opts);
        return this;
      }
      /**
       * Access the markdown builder for advanced operations.
       */
      markdown() {
        return this.markdownBuilder;
      }
      /**
       * Access the media builder for advanced operations.
       */
      media() {
        return this.mediaBuilder;
      }
      /**
       * Build the MdocxDocument.
       */
      build() {
        const header = {
          magic: MDOCX_MAGIC,
          version: 1,
          headerFlags: this.metadata ? 1 : 0,
          fixedHeaderSize: FIXED_HEADER_SIZE_V1,
          metadataLength: 0,
          // Will be set during write
          reserved0: 0,
          reserved1: 0n
        };
        const doc = {
          header,
          markdown: this.markdownBuilder.build(),
          media: this.mediaBuilder.build()
        };
        if (this.metadata) {
          doc.metadata = this.metadata;
        }
        return doc;
      }
    };
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode5 = __toESM(require("vscode"));
var path2 = __toESM(require("path"));

// src/mdocxPreviewEditorProvider.ts
var vscode3 = __toESM(require("vscode"));
var path = __toESM(require("path"));

// src/mdocxFileSystemProvider.ts
var vscode2 = __toESM(require("vscode"));

// src/mdocxDocument.ts
var vscode = __toESM(require("vscode"));
var import_util2 = require("util");
var documentCache = /* @__PURE__ */ new Map();
function invalidateDocument(uri) {
  documentCache.delete(uri.toString());
}
function normalizeDocument(doc) {
  doc.markdown = doc.markdown || { bundleVersion: 1, files: [] };
  if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
  doc.media = doc.media || { bundleVersion: 1, items: [] };
  if (!Array.isArray(doc.media.items)) doc.media.items = [];
  return doc;
}
async function readDocument(uri, options2) {
  const key = uri.toString();
  let stat;
  try {
    stat = await vscode.workspace.fs.stat(uri);
  } catch {
    stat = void 0;
  }
  if (!options2?.fresh && stat) {
    const cached = documentCache.get(key);
    if (cached && cached.mtime === stat.mtime && cached.size === stat.size) {
      return cached.doc;
    }
  }
  const bytes = await vscode.workspace.fs.readFile(uri);
  const { readMdocx: readMdocx2 } = await Promise.resolve().then(() => (init_dist(), dist_exports));
  const doc = normalizeDocument(await readMdocx2(bytes));
  if (options2?.fresh) {
    documentCache.delete(key);
  } else if (stat) {
    documentCache.set(key, { mtime: stat.mtime, size: stat.size, doc });
  }
  return doc;
}
async function writeDocument(uri, doc) {
  const { writeMdocxAsync: writeMdocxAsync2 } = await Promise.resolve().then(() => (init_dist(), dist_exports));
  const bytes = await writeMdocxAsync2(doc.markdown, doc.media, {
    metadata: doc.metadata,
    markdownCompression: "zip",
    mediaCompression: "zip"
  });
  await vscode.workspace.fs.writeFile(uri, bytes);
  invalidateDocument(uri);
}
async function updateDocument(uri, mutate) {
  const doc = await readDocument(uri, { fresh: true });
  await mutate(doc);
  await writeDocument(uri, doc);
}
function decodeText(content) {
  return new import_util2.TextDecoder("utf-8").decode(content);
}
function encodeText(text) {
  return new import_util2.TextEncoder().encode(text);
}
function findMarkdownFile(doc, filePath) {
  const target = filePath ?? doc.markdown.rootPath ?? (typeof doc.metadata?.root === "string" ? doc.metadata.root : void 0) ?? doc.markdown.files[0]?.path;
  return doc.markdown.files.find((file) => file.path === target) ?? doc.markdown.files[0];
}
function getMimeTypeFromExtension(ext) {
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".bmp": "image/bmp",
    ".ico": "image/x-icon",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
    ".mp3": "audio/mpeg",
    ".ogg": "audio/ogg",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".pdf": "application/pdf",
    ".json": "application/json",
    ".txt": "text/plain",
    ".csv": "text/csv",
    ".zip": "application/zip"
  };
  return mimeTypes[ext.toLowerCase()] || "application/octet-stream";
}
var MEDIA_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
  ".ico",
  ".avif",
  ".svg",
  ".mp3",
  ".ogg",
  ".wav",
  ".mp4",
  ".webm",
  ".pdf"
];
function inferMimeType(item) {
  if (typeof item.mimeType === "string" && item.mimeType.length > 0) {
    return item.mimeType;
  }
  const p = typeof item.path === "string" ? item.path.toLowerCase() : "";
  const dot = p.lastIndexOf(".");
  if (dot >= 0) {
    const byExt = getMimeTypeFromExtension(p.slice(dot));
    if (byExt !== "application/octet-stream") return byExt;
  }
  const bytes = item.data;
  if (!bytes || bytes.length < 12) return "application/octet-stream";
  if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71 && bytes[4] === 13 && bytes[5] === 10 && bytes[6] === 26 && bytes[7] === 10) {
    return "image/png";
  }
  if (bytes[0] === 255 && bytes[1] === 216) return "image/jpeg";
  if (bytes[0] === 71 && bytes[1] === 73 && bytes[2] === 70) return "image/gif";
  if (bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70 && bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) {
    return "image/webp";
  }
  try {
    const head = new import_util2.TextDecoder("utf-8").decode(bytes.slice(0, 256));
    if (head.includes("<svg") || head.includes("<?xml")) return "image/svg+xml";
  } catch {
  }
  return "application/octet-stream";
}
function getMaxInlineMediaBytes() {
  const configured = vscode.workspace.getConfiguration("mdocx").get("maxInlineMediaBytes");
  if (typeof configured === "number" && Number.isFinite(configured) && configured > 0) {
    return configured;
  }
  return 25 * 1024 * 1024;
}
function makeMediaId(fileName, existingIds) {
  const base = fileName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_") || "media";
  if (!existingIds.has(base)) return base;
  let index = 2;
  while (existingIds.has(`${base}_${index}`)) index++;
  return `${base}_${index}`;
}

// src/mdocxFileSystemProvider.ts
var MdocxFileSystemProvider = class _MdocxFileSystemProvider {
  static scheme = "mdocx-md";
  _onDidChangeFile = new vscode2.EventEmitter();
  onDidChangeFile = this._onDidChangeFile.event;
  static register(context) {
    const provider = new _MdocxFileSystemProvider();
    return vscode2.workspace.registerFileSystemProvider(_MdocxFileSystemProvider.scheme, provider, {
      isCaseSensitive: true,
      isReadonly: false
    });
  }
  /**
   * Build a URI for an embedded markdown file.
   */
  static buildUri(mdocxUri, embeddedPath) {
    const encodedMdocx = encodeURIComponent(mdocxUri.fsPath);
    const normalizedPath = embeddedPath.startsWith("/") ? embeddedPath : "/" + embeddedPath;
    return vscode2.Uri.parse(`${_MdocxFileSystemProvider.scheme}://${encodedMdocx}${normalizedPath}`);
  }
  /**
   * Parse a mdocx-md URI back to (mdocxUri, embeddedPath).
   * Returns null if the URI is malformed.
   */
  static parseUri(uri) {
    try {
      if (!uri.authority) {
        return null;
      }
      const mdocxFsPath = decodeURIComponent(uri.authority);
      if (!mdocxFsPath) {
        return null;
      }
      const embeddedPath = uri.path.startsWith("/") ? uri.path.slice(1) : uri.path;
      if (!embeddedPath) {
        return null;
      }
      return {
        mdocxUri: vscode2.Uri.file(mdocxFsPath),
        embeddedPath
      };
    } catch {
      return null;
    }
  }
  // --- FileSystemProvider implementation ---
  watch(_uri) {
    return new vscode2.Disposable(() => {
    });
  }
  async stat(uri) {
    try {
      const parsed = _MdocxFileSystemProvider.parseUri(uri);
      if (!parsed) {
        throw vscode2.FileSystemError.FileNotFound(uri);
      }
      const { mdocxUri, embeddedPath } = parsed;
      const file = await this.findFile(mdocxUri, embeddedPath);
      if (!file) {
        throw vscode2.FileSystemError.FileNotFound(uri);
      }
      const containerStat = await vscode2.workspace.fs.stat(mdocxUri);
      return {
        type: vscode2.FileType.File,
        ctime: containerStat.ctime,
        mtime: containerStat.mtime,
        size: file.content.byteLength
      };
    } catch (e) {
      if (e instanceof vscode2.FileSystemError) {
        throw e;
      }
      throw vscode2.FileSystemError.FileNotFound(uri);
    }
  }
  async readDirectory(_uri) {
    return [];
  }
  createDirectory(_uri) {
    throw vscode2.FileSystemError.NoPermissions("Cannot create directories in MDOCX.");
  }
  async readFile(uri) {
    try {
      const parsed = _MdocxFileSystemProvider.parseUri(uri);
      if (!parsed) {
        throw vscode2.FileSystemError.FileNotFound(uri);
      }
      const { mdocxUri, embeddedPath } = parsed;
      const file = await this.findFile(mdocxUri, embeddedPath);
      if (!file) {
        throw vscode2.FileSystemError.FileNotFound(uri);
      }
      return file.content;
    } catch (e) {
      if (e instanceof vscode2.FileSystemError) {
        throw e;
      }
      throw vscode2.FileSystemError.FileNotFound(uri);
    }
  }
  async writeFile(uri, content, _options) {
    const parsed = _MdocxFileSystemProvider.parseUri(uri);
    if (!parsed) {
      throw vscode2.FileSystemError.FileNotFound(uri);
    }
    const { mdocxUri, embeddedPath } = parsed;
    await updateDocument(mdocxUri, (doc) => {
      const file = doc.markdown.files.find((f) => f.path === embeddedPath);
      if (!file) {
        throw vscode2.FileSystemError.FileNotFound(uri);
      }
      file.content = content;
    });
    this._onDidChangeFile.fire([{ type: vscode2.FileChangeType.Changed, uri }]);
  }
  delete(_uri, _options) {
    throw vscode2.FileSystemError.NoPermissions("Cannot delete files from MDOCX via this provider.");
  }
  rename(_oldUri, _newUri, _options) {
    throw vscode2.FileSystemError.NoPermissions("Cannot rename files in MDOCX via this provider.");
  }
  // --- Helpers ---
  async findFile(mdocxUri, embeddedPath) {
    try {
      const doc = await readDocument(mdocxUri);
      return doc.markdown.files.find((f) => f.path === embeddedPath);
    } catch {
      return void 0;
    }
  }
};

// src/mdocxRender.ts
var import_buffer = require("buffer");

// node_modules/marked/lib/marked.esm.js
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$1(html2, encode) {
  if (encode) {
    if (escapeTest.test(html2)) {
      return html2.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html2)) {
      return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html2) {
  return html2.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  let source = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    }
  };
  return obj;
}
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
var noopTest = { exec: () => null };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function outputLink(cap, link2, raw, lexer2) {
  const href = link2.href;
  const title = link2.title ? escape$1(link2.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape$1(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var _Tokenizer = class {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let text = cap[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1");
      text = rtrim(text.replace(/^ *>[ \t]?/gm, ""), "\n");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let raw = "";
      let itemContents = "";
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t) => " ".repeat(3 * t.length));
        let nextLine = src.split("\n", 1)[0];
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        let blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      list2.items[list2.items.length - 1].raw = raw.trimEnd();
      list2.items[list2.items.length - 1].text = itemContents.trimEnd();
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!/[:|]/.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(/^\||\| *$/g, "").split("|");
    const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (/^ *-+: *$/.test(align)) {
        item.align.push("right");
      } else if (/^ *:-+: *$/.test(align)) {
        item.align.push("center");
      } else if (/^ *:-+ *$/.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (const header of headers) {
      item.header.push({
        text: header,
        tokens: this.lexer.inline(header)
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell)
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape$1(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(/\s+/g, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$1(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape$1(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
        } while (prevCapZero !== cap[0]);
        text = escape$1(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = cap[0];
      } else {
        text = escape$1(cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
var newline = /^(?: *(?:\n|$))+/;
var blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = {
  ...blockNormal,
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
var blockPedantic = {
  ...blockNormal,
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = "\\p{P}\\p{S}";
var punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
var blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape,
  link,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = {
  ...inlineNormal,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
var inlineGfm = {
  ...inlineNormal,
  escape: edit(escape).replace("])", "~|])").getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
var inlineBreaks = {
  ...inlineGfm,
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var _Lexer = class __Lexer {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token;
    let lastToken;
    let cutSrc;
    let lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var _Renderer = class {
  options;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/^\S*/)?.[0];
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape$1(lang) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html2, block2) {
    return html2;
  }
  heading(text, level, raw) {
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text, task, checked) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag2 = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  em(text) {
    return `<em>${text}</em>`;
  }
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return "<br>";
  }
  del(text) {
    return `<del>${text}</del>`;
  }
  link(href, title, text) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var _TextRenderer = class {
  // no need for block level renderers
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var _Parser = class __Parser {
  options;
  renderer;
  textRenderer;
  constructor(options2) {
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const genericToken = token;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          const headingToken = token;
          out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const codeToken = token;
          out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
          continue;
        }
        case "table": {
          const tableToken = token;
          let header = "";
          let cell = "";
          for (let j = 0; j < tableToken.header.length; j++) {
            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), { header: true, align: tableToken.align[j] });
          }
          header += this.renderer.tablerow(cell);
          let body = "";
          for (let j = 0; j < tableToken.rows.length; j++) {
            const row = tableToken.rows[j];
            cell = "";
            for (let k = 0; k < row.length; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: tableToken.align[k] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          const blockquoteToken = token;
          const body = this.parse(blockquoteToken.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          const listToken = token;
          const ordered = listToken.ordered;
          const start = listToken.start;
          const loose = listToken.loose;
          let body = "";
          for (let j = 0; j < listToken.items.length; j++) {
            const item = listToken.items[j];
            const checked = item.checked;
            const task = item.task;
            let itemBody = "";
            if (item.task) {
              const checkbox = this.renderer.checkbox(!!checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox + " "
                  });
                }
              } else {
                itemBody += checkbox + " ";
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, !!checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          const htmlToken = token;
          out += this.renderer.html(htmlToken.text, htmlToken.block);
          continue;
        }
        case "paragraph": {
          const paragraphToken = token;
          out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
          continue;
        }
        case "text": {
          let textToken = token;
          let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          const escapeToken = token;
          out += renderer.text(escapeToken.text);
          break;
        }
        case "html": {
          const tagToken = token;
          out += renderer.html(tagToken.text);
          break;
        }
        case "link": {
          const linkToken = token;
          out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
          break;
        }
        case "image": {
          const imageToken = token;
          out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
          break;
        }
        case "strong": {
          const strongToken = token;
          out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
          break;
        }
        case "em": {
          const emToken = token;
          out += renderer.em(this.parseInline(emToken.tokens, renderer));
          break;
        }
        case "codespan": {
          const codespanToken = token;
          out += renderer.codespan(codespanToken.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          const delToken = token;
          out += renderer.del(this.parseInline(delToken.tokens, renderer));
          break;
        }
        case "text": {
          const textToken = token;
          out += renderer.text(textToken.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var _Hooks = class {
  options;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html2) {
    return html2;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
};
var Marked = class {
  defaults = _getDefaults();
  options = this.setOptions;
  parse = this.#parseMarkdown(_Lexer.lex, _Parser.parse);
  parseInline = this.#parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
  Parser = _Parser;
  Renderer = _Renderer;
  TextRenderer = _TextRenderer;
  Lexer = _Lexer;
  Tokenizer = _Tokenizer;
  Hooks = _Hooks;
  constructor(...args) {
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values = values.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens2) {
            values = values.concat(walkTokens2.call(this, token));
          }
          return values;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
  #parseMarkdown(lexer2, parser2) {
    return (src, options2) => {
      const origOpt = { ...options2 };
      const opt = { ...this.defaults, ...origOpt };
      if (this.defaults.async === true && origOpt.async === false) {
        if (!opt.silent) {
          console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
        }
        opt.async = true;
      }
      const throwError = this.#onError(!!opt.silent, !!opt.async);
      if (typeof src === "undefined" || src === null) {
        return throwError(new Error("marked(): input parameter is undefined or null"));
      }
      if (typeof src !== "string") {
        return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
      }
      if (opt.hooks) {
        opt.hooks.options = opt;
      }
      if (opt.async) {
        return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
      }
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        let tokens = lexer2(src, opt);
        if (opt.hooks) {
          tokens = opt.hooks.processAllTokens(tokens);
        }
        if (opt.walkTokens) {
          this.walkTokens(tokens, opt.walkTokens);
        }
        let html2 = parser2(tokens, opt);
        if (opt.hooks) {
          html2 = opt.hooks.postprocess(html2);
        }
        return html2;
      } catch (e) {
        return throwError(e);
      }
    };
  }
  #onError(silent, async) {
    return (e) => {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (silent) {
        const msg = "<p>An error occurred:</p><pre>" + escape$1(e.message + "", true) + "</pre>";
        if (async) {
          return Promise.resolve(msg);
        }
        return msg;
      }
      if (async) {
        return Promise.reject(e);
      }
      throw e;
    };
  }
};
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// src/mdocxRender.ts
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function docAnchorId(filePath) {
  return "doc-" + filePath.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}
function createSlugger() {
  const seen = /* @__PURE__ */ new Map();
  return (text) => {
    const base = text.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}
function collectHeadingTokens(tokens, out) {
  for (const token of tokens) {
    if (!token || typeof token !== "object") continue;
    if (token.type === "heading") {
      out.push(token);
    }
    if (Array.isArray(token.tokens) && token.type !== "heading") {
      collectHeadingTokens(token.tokens, out);
    }
    if (Array.isArray(token.items)) {
      collectHeadingTokens(token.items, out);
    }
  }
}
function extractOutline(markdown) {
  const slug = createSlugger();
  const headings = [];
  try {
    collectHeadingTokens(marked.lexer(markdown), headings);
  } catch {
    return [];
  }
  return headings.map((token) => {
    const text = String(token.text ?? "").replace(/[*_`~]/g, "");
    return { level: Number(token.depth) || 1, text, id: slug(text) };
  });
}
function sanitizeHref(href) {
  const raw = (href ?? "").trim();
  if (!raw) return null;
  if (raw.startsWith("#")) return raw;
  if (/^mailto:/i.test(raw)) return raw;
  if (/^data:/i.test(raw)) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  return null;
}
function renderMarkdown(markdown, options2) {
  const outline = extractOutline(markdown);
  let headingIndex = 0;
  const fallbackSlug = createSlugger();
  const renderer = new marked.Renderer();
  renderer.html = () => "";
  renderer.heading = (text, level) => {
    const entry = outline[headingIndex++];
    const id = entry ? entry.id : fallbackSlug(text);
    return `<h${level} id="${escapeHtml(id)}"><a class="heading-anchor" href="#${escapeHtml(
      id
    )}" aria-hidden="true">#</a>${text}</h${level}>
`;
  };
  renderer.code = (code, infostring) => {
    const lang = (infostring || "").split(/\s+/)[0] ?? "";
    return `<div class="code-block"${lang ? ` data-lang="${escapeHtml(lang)}"` : ""}><pre><code${lang ? ` class="language-${escapeHtml(lang)}"` : ""}>${escapeHtml(code)}</code></pre></div>
`;
  };
  renderer.link = (href, title, text) => {
    const raw = (href ?? "").trim();
    const embedded = options2?.resolveFileHref?.(raw);
    const t = title ? ` title="${escapeHtml(title)}"` : "";
    if (embedded) {
      return `<a href="#${docAnchorId(embedded)}" class="internal-link" data-mdocx-file="${escapeHtml(
        embedded
      )}"${t}>${text}</a>`;
    }
    const media = options2?.resolveMediaHref?.(raw);
    const safe = sanitizeHref(media ?? raw);
    if (!safe) return text;
    const external = /^https?:\/\//i.test(safe);
    const rel = external ? ' rel="noreferrer noopener" target="_blank"' : "";
    return `<a href="${escapeHtml(safe)}"${t}${rel}>${text}</a>`;
  };
  renderer.image = (href, title, text) => {
    const safe = sanitizeHref(href);
    if (!safe) return `<span class="missing-media">${escapeHtml(text || "missing media")}</span>`;
    const t = title ? ` title="${escapeHtml(title)}"` : "";
    return `<img src="${escapeHtml(safe)}" alt="${escapeHtml(text ?? "")}"${t} loading="lazy" />`;
  };
  const walkTokens2 = (token) => {
    if (!options2?.resolveMediaHref) return;
    if (token?.type === "image" && typeof token.href === "string") {
      const rewritten = options2.resolveMediaHref(token.href);
      if (rewritten) token.href = rewritten;
    }
  };
  const parsed = marked.parse(markdown, { renderer, walkTokens: walkTokens2, gfm: true, breaks: false });
  return { html: typeof parsed === "string" ? parsed : "", outline };
}
function hrefCandidates(href) {
  const rawHref = href.trim().replace(/^<|>$/g, "");
  if (!rawHref) return [];
  const withoutFragmentOrQuery = rawHref.split("#")[0]?.split("?")[0] ?? rawHref;
  const normalized = withoutFragmentOrQuery.replace(/\\/g, "/");
  const candidates = /* @__PURE__ */ new Set([normalized]);
  if (normalized.startsWith("./")) candidates.add(normalized.slice(2));
  if (normalized.startsWith("/")) candidates.add(normalized.slice(1));
  try {
    candidates.add(decodeURI(normalized));
  } catch {
  }
  return [...candidates].filter(Boolean);
}
function isExternalHref(href) {
  const raw = href.trim();
  return /^https?:\/\//i.test(raw) || /^data:/i.test(raw) || /^mailto:/i.test(raw) || raw.startsWith("#");
}
function toDataUri(mimeType, data) {
  return `data:${mimeType};base64,${import_buffer.Buffer.from(data).toString("base64")}`;
}

// src/mdocxPreviewEditorProvider.ts
var viewType = "mdocx.preview";
var SELF_WRITE_GRACE_MS = 900;
var MdocxPreviewEditorProvider = class _MdocxPreviewEditorProvider {
  constructor(_context) {
    this._context = _context;
  }
  static register(context) {
    const provider = new _MdocxPreviewEditorProvider(context);
    return vscode3.window.registerCustomEditorProvider(viewType, provider, {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    });
  }
  async openCustomDocument(uri, _openContext, _token) {
    return {
      uri,
      dispose: () => {
      }
    };
  }
  async resolveCustomEditor(document, webviewPanel, _token) {
    webviewPanel.webview.options = {
      enableScripts: true
    };
    let selectedPath;
    let hasReceivedReady = false;
    let lastSelfWrite = 0;
    const postRender = async (target) => {
      const response = await this.renderDocument(document.uri, target ?? selectedPath);
      selectedPath = response.path || target || selectedPath;
      await webviewPanel.webview.postMessage(response);
    };
    const mutate = async (action, successMessage) => {
      try {
        lastSelfWrite = Date.now();
        await action();
        lastSelfWrite = Date.now();
        if (successMessage) {
          void vscode3.window.showInformationMessage(successMessage);
        }
        await postRender(selectedPath);
        return true;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        void vscode3.window.showErrorMessage(`MDOCX: ${message}`);
        return false;
      }
    };
    const confirmDestructive = async (prompt, action) => {
      const shouldConfirm = vscode3.workspace.getConfiguration("mdocx").get("confirmDelete", true);
      if (!shouldConfirm) return true;
      const answer = await vscode3.window.showWarningMessage(prompt, { modal: true }, action);
      return answer === action;
    };
    const messageDisposable = webviewPanel.webview.onDidReceiveMessage(async (message) => {
      if (!message || typeof message.type !== "string") return;
      switch (message.type) {
        case "ready": {
          hasReceivedReady = true;
          if (typeof message.selectedPath === "string" && message.selectedPath.length > 0) {
            selectedPath = message.selectedPath;
          }
          await postRender(selectedPath);
          return;
        }
        case "select": {
          selectedPath = message.path;
          await postRender(selectedPath);
          return;
        }
        case "copy": {
          const pathToCopy = message.path || selectedPath;
          const text = await this.getMarkdownText(document.uri, pathToCopy);
          if (!text) {
            void vscode3.window.showWarningMessage("MDOCX: No markdown content to copy.");
            return;
          }
          await vscode3.env.clipboard.writeText(text);
          void vscode3.window.showInformationMessage("MDOCX: Markdown copied to clipboard.");
          return;
        }
        case "editExternal": {
          const pathToEdit = message.path || selectedPath;
          if (!pathToEdit) {
            void vscode3.window.showWarningMessage("MDOCX: No markdown file selected to edit.");
            return;
          }
          const editUri = MdocxFileSystemProvider.buildUri(document.uri, pathToEdit);
          await vscode3.window.showTextDocument(editUri, { preview: false });
          return;
        }
        case "getMarkdownContent": {
          if (!message.path) return;
          const text = await this.getMarkdownText(document.uri, message.path);
          await webviewPanel.webview.postMessage({
            type: "markdownContent",
            path: message.path,
            content: text || ""
          });
          return;
        }
        case "renderPreview": {
          const rendered = await this.renderLivePreview(document.uri, message.path, message.content);
          await webviewPanel.webview.postMessage({ type: "previewHtml", path: message.path, ...rendered });
          return;
        }
        case "search": {
          const results = await this.search(document.uri, message.query);
          await webviewPanel.webview.postMessage({ type: "searchResults", query: message.query, results });
          return;
        }
        case "saveContent": {
          if (!message.path) {
            void vscode3.window.showWarningMessage("MDOCX: No file path specified.");
            return;
          }
          const ok = await mutate(
            () => updateDocument(document.uri, (doc) => {
              const file = doc.markdown.files.find((f) => f.path === message.path);
              if (!file) throw new Error(`File "${message.path}" not found in this MDOCX`);
              file.content = encodeText(message.content);
            })
          );
          if (ok) {
            await webviewPanel.webview.postMessage({ type: "saved", path: message.path });
          }
          return;
        }
        case "saveMetadata": {
          await mutate(() => this.saveMetadata(document.uri, message.metadata), "MDOCX: Metadata saved.");
          return;
        }
        case "addMedia": {
          const files = await vscode3.window.showOpenDialog({
            canSelectMany: true,
            openLabel: "Add Media",
            filters: {
              Images: ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"],
              Media: ["mp3", "wav", "ogg", "mp4", "webm"],
              "All Files": ["*"]
            }
          });
          if (files && files.length > 0) {
            await mutate(() => this.addMediaFiles(document.uri, files), `MDOCX: Added ${files.length} media file(s).`);
          }
          return;
        }
        case "removeMedia": {
          if (!await confirmDestructive(`Remove media "${message.id}" from MDOCX?`, "Remove")) return;
          await mutate(
            () => updateDocument(document.uri, (doc) => {
              const index = doc.media.items.findIndex((item) => item.id === message.id);
              if (index >= 0) doc.media.items.splice(index, 1);
            }),
            "MDOCX: Media removed."
          );
          return;
        }
        case "replaceMedia": {
          const files = await vscode3.window.showOpenDialog({
            canSelectMany: false,
            openLabel: "Replace Media",
            filters: { "All Files": ["*"] }
          });
          if (files && files.length > 0) {
            await mutate(() => this.replaceMedia(document.uri, message.id, files[0]), "MDOCX: Media replaced.");
          }
          return;
        }
        case "exportMedia": {
          await this.exportMedia(document.uri, message.id);
          return;
        }
        case "addMarkdown": {
          const existing = (await this.safeReadDocument(document.uri))?.markdown.files.map((f) => f.path) ?? [];
          const fileName = await vscode3.window.showInputBox({
            prompt: "Enter the path for the new markdown file",
            value: "new-file.md",
            validateInput: (value) => this.validateMarkdownPath(value, existing)
          });
          if (!fileName) return;
          const created = await mutate(
            () => updateDocument(document.uri, (doc) => {
              const name = path.basename(fileName, path.extname(fileName));
              doc.markdown.files.push({
                path: fileName,
                content: encodeText(`# ${name}

Start writing here...
`)
              });
            }),
            `MDOCX: Added ${fileName}`
          );
          if (created) {
            selectedPath = fileName;
            await postRender(selectedPath);
          }
          return;
        }
        case "renameMarkdown": {
          const existing = (await this.safeReadDocument(document.uri))?.markdown.files.map((f) => f.path) ?? [];
          const newPath = await vscode3.window.showInputBox({
            prompt: "Enter the new path for this markdown file",
            value: message.path,
            validateInput: (value) => value === message.path ? void 0 : this.validateMarkdownPath(value, existing)
          });
          if (!newPath || newPath === message.path) return;
          const renamed = await mutate(
            () => updateDocument(document.uri, (doc) => {
              const file = doc.markdown.files.find((f) => f.path === message.path);
              if (!file) throw new Error(`File "${message.path}" not found in this MDOCX`);
              file.path = newPath;
              if (doc.markdown.rootPath === message.path) doc.markdown.rootPath = newPath;
              if (doc.metadata?.root === message.path) doc.metadata.root = newPath;
            }),
            `MDOCX: Renamed to ${newPath}`
          );
          if (renamed && selectedPath === message.path) {
            selectedPath = newPath;
            await postRender(selectedPath);
          }
          return;
        }
        case "duplicateMarkdown": {
          await mutate(
            () => updateDocument(document.uri, (doc) => {
              const file = doc.markdown.files.find((f) => f.path === message.path);
              if (!file) throw new Error(`File "${message.path}" not found in this MDOCX`);
              const taken = new Set(doc.markdown.files.map((f) => f.path));
              const ext = path.extname(message.path);
              const base = message.path.slice(0, message.path.length - ext.length);
              let candidate = `${base}-copy${ext}`;
              let index = 2;
              while (taken.has(candidate)) candidate = `${base}-copy-${index++}${ext}`;
              doc.markdown.files.push({ path: candidate, content: file.content.slice() });
            }),
            "MDOCX: File duplicated."
          );
          return;
        }
        case "setRoot": {
          await mutate(
            () => updateDocument(document.uri, (doc) => {
              doc.markdown.rootPath = message.path;
              doc.metadata = doc.metadata || {};
              doc.metadata.root = message.path;
            }),
            `MDOCX: Root file set to ${message.path}`
          );
          return;
        }
        case "deleteMarkdown": {
          if (!await confirmDestructive(`Delete "${message.path}" from MDOCX? This cannot be undone.`, "Delete")) {
            return;
          }
          const deleted = await mutate(
            () => updateDocument(document.uri, (doc) => {
              const index = doc.markdown.files.findIndex((f) => f.path === message.path);
              if (index >= 0) doc.markdown.files.splice(index, 1);
              if (doc.markdown.rootPath === message.path && doc.markdown.files.length > 0) {
                doc.markdown.rootPath = doc.markdown.files[0].path;
              }
            }),
            "MDOCX: File deleted."
          );
          if (deleted && selectedPath === message.path) {
            selectedPath = void 0;
            await postRender(void 0);
          }
          return;
        }
        case "exportHtml": {
          await vscode3.commands.executeCommand("mdocx.exportHtml", document.uri);
          return;
        }
      }
    });
    const pattern = new vscode3.RelativePattern(path.dirname(document.uri.fsPath), path.basename(document.uri.fsPath));
    const watcher = vscode3.workspace.createFileSystemWatcher(pattern);
    const onDiskChange = async () => {
      if (Date.now() - lastSelfWrite < SELF_WRITE_GRACE_MS) return;
      await postRender(selectedPath);
    };
    const watcherDisposables = [
      watcher,
      watcher.onDidChange(onDiskChange),
      watcher.onDidCreate(onDiskChange),
      watcher.onDidDelete(async () => {
        await webviewPanel.webview.postMessage({
          type: "render",
          path: "",
          title: "MDOCX",
          description: void 0,
          html: "",
          fileList: [],
          error: "The file was deleted from disk."
        });
      })
    ];
    webviewPanel.webview.html = this.getWebviewHtml(webviewPanel.webview);
    const readyFallback = setTimeout(async () => {
      if (!hasReceivedReady) {
        await postRender(selectedPath);
      }
    }, 500);
    webviewPanel.onDidDispose(() => {
      clearTimeout(readyFallback);
      messageDisposable.dispose();
      watcherDisposables.forEach((d) => d.dispose());
    });
  }
  validateMarkdownPath(value, existing) {
    const trimmed = (value || "").trim();
    if (!trimmed) return "File name cannot be empty";
    if (!/\.(md|markdown)$/i.test(trimmed)) return "File must have a .md or .markdown extension";
    if (trimmed.startsWith("/") || trimmed.includes("..") || /^[a-zA-Z]:/.test(trimmed)) {
      return 'Use a relative path inside the container (no "..", no drive letters)';
    }
    if (existing.includes(trimmed)) return `"${trimmed}" already exists in this MDOCX`;
    return void 0;
  }
  async safeReadDocument(uri) {
    try {
      return await readDocument(uri);
    } catch {
      return void 0;
    }
  }
  countWords(text) {
    const matches = text.match(/[\p{L}\p{N}'-]+/gu);
    return matches ? matches.length : 0;
  }
  async renderDocument(resource, selectedPath) {
    try {
      const doc = await readDocument(resource);
      const { MediaResolver: MediaResolver2 } = await Promise.resolve().then(() => (init_dist(), dist_exports));
      const rootPath = doc.markdown.rootPath ?? (typeof doc.metadata?.root === "string" ? doc.metadata.root : void 0);
      const fileList = doc.markdown.files.map((file) => ({
        path: file.path,
        words: this.countWords(decodeText(file.content)),
        size: file.content.byteLength,
        isRoot: file.path === rootPath
      })).sort((a, b) => a.path.localeCompare(b.path));
      const selectedFile = findMarkdownFile(doc, selectedPath);
      if (!selectedFile) {
        return {
          type: "render",
          path: selectedPath ?? "",
          html: "",
          fileList,
          error: "No markdown files found in this MDOCX."
        };
      }
      const markdownText = decodeText(selectedFile.content);
      const resolver = new MediaResolver2(doc);
      const knownPaths = new Set(doc.markdown.files.map((f) => f.path));
      const { html: html2, outline } = renderMarkdown(markdownText, {
        resolveMediaHref: (href) => this.tryResolveMediaHrefToDataUri(resolver, href, selectedFile),
        resolveFileHref: (href) => this.resolveEmbeddedFile(href, knownPaths)
      });
      const title = typeof doc.metadata?.title === "string" ? doc.metadata.title : void 0;
      const description = typeof doc.metadata?.description === "string" ? doc.metadata.description : void 0;
      const metadata = {
        title,
        description,
        author: typeof doc.metadata?.creator === "string" ? doc.metadata.creator : void 0,
        root: rootPath,
        tags: Array.isArray(doc.metadata?.tags) ? doc.metadata.tags : void 0
      };
      const allMarkdown = doc.markdown.files.map((f) => decodeText(f.content)).join("\n");
      const mediaItems = doc.media.items.map((item) => {
        const mimeType = inferMimeType(item);
        const info = {
          id: item.id,
          path: item.path,
          mimeType,
          size: item.data?.byteLength ?? 0,
          used: this.isMediaReferenced(item, allMarkdown)
        };
        if (mimeType.startsWith("image/") && item.data && item.data.byteLength < 512 * 1024) {
          info.dataUri = toDataUri(mimeType, item.data);
        }
        return info;
      });
      const stats = {
        files: fileList.length,
        media: mediaItems.length,
        words: fileList.reduce((sum, f) => sum + f.words, 0),
        mediaBytes: mediaItems.reduce((sum, m) => sum + m.size, 0)
      };
      return {
        type: "render",
        path: selectedFile.path,
        title,
        description,
        html: html2,
        markdown: markdownText,
        outline,
        fileList,
        metadata,
        mediaItems,
        stats
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        type: "render",
        path: selectedPath ?? "",
        html: "",
        fileList: [],
        error: `Failed to read MDOCX: ${message}`
      };
    }
  }
  async renderLivePreview(resource, filePath, content) {
    try {
      const doc = await readDocument(resource);
      const { MediaResolver: MediaResolver2 } = await Promise.resolve().then(() => (init_dist(), dist_exports));
      const resolver = new MediaResolver2(doc);
      const knownPaths = new Set(doc.markdown.files.map((f) => f.path));
      return renderMarkdown(content, {
        resolveMediaHref: (href) => this.tryResolveMediaHrefToDataUri(resolver, href, { path: filePath }),
        resolveFileHref: (href) => this.resolveEmbeddedFile(href, knownPaths)
      });
    } catch {
      return { html: "", outline: [] };
    }
  }
  async search(resource, query) {
    const trimmed = (query || "").trim();
    if (trimmed.length < 2) return [];
    const doc = await this.safeReadDocument(resource);
    if (!doc) return [];
    const needle = trimmed.toLowerCase();
    const results = [];
    const limit = 200;
    for (const file of doc.markdown.files) {
      const lines = decodeText(file.content).split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        if (!lines[i].toLowerCase().includes(needle)) continue;
        results.push({ path: file.path, line: i + 1, text: lines[i].trim().slice(0, 160) });
        if (results.length >= limit) return results;
      }
    }
    return results;
  }
  isMediaReferenced(item, allMarkdown) {
    if (allMarkdown.includes(item.id)) return true;
    if (item.path) {
      if (allMarkdown.includes(item.path)) return true;
      const base = item.path.split("/").pop();
      if (base && allMarkdown.includes(base)) return true;
    }
    return false;
  }
  resolveEmbeddedFile(href, knownPaths) {
    if (!href || isExternalHref(href)) return void 0;
    for (const candidate of hrefCandidates(href)) {
      if (knownPaths.has(candidate)) return candidate;
    }
    return void 0;
  }
  async getMarkdownText(resource, selectedPath) {
    try {
      const doc = await readDocument(resource);
      const file = findMarkdownFile(doc, selectedPath);
      return file ? decodeText(file.content) : void 0;
    } catch {
      return void 0;
    }
  }
  async saveMetadata(resource, metadata) {
    await updateDocument(resource, (doc) => {
      const existing = doc.metadata || {};
      if (metadata.title !== void 0) existing.title = metadata.title;
      if (metadata.description !== void 0) existing.description = metadata.description;
      if (metadata.author !== void 0) existing.creator = metadata.author;
      if (metadata.root !== void 0) existing.root = metadata.root;
      if (metadata.tags !== void 0) existing.tags = metadata.tags;
      doc.metadata = existing;
      if (metadata.root !== void 0) doc.markdown.rootPath = metadata.root;
    });
  }
  async addMediaFiles(resource, files) {
    const payloads = await Promise.all(
      files.map(async (file) => ({
        data: new Uint8Array(await vscode3.workspace.fs.readFile(file)),
        fileName: path.basename(file.fsPath)
      }))
    );
    await updateDocument(resource, (doc) => {
      const taken = new Set(doc.media.items.map((item) => item.id));
      for (const { data, fileName } of payloads) {
        const id = makeMediaId(fileName, taken);
        taken.add(id);
        doc.media.items.push({
          id,
          path: `media/${fileName}`,
          mimeType: getMimeTypeFromExtension(path.extname(fileName)),
          data
        });
      }
    });
  }
  async replaceMedia(resource, mediaId, newFile) {
    const data = new Uint8Array(await vscode3.workspace.fs.readFile(newFile));
    const fileName = path.basename(newFile.fsPath);
    await updateDocument(resource, (doc) => {
      const item = doc.media.items.find((i) => i.id === mediaId);
      if (!item) throw new Error(`Media "${mediaId}" not found in this MDOCX`);
      item.data = data;
      item.mimeType = getMimeTypeFromExtension(path.extname(fileName));
      item.path = `media/${fileName}`;
    });
  }
  async exportMedia(resource, mediaId) {
    try {
      const doc = await readDocument(resource);
      const item = doc.media.items.find((i) => i.id === mediaId);
      if (!item?.data) {
        void vscode3.window.showWarningMessage(`MDOCX: Media "${mediaId}" has no data.`);
        return;
      }
      const suggested = item.path ? path.basename(item.path) : mediaId;
      const target = await vscode3.window.showSaveDialog({
        defaultUri: vscode3.Uri.joinPath(vscode3.Uri.file(path.dirname(resource.fsPath)), suggested),
        saveLabel: "Export Media"
      });
      if (!target) return;
      await vscode3.workspace.fs.writeFile(target, item.data);
      void vscode3.window.showInformationMessage(`MDOCX: Exported ${suggested}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      void vscode3.window.showErrorMessage(`MDOCX: ${message}`);
    }
  }
  tryResolveMediaHrefToDataUri(resolver, href, fromFile) {
    if (!href || isExternalHref(href)) return void 0;
    let item;
    for (const candidate of hrefCandidates(href)) {
      try {
        item = resolver.resolve(candidate, fromFile);
        if (item) break;
      } catch {
      }
      try {
        if (!item && typeof resolver.getByPath === "function") {
          item = resolver.getByPath(candidate);
          if (item) break;
        }
      } catch {
      }
      try {
        const m = /^mdocx:\/\/media\/(.+)$/i.exec(candidate);
        if (!item && m && typeof resolver.getById === "function") {
          item = resolver.getById(m[1]);
          if (item) break;
        }
      } catch {
      }
    }
    if (!item || !item.data) return void 0;
    const maxInlineBytes = getMaxInlineMediaBytes();
    if (typeof item.data.byteLength === "number" && item.data.byteLength > maxInlineBytes) {
      return void 0;
    }
    return toDataUri(inferMimeType(item), item.data);
  }
  getWebviewHtml(_webview) {
    const nonce = String(Date.now());
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https: http:; media-src data:; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MDOCX Preview</title>
  <style>
    :root {
      color-scheme: light dark;
      --border-color: var(--vscode-editorGroup-border, rgba(128,128,128,0.35));
      --panel-bg: color-mix(in srgb, var(--vscode-editor-background) 92%, black);
      --panel-hover-bg: color-mix(in srgb, var(--vscode-editor-background) 85%, black);
      --danger-bg: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      --header-height: 52px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      overflow: hidden;
    }
    header {
      height: var(--header-height);
      padding: 0 12px;
      border-bottom: 1px solid var(--border-color);
      background: var(--vscode-editor-background);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    header .meta {
      flex: 1;
      min-width: 60px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      overflow: hidden;
    }
    header .meta .title {
      font-weight: 600;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    header .meta .desc {
      opacity: 0.65;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    select, input, textarea {
      padding: 5px 8px;
      border: 1px solid var(--vscode-input-border, var(--border-color));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 4px;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      width: 100%;
    }
    select:focus, input:focus, textarea:focus {
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
    button {
      border: 1px solid var(--vscode-button-border, transparent);
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    button svg { width: 13px; height: 13px; fill: currentColor; opacity: 0.9; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    button.secondary {
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    button.secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
    button.small { padding: 3px 7px; font-size: 11px; }
    button.icon {
      background: transparent;
      border: none;
      color: var(--vscode-foreground);
      padding: 2px 4px;
      opacity: 0.75;
    }
    button.icon:hover { opacity: 1; background: var(--panel-hover-bg); }

    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      height: calc(100vh - var(--header-height));
    }
    .layout.sidebar-hidden { grid-template-columns: 1fr; }
    .layout.sidebar-hidden .sidebar { display: none; }
    @media (max-width: 760px) {
      .layout { grid-template-columns: 1fr; }
      .sidebar { border-right: none !important; border-bottom: 1px solid var(--border-color); }
    }
    .sidebar {
      border-right: 1px solid var(--border-color);
      background: var(--panel-bg);
      overflow-y: auto;
    }
    .main-content {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .view-area { flex: 1; display: flex; min-height: 0; }
    .view-area > section {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .view-area.mode-preview #editorView { display: none; }
    .view-area.mode-edit #previewView { display: none; }
    .view-area.mode-split #editorView { border-left: 1px solid var(--border-color); }

    .doc-body {
      padding: 20px 26px 60px;
      overflow-y: auto;
      flex: 1;
      line-height: 1.6;
    }
    .doc-body img { max-width: 100%; border-radius: 4px; }
    .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4 { line-height: 1.3; }
    .doc-body h1:first-child { margin-top: 0; }
    .doc-body h1, .doc-body h2 { border-bottom: 1px solid var(--border-color); padding-bottom: 0.25em; }
    .doc-body .heading-anchor {
      opacity: 0;
      text-decoration: none;
      margin-left: -0.8em;
      padding-right: 0.3em;
      color: var(--vscode-textLink-foreground);
      font-weight: 400;
    }
    .doc-body h1:hover .heading-anchor,
    .doc-body h2:hover .heading-anchor,
    .doc-body h3:hover .heading-anchor,
    .doc-body h4:hover .heading-anchor { opacity: 0.6; }
    .doc-body a { color: var(--vscode-textLink-foreground); }
    .doc-body blockquote {
      margin: 1em 0;
      padding: 0.4em 1em;
      border-left: 3px solid var(--vscode-textBlockQuote-border, var(--border-color));
      background: var(--vscode-textBlockQuote-background, transparent);
    }
    .doc-body table {
      border-collapse: collapse;
      margin: 1em 0;
      display: block;
      overflow-x: auto;
      max-width: 100%;
    }
    .doc-body th, .doc-body td { border: 1px solid var(--border-color); padding: 6px 10px; text-align: left; }
    .doc-body th { background: var(--panel-bg); }
    .doc-body code {
      font-family: var(--vscode-editor-font-family);
      font-size: 0.92em;
      background: var(--panel-hover-bg);
      padding: 0.1em 0.35em;
      border-radius: 3px;
    }
    .doc-body .code-block { position: relative; margin: 1em 0; }
    .doc-body .code-block pre {
      margin: 0;
      padding: 12px;
      overflow: auto;
      background: var(--panel-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
    }
    .doc-body .code-block pre code { background: none; padding: 0; }
    .doc-body .code-block .code-lang {
      position: absolute;
      top: 7px;
      right: 66px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.5;
    }
    .doc-body .code-block .copy-code {
      position: absolute;
      top: 4px;
      right: 6px;
      opacity: 0;
      transition: opacity 0.12s;
    }
    .doc-body .code-block:hover .copy-code { opacity: 1; }
    .doc-body input[type="checkbox"] { margin-right: 6px; }
    .doc-body .missing-media {
      display: inline-block;
      padding: 2px 6px;
      border: 1px dashed var(--vscode-errorForeground);
      border-radius: 4px;
      font-size: 11px;
      opacity: 0.8;
    }
    .doc-body hr { border: none; border-top: 1px solid var(--border-color); }

    .error {
      color: var(--vscode-errorForeground);
      padding: 10px 14px;
      border: 1px solid var(--vscode-errorForeground);
      border-radius: 6px;
      margin: 12px 24px;
      white-space: pre-wrap;
    }

    .sidebar-section { border-bottom: 1px solid var(--border-color); }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.85;
    }
    .section-header:hover { background: var(--panel-hover-bg); }
    .section-header .chevron { width: 12px; height: 12px; fill: currentColor; transition: transform 0.15s; }
    .section-header.collapsed .chevron { transform: rotate(-90deg); }
    .section-header.collapsed + .section-body { display: none; }
    .section-body { padding: 6px 10px 12px; }
    .section-actions { display: flex; gap: 6px; margin-bottom: 8px; align-items: center; }
    .section-actions input { flex: 1; }

    .file-list, .outline-list, .search-results { list-style: none; margin: 0; padding: 0; }
    .file-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12.5px;
    }
    .file-item:hover { background: var(--panel-hover-bg); }
    .file-item.selected {
      background: var(--vscode-list-activeSelectionBackground);
      color: var(--vscode-list-activeSelectionForeground);
    }
    .file-item .file-icon { width: 14px; height: 14px; fill: currentColor; opacity: 0.7; flex-shrink: 0; }
    .file-item .file-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .file-item .file-actions { display: none; gap: 1px; }
    .file-item:hover .file-actions { display: flex; }
    .file-item.root-file .file-name::after {
      content: 'root';
      margin-left: 6px;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      opacity: 0.6;
      border: 1px solid currentColor;
      border-radius: 6px;
      padding: 0 4px;
    }

    .outline-list li {
      padding: 3px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0.9;
    }
    .outline-list li:hover { background: var(--panel-hover-bg); }
    .outline-list li[data-level="1"] { font-weight: 600; }
    .outline-list li[data-level="2"] { padding-left: 16px; }
    .outline-list li[data-level="3"] { padding-left: 28px; opacity: 0.8; }
    .outline-list li[data-level="4"], .outline-list li[data-level="5"], .outline-list li[data-level="6"] {
      padding-left: 40px;
      opacity: 0.7;
    }

    .search-results li {
      padding: 5px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11.5px;
      border-left: 2px solid transparent;
    }
    .search-results li:hover { background: var(--panel-hover-bg); border-left-color: var(--vscode-focusBorder); }
    .search-results .result-path { opacity: 0.65; font-size: 10px; }
    .search-results .result-text {
      font-family: var(--vscode-editor-font-family);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .search-results mark {
      background: var(--vscode-editor-findMatchHighlightBackground, rgba(234,179,8,0.35));
      color: inherit;
    }

    .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 8px; }
    .media-item {
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 6px;
      text-align: center;
      background: var(--vscode-editor-background);
      position: relative;
    }
    .media-item.unused { border-style: dashed; opacity: 0.75; }
    .media-item.unused::after {
      content: 'unused';
      position: absolute;
      top: 3px;
      right: 4px;
      font-size: 8px;
      text-transform: uppercase;
      opacity: 0.6;
    }
    .media-item img { max-width: 100%; max-height: 56px; object-fit: contain; margin-bottom: 4px; border-radius: 2px; }
    .media-item .placeholder {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--panel-bg);
      border-radius: 4px;
      margin-bottom: 4px;
      font-size: 9px;
      opacity: 0.6;
      word-break: break-all;
    }
    .media-item .info { font-size: 9.5px; word-break: break-all; opacity: 0.8; }
    .media-item .actions { margin-top: 5px; display: flex; gap: 2px; justify-content: center; flex-wrap: wrap; }

    .form-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 9px; }
    .form-row:last-child { margin-bottom: 0; }
    .form-row label { font-size: 10px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.3px; }
    .form-row textarea { min-height: 48px; resize: vertical; }
    .btn-row { display: flex; gap: 8px; margin-top: 10px; }

    .empty-state { text-align: center; padding: 14px; opacity: 0.55; font-size: 11.5px; }
    .badge {
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 10px;
      margin-left: 6px;
    }
    .stats-line { padding: 8px 12px; font-size: 10.5px; opacity: 0.6; }

    .view-toggle {
      display: flex;
      border: 1px solid var(--vscode-button-border, var(--border-color));
      border-radius: 4px;
      overflow: hidden;
    }
    .view-toggle button {
      border: none;
      border-radius: 0;
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    .view-toggle button + button { border-left: 1px solid var(--vscode-button-border, var(--border-color)); }
    .view-toggle button.active {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
    }
    .view-toggle button:hover:not(.active) { background: var(--vscode-button-secondaryHoverBackground); }

    .editor-toolbar {
      display: flex;
      gap: 3px;
      align-items: center;
      padding: 6px 10px;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
    }
    .editor-toolbar .spacer { flex: 1; }
    .editor-toolbar .file-path {
      font-size: 11px;
      opacity: 0.7;
      font-family: var(--vscode-editor-font-family);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 180px;
    }
    .fmt-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--vscode-foreground);
      padding: 2px 6px;
      font-size: 12px;
      min-width: 26px;
      justify-content: center;
      opacity: 0.8;
    }
    .fmt-btn:hover { background: var(--panel-hover-bg); opacity: 1; }
    #markdownEditor {
      flex: 1;
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 0;
      background: var(--vscode-editor-background);
      color: var(--vscode-editor-foreground, var(--vscode-foreground));
      font-family: var(--vscode-editor-font-family);
      font-size: 13px;
      line-height: 1.55;
      resize: none;
      tab-size: 2;
    }
    #markdownEditor:focus { outline: none; }
    .editor-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 5px 12px;
      font-size: 11px;
      opacity: 0.75;
      border-top: 1px solid var(--border-color);
    }
    .editor-status .modified { color: var(--vscode-gitDecoration-modifiedResourceForeground, #e2c08d); }

    .toast {
      position: fixed;
      bottom: 16px;
      right: 16px;
      background: var(--vscode-notifications-background, var(--panel-bg));
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 12px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.15s, transform 0.15s;
      pointer-events: none;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>
  <header>
    <button id="toggleSidebarBtn" type="button" class="icon" title="Toggle sidebar">
      <svg viewBox="0 0 16 16" width="16" height="16"><path d="M1.5 2h13a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5zM2 3v10h3V3H2zm4 0v10h8V3H6z"/></svg>
    </button>
    <div class="meta">
      <div id="docTitle" class="title">MDOCX</div>
      <div id="docDesc" class="desc"></div>
    </div>
    <div class="view-toggle">
      <button id="previewToggle" type="button" class="active" title="Preview only">Preview</button>
      <button id="splitToggle" type="button" title="Split editor and live preview">Split</button>
      <button id="editToggle" type="button" title="Editor only">Edit</button>
    </div>
    <button id="copyBtn" type="button" class="secondary small" title="Copy markdown to clipboard">Copy</button>
    <button id="exportHtmlBtn" type="button" class="secondary small" title="Export rendered HTML">Export HTML</button>
    <button id="editExternalBtn" type="button" class="secondary small" title="Open in VS Code text editor">Open in Editor</button>
  </header>

  <div class="layout" id="layout">
    <aside class="sidebar">
      <div class="sidebar-section">
        <div class="section-header" id="filesHeader">
          <span>Files <span class="badge" id="fileCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <input type="search" id="fileFilter" placeholder="Filter files..." />
            <button type="button" id="addFileBtn" class="small" title="Add markdown file">+</button>
          </div>
          <ul class="file-list" id="fileList"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" id="outlineHeader">
          <span>Outline</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <ul class="outline-list" id="outlineList"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header collapsed" id="searchHeader">
          <span>Search <span class="badge" id="searchCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <input type="search" id="searchInput" placeholder="Search all documents..." />
          </div>
          <ul class="search-results" id="searchResults"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" id="mediaHeader">
          <span>Media <span class="badge" id="mediaCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <button type="button" id="addMediaBtn" class="small">+ Add Media</button>
          </div>
          <div class="media-grid" id="mediaGrid"></div>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header collapsed" id="metadataHeader">
          <span>Metadata</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="form-row">
            <label for="metaTitle">Title</label>
            <input type="text" id="metaTitle" placeholder="Document title" />
          </div>
          <div class="form-row">
            <label for="metaDescription">Description</label>
            <textarea id="metaDescription" placeholder="Description"></textarea>
          </div>
          <div class="form-row">
            <label for="metaAuthor">Author</label>
            <input type="text" id="metaAuthor" placeholder="Author" />
          </div>
          <div class="form-row">
            <label for="metaRoot">Root File</label>
            <select id="metaRoot"></select>
          </div>
          <div class="form-row">
            <label for="metaTags">Tags</label>
            <input type="text" id="metaTags" placeholder="tag1, tag2" />
          </div>
          <div class="btn-row">
            <button type="button" id="saveMetadataBtn" class="small">Save Metadata</button>
          </div>
        </div>
      </div>

      <div class="stats-line" id="statsLine"></div>
    </aside>

    <main class="main-content">
      <div id="error" class="error" style="display:none"></div>
      <div class="view-area mode-preview" id="viewArea">
        <section id="previewView">
          <div class="doc-body" id="content"></div>
        </section>
        <section id="editorView">
          <div class="editor-toolbar">
            <button type="button" class="fmt-btn" data-fmt="bold" title="Bold (Ctrl+B)"><b>B</b></button>
            <button type="button" class="fmt-btn" data-fmt="italic" title="Italic (Ctrl+I)"><i>I</i></button>
            <button type="button" class="fmt-btn" data-fmt="code" title="Inline code">&lt;/&gt;</button>
            <button type="button" class="fmt-btn" data-fmt="heading" title="Heading">H</button>
            <button type="button" class="fmt-btn" data-fmt="link" title="Link (Ctrl+K)">Link</button>
            <button type="button" class="fmt-btn" data-fmt="ul" title="Bullet list">&bull;</button>
            <button type="button" class="fmt-btn" data-fmt="ol" title="Numbered list">1.</button>
            <button type="button" class="fmt-btn" data-fmt="quote" title="Blockquote">&ldquo;</button>
            <button type="button" class="fmt-btn" data-fmt="table" title="Table">Table</button>
            <button type="button" class="fmt-btn" data-fmt="codeblock" title="Code block">Code</button>
            <span class="spacer"></span>
            <span class="file-path" id="editorFilePath"></span>
            <button type="button" id="discardBtn" class="secondary small">Discard</button>
            <button type="button" id="saveBtn" class="small">Save</button>
          </div>
          <textarea id="markdownEditor" spellcheck="true" placeholder="Enter markdown content..."></textarea>
          <div class="editor-status">
            <span id="editorStatus"></span>
            <span id="editorCounts">0 words</span>
          </div>
        </section>
      </div>
    </main>
  </div>

  <div class="toast" id="toast"></div>

  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const state = vscode.getState() || {};

    const $ = (id) => document.getElementById(id);
    const content = $('content');
    const errorBox = $('error');
    const docTitle = $('docTitle');
    const docDesc = $('docDesc');
    const fileList = $('fileList');
    const fileCount = $('fileCount');
    const fileFilter = $('fileFilter');
    const outlineList = $('outlineList');
    const searchInput = $('searchInput');
    const searchResults = $('searchResults');
    const searchCount = $('searchCount');
    const mediaGrid = $('mediaGrid');
    const mediaCount = $('mediaCount');
    const statsLine = $('statsLine');
    const metaTitle = $('metaTitle');
    const metaDescription = $('metaDescription');
    const metaAuthor = $('metaAuthor');
    const metaRoot = $('metaRoot');
    const metaTags = $('metaTags');
    const viewArea = $('viewArea');
    const layout = $('layout');
    const markdownEditor = $('markdownEditor');
    const editorFilePath = $('editorFilePath');
    const editorStatus = $('editorStatus');
    const editorCounts = $('editorCounts');
    const toast = $('toast');
    const previewToggle = $('previewToggle');
    const splitToggle = $('splitToggle');
    const editToggle = $('editToggle');

    let currentFiles = [];
    let currentPath = '';
    let rootPath = '';
    let mode = state.mode || 'preview';
    let originalContent = '';
    let isModified = false;
    let livePreviewTimer = null;
    let searchTimer = null;
    let toastTimer = null;

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
    }

    function setError(message) {
      errorBox.style.display = message ? 'block' : 'none';
      errorBox.textContent = message || '';
    }

    function isEditing() { return mode === 'edit' || mode === 'split'; }

    function confirmDiscard() {
      return !isModified || confirm('You have unsaved changes. Discard them?');
    }

    function persistState() {
      vscode.setState({ selectedPath: currentPath, mode: mode });
    }

    function applyMode() {
      viewArea.className = 'view-area mode-' + mode;
      previewToggle.classList.toggle('active', mode === 'preview');
      splitToggle.classList.toggle('active', mode === 'split');
      editToggle.classList.toggle('active', mode === 'edit');
    }

    function setMode(next) {
      if (next === mode) return;
      if (next === 'preview' && !confirmDiscard()) return;
      if (next === 'preview' && isModified) {
        markdownEditor.value = originalContent;
      }
      mode = next;
      applyMode();
      persistState();
      if (isEditing()) {
        editorFilePath.textContent = currentPath;
        if (!isModified) {
          vscode.postMessage({ type: 'getMarkdownContent', path: currentPath });
        }
        setTimeout(() => markdownEditor.focus(), 30);
      }
      updateEditorStatus();
    }

    function updateEditorStatus() {
      const value = markdownEditor.value;
      const words = (value.match(/[\\p{L}\\p{N}'-]+/gu) || []).length;
      const minutes = Math.max(1, Math.round(words / 200));
      editorCounts.textContent = words + ' words \\u00b7 ' + value.length + ' chars \\u00b7 ~' + minutes + ' min read';
      isModified = value !== originalContent;
      editorStatus.innerHTML = isModified ? '<span class="modified">\\u25cf Unsaved changes</span>' : '';
      if (mode === 'split') scheduleLivePreview();
    }

    function scheduleLivePreview() {
      clearTimeout(livePreviewTimer);
      livePreviewTimer = setTimeout(() => {
        vscode.postMessage({ type: 'renderPreview', path: currentPath, content: markdownEditor.value });
      }, 350);
    }

    function renderFileList() {
      const filter = fileFilter.value.trim().toLowerCase();
      const visible = currentFiles.filter((f) => !filter || f.path.toLowerCase().includes(filter));
      fileList.innerHTML = '';
      if (visible.length === 0) {
        fileList.innerHTML = '<li class="empty-state">' + (currentFiles.length ? 'No matches' : 'No files yet') + '</li>';
        return;
      }
      for (const file of visible) {
        const li = document.createElement('li');
        li.className = 'file-item' + (file.path === currentPath ? ' selected' : '') + (file.isRoot ? ' root-file' : '');
        li.title = file.path + ' \\u2014 ' + file.words + ' words \\u00b7 ' + formatBytes(file.size);
        li.dataset.path = file.path;
        const safePath = escapeHtml(file.path);
        li.innerHTML =
          '<svg class="file-icon" viewBox="0 0 16 16"><path d="M4 0h5.5L14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 0v4.5H14L9.5 0z"/></svg>' +
          '<span class="file-name">' + safePath + '</span>' +
          '<span class="file-actions">' +
          '<button type="button" class="icon" title="Set as root file" data-action="root" data-path="' + safePath + '">&#9733;</button>' +
          '<button type="button" class="icon" title="Rename" data-action="rename" data-path="' + safePath + '">&#9998;</button>' +
          '<button type="button" class="icon" title="Duplicate" data-action="duplicate" data-path="' + safePath + '">&#10697;</button>' +
          '<button type="button" class="icon" title="Delete" data-action="delete" data-path="' + safePath + '">&#10005;</button>' +
          '</span>';
        fileList.appendChild(li);
      }
    }

    function setFiles(files, selected, root) {
      currentFiles = files || [];
      currentPath = selected || (currentFiles[0] && currentFiles[0].path) || '';
      rootPath = root || '';
      fileCount.textContent = currentFiles.length;
      renderFileList();

      metaRoot.innerHTML = '';
      for (const file of currentFiles) {
        const opt = document.createElement('option');
        opt.value = file.path;
        opt.textContent = file.path;
        metaRoot.appendChild(opt);
      }
      if (rootPath) metaRoot.value = rootPath;
    }

    function setOutline(outline) {
      const entries = outline || [];
      outlineList.innerHTML = '';
      if (entries.length === 0) {
        outlineList.innerHTML = '<li class="empty-state">No headings</li>';
        return;
      }
      for (const entry of entries) {
        const li = document.createElement('li');
        li.dataset.level = entry.level;
        li.dataset.id = entry.id;
        li.textContent = entry.text;
        li.title = entry.text;
        outlineList.appendChild(li);
      }
    }

    function setMetadata(metadata) {
      if (!metadata) return;
      metaTitle.value = metadata.title || '';
      metaDescription.value = metadata.description || '';
      metaAuthor.value = metadata.author || '';
      if (metadata.root) {
        rootPath = metadata.root;
        metaRoot.value = metadata.root;
      }
      metaTags.value = Array.isArray(metadata.tags) ? metadata.tags.join(', ') : '';
    }

    function setMediaItems(items) {
      mediaCount.textContent = items ? items.length : 0;
      mediaGrid.innerHTML = '';
      if (!items || items.length === 0) {
        mediaGrid.innerHTML = '<div class="empty-state">No media</div>';
        return;
      }
      for (const item of items) {
        const div = document.createElement('div');
        div.className = 'media-item' + (item.used ? '' : ' unused');
        div.title = (item.path || item.id) + ' \\u2014 ' + (item.mimeType || 'unknown');
        const safeId = escapeHtml(item.id);
        const preview = item.dataUri
          ? '<img src="' + item.dataUri + '" alt="' + safeId + '" />'
          : '<div class="placeholder">' + escapeHtml(item.mimeType || 'binary') + '</div>';
        div.innerHTML = preview +
          '<div class="info">' + safeId + '<br/>' + formatBytes(item.size) + '</div>' +
          '<div class="actions">' +
          '<button type="button" class="icon" title="Insert reference at cursor" data-action="insert" data-id="' + safeId +
            '" data-path="' + escapeHtml(item.path || '') + '" data-mime="' + escapeHtml(item.mimeType || '') + '">&#43;</button>' +
          '<button type="button" class="icon" title="Export to disk" data-action="export" data-id="' + safeId + '">&#8615;</button>' +
          '<button type="button" class="icon" title="Replace" data-action="replace" data-id="' + safeId + '">&#8646;</button>' +
          '<button type="button" class="icon" title="Remove" data-action="remove" data-id="' + safeId + '">&#10005;</button>' +
          '</div>';
        mediaGrid.appendChild(div);
      }
    }

    function setStats(stats) {
      if (!stats) { statsLine.textContent = ''; return; }
      statsLine.textContent = stats.files + ' files \\u00b7 ' + stats.words + ' words \\u00b7 ' +
        stats.media + ' media (' + formatBytes(stats.mediaBytes) + ')';
    }

    function enhancePreview() {
      content.querySelectorAll('.code-block').forEach((block) => {
        if (block.querySelector('.copy-code')) return;
        const lang = block.dataset.lang;
        if (lang) {
          const label = document.createElement('span');
          label.className = 'code-lang';
          label.textContent = lang;
          block.appendChild(label);
        }
        const btn = document.createElement('button');
        btn.className = 'copy-code secondary small';
        btn.type = 'button';
        btn.textContent = 'Copy';
        btn.addEventListener('click', () => {
          const code = block.querySelector('code');
          if (!code) return;
          navigator.clipboard.writeText(code.textContent || '').then(() => showToast('Code copied'));
        });
        block.appendChild(btn);
      });
    }

    function replaceSelection(before, after, placeholder) {
      const start = markdownEditor.selectionStart;
      const end = markdownEditor.selectionEnd;
      const value = markdownEditor.value;
      const selected = value.slice(start, end) || placeholder || '';
      markdownEditor.value = value.slice(0, start) + before + selected + after + value.slice(end);
      markdownEditor.selectionStart = start + before.length;
      markdownEditor.selectionEnd = start + before.length + selected.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function prefixLines(prefix, numbered) {
      const value = markdownEditor.value;
      const start = value.lastIndexOf('\\n', Math.max(0, markdownEditor.selectionStart - 1)) + 1;
      let end = value.indexOf('\\n', markdownEditor.selectionEnd);
      if (end === -1) end = value.length;
      const lines = value.slice(start, end).split('\\n');
      const updated = lines.map((line, i) => (numbered ? (i + 1) + '. ' : prefix) + line).join('\\n');
      markdownEditor.value = value.slice(0, start) + updated + value.slice(end);
      markdownEditor.selectionStart = start;
      markdownEditor.selectionEnd = start + updated.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function applyFormat(fmt) {
      if (fmt === 'bold') return replaceSelection('**', '**', 'bold text');
      if (fmt === 'italic') return replaceSelection('*', '*', 'italic text');
      if (fmt === 'code') return replaceSelection('\\u0060', '\\u0060', 'code');
      if (fmt === 'heading') return prefixLines('## ');
      if (fmt === 'link') return replaceSelection('[', '](https://)', 'link text');
      if (fmt === 'ul') return prefixLines('- ');
      if (fmt === 'ol') return prefixLines('', true);
      if (fmt === 'quote') return prefixLines('> ');
      if (fmt === 'table') return replaceSelection('\\n| Column A | Column B |\\n| --- | --- |\\n| ', ' | |\\n', 'value');
      if (fmt === 'codeblock') {
        const fence = '\\u0060\\u0060\\u0060';
        return replaceSelection('\\n' + fence + '\\n', '\\n' + fence + '\\n', 'code');
      }
    }

    function insertAtCursor(text) {
      const start = markdownEditor.selectionStart;
      const end = markdownEditor.selectionEnd;
      const value = markdownEditor.value;
      markdownEditor.value = value.slice(0, start) + text + value.slice(end);
      markdownEditor.selectionStart = markdownEditor.selectionEnd = start + text.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function save() {
      if (!currentPath) return;
      vscode.postMessage({ type: 'saveContent', path: currentPath, content: markdownEditor.value });
      originalContent = markdownEditor.value;
      updateEditorStatus();
    }

    document.querySelectorAll('.section-header').forEach((header) => {
      header.addEventListener('click', () => header.classList.toggle('collapsed'));
    });

    fileList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (btn) {
        const action = btn.dataset.action;
        const target = btn.dataset.path;
        if (action === 'delete') vscode.postMessage({ type: 'deleteMarkdown', path: target });
        else if (action === 'rename') vscode.postMessage({ type: 'renameMarkdown', path: target });
        else if (action === 'duplicate') vscode.postMessage({ type: 'duplicateMarkdown', path: target });
        else if (action === 'root') vscode.postMessage({ type: 'setRoot', path: target });
        return;
      }
      const item = e.target.closest('.file-item[data-path]');
      if (!item || !confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: item.dataset.path });
    });

    fileFilter.addEventListener('input', renderFileList);

    outlineList.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-id]');
      if (!li) return;
      if (mode === 'edit') setMode('split');
      const target = content.querySelector('[id="' + CSS.escape(li.dataset.id) + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const query = searchInput.value;
      searchTimer = setTimeout(() => vscode.postMessage({ type: 'search', query: query }), 250);
    });

    searchResults.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-path]');
      if (!li || !confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: li.dataset.path });
    });

    mediaGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'replace') vscode.postMessage({ type: 'replaceMedia', id: id });
      else if (action === 'remove') vscode.postMessage({ type: 'removeMedia', id: id });
      else if (action === 'export') vscode.postMessage({ type: 'exportMedia', id: id });
      else if (action === 'insert') {
        const ref = btn.dataset.path || ('mdocx://media/' + id);
        const isImage = (btn.dataset.mime || '').indexOf('image/') === 0;
        if (!isEditing()) setMode('split');
        insertAtCursor((isImage ? '!' : '') + '[' + id + '](' + ref + ')');
        showToast('Reference inserted');
      }
    });

    content.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-mdocx-file]');
      if (!link) return;
      e.preventDefault();
      if (!confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: link.dataset.mdocxFile });
    });

    document.querySelectorAll('.fmt-btn').forEach((btn) => {
      btn.addEventListener('click', () => applyFormat(btn.dataset.fmt));
    });

    $('toggleSidebarBtn').addEventListener('click', () => layout.classList.toggle('sidebar-hidden'));
    $('copyBtn').addEventListener('click', () => vscode.postMessage({ type: 'copy', path: currentPath }));
    $('exportHtmlBtn').addEventListener('click', () => vscode.postMessage({ type: 'exportHtml' }));
    $('editExternalBtn').addEventListener('click', () => vscode.postMessage({ type: 'editExternal', path: currentPath }));
    previewToggle.addEventListener('click', () => setMode('preview'));
    splitToggle.addEventListener('click', () => setMode('split'));
    editToggle.addEventListener('click', () => setMode('edit'));
    $('saveBtn').addEventListener('click', save);
    $('discardBtn').addEventListener('click', () => {
      if (isModified && !confirm('Discard all changes?')) return;
      markdownEditor.value = originalContent;
      updateEditorStatus();
    });
    $('addFileBtn').addEventListener('click', () => vscode.postMessage({ type: 'addMarkdown' }));
    $('addMediaBtn').addEventListener('click', () => vscode.postMessage({ type: 'addMedia' }));
    $('saveMetadataBtn').addEventListener('click', () => {
      const tagsStr = metaTags.value.trim();
      const tags = tagsStr ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean) : [];
      vscode.postMessage({
        type: 'saveMetadata',
        metadata: {
          title: metaTitle.value,
          description: metaDescription.value,
          author: metaAuthor.value,
          root: metaRoot.value || undefined,
          tags: tags
        }
      });
    });

    markdownEditor.addEventListener('input', updateEditorStatus);

    markdownEditor.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      const start = markdownEditor.selectionStart;
      const value = markdownEditor.value;
      markdownEditor.value = value.slice(0, start) + '  ' + value.slice(markdownEditor.selectionEnd);
      markdownEditor.selectionStart = markdownEditor.selectionEnd = start + 2;
      updateEditorStatus();
    });

    document.addEventListener('keydown', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const inEditor = document.activeElement === markdownEditor;
      if (e.key === 's') { e.preventDefault(); save(); }
      else if (e.key === 'b' && inEditor) { e.preventDefault(); applyFormat('bold'); }
      else if (e.key === 'i' && inEditor) { e.preventDefault(); applyFormat('italic'); }
      else if (e.key === 'k' && inEditor) { e.preventDefault(); applyFormat('link'); }
      else if (e.key === 'f') {
        e.preventDefault();
        $('searchHeader').classList.remove('collapsed');
        searchInput.focus();
      }
    });

    applyMode();
    vscode.postMessage({ type: 'ready', selectedPath: state.selectedPath });

    window.addEventListener('message', (event) => {
      const msg = event.data;
      if (!msg || typeof msg.type !== 'string') return;

      if (msg.type === 'markdownContent') {
        markdownEditor.value = msg.content || '';
        originalContent = msg.content || '';
        editorFilePath.textContent = msg.path || currentPath;
        updateEditorStatus();
        return;
      }

      if (msg.type === 'previewHtml') {
        content.innerHTML = msg.html || '';
        enhancePreview();
        setOutline(msg.outline);
        return;
      }

      if (msg.type === 'saved') {
        showToast('Saved ' + msg.path);
        return;
      }

      if (msg.type === 'searchResults') {
        const results = msg.results || [];
        searchCount.textContent = results.length;
        searchResults.innerHTML = '';
        if (results.length === 0) {
          const hint = msg.query && msg.query.trim().length >= 2 ? 'No results' : 'Type at least 2 characters';
          searchResults.innerHTML = '<li class="empty-state">' + hint + '</li>';
          return;
        }
        const needle = (msg.query || '').trim().toLowerCase();
        for (const result of results) {
          const li = document.createElement('li');
          li.dataset.path = result.path;
          const index = result.text.toLowerCase().indexOf(needle);
          const highlighted = index >= 0
            ? escapeHtml(result.text.slice(0, index)) + '<mark>' +
              escapeHtml(result.text.slice(index, index + needle.length)) + '</mark>' +
              escapeHtml(result.text.slice(index + needle.length))
            : escapeHtml(result.text);
          li.innerHTML = '<div class="result-path">' + escapeHtml(result.path) + ':' + result.line + '</div>' +
            '<div class="result-text">' + highlighted + '</div>';
          searchResults.appendChild(li);
        }
        return;
      }

      if (msg.type !== 'render') return;

      docTitle.textContent = msg.title || 'MDOCX';
      docDesc.textContent = msg.description || '';

      if (Array.isArray(msg.fileList)) {
        setFiles(msg.fileList, msg.path, msg.metadata && msg.metadata.root);
      }
      if (msg.metadata) setMetadata(msg.metadata);
      if (msg.mediaItems) setMediaItems(msg.mediaItems);
      setStats(msg.stats);
      setOutline(msg.outline);
      setError(msg.error || null);

      if (typeof msg.html === 'string') {
        content.innerHTML = msg.html;
        enhancePreview();
      }

      if (msg.path) {
        persistState();
        const switchedFile = msg.path !== editorFilePath.textContent;
        if (typeof msg.markdown === 'string' && (!isModified || switchedFile)) {
          markdownEditor.value = msg.markdown;
          originalContent = msg.markdown;
          editorFilePath.textContent = msg.path;
          updateEditorStatus();
        }
      }
    });
  </script>
</body>
</html>`;
  }
};

// src/mdocxCompletionProvider.ts
var vscode4 = __toESM(require("vscode"));
var MdocxCompletionProvider = class _MdocxCompletionProvider {
  static scheme = MdocxFileSystemProvider.scheme;
  // Trigger on common image/link patterns
  static triggerCharacters = ["/", "(", "[", "!", ".", '"', "'"];
  static register(context) {
    const provider = new _MdocxCompletionProvider();
    return vscode4.languages.registerCompletionItemProvider(
      { scheme: _MdocxCompletionProvider.scheme, language: "markdown" },
      provider,
      ..._MdocxCompletionProvider.triggerCharacters
    );
  }
  async provideCompletionItems(document, position, _token, _context) {
    if (document.uri.scheme !== _MdocxCompletionProvider.scheme) {
      return void 0;
    }
    const parsed = MdocxFileSystemProvider.parseUri(document.uri);
    if (!parsed) {
      return void 0;
    }
    const line = document.lineAt(position.line).text;
    const textBefore = line.substring(0, position.character);
    const isImageOrLinkContext = /!\[[^\]]*\]\([^)]*$/.test(textBefore) || // ![alt](path
    /\[[^\]]*\]\([^)]*$/.test(textBefore) || // [text](path
    /src=["'][^"']*$/.test(textBefore) || // src="path
    /href=["'][^"']*$/.test(textBefore) || // href="path
    /!\[$/.test(textBefore) || // ![
    /!\[[^\]]*$/.test(textBefore);
    if (!isImageOrLinkContext) {
      return void 0;
    }
    try {
      const { mediaItems, markdownPaths } = await this.getDocumentEntries(parsed.mdocxUri);
      if (mediaItems.length === 0 && markdownPaths.length === 0) {
        return void 0;
      }
      const completions = [];
      for (const other of markdownPaths) {
        if (other === parsed.embeddedPath) continue;
        const item = new vscode4.CompletionItem(other, vscode4.CompletionItemKind.File);
        item.detail = "Markdown document in this MDOCX";
        item.documentation = new vscode4.MarkdownString(`Links to the embedded document **${other}**.`);
        item.insertText = other;
        item.sortText = "0_doc_" + other;
        completions.push(item);
      }
      for (const item of mediaItems) {
        if (item.path) {
          const pathCompletion = new vscode4.CompletionItem(
            item.path,
            vscode4.CompletionItemKind.File
          );
          pathCompletion.detail = `${item.mimeType || "media"} (${this.formatBytes(item.size)})`;
          pathCompletion.documentation = new vscode4.MarkdownString(
            `**Media ID:** ${item.id}

**Path:** ${item.path}

**Type:** ${item.mimeType || "unknown"}

**Size:** ${this.formatBytes(item.size)}`
          );
          pathCompletion.insertText = item.path;
          pathCompletion.sortText = "0_" + item.path;
          completions.push(pathCompletion);
        }
        const idRef = `mdocx://media/${item.id}`;
        const idCompletion = new vscode4.CompletionItem(
          idRef,
          vscode4.CompletionItemKind.Reference
        );
        idCompletion.detail = `${item.mimeType || "media"} by ID`;
        idCompletion.documentation = new vscode4.MarkdownString(
          `**Media ID:** ${item.id}

**Path:** ${item.path || "N/A"}

**Type:** ${item.mimeType || "unknown"}

**Size:** ${this.formatBytes(item.size)}`
        );
        idCompletion.insertText = idRef;
        idCompletion.sortText = "1_" + item.id;
        completions.push(idCompletion);
      }
      if (/!\[$/.test(textBefore)) {
        for (const item of mediaItems) {
          if (item.mimeType?.startsWith("image/")) {
            const snippetCompletion = new vscode4.CompletionItem(
              `Image: ${item.id}`,
              vscode4.CompletionItemKind.Snippet
            );
            snippetCompletion.detail = "Insert complete image markdown";
            snippetCompletion.documentation = new vscode4.MarkdownString(
              `Inserts: \`![${item.id}](${item.path || `mdocx://media/${item.id}`})\``
            );
            snippetCompletion.insertText = new vscode4.SnippetString(
              `[\${1:${item.id}}](${item.path || `mdocx://media/${item.id}`})`
            );
            snippetCompletion.sortText = "2_" + item.id;
            completions.push(snippetCompletion);
          }
        }
      }
      return completions;
    } catch {
      return void 0;
    }
  }
  async getDocumentEntries(mdocxUri) {
    try {
      const doc = await readDocument(mdocxUri);
      return {
        mediaItems: doc.media.items.map((item) => ({
          id: item.id,
          path: item.path,
          mimeType: inferMimeType(item),
          size: item.data?.byteLength ?? 0
        })),
        markdownPaths: doc.markdown.files.map((file) => file.path)
      };
    } catch {
      return { mediaItems: [], markdownPaths: [] };
    }
  }
  formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
};

// src/extension.ts
function activate(context) {
  context.subscriptions.push(MdocxFileSystemProvider.register(context));
  context.subscriptions.push(MdocxPreviewEditorProvider.register(context));
  context.subscriptions.push(MdocxCompletionProvider.register(context));
  context.subscriptions.push(
    vscode5.commands.registerCommand("mdocx.createNew", (uri) => createNewMdocxFile(uri)),
    vscode5.commands.registerCommand("mdocx.extractToFolder", (uri) => extractToFolder(uri)),
    vscode5.commands.registerCommand("mdocx.createFromFolder", (uri) => createFromFolder(uri)),
    vscode5.commands.registerCommand("mdocx.exportHtml", (uri) => exportHtml(uri))
  );
}
function deactivate() {
}
async function resolveMdocxUri(candidate) {
  if (candidate?.fsPath.toLowerCase().endsWith(".mdocx")) {
    return candidate;
  }
  const active = vscode5.window.activeTextEditor?.document.uri;
  if (active?.fsPath.toLowerCase().endsWith(".mdocx")) {
    return active;
  }
  const found = await vscode5.workspace.findFiles("**/*.mdocx", "**/node_modules/**", 50);
  if (found.length === 1) return found[0];
  if (found.length > 1) {
    const picked = await vscode5.window.showQuickPick(
      found.map((uri) => ({ label: vscode5.workspace.asRelativePath(uri), uri })),
      { placeHolder: "Select an MDOCX file" }
    );
    if (picked) return picked.uri;
    return void 0;
  }
  const selection = await vscode5.window.showOpenDialog({
    canSelectMany: false,
    filters: { "MDOCX Files": ["mdocx"] },
    openLabel: "Select MDOCX"
  });
  return selection?.[0];
}
async function withError(action) {
  try {
    return await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    void vscode5.window.showErrorMessage(`MDOCX: ${message}`);
    return void 0;
  }
}
async function createNewMdocxFile(contextUri) {
  let defaultFolder;
  if (contextUri) {
    try {
      const stat = await vscode5.workspace.fs.stat(contextUri);
      defaultFolder = stat.type === vscode5.FileType.Directory ? contextUri : vscode5.Uri.joinPath(contextUri, "..");
    } catch {
      defaultFolder = void 0;
    }
  }
  if (!defaultFolder && vscode5.workspace.workspaceFolders?.[0]) {
    defaultFolder = vscode5.workspace.workspaceFolders[0].uri;
  }
  const fileName = await vscode5.window.showInputBox({
    prompt: "Enter the name for the new MDOCX file",
    value: "document.mdocx",
    validateInput: (value) => {
      if (!value || value.trim().length === 0) return "File name cannot be empty";
      if (!value.endsWith(".mdocx")) return "File name must end with .mdocx";
      return void 0;
    }
  });
  if (!fileName) return;
  const saveUri = await vscode5.window.showSaveDialog({
    defaultUri: defaultFolder ? vscode5.Uri.joinPath(defaultFolder, fileName) : void 0,
    filters: { "MDOCX Files": ["mdocx"] },
    saveLabel: "Create MDOCX"
  });
  if (!saveUri) return;
  await withError(async () => {
    const title = fileName.replace(/\.mdocx$/i, "");
    const markdown = `# ${title}

Welcome to your new MDOCX document!

## Getting Started

Start editing this file or add more markdown files to build your document.
`;
    await writeMdocx2(
      saveUri,
      {
        bundleVersion: 1,
        files: [{ path: "README.md", content: encodeText(markdown) }],
        rootPath: "README.md"
      },
      { bundleVersion: 1, items: [] },
      { title, created_at: (/* @__PURE__ */ new Date()).toISOString(), root: "README.md" }
    );
    await vscode5.commands.executeCommand("vscode.openWith", saveUri, "mdocx.preview");
    void vscode5.window.showInformationMessage(`MDOCX: Created ${path2.basename(saveUri.fsPath)}`);
  });
}
async function writeMdocx2(target, markdown, media, metadata) {
  const { writeMdocxAsync: writeMdocxAsync2 } = await Promise.resolve().then(() => (init_dist(), dist_exports));
  const bytes = await writeMdocxAsync2(markdown, media, {
    metadata,
    markdownCompression: "zip",
    mediaCompression: "zip"
  });
  await vscode5.workspace.fs.writeFile(target, bytes);
}
async function extractToFolder(contextUri) {
  const source = await resolveMdocxUri(contextUri);
  if (!source) return;
  const folders = await vscode5.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    canSelectMany: false,
    openLabel: "Extract Here"
  });
  const targetRoot = folders?.[0];
  if (!targetRoot) return;
  await withError(async () => {
    const doc = await readDocument(source);
    const baseName = path2.basename(source.fsPath, path2.extname(source.fsPath));
    const outputRoot = vscode5.Uri.joinPath(targetRoot, baseName);
    for (const file of doc.markdown.files) {
      await vscode5.workspace.fs.writeFile(joinSafe(outputRoot, file.path), file.content);
    }
    for (const item of doc.media.items) {
      const relative = item.path || `media/${item.id}`;
      await vscode5.workspace.fs.writeFile(joinSafe(outputRoot, relative), item.data);
    }
    if (doc.metadata) {
      await vscode5.workspace.fs.writeFile(
        vscode5.Uri.joinPath(outputRoot, "mdocx-metadata.json"),
        encodeText(JSON.stringify(doc.metadata, null, 2))
      );
    }
    const open = await vscode5.window.showInformationMessage(
      `MDOCX: Extracted ${doc.markdown.files.length} markdown and ${doc.media.items.length} media files.`,
      "Reveal Folder"
    );
    if (open === "Reveal Folder") {
      await vscode5.commands.executeCommand("revealFileInOS", outputRoot);
    }
  });
}
function joinSafe(root, relative) {
  const segments = relative.replace(/\\/g, "/").split("/").filter((segment) => segment && segment !== "." && segment !== "..");
  if (segments.length === 0) {
    throw new Error(`Invalid path in container: "${relative}"`);
  }
  return vscode5.Uri.joinPath(root, ...segments);
}
async function createFromFolder(contextUri) {
  let sourceFolder = contextUri;
  if (sourceFolder) {
    try {
      const stat = await vscode5.workspace.fs.stat(sourceFolder);
      if (stat.type !== vscode5.FileType.Directory) sourceFolder = void 0;
    } catch {
      sourceFolder = void 0;
    }
  }
  if (!sourceFolder) {
    const folders = await vscode5.window.showOpenDialog({
      canSelectFolders: true,
      canSelectFiles: false,
      canSelectMany: false,
      openLabel: "Use This Folder"
    });
    sourceFolder = folders?.[0];
  }
  if (!sourceFolder) return;
  const saveUri = await vscode5.window.showSaveDialog({
    defaultUri: vscode5.Uri.file(`${sourceFolder.fsPath}.mdocx`),
    filters: { "MDOCX Files": ["mdocx"] },
    saveLabel: "Create MDOCX"
  });
  if (!saveUri) return;
  await withError(async () => {
    const markdownFiles = [];
    const mediaItems = [];
    const takenIds = /* @__PURE__ */ new Set();
    const walk = async (folder, prefix) => {
      for (const [name, type] of await vscode5.workspace.fs.readDirectory(folder)) {
        if (name.startsWith(".") || name === "node_modules") continue;
        const child = vscode5.Uri.joinPath(folder, name);
        const relative = prefix ? `${prefix}/${name}` : name;
        if (type === vscode5.FileType.Directory) {
          await walk(child, relative);
          continue;
        }
        const ext = path2.extname(name).toLowerCase();
        if (ext === ".md" || ext === ".markdown") {
          markdownFiles.push({ path: relative, content: await vscode5.workspace.fs.readFile(child) });
        } else if (MEDIA_EXTENSIONS.includes(ext)) {
          const id = makeMediaId(name, takenIds);
          takenIds.add(id);
          mediaItems.push({
            id,
            path: relative,
            mimeType: getMimeTypeFromExtension(ext),
            data: await vscode5.workspace.fs.readFile(child)
          });
        }
      }
    };
    await walk(sourceFolder, "");
    if (markdownFiles.length === 0) {
      throw new Error("No markdown files found in the selected folder.");
    }
    const rootPath = markdownFiles.find((f) => /^readme\.(md|markdown)$/i.test(f.path))?.path ?? markdownFiles.find((f) => !f.path.includes("/"))?.path ?? markdownFiles[0].path;
    await writeMdocx2(
      saveUri,
      { bundleVersion: 1, files: markdownFiles, rootPath },
      { bundleVersion: 1, items: mediaItems },
      {
        title: path2.basename(saveUri.fsPath, ".mdocx"),
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        root: rootPath
      }
    );
    await vscode5.commands.executeCommand("vscode.openWith", saveUri, "mdocx.preview");
    void vscode5.window.showInformationMessage(
      `MDOCX: Packed ${markdownFiles.length} markdown and ${mediaItems.length} media files.`
    );
  });
}
async function exportHtml(contextUri) {
  const source = await resolveMdocxUri(contextUri);
  if (!source) return;
  await withError(async () => {
    const doc = await readDocument(source);
    if (doc.markdown.files.length === 0) {
      throw new Error("This MDOCX contains no markdown files.");
    }
    const ALL = "$all";
    const picked = doc.markdown.files.length === 1 ? doc.markdown.files[0].path : (await vscode5.window.showQuickPick(
      [
        { label: "All files (combined)", value: ALL },
        ...doc.markdown.files.map((f) => ({ label: f.path, value: f.path }))
      ],
      { placeHolder: "Which document should be exported?" }
    ))?.value;
    if (!picked) return;
    const selected = picked === ALL ? doc.markdown.files : doc.markdown.files.filter((f) => f.path === picked);
    const title = typeof doc.metadata?.title === "string" && doc.metadata.title || path2.basename(source.fsPath);
    const defaultName = picked === ALL ? `${path2.basename(source.fsPath, ".mdocx")}.html` : `${picked.replace(/[\\/]/g, "-").replace(/\.(md|markdown)$/i, "")}.html`;
    const target = await vscode5.window.showSaveDialog({
      defaultUri: vscode5.Uri.joinPath(vscode5.Uri.file(path2.dirname(source.fsPath)), defaultName),
      filters: { "HTML Files": ["html"] },
      saveLabel: "Export HTML"
    });
    if (!target) return;
    const { MediaResolver: MediaResolver2 } = await Promise.resolve().then(() => (init_dist(), dist_exports));
    const resolver = new MediaResolver2(doc);
    const knownPaths = new Set(doc.markdown.files.map((f) => f.path));
    const sections = selected.map((file) => {
      const { html: html2 } = renderMarkdown(decodeText(file.content), {
        resolveMediaHref: (href) => resolveMediaForExport(resolver, href, file),
        // Cross-document links only make sense when everything is in one page.
        resolveFileHref: (href) => picked === ALL ? resolveKnownFile(href, knownPaths) : void 0
      });
      return { path: file.path, html: html2 };
    });
    await vscode5.workspace.fs.writeFile(target, encodeText(buildStandaloneHtml(title, sections, picked === ALL)));
    const open = await vscode5.window.showInformationMessage("MDOCX: HTML exported.", "Open File");
    if (open === "Open File") {
      await vscode5.env.openExternal(target);
    }
  });
}
function resolveKnownFile(href, knownPaths) {
  if (!href || isExternalHref(href)) return void 0;
  for (const candidate of hrefCandidates(href)) {
    if (knownPaths.has(candidate)) return candidate;
  }
  return void 0;
}
function resolveMediaForExport(resolver, href, fromFile) {
  if (!href || isExternalHref(href)) return void 0;
  for (const candidate of hrefCandidates(href)) {
    let item;
    try {
      item = resolver.resolve(candidate, fromFile);
    } catch {
      item = void 0;
    }
    if (!item) {
      const byId = /^mdocx:\/\/media\/(.+)$/i.exec(candidate);
      if (byId && typeof resolver.getById === "function") {
        try {
          item = resolver.getById(byId[1]);
        } catch {
          item = void 0;
        }
      }
    }
    if (item?.data) {
      return toDataUri(inferMimeType(item), item.data);
    }
  }
  return void 0;
}
function buildStandaloneHtml(title, sections, includeToc) {
  const toc = includeToc && sections.length > 1 ? `<nav class="toc"><strong>Contents</strong><ul>${sections.map((s) => `<li><a href="#${docAnchorId(s.path)}">${escapeHtml(s.path)}</a></li>`).join("")}</ul></nav>` : "";
  const body = sections.map(
    (s) => `<article id="${docAnchorId(s.path)}">${sections.length > 1 ? `<h1 class="doc-heading">${escapeHtml(s.path)}</h1>` : ""}${s.html}</article>`
  ).join("\n<hr />\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.65; max-width: 860px; margin: 0 auto; padding: 40px 20px 80px; }
  img { max-width: 100%; border-radius: 4px; }
  pre { background: rgba(127,127,127,0.12); padding: 12px; border-radius: 6px; overflow: auto; }
  code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 0.92em; }
  pre code { background: none; }
  :not(pre) > code { background: rgba(127,127,127,0.15); padding: 0.1em 0.35em; border-radius: 3px; }
  table { border-collapse: collapse; margin: 1em 0; }
  th, td { border: 1px solid rgba(127,127,127,0.4); padding: 6px 10px; text-align: left; }
  blockquote { margin: 1em 0; padding: 0.4em 1em; border-left: 3px solid rgba(127,127,127,0.5); }
  hr { border: none; border-top: 1px solid rgba(127,127,127,0.35); margin: 3em 0; }
  .toc { background: rgba(127,127,127,0.08); border-radius: 8px; padding: 12px 18px; margin-bottom: 32px; }
  .toc ul { margin: 8px 0 0; padding-left: 18px; }
  .heading-anchor { display: none; }
  .doc-heading { font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.55; border: none; }
</style>
</head>
<body>
${toc}
${body}
</body>
</html>
`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
