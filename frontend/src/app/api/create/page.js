"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ResizableImage from "tiptap-extension-resizable-image"
import CodeBlock from "@tiptap/extension-code-block"
import { Markdown } from "tiptap-markdown"
import Cropper from "react-easy-crop"
import Image from "@tiptap/extension-image"
import Slider from "@mui/material/Slider"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

function getCroppedImg(imageSrc, crop, zoom) {
  return new Promise((resolve) => {
    const image = new window.Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement("canvas")
      const scale = image.naturalWidth / image.width
      canvas.width = crop.width * scale
      canvas.height = crop.height * scale
      const ctx = canvas.getContext("2d")
      ctx.drawImage(
        image,
        crop.x * scale,
        crop.y * scale,
        crop.width * scale,
        crop.height * scale,
        0,
        0,
        crop.width * scale,
        crop.height * scale
      )
      resolve(canvas.toDataURL("image/jpeg"))
    }
  })
}

// Wrap each <pre> in a div and add a single copy button per code block
function addCopyButtonsToCodeBlocks(container) {
  if (!container) return
  container.querySelectorAll("pre").forEach((pre) => {
    // Only add if this pre has a code child and no wrapper yet
    if (!pre.querySelector("code") || pre.parentNode.classList.contains("code-block-wrapper")) return

    // Create a wrapper div
    const wrapper = document.createElement("div")
    wrapper.className = "code-block-wrapper relative my-4 rounded-lg bg-gray-900 shadow overflow-auto"
    pre.parentNode.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    // Add the copy button to the wrapper
    const btn = document.createElement("button")
    btn.textContent = "Copy"
    btn.className = "copy-btn absolute top-2 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
    btn.onclick = () => {
      navigator.clipboard.writeText(pre.textContent)
      // Visually select the wrapper div
      const range = document.createRange()
      range.selectNodeContents(wrapper)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
      btn.textContent = "Copied!"
      setTimeout(() => {
        btn.textContent = "Copy"
        sel.removeAllRanges()
      }, 1000)
    }
    wrapper.appendChild(btn)
  })
}

export default function BlogWritePage() {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [preview, setPreview] = useState(false)
  const [markdownMode, setMarkdownMode] = useState(false)
  const [markdownValue, setMarkdownValue] = useState("")
  const fileInputRef = useRef(null)
  const router = useRouter()

  // Cropper states
  const [cropSrc, setCropSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [showCropper, setShowCropper] = useState(false)

  const previewRef = useRef(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      ResizableImage,
      CodeBlock.configure({
        HTMLAttributes: {
          class: "hljs p-4 rounded bg-gray-900 text-white font-mono overflow-auto",
        },
      }),
      Markdown,
    ],
    content: "<p>Write your blog content here...</p>",
    onUpdate: ({ editor }) => {
      if (markdownMode) {
        setMarkdownValue(editor.storage.markdown.getMarkdown())
      }
    },
  })

  useEffect(() => {
    if (preview && previewRef.current) {
      previewRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block)
      })
      addCopyButtonsToCodeBlocks(previewRef.current)
    }
  }, [preview, editor])

  // Insert image from device with cropping
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCropSrc(event.target.result)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ""
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const insertCroppedImage = async () => {
    if (!cropSrc || !croppedAreaPixels) return
    const croppedImg = await getCroppedImg(cropSrc, croppedAreaPixels, zoom)
    editor.chain().focus().setImage({ src: croppedImg }).run()
    setShowCropper(false)
    setCropSrc(null)
  }

  const addImage = () => {
    fileInputRef.current?.click()
  }

  const addCodeBlock = () => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run()
    }
  }

  // Force selection as a single code block
  const makeSelectionCodeBlock = () => {
    if (!editor) return
    const { from, to } = editor.state.selection
    const selectedText = editor.state.doc.textBetween(from, to, "\n")
    editor.chain().focus().deleteSelection().insertContent({
      type: "codeBlock",
      content: [{ type: "text", text: selectedText }]
    }).run()
  }

  // Allow changing image: click image in editor to re-crop/replace
  if (editor) {
    editor.setOptions({
      editorProps: {
        handleClickOn: (view, pos, node) => {
          if (node.type.name === "image") {
            setCropSrc(node.attrs.src)
            setShowCropper(true)
            editor.chain().focus().deleteSelection().run()
            return true
          }
          return false
        },
      },
    })
  }

  // Toolbar actions
  const setBold = () => editor && editor.chain().focus().toggleBold().run()
  const setItalic = () => editor && editor.chain().focus().toggleItalic().run()
  const setHeading = (level) => editor && editor.chain().focus().toggleHeading({ level }).run()
  const setBulletList = () => editor && editor.chain().focus().toggleBulletList().run()
  const setOrderedList = () => editor && editor.chain().focus().toggleOrderedList().run()
  const setBlockquote = () => editor && editor.chain().focus().toggleBlockquote().run()
  const setUndo = () => editor && editor.chain().focus().undo().run()
  const setRedo = () => editor && editor.chain().focus().redo().run()

  // Markdown mode toggle
  const handleMarkdownToggle = () => {
    if (!markdownMode) {
      setMarkdownValue(editor.storage.markdown.getMarkdown())
    } else {
      editor.commands.setContent(Markdown.parseMarkdown(markdownValue))
    }
    setMarkdownMode((m) => !m)
    setPreview(false)
  }

  // Edit button handler
  const handleEdit = () => {
    setPreview(false)
    setMarkdownMode(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Please enter a blog title")
      return
    }
    if (!editor || !editor.getHTML().trim()) {
      setError("Please add some content to your blog")
      return
    }
    setError("")
    const blogData = {
      title,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      content: editor.getHTML(),
      date: new Date().toISOString(),
    }
    try {
      setSuccess("Blog published successfully!")
      console.log("Submitted blog:", blogData)
    } catch (err) {
      setError(err.message || "Failed to publish blog")
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-0">
      <div className="max-w-3xl mx-auto">
        {/* Title input */}
        <input
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full text-4xl font-bold mb-2 bg-white/80 border-0 focus:ring-2 focus:ring-blue-300 outline-none rounded-lg px-4 py-2 shadow"
          disabled={preview}
        />
        {/* Tags input */}
        <input
          placeholder="Comma-separated tags (e.g., tech, react, css)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full text-base mb-6 bg-white/80 border-0 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg px-4 py-2 shadow"
          disabled={preview}
        />

        {/* Toolbar */}
        {!preview && !markdownMode && (
          <div className="sticky top-0 z-30 flex gap-2 bg-white/95 border border-gray-200 rounded-xl shadow-lg px-6 py-3 mb-6 w-fit mx-auto backdrop-blur">
            <button onClick={setBold} className="font-bold px-3 py-1 hover:bg-blue-100 rounded transition" title="Bold"><b>B</b></button>
            <button onClick={setItalic} className="italic px-3 py-1 hover:bg-blue-100 rounded transition" title="Italic"><i>I</i></button>
            <button onClick={() => setHeading(1)} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Heading 1">H1</button>
            <button onClick={() => setHeading(2)} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Heading 2">H2</button>
            <button onClick={setBulletList} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Bullet List">• List</button>
            <button onClick={setOrderedList} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Numbered List">1. List</button>
            <button onClick={setBlockquote} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Blockquote">❝</button>
            <button onClick={addImage} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Insert Image">🖼️</button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <button onClick={addCodeBlock} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Insert Code">{`</>`}</button>
            <button onClick={setUndo} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Undo">↺</button>
            <button onClick={setRedo} className="px-3 py-1 hover:bg-blue-100 rounded transition" title="Redo">↻</button>
            <button
              type="button"
              onClick={makeSelectionCodeBlock}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              title="Force Code Block"
            >
              Force Code
            </button>
            <button
              type="button"
              onClick={() => setPreview(true)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleMarkdownToggle}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
            >
              Markdown
            </button>
          </div>
        )}

        {/* Edit button for Preview or Markdown mode */}
        {(preview || markdownMode) && (
          <div className="sticky top-0 z-30 flex gap-2 bg-white/95 border border-gray-200 rounded-xl shadow-lg px-6 py-3 mb-6 w-fit mx-auto backdrop-blur">
            <button
              type="button"
              onClick={handleEdit}
              className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
            >
              Edit
            </button>
          </div>
        )}

        {/* Markdown Editor */}
        {markdownMode ? (
          <textarea
            className="w-full min-h-[500px] bg-gray-900 text-white rounded-xl shadow-lg px-6 py-4 mb-8 mt-2 font-mono text-base outline-none"
            value={markdownValue}
            onChange={e => setMarkdownValue(e.target.value)}
            onBlur={() => editor.commands.setContent(Markdown.parseMarkdown(markdownValue))}
            disabled={preview}
            spellCheck={false}
          />
        ) : (
          <>
            {/* Image Cropper Modal */}
            {showCropper && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div className="bg-white rounded-lg p-4 w-[90vw] max-w-lg flex flex-col items-center">
                  <div className="relative w-full h-64 bg-gray-200">
                    <Cropper
                      image={cropSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={4 / 3}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <div className="w-full flex items-center gap-4 mt-4">
                    <span className="text-sm">Zoom</span>
                    <Slider
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(_, value) => setZoom(value)}
                      style={{ width: "70%" }}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={insertCroppedImage}
                    >
                      Crop & Insert
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={() => {
                        setShowCropper(false)
                        setCropSrc(null)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Editor Area */}
            <div className={`w-full bg-white/90 rounded-2xl shadow-2xl min-h-[500px] mb-8 mt-2 border border-gray-200 ${preview ? "px-12 py-8" : ""}`}>
              {preview ? (
                <div ref={previewRef}>
                  <h1 className="text-4xl font-bold mb-2">{title || "Blog Title"}</h1>
                  <div className="mb-2 text-base text-gray-500">
                    {tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag, idx) => (
                        <span key={idx} className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded mr-1">
                          #{tag}
                        </span>
                      ))}
                  </div>
                  <div
                    className="prose max-w-none min-h-[400px] text-lg"
                    dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
                  />
                </div>
              ) : (
                <EditorContent
                  editor={editor}
                  className="w-full min-h-[400px] text-base outline-none font-mono bg-gray-900 text-white rounded-2xl p-4"
                  spellCheck={false}
                />
              )}
            </div>
          </>
        )}

        {/* Error/Success */}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-2">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-md mb-2">{success}</div>}

        {/* Publish Button */}
        {!preview && (
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg transition-colors duration-300"
          >
            Publish Blog
          </button>
        )}
      </div>
    </div>
  )
}