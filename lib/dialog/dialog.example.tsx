import Button from "../button";
import React, { useState } from "react";
// 如果你引入了一个组件要大写，否则用小写
import Dialog, { alert, confirm, modal } from "./dialog";

export default function () {
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);

  const openModal = () => {
    const close = modal(
      <h1>hi <Button onClick={() => {close()}}>close</Button> </h1>,
    ) 
  }

  return (
    <div>
      <div>
        <h1>example 1</h1>
        <Button onClick={() => setX(!x)}>show dialog1</Button>
        <Dialog
          visible={x}
          buttons={
            // 这里虽然使用起来很麻烦，但是理解起来(原理)非常的简单
            [
              <Button onClick={() => { setX(false); }} > 1 </Button>,
              <Button onClick={() => { setX(false); }} > 2 </Button>,
            ]
          }
          onClose={() => { setX(false); }}
        >
          <strong>dialog1</strong>
        </Dialog>
      </div>
      <div>
        <h1>example 2</h1>
        <Button onClick={() => setY(!y)}>show dialog2</Button>
        <Dialog
          visible={y}
          buttons={
            // 这里虽然使用起来很麻烦，但是理解起来(原理)非常的简单
            [
              <Button onClick={() => { setY(false); }} > 1 </Button>,
              <Button onClick={() => { setY(false); }} > 2 </Button>,
            ]
          }
          onClose={() => { setY(false); }}
          closeOnClickMask={true}
        >
          <strong>dialog2</strong>
        </Dialog>
      </div>
      <div>
        <h1>example 3</h1>
        <Button onClick={() => { alert('hi') }} >alert</Button>
        <Button
          onClick={() => {
            confirm(
              'confirm',
              () => { console.log('yes') },
              () => { console.log('no') })
          }} >confirm</Button>
          {/* 你会发现这里 modal 里面的按钮不能关闭 modal  */}
          {/* 怎么解决？ 使用函数抽象为你能理解的方式
          function f1() { 
            let visible = false return {}
            return () => {
              visible = false
              console.log(visible)
            }
          }
          api = f1()
          api() */}
          {/* react 全部都是函数 */}
        <Button onClick={openModal} >modal</Button>
      </div>
    </div>
  );
}
