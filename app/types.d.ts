
declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  // const value: any;
  // export = value;
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
