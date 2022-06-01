import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

// Import Chonky
import {
  setChonkyDefaults,
  FileBrowser,
  FileContextMenu,
  FileList,
  FileNavbar,
  FileToolbar,
  ChonkyActions,
} from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import ControlledPopup from '../../shared/ControlledPopup/ControlledPopup'
setChonkyDefaults({ iconComponent: ChonkyIconFA })

const print2aApiHost = 'https://print2a.com'
const print2aApiPort = '5757'
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`

// Render the file browser
function ChonkyBrowse(props) {
  let newPath = `${print2aApiEndpoint}/print2a`
  let fileName = null
  const newChain = {
    id: 'print2a',
    name: 'print2a',
    isDir: true,
  }
  if (typeof window !== 'undefined') {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      newPath = `${print2aApiEndpoint}/print2a/${urlParams.get('folder')}`
    }
  }
  const [currentNodes, setCurrentNodes] = useState([])
  const [currentPath, setCurrentPath] = useState(newPath)
  const [folderChain, setFolderChain] = useState([newChain])
  // Define a handler for "open file" action
  const handleFileOpen = async (node) => {
    if (node.id === 'open_files' && node.payload.files[0].isDir) {
      const folder = node.payload.files[0]
      setCurrentPath(`${print2aApiEndpoint}/${folder.id}`)
    } else if (node.id === 'open_files' && !node.payload.files[0].isDir) {
      const folder = node.payload.files[0]
      fileName = folder.id.replace(/^.*[\\/]/, '')
      const fileExt = fileName.split('.').pop()
      let data
      toast(`Opening file: \n ${fileName}`)
      if (['md', 'txt', 'pdf', 'png', 'jpg'].includes(fileExt)) {
        data = await fetch(
          `${print2aApiEndpoint}/GetTextFile?fileLocation=${folder.id}`,
        )
        data = await data.text()
      }
      props.setPopupFile(fileName, folder.id, fileExt, data)
      props.setShowPopup()
      // window.open(`${print2aApiEndpoint}/${folder.id}`, '_blank')
    } else if (
      node.id === 'download_files' &&
      node.state.selectedFiles[0].isDir
    ) {
      const folder = node.state.selectedFiles[0]
      toast(
        `Getting Compressed Files/Folders: ${folder.id.replace(
          /\//g,
          '+',
        )}\nPlease be patient and remain on the browse page`,
      )
      setCurrentPath(`CREATEZIP/${print2aApiEndpoint}/${folder.id}`)
      setCurrentPath(
        `${print2aApiEndpoint}/${folder.id
          .split('/')
          .slice(0, folder.id.split('/').length - 1)
          .join('/')}`,
      )
    } else if (
      node.id === 'download_files' &&
      !node.state.selectedFiles[0].isDir
    ) {
      const folder = node.state.selectedFiles[0]
      toast(`Sending file:\n ${folder.id.replace(/^.*[\\/]/, '')}`)
      window.open(`${print2aApiEndpoint}/${folder.id}`, '_blank')
    }
  }

  const formatApiResponse = (apiResponse) =>
    apiResponse.map((node) => ({
      id: node.id,
      name: node.name,
      isDir: node.isDir,
      path: node.path,
      size: node.size,
      childrenCount: node.childrenCount,
      modDate: new Date(node.mtime),
    }))

  useEffect(() => {
    const getData = async () => {
      if (!currentPath.startsWith('CREATEZIP')) {
        fetch(currentPath)
          .then((response) => response.json())
          .then(
            (response) => {
              const folderChainArray = []
              const formattedResponse = formatApiResponse(response)
              setCurrentNodes(formattedResponse)
              const readableFolderChain = currentPath
                .replace(print2aApiEndpoint, '')
                .substring(1)
              const currentFolderChain = formattedResponse
              // eslint-disable-next-line guard-for-in, no-restricted-syntax
              for (const i in readableFolderChain.split('/')) {
                let newFolderID = 0
                if (readableFolderChain.split('/').length - 1 !== Number(i)) {
                  newFolderID = readableFolderChain
                    .split('/')
                    .slice(0, Number(i) + 1)
                    .join('/')
                } else {
                  newFolderID = readableFolderChain
                }
                folderChainArray.push({
                  id: newFolderID,
                  name: readableFolderChain.split('/')[i],
                  isDir: true,
                })
              }
              window.history.pushState(
                'NewPage',
                'Title',
                `/browse?folder=${currentPath
                  .replace(print2aApiEndpoint, '')
                  .replace('/print2a/', '')
                  .replace('/print2a', '')}`,
              )
              setFolderChain(
                folderChainArray.filter(
                  (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
                ),
              )
            },
            (error) => {
              console.log(error)
              toast(error.message)
            },
          )
      } else {
        fetch(currentPath.replace('CREATEZIP/', ''), {
          headers: { request: true },
        })
          .then((response) => response.json())
          .then(
            (response) => {
              if (response.status === 'COMPLETE') {
                toast(
                  `Completed\nif a window does not automatically open you can find the file available for 4 hours here:\n\n ${response.link}`,
                  { duration: 300000 },
                )
                window.open(`${response.link}`, '_blank')
              } else {
                toast(`Error Compressing Files/Folders see console`)
                console.error(response.msg)
              }
            },
            (error) => {
              console.log(error)
              toast(error.message)
            },
          )
      }
    }
    getData()
  }, [currentPath])
  // Chonky file browser docs: https://timbokz.github.io/Chonky/
  return (
    <FileBrowser
      files={currentNodes}
      folderChain={folderChain}
      onFileAction={handleFileOpen}
      fileActions={[ChonkyActions.DownloadFiles]}
      disableDragAndDrop
      darkMode
      // view={FileView.SmallThumbs}
    >
      <FileNavbar />
      <FileToolbar />
      <FileList />
      <FileContextMenu />
      <ControlledPopup
        setPopupFile={props.setPopupFile}
        setShowPopup={props.setShowPopup}
        upPage={props.upPage}
        downPage={props.downPage}
        state={props.state}
        theme={props.theme}
      />
    </FileBrowser>
  )
}

export default ChonkyBrowse
