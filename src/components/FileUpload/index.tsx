/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */

import { useAppDispatch } from '../redux/hooks'
import { uploadFileRequest } from '../redux/reducers/films/reducer'

const FileUpload = () => {
  const dispatch = useAppDispatch()

  const handleFileChosen = (file: File) => {
    const formData = new FormData()
    formData.append('movies', file)
    dispatch(uploadFileRequest(formData))
  }

  return (
    <div>
      <input
        className="button button--redirect"
        type="file"
        placeholder="Import Movies from File"
        onChange={(e) => handleFileChosen(e.target.files?.[0] as File)}
      />
    </div>
  )
}

export default FileUpload
