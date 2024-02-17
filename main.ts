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
		await this.wait(50);

		// Set the focus on the new note
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			const editor = view.editor;
			if (editor) {
				editor.focus();
			}
		}
	}
	/**
	 * Delay for the specified number of milliseconds.
	 *
	 * @param {number} milliseconds - the number of milliseconds to wait
	 * @return {Promise<void>} a Promise that resolves after the specified number of milliseconds
	 */
	async wait(milliseconds: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	}
}
