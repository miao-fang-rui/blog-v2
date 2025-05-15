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

    italic,
    bold,
    underline,
    strike,
    link,
    code,
    subscript,
    superscript,
    highlight
} from '../index'

export default function tip(state, node) {
    const backticks = node.textContent.match(/:{3,}/gm);
    const fence = backticks ? (backticks.sort().slice(-1)[0] + ":") : ":::";
    state.write(fence + (node.attrs.tipType + ' ' + node.attrs.tipContent || "") + "\n\n");

    node.content.content.forEach(item => {
        switch (item.type.name) {
            case "bulletList":
                bulletList(state, item)
                break
            case "orderedList":
                orderedList(state, item)
                break
            case "blockquote":
                blockquote(state, item)
                break
            case "codeBlock":
                codeBlock(state, item)
                break
            case "heading":
                heading(state, item)
                break
            case "horizontalRule":
                horizontalRule(state, item)
                break
            case "paragraph":
                paragraph(state, item)
                break
            case "listItem":
                listItem(state, item)
                break
            case "image":
                image(state, item)
                break
            case "ResizableImage":
                ResizableImage(state, item)
                break
            case "hardBreak":
                hardBreak(state, item)
                break
            case "taskList":
                taskList(state, item)
                break
            case "taskItem":
                taskItem(state, item)
                break
            case "table":
                table(state, item)
                break
            case "text":
                text(state, item)
                break
            case "bold":
                bold(state, item)
                break
            case "underline":
                underline(state, item)
                break
            case "strike":
                strike(state, item)
                break
            case "link":
                link(state, item)
                break
            case "code":
                code(state, item)
                break
            case "subscript":
                subscript(state, item)
                break
            case "superscript":
                superscript(state, item)
                break
            case "highlight":
                highlight(state, item)
                break
            case "italic":
                italic(state, item)
                break
            default:
                break
        }
    });

    state.write(fence);
    state.write("\n");
    state.closeBlock(node);
}