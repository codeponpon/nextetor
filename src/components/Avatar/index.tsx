import React from "react";
import { Avatar } from "antd";

interface IProps {
  src: string;
  fullName: string;
  className: string;
  style: object;
  vip: boolean;
  size: string | number;
}

const AvatarCpn: React.FC<IProps> = (props: IProps) => {
  const {
    src = "",
    fullName = "",
    className = "",
    style = {},
    size = 50,
    vip = false,
    ...attr
  } = props;

  if (vip) {
    return (
      <div
        style={{
          ...style,
          border: "2px solid #FF9900",
          borderRadius: "50%",
          position: "relative",
          lineHeight: "normal",
          display: "inline-block",
        }}
      >
        <Avatar
          {...attr}
          size={size}
          className={className}
          src={src}
          style={{
            border: "1px solid rgba(228, 228, 228, 0.6)",
          }}
        >
          {!src ? (
            <div style={{ fontSize: size / 3, lineHeight: size + "px" }}>
              {fullName.slice(0, 2)}
            </div>
          ) : (
            ""
          )}
        </Avatar>
        {/* <div
					style={{
						borderRadius: '50%',
						top: '-5px',
						textAlign: 'center',
						position: 'absolute',
						right: '0',
						background: 'rgb(255, 255, 255)',
						height: (18 * size) / 50,
						width: (18 * size) / 50,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '1px solid #FF9900',
					}}
				>
					<img
						src={require('public/images/account/premium.png')}
						alt="#"
						style={{
							height: (10 * size) / 50,
							width: (10 * size) / 50,
						}}
					/>
				</div> */}
      </div>
    );
  }

  return (
    <Avatar
      {...attr}
      size={size}
      className={className}
      src={src}
      style={{
        border: "1px solid rgba(228, 228, 228, 0.6)",
        ...style,
      }}
    >
      {!src ? (
        <div style={{ fontSize: size / 3, lineHeight: size + "px" }}>
          {fullName.slice(0, 2)}
        </div>
      ) : (
        ""
      )}
    </Avatar>
  );
};

export default AvatarCpn;
