interface IProps {
  title: string
  fontSize?: string
}

const SectionTitle: React.FC<IProps> = ({ title, fontSize = "" }) => {
  return (
    <div
      className={`${fontSize ? `text-${fontSize}` : "text-3xl"} font-extrabold`}
    >
      {title}
    </div>
  )
}

export const SectionTitle2xl: React.FC<IProps> = ({
  title,
  fontSize = "3xl",
}) => {
  return (
    <div className={`text-2xl text-${fontSize} font-extrabold text-white`}>
      {title}
    </div>
  )
}

export const SectionTitleXl: React.FC<IProps> = ({ title }) => {
  return <div className={`text-xl  font-extrabold text-white`}>{title}</div>
}

export default SectionTitle
