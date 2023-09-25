import { useCallback, useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import useDebounce from "../../hooks/useDebounce"
import searchService from "../../services/searchService"
import { ISearchRs } from "../../types/item"
import SearchItem, { TitleRs } from "./components/searchItem"
import {
  ArtistLinkItem,
  PlaylistLinkItem,
  SongItemRelated,
  SongLinkItem,
} from "../../pages/PlayList/components/SongItem"
import { TfiClose } from "react-icons/tfi"
import { CirButton } from "../Button"
import Loader from "../Loader"
import { history } from "../../_helper"
import { createSearchHref } from "../../utils/createHref"

const Search: React.FC = () => {
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = history?.navigate

  const [searchValue, setSearchValue] = useState<string>("")
  const [searchRs, setSearchRs] = useState<ISearchRs>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const debouncedValue = useDebounce(searchValue, 500)

  const handleChangeSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value
      setSearchValue(value)
      setIsInputFocus(true)
    },
    [],
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (navigate && searchValue) {
      navigate(createSearchHref(searchValue))
      inputRef.current && inputRef.current.blur()
    }
  }

  const handleClear = () => {
    setIsInputFocus(true)
    setSearchValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleFocus = () => {
    setTimeout(() => setIsInputFocus(true), 100)
  }

  const handleBlur = () => {
    setTimeout(() => setIsInputFocus(false), 300)
  }

  useEffect(() => {
    if (!debouncedValue) return setSearchRs({})
    setIsLoading(true)
    searchService(debouncedValue).then((fb) => {
      setIsLoading(false)
      if (fb?.result == 1) {
        const rs = fb?.data?.data
        setSearchRs(rs)
      } else {
        setSearchRs({})
      }
    })
  }, [debouncedValue])

  return (
    <div className="relative">
      {isInputFocus ? (
        <div className="absolute overflow-auto scrollbar-noboder top-11 min-h-[40px] max-h-[70vh] bg-main-bg w-full border border-white-opacity-25 border-t-0 rounded-br rounded-bl">
          <div className="">
            <div>{debouncedValue && <SearchItem title={debouncedValue} />}</div>
            {searchRs?.artists?.length && searchRs?.artists[0]?.alias ? (
              <div>
                <TitleRs title="Nghệ sỹ" />
                {searchRs?.artists?.map((artist, index) => {
                  return (
                    index < 5 && <ArtistLinkItem key={index} artist={artist} />
                  )
                })}
              </div>
            ) : null}
            {searchRs?.songs?.length ? (
              <div>
                <TitleRs title="Bài hát" />
                {searchRs?.songs?.map((song, index) => {
                  return index < 5 && <SongLinkItem key={index} song={song} />
                })}
              </div>
            ) : null}

            {searchRs?.playlists?.length ? (
              <div>
                <TitleRs title="Danh sách phát" />
                {searchRs?.playlists?.map((plsylist, index) => {
                  return (
                    index < 5 && (
                      <PlaylistLinkItem key={index} playlist={plsylist} />
                    )
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div
        className={`flex h-11 overflow-hidden rounded border border-white-opacity-25 relative ${
          isInputFocus
            ? "bg-main-bg rounded-bl-none rounded-br-none"
            : "bg-white-opacity-20"
        }`}
      >
        <div
          className={`h-full w-12 flex justify-center items-center ${
            isInputFocus ? "tex-white" : "text-whiteT1"
          }`}
        >
          <CiSearch size={22} />
        </div>
        <form className="h-full" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchValue}
            onChange={handleChangeSearchValue}
            placeholder="Tìm bài hát, nghệ sỹ, danh sách phát"
            className="px-2 h-full w-header-search outline-none border-none bg-transparent placeholder:text-whiteT1"
          />
        </form>
        {searchValue && (
          <div
            className={`h-full w-12 absolute right-0 flex justify-center items-center `}
          >
            {isLoading ? (
              <Loader size={20} />
            ) : (
              <CirButton isStopPropagation isTransparent onClick={handleClear}>
                <TfiClose size={18} />
              </CirButton>
            )}
          </div>
        )}
      </div>
    </div>
  )
  {
    /* <CiSearch size={23} />
  <div className="ml-3">{t("search")}</div> */
  }
}

export default Search
