import React from "react";
import style from "./WaitingLoader.module.scss";

const WatingLoader = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => {
  const _size = size || 8;
  return (
    <div className={className && className}>
      <div className={style.loader}>
        <div
          className={style.ball}
          style={{ height: `${_size}px`, width: `${_size}px` }}
        />
        <div
          className={style.ball}
          style={{ height: `${_size}px`, width: `${_size}px` }}
        />
        <div
          className={style.ball}
          style={{ height: `${_size}px`, width: `${_size}px` }}
        />
      </div>
    </div>
  );
};

export default WatingLoader;
