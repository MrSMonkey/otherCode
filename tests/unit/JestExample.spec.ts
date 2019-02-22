import Vue from 'vue';

// 测试函数方法的结果是否正确
test('测试1 + 2 等于3', () => {
  expect(1 + 2).toBe(3);
});

// 测试复合数据类型的值是否正确，要使用 toEqual, 而非 toBe
test('测试对象合并', () => {
  const data: any = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// 反向测试 not
test('测试反向匹配,每次结果都不能为0', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

// 测试 undefined、null和false
test('区分undefined, null和false', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

// 对数字 0 的测试
test('对数字0的类型测试', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// 对数字的等价匹配器
test('测试对数字的匹配', () => {
  const x = 10;
  expect(x).toBe(10); // 与下面的 toEqual 等价
  expect(x).toEqual(10);
  expect(x).toBeGreaterThan(9); // 大于 >
  expect(x).toBeGreaterThanOrEqual(8.5); // 大于等于 >=
  expect(x).toBeLessThan(20); // 小于 <
  expect(x).toBeLessThanOrEqual(15.5); // 小于等于 <=
});

// 对于浮点数运算，应该使用 toBeClose ,而非 toEqual
test('测试浮点数相加', () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3);
});

// toMatch 用来验证字符串中是否包含字符串或正则
test('测试某个字符串中是否包含指定字符串或正则', () => {
  expect('Hello Wolrd!').toMatch('llo');
  expect('Hello Jest, I am UOKO').toMatch(/UOKO/);
});

// toContain 验证数组中是否包含匹配子项
test('测试某个数组中是否包含指定子项', () => {
  const arr = ['a', 'ab', 'abc', 'abcd'];
  expect(arr).toContain('ab');
});

// toThrow 期望某个函数或方法抛出异常
test('测试某个函数或方法可以抛出异常', () => {
  const throwFn = (): never => {
    throw new TypeError('This is a Type Error!');
  };

  expect(throwFn).toThrow();
  expect(throwFn).toThrow(TypeError);
  expect(throwFn).toThrow('This is a Type Error!');
  expect(throwFn).toThrow(/is/); // 抛出的异常说明中包含指定字符串
});

/* *********************** 测试异步代码 ************************ */

// 使用回调函数， 加入 done 方法标识函数结束
test('使用回调函数方式测试异步函数，返回指定字符串', (done) => {
  const fetchData = (cb: any) => {
    const data = 'Hello UOKO';
    setTimeout(() => {
      cb(data);
    }, 0);
  };

  const callback = (data: any) => {
    expect(data).toBe('Hello UOKO');
    done();
  };

  fetchData(callback);
});

// 使用Promise
test('使用Promise方式处理异步', (): any => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 0, 'OK');
    });
  };

  expect.assertions(1);
  return fetchData().then((value) => {
    expect(value).toBe('OK');
  });
});

// 使用更加简单的 async/await
describe('async', () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 0, 'OK');
    });
  };

  test('使用async/await测试异步代码', async () => {
    expect.assertions(1);
    const data = await fetchData();
    expect(data).toBe('OK');
  });

  test('使用async/await测试并带有异常处理', async () => {
    // expect.assertions(1)
    try {
      await fetchData();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
/* *********************************************************** */

/* *********************** 测试前准备与测试后整理 ************************ */

// Jest提供了辅助函数帮助我们在运行测试前做一些准备工作以及在测试后做一些清理工作
// beforeEach 和 afterEach 在每个测试前/后执行
// beforeAll 和 afterAll 在文件前/后执行
// 当 before 和 after 在 describe块内时，就只适用于该describ块
describe('开始测试前和测试后的工作', () => {
  let first: any;
  let last: any;

  beforeEach(() => {
    first = 'Hello';
    last = 'UOKO';
  });

  afterEach(() => {
    first = '';
    last = '';
  });

  test('测试进行中...', () => {
    expect(first + ' ' + last).toBe('Hello UOKO');
  });
});

// describe 和 test 块的执行顺序
// Jest会在test测试开始之前执行测试文件里所有的describe处理程序
// describe块可以相互嵌套
// describe('开始最外层的describe块', () => {
//   console.log('describe outside')

//   describe('开始内层的describe块', () => {
//     console.log('describe inner block')
//     test('begin test in inner describe block', () => {
//       console.log('test of inner describe block')
//       expect(true).toEqual(true)
//     })
//   })
// })

/* ******************************************************************* */

/* *********************** 单独测试 *********************************** */

// 可以使用 test.only 来单独执行一个测试
// describe('使用 test.only 单独进行一个测试', () => {
//   test.only('单独进行的一次测试', () => {
//     expect('A').toBe('A')
//   })
// })

/* ******************************************************************* */

/* *********************** Mock Function ***************************** */

// Mock函数用来模拟函数/方法的外部依赖，比如返回的数据等。
// 有两种方法创建Mock函数：直接创建Mock函数和自定义编写Manual Mock来覆盖模块间依赖
// 创建一个Mock函数： const mockCallbak = jest.fn()
describe('使用 Mock Function 来模拟数据', () => {
  test('use mock function', () => {
    const myForEach = (items: any, callback: any) => {
      for (const index of items) {
        callback(items[index]);
      }
    };

    const mockCallback = jest.fn((x) => 42 + x);
    myForEach([0, 1], mockCallback);

    expect(mockCallback.mock.calls.length).toBe(2); // 模拟函数被调用2次
    expect(mockCallback.mock.calls[0][0]).toBe(0); // 第一次调用时的第一个参数是0
    expect(mockCallback.mock.calls[1][0]).toBe(1); // 第二次调用时的第一个参数是1
  });
});

// Mock函数匹配器
describe('演示Mock函数匹配器的用法', () => {
  const myForEach = (items: any, callback: any) => {
    for (let i = 0; i < items.length; i++) {
      callback(items[i]);
    }
    // for (const index of items) {
    //   callback(items[index]);
    // }
  };

  const mockFunc = jest.fn((x) => x * x);
  myForEach([1, 2, 3], mockFunc);

  test('至少被调用一次的mock函数', () => {
    expect(mockFunc).toBeCalled();
  });

  test('至少被调用一次的mock函数，且传入的特定参数', () => {
    expect(mockFunc).toBeCalledWith(expect.anything());
  });

  test('函数最后一次调用传入特定参数', () => {
    expect(mockFunc).lastCalledWith(expect.anything());
  });
});
/* ******************************************************************* */
