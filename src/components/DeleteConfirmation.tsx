export interface DeleteConfirmation {
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmation = ({ onConfirm, onCancel }: DeleteConfirmation) => {
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  )
}

export default DeleteConfirmation
