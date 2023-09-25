export const createPlayListHref = (playlistId: string | number) => {
  return `/playlist?id=${playlistId}`
}

export const createPlayerHref = (songID: string, songListId?: string) => {
  return `/player?id=${songID}${songListId ? `&listId=${songListId}` : ""}`
}

export const createArtistHref = (artistId: string | number) => {
  return `/artist?id=${artistId}`
}

export const createSearchHref = (searchParram: string | number) => {
  return `/search?q=${searchParram}`
}
