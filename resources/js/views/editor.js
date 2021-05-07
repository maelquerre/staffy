class EditArea {
  constructor(editor) {
    this.textarea = editor
    this.editor = editor.getEditor()
    this.model = editor.getEditor().getModel()
    this.initialText = this.textarea.value
    this.isDragging = false
  }

  addSelectionListener(listener) {
    this.editor.onMouseDown((ev) => {
      if (this.isDragging) {
        listener.fireSelectionChanged()
      }
    })
  }

  addChangeListener(listener) {
    this.changelistener = listener

    this.editor.onKeyUp(() => {
      listener.fireChanged()
    })

    this.editor.onMouseDown(() => {
      this.isDragging = true
      listener.fireSelectionChanged()
    })

    this.editor.onMouseUp(() => {
      this.isDragging = false
      listener.fireChanged()
    })

    this.model.onDidChangeContent((event) => {
      listener.fireChanged()
    })
  }

  /**
   * Returns the start and end offsets for the primary selection of the editor.
   */
  getSelection() {
    const selection = this.editor.getSelection()

    let start = this.model.getOffsetAt({
      lineNumber: selection.startLineNumber,
      column: selection.startColumn,
    })

    let end = this.model.getOffsetAt({
      lineNumber: selection.endLineNumber,
      column: selection.endColumn,
    })

    return {
      start,
      end
    }
  }

  /**
   * Set the primary selection of the editor. This will remove any secondary cursors.
   *
   * @param start The start offset for the selection
   * @param end The end offset for the selection
   */
  setSelection(start, end) {
    const startPosition = this.model.getPositionAt(start)
    const endPosition = this.model.getPositionAt(end)

    this.editor.setSelection({
      startLineNumber: startPosition.lineNumber,
      startColumn: startPosition.column,
      endLineNumber: endPosition.lineNumber,
      endColumn: endPosition.column,
    })

    this.editor.focus()
    this.editor.revealLine(startPosition.lineNumber)
  }

  getString() {
    return this.textarea.value
  }

  setString(str) {
    this.textarea.value = str
    this.initialText = this.getString()

    if (this.changelistener) {
      this.changelistener.fireChanged()
    }
  }

  getElem() {
    return this.textarea
  }
}

export { EditArea }
