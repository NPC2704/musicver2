import {
  PiGlobeHemisphereWestLight,
  PiLinkSimpleHorizontalLight,
  PiLockKeyLight,
} from "react-icons/pi"

export const SELECT_PER_CR_PL_ITEM = [
  {
    value: 2,
    title: "Công khai",
    subTitle: "Mọi người có thể tìm kiếm và xem",
    icon: PiGlobeHemisphereWestLight,
  },
  {
    value: 1,
    title: "Không công khai",
    subTitle: "Bất kỳ ai có đường liên kết đều có thể xem",
    icon: PiLinkSimpleHorizontalLight,
  },
  {
    value: 0,
    title: "Riêng tư",
    subTitle: "Chỉ bạn mới có thể xem",
    icon: PiLockKeyLight,
  },
]
