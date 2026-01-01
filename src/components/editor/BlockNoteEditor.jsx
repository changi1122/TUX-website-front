import {
	useCreateBlockNote,
	getDefaultReactSlashMenuItems,
	SuggestionMenuController
} from "@blocknote/react";
import { filterSuggestionItems } from "@blocknote/core/extensions";
import { BlockNoteSchema, createCodeBlockSpec } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { codeBlockOptions } from "@blocknote/code-block";
import { ko } from "@blocknote/core/locales";

import { createAlert, insertAlertSlashMenuItem } from "./blocks/Alert";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

const getCustomSlashMenuItems = (editor) => [
  ...getDefaultReactSlashMenuItems(editor),
  insertAlertSlashMenuItem(editor),
];

const BlockNoteEditor = ({ editable, body, onChange, uploadFile }) => {
  	const editor = useCreateBlockNote({
		initialContent: (typeof body === 'object' ? body : undefined),
		schema: BlockNoteSchema.create().extend({
			blockSpecs: {
				codeBlock: createCodeBlockSpec(codeBlockOptions),
				alert: createAlert(),
			},
		}),
		dictionary: ko,
		uploadFile,
	});

	function handleOnChange() {
		onChange?.(editor.document);
	}

  	return <BlockNoteView editor={editor} slashMenu={false} editable={editable} onChange={handleOnChange}>
		<SuggestionMenuController
			triggerCharacter={"/"}
			getItems={async (query) =>
				filterSuggestionItems(getCustomSlashMenuItems(editor), query)
			}
      	/>
	</BlockNoteView>;
};

export default BlockNoteEditor;
