import { getHTMLFromFragment } from "@tiptap/core";
import { Fragment } from "@tiptap/pm/model";
function childNodes(node) {
    return node?.content?.content ?? [];
}

function hasSpan(node) {
    return node.attrs.colspan > 1 || node.attrs.rowspan > 1;
}

function isMarkdownSerializable(node) {
    const rows = childNodes(node);
    const firstRow = rows[0];
    const bodyRows = rows.slice(1);

    if(childNodes(firstRow).some(cell => hasSpan(cell))) {
        return false;
    }

    if(bodyRows.some(row =>
        childNodes(row).some(cell => hasSpan(cell))
    )) {
        return false;
    }

    return true;
}

function getTextAlign(node) {
    let alignments = [];
    const rows = childNodes(node);
    if(!rows.length || rows.length === 1) return
    const bodyRows = rows.slice(1);

    const firstRow = childNodes(bodyRows[0]);

    firstRow.forEach( row => {
        const item = childNodes(row);
        item?.forEach (col => {
            const align = col.attrs?.textAlign?.toLowerCase() || 'left';
            alignments.push(align);
        })
    })
    return alignments
}

export default function table(state, node) {
    if(!isMarkdownSerializable(node)) {
        const schema = node.type.schema;
        const html = getHTMLFromFragment(Fragment.from(node), schema);
        state.write(html)
        state.write('\n')
        return
    }

    state.inTable = true;
    let columnAlignments = getTextAlign(node)
    node.forEach((row, p, i) => {
        state.write('| '); 
        row.forEach((col, p, j) => {
            if (j) {
                state.write(' | ');
            }

            col.content.content.forEach((item, index) => {
                if(item.type.name === "ResizableImage"){
                    let widthHeight = ''
                    if(item.attrs?.width || item.attrs?.height){
                        widthHeight = `=${item.attrs?.width? item.attrs?.width: ''}x${item.attrs?.height? item.attrs?.height: ''}` 
                    }else{
                        widthHeight = ''
                    }

                    state.write("![" + state.esc(item.attrs.alt || "") + "](" + item.attrs.src.replace(/[\(\)]/g, "\\$&") +
                        (item.attrs.title ? ' "' + item.attrs.title.replace(/"/g, '\\"') + '"' : "") + " "+ widthHeight + ")");
                }else{
                    if(item.textContent.trim()){
                        state.renderInline(item);
                        if(index + 1 < col.content.content.length){
                            state.write('<br />')
                        }
                    }
                }
            })
        });
        state.write(' |')
        state.ensureNewLine();
        if (!i) {
            const delimiters = columnAlignments.length > 0
                ? columnAlignments.map(a =>
                    a === 'center' ? ':-:' :
                        a === 'right' ? '-:' : '---'
                )
                : row.map(() => '---');
            state.write(`| ${delimiters.join(' | ')} |\n`);
        }
    });
    state.closeBlock(node);
    state.inTable = false;
}