import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadBoards } from '../../../store/board/board.actions'
import { showErrorMsg } from '../../../services/event-bus.service' // Assuming you have this function
import { boardService } from '../../../services/board.service'
import { Avatar } from 'radix-ui'

export function SingleTaskActivityLog({ taskId }) {
  const { boardId } = useParams()
  const dispatch = useDispatch()

  const allBoards = useSelector((storeState) => storeState.boardModule.boards)
  const board = allBoards.find((board) => board._id === boardId)

  useEffect(() => {
    onLoadBoards()
  }, [])
  async function onLoadBoards() {
    try {
      await loadBoards()
    } catch (error) {
      showErrorMsg('Cannot load boards')
      console.error(error)
    }
  }

  function getIconByAction(action_name) {
    switch (action_name) {
      case 'Moved':
        return (
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            ></path>
          </svg>
        )
      case 'Duplicated':
        return (
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            ></path>
          </svg>
        )
      case 'Status':
        return (
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            ></path>
          </svg>
        )
      default:
        return (
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.5 9.125C8.39746 9.125 9.125 8.39746 9.125 7.5C9.125 6.60254 8.39746 5.875 7.5 5.875C6.60254 5.875 5.875 6.60254 5.875 7.5C5.875 8.39746 6.60254 9.125 7.5 9.125ZM7.5 10.125C8.94975 10.125 10.125 8.94975 10.125 7.5C10.125 6.05025 8.94975 4.875 7.5 4.875C6.05025 4.875 4.875 6.05025 4.875 7.5C4.875 8.94975 6.05025 10.125 7.5 10.125Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            ></path>
          </svg>
        )
    }
  }

  /* stal = SingleTaskActivityLog */
  return (
    <div className='stal_container'>
      {board.activities
        .filter((activity) => activity.taskid == taskId)
        .map((taskActivity) => (
          <div className='stal_row' key={taskActivity.id}>
            <div className='stal-time-user-title-and-status'>
              <span>{Math.floor(((Date.now() - taskActivity.createdAt) / (1000 * 60)) % 60)}m</span>
              <Avatar.Root className='AvatarRoot'>
                <Avatar.Image
                  className='AvatarImage'
                  src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
                  alt='Colm Tuite'
                />
                <Avatar.Fallback className='AvatarFallback' delayMs={600}>
                  GI {/* incase avatar cant be loaded show letters */}
                </Avatar.Fallback>
              </Avatar.Root>
              <span>{boardService.getTaskById(null, taskActivity.taskid).title}</span>
              <span className='stal-action'>
                {/* {getIconByAction(taskActivity.action_name)} */}
                {taskActivity.action_name}
              </span>
            </div>

            <div className='stal-free-txt'>{taskActivity.free_txt}</div>
          </div>
        ))}
    </div>
  )
}
