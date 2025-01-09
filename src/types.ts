export type Char = {
    char: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

export type EditorState = {
    chars: Char[];
    cursorPosition: number;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
}

export const defaultState: EditorState = {
    chars: [],
    cursorPosition: 0,
    isBold: false,
    isItalic: false,
    isUnderline: false
}