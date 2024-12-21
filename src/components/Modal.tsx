import {
  ComponentRef,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'

type ModalHandle = {
  open: () => void
  close: () => void
}

export type ModalRef = ComponentRef<typeof Modal>

const Modal = forwardRef<ModalHandle, PropsWithChildren>(
  ({ children }: PropsWithChildren, ref) => {
    const dialog = useRef<HTMLDialogElement>(null)

    useImperativeHandle(ref, () => {
      return {
        open: () => {
          dialog.current!.showModal()
        },
        close: () => {
          dialog.current!.close()
        },
      }
    })

    return createPortal(
      <dialog className="modal" ref={dialog}>
        {children}
      </dialog>,
      document.getElementById('modal')!
    )
  }
)

export default Modal
