import { Link } from "react-router-dom"
import { IArtists } from "../../types/item"
import { createArtistHref, createPlayListHref } from "../../utils/createHref"

interface IProps {
  artists: IArtists[]
}

export const ArtistsDL: React.FC<IProps> = ({ artists }) => {
  return (
    <div>
      {artists?.map((item, index) =>
        index < 3 ? (
          <span key={index}>
            {`${item?.name}${index == artists?.length - 1 ? "" : ","} `}
          </span>
        ) : (
          ""
        ),
      )}
      {artists?.length > 3 ? "..." : ""}
    </div>
  )
}

const Artists: React.FC<IProps> = ({ artists }) => {
  return (
    <div>
      {artists?.map((item, index) =>
        index < 3 ? (
          item?.alias ? (
            <Link
              key={index}
              to={createArtistHref(item?.alias)}
              className="hover:underline"
            >
              {`${item?.name}${index == artists?.length - 1 ? "" : ","} `}
            </Link>
          ) : (
            <span key={index}>
              {`${item?.name}${index == artists?.length - 1 ? "" : ","} `}
            </span>
          )
        ) : (
          ""
        ),
      )}
      {artists?.length > 3 ? "..." : ""}
    </div>
  )
}

interface IArtistsItem {
  artist: IArtists
}

export const ArtistsItem: React.FC<IArtistsItem> = ({ artist }) => {
  const href = createArtistHref(artist?.alias)
  // console.log(artist)
  return (
    <div className="mr-6 w-40">
      <Link to={href}>
        <div className="group w-40 h-40 rounded-full overflow-hidden relative">
          <img
            loading="lazy"
            className="rounded-full h-full object-cover cursor-pointer"
            src={artist?.thumbnailM}
            alt="playlist-thumbnail"
          />
          <div className="duration-300 transition-all opacity-0 group-hover:opacity-100 top-0 rounded absolute w-full h-full cursor-pointer bg-gradient-to-b from-from-body-bg-gradiant to-transparent"></div>
        </div>
      </Link>
      <div className="mt-4 flex flex-col items-center">
        <Link to={href}>
          <div className="font-bold mb-2 cursor-pointer hover:underline ">
            {artist?.name}
          </div>
        </Link>
        <div className="text-whiteT1 text-sm">
          {artist?.totalFollow} follower
        </div>
      </div>
    </div>
  )
}

export default Artists
