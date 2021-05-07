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

  /**
   * TODO: Implement this function
   *
   * Given startLineNumber, endLineNumber, startColumn and endColumn,
   * retrieve a start and end position for a single string.
   */
  getSelection() {
    const selection = this.editor.getSelection()
    const selectionCharacterCount = this.model.getCharacterCountInRange(selection)

    let start = 0

    let line = 1
    while (line < selection.startLineNumber) {
      start += this.model.getLineLength(line)
      line++
    }

    start += this.model.getCharacterCountInRange({
      startLineNumber: line,
      endLineNumber: line,
      startColumn: 1,
      endColumn: selection.startColumn,
    })

    const end = start + selectionCharacterCount

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
