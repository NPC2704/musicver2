import { ReactNode } from "react";

interface IProps {
  styles?: string;
  children?: ReactNode | string;
}

const FlexTag: React.FC<IProps> = ({ styles, children }) => {
  return (
    <div className={`flex justify-center items-center ${styles || ""}`}>
      {children}
    </div>
  );
};

export default FlexTag;
