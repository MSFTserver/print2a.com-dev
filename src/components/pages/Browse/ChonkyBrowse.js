import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { Words, Button, Frame } from 'arwes'

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
import { NoToneMapping } from 'three'
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
      toast(`Opening file: \n ${fileName}`, {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
          style: { display: 'block' },
        },
      })
      if (['md', 'txt', 'pdf', 'png', 'jpg'].includes(fileExt.toLowerCase())) {
        data = await fetch(
          `${print2aApiEndpoint}/GetFile?fileLocation=${folder.id}`,
        )
        data = await data.text()
        props.setPopupFile(fileName, folder.id, fileExt, data)
        props.setShowPopup()
      } else if (['stl'].includes(fileExt.toLowerCase())) {
        window.location.href = `/modelViewer?fileLocation=${folder.id.replace(
          'print2a/',
          '',
        )}`
      } else {
        props.setPopupFile(fileName, folder.id, fileExt, data)
        props.setShowPopup()
      }
    } else if (
      node.id === 'download_files' &&
      node.state.selectedFiles[0].isDir
    ) {
      const folder = node.state.selectedFiles[0]
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
      const sendToastId = toast.custom(
        (t) => (
          <Frame
            animate
            level={3}
            corners={3}
            layer="alert"
            style={{ background: '#000' }}
            show
          >
            <div className="frame-content">
              <Words>Sending File... </Words>
              <br />
              <Words>this could take a while</Words>
              <div id="dl-buttons" style={{}}>
                <Button
                  layer="primary"
                  onClick={() => {
                    toast.dismiss(t.id)
                  }}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </Frame>
        ),
        {
          duration: Infinity,
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        },
      )
      window.open(`${print2aApiEndpoint}/${folder.id}`, '_blank')
      toast.custom(
        (t) => {
          const divID = `download-link-${t.id}`
          const clipboardID = `clipboard-${t.id}`
          return (
            <Frame
              animate
              level={3}
              corners={3}
              layer="alert"
              show
              style={{ background: '#000' }}
            >
              <div className="frame-content">
                <Words>
                  if a tab does not open,
                  <br /> the file is available below
                </Words>
                <div id={divID} style={{ display: 'none' }}>
                  {`${print2aApiEndpoint}/${folder.id}`}
                </div>
                <input
                  id={clipboardID}
                  style={{
                    position: 'fixed',
                    bottom: '0',
                    right: '0',
                    pointerEvents: 'none',
                    opacity: '0',
                    transform: 'scale(0)',
                  }}
                />
                <div id="dl-buttons">
                  <Button
                    layer="primary"
                    onClick={() =>
                      window.open(
                        `${print2aApiEndpoint}/${folder.id}`,
                        '_blank',
                      )
                    }
                  >
                    Download
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    layer="primary"
                    onClick={() => {
                      const downloadLink = document.getElementById(divID)
                      const clipboard = document.getElementById(clipboardID)
                      clipboard.value = downloadLink.innerHTML
                      clipboard.select()
                      document.execCommand('copy')
                    }}
                  >
                    Copy URL
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    layer="primary"
                    onClick={() => {
                      toast.dismiss(t.id)
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </Frame>
          )
        },
        {
          id: sendToastId,
          duration: 60000,
        },
      )
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
              toast(error.message, {
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              })
            },
          )
      } else {
        const compressToastId = toast.custom(
          (t) => (
            <Frame
              animate
              level={3}
              corners={3}
              layer="alert"
              style={{ background: '#000' }}
              show
            >
              <div className="frame-content">
                <Words>Compressing Files... </Words>
                <br />
                <Words>this could take a while</Words>
                <div id="dl-buttons" style={{}}>
                  <Button
                    layer="primary"
                    onClick={() => {
                      toast.dismiss(t.id)
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </Frame>
          ),
          {
            duration: Infinity,
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          },
        )
        fetch(currentPath.replace('CREATEZIP/', ''), {
          headers: { request: true },
        })
          .then((response) => response.json())
          .then(
            (response) => {
              if (response.status === 'COMPLETE') {
                toast.custom(
                  (t) => (
                    <Frame
                      animate
                      level={3}
                      corners={3}
                      layer="alert"
                      show
                      style={{ background: '#000' }}
                    >
                      <div className="frame-content">
                        <Words>
                          if a tab does not open,
                          <br /> the file is available for 4 hours below
                        </Words>
                        <div id="download-link" style={{ display: 'none' }}>
                          {response.link}
                        </div>
                        <input
                          id="clipboard"
                          style={{
                            position: 'fixed',
                            bottom: '0',
                            right: '0',
                            pointerEvents: 'none',
                            opacity: '0',
                            transform: 'scale(0)',
                          }}
                        />
                        <div id="dl-buttons" style={{}}>
                          <Button
                            layer="primary"
                            onClick={() => window.open(response.link, '_blank')}
                          >
                            Download
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            layer="primary"
                            onClick={() => {
                              const downloadLink =
                                document.getElementById('download-link')
                              const clipboard =
                                document.getElementById('clipboard')
                              clipboard.value = downloadLink.innerHTML
                              clipboard.select()
                              document.execCommand('copy')
                            }}
                          >
                            Copy URL
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            layer="primary"
                            onClick={() => {
                              toast.dismiss(t.id)
                            }}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </Frame>
                  ),
                  {
                    id: compressToastId,
                    duration: 60000,
                  },
                )
                window.open(response.link, '_blank')
              } else {
                toast.error(`Error Compressing Files/Folders see console`, {
                  id: compressToastId,
                })
                console.error(response.msg)
              }
            },
            (error) => {
              console.log(error)
              toast.error(error.message, {
                id: compressToastId,
              })
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
