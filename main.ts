import { MarkdownView, Plugin } from 'obsidian';


export default class TextFocusPlugin extends Plugin {

	/**
	 * Registers the new note event when the workspace layout is ready
	 */
	async onload() {
		this.app.workspace.onLayoutReady(() => {

			// Change focus when a new note is created
			this.registerEvent(
				this.app.vault.on('create', (file) => {
					if (file.name.endsWith('.md')) {
						this.changeFocus();
					}
				})
			)
			
			// Change focus when toggled to source mode
			this.registerEvent(
				this.app.workspace.on('layout-change', () => {
					this.changeFocus();
				})
			)
		})
	}

	/**
	 * Changes the focus to the note.
	 */
	async changeFocus() {
		// Add a delay of 50 milliseconds
		await sleep(50);

		// Set the focus on the new note
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		// Check if the view is a MarkdownView
		if (!view) {
			return;
		}
		
		// Check if the view is in source mode
		if (view.getMode() !== 'source') {
			return;
		}

		// Set the focus on the editor
		const editor = view.editor;
		if (editor) {
			editor.focus();
		}
	}
}