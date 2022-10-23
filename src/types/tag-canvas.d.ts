declare module 'tag-canvas' {
  interface TagCanvasOptions {
    maxSpeed: number, 
    minSpeed: number,
    initial: number[], 
    minBrightness: number, 
    padding: number, 
    textHeight: number, 
    textColour: string, 
    outlineMethod: string, 
    outlineColour: string, 
    noTagsMessage: boolean, 
    txtOpt: boolean, 
    reverse: boolean, 
    shuffleTags: boolean, 
    wheelZoom: boolean, 
    dragControl: boolean, 
    freezeActive: boolean, 
    decel: number, 
    interval: number, 
    noSelect: boolean,
  }

  export default {
    Update: (id: string) => any,
    Start: (id: string, type: string, options: TagCanvasOptions) => any
  }
}