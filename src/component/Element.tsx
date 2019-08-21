import React, { Ref, PropsWithChildren, HTMLAttributes } from 'react';

export const Canvas = React.forwardRef((props: PropsWithChildren<HTMLAttributes<HTMLCanvasElement>>,
  ref: Ref<HTMLCanvasElement>) => <canvas {...props} ref={ref} />);

export const Div = (props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div {...props}>{props.children}</div>
);

export const P = (props: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) => (
  <p {...props}>{props.children}</p>
);
export const Img = (props: PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>) => <img {...props} alt={props.alt} />;

export const Span = (props: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) => (
  <span {...props}>{props.children}</span>
);

export const Heading = (props: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => {
  const Heading = `${props.datatype!}`;
  return (<Heading {...props!}>{props!.children}</Heading>)
}
export const List = (props: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => {
  return (<ul {...props!}>{props!.children}</ul>)
}
export const ListItem = (props: PropsWithChildren<HTMLAttributes<HTMLLIElement>>) => {
  return (<li {...props!}>{props!.children}</li>)
}
export const Button = (props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) => {
  return (<button {...props!}>{props!.children}</button>)
}
export const A = (props: PropsWithChildren<HTMLAttributes<HTMLAnchorElement>>) => {
  return (<a {...props!}>{props!.children}</a>)
}
export const Small = (props: PropsWithChildren<HTMLAttributes<HTMLAnchorElement>>) => {
  return (<small {...props!}>{props!.children}</small>)
}
export const Strong = (props: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
  return (<strong {...props!}>{props!.children}</strong>)
}

export const Form = (props: PropsWithChildren<HTMLAttributes<HTMLFormElement>>) => (
  <form {...props}>{props.children}</form>
);

export const Input = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
  <input {...props} />
);