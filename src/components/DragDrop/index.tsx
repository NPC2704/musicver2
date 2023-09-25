import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { ISong } from "../../types/item"
import { ReactNode, memo } from "react"

const grid = 0

// a little function to help us with reordering the result
const reorder = (list: ISong[], startIndex: any, endIndex: any) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  //   background: isDragging ? "#00000000" : "#00000000",
  background: "var(--main-bg)",
  ...draggableStyle,
})

const getListStyle = (isDraggingOver: any) => ({
  //   background: isDraggingOver ? "#00000000" : "#00000000",
  background: "var(--main-bg)",
  padding: grid,
  width: "100%",
})

interface IProps {
  renderList: any[]
  onDragEnd: (newList: any[]) => void
  renderItem: (item: any, index: number) => ReactNode
  dropId: string
}

const DragDrop: React.FC<IProps> = ({
  renderList,
  onDragEnd,
  renderItem,
  dropId = "dropId",
}) => {
  const items = renderList?.map((itemS, index) => ({
    ...itemS,
    id: `item-${dropId}-${index}`,
  }))

  function onDragEnd_(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items_: ISong[] = reorder(
      items,
      result.source.index,
      result.destination.index,
    )

    onDragEnd(items_ || [])
  }

  return (
    <div className="mt-0">
      <DragDropContext onDragEnd={onDragEnd_}>
        <Droppable droppableId={dropId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable
                  key={`${index}`}
                  draggableId={item?.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      {renderItem(item, index)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default memo(DragDrop)
