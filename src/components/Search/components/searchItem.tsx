import { CiSearch } from "react-icons/ci"
import { Link } from "react-router-dom"
import { createSearchHref } from "../../../utils/createHref"

interface IProps {
  title: string
}

const SearchItem: React.FC<IProps> = ({ title }) => {
  return (
    <Link to={createSearchHref(title)}>
      <div className="transition-all cursor-pointer flex h-12 items-center hover:bg-white-opacity-15">
        <div className="w-14 flex justify-center text-whiteT1">
          <CiSearch size={19} />
        </div>
        <div className="text-white">{title}</div>
      </div>
    </Link>
  )
}

export const TitleRs: React.FC<IProps> = ({ title }: { title: string }) => {
  return <div className="px-3 py-2 text-sm font-bold mt-3">{title}</div>
}

export default SearchItem
