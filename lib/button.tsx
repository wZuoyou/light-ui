import React from "react";
import "./button.scss";
import { scopedClassMaker } from "./classes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
}

const Button: React.FC<ButtonProps> = ({onClick, children, ...restProps}) => {
  const scopedClass = scopedClassMaker("ssh-button");
  const sc = scopedClass;
  return (
    <a className={sc()} onClick={(e) => {onClick && onClick(e)}}>
      <span className={sc("inner-wrapper")}>
        <span className={sc("content")}>{children}</span>
      </span>
    </a>
  );
};

export default Button;
