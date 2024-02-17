import { MarkdownView, Plugin, TAbstractFile } from 'obsidian';


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
	 * @param file - The abstract file to be used for creating the new note.
	 */
	async onNewNote(file: TAbstractFile) {
		// Add a delay of 50 milliseconds
		await this.delay(50);

		// Set the focus on the new note
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			const editor = view.editor;
			if (editor) {
				editor.focus();
			}
		}
	}

	async delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
