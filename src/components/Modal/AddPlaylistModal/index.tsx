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
import { loginCallback } from "../../../utils/ui"
let userSchema = object({
  permision: string().required(),
  title: string().required(),
  sortDescription: string().required(),
})

interface IProps {
  button: ReactNode
}

interface IForm {
  permision?: string
  title?: string
  sortDescription?: string
}

const AddPlaylistModal: React.FC<IProps> = ({ button }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [isShowWarning, setIsShowWarning] = useState<boolean>(false)
  const [formState, setFromState] = useState<IForm>({
    permision: "2",
    title: "",
    sortDescription: "",
  })

  const resetFormSate = () => {
    setFromState({
      permision: "2",
      title: "",
      sortDescription: "",
    })
  }

  const handleChangePer = (event: SelectChangeEvent) => {
    const value = event.target.value

    setFromState({ ...formState, permision: value })
  }

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const value = event?.target?.value
    setFromState({ ...formState, [id]: value })
  }

  const handleClickOpen = () => {
    loginCallback(() => setOpen(true))
  }

  const handleClose = () => {
    setOpen(false)
    resetFormSate()
  }

  const handleSubmit = async () => {
    userSchema
      .validate(formState)
      .then((fb) => {
        setOpen(false)

        const promise = createPlayListService(formState)

        toast.promise(promise, {
          loading: "Đang tạo playlist",
          success: (data) => {
            resetFormSate()
            initDataUser()
            if (data?.result == 1 && data?.encodeId) {
              navigate(createPlayListHref(data?.encodeId))
            }
            return data?.result == 1 ? "Tạo thành công" : "Tạo thất bại"
          },
          error: "Tạo thất bại",
        })
      })
      .catch((error) => {
        toast("Thiếu thông tin")
        // toast.custom((t) => <MiniToast t={t} infoText="Thiếu thông tin" />, {
        //   duration: 3000,
        // })
      })
  }

  return (
    <div>
      <div onClick={handleClickOpen}>{button}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "var(--grayL)",
            boxShadow: "none",
            border: "1px solid var(--border-mainL1)",
            width: "50%",
          },
        }}
      >
        <DialogTitle>
          <SectionTitleXl title="Danh sách phát mới" />
        </DialogTitle>
        <DialogContent>
          <div className="mb-6">
            <TextField
              autoFocus
              value={formState?.title}
              autoComplete="off"
              margin="dense"
              id="title"
              label="Tiêu đề"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeInput(e, "title")
              }}
            />
          </div>
          <div className="mb-6">
            <TextField
              value={formState?.sortDescription}
              multiline
              autoComplete="off"
              margin="dense"
              id="sortDescription"
              label="Thông tin mô tả"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeInput(e, "sortDescription")
              }}
            />
          </div>
          <FormControl variant="standard" style={{ width: "70%" }}>
            <div className="mb-6">
              <InputLabel id="demo-simple-select-filled-label">
                Quyền riêng tư
              </InputLabel>
              <Select
                style={{ width: "100%" }}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={formState?.permision || "0"}
                onChange={handleChangePer}
              >
                {SELECT_PER_CR_PL_ITEM?.map((item, index) => {
                  const Icon = item?.icon
                  return (
                    <MenuItem value={item?.value} key={index}>
                      <div className="flex items-center">
                        <div className="w-9 flex justify-center items-center">
                          <Icon size={25} color={"var(--whiteT1)"} />
                        </div>

                        <div className="text-white ml-2">
                          <div>{item?.title}</div>
                          <div className="text-xs text-whiteT1">
                            {item?.subTitle}
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                  )
                })}
              </Select>
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "var(--color-white)" }}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPlaylistModal
