import LoaderSvg from "../../assets/interfaces/loader.svg"
import "./style.css"

interface IProps {
  fill?: string
  size?: number
}

const Loader: React.FC<IProps> = ({ fill = "#ffffff", size = 30 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ fill: fill, height: size }}
    >
      <g className="spinner-loader__">
        <path
          className="s-1-loader__"
          d="M12 1.224c0-.676.55-1.23 1.222-1.162A12 12 0 0123.73 14.527c-.142.66-.84 1.012-1.482.803-.643-.209-.987-.9-.862-1.563a9.551 9.551 0 00-8.166-11.24C12.55 2.44 12 1.9 12 1.223z"
        />
        <path
          className="s-2-loader__"
          d="M22.776 12c.676 0 1.23.55 1.162 1.222A12 12 0 019.473 23.73c-.66-.142-1.012-.84-.803-1.482.209-.643.9-.987 1.563-.862a9.551 9.551 0 0011.24-8.166C21.56 12.55 22.1 12 22.777 12z"
        />
        <path
          className="s-3-loader__"
          d="M12 22.776c0 .676-.55 1.23-1.222 1.162A12 12 0 01.27 9.473c.142-.66.84-1.012 1.482-.803.643.209.987.9.862 1.563a9.552 9.552 0 008.166 11.24c.67.087 1.221.627 1.221 1.303z"
        />
      </g>
    </svg>
  )
}

export default Loader
