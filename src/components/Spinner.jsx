const Spinner = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4"
      role="status"
      aria-label="Loading"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-violet-900 border-t-violet-500"
        aria-hidden="true"
      />
    </div>
  )
}

export default Spinner