export const getArtists = () => {}
export const getPerPlaylist = (per: number) => {
  switch (per) {
    case 2:
      return "Công khai"
      break
    case 1:
      return "Không công khai"
      break
    default:
      return "Riêng tư"
  }
}
