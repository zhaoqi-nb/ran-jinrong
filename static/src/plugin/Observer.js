class Observer {
  constructor() {
    this.list = {};
  }

  listen(key, func) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(func)
  }

  publish(key, params) {
    const funcs = this.list[key];
    if (!funcs) {
      return;
    }
    for (let i = 0, fn; fn = funcs[i++];) {
      fn && fn(params)
    }
  }

  loopPublish(key, params) {
    const funcs = this.list[key];
    if (!funcs) {
      let timmer = setTimeout(() => {
        timmer && clearTimeout(timmer)
        this.loopPublish(key, params)
      }, 300)
      return;
    }
    for (let i = 0, fn; fn = funcs[i++];) {
      fn && fn(params)
    }
  }
}

const observer = new Observer();

export default observer;