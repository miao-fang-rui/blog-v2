export const imgToElImgPlugin = (options) => (app) => ({
    name: 'vuepress-plugin-imgToElImg',
    extendsMarkdown: (md) => {
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            const src = env.base + token.attrGet('src')
            const width = token?.attrGet('width')? token?.attrGet('width')+ 'px' : '100%';
            const height = token?.attrGet('height')? token?.attrGet('height')+ 'px' : '100%';
            const alt = token.content

            const thumbSrc = env.base + token.attrGet('src').replace('/%E4%BA%A7%E5%93%81/', '/thumb/')

            return `<ElImageI18n 
                        src="${src}" 
                        srcTb="${thumbSrc}"
                        alt="${alt}"
                        title="${alt}"
                        width="${width}"
                        height="${height}"
                    />`
        }
    }
})