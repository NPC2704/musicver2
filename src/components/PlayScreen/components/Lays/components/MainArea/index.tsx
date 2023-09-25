import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useState, CSSProperties, useEffect, memo } from "react"
import PlayListLays from "../PlayListLays"
import { PLAYER_ITEM } from "../../../../../../items/PLAYER_ITEM"
import { useAppSelector } from "../../../../../../app/hooks"
import LyricLays from "../LyricLays"
import { SongListLaysTitle } from "../../../../../../pages/PlayList/components/SongList"
import { styled } from "@mui/material/styles"
import RelatedLays from "../RelatedLays"

interface IProps {}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const tabStyle: CSSProperties = {
  flex: 1,
  color: "#ffffffB3",
  fontSize: "14px",
  fontWeight: 700,
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <>
      {value == 0 && value == index ? <SongListLaysTitle /> : null}
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className="card-main-view-player h-full overflow-hidden pr-3 hover:card-main-view-player-hover relative"
      >
        {children}
      </div>
    </>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

interface StyledTabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    height: 1,
  },
})

const MainArea: React.FC<IProps> = memo(() => {
  const [value, setValue] = useState(0)
  const [arrValue, setArrvalue] = useState<number[]>([0])
  const playListId = useAppSelector((state) => state.player.playListId)

  useEffect(() => {
    setArrvalue([value || 0])
  }, [playListId])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setArrvalue((preSate) => [...preSate, newValue])
  }
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "var(--border-main)" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {PLAYER_ITEM?.map((item, index) => {
            return (
              <Tab
                key={index}
                style={{
                  ...tabStyle,
                  color: value == index ? "white" : "#ffffffB3",
                }}
                label={item.name}
                {...a11yProps(index)}
              />
            )
          })}
        </StyledTabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        {arrValue?.includes(0) && <PlayListLays />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {arrValue?.includes(1) && <LyricLays />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {arrValue?.includes(2) && <RelatedLays />}
      </CustomTabPanel>
    </>
  )
})

export default MainArea
