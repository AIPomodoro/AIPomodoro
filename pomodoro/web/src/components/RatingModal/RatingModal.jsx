const RatingModal = ({ isOpen, handleRating }) => {
  if (!isOpen) return null

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-8">
        <h2 className="mb-2">Rate how focused you were.</h2>
        <div className="flex gap-1">
          {[...Array(10)].map((_, index) => (
            <button
              onClick={() => handleRating(index)}
              className="rounded-sm bg-slate-400 p-5 "
              key={index}
            >
              {index}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RatingModal
