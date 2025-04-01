import { Extension } from '@tiptap/core';

const TabExtension = Extension.create({
    addKeyboardShortcuts() {
        return {
            Tab: ({ editor }) => {
                const { selection } = editor.state;
                const { from, to, empty } = selection;

                if (!empty) {
                    // 多行缩进
                    editor.commands.forEachLineInSelection((lineStart, lineEnd) => {
                        editor.commands.insertContentAt(lineStart, '\t');
                    });
                } else {
                    // 单行插入制表符
                    editor.commands.insertContent('\t');
                }
                return true;
            },
        };
    },
});

export default TabExtension