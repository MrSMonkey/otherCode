/**
 * 函数去抖
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 */
// export default function debounce(func, wait, immediate) {
//   // immediate默认为false
//   var timeout, args, context, timestamp, result;

//   var later = function() {
//     // 当wait指定的时间间隔期间多次调用 debounce 返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
//     var last = now() - timestamp;
//     console.log(last)
//     if (last < wait && last >= 0) {
//       timeout = setTimeout(later, wait - last);
//     } else {
//       timeout = null;
//       if (!immediate) {
//         result = func.apply(context, args);
//         if (!timeout) context = args = null;
//       }
//     }
//   };

//   function now() {
//     var d = new Date();
//     return d.getTime()
//   }

//   return function() {
//     context = this;
//     args = arguments;
//     timestamp = now();
//     // 第一次调用该方法时，且immediate为true，则调用func函数
//     var callNow = immediate && !timeout;
//     // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
//     if (!timeout) timeout = setTimeout(later, wait);
//     if (callNow) {
//       result = func.apply(context, args);
//       context = args = null;
//     }

//     return result;
//   };
// };



function now() {
  var d = new Date();
  return d.getTime()
}

export default function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : (+wait || 0);
  if (options === true) {
    var leading = true;
    trailing = false;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    lastCalled = 0;
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function complete(isCalled, id) {
    if (id) {
      clearTimeout(id);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (isCalled) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = undefined;
      }
    }
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      complete(trailingCall, maxTimeoutId);
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    complete(trailing, timeoutId);
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = undefined;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}