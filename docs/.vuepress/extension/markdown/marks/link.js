function isPlainURL(link, parent, index) {
    if (link.attrs.title || !/^\w+:/.test(link.attrs.href))
        return false;
    let content = parent.child(index);
    if (!content.isText || content.text != link.attrs.href || content.marks[content.marks.length - 1] != link)
        return false;
    return index == parent.childCount - 1 || !link.isInSet(parent.child(index + 1).marks);
}

export const link = {
    open(state, mark, parent, index) {
        state.inAutolink = isPlainURL(mark, parent, index);
        return state.inAutolink ? " <" : " [";
    },
    close(state, mark, parent, index) {
        let { inAutolink } = state;
        state.inAutolink = undefined;
        return inAutolink ? "> "
            : "](" + mark.attrs.href.replace(/[\(\)"]/g, "\\$&") + (mark.attrs.title ? ` "${mark.attrs.title.replace(/"/g, '\\"')}"` : "") + ") ";
    },
    mixable: true
}