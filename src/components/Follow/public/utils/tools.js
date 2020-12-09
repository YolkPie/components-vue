import cache from './cache'
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * dom元素是否有指定class
 * @param ele dom元素
 * @param cls class
 */
export const hasClass = (ele, cls) => {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
/**
 * 为dom元素添加class
 * @param ele dom元素
 * @param cls class
 */
export const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 为dom元素移除class
 * @param ele
 * @param cls
 */
export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @description 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 interval 毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const throttle = (fn, interval = 300) => {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, interval)
  }
}

/**
 * @description 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 interval 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const debounce = (fn, interval = 300) => {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

/**
 * @description: 判断是否是iphoneX系列机型，现在 iPhone 在 iPhone X 之后的机型都需要适配，所以可以对 X 以后的机型统一处理，我们可以认为这系列手机的特征是 ios + 长脸
 * @returns
 */
export const isIphoneX = () => {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}

/**
 * 滚动到页面指定位置
 * @param scrollTop
 */
export const scrollTo = (scrollTop) => {
  let topTimer = null
  cancelAnimationFrame(topTimer)
  topTimer = requestAnimationFrame(function fn () {
    let oTop = document.body.scrollTop || document.documentElement.scrollTop
    if (oTop > scrollTop) {
      if (oTop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop = oTop - Math.floor((oTop - scrollTop) / 3)
        topTimer = requestAnimationFrame(fn);
        ((oldTop) => {
          if (Math.abs(oldTop - oTop) <= 2) {
            cancelAnimationFrame(topTimer)
          }
        })(document.documentElement.scrollTop || document.body.scrollTop)
      } else {
        cancelAnimationFrame(topTimer)
      }
    } else if (oTop < scrollTop) {
      document.body.scrollTop = document.documentElement.scrollTop = oTop + Math.ceil((scrollTop - oTop) / 3)
      topTimer = requestAnimationFrame(fn);
      ((oldTop) => {
        if (Math.abs(oldTop - oTop) <= 2) {
          cancelAnimationFrame(topTimer)
        }
      })(document.documentElement.scrollTop || document.body.scrollTop)
    } else {
      cancelAnimationFrame(topTimer)
    }
  })
}

/**
 * 获取设备类型
 * @returns {string}
 */
export const getDevice = () => {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('iphone') !== -1) {
    return 'iphone'
  } else if (ua.indexOf('ipad') !== -1) {
    return 'ipad'
  } else if (ua.indexOf('android') !== -1) {
    return 'android'
  }
  return ''
}
/**
 * 获取环境信息
 * @returns {string}
 */
export const getEnv = () => {
  let ua = navigator.userAgent.toLowerCase()
  if (!/mobile|android/.test(ua)) {
    return 'pc'
  } else {
    if (/micromessenger(\/[\d]+)*/.test(ua)) {
      return 'weixin'
    } else if (/qq\/(\/[\d]+)*/.test(ua) || /qzone\//.test(ua)) {
      return 'qq'
    } else {
      return 'h5'
    }
  }
}

export const isSupportWebp = () => {
  if (cache.local.get('gztx_webp') !== null) {
    return cache.local.get('gztx_webp')
  } else {
    let isSupport = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
    cache.local.set('gztx_webp', isSupport)
    return isSupport
  }
}

/**
 * 生成图片路径（域名分流）
 * 注意： 该方法生成的路径为随机路径，只适合一次渲染完成的组件，否则每渲染一次就会重新请求新的图片
 * @param halfPath
 * @param width
 * @param height
 * @param quality
 * @returns {string}
 */
export const formatImgUrl = (halfPath, width, height, quality) => {
  if (halfPath) {
    const domains = [10, 11, 12, 13, 14, 20, 30]
    const isGif = halfPath.substr(halfPath.lastIndexOf('.') + 1).toLowerCase() === 'gif'
    let baseUrl = `//img${domains[Math.round(Math.random() * 6)]}.360buyimg.com/popactivity/`
    if (width && height && !isGif) {
      // gif图不支持尺寸变更
      baseUrl += `s${width}x${height}_`
    }
    baseUrl += `${halfPath}!q${quality || 70}`
    if (isSupportWebp() === 'true') {
      baseUrl += `.webp`
    }
    return baseUrl
  }
  return ''
}

/**
 * 生成图片路径（域名分流）
 * @param index
 * @param halfPath
 * @param width
 * @param height
 * @param quality
 * @returns {string}
 */
export const formatImgUrlByIndex = (index, halfPath, width, height, quality, clipWidth, clipHeight) => {
  if (isNaN(Number(index))) {
    return formatImgUrl(halfPath, width, height, quality)
  } else {
    if (halfPath) {
      const domains = [10, 11, 12, 13, 14, 20, 30]
      const isGif = halfPath.substr(halfPath.lastIndexOf('.') + 1).toLowerCase() === 'gif'
      let baseUrl = `//img${domains[index % 7]}.360buyimg.com/popactivity/`
      if (width && height && !isGif && !clipWidth) {
        // gif图不支持尺寸变更
        baseUrl += `s${width}x${height}_`
      }
      baseUrl += halfPath
      if (clipWidth && clipHeight) {
        baseUrl += `!cc_${clipWidth}x${clipHeight}`
      }
      baseUrl += `!q${quality || 70}`
      if (isSupportWebp() === 'true') {
        baseUrl += `.webp`
      }
      return baseUrl
    }
    return ''
  }
}

/**
 * 填充两位
 */
export function fill2 (v) {
  v += ''
  while (v.length < 2) {
    v = '0' + v
  }
  return v
}

/**
* @description: 计算剩余时间
* @param {type} 时间戳
* @return: rest对象
*/
export function restTime (t) {
  const ts = t
  let rest = {
    d: '--',
    h: '--',
    m: '--',
    s: '--'
  }
  if (ts < 0) {
    return rest
  } else {
    const ds = 24 * 60 * 60 * 1000
    const hs = 60 * 60 * 1000
    const ms = 60 * 1000

    const d = ts >= ds ? parseInt(ts / ds) : 0
    const h = ts - d * ds >= hs ? parseInt((ts - d * ds) / hs) : 0
    const m = ts - d * ds - h * hs >= ms ? parseInt((ts - d * ds - h * hs) / ms) : 0
    const s = parseInt((ts - d * ds - h * hs - m * ms) / 1000)

    if (d >= 0) rest.d = fill2(d)
    if (h >= 0) rest.h = fill2(h)
    if (m >= 0) rest.m = fill2(m)
    if (s >= 0) rest.s = fill2(s)
  }
  return rest
}

/**
 * @description: 判断元素是否在可视范围内
 * @param {type} partiallyVisible为是否为部分可见
 * @return:
 */
export function elementIsVisibleInViewport (el, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect()

  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

/**
 * @description: 链接跳转埋点上报
 * @param {type} newWebview 京东APP内是否新开webview打开url
 * @return:
 */
export function eventUpload (params, newWebview = true) {
  const { id, level, param, href, jsonParam } = params
  try {
    if (id && id.length) {
      let eventId = id
      let click = new MPing.inputs.Click(eventId)
      click.event_param = typeof param !== 'undefined' ? param : ''
      click.json_param = typeof jsonParam !== 'undefined' ? JSON.stringify(jsonParam) : ''
      click.event_level = typeof level !== 'undefined' ? level : ''
      click.updateEventSeries()
      const mping = new MPing()
      mping.send(click)
      // IOS系统，WKWebView容易出现点击埋点丢失的问题，增加延迟
      setTimeout(() => {
        if (href && href.length) {
          webviewRedirect(href, newWebview)
        }
      }, 200)
    }
  } catch (e) {
    if (href && href.length) {
      webviewRedirect(href, newWebview)
    }
  }
}

export const logPV = pageId => {
  if (!pageId) return
  try {
    const pv = new MPing.inputs.PV(pageId) // 构造pv 请求,可选参数为pageId
    const mping = new MPing() // 构造上报实例
    mping.send(pv) // 上报pv
  } catch (e) {}
}

// 京东APP内新开webview打开url
export const webviewRedirect = (url, jump = true) => {
  var newUrl = url.replace(/http:|https:/, '')
  var agent = navigator.userAgent.toLowerCase()
  if (!url) {
    return false
  }
  if (!jump) {
    window.location.href = newUrl
    return true
  }

  if (agent.indexOf('jdapp') >= 0) {
    // 京东内
    location.href =
      'openApp.jdMobile://virtual?params={"category":"jump","des":"m","action":"to","url":"' +
      encodeURIComponent(location.protocol + newUrl) +
      '"}'
    return true
  } else {
    window.location.href = newUrl
    return true
  }
}
/**
 * 跳转到登录页
 */
export const toLogin = () => {
  if (/AND_SQ|IPH_SQ|micromessenger(\/[\d.]+)*/i.test(window.navigator.userAgent)) {
    // 微信手Q使用wq登录
    window.location.href = '//wq.jd.com/pinbind/pintokenredirect?biz=paimai&url=' + encodeURIComponent(window.location.href)
  } else {
    // 统一登录
    window.location.href = '//plogin.m.jd.com/user/login.action?appid=100&returnurl=' + encodeURIComponent(window.location.href)
  }
}
/**
 * 获取关注类型 1拍品 2专场 3店铺
 * @param pageName
 * @returns {null|number}
 */
export const getTypeCode = function (pageName) {
  switch (pageName) {
    case 'product':
      return 1
    case 'album':
      return 2
    case 'shop':
      return 3
    default:
      return null
  }
}
