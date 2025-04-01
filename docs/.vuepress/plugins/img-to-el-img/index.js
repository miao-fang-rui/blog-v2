export const imgToElImgPlugin = (options) => (app) => ({
    name: 'vuepress-plugin-imgToElImg',
    extendsMarkdown: (md) => {
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            const src = '/blog/'+ token.attrGet('src')
            const width = token?.attrGet('width')? token?.attrGet('width')+ 'px' : '100%';
            const height = token?.attrGet('height')? token?.attrGet('height')+ 'px' : '100%';
            const alt = token.content

            return `<ElImageI18n 
                        src="${src}" 
                        alt="${alt}"
                        title="${alt}"
                        width="${width}"
                        height="${height}"
                    />`
        }
    }
})