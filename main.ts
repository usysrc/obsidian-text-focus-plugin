import { MarkdownView, Plugin } from 'obsidian';


export default class TextFocusPlugin extends Plugin {

	/**
	 * Registers the new note event when the workspace layout is ready
	 */
	async onload() {
		this.app.workspace.onLayoutReady(() => {
			this.registerEvent(
				this.app.vault.on('create', (file) => {
					if (file.name.endsWith('.md')) {
						this.onNewNote(file);
					}
				})
			)
		})
	}

	/**
	 * Is called when a new note is created.
	 */
	async onNewNote() {
		// Add a delay of 50 milliseconds
		await sleep(50)

		// Set the focus on the new note
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			const editor = view.editor;
			if (editor) {
				editor.focus();
			}
		}
	}
}
