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

    // this.editor.onKeyUp(() => {
    //   listener.fireChanged()
    // })

    this.editor.onMouseDown(() => {
      this.isDragging = true
      listener.fireSelectionChanged()
    })

    this.editor.onMouseUp(() => {
      this.isDragging = false
      listener.fireChanged()
    })

    this.model.onDidChangeContent(() => {
      listener.fireChanged()
    })
  }

  getSelection() {
    return {
      start: this.textarea.selectionStart,
      end: this.textarea.selectionEnd
    }
  }

  /**
   * TODO: Implement this function
   *
   * Given a start and end position for a single string, retrieve
   * startLineNumber, endLineNumber, startColumn and endColumn.
   */
  setSelection(start, end) {
    //  const lineCount = this.editor.getModel().getLineCount()
    //  editor.setSelection({
    //  startLineNumber,
    //  endLineNumber,
    //  startColumn,
    //  endColumn,
    //  })
    //  this.textarea.focus()
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
