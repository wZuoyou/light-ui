// 为什么叫 dialog/dialog.tsx 这么重复的名字呢
// 为什么不能是 dialog/index.tsx 呢
// 我说一下基于什么考虑
// 我基于的考虑是 我搜索的时候好搜索
// 现在这样命名 cmd + p 搜索 dialog 就可以找到
// 否则就要搜索 dialog/index
// 所以目前是基于搜索的方便性，来设计了这样命名

// 大小写方面，只要一致就好了
// 一般来说 大小写无所谓

// null 和 undefined 坚持用一个就好了

// 写完代码 立刻重构 立即重构
// 1个小时以后 你就不想重构了
// 重构就一个原则
// 消除重复
// 当你觉得你无法消除很相似的代码时
// 你可能需要从更大的维度进行抽象
import { Icon } from "../index";
import React, { Fragment, ReactElement, ReactNode } from "react";
import ReactDOM from "react-dom";
import "./dialog.scss";
import { scopedClassMaker } from "../classes";
import Button from "../button";

interface Props {
  visible: boolean;
  buttons?: Array<ReactElement>;
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
}

// sc scopedClass
const scopedClass = scopedClassMaker("ssh-dialog");
const sc = scopedClass;

// // 每次都要写 ssh-dialog- 是不是很烦
// function x(name?: string) {
//   return ["ssh-dialog", name].filter(Boolean).join("-");
//   //   return `ssh-dialog${name ? "-" + name : ""}`;
// }

const Dialog: React.FC<Props> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e);
  };
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e);
    }
  };

  const x = props.visible ? (
    <Fragment>
      <div className={sc("mask")} onClick={onClickMask}></div>
      <div className={sc()}>
        {/* 不要把关闭放在 header 里面
          否则就相当于你暗示了想要 close 就必须有 header */}
        <div className={sc("close")} onClick={onClickClose}>
          <Icon name="close" />
        </div>
        <header className={sc("header")}>提示</header>
        <main className={sc("main")}>{props.children}</main>
        {
          props.buttons && props.buttons.length > 0 &&
          <footer className={sc("footer")}>
            {props.buttons.map((button, index) =>
              React.cloneElement(button, { key: index })
            )}
          </footer>
        }
      </div>
    </Fragment>
  ) : //   这样做不好
    //   因为我们经常做的一个功能叫做点击遮罩层关闭弹窗
    //   这样的层叠的话 点击哪里都会触发遮罩层的点击事件
    // <div className="ssh-dialog-mask">
    //   <div className="ssh-dialog">{props.children}</div>
    // </div>
    null;
  return ReactDOM.createPortal(x, document.body);
};

Dialog.defaultProps = {
  closeOnClickMask: false,
}

const modal = (content: ReactNode, buttons?: Array<ReactElement>, afterClose?: () => void) => {
  // 如何动态创建组件 
  // React.render
  // 重复代码等全部都写完(组件)了再优化 
  const close = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }

  const component =
    <Dialog
      visible={true}
      onClose={() => {
        close()
        afterClose && afterClose()
      }}
      buttons={buttons}
    >{content}</Dialog>

  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)

  return close
}

const alert = (content: string) => {
  const buttons =
    [<Button onClick={() => { close() }}>ok</Button>]
  const close = modal(content, buttons)
}

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    close()
    yes && yes()
  };
  const onNo = () => {
    close()
    no && no()
  };
  const buttons = [
    <Button onClick={onYes}>yes</Button>,
    <Button onClick={onNo}>no</Button>,
  ]
  const close = modal(content, buttons, no)
}

export { alert, confirm, modal };
export default Dialog;
