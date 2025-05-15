import { Extension } from '@tiptap/core'
import { MarkdownSerializer } from 'prosemirror-markdown'
import {
    blockquote,
    codeBlock,
    heading,
    horizontalRule,
    bulletList,
    orderedList,
    listItem,
    paragraph,
    image,
    ResizableImage,
    hardBreak,
    text,
    taskList,
    taskItem,
    table,
    tip,

    italic,
    bold,
    underline,
    strike,
    link,
    code,
    subscript,
    superscript,
    highlight,
    textStyle
} from './markdown/index'


const myMarkdownSerializer = new MarkdownSerializer({
    blockquote,
    codeBlock,
    heading,
    horizontalRule,
    bulletList,
    orderedList,
    listItem,
    paragraph,
    image,
    ResizableImage,
    hardBreak,
    text,
    taskList,
    taskItem,
    table,
    tip
}, {
    italic,
    bold,
    underline,
    strike,
    link,
    code,
    subscript,
    superscript,
    highlight,
    textStyle
});

const MarkdownOutputExtension = Extension.create({
    name: 'markdownOutput',

    addCommands() {
        return {
            outputMarkdown: () => ({ state, dispatch }) => {
                const markdown = myMarkdownSerializer.serialize(state.doc)
                return markdown
            }
        }
    }
})

export default MarkdownOutputExtension