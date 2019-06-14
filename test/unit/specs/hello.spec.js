// 导入 Vue.js 和组件，进行测试
import Hello from "../../../src/pages/Hello.vue";
import { mount } from "@vue/test-utils";
import { expect } from "chai";

describe("Hello", () => {
  const wrapper = mount(Hello);
  const vm = wrapper.vm;
  // 检查原始组件选项
  it("has a created hook", () => {
    expect(Hello.created).to.be.a("function");
  });

  // 评估原始组件选项中的函数的结果
  it("sets the correct default data", () => {
    expect(Hello.data).to.be.a("function");
    const defaultData = Hello.data();
    expect(defaultData.msg).to.equal("hello");
  });

  // 检查 mount 中的组件实例
  it("correctly sets the message when created", () => {
    expect(vm.msg).to.equal("world");
  });

  // 创建一个实例并检查渲染输出
  it("renders the correct message", () => {
    expect(wrapper.find("p").text()).to.equal("world");
  });

  // 设置组件的data
  it("correctly sets the message", () => {
    wrapper.setData({ msg: "hello world" });
    expect(wrapper.vm.msg).to.equal("hello world");
  });
});
