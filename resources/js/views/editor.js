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
   * Retrieve start and end position for a string,
   * given startLineNumber, endLineNumber, startColumn and endColumn.
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
   * TODO: Implement this function
   *
   * Given a start and end position for a single string, retrieve
   * startLineNumber, endLineNumber, startColumn and endColumn.
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
