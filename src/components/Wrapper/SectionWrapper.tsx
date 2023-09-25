import { ReactNode } from "react"

interface IHomeSectionWrapperProps {
  children: ReactNode
}

interface ISectionWrapperProps {
  children: ReactNode
}

export const HomeSectionWrapper: React.FC<IHomeSectionWrapperProps> = ({
  children,
}) => {
  return <div className="mb-12">{children}</div>
}

export const SectionWrapper: React.FC<ISectionWrapperProps> = ({
  children,
}) => {
  return <div className="mb-12">{children}</div>
}
