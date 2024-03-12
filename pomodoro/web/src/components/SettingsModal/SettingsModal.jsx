const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="left-0, fixed top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-8">
        <h2>{'Settings'}</h2>
        <hr></hr>
        <button onClick={onClose}>Save</button>
      </div>
    </div>
  )
}

export default SettingsModal
