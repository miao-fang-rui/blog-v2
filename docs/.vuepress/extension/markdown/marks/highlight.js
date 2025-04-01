export const highlight = { 
    open(state, mark){
        return `<mark data-color="${mark.attrs.color}" style="background-color: ${mark.attrs.color}; color: inherit">`
    }, 
    close: "</mark>", 
    mixable: true, 
    expelEnclosingWhitespace: true 
}