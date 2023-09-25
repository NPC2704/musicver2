import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { ReactNode, useState } from "react"
import SectionTitle, {
  SectionTitle2xl,
  SectionTitleXl,
} from "../../SectionTitle"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { SELECT_PER_CR_PL_ITEM } from "../../../items/SELECT_ITEM"
import { object, string, number, date, InferType } from "yup"
import { InfoToast, MiniToast } from "../../Toast"
import toast from "react-hot-toast"
import createPlayListService from "../../../services/createPlayListService"
import Loader from "../../Loader"
import initDataUser from "../../../utils/initData"
import { useNavigate } from "react-router-dom"
import { createPlayListHref } from "../../../utils/createHref"
import { useAppSelector } from "../../../app/hooks"
import { ui } from "../../../utils/ui"
import { PiPlaylistLight } from "react-icons/pi"
import { CirButton } from "../../Button"
import { TfiClose } from "react-icons/tfi"
import { IPlayList } from "../../../types/item"

interface IProps {
  title?: string
}

const PlayListSelectModal: React.FC<IProps> = ({
  title = "Chọn danh sách phát",
}) => {
  const navigate = useNavigate()
  const state = useAppSelector((state) => state?.ui?.playlistSelect)
  const playlist = useAppSelector((state) => state?.user?.playList)

  const handleClose = () => {
    ui?.hiddenPlaylistSelect()
  }

  const handleCallback = (playlist: IPlayList) => {
    if (!playlist?.encodeId) return

    const cb = state?.callback
    cb && cb(playlist?.encodeId)
  }

  return (
    <div>
      <Dialog
        open={state?.isShow}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "var(--grayL)",
            boxShadow: "none",
            border: "1px solid var(--border-mainL1)",
            width: "384px",
          },
        }}
      >
        <DialogTitle>
          <div className="flex pb-2 items-center justify-between border-b border-[var(--border-mainL1)]">
            <SectionTitleXl title={state?.title || title} />
            <CirButton onClick={handleClose} isTransparent>
              <TfiClose className="text-lg" />
            </CirButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {playlist?.map((pl, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCallback(pl)}
                className="flex items-center my-1 py-2 -mx-6 px-6 cursor-pointer hover:bg-white-opacity-15"
              >
                <div>
                  <div className="h-12 w-12 flex flex-wrap bg-white-opacity-15 overflow-hidden rounded-sm">
                    {pl?.song?.items?.length ? (
                      pl?.song?.items?.map((song, index) => {
                        return (
                          index < 4 && (
                            <div key={index} className="w-1/2 h-1/2">
                              <img
                                src={song?.thumbnailM}
                                alt="songthumb"
                                className="w-full h-full"
                              />
                            </div>
                          )
                        )
                      })
                    ) : (
                      <div className="flex h-full w-full justify-center items-center bg-white-opacity-15">
                        <PiPlaylistLight className="text-lg text-whiteT1" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-3 h-12 flex flex-col justify-center py-2">
                  <div className="text-sm font-bold mb-1">{pl?.title}</div>
                  <div className="text-xs text-whiteT1">
                    {pl?.song?.items?.length || 0} bài hát
                  </div>
                </div>
              </div>
            )
          })}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PlayListSelectModal
